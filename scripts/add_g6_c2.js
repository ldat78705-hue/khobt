const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND parent_id IS NOT NULL 
    ORDER BY sort_order OFFSET 2 LIMIT 2
  `;
  
  if (cats.length < 2) {
    console.log('Categories not found!');
    return;
  }
  
  const id3 = cats[0].id; // Bài 3
  const id4 = cats[1].id; // Bài 4
  console.log('Cat 3:', cats[0].name);
  console.log('Cat 4:', cats[1].name);

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6: Lũy thừa với số mũ tự nhiên
  allQS.push(
    { cat: id3, code: 'T6-B3-NEW1', content: 'Viết gọn các tích sau bằng cách dùng lũy thừa: $5 \\times 5 \\times 5 \\times 5 \\times 5$ và $2 \\times 2 \\times 2 \\times 3 \\times 3$.', answer: '$5^5$ và $2^3 \\times 3^2$.', solution: '- Trong tích $5 \\times 5 \\times 5 \\times 5 \\times 5$, có $5$ thừa số $5$ nhân với nhau, ta viết gọn thành lũy thừa là $5^5$.\n- Trong tích $2 \\times 2 \\times 2 \\times 3 \\times 3$, có $3$ thừa số $2$ và $2$ thừa số $3$. Ta viết gọn thành: $2^3 \\times 3^2$.' },
    { cat: id3, code: 'T6-B3-NEW2', content: 'Tính giá trị của các lũy thừa sau: $3^4$ và $5^3$.', answer: '$3^4 = 81$; $5^3 = 125$.', solution: 'Ta tính bằng cách nhân các thừa số giống nhau:\n- $3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$.\n- $5^3 = 5 \\times 5 \\times 5 = 125$.' },
    { cat: id3, code: 'T6-B3-NEW3', content: 'Viết kết quả phép tính dưới dạng một lũy thừa: $7^5 \\times 7^3$ và $4^8 : 4^5$.', answer: '$7^8$ và $4^3$.', solution: 'Áp dụng các quy tắc nhân, chia hai lũy thừa cùng cơ số:\n- Nhân hai lũy thừa cùng cơ số (cộng số mũ): $7^5 \\times 7^3 = 7^{5+3} = 7^8$.\n- Chia hai lũy thừa cùng cơ số (trừ số mũ): $4^8 : 4^5 = 4^{8-5} = 4^3$.' },
    { cat: id3, code: 'T6-B3-NEW4', content: 'So sánh hai lũy thừa: $2^6$ và $8^2$.', answer: '$2^6 = 8^2$.', solution: 'Có hai cách để so sánh.\n**Cách 1: Tính trực tiếp giá trị**\n$2^6 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 64$.\n$8^2 = 8 \\times 8 = 64$.\nVì $64 = 64$ nên $2^6 = 8^2$.\n\n**Cách 2: Đưa về cùng cơ số**\nTa có $8 = 2^3$. Do đó $8^2 = (2^3)^2 = 2^{3 \\times 2} = 2^6$.\nVậy $2^6 = 8^2$.' },
    { cat: id3, code: 'T6-B3-NEW5', content: 'Tìm số tự nhiên $x$, biết: $3^x = 81$.', answer: '$x = 4$.', solution: 'Để tìm $x$, ta cần biến đổi số $81$ về dạng lũy thừa có cơ số là $3$.\nTa phân tích: $81 = 3 \\times 3 \\times 3 \\times 3 = 3^4$.\nPhương trình trở thành: $3^x = 3^4$.\nVì hai lũy thừa có cùng cơ số $3$ và bằng nhau nên số mũ phải bằng nhau.\nSuy ra: $x = 4$.' }
  );

  // Grade 6: Thứ tự thực hiện phép tính
  allQS.push(
    { cat: id4, code: 'T6-B4-NEW1', content: 'Thực hiện phép tính: $50 - [30 - (9 - 4)^2]$.', answer: '$45$.', solution: 'Thực hiện phép tính theo thứ tự: trong ngoặc tròn $()$ trước, rồi đến ngoặc vuông $[]$.\n$50 - [30 - (9 - 4)^2]$\n$= 50 - [30 - 5^2]$\n$= 50 - [30 - 25]$\n$= 50 - 5$\n$= 45$' },
    { cat: id4, code: 'T6-B4-NEW2', content: 'Tìm số tự nhiên $x$, biết: $15 + 4 \\times (x - 2) = 95$.', answer: '$x = 22$.', solution: 'Trong biểu thức này, cụm $4 \\times (x - 2)$ đóng vai trò là một số hạng chưa biết.\n$4 \\times (x - 2) = 95 - 15$\n$4 \\times (x - 2) = 80$\nTiếp tục coi $(x - 2)$ là thừa số chưa biết:\n$x - 2 = 80 : 4$\n$x - 2 = 20$\nCuối cùng, $x$ là số bị trừ:\n$x = 20 + 2$\n$x = 22$' },
    { cat: id4, code: 'T6-B4-NEW3', content: 'Tính giá trị biểu thức: $120 : \\{54 - [50 : 2 - (3^2 - 2 \\times 4)]\\}$.', answer: '$4$.', solution: 'Thực hiện phép tính theo đúng thứ tự: Trong ngoặc tròn $() \\rightarrow$ ngoặc vuông $[] \\rightarrow$ ngoặc nhọn $\\{\\}$. Và lũy thừa $\\rightarrow$ nhân chia $\\rightarrow$ cộng trừ.\n$120 : \\{54 - [50 : 2 - (3^2 - 2 \\times 4)]\\}$\n$= 120 : \\{54 - [25 - (9 - 8)]\\}$\n$= 120 : \\{54 - [25 - 1]\\}$\n$= 120 : \\{54 - 24\\}$\n$= 120 : 30$\n$= 4$' },
    { cat: id4, code: 'T6-B4-NEW4', content: 'Một học sinh thực hiện phép tính như sau: $24 - 4 \\times 5 = 20 \\times 5 = 100$. Hỏi học sinh đó làm đúng hay sai? Nếu sai hãy sửa lại cho đúng.', answer: 'Học sinh làm sai. Kết quả đúng là $4$.', solution: 'Học sinh đó làm **SAI** vì đã thực hiện phép trừ trước phép nhân (không tuân thủ quy tắc nhân chia trước, cộng trừ sau).\n**Sửa lại cho đúng:**\n$24 - 4 \\times 5$\n$= 24 - 20$\n$= 4$' },
    { cat: id4, code: 'T6-B4-NEW5', content: 'Thực hiện phép tính bằng cách hợp lý: $25 \\times 14 + 25 \\times 86 - 500$.', answer: '$2000$.', solution: 'Sử dụng tính chất phân phối của phép nhân đối với phép cộng để nhóm các số hạng có thừa số chung là $25$.\n$25 \\times 14 + 25 \\times 86 - 500$\n$= 25 \\times (14 + 86) - 500$\n$= 25 \\times 100 - 500$\n$= 2500 - 500$\n$= 2000$' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 Chapter 1 (part 2)...`);

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
