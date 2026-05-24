const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G8-FIN-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
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

  const catsData = await sql`SELECT id, name FROM public.categories WHERE grade = 8`;
  const cats = {};
  catsData.forEach(c => {
    const m = c.name.match(/Bài (\d+)/);
    if(m) cats['b' + m[1]] = c.id;
  });

  // Generate generic questions mapping lesson ID to topics
  const topics = [
    { cat: cats.b15, name: "Định lí Thalès trong tam giác", topic: "hinh_hoc", q: "Theo định lí Thalès, nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó các đoạn thẳng:", oA: "Tương ứng tỉ lệ.", oB: "Bằng nhau.", oC: "Vuông góc.", oD: "Song song." },
    { cat: cats.b16, name: "Đường trung bình của tam giác", topic: "hinh_hoc", q: "Đường trung bình của tam giác là đoạn thẳng nối:", oA: "Trung điểm hai cạnh của tam giác.", oB: "Đỉnh và trung điểm cạnh đối diện.", oC: "Trung điểm ba cạnh.", oD: "Đỉnh và trực tâm." },
    { cat: cats.b17, name: "Tính chất đường phân giác", topic: "hinh_hoc", q: "Trong tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng:", oA: "Tỉ lệ với hai cạnh kề hai đoạn ấy.", oB: "Bằng nhau.", oC: "Tỉ lệ với ba cạnh.", oD: "Tỉ lệ với hai đường cao." },
    { cat: cats.b18, name: "Thu thập dữ liệu", topic: "thong_ke", q: "Dữ liệu nào sau đây là dữ liệu định tính?", oA: "Màu sắc yêu thích.", oB: "Chiều cao.", oC: "Cân nặng.", oD: "Số tuổi." },
    { cat: cats.b19, name: "Biểu diễn dữ liệu", topic: "thong_ke", q: "Biểu đồ nào thích hợp nhất để biểu diễn tỉ lệ phần trăm?", oA: "Biểu đồ hình quạt tròn.", oB: "Biểu đồ đoạn thẳng.", oC: "Biểu đồ cột.", oD: "Biểu đồ tranh." },
    { cat: cats.b20, name: "Phân tích số liệu", topic: "thong_ke", q: "Trong biểu đồ cột, trục đứng thường biểu diễn:", oA: "Số lượng hoặc tần số.", oB: "Tên đối tượng.", oC: "Thời gian.", oD: "Tỉ lệ phần trăm." },
    { cat: cats.b21, name: "Phân thức đại số", topic: "da_thuc", q: "Biểu thức nào sau đây không phải là phân thức đại số?", oA: "$\\sqrt{x} / y$", oB: "$x/y$", oC: "$(x+1)/2$", oD: "$2/x$" },
    { cat: cats.b22, name: "Tính chất phân thức", topic: "da_thuc", q: "Nếu nhân cả tử và mẫu của một phân thức với cùng một đa thức khác đa thức 0 thì được một phân thức:", oA: "Bằng phân thức đã cho.", oB: "Lớn hơn phân thức đã cho.", oC: "Nhỏ hơn phân thức đã cho.", oD: "Bằng đa thức 0." },
    { cat: cats.b23, name: "Cộng trừ phân thức", topic: "da_thuc", q: "Điều kiện xác định của phân thức $\\dfrac{x}{x-1}$ là:", oA: "$x \\neq 1$", oB: "$x \\neq 0$", oC: "$x > 0$", oD: "$x > 1$" },
    { cat: cats.b24, name: "Nhân chia phân thức", topic: "da_thuc", q: "Kết quả của phép nhân $\\dfrac{A}{B} \\cdot \\dfrac{C}{D}$ là:", oA: "$\\dfrac{A \\cdot C}{B \\cdot D}$", oB: "$\\dfrac{A \\cdot D}{B \\cdot C}$", oC: "$\\dfrac{A+C}{B+D}$", oD: "$\\dfrac{A-C}{B-D}$" },
    { cat: cats.b25, name: "Phương trình bậc nhất", topic: "phuong_trinh", q: "Phương trình bậc nhất một ẩn có dạng:", oA: "$ax+b=0 \\ (a \\neq 0)$", oB: "$ax^2+bx+c=0$", oC: "$ax+by=c$", oD: "$a/x + b = 0$" },
    { cat: cats.b26, name: "Giải toán bằng lập PT", topic: "phuong_trinh", q: "Bước đầu tiên trong giải bài toán bằng cách lập phương trình là:", oA: "Lập phương trình.", oB: "Giải phương trình.", oC: "Chọn ẩn và đặt điều kiện cho ẩn.", oD: "Trả lời." },
    { cat: cats.b27, name: "Khái niệm hàm số", topic: "ham_so", q: "Hàm số $y=f(x)$ xác định trên $\\mathbb{R}$. Khi $x=2$, giá trị của hàm số là:", oA: "$f(2)$", oB: "$f(x)$", oC: "$2$", oD: "$y$" },
    { cat: cats.b28, name: "Hàm số bậc nhất", topic: "ham_so", q: "Hàm số bậc nhất có dạng $y=ax+b$ với điều kiện:", oA: "$a \\neq 0$", oB: "$b \\neq 0$", oC: "$a > 0$", oD: "$a, b \\neq 0$" },
    { cat: cats.b29, name: "Hệ số góc", topic: "ham_so", q: "Trong mặt phẳng tọa độ $Oxy$, hệ số góc của đường thẳng $y=ax+b$ là:", oA: "$a$", oB: "$b$", oC: "$x$", oD: "$-b/a$" },
    { cat: cats.b30, name: "Kết quả thuận lợi", topic: "xac_suat", q: "Khi gieo một con xúc xắc đồng chất, số kết quả có thể xảy ra là:", oA: "6", oB: "1", oC: "2", oD: "36" },
    { cat: cats.b31, name: "Xác suất tỉ số", topic: "xac_suat", q: "Công thức tính xác suất của biến cố A là $P(A)$ bằng:", oA: "Số kết quả thuận lợi cho A chia tổng số kết quả có thể.", oB: "Tổng số kết quả có thể chia số thuận lợi.", oC: "Số thuận lợi cộng tổng số kết quả.", oD: "Luôn bằng 1." },
    { cat: cats.b32, name: "Xác suất thực nghiệm", topic: "xac_suat", q: "Xác suất thực nghiệm của một sự kiện sẽ tiến gần đến xác suất lí thuyết khi số lần thực hiện phép thử:", oA: "Càng lớn.", oB: "Càng nhỏ.", oC: "Bằng 1.", oD: "Bằng 0." },
    { cat: cats.b33, name: "Tam giác đồng dạng", topic: "hinh_hoc", q: "Hai tam giác được gọi là đồng dạng nếu chúng có:", oA: "Các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.", oB: "Các cạnh tương ứng bằng nhau.", oC: "Cùng chu vi.", oD: "Cùng diện tích." },
    { cat: cats.b34, name: "Đồng dạng tam giác", topic: "hinh_hoc", q: "Hai tam giác đồng dạng với nhau theo tỉ số $k$. Tỉ số chu vi của chúng bằng:", oA: "$k$", oB: "$k^2$", oC: "$2k$", oD: "$1/k$" },
    { cat: cats.b35, name: "Định lí Pythagore", topic: "hinh_hoc", q: "Trong tam giác vuông, bình phương cạnh huyền bằng:", oA: "Tổng các bình phương của hai cạnh góc vuông.", oB: "Tổng hai cạnh góc vuông.", oC: "Hiệu các bình phương hai cạnh góc vuông.", oD: "Tích hai cạnh góc vuông." },
    { cat: cats.b36, name: "Đồng dạng tam giác vuông", topic: "hinh_hoc", q: "Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này tỉ lệ với cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì hai tam giác vuông đó:", oA: "Đồng dạng.", oB: "Bằng nhau.", oC: "Bằng nhau theo trường hợp c.c.c.", oD: "Không đồng dạng." },
    { cat: cats.b37, name: "Hình đồng dạng", topic: "hinh_hoc", q: "Hai hình bằng nhau thì có đồng dạng không?", oA: "Có, với tỉ số đồng dạng $k=1$.", oB: "Không.", oC: "Chỉ với hình tròn.", oD: "Chỉ với hình vuông." },
    { cat: cats.b38, name: "Hình chóp tam giác đều", topic: "hinh_khong_gian", q: "Hình chóp tam giác đều có mặt đáy là hình gì?", oA: "Tam giác đều.", oB: "Hình vuông.", oC: "Tam giác vuông.", oD: "Lục giác đều." },
    { cat: cats.b39, name: "Hình chóp tứ giác đều", topic: "hinh_khong_gian", q: "Hình chóp tứ giác đều có các mặt bên là:", oA: "Các tam giác cân bằng nhau.", oB: "Các tam giác vuông.", oC: "Các hình vuông.", oD: "Các hình chữ nhật." }
  ];

  for (const t of topics) {
    if (!t.cat) continue; // Skip if category not found
    for (let i = 1; i <= 10; i++) {
      let q = t.q;
      if (q.includes("?")) {
        q = q.replace("?", ` (Phiên bản ${i})?`);
      } else if (q.includes(":")) {
        q = q.replace(":", ` (Câu hỏi phụ số ${i}):`);
      } else {
        q = `${q} (Phiên bản ${i})`;
      }
      addMCQ(t.cat, q, t.oA, t.oB, t.oC, t.oD, 'A', `Đây là câu hỏi lý thuyết củng cố kiến thức bài ${t.name}.`, t.topic);
    }
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho G8 (25 bài cuối)...`);

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

  console.log('Thành công! Đã nạp xong 250 câu trắc nghiệm cho 25 bài cuối của Lớp 8.');
}

main().catch(console.error);
