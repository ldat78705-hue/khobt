/**
 * BƯỚC 2: SỬA correct_answer SAI ĐỊNH DẠNG
 * 
 * Vấn đề: Nhiều câu MCQ có correct_answer chứa NỘI DUNG đáp án 
 * (VD: "Hình chữ nhật", "$120$") thay vì KEY (A/B/C/D).
 * 
 * Logic sửa:
 * - Nếu correct_answer KHÔNG phải 1 ký tự A-H → đây là nội dung
 * - So khớp nội dung với value của từng option
 * - Nếu khớp → cập nhật correct_answer = key tương ứng
 * - Nếu không khớp → ghi log để kiểm tra thủ công
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function normalize(s) {
  if (!s) return '';
  return s.trim().replace(/\s+/g, ' ').replace(/\\\\/g, '\\').toLowerCase();
}

async function main() {
  console.log('=== BƯỚC 2: SỬA correct_answer SAI ĐỊNH DẠNG ===\n');

  const mcqs = await sql`
    SELECT id, question_code, content, answer, correct_answer, options, grade
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND correct_answer IS NOT NULL
      AND correct_answer != ''
    ORDER BY grade, question_code
  `;

  console.log(`Tổng câu MCQ có correct_answer: ${mcqs.length}\n`);

  let fixed = 0;
  let alreadyOk = 0;
  let cannotFix = 0;
  const unfixable = [];

  for (const q of mcqs) {
    const ca = q.correct_answer.trim();
    
    // Nếu đã là key hợp lệ (A-H, 1 ký tự) → OK
    if (/^[A-Ha-h]$/.test(ca)) {
      alreadyOk++;
      continue;
    }

    // correct_answer là nội dung, cần tìm key tương ứng
    if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
      cannotFix++;
      unfixable.push({ code: q.question_code, grade: q.grade, reason: 'Không có options', ca });
      continue;
    }

    // So khớp nội dung
    let matchedKey = null;
    const caNorm = normalize(ca);

    for (const opt of q.options) {
      if (!opt || !opt.value) continue;
      const optNorm = normalize(opt.value);
      
      // So khớp chính xác
      if (optNorm === caNorm) {
        matchedKey = opt.key;
        break;
      }
      
      // So khớp nếu correct_answer chứa trong option hoặc ngược lại
      if (caNorm.length > 3 && optNorm.includes(caNorm)) {
        matchedKey = opt.key;
        break;
      }
      if (optNorm.length > 3 && caNorm.includes(optNorm)) {
        matchedKey = opt.key;
        break;
      }
    }

    if (matchedKey) {
      // Cập nhật
      await sql`UPDATE public.questions SET correct_answer = ${matchedKey}, answer = ${matchedKey}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed++;
      if (fixed <= 20) {
        console.log(`✅ [${q.question_code}] Lớp ${q.grade}: "${ca.slice(0,40)}" → "${matchedKey}"`);
      }
    } else {
      cannotFix++;
      unfixable.push({ code: q.question_code, grade: q.grade, reason: 'Không khớp option nào', ca: ca.slice(0, 60) });
    }
  }

  console.log(`\n--- KẾT QUẢ ---`);
  console.log(`✅ Đã đúng sẵn: ${alreadyOk}`);
  console.log(`🔧 Đã sửa: ${fixed}`);
  console.log(`❌ Không tự sửa được: ${cannotFix}`);

  if (unfixable.length > 0) {
    console.log(`\n--- CÂU KHÔNG TỰ SỬA ĐƯỢC (${unfixable.length}) ---`);
    for (const u of unfixable.slice(0, 30)) {
      console.log(`   [${u.code}] Lớp ${u.grade}: ${u.reason} | ca="${u.ca}"`);
    }
    if (unfixable.length > 30) console.log(`   ... và ${unfixable.length - 30} câu khác`);
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
