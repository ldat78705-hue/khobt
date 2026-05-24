const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cat2 = '1e6d3626-7630-47ae-98a1-eff190359dc1'; // Bài 2: Ôn tập các phép tính với số tự nhiên
  const cat3 = '6ef8d5d5-545b-43be-b2cb-14ab978a3765'; // Bài 3: Ôn tập phân số
  const grade = 5;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';

  const qsCat2 = [
    {
      code: 'T5-B2-NEW1',
      content: 'Tính giá trị biểu thức sau bằng cách thuận tiện nhất: $125 \\times 98 \\times 8$.',
      answer: '$98000$.',
      solution: 'Áp dụng tính chất giao hoán và kết hợp của phép nhân:\n\n**Bước 1:** Nhóm các thừa số có tích là số tròn nghìn lại với nhau.\n$= (125 \\times 8) \\times 98$\n\n**Bước 2:** Thực hiện phép tính trong ngoặc.\n$= 1000 \\times 98$\n\n**Bước 3:** Tính kết quả cuối cùng.\n$= 98000$\n\n**Kết luận:** Giá trị của biểu thức là $98000$.'
    },
    {
      code: 'T5-B2-NEW2',
      content: 'Một nhà máy sản xuất được $1540$ sản phẩm trong tháng thứ nhất. Tháng thứ hai sản xuất gấp $3$ lần tháng thứ nhất. Hỏi cả hai tháng sản xuất được bao nhiêu sản phẩm?',
      answer: '$6160$ sản phẩm.',
      solution: 'Thực hiện giải bài toán bằng hai phép tính:\n\n**Bước 1:** Tính số sản phẩm tháng thứ hai sản xuất được.\n$1540 \\times 3 = 4620$ (sản phẩm)\n\n**Bước 2:** Tính tổng số sản phẩm cả hai tháng.\n$1540 + 4620 = 6160$ (sản phẩm)\n\n**Kết luận:** Cả hai tháng nhà máy sản xuất được $6160$ sản phẩm.'
    },
    {
      code: 'T5-B2-NEW3',
      content: 'Tìm $x$, biết: $x \\times 24 + x \\times 76 = 15000$.',
      answer: '$x = 150$.',
      solution: 'Áp dụng tính chất một số nhân với một tổng: $a \\times b + a \\times c = a \\times (b + c)$.\n\n**Bước 1:** Rút $x$ ra làm thừa số chung.\n$x \\times (24 + 76) = 15000$\n\n**Bước 2:** Tính tổng trong ngoặc.\n$x \\times 100 = 15000$\n\n**Bước 3:** Giải tìm $x$.\n$x = 15000 : 100$\n$x = 150$\n\n**Kết luận:** $x = 150$.'
    },
    {
      code: 'T5-B2-NEW4',
      content: 'Một mảnh vườn hình chữ nhật có chu vi $120$ m. Chiều dài hơn chiều rộng $16$ m. Tính diện tích mảnh vườn đó.',
      answer: '$836 \\text{ m}^2$.',
      solution: 'Đây là dạng toán "Tìm hai số khi biết tổng và hiệu".\n\n**Bước 1:** Tính nửa chu vi (tổng của chiều dài và chiều rộng).\n$120 : 2 = 60$ (m)\n\n**Bước 2:** Tính chiều dài mảnh vườn.\n$(60 + 16) : 2 = 38$ (m)\n\n**Bước 3:** Tính chiều rộng mảnh vườn.\n$38 - 16 = 22$ (m)\n*(Hoặc: $60 - 38 = 22$ m)*\n\n**Bước 4:** Tính diện tích mảnh vườn.\n$38 \\times 22 = 836$ ($\\text{m}^2$)\n\n**Kết luận:** Diện tích mảnh vườn là $836 \\text{ m}^2$.'
    },
    {
      code: 'T5-B2-NEW5',
      content: 'Trung bình cộng của ba số là $450$. Biết số thứ nhất là $320$, số thứ hai gấp đôi số thứ nhất. Tìm số thứ ba.',
      answer: '$390$.',
      solution: 'Phân tích và giải từng bước:\n\n**Bước 1:** Tính tổng của cả ba số.\n$450 \\times 3 = 1350$\n\n**Bước 2:** Tính giá trị của số thứ hai.\n$320 \\times 2 = 640$\n\n**Bước 3:** Tính tổng của số thứ nhất và số thứ hai.\n$320 + 640 = 960$\n\n**Bước 4:** Tìm số thứ ba bằng cách lấy tổng ba số trừ đi tổng hai số đầu.\n$1350 - 960 = 390$\n\n**Kết luận:** Số thứ ba là $390$.'
    }
  ];

  const qsCat3 = [
    {
      code: 'T5-B3-NEW1',
      content: 'Rút gọn phân số $\\dfrac{108}{144}$ đến phân số tối giản.',
      answer: '$\\dfrac{3}{4}$.',
      solution: 'Để rút gọn phân số, ta chia cả tử số và mẫu số cho cùng một số tự nhiên lớn hơn $1$ cho đến khi không thể chia được nữa.\n\n**Cách làm:**\nTa thấy $108$ và $144$ đều chia hết cho $36$ (ước chung lớn nhất).\n$\\dfrac{108}{144} = \\dfrac{108 : 36}{144 : 36} = \\dfrac{3}{4}$\n\n*(Hoặc học sinh có thể chia từ từ cho $2$, cho $9$,... đến khi tối giản)*.\n\n**Kết luận:** Phân số tối giản là $\\dfrac{3}{4}$.'
    },
    {
      code: 'T5-B3-NEW2',
      content: 'Hai vòi nước cùng chảy vào một bể không có nước. Vòi thứ nhất chảy trong $1$ giờ được $\\dfrac{1}{3}$ bể. Vòi thứ hai chảy trong $1$ giờ được $\\dfrac{2}{5}$ bể. Hỏi trong $1$ giờ, cả hai vòi chảy được bao nhiêu phần của bể?',
      answer: '$\\dfrac{11}{15}$ bể.',
      solution: 'Để tính số phần bể nước cả hai vòi chảy được trong $1$ giờ, ta thực hiện phép cộng.\n\nPhép tính: $\\dfrac{1}{3} + \\dfrac{2}{5}$\n\n**Bước 1:** Quy đồng mẫu số chung là $15$.\n- $\\dfrac{1}{3} = \\dfrac{1 \\times 5}{3 \\times 5} = \\dfrac{5}{15}$\n- $\\dfrac{2}{5} = \\dfrac{2 \\times 3}{5 \\times 3} = \\dfrac{6}{15}$\n\n**Bước 2:** Cộng hai phân số.\n$\\dfrac{5}{15} + \\dfrac{6}{15} = \\dfrac{11}{15}$ (bể)\n\n**Kết luận:** Trong $1$ giờ cả hai vòi chảy được $\\dfrac{11}{15}$ bể.'
    },
    {
      code: 'T5-B3-NEW3',
      content: 'Tìm $x$, biết: $x - \\dfrac{3}{4} = \\dfrac{5}{6}$.',
      answer: '$x = \\dfrac{19}{12}$.',
      solution: 'Trong phép trừ này, $x$ đóng vai trò là số bị trừ. Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.\n\n**Bước 1:** Viết lại biểu thức.\n$x = \\dfrac{5}{6} + \\dfrac{3}{4}$\n\n**Bước 2:** Quy đồng mẫu số chung là $12$.\n- $\\dfrac{5}{6} = \\dfrac{5 \\times 2}{6 \\times 2} = \\dfrac{10}{12}$\n- $\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}$\n\n**Bước 3:** Thực hiện phép cộng.\n$x = \\dfrac{10}{12} + \\dfrac{9}{12}$\n$x = \\dfrac{19}{12}$\n\n**Kết luận:** $x = \\dfrac{19}{12}$.'
    },
    {
      code: 'T5-B3-NEW4',
      content: 'Một cuộn dây dài $48$ m. Người ta đã cắt đi $\\dfrac{5}{8}$ cuộn dây đó. Hỏi cuộn dây còn lại bao nhiêu mét?',
      answer: '$18$ m.',
      solution: 'Có hai cách giải, ở đây trình bày cách trực tiếp nhất.\n\n**Bước 1:** Tính số mét dây người ta đã cắt đi.\nLấy chiều dài cả cuộn nhân với $\\dfrac{5}{8}$:\n$48 \\times \\dfrac{5}{8} = 30$ (m)\n\n**Bước 2:** Tính số mét dây còn lại.\nLấy độ dài ban đầu trừ đi phần đã cắt:\n$48 - 30 = 18$ (m)\n\n**Kết luận:** Cuộn dây còn lại $18$ m.'
    },
    {
      code: 'T5-B3-NEW5',
      content: 'Không quy đồng mẫu số, hãy so sánh hai phân số $\\dfrac{13}{15}$ và $\\dfrac{14}{17}$.',
      answer: '$\\dfrac{13}{15} > \\dfrac{14}{17}$.',
      solution: 'Nhận xét: Cả hai phân số đều nhỏ hơn $1$. Ta sẽ so sánh phần bù tới $1$ của chúng.\n\n**Bước 1:** Tìm phần bù.\n- Phần bù tới $1$ của $\\dfrac{13}{15}$ là: $1 - \\dfrac{13}{15} = \\dfrac{2}{15}$\n- Phần bù tới $1$ của $\\dfrac{14}{17}$ là: $1 - \\dfrac{14}{17} = \\dfrac{3}{17}$\n\n**Bước 2:** So sánh $\\dfrac{2}{15}$ và $\\dfrac{3}{17}$ bằng cách quy đồng tử số.\nTa có: $\\dfrac{2}{15} = \\dfrac{2 \\times 3}{15 \\times 3} = \\dfrac{6}{45}$\n$\\dfrac{3}{17} = \\dfrac{3 \\times 2}{17 \\times 2} = \\dfrac{6}{34}$\nVì $45 > 34$ nên $\\dfrac{6}{45} < \\dfrac{6}{34}$, suy ra $\\dfrac{2}{15} < \\dfrac{3}{17}$.\n\n**Bước 3:** Rút ra kết luận.\nPhân số nào có phần bù nhỏ hơn thì phân số đó lớn hơn.\nVậy: $\\dfrac{13}{15} > \\dfrac{14}{17}$.'
    }
  ];

  const allQS = [...qsCat2.map(q => ({...q, cat: cat2})), ...qsCat3.map(q => ({...q, cat: cat3}))];

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
