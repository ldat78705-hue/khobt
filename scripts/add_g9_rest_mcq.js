const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G9-FIN-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 9, topic,
      content,
      options: JSON.stringify([
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ]),
      correct_answer: correctKey,
      solution,
      type: 'trac_nghiem'
    });
  };

  // 20. Định lí Viète
  const b20 = '8b0904e8-14c7-4801-80fe-ea3793cd6d06';
  for (let i=1; i<=10; i++) {
    addMCQ(b20, `Cho phương trình $x^2 - ${i+2}x + ${i} = 0$. Gọi $x_1, x_2$ là hai nghiệm. Tính $x_1 x_2$.`, `$${i}$`, `$${i+2}$`, `$-${i}$`, `$-${i+2}$`, 'A', `Theo định lí Viète, tích hai nghiệm $P = x_1 x_2 = \\dfrac{c}{a} = \\dfrac{${i}}{1} = ${i}$.`, 'phuong_trinh');
  }

  // 21. Lập PT bậc hai
  const b21 = 'd01a0e53-18f0-4973-b065-8eaa970e7f09';
  for (let i=1; i<=10; i++) {
    addMCQ(b21, `Hai số nguyên dương có hiệu bằng ${i} và tích bằng ${i*i+i}. Hai số đó là:`, `$${i+1}$ và $1$`, `$${i+2}$ và $2$`, `$\\dfrac{${i}}{2}$ và $2$`, `Không xác định`, 'A', `Gọi số nhỏ là $x$. Số lớn là $x+${i}$. Tích là $x(x+${i}) = ${i*i+i} \\Leftrightarrow x^2 + ${i}x - ${i*i+i} = 0$. Nghiệm dương là $x = 1$. Số lớn là $1+${i}$.`, 'phuong_trinh');
  }

  // 22. Bảng tần số và biểu đồ (thống kê)
  const b22 = '84df62ce-aa84-4178-a52c-e821a17989cb';
  for (let i=1; i<=10; i++) {
    addMCQ(b22, `Trong bảng tần số, tổng các tần số luôn bằng:`, `Số lượng giá trị phân biệt.`, `Kích thước mẫu (số lượng toàn bộ dữ liệu).`, `Giá trị trung bình.`, `$100\\%$.`, 'B', `Tổng tần số (số lần xuất hiện của tất cả các giá trị) phải bằng kích thước của mẫu dữ liệu $N$.`, 'thong_ke');
  }

  // 23. Tần số tương đối
  const b23 = '6c7bdaaa-f5e3-4625-a19f-a83c825c42b1';
  for (let i=1; i<=10; i++) {
    addMCQ(b23, `Tần số tương đối của một giá trị được tính bằng cách:`, `Lấy tần số chia cho tổng số dữ liệu (kích thước mẫu).`, `Lấy giá trị đó nhân với tần số.`, `Lấy tổng số dữ liệu chia cho tần số.`, `Cộng tất cả tần số lại.`, 'A', `Tần số tương đối $f = \\dfrac{n}{N}$ (trong đó $n$ là tần số, $N$ là kích thước mẫu), thường được biểu diễn dưới dạng phần trăm.`, 'thong_ke');
  }

  // 24. Ghép nhóm
  const b24 = '0bd2aad4-d21f-4bc5-9d3a-ba8d4b89b39f';
  for (let i=1; i<=10; i++) {
    addMCQ(b24, `Khi nhóm dữ liệu vào các khoảng $[a; b)$, giá trị $b$ có được tính vào nhóm đó không?`, `Có.`, `Không.`, `Tuỳ vào kích thước mẫu.`, `Chỉ tính khi $a = 0$.`, 'B', `Kí hiệu $[a; b)$ nghĩa là nửa khoảng từ $a$ đến $b$, lấy giá trị $a$ nhưng KHÔNG lấy giá trị $b$.`, 'thong_ke');
  }

  // 25. Phép thử và Không gian mẫu
  const b25 = '364d9a49-21a0-4e3e-8691-21a5f2f2932d';
  for (let i=1; i<=10; i++) {
    addMCQ(b25, `Kí hiệu $\\Omega$ trong xác suất thống kê đại diện cho:`, `Một biến cố chắc chắn.`, `Không gian mẫu (tập hợp tất cả kết quả có thể).`, `Xác suất của một biến cố.`, `Biến cố không thể.`, 'B', `$\\Omega$ là không gian mẫu, tập hợp tất cả các kết quả có thể xảy ra của một phép thử ngẫu nhiên.`, 'xac_suat');
  }

  // 26. Xác suất biến cố
  const b26 = '6761ba97-621a-4a08-8f08-dbb218ce7df2';
  for (let i=1; i<=10; i++) {
    addMCQ(b26, `Gieo một con xúc xắc cân đối. Xác suất để xuất hiện mặt ${i > 6 ? i%6+1 : i} chấm là:`, `$\\dfrac{1}{6}$`, `$\\dfrac{1}{2}$`, `$\\dfrac{${i > 6 ? i%6+1 : i}}{6}$`, `$1$`, 'A', `Không gian mẫu có 6 kết quả đồng khả năng. Biến cố xuất hiện 1 mặt cụ thể có 1 kết quả thuận lợi. Xác suất là $\\dfrac{1}{6}$.`, 'xac_suat');
  }

  // 27. Góc nội tiếp
  const b27 = 'de6eff7c-5049-442b-a019-ccda3152b146';
  for (let i=1; i<=10; i++) {
    addMCQ(b27, `Trong một đường tròn, góc nội tiếp chắn nửa đường tròn là:`, `Góc nhọn.`, `Góc vuông.`, `Góc tù.`, `Góc bẹt.`, 'B', `Theo hệ quả: Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).`, 'duong_tron');
  }

  // 28. Ngoại tiếp, nội tiếp tam giác
  const b28 = '3af258b0-0c69-4f69-bcdb-061db0be4cb7';
  for (let i=1; i<=10; i++) {
    addMCQ(b28, `Tâm đường tròn ngoại tiếp tam giác là giao điểm của:`, `Ba đường trung tuyến.`, `Ba đường phân giác.`, `Ba đường trung trực của tam giác.`, `Ba đường cao.`, 'C', `Tâm đường tròn ngoại tiếp cách đều 3 đỉnh, nên nó nằm trên 3 đường trung trực của tam giác.`, 'duong_tron');
  }

  // 29. Tứ giác nội tiếp
  const b29 = 'abd93d32-a146-4ff6-b0d4-dbca1a853684';
  for (let i=1; i<=10; i++) {
    addMCQ(b29, `Một tứ giác nội tiếp đường tròn nếu và chỉ nếu:`, `Có hai góc đối bằng nhau.`, `Tổng hai góc đối diện bằng $180^\\circ$.`, `Có hai đường chéo vuông góc.`, `Các cạnh đối song song.`, 'B', `Điều kiện cần và đủ để tứ giác nội tiếp là tổng số đo hai góc đối diện bằng $180^\\circ$.`, 'duong_tron');
  }

  // 30. Đa giác đều
  const b30 = 'ba7b12c2-6720-42dd-b587-75aa04738833';
  for (let i=1; i<=10; i++) {
    addMCQ(b30, `Đa giác đều là đa giác có:`, `Tất cả các cạnh bằng nhau.`, `Tất cả các góc bằng nhau.`, `Tất cả các cạnh bằng nhau và tất cả các góc bằng nhau.`, `Nội tiếp được đường tròn.`, 'C', `Định nghĩa đa giác đều: Đa giác đều là đa giác có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau.`, 'duong_tron');
  }

  // 31. Hình trụ, nón
  const b31 = '8e983753-201a-4a9f-857f-4fac0eb3cbc1';
  for (let i=1; i<=10; i++) {
    addMCQ(b31, `Công thức diện tích xung quanh của hình trụ bán kính $R$, chiều cao $h$ là:`, `$2\\pi Rh$`, `$\\pi R^2h$`, `$\\pi R l$`, `$\\dfrac{1}{3}\\pi R^2h$`, 'A', `Diện tích xung quanh hình trụ được tính bằng chu vi đáy nhân với chiều cao: $S_{xq} = 2\\pi R h$.`, 'hinh_khong_gian');
  }

  // 32. Hình cầu
  const b32 = '90fb47e3-2e8b-4936-8b67-a55051e1fbe4';
  for (let i=1; i<=10; i++) {
    addMCQ(b32, `Thể tích của hình cầu có bán kính $R$ là:`, `$\\dfrac{4}{3}\\pi R^3$`, `$4\\pi R^2$`, `$\\dfrac{1}{3}\\pi R^3$`, `$\\pi R^3$`, 'A', `Theo công thức, thể tích hình cầu được tính bởi $V = \\dfrac{4}{3}\\pi R^3$. (Chú ý: $4\\pi R^2$ là diện tích mặt cầu).`, 'hinh_khong_gian');
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho G9 (13 bài cuối)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp xong 130 câu trắc nghiệm cho 13 bài cuối cùng của Lớp 9.');
}

main().catch(console.error);
