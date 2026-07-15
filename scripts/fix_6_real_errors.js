/**
 * SỬA 6 LỖI THỰC SỰ
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== SỬA 6 LỖI THỰC SỰ ===\n');

  // 1. T6-C1B3-009: Đáp án sai "10 hoặc 24", đúng phải là "37"
  // Lời giải chứng minh rõ ràng: ab=37 (a=3, b=7, kiểm tra 3×3+4×7=37✓)
  await sql`UPDATE public.questions SET 
    answer = ${'$\\overline{ab} = 37$.'},
    updated_at = NOW()
  WHERE question_code = 'T6-C1B3-009'`;
  console.log('✅ T6-C1B3-009: Đáp án sửa "10 hoặc 24" → "37"');

  // 2. T6-C1B5-009: Đáp án sai 328350, đúng là 333300
  // Công thức: Σk(k+1) = n(n+1)(n+2)/3 = 99×100×101/3 = 333300
  await sql`UPDATE public.questions SET 
    answer = ${'$333\\,300$.'},
    updated_at = NOW()
  WHERE question_code = 'T6-C1B5-009'`;
  console.log('✅ T6-C1B5-009: Đáp án sửa "328350" → "333300"');

  // 3. T6-C2B11-010: Đáp án sai n=6, đúng là n=1
  // Lời giải: ƯCLN(n+15, n+1) | 14. d=2 → n=1 (lẻ, nhỏ nhất). gcd(16,2)=2>1 ✓
  await sql`UPDATE public.questions SET 
    answer = ${'$n = 1$.'},
    updated_at = NOW()
  WHERE question_code = 'T6-C2B11-010'`;
  console.log('✅ T6-C2B11-010: Đáp án sửa "n=6" → "n=1"');

  // 4. T6-C2B8-001: Đáp án thiếu 20 
  // Trong {12,15,20,25}: 15÷5=3✓, 20÷5=4✓, 25÷5=5✓
  await sql`UPDATE public.questions SET 
    answer = ${'$15$, $20$ và $25$.'},
    updated_at = NOW()
  WHERE question_code = 'T6-C2B8-001'`;
  console.log('✅ T6-C2B8-001: Đáp án sửa "15 và 25" → "15, 20 và 25"');

  // 5. T6-C2B9-008: Đáp án sai 1020, đúng là 1230
  // 1020 có chữ số lặp (0 xuất hiện 2 lần). 1230: 1,2,3,0 đều khác nhau ✓
  await sql`UPDATE public.questions SET 
    answer = ${'$1230$.'},
    updated_at = NOW()
  WHERE question_code = 'T6-C2B9-008'`;
  console.log('✅ T6-C2B9-008: Đáp án sửa "1020" → "1230"');

  // 6. T6-C2B9-010: Đáp án sai 612, đúng là 432
  // a=2c, a+b+c=9: c=2→a=4,b=3. 432÷36=12 ✓. 612: a=6,c=2→a=2c→6=4 ✗
  await sql`UPDATE public.questions SET 
    answer = ${'$\\overline{abc} = 432$.'},
    updated_at = NOW()
  WHERE question_code = 'T6-C2B9-010'`;
  console.log('✅ T6-C2B9-010: Đáp án sửa "612" → "432"');

  console.log('\n📊 Đã sửa 6 lỗi toán học.');
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
