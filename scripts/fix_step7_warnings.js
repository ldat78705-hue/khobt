/**
 * BƯỚC 7: XỬ LÝ TẤT CẢ CẢNH BÁO CÒN LẠI
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function countDollars(text) {
  return (text.match(/(?<!\\)\$/g) || []).length;
}

function fixLatex(text) {
  if (!text) return { text, fixed: false };
  const dollars = countDollars(text);
  if (dollars % 2 === 0) return { text, fixed: false };
  
  let fixed = text;
  let wasFixed = false;
  
  // Pattern 1: $\text{cm}$^2$ → $\text{cm}^2$ 
  const p1 = fixed.replace(/(\\text\{[^}]*\})\$\^(\d)/g, (m, t, n) => { wasFixed = true; return `${t}^${n}`; });
  if (p1 !== fixed) fixed = p1;
  
  // Pattern 2: "$18,$6" → "$18{,}6$"
  const p2 = fixed.replace(/\$(\d+),\$(\d+)/g, (m, a, b) => { wasFixed = true; return `$${a}{,}${b}$`; });
  if (p2 !== fixed) fixed = p2;
  
  // Pattern 3: ;$y= → ; $y=
  const p3 = fixed.replace(/;\$([a-zA-Z])/g, (m, c) => { wasFixed = true; return `; $${c}`; });
  if (p3 !== fixed) fixed = p3;
  
  // Pattern 4: $ mở cuối không đóng → thêm $ đóng
  if (countDollars(fixed) % 2 !== 0) {
    let lastOpen = -1, open = false;
    for (let i = 0; i < fixed.length; i++) {
      if (fixed[i] === '$' && (i === 0 || fixed[i-1] !== '\\')) {
        if (!open) { lastOpen = i; open = true; }
        else { open = false; }
      }
    }
    if (open && lastOpen >= 0) {
      const trimmed = fixed.trimEnd();
      const lastChar = trimmed[trimmed.length - 1];
      if ('.?!)'.includes(lastChar)) {
        fixed = trimmed.slice(0, -1) + '$' + lastChar;
      } else {
        fixed = trimmed + '$';
      }
      wasFixed = true;
    }
  }
  
  return { text: fixed, fixed: wasFixed };
}

async function main() {
  console.log('=== BƯỚC 7: XỬ LÝ CẢNH BÁO ===\n');

  // 7A: Sửa LaTeX
  console.log('--- 7A: Sửa LaTeX $ lẻ ---');
  const allQ = await sql`SELECT id, question_code, content, answer, solution, grade FROM public.questions ORDER BY grade, question_code`;
  
  let latexTotal = 0, latexFixed = 0;
  
  for (const q of allQ) {
    let changed = false;
    let newContent = q.content || '';
    let newAnswer = q.answer || '';
    let newSolution = q.solution || '';
    
    const c = fixLatex(newContent);
    if (c.fixed) { newContent = c.text; changed = true; }
    const a = fixLatex(newAnswer);
    if (a.fixed) { newAnswer = a.text; changed = true; }
    const s = fixLatex(newSolution);
    if (s.fixed) { newSolution = s.text; changed = true; }
    
    const totalDollars = countDollars(newContent + ' ' + newAnswer + ' ' + newSolution);
    if (totalDollars % 2 !== 0) latexTotal++;
    
    if (changed) {
      await sql`UPDATE public.questions SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution}, updated_at = NOW() WHERE id = ${q.id}`;
      latexFixed++;
    }
  }
  console.log(`✅ LaTeX đã sửa: ${latexFixed}`);
  console.log(`⚠️ LaTeX $ lẻ còn: ${latexTotal}\n`);

  // 7B: Gán category
  console.log('--- 7B: Gán category ---');
  const noCategory = await sql`SELECT id, question_code, grade FROM public.questions WHERE category_id IS NULL ORDER BY grade`;
  console.log(`Câu chưa có category: ${noCategory.length}`);
  
  const categories = await sql`SELECT id, name, grade, parent_id FROM public.categories ORDER BY grade, sort_order`;
  
  // Tìm category mặc định (ưu tiên "Tổng hợp", "Ôn tập", hoặc category cha đầu tiên)
  const defaultCat = {};
  for (const cat of categories) {
    if (!cat.grade) continue;
    if (!defaultCat[cat.grade]) {
      if (cat.name && (cat.name.includes('Tổng hợp') || cat.name.includes('Ôn tập') || cat.name.includes('Khác'))) {
        defaultCat[cat.grade] = cat.id;
      }
    }
  }
  for (const cat of categories) {
    if (!cat.grade || defaultCat[cat.grade]) continue;
    if (!cat.parent_id) defaultCat[cat.grade] = cat.id; // category cha đầu tiên
  }

  let catAssigned = 0;
  for (const q of noCategory) {
    const catId = defaultCat[q.grade];
    if (catId) {
      await sql`UPDATE public.questions SET category_id = ${catId}, updated_at = NOW() WHERE id = ${q.id}`;
      catAssigned++;
    }
  }
  console.log(`✅ Đã gán category: ${catAssigned}`);
  
  const remaining = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE category_id IS NULL`;
  console.log(`📊 Còn thiếu category: ${remaining[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
