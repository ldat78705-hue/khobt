const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cat4 = '48d42d38-9588-469b-bae0-caab458cde81'; // Bài 4: Phân số thập phân (Need to check actual ID, I'll use a dynamic query)
  const cat5 = '4c219f85-45a7-47b7-bd62-87db37caee69'; // Bài 5
  
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 5 AND name IN ('Bài 4: Phân số thập phân', 'Bài 5: Ôn tập các phép tính với phân số')
  `;
  
  let id4 = cats.find(c => c.name.includes('Bài 4'))?.id;
  let id5 = cats.find(c => c.name.includes('Bài 5'))?.id;

  if (!id4 || !id5) {
    console.log('Categories not found!');
    return;
  }

  const grade = 5;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';

  const qsCat4 = [
    {
      code: 'T5-B4-NEW1',
      content: 'Chuyển phân số $\\dfrac{3}{5}$ thành phân số thập phân có mẫu số là $10$.',
      answer: '$\\dfrac{6}{10}$.',
      solution: 'Phân số thập phân là phân số có mẫu số là $10, 100, 1000,...$\n\n**Bước 1:** Để mẫu số bằng $10$, ta phải nhân mẫu số $5$ với $2$.\n**Bước 2:** Nhân cả tử số và mẫu số với $2$.\n$\\dfrac{3}{5} = \\dfrac{3 \\times 2}{5 \\times 2} = \\dfrac{6}{10}$\n\n**Kết luận:** Phân số thập phân cần tìm là $\\dfrac{6}{10}$.'
    },
    {
      code: 'T5-B4-NEW2',
      content: 'Viết phân số $\\dfrac{17}{25}$ thành phân số thập phân có mẫu số là $100$.',
      answer: '$\\dfrac{68}{100}$.',
      solution: '**Bước 1:** Ta thấy $100 : 25 = 4$. Do đó, ta nhân cả tử số và mẫu số với $4$.\n**Bước 2:** Thực hiện phép tính:\n$\\dfrac{17}{25} = \\dfrac{17 \\times 4}{25 \\times 4} = \\dfrac{68}{100}$\n\n**Kết luận:** Phân số thập phân là $\\dfrac{68}{100}$.'
    },
    {
      code: 'T5-B4-NEW3',
      content: 'So sánh hai phân số $\\dfrac{4}{5}$ và $\\dfrac{75}{100}$.',
      answer: '$\\dfrac{4}{5} > \\dfrac{75}{100}$.',
      solution: 'Để so sánh, ta chuyển $\\dfrac{4}{5}$ thành phân số thập phân có mẫu là $100$.\n\n**Bước 1:** Quy đồng mẫu số.\n$\\dfrac{4}{5} = \\dfrac{4 \\times 20}{5 \\times 20} = \\dfrac{80}{100}$\n\n**Bước 2:** So sánh tử số.\nVì $80 > 75$ nên $\\dfrac{80}{100} > \\dfrac{75}{100}$.\n\n**Kết luận:** Vậy $\\dfrac{4}{5} > \\dfrac{75}{100}$.'
    },
    {
      code: 'T5-B4-NEW4',
      content: 'Chuyển hỗn số $4\\dfrac{1}{2}$ thành phân số thập phân.',
      answer: '$\\dfrac{45}{10}$.',
      solution: '**Bước 1:** Chuyển hỗn số thành phân số.\n$4\\dfrac{1}{2} = \\dfrac{4 \\times 2 + 1}{2} = \\dfrac{9}{2}$\n\n**Bước 2:** Chuyển phân số $\\dfrac{9}{2}$ thành phân số thập phân.\nNhân cả tử và mẫu với $5$:\n$\\dfrac{9}{2} = \\dfrac{9 \\times 5}{2 \\times 5} = \\dfrac{45}{10}$\n\n**Kết luận:** Phân số thập phân là $\\dfrac{45}{10}$.'
    },
    {
      code: 'T5-B4-NEW5',
      content: 'Một cửa hàng có $\\dfrac{3}{4}$ số gạo là gạo tẻ. Hãy viết phân số chỉ số phần gạo tẻ dưới dạng phân số thập phân.',
      answer: '$\\dfrac{75}{100}$.',
      solution: 'Đề bài yêu cầu chuyển phân số $\\dfrac{3}{4}$ thành phân số thập phân.\n\n**Bước 1:** Tìm số tự nhiên nhân với $4$ để được $100$ ($100 : 4 = 25$).\n**Bước 2:** Nhân cả tử và mẫu với $25$.\n$\\dfrac{3}{4} = \\dfrac{3 \\times 25}{4 \\times 25} = \\dfrac{75}{100}$\n\n**Kết luận:** Phân số thập phân chỉ số gạo tẻ là $\\dfrac{75}{100}$.'
    }
  ];

  const qsCat5 = [
    {
      code: 'T5-B5-NEW1',
      content: 'Thực hiện phép tính: $\\dfrac{2}{3} \\times \\dfrac{4}{5}$.',
      answer: '$\\dfrac{8}{15}$.',
      solution: 'Để nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số.\n\n**Bước 1:** Viết phép tính tử nhân tử, mẫu nhân mẫu.\n$\\dfrac{2}{3} \\times \\dfrac{4}{5} = \\dfrac{2 \\times 4}{3 \\times 5}$\n\n**Bước 2:** Tính kết quả.\n$\\dfrac{2 \\times 4}{3 \\times 5} = \\dfrac{8}{15}$\nPhân số đã tối giản.\n\n**Kết luận:** Kết quả là $\\dfrac{8}{15}$.'
    },
    {
      code: 'T5-B5-NEW2',
      content: 'Thực hiện phép chia: $\\dfrac{7}{8} : \\dfrac{3}{4}$.',
      answer: '$\\dfrac{7}{6}$.',
      solution: 'Để chia hai phân số, ta giữ nguyên phân số thứ nhất và nhân với phân số thứ hai đảo ngược.\n\n**Bước 1:** Nhân với phân số đảo ngược.\n$\\dfrac{7}{8} : \\dfrac{3}{4} = \\dfrac{7}{8} \\times \\dfrac{4}{3}$\n\n**Bước 2:** Thực hiện phép nhân.\n$= \\dfrac{7 \\times 4}{8 \\times 3} = \\dfrac{28}{24}$\n\n**Bước 3:** Rút gọn phân số (chia cả tử và mẫu cho $4$).\n$= \\dfrac{7}{6}$\n\n**Kết luận:** Kết quả là $\\dfrac{7}{6}$.'
    },
    {
      code: 'T5-B5-NEW3',
      content: 'Một hình chữ nhật có chiều dài $\\dfrac{5}{6}$ m, chiều rộng $\\dfrac{3}{4}$ m. Tính chu vi hình chữ nhật đó.',
      answer: '$\\dfrac{19}{6}$ m.',
      solution: 'Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng nhân $2$.\n\n**Bước 1:** Tính tổng chiều dài và chiều rộng.\n$\\dfrac{5}{6} + \\dfrac{3}{4} = \\dfrac{10}{12} + \\dfrac{9}{12} = \\dfrac{19}{12}$ (m)\n\n**Bước 2:** Tính chu vi.\n$\\dfrac{19}{12} \\times 2 = \\dfrac{19 \\times 2}{12} = \\dfrac{38}{12} = \\dfrac{19}{6}$ (m)\n\n**Kết luận:** Chu vi hình chữ nhật là $\\dfrac{19}{6}$ m.'
    },
    {
      code: 'T5-B5-NEW4',
      content: 'Một mảnh vườn hình chữ nhật có chiều dài $\\dfrac{5}{6}$ m, chiều rộng $\\dfrac{3}{4}$ m. Tính diện tích mảnh vườn đó.',
      answer: '$\\dfrac{5}{8} \\text{ m}^2$.',
      solution: 'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.\n\n**Bước 1:** Thiết lập phép tính.\n$\\dfrac{5}{6} \\times \\dfrac{3}{4}$\n\n**Bước 2:** Thực hiện phép nhân.\n$= \\dfrac{5 \\times 3}{6 \\times 4} = \\dfrac{15}{24}$\n\n**Bước 3:** Rút gọn phân số cho $3$.\n$= \\dfrac{5}{8}$ ($\\text{m}^2$)\n\n**Kết luận:** Diện tích là $\\dfrac{5}{8} \\text{ m}^2$.'
    },
    {
      code: 'T5-B5-NEW5',
      content: 'Tìm $x$, biết: $x \\times \\dfrac{2}{5} = \\dfrac{4}{7}$.',
      answer: '$x = \\dfrac{10}{7}$.',
      solution: 'Trong phép nhân này, $x$ là thừa số chưa biết. Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số kia.\n\n**Bước 1:** Viết lại biểu thức tìm $x$.\n$x = \\dfrac{4}{7} : \\dfrac{2}{5}$\n\n**Bước 2:** Chuyển thành phép nhân với phân số đảo ngược.\n$x = \\dfrac{4}{7} \\times \\dfrac{5}{2}$\n\n**Bước 3:** Tính kết quả.\n$x = \\dfrac{4 \\times 5}{7 \\times 2} = \\dfrac{20}{14}$\n\n**Bước 4:** Rút gọn phân số.\n$x = \\dfrac{10}{7}$\n\n**Kết luận:** $x = \\dfrac{10}{7}$.'
    }
  ];

  const allQS = [...qsCat4.map(q => ({...q, cat: id4})), ...qsCat5.map(q => ({...q, cat: id5}))];

  console.log(`Inserting ${allQS.length} new questions...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'so_hoc', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
