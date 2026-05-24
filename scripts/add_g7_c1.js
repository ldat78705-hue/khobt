const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const id1 = '8581288c-9ebf-4d2b-9bd8-76080f212fdb'; // Bài 1. Tập hợp các số hữu tỉ
  const id2 = '5a3b7039-cf13-4036-8636-bc99a9542345'; // Bài 2. Cộng trừ nhân chia
  const id3 = '5bef54dc-6436-4795-a3b8-3cc1acf35d1c'; // Bài 3. Luỹ thừa
  const id4 = 'f5953356-372f-43b0-8229-d43391245fde'; // Bài 4. Quy tắc chuyển vế

  const grade = 7;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 1. Tập hợp các số hữu tỉ
  allQS.push(
    { cat: id1, code: 'T7-Q-NEW1', content: 'Viết các số sau dưới dạng phân số tối giản và cho biết chúng có phải là số hữu tỉ không: $-2,5; 0; 3 \\dfrac{1}{4}$.', answer: 'Chúng đều là số hữu tỉ.', solution: 'Một số là số hữu tỉ nếu nó viết được dưới dạng phân số $\\dfrac{a}{b}$ ($a, b \\in \\mathbb{Z}, b \\neq 0$).\n- $-2,5 = \\dfrac{-25}{10} = \\dfrac{-5}{2}$.\n- $0 = \\dfrac{0}{1}$.\n- $3 \\dfrac{1}{4} = \\dfrac{13}{4}$.\nVậy cả ba số trên đều là số hữu tỉ.' },
    { cat: id1, code: 'T7-Q-NEW2', content: 'So sánh hai số hữu tỉ: $\\dfrac{-7}{12}$ và $\\dfrac{-5}{8}$.', answer: '$\\dfrac{-7}{12} > \\dfrac{-5}{8}$.', solution: '**Bước 1: Quy đồng mẫu số (Mẫu chung là $24$)**\n- $\\dfrac{-7}{12} = \\dfrac{-14}{24}$.\n- $\\dfrac{-5}{8} = \\dfrac{-15}{24}$.\n\n**Bước 2: So sánh tử số**\nVì $-14 > -15$ nên $\\dfrac{-14}{24} > \\dfrac{-15}{24}$.\n\n**Kết luận:** $\\dfrac{-7}{12} > \\dfrac{-5}{8}$.' },
    { cat: id1, code: 'T7-Q-NEW3', content: 'Nêu cách biểu diễn hai số hữu tỉ $\\dfrac{-3}{4}$ và $\\dfrac{5}{4}$ trên cùng một trục số.', answer: 'Chia đoạn đơn vị thành 4 phần bằng nhau...', solution: '**Cách biểu diễn:**\n- Bước 1: Vẽ trục số, chọn điểm gốc $0$.\n- Bước 2: Chia mỗi đoạn thẳng đơn vị (từ $0$ đến $1$, từ $0$ đến $-1$...) thành $4$ phần bằng nhau. Mỗi phần tương ứng với $\\dfrac{1}{4}$.\n- Bước 3: \n  + Từ điểm $0$, đi về bên trái $3$ phần, ta đánh dấu điểm $\\dfrac{-3}{4}$.\n  + Từ điểm $0$, đi về bên phải $5$ phần, ta đánh dấu điểm $\\dfrac{5}{4}$ (tức là vượt qua số $1$ thêm $1$ phần nhỏ).' },
    { cat: id1, code: 'T7-Q-NEW4', content: 'Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần: $\\dfrac{1}{2}; -0,75; \\dfrac{-2}{3}; 1,5$.', answer: '$-0,75 < \\dfrac{-2}{3} < \\dfrac{1}{2} < 1,5$.', solution: '**Bước 1: Đưa về phân số có cùng mẫu để so sánh**\nTa có: $\\dfrac{1}{2} = \\dfrac{6}{12}$; $-0,75 = \\dfrac{-3}{4} = \\dfrac{-9}{12}$; $\\dfrac{-2}{3} = \\dfrac{-8}{12}$; $1,5 = \\dfrac{3}{2} = \\dfrac{18}{12}$.\n\n**Bước 2: Sắp xếp theo tử số**\nTa có: $-9 < -8 < 6 < 18$.\nSuy ra: $\\dfrac{-9}{12} < \\dfrac{-8}{12} < \\dfrac{6}{12} < \\dfrac{18}{12}$.\n\n**Kết luận:** $-0,75 < \\dfrac{-2}{3} < \\dfrac{1}{2} < 1,5$.' },
    { cat: id1, code: 'T7-Q-NEW5', content: 'Tìm các số nguyên $x$ để phân số $\\dfrac{x}{6}$ nằm giữa $\\dfrac{-1}{2}$ và $\\dfrac{1}{3}$.', answer: '$x \\in \\{-2; -1; 0; 1\\}$.', solution: 'Ta có bất đẳng thức: $\\dfrac{-1}{2} < \\dfrac{x}{6} < \\dfrac{1}{3}$.\nQuy đồng các phân số về mẫu số chung là $6$:\n$\\dfrac{-3}{6} < \\dfrac{x}{6} < \\dfrac{2}{6}$.\nVì cùng mẫu số dương nên ta xét tử số: $-3 < x < 2$.\nDo $x$ là số nguyên nên $x \\in \\{-2; -1; 0; 1\\}$.' }
  );

  // Bài 2. Cộng, trừ, nhân, chia số hữu tỉ
  allQS.push(
    { cat: id2, code: 'T7-Q-NEW6', content: 'Thực hiện phép tính: $\\dfrac{-3}{4} + 0,5$.', answer: '$\\dfrac{-1}{4}$.', solution: 'Đưa số thập phân về phân số rồi cộng:\n$0,5 = \\dfrac{1}{2} = \\dfrac{2}{4}$.\nTa có: $\\dfrac{-3}{4} + \\dfrac{2}{4} = \\dfrac{-3 + 2}{4} = \\dfrac{-1}{4}$.' },
    { cat: id2, code: 'T7-Q-NEW7', content: 'Tính: $\\dfrac{5}{12} - \\dfrac{-7}{8}$.', answer: '$\\dfrac{31}{24}$.', solution: 'Đổi dấu phép trừ thành cộng phân số đối:\n$\\dfrac{5}{12} - \\dfrac{-7}{8} = \\dfrac{5}{12} + \\dfrac{7}{8}$.\nMẫu số chung nhỏ nhất của $12$ và $8$ là $24$.\n$= \\dfrac{10}{24} + \\dfrac{21}{24} = \\dfrac{31}{24}$.' },
    { cat: id2, code: 'T7-Q-NEW8', content: 'Thực hiện phép chia: $1,2 : \\left( \\dfrac{-6}{5} \\right)$.', answer: '$-1$.', solution: 'Đổi số thập phân thành phân số:\n$1,2 = \\dfrac{12}{10} = \\dfrac{6}{5}$.\nPhép chia cho phân số bằng nhân với phân số nghịch đảo:\n$\\dfrac{6}{5} : \\dfrac{-6}{5} = \\dfrac{6}{5} \\times \\dfrac{5}{-6} = \\dfrac{6 \\times 5}{5 \\times (-6)} = -1$.' },
    { cat: id2, code: 'T7-Q-NEW9', content: 'Một tấm bìa hình chữ nhật có chiều dài $2,5$m và chiều rộng $\\dfrac{4}{5}$m. Tính chu vi và diện tích tấm bìa.', answer: 'Chu vi $\\dfrac{33}{5}$m; Diện tích $2\\text{ m}^2$.', solution: 'Đổi chiều dài thành phân số: $2,5 = \\dfrac{5}{2}$ (m).\n**1. Tính chu vi**\n$C = \\left( \\dfrac{5}{2} + \\dfrac{4}{5} \\right) \\times 2 = \\left( \\dfrac{25}{10} + \\dfrac{8}{10} \\right) \\times 2 = \\dfrac{33}{10} \\times 2 = \\dfrac{33}{5}$ (m).\n\n**2. Tính diện tích**\n$S = \\dfrac{5}{2} \\times \\dfrac{4}{5} = \\dfrac{5 \\times 4}{2 \\times 5} = \\dfrac{20}{10} = 2$ ($\\text{m}^2$).' },
    { cat: id2, code: 'T7-Q-NEW10', content: 'Tìm $x$, biết: $x - \\dfrac{1}{3} = \\dfrac{-5}{6}$.', answer: '$x = \\dfrac{-1}{2}$.', solution: 'Chuyển vế $-\\dfrac{1}{3}$ sang vế phải và đổi dấu thành $+\\dfrac{1}{3}$:\n$x = \\dfrac{-5}{6} + \\dfrac{1}{3}$\nQuy đồng mẫu:\n$x = \\dfrac{-5}{6} + \\dfrac{2}{6}$\n$x = \\dfrac{-3}{6} = \\dfrac{-1}{2}$.' }
  );

  // Bài 3. Luỹ thừa với số mũ tự nhiên của số hữu tỉ
  allQS.push(
    { cat: id3, code: 'T7-Q-NEW11', content: 'Tính giá trị các luỹ thừa: $\\left( \\dfrac{-1}{2} \\right)^3$ và $(-0,5)^2$.', answer: '$\\dfrac{-1}{8}$ và $0,25$ (hoặc $\\dfrac{1}{4}$).', solution: '- $\\left( \\dfrac{-1}{2} \\right)^3 = \\dfrac{(-1)^3}{2^3} = \\dfrac{-1}{8}$.\n- $(-0,5)^2 = \\left( \\dfrac{-1}{2} \\right)^2 = \\dfrac{(-1)^2}{2^2} = \\dfrac{1}{4} = 0,25$.' },
    { cat: id3, code: 'T7-Q-NEW12', content: 'Viết kết quả dưới dạng một luỹ thừa: $\\left( \\dfrac{2}{3} \\right)^4 \\times \\left( \\dfrac{2}{3} \\right)^2$ và $\\left( \\dfrac{-3}{4} \\right)^5 : \\left( \\dfrac{-3}{4} \\right)^3$.', answer: '$\\left( \\dfrac{2}{3} \\right)^6$ và $\\left( \\dfrac{-3}{4} \\right)^2$.', solution: '- Nhân hai luỹ thừa cùng cơ số (cộng số mũ):\n$\\left( \\dfrac{2}{3} \\right)^4 \\times \\left( \\dfrac{2}{3} \\right)^2 = \\left( \\dfrac{2}{3} \\right)^{4+2} = \\left( \\dfrac{2}{3} \\right)^6$.\n- Chia hai luỹ thừa cùng cơ số (trừ số mũ):\n$\\left( \\dfrac{-3}{4} \\right)^5 : \\left( \\dfrac{-3}{4} \\right)^3 = \\left( \\dfrac{-3}{4} \\right)^{5-3} = \\left( \\dfrac{-3}{4} \\right)^2$.' },
    { cat: id3, code: 'T7-Q-NEW13', content: 'Tính giá trị của biểu thức: $\\left[ \\left( \\dfrac{1}{2} \\right)^2 \\right]^3$.', answer: '$\\dfrac{1}{64}$.', solution: 'Áp dụng công thức luỹ thừa của luỹ thừa: $(x^m)^n = x^{m \\times n}$.\nTa có: $\\left[ \\left( \\dfrac{1}{2} \\right)^2 \\right]^3 = \\left( \\dfrac{1}{2} \\right)^{2 \\times 3} = \\left( \\dfrac{1}{2} \\right)^6$.\nTính giá trị:\n$\\left( \\dfrac{1}{2} \\right)^6 = \\dfrac{1^6}{2^6} = \\dfrac{1}{64}$.' },
    { cat: id3, code: 'T7-Q-NEW14', content: 'Tìm $x$, biết: $x^2 = \\dfrac{16}{25}$.', answer: '$x = \\dfrac{4}{5}$ hoặc $x = \\dfrac{-4}{5}$.', solution: 'Ta có $\\dfrac{16}{25} = \\left(\\dfrac{4}{5}\\right)^2 = \\left(\\dfrac{-4}{5}\\right)^2$.\nVì luỹ thừa bậc chẵn có hai giá trị đối nhau thỏa mãn phương trình, nên:\n$x^2 = \\left(\\dfrac{4}{5}\\right)^2 \\Rightarrow x = \\dfrac{4}{5}$ hoặc $x = \\dfrac{-4}{5}$.' },
    { cat: id3, code: 'T7-Q-NEW15', content: 'So sánh: $2^{30}$ và $3^{20}$.', answer: '$2^{30} < 3^{20}$.', solution: 'Để so sánh hai luỹ thừa có cơ số và số mũ khác nhau, ta đưa về cùng số mũ bằng công thức luỹ thừa của luỹ thừa.\n- $2^{30} = 2^{3 \\times 10} = (2^3)^{10} = 8^{10}$.\n- $3^{20} = 3^{2 \\times 10} = (3^2)^{10} = 9^{10}$.\nVì $8 < 9$ nên $8^{10} < 9^{10}$.\nVậy $2^{30} < 3^{20}$.' }
  );

  // Bài 4. Thứ tự thực hiện phép tính. Quy tắc chuyển vế
  allQS.push(
    { cat: id4, code: 'T7-Q-NEW16', content: 'Tính hợp lý: $\\dfrac{3}{7} \\times \\dfrac{5}{9} + \\dfrac{3}{7} \\times \\dfrac{4}{9} - \\dfrac{3}{7}$.', answer: '$0$.', solution: 'Áp dụng tính chất phân phối (rút $\\dfrac{3}{7}$ ra làm nhân tử chung):\n$\\dfrac{3}{7} \\times \\dfrac{5}{9} + \\dfrac{3}{7} \\times \\dfrac{4}{9} - \\dfrac{3}{7} \\times 1$\n$= \\dfrac{3}{7} \\times \\left( \\dfrac{5}{9} + \\dfrac{4}{9} - 1 \\right)$\n$= \\dfrac{3}{7} \\times \\left( \\dfrac{9}{9} - 1 \\right)$\n$= \\dfrac{3}{7} \\times (1 - 1) = \\dfrac{3}{7} \\times 0 = 0$.' },
    { cat: id4, code: 'T7-Q-NEW17', content: 'Tìm $x$ bằng quy tắc chuyển vế: $2x + \\dfrac{1}{4} = \\dfrac{-3}{4}$.', answer: '$x = \\dfrac{-1}{2}$.', solution: 'Chuyển vế $+\\dfrac{1}{4}$ sang vế phải thành $-\\dfrac{1}{4}$:\n$2x = \\dfrac{-3}{4} - \\dfrac{1}{4}$\n$2x = \\dfrac{-4}{4}$\n$2x = -1$\n$x = -1 : 2 = \\dfrac{-1}{2}$.' },
    { cat: id4, code: 'T7-Q-NEW18', content: 'Thực hiện phép tính: $\\left( \\dfrac{-1}{2} \\right)^2 - \\dfrac{5}{8} : 0,5$.', answer: '$-1$.', solution: 'Thực hiện luỹ thừa và đổi số thập phân thành phân số trước:\n$\\left( \\dfrac{-1}{2} \\right)^2 = \\dfrac{1}{4}$ và $0,5 = \\dfrac{1}{2}$.\nBiểu thức trở thành:\n$\\dfrac{1}{4} - \\dfrac{5}{8} : \\dfrac{1}{2}$\nThực hiện phép chia trước:\n$= \\dfrac{1}{4} - \\left( \\dfrac{5}{8} \\times 2 \\right) = \\dfrac{1}{4} - \\dfrac{10}{8} = \\dfrac{1}{4} - \\dfrac{5}{4}$.\n$= \\dfrac{-4}{4} = -1$.' },
    { cat: id4, code: 'T7-Q-NEW19', content: 'Tìm $x$, biết: $\\dfrac{1}{2} - \\left( x + \\dfrac{1}{3} \\right) = \\dfrac{-1}{6}$.', answer: '$x = \\dfrac{1}{3}$.', solution: 'Coi cụm $\\left( x + \\dfrac{1}{3} \\right)$ là số trừ chưa biết:\n$x + \\dfrac{1}{3} = \\dfrac{1}{2} - \\dfrac{-1}{6}$\n$x + \\dfrac{1}{3} = \\dfrac{1}{2} + \\dfrac{1}{6} = \\dfrac{3}{6} + \\dfrac{1}{6} = \\dfrac{4}{6} = \\dfrac{2}{3}$\nTìm $x$:\n$x = \\dfrac{2}{3} - \\dfrac{1}{3} = \\dfrac{1}{3}$.' },
    { cat: id4, code: 'T7-Q-NEW20', content: 'Tính giá trị biểu thức: $A = \\dfrac{1}{2} + \\dfrac{1}{6} + \\dfrac{1}{12} + \\dfrac{1}{20}$.', answer: '$\\dfrac{4}{5}$.', solution: 'Nhận xét các mẫu số: $2 = 1 \\times 2$; $6 = 2 \\times 3$; $12 = 3 \\times 4$; $20 = 4 \\times 5$.\nÁp dụng công thức sai phân: $\\dfrac{1}{n \\times (n+1)} = \\dfrac{1}{n} - \\dfrac{1}{n+1}$.\n$A = \\left( \\dfrac{1}{1} - \\dfrac{1}{2} \\right) + \\left( \\dfrac{1}{2} - \\dfrac{1}{3} \\right) + \\left( \\dfrac{1}{3} - \\dfrac{1}{4} \\right) + \\left( \\dfrac{1}{4} - \\dfrac{1}{5} \\right)$.\nCác số đối nhau sẽ bị triệt tiêu:\n$A = 1 - \\dfrac{1}{5} = \\dfrac{4}{5}$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 7 (Rational Numbers)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'dai_so', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
