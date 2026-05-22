import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function fixGrade8() {
  const updates = [
    {
      id: '4cfc1e98-ee98-4dc8-a0c1-1cfdcbca8d2d',
      solution: 'Ta có: $x^3+6x^2+12x+8 = x^3 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 + 2^3 = (x+2)^3$.'
    },
    {
      id: 'c1c1ebd4-fede-4a10-995e-f8b174a7b08d',
      solution: 'Thể tích khối chóp là $V_{chóp} = \\frac{1}{3} S_{đáy} \\cdot h$. Thể tích khối lăng trụ là $V_{lăng\\ trụ} = S_{đáy} \\cdot h$. Do hai khối có cùng diện tích đáy và cùng chiều cao, ta suy ra tỉ số thể tích là $V_{chóp} = \\frac{1}{3} V_{lăng\\ trụ}$.'
    },
    {
      id: '1d5f2ddc-568a-4c6a-a4ed-09d349e8fad3',
      solution: 'Ta nhận thấy biểu thức có dạng bình phương của một tổng: $x^2+6x+9 = x^2 + 2 \\cdot x \\cdot 3 + 3^2 = (x+3)^2$.'
    },
    {
      id: 'b2802701-1a64-4d85-8ba6-99ffa3f7b53b',
      solution: 'Phương trình đường thẳng có dạng tổng quát là $y = ax + b$, trong đó $a$ là hệ số góc. Đối chiếu với phương trình $y = 3x - 2$, ta suy ra hệ số góc là $a = 3$.'
    }
  ];

  for (const update of updates) {
    await sql`
      UPDATE public.questions
      SET solution = ${update.solution}
      WHERE id = ${update.id}
    `;
    console.log(`Updated solution for question ID: ${update.id}`);
  }
  console.log('✅ Hoàn tất sửa lỗi Khối Lớp 8!');
}

fixGrade8().catch(console.error);
