const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const catId = 'a23198c9-114e-46ff-bc2b-0b666ddd5de4'; // Bài 1: Ôn tập số tự nhiên
  const grade = 5;

  const newQuestions = [
    {
      code: 'T5-B1-NEW1',
      content: 'Trong một đợt quyên góp sách ủng hộ vùng lũ lụt, trường Tiểu học Hòa Bình quyên góp được $4530$ quyển sách, trường Tiểu học Lê Lợi quyên góp được nhiều hơn trường Tiểu học Hòa Bình $1250$ quyển sách. Hỏi cả hai trường quyên góp được tất cả bao nhiêu quyển sách?',
      answer: '$10310$ quyển sách.',
      solution: 'Đọc kĩ đề bài và thực hiện phép tính theo từng bước sau:\n\n**Bước 1:** Tính số sách trường Tiểu học Lê Lợi quyên góp được.\nVì trường Lê Lợi quyên góp nhiều hơn trường Hòa Bình $1250$ quyển, ta có phép tính:\n$4530 + 1250 = 5780$ (quyển sách)\n\n**Bước 2:** Tính tổng số sách của cả hai trường.\nTa cộng số sách của trường Hòa Bình và trường Lê Lợi lại:\n$4530 + 5780 = 10310$ (quyển sách)\n\n**Kết luận:** Cả hai trường quyên góp được tất cả $10310$ quyển sách.'
    },
    {
      code: 'T5-B1-NEW2',
      content: 'Tính giá trị của biểu thức sau bằng cách thuận tiện nhất: $253 \\times 14 + 253 \\times 86 - 5300$.',
      answer: '$20000$.',
      solution: 'Để tính giá trị biểu thức bằng cách thuận tiện, ta áp dụng tính chất phân phối của phép nhân đối với phép cộng $a \\times b + a \\times c = a \\times (b + c)$.\n\n**Bước 1:** Nhóm hai số hạng đầu tiên có thừa số chung là $253$:\n$253 \\times 14 + 253 \\times 86 - 5300$\n$= 253 \\times (14 + 86) - 5300$\n\n**Bước 2:** Thực hiện phép tính trong ngoặc:\n$= 253 \\times 100 - 5300$\n\n**Bước 3:** Thực hiện phép nhân với $100$ (thêm hai chữ số $0$ vào bên phải):\n$= 25300 - 5300$\n\n**Bước 4:** Thực hiện phép trừ cuối cùng:\n$= 20000$\n\n**Kết luận:** Giá trị của biểu thức là $20000$.'
    },
    {
      code: 'T5-B1-NEW3',
      content: 'Tìm một số tự nhiên, biết rằng nếu viết thêm chữ số $5$ vào bên phải số đó thì số đó tăng thêm $410$ đơn vị.',
      answer: '$45$.',
      solution: 'Gọi số tự nhiên cần tìm là $x$ (với $x > 0$).\n\n**Bước 1:** Phân tích sự thay đổi của số khi thêm chữ số $5$ vào bên phải.\nKhi viết thêm chữ số $5$ vào bên phải số $x$, ta được số mới gấp $10$ lần số ban đầu cộng thêm $5$ đơn vị. Số mới có thể biểu diễn là: $10 \\times x + 5$.\n\n**Bước 2:** Thiết lập biểu thức từ dữ kiện đề bài.\nTheo bài ra, số mới lớn hơn số ban đầu $410$ đơn vị, nên ta có phương trình:\n$(10 \\times x + 5) - x = 410$\n\n**Bước 3:** Giải phương trình tìm $x$.\n$10 \\times x - x + 5 = 410$\n$9 \\times x = 410 - 5$\n$9 \\times x = 405$\n$x = 405 : 9$\n$x = 45$\n\n**Thử lại:** Viết thêm $5$ vào bên phải số $45$ ta được $455$. Lấy $455 - 45 = 410$ (đúng với đề bài).\n\n**Kết luận:** Số tự nhiên cần tìm là $45$.'
    },
    {
      code: 'T5-B1-NEW4',
      content: 'Một cửa hàng nhập về $3$ đợt gạo. Đợt thứ nhất nhập $1250$ kg, đợt thứ hai nhập gấp đôi đợt thứ nhất. Đợt thứ ba nhập ít hơn tổng của hai đợt đầu $400$ kg. Tính tổng số ki-lô-gam gạo cửa hàng đã nhập về trong cả ba đợt.',
      answer: '$7100$ kg.',
      solution: 'Để tìm tổng lượng gạo nhập về, ta cần tính lần lượt số gạo của từng đợt.\n\n**Bước 1:** Tính số gạo nhập về trong đợt thứ hai.\nVì đợt hai nhập gấp đôi đợt một, ta có:\n$1250 \\times 2 = 2500$ (kg)\n\n**Bước 2:** Tính tổng số gạo nhập về trong hai đợt đầu.\n$1250 + 2500 = 3750$ (kg)\n\n**Bước 3:** Tính số gạo nhập về trong đợt thứ ba.\nĐợt ba nhập ít hơn tổng hai đợt đầu $400$ kg, do đó:\n$3750 - 400 = 3350$ (kg)\n\n**Bước 4:** Tính tổng số gạo cả ba đợt.\n$3750 + 3350 = 7100$ (kg)\n\n**Kết luận:** Cửa hàng đã nhập về tổng cộng $7100$ kg gạo.'
    },
    {
      code: 'T5-B1-NEW5',
      content: 'Có $4$ xe tải nhỏ và $3$ xe tải lớn tham gia chở hàng. Mỗi xe tải nhỏ chở được $1200$ kg hàng, mỗi xe tải lớn chở được $1900$ kg hàng. Hỏi trung bình mỗi xe chở được bao nhiêu ki-lô-gam hàng?',
      answer: '$1500$ kg.',
      solution: 'Bài toán yêu cầu tính trung bình cộng, ta cần tính tổng số hàng và chia cho tổng số xe.\n\n**Bước 1:** Tính tổng số ki-lô-gam hàng $4$ xe tải nhỏ chở được.\n$1200 \\times 4 = 4800$ (kg)\n\n**Bước 2:** Tính tổng số ki-lô-gam hàng $3$ xe tải lớn chở được.\n$1900 \\times 3 = 5700$ (kg)\n\n**Bước 3:** Tính tổng khối lượng hàng của tất cả các xe.\n$4800 + 5700 = 10500$ (kg)\n\n**Bước 4:** Tính tổng số lượng xe tham gia chở hàng.\n$4 + 3 = 7$ (xe)\n\n**Bước 5:** Tính trung bình mỗi xe chở được bao nhiêu ki-lô-gam hàng.\n$10500 : 7 = 1500$ (kg)\n\n**Kết luận:** Trung bình mỗi xe chở được $1500$ kg hàng.'
    }
  ];

  console.log(`Inserting ${newQuestions.length} new questions for category ${catId}...`);

  for (const q of newQuestions) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${catId}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'so_hoc', 'tu_luan', '8316c34e-765d-4b8c-9364-b683a17e33f8', 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
