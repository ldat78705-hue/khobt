const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`SELECT id, name, grade FROM public.categories`;
  
  const getCatId = (grade, keyword) => {
    const matched = cats.filter(c => c.grade === grade && c.name.toLowerCase().includes(keyword.toLowerCase()));
    if (matched.length > 0) return matched[0].id;
    const fallback = cats.find(c => c.grade === grade && c.parent_id !== null);
    return fallback ? fallback.id : cats.find(c => c.grade === grade).id;
  };

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (grade, topic_kw, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: getCatId(grade, topic_kw),
      code: `G${grade}-MCQ-M-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade, topic,
      content,
      options: JSON.stringify([
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ]),
      correct_answer: correctKey,
      solution
    });
  };

  // ================= LỚP 9 (10 câu) =================
  addMCQ(9, 'vi-ét', 'Theo định lý Vi-ét, nếu phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) có hai nghiệm $x_1, x_2$ thì tổng hai nghiệm là:', '$x_1 + x_2 = \\dfrac{c}{a}$', '$x_1 + x_2 = -\\dfrac{c}{a}$', '$x_1 + x_2 = \\dfrac{b}{a}$', '$x_1 + x_2 = -\\dfrac{b}{a}$', 'D', 'Theo định lý Vi-ét: Tổng hai nghiệm $S = x_1 + x_2 = -\\dfrac{b}{a}$.', 'phuong_trinh');
  addMCQ(9, 'tứ giác', 'Tứ giác nội tiếp đường tròn là tứ giác có:', 'Bốn góc bằng nhau.', 'Tổng hai góc đối diện bằng $180^\\circ$.', 'Hai đường chéo vuông góc.', 'Các cạnh đối bằng nhau.', 'B', 'Tính chất cơ bản của tứ giác nội tiếp là tổng số đo hai góc đối diện luôn bằng $180^\\circ$.', 'duong_tron');
  addMCQ(9, 'nón', 'Công thức tính thể tích hình nón có bán kính đáy $R$ và chiều cao $h$ là:', '$V = \\pi R^2 h$', '$V = \\dfrac{1}{3} \\pi R^2 h$', '$V = \\dfrac{4}{3} \\pi R^3$', '$V = \\pi R l$', 'B', 'Thể tích hình nón bằng một phần ba thể tích hình trụ có cùng đáy và chiều cao: $V = \\dfrac{1}{3} \\pi R^2 h$.', 'hinh_khong_gian');
  for (let i = 4; i <= 10; i++) {
    addMCQ(9, 'căn', `Biểu thức $\\sqrt{(${i} - \\sqrt{${i+5}})^2}$ bằng:`, `${i} - \\sqrt{${i+5}}`, `\\sqrt{${i+5}} - ${i}`, `${i} + \\sqrt{${i+5}}`, `-${i} - \\sqrt{${i+5}}`, 'A', `Vì ${i} = \\sqrt{${i*i}} > \\sqrt{${i+5}} nên ${i} - \\sqrt{${i+5}} > 0. Do đó $\\sqrt{(${i} - \\sqrt{${i+5}})^2} = |${i} - \\sqrt{${i+5}}| = ${i} - \\sqrt{${i+5}}$.`, 'can_thuc');
  }

  // ================= LỚP 8 (10 câu) =================
  addMCQ(8, 'hằng đẳng', 'Hằng đẳng thức lập phương của một tổng $(A+B)^3$ là:', '$A^3 + 3A^2B + 3AB^2 + B^3$', '$A^3 + B^3$', '$A^3 + 3AB + B^3$', '$A^3 - 3A^2B + 3AB^2 - B^3$', 'A', 'Khai triển đúng: $(A+B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$.', 'bieu_thuc');
  addMCQ(8, 'thal', 'Định lý Thalès trong tam giác phát biểu rằng:', 'Đường trung bình của tam giác thì song song với cạnh đáy và bằng một nửa cạnh đáy.', 'Nếu một đường thẳng cắt hai cạnh của một tam giác và song song với cạnh còn lại thì nó định ra trên hai cạnh đó các đoạn thẳng tương ứng tỉ lệ.', 'Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.', 'Các đường phân giác của tam giác đồng quy tại một điểm.', 'B', 'Đây là nội dung chuẩn xác của định lý Thalès thuận.', 'hinh_hoc');
  for (let i = 3; i <= 10; i++) {
    addMCQ(8, 'đa giác', `Tổng các góc trong của một đa giác ${i+3} cạnh là bao nhiêu?`, `$${(i+3)*180}^\\circ$`, `$${(i+3-2)*180}^\\circ$`, `$360^\\circ$`, `$${(i+3-1)*180}^\\circ$`, 'B', `Công thức tính tổng các góc trong của đa giác $n$ cạnh là $(n-2) \\times 180^\\circ$. Với $n=${i+3}$, tổng là $(${i+3}-2) \\times 180^\\circ = ${(i+1)*180}^\\circ$.`, 'hinh_hoc');
  }

  // ================= LỚP 7 (10 câu) =================
  addMCQ(7, 'tỉ lệ thuận', 'Hai đại lượng $x$ và $y$ tỉ lệ thuận với nhau thì công thức biểu diễn là:', '$y = \\dfrac{k}{x}$', '$x \\cdot y = k$', '$y = kx$', '$y = x + k$', 'C', 'Nếu $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$ thì $y = kx$.', 'dai_so');
  addMCQ(7, 'tam giác', 'Trường hợp bằng nhau Cạnh-Góc-Cạnh (c.g.c) của tam giác đòi hỏi góc được nhắc đến phải:', 'Là góc bất kỳ trong tam giác.', 'Là góc lớn nhất trong tam giác.', 'Là góc xen giữa hai cạnh được nhắc đến.', 'Là góc vuông.', 'C', 'Theo định lý c.g.c, nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác đó bằng nhau.', 'tam_giac');
  for (let i = 3; i <= 10; i++) {
    addMCQ(7, 'số hữu tỉ', `Phân số nào sau đây biểu diễn số hữu tỉ $\\dfrac{${i}}{${i+1}}$?`, `$\\dfrac{${i*2}}{${(i+1)*2}}$`, `$\\dfrac{${i+1}}{${i+2}}$`, `$\\dfrac{${i*3}}{${(i+1)*4}}$`, `$\\dfrac{${i}}{${i+2}}$`, 'A', `Nhân cả tử và mẫu với 2 ta được: $\\dfrac{${i}}{${i+1}} = \\dfrac{${i*2}}{${(i+1)*2}}$.`, 'so_hoc');
  }

  // ================= LỚP 6 (10 câu) =================
  addMCQ(6, 'ước chung lớn nhất', 'ƯCLN(12, 18) là bao nhiêu?', '2', '3', '6', '36', 'C', 'Phân tích ra thừa số nguyên tố: $12 = 2^2 \\times 3$, $18 = 2 \\times 3^2$. Vậy ƯCLN là $2 \\times 3 = 6$.', 'so_hoc');
  addMCQ(6, 'số nguyên', 'Tích của hai số nguyên âm là:', 'Một số nguyên âm.', 'Một số nguyên dương.', 'Số không.', 'Một phân số.', 'B', 'Quy tắc nhân hai số nguyên cùng dấu: $(-a) \\times (-b) = a \\times b > 0$.', 'so_hoc');
  for (let i = 3; i <= 10; i++) {
    addMCQ(6, 'hình thoi', `Chu vi hình thoi có cạnh bằng ${i+2} \\text{ cm} là:`, `${(i+2)*2} \\text{ cm}`, `${(i+2)*3} \\text{ cm}`, `${(i+2)*4} \\text{ cm}`, `${(i+2)*(i+2)} \\text{ cm}`, 'C', `Hình thoi có 4 cạnh bằng nhau nên Chu vi $C = 4 \\times a = 4 \\times ${i+2} = ${(i+2)*4} \\text{ cm}$.`, 'hinh_hoc');
  }

  // ================= LỚP 5 (10 câu) =================
  addMCQ(5, 'diện tích', 'Công thức tính diện tích hình tròn có bán kính $r$ là:', '$S = 2 \\times r \\times 3,14$', '$S = r \\times r \\times 3,14$', '$S = r \\times r \\times 3,14 : 2$', '$S = r + r \\times 3,14$', 'B', 'Diện tích hình tròn bằng bán kính nhân với bán kính rồi nhân với số Pi ($3,14$).', 'hinh_hoc');
  addMCQ(5, 'số thập phân', 'Giá trị của chữ số 5 trong số thập phân 12,356 là:', '5 chục', '5 phần mười', '5 phần trăm', '5 phần nghìn', 'C', 'Chữ số 5 nằm ở vị trí thứ hai sau dấu phẩy nên có giá trị là 5 phần trăm ($\\dfrac{5}{100}$ hay $0,05$).', 'so_thap_phan');
  for (let i = 3; i <= 10; i++) {
    addMCQ(5, 'thể tích', `Thể tích của hình lập phương có cạnh ${i} \\text{ cm} là:`, `${i*3} \\text{ cm}^3`, `${i*i} \\text{ cm}^3`, `${i*i*i} \\text{ cm}^3`, `${i*4} \\text{ cm}^3`, 'C', `Công thức thể tích hình lập phương: $V = a \\times a \\times a = ${i} \\times ${i} \\times ${i} = ${i**3} \\text{ cm}^3$.`, 'do_luong');
  }

  // ================= LỚP 4 (10 câu) =================
  addMCQ(4, 'trung bình cộng', 'Muốn tìm số trung bình cộng của nhiều số ta làm thế nào?', 'Lấy tổng của các số chia cho 2.', 'Lấy tổng của các số chia cho số các số hạng.', 'Lấy tích các số chia cho số các số hạng.', 'Lấy số lớn nhất cộng với số nhỏ nhất rồi chia 2.', 'B', 'Muốn tìm trung bình cộng của nhiều số, ta tính tổng của các số đó, rồi chia tổng đó cho số các số hạng.', 'so_hoc');
  addMCQ(4, 'chia hết', 'Số nào sau đây chia hết cho cả 2 và 5?', '125', '204', '350', '405', 'C', 'Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Trong các số trên, chỉ có 350 là có chữ số tận cùng bằng 0.', 'so_hoc');
  for (let i = 3; i <= 10; i++) {
    addMCQ(4, 'phép tính', `Kết quả của phép tính ${i*10} \\times 100 là:`, `${i*100}`, `${i*1000}`, `${i*10}`, `${i*10000}`, 'B', `Khi nhân một số với 100, ta chỉ việc thêm 2 chữ số 0 vào bên phải số đó. ${i*10} thêm 00 thành ${i*1000}.`, 'so_hoc');
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu trắc nghiệm lý thuyết vào DB...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'nhan_biet', ${q.grade}, ${q.topic}, 'trac_nghiem', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp 60 câu Trắc nghiệm cho Phòng Ôn tập.');
}

main().catch(console.error);
