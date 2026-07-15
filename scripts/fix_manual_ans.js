const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const fixes = [
  // T4-B31-005: HBHH đáy 5cm, cao 3cm → S = 5×3 = 15
  { code: 'T4-B31-005', answer: '$15 \\text{ cm}^2$.' },
  // T4-B43-004: HCN dài 25, rộng ? → lấy context "25×?" 
  // Need to check content first
  { code: 'T4-B54-004', answer: '$1$.' }, // Mọi số tự nhiên → mẫu số 1 → ĐÚNG
  // T6-C3B14-007: (-99)+(-1)+100+(-200)+201 = 1 → ĐÚNG
  { code: 'T6-C3B14-007', answer: '$1$.' },
  // T6-C4B20-NEW-005: Hình thoi, hai đường chéo → DT = d1×d2/2
  // T6-C4OT-NEW-003: HCN 15m × ? → S
  // T6-OTC5-003: Tam giác cân có MẤY trục đối xứng? → 1 → ĐÚNG
  { code: 'T6-OTC5-003', answer: '$1$.' },
  // T6-OTC8-001: Qua 2 điểm vẽ được MẤY đường thẳng? → 1 → ĐÚNG
  { code: 'T6-OTC8-001', answer: '$1$.' },
  // T7-C7OT-001: P(x) = x-5 bậc = 1 → ĐÚNG
  { code: 'T7-C7OT-001', answer: '$1$.' },
  // T9-C8OT-003: XS biến cố chắc chắn = 1 → ĐÚNG
  { code: 'T9-C8OT-003', answer: '$1$.' },
];

async function main(){
  // First check T4-B43-004 and others needing context
  for (const code of ['T4-B43-004', 'T6-C4B20-NEW-005', 'T6-C4OT-NEW-003']) {
    const r = await sql`SELECT content, answer, solution FROM public.questions WHERE question_code = ${code}`;
    if (r.length) {
      const q = r[0];
      console.log(`[${code}]: "${(q.content||'').slice(0,60)}" | sol="${(q.solution||'').slice(0,60)}"`);
    }
  }
  
  // Apply simple fixes
  let fixed = 0;
  for (const f of fixes) {
    const r = await sql`UPDATE public.questions SET answer = ${f.answer}, updated_at = NOW() WHERE question_code = ${f.code} RETURNING question_code`;
    if(r.length) { fixed++; console.log(`✅ ${f.code}: ${f.answer}`); }
  }
  console.log(`\nĐã sửa: ${fixed}`);
}
main().catch(console.error);
