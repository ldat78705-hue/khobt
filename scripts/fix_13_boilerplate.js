/**
 * SỬA 13 CÂU BOILERPLATE - TẠO ĐÁP ÁN VÀ LỜI GIẢI THỰC
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const fixes = [
  {
    code: 'T4-AUTO-4950c969-1',
    // DT HCN chiều dài 5 cm, rộng 3 cm
    answer: '$15 \\text{ cm}^2$.',
    solution: 'Diện tích hình chữ nhật = chiều dài × chiều rộng = $5 \\times 3 = 15$ ($\\text{cm}^2$).\n\nĐáp số: $15 \\text{ cm}^2$.'
  },
  {
    code: 'T4-B17-004',
    // HCN dài 5, rộng 3. Tính DT
    answer: '$15 \\text{ cm}^2$.',
    solution: 'Diện tích hình chữ nhật = chiều dài × chiều rộng = $5 \\times 3 = 15$ ($\\text{cm}^2$).\n\nĐáp số: $15 \\text{ cm}^2$.'
  },
  {
    code: 'T5-B15-002',
    // 1 ha = ? m²
    answer: '$10\\,000 \\text{ m}^2$.',
    solution: '$1$ ha $= 10\\,000 \\text{ m}^2$.\n\n(Vì $1$ ha $= 1$ hm$^2 = 100 \\text{ m} \\times 100 \\text{ m} = 10\\,000 \\text{ m}^2$).'
  },
  {
    code: 'T5-B16-003',
    // 1 cm² = ? mm²
    answer: '$100 \\text{ mm}^2$.',
    solution: '$1 \\text{ cm}^2 = 100 \\text{ mm}^2$.\n\n(Vì $1$ cm $= 10$ mm, nên $1 \\text{ cm}^2 = 10 \\times 10 = 100 \\text{ mm}^2$).'
  },
  {
    code: 'T5-B29-004',
    // Hình tròn d = 14 cm. Tính DT
    answer: '$153,86 \\text{ cm}^2$.',
    solution: 'Bán kính: $r = \\dfrac{d}{2} = \\dfrac{14}{2} = 7$ (cm).\n\nDiện tích hình tròn: $S = \\pi r^2 = 3,14 \\times 7^2 = 3,14 \\times 49 = 153,86$ ($\\text{cm}^2$).\n\nĐáp số: $153,86 \\text{ cm}^2$.'
  },
  {
    code: 'T5-B33-003',
    // DT HCN 14 × 8 cm
    answer: '$112 \\text{ cm}^2$.',
    solution: 'Diện tích hình chữ nhật: $S = a \\times b = 14 \\times 8 = 112$ ($\\text{cm}^2$).\n\nĐáp số: $112 \\text{ cm}^2$.'
  },
  {
    code: 'T5-B41-007',
    // Vườn DT 5 ha, 25% trồng hoa. DT trồng hoa?
    answer: '$1,25$ ha.',
    solution: 'Diện tích trồng hoa: $5 \\times 25\\% = 5 \\times 0,25 = 1,25$ (ha).\n\nĐáp số: $1,25$ ha.'
  },
  {
    code: 'T5-B43-009',
    // DT HCN dài 12,5 m, rộng 8,4 m
    answer: '$105 \\text{ m}^2$.',
    solution: 'Diện tích hình chữ nhật: $S = 12,5 \\times 8,4 = 105$ ($\\text{m}^2$).\n\nĐáp số: $105 \\text{ m}^2$.'
  },
  {
    code: 'T5-B46-009',
    // 1 dm³ = ? cm³
    answer: '$1000 \\text{ cm}^3$.',
    solution: '$1 \\text{ dm}^3 = 1000 \\text{ cm}^3$.\n\n(Vì $1$ dm $= 10$ cm, nên $1 \\text{ dm}^3 = 10 \\times 10 \\times 10 = 1000 \\text{ cm}^3$).'
  },
  {
    code: 'T5-B50-009',
    // Chu vi đáy 30 cm, cao 5 cm. DT xung quanh
    answer: '$150 \\text{ cm}^2$.',
    solution: 'Diện tích xung quanh hình hộp chữ nhật (hoặc hình lăng trụ):\n\n$S_{xq} = \\text{chu vi đáy} \\times \\text{chiều cao} = 30 \\times 5 = 150$ ($\\text{cm}^2$).\n\nĐáp số: $150 \\text{ cm}^2$.'
  },
  {
    code: 'T5-B54-010',
    // Thể tích 1 cục tẩy khoảng bao nhiêu?
    answer: 'Khoảng $8 \\text{ cm}^3$.',
    solution: 'Một cục tẩy thông thường có kích thước khoảng $4 \\times 2 \\times 1$ cm.\n\nThể tích: $V = 4 \\times 2 \\times 1 = 8$ ($\\text{cm}^3$).\n\nĐáp số: Khoảng $8 \\text{ cm}^3$.'
  },
  {
    code: 'T5-B71-003',
    // DT tam giác đáy 5 cm, cao 4 cm
    answer: '$10 \\text{ cm}^2$.',
    solution: 'Diện tích hình tam giác: $S = \\dfrac{a \\times h}{2} = \\dfrac{5 \\times 4}{2} = \\dfrac{20}{2} = 10$ ($\\text{cm}^2$).\n\nĐáp số: $10 \\text{ cm}^2$.'
  },
  {
    code: 'T5-B71-004',
    // DT hình thang đáy lớn 6 cm, đáy bé 4 cm, cao 3 cm
    answer: '$15 \\text{ cm}^2$.',
    solution: 'Diện tích hình thang: $S = \\dfrac{(a + b) \\times h}{2} = \\dfrac{(6 + 4) \\times 3}{2} = \\dfrac{30}{2} = 15$ ($\\text{cm}^2$).\n\nĐáp số: $15 \\text{ cm}^2$.'
  },
];

async function main() {
  console.log('=== SỬA 13 CÂU BOILERPLATE ===\n');
  
  let fixed = 0;
  for (const f of fixes) {
    const result = await sql`
      UPDATE public.questions 
      SET answer = ${f.answer}, solution = ${f.solution}, updated_at = NOW()
      WHERE question_code = ${f.code}
      RETURNING question_code
    `;
    if (result.length > 0) {
      fixed++;
      console.log(`✅ [${f.code}]: "${f.answer.slice(0,40)}"`);
    } else {
      console.log(`❌ [${f.code}]: Không tìm thấy`);
    }
  }
  
  console.log(`\nĐã sửa: ${fixed}/13`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
