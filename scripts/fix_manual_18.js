/**
 * SỬA 18 CÂU CÒN LẠI - MANUAL
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const manualFixes = [
  // T5-B45-004: 12 khối lập phương 1cm³ → V = 12 cm³
  { code: 'T5-B45-004', answer: '$12 \\text{ cm}^3$.' },
  // T5-B50-005: HH vuông cạnh 4, cao 5 → Stp = 80 + 2×16 = 112 cm²
  { code: 'T5-B50-005', answer: '$S_{tp} = 112 \\text{ cm}^2$.' },
  // T5-B50-007: S2đáy=40, Stp=140 → Sxq = 100
  { code: 'T5-B50-007', answer: '$S_{xq} = 100 \\text{ cm}^2$.' },
  // T5-B51-006: HLP ko nắp cạnh 5 → 5 mặt × 25 = 125 cm²
  { code: 'T5-B51-006', answer: '$125 \\text{ cm}^2$.' },
  // T5-B54-006: bể cá 40×30×20, nước 15cm → V = 40×30×15 = 18000 cm³
  { code: 'T5-B54-006', answer: '$18\\,000 \\text{ cm}^3 = 18 \\text{ lít}$.' },
  // T5-B15-NEW4: trang trại 2 ha, 1/5 trồng hoa → 2/5 = 0,4 ha = 4000 m²
  { code: 'T5-B15-NEW4', answer: '$4\\,000 \\text{ m}^2$.' },
  // T5-B18-009: 2,4 ha × 3/4 = 1,8 ha = 18000 m²
  { code: 'T5-B18-009', answer: '$18\\,000 \\text{ m}^2$.' },
  // T5-B48-005: 1m³ 8dm³ = 1008 dm³
  { code: 'T5-B48-005', answer: '$1\\,008 \\text{ dm}^3$.' },
  // 7-18-022: M(x)+N(x) polynomial
  { code: '7-18-022', answer: '$M(x) + N(x) = x^2 + 3x - 1$.' },
  // T9-KHOI-08: 100 nón lá, r=20cm, l=30cm → Sxq = π×20×30 × 100
  { code: 'T9-KHOI-08', answer: 'Diện tích vải cần: $100 \\times \\pi \\times 20 \\times 30 \\approx 188\\,496 \\text{ cm}^2 \\approx 18,85 \\text{ m}^2$.' },
  // G5-MCQ-M-38F9: V HLP cạnh 3 = 27 cm³ (chuyển MCQ)
  { code: 'G5-MCQ-M-38F9', answer: '$27 \\text{ cm}^3$.' },
  // G5-MCQ-M-B9CC: V HLP cạnh 4 = 64 cm³ 
  { code: 'G5-MCQ-M-B9CC', answer: '$64 \\text{ cm}^3$.' },
  // G6-BATCH1-0F0C: Tập hợp chữ cái TOÁN = {T, O, Á, N}
  { code: 'G6-BATCH1-0F0C', answer: '$\\{T, O, Á, N\\}$.' },
  // G6-FIN-7A21: CV hình vuông cạnh 4 = 16 cm
  { code: 'G6-FIN-7A21', answer: '$16$ cm.' },
  // G6-FIN-D81E: Trung điểm I → IA = 1 cm
  { code: 'G6-FIN-D81E', answer: '$1$ cm.' },
  // 7-15-003: y tỉ lệ nghịch x, a=30
  { code: '7-15-003', answer: '$y = \\dfrac{30}{x}$.' },
  // 7-17-005: AH < AB (AH vuông góc)
  { code: '7-17-005', answer: '$AH < AB$.' },
  // 7-17-006: BC=1, AC=8 → AB nguyên
  { code: '7-17-006', answer: '$AB = 8$ cm.' },
];

async function main() {
  let fixed = 0;
  for (const f of manualFixes) {
    const result = await sql`
      UPDATE public.questions SET answer = ${f.answer}, updated_at = NOW()
      WHERE question_code = ${f.code}
      RETURNING question_code
    `;
    if (result.length > 0) {
      fixed++;
      console.log(`✅ [${f.code}]: "${f.answer.slice(0,50)}"`);
    }
  }
  console.log(`\nĐã sửa: ${fixed}/${manualFixes.length}`);
  
  // Đếm lại
  const remaining = await sql`
    SELECT COUNT(*)::int as cnt FROM public.questions
    WHERE LENGTH(TRIM(answer)) < 3 AND question_type NOT IN ('trac_nghiem', 'dung_sai')
  `;
  console.log(`Còn câu tự luận đáp án ngắn: ${remaining[0].cnt}`);
}
main().catch(console.error);
