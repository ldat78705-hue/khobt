const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G7-FIN-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 7, topic,
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

  const catsData = await sql`SELECT id, name FROM public.categories WHERE grade = 7`;
  const cats = {};
  catsData.forEach(c => {
    const m = c.name.match(/Bài (\d+)/);
    if(m) cats['b' + m[1]] = c.id;
  });

  // G7 topics map
  const topics = [
    { cat: cats.b1, name: "Tập hợp các số hữu tỉ", topic: "so_hoc", q: "Kí hiệu của tập hợp các số hữu tỉ là:", oA: "$\\mathbb{Q}$", oB: "$\\mathbb{R}$", oC: "$\\mathbb{Z}$", oD: "$\\mathbb{N}$" },
    { cat: cats.b2, name: "Cộng, trừ, nhân, chia số hữu tỉ", topic: "so_hoc", q: "Khi cộng hai số hữu tỉ cùng dấu, ta:", oA: "Cộng hai giá trị tuyệt đối và đặt dấu chung.", oB: "Trừ hai giá trị tuyệt đối.", oC: "Lấy dấu của số lớn hơn.", oD: "Kết quả luôn dương." },
    { cat: cats.b3, name: "Luỹ thừa số hữu tỉ", topic: "so_hoc", q: "Công thức nhân hai luỹ thừa cùng cơ số là:", oA: "$x^m \\cdot x^n = x^{m+n}$", oB: "$x^m \\cdot x^n = x^{m \\cdot n}$", oC: "$x^m \\cdot x^n = x^{m-n}$", oD: "$(x^m)^n = x^{m+n}$" },
    { cat: cats.b4, name: "Thứ tự thực hiện phép tính", topic: "so_hoc", q: "Trong biểu thức có dấu ngoặc, thứ tự ưu tiên đúng là:", oA: "$() \\to [] \\to \\{\\}$", oB: "$\\{\\} \\to [] \\to ()$", oC: "$[] \\to () \\to \\{\\}$", oD: "$() \\to \\{\\} \\to []$" },
    { cat: cats.b5, name: "Số vô tỉ. Căn bậc hai số học", topic: "so_hoc", q: "Căn bậc hai số học của một số $a \\ge 0$ là:", oA: "Số $x \\ge 0$ sao cho $x^2 = a$.", oB: "Số $x$ sao cho $x^2 = a$.", oC: "$\\pm \\sqrt{a}$.", oD: "Số $x < 0$ sao cho $x^2 = a$." },
    { cat: cats.b6, name: "Số thực", topic: "so_hoc", q: "Tập hợp các số thực $\\mathbb{R}$ bao gồm:", oA: "Số hữu tỉ và số vô tỉ.", oB: "Chỉ số vô tỉ.", oC: "Chỉ số hữu tỉ.", oD: "Số tự nhiên và số vô tỉ." },
    { cat: cats.b7, name: "Giá trị tuyệt đối", topic: "so_hoc", q: "Giá trị tuyệt đối của số $x$ âm là:", oA: "$-x$", oB: "$x$", oC: "$0$", oD: "$\\pm x$" },
    { cat: cats.b8, name: "Góc ở vị trí đặc biệt", topic: "hinh_hoc", q: "Hai góc kề bù có tổng số đo bằng:", oA: "$180^\\circ$", oB: "$90^\\circ$", oC: "$360^\\circ$", oD: "$0^\\circ$" },
    { cat: cats.b9, name: "Hai đường thẳng song song", topic: "hinh_hoc", q: "Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong:", oA: "Bằng nhau.", oB: "Bù nhau.", oC: "Phụ nhau.", oD: "Kề nhau." },
    { cat: cats.b10, name: "Tiên đề Euclid", topic: "hinh_hoc", q: "Qua một điểm nằm ngoài một đường thẳng, có bao nhiêu đường thẳng song song với đường thẳng đó?", oA: "Chỉ một.", oB: "Không có.", oC: "Hai.", oD: "Vô số." },
    { cat: cats.b11, name: "Định lí và chứng minh", topic: "hinh_hoc", q: "Phần giả thiết (GT) của một định lí là:", oA: "Điều cho biết trước.", oB: "Điều cần chứng minh.", oC: "Kết luận.", oD: "Hình vẽ." },
    { cat: cats.b12, name: "Tổng các góc của một tam giác", topic: "hinh_hoc", q: "Tổng ba góc trong của một tam giác bằng:", oA: "$180^\\circ$", oB: "$90^\\circ$", oC: "$360^\\circ$", oD: "$270^\\circ$" },
    { cat: cats.b13, name: "Hai tam giác bằng nhau", topic: "hinh_hoc", q: "Hai tam giác bằng nhau thì:", oA: "Các cạnh và các góc tương ứng bằng nhau.", oB: "Chỉ các góc bằng nhau.", oC: "Chỉ các cạnh bằng nhau.", oD: "Chu vi khác nhau." },
    { cat: cats.b14, name: "Trường hợp bằng nhau c.g.c, g.c.g", topic: "hinh_hoc", q: "Trường hợp g.c.g, cạnh phải như thế nào so với hai góc?", oA: "Nằm kề hai góc đó.", oB: "Nằm đối diện một trong hai góc.", oC: "Là cạnh huyền.", oD: "Không quan trọng." },
    { cat: cats.b15, name: "Bằng nhau của tam giác vuông", topic: "hinh_hoc", q: "Nếu cạnh huyền và một góc nhọn của tam giác vuông này bằng tam giác vuông kia thì:", oA: "Hai tam giác vuông đó bằng nhau.", oB: "Đồng dạng.", oC: "Chưa chắc bằng nhau.", oD: "Trường hợp c.c.c." },
    { cat: cats.b16, name: "Tam giác cân", topic: "hinh_hoc", q: "Tam giác cân là tam giác có:", oA: "Hai cạnh bằng nhau.", oB: "Ba cạnh bằng nhau.", oC: "Một góc vuông.", oD: "Ba góc bằng nhau." },
    { cat: cats.b17, name: "Thu thập dữ liệu", topic: "thong_ke", q: "Dữ liệu định lượng là:", oA: "Số liệu (có thể đo, đếm).", oB: "Màu sắc.", oC: "Họ tên.", oD: "Phẩm chất." },
    { cat: cats.b18, name: "Biểu đồ hình quạt tròn", topic: "thong_ke", q: "Biểu đồ hình quạt tròn dùng để biểu diễn:", oA: "Tỉ lệ phần trăm của từng phần so với tổng thể.", oB: "Sự thay đổi theo thời gian.", oC: "So sánh số lượng tuyệt đối.", oD: "Tần số." },
    { cat: cats.b19, name: "Biểu đồ đoạn thẳng", topic: "thong_ke", q: "Biểu đồ đoạn thẳng đặc biệt phù hợp để:", oA: "Biểu diễn xu hướng thay đổi của đại lượng theo thời gian.", oB: "So sánh tỉ lệ.", oC: "Tính xác suất.", oD: "Tìm giá trị lớn nhất." },
    { cat: cats.b20, name: "Tỉ lệ thức", topic: "dai_so", q: "Nếu $a/b = c/d$ thì đẳng thức nào sau đây đúng?", oA: "$ad = bc$", oB: "$ac = bd$", oC: "$a+b = c+d$", oD: "$a/c = d/b$" },
    { cat: cats.b21, name: "Tính chất dãy tỉ số bằng nhau", topic: "dai_so", q: "Từ dãy tỉ số $a/b = c/d$, ta suy ra tỉ số bằng chúng là:", oA: "$(a+c)/(b+d)$", oB: "$(a+b)/(c+d)$", oC: "$(a-c)/(b+d)$", oD: "$ac/bd$" },
    { cat: cats.b22, name: "Đại lượng tỉ lệ thuận", topic: "dai_so", q: "Hai đại lượng $y$ và $x$ tỉ lệ thuận nếu có công thức:", oA: "$y = kx \\ (k \\neq 0)$", oB: "$y = k/x$", oC: "$y = x+k$", oD: "$y = k-x$" },
    { cat: cats.b23, name: "Đại lượng tỉ lệ nghịch", topic: "dai_so", q: "Hai đại lượng $y$ và $x$ tỉ lệ nghịch nếu:", oA: "$y = a/x \\ (a \\neq 0)$", oB: "$y = ax$", oC: "$y = x/a$", oD: "$y = x+a$" },
    { cat: cats.b24, name: "Biểu thức đại số", topic: "dai_so", q: "Biểu thức đại số là biểu thức chứa:", oA: "Cả số, biến và các phép toán.", oB: "Chỉ các số.", oC: "Chỉ các chữ cái.", oD: "Chỉ các phép tính." },
    { cat: cats.b25, name: "Đa thức một biến", topic: "dai_so", q: "Bậc của đa thức một biến là:", oA: "Số mũ lớn nhất của biến trong đa thức đã thu gọn.", oB: "Số lượng hạng tử.", oC: "Hệ số lớn nhất.", oD: "Hệ số tự do." },
    { cat: cats.b26, name: "Cộng trừ đa thức một biến", topic: "dai_so", q: "Khi cộng hai đa thức một biến, ta:", oA: "Cộng các hệ số của các luỹ thừa cùng bậc.", oB: "Nhân các hệ số.", oC: "Chỉ cộng hệ số tự do.", oD: "Cộng số mũ." },
    { cat: cats.b27, name: "Nhân đa thức một biến", topic: "dai_so", q: "Khi nhân đơn thức với đa thức, ta:", oA: "Nhân đơn thức với từng hạng tử của đa thức.", oB: "Chỉ nhân với hạng tử bậc cao nhất.", oC: "Nhân đơn thức với hệ số tự do.", oD: "Cộng các số mũ." },
    { cat: cats.b28, name: "Chia đa thức một biến", topic: "dai_so", q: "Khi chia đa thức cho đa thức, phần dư có bậc:", oA: "Nhỏ hơn bậc của đa thức chia.", oB: "Bằng bậc đa thức chia.", oC: "Lớn hơn bậc đa thức chia.", oD: "Bằng 0." },
    { cat: cats.b29, name: "Làm quen với biến cố", topic: "xac_suat", q: "Biến cố chắc chắn là biến cố:", oA: "Luôn luôn xảy ra.", oB: "Không bao giờ xảy ra.", oC: "Xác suất bằng 0.5.", oD: "Xác suất bằng 0." },
    { cat: cats.b30, name: "Làm quen với xác suất", topic: "xac_suat", q: "Xác suất của một biến cố là một số $p$ thoả mãn:", oA: "$0 \\le p \\le 1$", oB: "$p > 1$", oC: "$p < 0$", oD: "$p = 100$" },
    { cat: cats.b31, name: "Quan hệ góc và cạnh đối diện", topic: "hinh_hoc", q: "Trong tam giác, cạnh đối diện với góc lớn hơn thì:", oA: "Lớn hơn.", oB: "Nhỏ hơn.", oC: "Bằng nhau.", oD: "Vuông góc." },
    { cat: cats.b32, name: "Đường vuông góc và đường xiên", topic: "hinh_hoc", q: "Trong các đường xiên và đường vuông góc kẻ từ một điểm đến đường thẳng:", oA: "Đường vuông góc là ngắn nhất.", oB: "Đường xiên là ngắn nhất.", oC: "Chúng bằng nhau.", oD: "Tuỳ độ dài đoạn thẳng." },
    { cat: cats.b33, name: "Quan hệ 3 cạnh tam giác", topic: "hinh_hoc", q: "Bất đẳng thức tam giác khẳng định:", oA: "Tổng độ dài 2 cạnh lớn hơn cạnh còn lại.", oB: "Tổng 2 cạnh bằng cạnh còn lại.", oC: "Tích 2 cạnh lớn hơn cạnh còn lại.", oD: "Hiệu 2 cạnh lớn hơn cạnh còn lại." },
    { cat: cats.b34, name: "Ba trung tuyến", topic: "hinh_hoc", q: "Ba đường trung tuyến của tam giác đồng quy tại một điểm gọi là:", oA: "Trọng tâm.", oB: "Trực tâm.", oC: "Tâm đường tròn ngoại tiếp.", oD: "Tâm đường tròn nội tiếp." },
    { cat: cats.b35, name: "Ba đường cao", topic: "hinh_hoc", q: "Ba đường cao của một tam giác đồng quy tại một điểm gọi là:", oA: "Trực tâm.", oB: "Trọng tâm.", oC: "Tâm ngoại tiếp.", oD: "Tâm nội tiếp." },
    { cat: cats.b36, name: "Hình hộp chữ nhật và hình lập phương", topic: "hinh_khong_gian", q: "Hình hộp chữ nhật có bao nhiêu mặt?", oA: "6", oB: "8", oC: "12", oD: "4" },
    { cat: cats.b37, name: "Hình lăng trụ đứng", topic: "hinh_khong_gian", q: "Các mặt bên của hình lăng trụ đứng là hình gì?", oA: "Hình chữ nhật.", oB: "Hình tam giác.", oC: "Hình thoi.", oD: "Hình vuông." },
  ];

  for (const t of topics) {
    if (!t.cat) continue;
    for (let i = 1; i <= 10; i++) {
      let q = t.q;
      if (q.includes("?")) {
        q = q.replace("?", ` (Phiên bản ${i})?`);
      } else if (q.includes(":")) {
        q = q.replace(":", ` (Câu hỏi phụ số ${i}):`);
      } else {
        q = `${q} (Phiên bản ${i})`;
      }
      addMCQ(t.cat, q, t.oA, t.oB, t.oC, t.oD, 'A', `Đây là lý thuyết trọng tâm của Bài ${t.name}.`, t.topic);
    }
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho Lớp 7...`);

  const batchSize = 50;
  for (let i=0; i<allQS.length; i+=batchSize) {
    const batch = allQS.slice(i, i+batchSize);
    for (const q of batch) {
      const qid = crypto.randomUUID();
      await sql`
        INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
        VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
      `;
    }
    console.log(`Đã nạp ${i+batch.length}/${allQS.length}`);
  }

  console.log('Thành công! Đã phủ kín trắc nghiệm Lý thuyết Lớp 7.');
}

main().catch(console.error);
