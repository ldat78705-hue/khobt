import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function fixGrade9() {
  const updates = [
    {
      id: '416e3ad2-b512-457c-b01b-1fba7ce19057',
      solution: 'Ta có $(-1)^3 = -1$, do đó căn bậc ba của $-1$ là $\\sqrt[3]{-1} = -1$.'
    },
    {
      id: 'd2a86bc9-7b1c-4477-8a3a-a257a07441ef',
      solution: 'Mỗi đồng xu khi tung có 2 khả năng xảy ra (Sấp hoặc Ngửa). Khi tung 3 đồng xu phân biệt, theo quy tắc nhân, số phần tử của không gian mẫu là $|\\Omega| = 2 \\times 2 \\times 2 = 2^3 = 8$.'
    },
    {
      id: 'db225a15-afb5-4cab-bf47-6dff6391b4d8',
      solution: 'Mỗi lần gieo xúc xắc có 6 khả năng xảy ra (từ 1 đến 6 chấm). Khi gieo xúc xắc 3 lần liên tiếp, theo quy tắc nhân, số phần tử của không gian mẫu là $|\\Omega| = 6 \\times 6 \\times 6 = 6^3 = 216$.'
    },
    {
      id: '7c345196-a7b6-44e6-9eac-9ae99acac5ea',
      solution: 'Việc xếp 4 học sinh vào 4 vị trí trên một hàng ngang là một hoán vị của 4 phần tử. Vậy số cách xếp là: $P_4 = 4! = 4 \\times 3 \\times 2 \\times 1 = 24$ (cách xếp).'
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
  console.log('✅ Hoàn tất sửa lỗi Khối Lớp 9!');
}

fixGrade9().catch(console.error);
