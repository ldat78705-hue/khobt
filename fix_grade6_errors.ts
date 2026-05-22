import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function fixGrade6() {
  const updates = [
    {
      id: 'ba8de45b-a438-4879-ac9c-8d1e15e431ed',
      solution: 'Ta tính từng giá trị: $(-3)^2 = 9$ và $|{-5}| = 5$. Thay vào biểu thức ta có: $(-3)^2 + |{-5}| = 9 + 5 = 14$.'
    },
    {
      id: '00268b23-c563-4163-8cb8-c0d51b22f4ed',
      solution: 'Các số tự nhiên $x$ thỏa mãn điều kiện $5 \\leq x \\leq 9$ là các số tự nhiên từ $5$ đến $9$. Vậy các giá trị của $x$ là $x \\in \\{5, 6, 7, 8, 9\\}$. Có tất cả $5$ giá trị thỏa mãn bài toán.'
    },
    {
      id: '33b09145-4bb8-4970-86ac-0f63be3d2b4c',
      solution: 'Cứ qua 2 điểm phân biệt ta kẻ được 1 đường thẳng. Vì trong 4 điểm này không có 3 điểm nào thẳng hàng, số đường thẳng kẻ được chính là số cách chọn 2 điểm từ 4 điểm. Số đường thẳng là $\\frac{4 \\times 3}{2} = 6$ đường thẳng.'
    },
    {
      id: '55f0cea4-b911-46cd-bcb0-824674bf5def',
      solution: 'Mỗi giao điểm được tạo ra từ 2 đường thẳng. Vì 5 đường thẳng đôi một cắt nhau và không có 3 đường nào đồng quy, số giao điểm tối đa chính là số cách chọn 2 đường thẳng từ 5 đường thẳng. Số giao điểm là $\\frac{5 \\times 4}{2} = 10$ giao điểm.'
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
  console.log('✅ Hoàn tất sửa lỗi Khối Lớp 6!');
}

fixGrade6().catch(console.error);
