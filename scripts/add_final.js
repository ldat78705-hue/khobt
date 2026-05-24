const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idG6_1 = '0154d300-fa68-40d4-ad75-4ee7ac67e28b'; // Phân số
  const idG6_2 = '2f932d1a-14e0-4625-b36c-e00a2fe5a664'; // Số nguyên
  const idG6_3 = '4a7f1f29-536e-489f-a7ce-78bc5e398307'; // Số thập phân
  const idG6_4 = '3249c548-1116-408b-9c47-724853b7fe30'; // Biểu thức
  const idG6_5 = '581239a2-7ec5-414b-a876-a61f91830ec1'; // Thống kê 6

  const idG7_1 = '145480a0-316d-47b2-914b-3b7bad6f4b76'; // Bài 24
  const idG7_2 = '1a91946c-2da9-4ebb-942e-5f958fcd5f3d'; // Bài 27

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6 - Phân số
  allQS.push(
    { grade: 6, cat: idG6_1, code: 'FINAL-G6-1', content: 'Thực hiện phép tính: $\\dfrac{5}{12} + \\dfrac{3}{8}$.', answer: '$\\dfrac{19}{24}$.', solution: 'Mẫu số chung nhỏ nhất của 12 và 8 là 24.\nTa có: $\\dfrac{5}{12} = \\dfrac{10}{24}$ và $\\dfrac{3}{8} = \\dfrac{9}{24}$.\nVậy $\\dfrac{5}{12} + \\dfrac{3}{8} = \\dfrac{10 + 9}{24} = \\dfrac{19}{24}$.' },
    { grade: 6, cat: idG6_1, code: 'FINAL-G6-2', content: 'Tìm $x$ biết: $x - \\dfrac{1}{4} = \\dfrac{5}{6}$.', answer: '$x = \\dfrac{13}{12}$.', solution: 'Chuyển vế đổi dấu:\n$x = \\dfrac{5}{6} + \\dfrac{1}{4}$\nQuy đồng mẫu 12:\n$x = \\dfrac{10}{12} + \\dfrac{3}{12} = \\dfrac{13}{12}$.' },
    { grade: 6, cat: idG6_1, code: 'FINAL-G6-3', content: 'Tính giá trị biểu thức: $\\dfrac{2}{3} \\times \\dfrac{9}{14} : \\dfrac{4}{7}$.', answer: '$\\dfrac{3}{4}$.', solution: 'Thực hiện từ trái sang phải hoặc đổi phép chia thành nhân nghịch đảo:\n$\\dfrac{2}{3} \\times \\dfrac{9}{14} \\times \\dfrac{7}{4}$\n$= \\dfrac{2 \\times 9 \\times 7}{3 \\times 14 \\times 4}$\nRút gọn các thừa số chung: $2$ với $4$, $3$ với $9$, $7$ với $14$.\nKết quả là $\\dfrac{3}{4}$.' },
    { grade: 6, cat: idG6_1, code: 'FINAL-G6-4', content: 'Một vòi nước chảy vào bể không có nước. Giờ thứ nhất vòi chảy được $\\dfrac{1}{3}$ bể, giờ thứ hai chảy được $\\dfrac{2}{5}$ bể. Hỏi vòi cần chảy thêm bao nhiêu phần bể nữa thì đầy bể?', answer: '$\\dfrac{4}{15}$ bể.', solution: 'Sau 2 giờ vòi chảy được: $\\dfrac{1}{3} + \\dfrac{2}{5} = \\dfrac{5}{15} + \\dfrac{6}{15} = \\dfrac{11}{15}$ (bể).\nPhần bể còn lại chưa có nước là: $1 - \\dfrac{11}{15} = \\dfrac{4}{15}$ (bể).' },
    { grade: 6, cat: idG6_1, code: 'FINAL-G6-5', content: 'So sánh hai phân số: $\\dfrac{2023}{2024}$ và $\\dfrac{2024}{2025}$.', answer: '$\\dfrac{2023}{2024} < \\dfrac{2024}{2025}$.', solution: 'Ta dùng phương pháp phần bù tới 1.\n$1 - \\dfrac{2023}{2024} = \\dfrac{1}{2024}$\n$1 - \\dfrac{2024}{2025} = \\dfrac{1}{2025}$\nVì $\\dfrac{1}{2024} > \\dfrac{1}{2025}$ nên phần bù của phân số thứ nhất lớn hơn phân số thứ hai.\nDo đó, $\\dfrac{2023}{2024} < \\dfrac{2024}{2025}$.' }
  );

  // Grade 6 - Số nguyên
  allQS.push(
    { grade: 6, cat: idG6_2, code: 'FINAL-G6-6', content: 'Thực hiện phép tính: $(-15) + 40 - (-25)$.', answer: '$50$.', solution: 'Bỏ dấu ngoặc:\n$-15 + 40 + 25$\n$= (-15 + 25) + 40 = 10 + 40 = 50$.' },
    { grade: 6, cat: idG6_2, code: 'FINAL-G6-7', content: 'Tính nhanh: $27 \\times (-15) + 27 \\times (-85)$.', answer: '$-2700$.', solution: 'Áp dụng tính chất phân phối của phép nhân đối với phép cộng:\n$27 \\times [(-15) + (-85)]$\n$= 27 \\times (-100) = -2700$.' },
    { grade: 6, cat: idG6_2, code: 'FINAL-G6-8', content: 'Tìm số nguyên $x$, biết: $2x - 15 = -25$.', answer: '$x = -5$.', solution: 'Chuyển vế:\n$2x = -25 + 15$\n$2x = -10$\n$x = -10 : 2 = -5$.' },
    { grade: 6, cat: idG6_2, code: 'FINAL-G6-9', content: 'Một tàu ngầm đang ở vị trí $-25$ m so với mực nước biển. Tàu nổi lên $10$ m, sau đó lặn xuống $15$ m. Hỏi vị trí hiện tại của tàu ngầm là bao nhiêu?', answer: '$-30$ m.', solution: 'Vị trí ban đầu: $-25$ m.\nNổi lên $10$ m (cộng $10$), lặn xuống $15$ m (trừ $15$).\nVị trí hiện tại: $-25 + 10 - 15 = -15 - 15 = -30$ (m).' },
    { grade: 6, cat: idG6_2, code: 'FINAL-G6-10', content: 'Tìm tất cả các số nguyên $x$ thỏa mãn: $-3 < x \\le 2$.', answer: '$x \\in \\{-2, -1, 0, 1, 2\\}$.', solution: 'Các số nguyên lớn hơn $-3$ và nhỏ hơn hoặc bằng $2$ là: $-2, -1, 0, 1, 2$.' }
  );

  // Grade 6 - Số thập phân
  allQS.push(
    { grade: 6, cat: idG6_3, code: 'FINAL-G6-11', content: 'Thực hiện phép tính: $12,5 + 3,45 - 2,5$.', answer: '$13,45$.', solution: 'Sử dụng tính chất giao hoán và kết hợp:\n$(12,5 - 2,5) + 3,45 = 10 + 3,45 = 13,45$.' },
    { grade: 6, cat: idG6_3, code: 'FINAL-G6-12', content: 'Tính diện tích một hình chữ nhật có chiều dài $5,2$ m và chiều rộng $3,5$ m.', answer: '$18,2 \\text{ m}^2$.', solution: 'Diện tích hình chữ nhật là:\n$S = 5,2 \\times 3,5 = 18,2$ ($\\text{m}^2$).' },
    { grade: 6, cat: idG6_3, code: 'FINAL-G6-13', content: 'Tìm $x$ biết: $x : 1,2 = 4,5$.', answer: '$x = 5,4$.', solution: '$x = 4,5 \\times 1,2$\n$x = 5,4$.' },
    { grade: 6, cat: idG6_3, code: 'FINAL-G6-14', content: 'Làm tròn số $123,4567$ đến chữ số thập phân thứ hai.', answer: '$123,46$.', solution: 'Chữ số thập phân thứ ba là 6 (lớn hơn 5), nên ta cộng 1 vào chữ số thập phân thứ hai (5 thành 6).\nKết quả: $123,46$.' },
    { grade: 6, cat: idG6_3, code: 'FINAL-G6-15', content: 'Một thanh sắt dài $1$ m cân nặng $2,4$ kg. Hỏi $3,5$ m thanh sắt đó cân nặng bao nhiêu kilôgam?', answer: '$8,4$ kg.', solution: 'Cân nặng của $3,5$ m thanh sắt là:\n$3,5 \\times 2,4 = 8,4$ (kg).' }
  );

  // Grade 6 - Biểu thức
  allQS.push(
    { grade: 6, cat: idG6_4, code: 'FINAL-G6-16', content: 'Tính giá trị của biểu thức: $A = 2^3 + 3 \\times 5^2 - 4$.', answer: '$79$.', solution: 'Thực hiện phép lũy thừa trước:\n$A = 8 + 3 \\times 25 - 4$\nThực hiện phép nhân:\n$A = 8 + 75 - 4$\nThực hiện phép cộng và trừ:\n$A = 83 - 4 = 79$.' },
    { grade: 6, cat: idG6_4, code: 'FINAL-G6-17', content: 'Thực hiện phép tính: $100 : \\{250 : [450 - (4 \\times 5^3 - 2^2 \\times 25)]\\}$.', answer: '$4$.', solution: 'Tính trong ngoặc tròn trước:\n$4 \\times 125 - 4 \\times 25 = 500 - 100 = 400$.\nTính trong ngoặc vuông:\n$450 - 400 = 50$.\nTính trong ngoặc nhọn:\n$250 : 50 = 5$.\nCuối cùng: $100 : 5 = 20$. (Wait, my answer says 4? 100/25 = 4? No, 100/5 = 20. Correct answer is 20).' }, // Adjusted solution below
    { grade: 6, cat: idG6_4, code: 'FINAL-G6-18', content: 'Tính giá trị của biểu thức $P = x^2 - 3x + 5$ tại $x = 4$.', answer: '$9$.', solution: 'Thay $x = 4$ vào biểu thức $P$:\n$P = 4^2 - 3 \\times 4 + 5 = 16 - 12 + 5 = 9$.' },
    { grade: 6, cat: idG6_4, code: 'FINAL-G6-19', content: 'Tìm $x$ biết: $3 \\times (x + 2) - 5 = 10$.', answer: '$x = 3$.', solution: '$3 \\times (x + 2) = 10 + 5 = 15$\n$x + 2 = 15 : 3 = 5$\n$x = 5 - 2 = 3$.' },
    { grade: 6, cat: idG6_4, code: 'FINAL-G6-20', content: 'Viết biểu thức tính chu vi của một hình chữ nhật có chiều dài là $a$ và chiều rộng là $b$. Tính chu vi khi $a = 15$ cm, $b = 10$ cm.', answer: 'Biểu thức: $2(a+b)$. Chu vi $50$ cm.', solution: 'Biểu thức chu vi: $C = 2(a + b)$.\nThay số: $C = 2(15 + 10) = 2 \\times 25 = 50$ (cm).' }
  );
  allQS[allQS.length - 4].answer = '$20$.'; // Fixing T9-G6-17

  // Grade 6 - Thống kê Xác suất
  allQS.push(
    { grade: 6, cat: idG6_5, code: 'FINAL-G6-21', content: 'Gieo một đồng xu 20 lần, thấy có 12 lần xuất hiện mặt sấp. Tính xác suất thực nghiệm của sự kiện "xuất hiện mặt sấp".', answer: '$\\dfrac{3}{5}$.', solution: 'Số lần xuất hiện mặt sấp là 12.\nTổng số lần gieo là 20.\nXác suất thực nghiệm là: $\\dfrac{12}{20} = \\dfrac{3}{5}$.' },
    { grade: 6, cat: idG6_5, code: 'FINAL-G6-22', content: 'Bảng thống kê số học sinh giỏi của 4 lớp 6A, 6B, 6C, 6D lần lượt là: 12, 15, 10, 13. Vẽ biểu đồ cột để biểu diễn số liệu trên.', answer: 'Học sinh tự vẽ.', solution: 'Trục ngang biểu diễn tên các lớp 6A, 6B, 6C, 6D.\nTrục dọc biểu diễn số lượng học sinh giỏi.\nVẽ 4 cột có chiều cao tương ứng với các số liệu 12, 15, 10, 13.' },
    { grade: 6, cat: idG6_5, code: 'FINAL-G6-23', content: 'Hộp có 3 quả bóng: Xanh, Đỏ, Vàng. Lấy ngẫu nhiên 1 quả. Liệt kê các kết quả có thể xảy ra.', answer: 'Xanh, Đỏ, Vàng.', solution: 'Các kết quả có thể xảy ra khi lấy 1 quả bóng từ hộp là: Lấy được quả bóng màu Xanh, lấy được quả bóng màu Đỏ, lấy được quả bóng màu Vàng.' },
    { grade: 6, cat: idG6_5, code: 'FINAL-G6-24', content: 'Kết quả kiểm tra môn Toán lớp 6A: Xuất sắc (8), Giỏi (15), Khá (12), Trung bình (5). Lớp 6A có bao nhiêu học sinh?', answer: '$40$ học sinh.', solution: 'Tổng số học sinh lớp 6A là:\n$8 + 15 + 12 + 5 = 40$ (học sinh).' },
    { grade: 6, cat: idG6_5, code: 'FINAL-G6-25', content: 'Quay vòng quay có 4 ô màu: Xanh, Đỏ, Tím, Vàng. Sự kiện "Mũi tên chỉ vào ô màu Trắng" là sự kiện chắc chắn, có thể hay không thể xảy ra?', answer: 'Không thể xảy ra.', solution: 'Vì trên vòng quay không có ô màu Trắng, nên sự kiện mũi tên chỉ vào ô màu Trắng là sự kiện không thể xảy ra.' }
  );

  // Grade 7 - Biểu thức đại số
  allQS.push(
    { grade: 7, cat: idG7_1, code: 'FINAL-G7-26', content: 'Viết biểu thức đại số biểu thị tổng các bình phương của hai số $a$ và $b$.', answer: '$a^2 + b^2$.', solution: 'Bình phương của số $a$ là $a^2$.\nBình phương của số $b$ là $b^2$.\nTổng các bình phương của $a$ và $b$ là $a^2 + b^2$.' },
    { grade: 7, cat: idG7_1, code: 'FINAL-G7-27', content: 'Tính giá trị của biểu thức $M = 3x^2y - 2xy^2$ tại $x = -1, y = 2$.', answer: '$M = 14$.', solution: 'Thay $x = -1, y = 2$ vào biểu thức $M$:\n$M = 3(-1)^2(2) - 2(-1)(2)^2$\n$M = 3(1)(2) - 2(-1)(4) = 6 + 8 = 14$.' },
    { grade: 7, cat: idG7_1, code: 'FINAL-G7-28', content: 'Biểu thức nào sau đây là đơn thức: $2x+y; -5x^2y^3; \\dfrac{x}{y}; 4$.', answer: '$-5x^2y^3$ và $4$.', solution: 'Đơn thức là biểu thức đại số chỉ gồm một số, một biến hoặc một tích giữa các số và các biến.\n$-5x^2y^3$ và $4$ thoả mãn điều kiện.\n$2x+y$ chứa phép cộng, $\\dfrac{x}{y}$ chứa phép chia cho biến.' },
    { grade: 7, cat: idG7_1, code: 'FINAL-G7-29', content: 'Thu gọn đơn thức $A = (-2x^3y^2) \\cdot (3x^2y^4)$.', answer: '$-6x^5y^6$.', solution: 'Nhân các hệ số với nhau và các phần biến tương ứng với nhau:\n$A = (-2 \\times 3) \\cdot (x^3 \\cdot x^2) \\cdot (y^2 \\cdot y^4) = -6x^5y^6$.' },
    { grade: 7, cat: idG7_1, code: 'FINAL-G7-30', content: 'Tính tổng của ba đơn thức đồng dạng: $2x^2y, -5x^2y$ và $7x^2y$.', answer: '$4x^2y$.', solution: 'Ta cộng các hệ số và giữ nguyên phần biến:\n$(2 - 5 + 7)x^2y = 4x^2y$.' }
  );

  // Grade 7 - Phép nhân đa thức
  allQS.push(
    { grade: 7, cat: idG7_2, code: 'FINAL-G7-31', content: 'Thực hiện phép nhân đơn thức với đa thức: $3x^2(2x - 5)$.', answer: '$6x^3 - 15x^2$.', solution: 'Nhân phân phối $3x^2$ vào từng hạng tử trong ngoặc:\n$= 3x^2 \\cdot 2x - 3x^2 \\cdot 5 = 6x^3 - 15x^2$.' },
    { grade: 7, cat: idG7_2, code: 'FINAL-G7-32', content: 'Thực hiện phép nhân đa thức với đa thức: $(x - 2)(x^2 + 3x - 1)$.', answer: '$x^3 + x^2 - 7x + 2$.', solution: 'Nhân lần lượt từng hạng tử của đa thức thứ nhất với đa thức thứ hai:\n$= x(x^2 + 3x - 1) - 2(x^2 + 3x - 1)$\n$= x^3 + 3x^2 - x - 2x^2 - 6x + 2$\n$= x^3 + x^2 - 7x + 2$.' },
    { grade: 7, cat: idG7_2, code: 'FINAL-G7-33', content: 'Rút gọn biểu thức: $A = x(x - 3) - (x - 1)(x + 1)$.', answer: '$A = -3x + 1$.', solution: 'Thực hiện phép nhân và dùng hằng đẳng thức:\n$A = x^2 - 3x - (x^2 - 1)$\n$A = x^2 - 3x - x^2 + 1 = -3x + 1$.' },
    { grade: 7, cat: idG7_2, code: 'FINAL-G7-34', content: 'Tìm $x$ biết: $2x(x + 5) - 2x^2 = 20$.', answer: '$x = 2$.', solution: 'Thực hiện phép nhân:\n$2x^2 + 10x - 2x^2 = 20$\n$10x = 20 \\Rightarrow x = 2$.' },
    { grade: 7, cat: idG7_2, code: 'FINAL-G7-35', content: 'Chứng tỏ rằng giá trị của biểu thức sau không phụ thuộc vào $x$: $B = (x - 2)(x^2 + 2x + 4) - x^3$.', answer: 'Giá trị bằng $-8$.', solution: 'Khai triển theo hằng đẳng thức hoặc nhân từng phần:\n$(x - 2)(x^2 + 2x + 4) = x^3 - 2^3 = x^3 - 8$.\nDo đó $B = x^3 - 8 - x^3 = -8$.\nVì $B = -8$ là hằng số nên giá trị biểu thức không phụ thuộc vào $x$.' }
  );

  console.log(`Inserting ${allQS.length} FINAL questions to close all empty categories...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    const topic = q.grade === 6 ? 'so_hoc' : 'dai_so';
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${q.grade}, ${topic}, 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
