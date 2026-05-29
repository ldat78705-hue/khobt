const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);

  // ===== FIX 9 remaining 🔴 issues =====
  console.log('=== FIX 9 LỖI ĐỎ CÒN LẠI ===\n');

  // 1. "Nội dung quá ngắn" — These are actually valid short questions. Expand them to be clearer.
  const fixes = {
    'T9-C4BTC-004': { content: 'Tính giá trị $\\cos 60°$.' },
    'T8-C7B27-001': { content: 'Hàm số là gì? Nêu định nghĩa hàm số.' },
    'T6-C1B6-001': { content: 'Tính giá trị của lũy thừa: $2^5$.' },
    'T6-OTC9-001': { content: 'Tần số của một giá trị trong mẫu số liệu là gì? Nêu định nghĩa.' },
    'T5-B15-006': { content: '$4$ km² bằng bao nhiêu héc-ta? Đổi đơn vị.' },
    'T5-B30-001': { content: 'Đọc số thập phân sau: $4,025$.' },
    'T4-AUTO-fc609ccd-3': { content: 'Thực hiện phép chia: $75 : 3 = ?$' },
    'T4-B7-001': { content: 'Góc là gì? Nêu định nghĩa góc trong hình học.' },
  };

  for (const [code, fix] of Object.entries(fixes)) {
    const r = await sql`UPDATE public.questions SET content = ${fix.content} WHERE question_code = ${code} RETURNING id`;
    if (r.length > 0) console.log(`  ✅ ${code}: expanded content`);
    else console.log(`  ⚠️ ${code}: not found`);
  }

  // 2. Fix T6-OTC1-003 — remaining junk format
  const junk = await sql`SELECT id, content FROM public.questions WHERE question_code = 'T6-OTC1-003'`;
  if (junk.length > 0) {
    let c = junk[0].content;
    c = c.replace(/^Thực hiện phép tính theo yêu cầu bài toán:\n?/i, '');
    const idx = c.indexOf('\nNhư vậy');
    if (idx > 0) c = c.substring(0, idx);
    c = c.trim();
    if (c.length > 10) {
      await sql`UPDATE public.questions SET content = ${c} WHERE id = ${junk[0].id}`;
      console.log(`  ✅ T6-OTC1-003: cleaned junk format`);
    }
  }

  // ===== FIX 🟡 KaTeX issues =====
  console.log('\n=== FIX KATEX ISSUES (🟡) ===\n');
  
  // Find remaining KaTeX problems
  const katexProblems = await sql`
    SELECT id, question_code, content, answer, grade
    FROM public.questions
    WHERE content LIKE '%\\left\\{%' AND content NOT LIKE '%\\right%'
    OR content LIKE '%\\left(%' AND content NOT LIKE '%\\right)%'
    OR answer LIKE '%\\left\\{%' AND answer NOT LIKE '%\\right%'
  `;
  console.log(`Questions with unclosed \\left: ${katexProblems.length}`);
  
  let katexFixed = 0;
  for (const q of katexProblems) {
    let content = q.content || '';
    let answer = q.answer || '';
    let changed = false;
    
    function fixUnclosedLeft(text) {
      if (!text) return { text, changed: false };
      let t = text;
      let c = false;
      
      // Fix \left\{ without matching \right\} or \right.
      // Strategy: Find $...\left\{...\end{...}$ and add \right. before closing $
      t = t.replace(/(\$[^$]*\\left\\{[^$]*\\end\{(?:array|aligned|cases)\})\$/g, (match, inner) => {
        if (!inner.includes('\\right')) {
          c = true;
          return inner + ' \\right.$ ';
        }
        return match;
      });
      
      // Fix \left( without \right)
      t = t.replace(/(\$[^$]*\\left\([^$]*)\$(?![^$]*\\right)/g, (match, inner) => {
        if (!inner.includes('\\right')) {
          c = true;
          return inner + '\\right)$';
        }
        return match;
      });
      
      return { text: t, changed: c };
    }
    
    const r1 = fixUnclosedLeft(content);
    const r2 = fixUnclosedLeft(answer);
    
    if (r1.changed || r2.changed) {
      await sql`UPDATE public.questions SET content=${r1.text}, answer=${r2.text} WHERE id=${q.id}`;
      katexFixed++;
    }
  }
  console.log(`KaTeX \\left fixes: ${katexFixed}`);
  
  // Fix $ nested inside $ (e.g. $...$...$)
  const nestedDollar = await sql`
    SELECT id, question_code, content, answer
    FROM public.questions
    WHERE content ~ '\\$[^$]+\\$[^$]+\\$'
    LIMIT 20
  `;
  console.log(`\nPotential nested $ issues: ${nestedDollar.length} (checking first 20)`);

  // Final count
  const total = await sql`SELECT grade, COUNT(*) as c FROM public.questions GROUP BY grade ORDER BY grade DESC`;
  console.log('\n=== TRẠNG THÁI CUỐI ===');
  let sum = 0;
  total.forEach(r => { console.log(`  Lớp ${r.grade}: ${r.c} câu`); sum += parseInt(r.c); });
  console.log(`  TỔNG: ${sum} câu`);
})();
