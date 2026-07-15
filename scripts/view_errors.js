/**
 * KIỂM TRA CHI TIẾT 9 LỖI ĐÃ PHÁT HIỆN
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const codes = [
    'T4-B17-005',   // DT HV cạnh 10: 100 vs 1
    'T6-C1B3-009',  // boxed{37} vs 10
    'T6-C1B5-009',  // boxed{333300} vs 328350
    'T6-C2B11-010', // boxed{1} vs 6
    'T6-C2B8-001',  // boxed{15,20,25} vs 15
    'T6-C2B9-008',  // boxed{1230} vs 1020
    'T6-C2B9-010',  // boxed{432} vs 612
    'T6-OTC1-003',  // nội dung ngắn
    'T9-C1B3-008',  // CV HCN 28x4: 64 vs 9
  ];
  
  for (const code of codes) {
    const rows = await sql`SELECT id, question_code, content, answer, solution, grade, question_type FROM public.questions WHERE question_code = ${code} LIMIT 1`;
    if (rows.length === 0) { console.log(`\n❌ [${code}] KHÔNG TÌM THẤY\n`); continue; }
    const q = rows[0];
    console.log(`\n${'='.repeat(60)}`);
    console.log(`[${code}] Lớp ${q.grade} (${q.question_type})`);
    console.log(`${'='.repeat(60)}`);
    console.log(`NỘI DUNG:\n${q.content}\n`);
    console.log(`ĐÁP ÁN:\n${q.answer}\n`);
    console.log(`LỜI GIẢI:\n${q.solution}\n`);
  }
}

main().catch(console.error);
