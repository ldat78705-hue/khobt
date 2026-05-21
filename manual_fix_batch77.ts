import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch77() {
  const sql = getDb();

  const sol1 = `Để kiểm tra nhận định “Các bạn học sinh nữ biết nấu ăn nhiều hơn các bạn nam”, Hùng có thể lập bảng câu hỏi khảo sát gồm các nội dung sau:\n\n` +
`**BẢNG KHẢO SÁT KĨ NĂNG NẤU ĂN**\n` +
`1. Giới tính của bạn là gì?\n` +
`   $\\square$ Nam        $\\square$ Nữ\n\n` +
`2. Bạn có biết nấu ăn không? (Có thể tự nấu một bữa cơm gia đình đơn giản)\n` +
`   $\\square$ Có         $\\square$ Không\n\n` +
`*Sau khi thu thập phiếu khảo sát, Hùng tiến hành thống kê số lượng học sinh Nam và Nữ biết nấu ăn. Từ đó so sánh tỉ lệ hoặc số lượng để rút ra kết luận xem nhận định ban đầu là đúng hay sai.*`;

  const sol2 = `*(Đây là bài toán liên quan đến phần trăm và lãi suất)*\n\n` +
`Số tiền lãi bác An nhận được sau $1$ năm là:\n` +
`$$20\\ 000\\ 000 \\cdot 6,5\\% = 20\\ 000\\ 000 \\cdot \\frac{6,5}{100} = 1\\ 300\\ 000 \\text{ (đồng)}$$\n\n` +
`Tổng số tiền cả vốn lẫn lãi bác An nhận được sau $1$ năm là:\n` +
`$$20\\ 000\\ 000 + 1\\ 300\\ 000 = 21\\ 300\\ 000 \\text{ (đồng)}$$\n\n` +
`**Kết luận:** Tổng số tiền bác An nhận được là $21\\ 300\\ 000$ đồng.`;

  const sol3 = `**a)** $\\frac{x}{27} = \\frac{-2}{3,6}$\n` +
`$\\Rightarrow x = \\frac{27 \\cdot (-2)}{3,6} = \\frac{-54}{3,6} = -15$.\n\n` +
`**b)** $-0,52 : x = -9,36 : 16,38$\n` +
`Ta viết lại dưới dạng phân số: $\\frac{-0,52}{x} = \\frac{-9,36}{16,38}$\n` +
`$\\Rightarrow x = \\frac{-0,52 \\cdot 16,38}{-9,36} = 0,91$.\n\n` +
`**c)** $\\frac{4\\frac{1}{4}}{2\\frac{7}{8}} = \\frac{x}{1,61}$\n` +
`Đổi hỗn số ra phân số:\n` +
`$4\\frac{1}{4} = \\frac{17}{4}$ và $2\\frac{7}{8} = \\frac{23}{8}$.\n` +
`Thực hiện phép chia ở vế trái:\n` +
`$\\frac{17}{4} : \\frac{23}{8} = \\frac{17}{4} \\cdot \\frac{8}{23} = \\frac{34}{23}$.\n` +
`Ta có phương trình: $\\frac{34}{23} = \\frac{x}{1,61}$\n` +
`$\\Rightarrow x = \\frac{34 \\cdot 1,61}{23} = 34 \\cdot 0,07 = 2,38$.`;

  const sol4 = `*(Do đề bài không đính kèm hình ảnh biểu đồ 5.16, học sinh áp dụng phương pháp sau)*\n\n` +
`**Phương pháp giải:**\n` +
`1. **Đọc biểu đồ:** \n` +
`   - Đối với biểu đồ cột/đoạn thẳng, gióng từ các điểm/đỉnh cột sang trục tung để lấy giá trị số liệu.\n` +
`   - Liệt kê lần lượt các số liệu thành $2$ dãy số tương ứng với $2$ biểu đồ.\n` +
`2. **So sánh:**\n` +
`   - So sánh các cặp giá trị tương ứng của hai dãy số tại cùng một thời điểm/đối tượng.\n` +
`   - Rút ra nhận xét chung về xu hướng (tăng/giảm, lớn hơn/nhỏ hơn) của hai tập dữ liệu.`;

  const sol5 = `*(Do đề bài không có hình vẽ, ta chứng minh theo mẫu bài toán nhận biết hai đường thẳng song song)*\n\n` +
`Để chứng minh $a \\parallel b$, ta quan sát hình vẽ và tìm các cặp góc tạo bởi cát tuyến cắt hai đường thẳng $a$ và $b$:\n` +
`- Nếu có một cặp góc **so le trong** bằng nhau (ví dụ $\\widehat{A_1} = \\widehat{B_2}$).\n` +
`- Nếu có một cặp góc **đồng vị** bằng nhau.\n` +
`- Nếu có một cặp góc **trong cùng phía** có tổng bằng $180^\\circ$.\n` +
`- Hoặc cả $a$ và $b$ cùng vuông góc với một đường thẳng thứ ba.\n\n` +
`Thỏa mãn một trong các dấu hiệu trên, ta kết luận đường thẳng $a \\parallel b$ (đpcm).`;

  const sol6 = `**a)** $\\left( 3\\frac{1}{2} \\right)^0$\n` +
`Theo quy ước, mọi số $x \\ne 0$ thì $x^0 = 1$.\n` +
`Do đó: $\\left( 3\\frac{1}{2} \\right)^0 = 1$.\n\n` +
`**b)** $\\left( -0,25 \\right)^2$\n` +
`$= \\left( -\\frac{1}{4} \\right)^2 = \\frac{1}{16}$ (hoặc viết dưới dạng thập phân là $0,0625$).\n\n` +
`**c)** $\\left( 0,3 \\right)^3$\n` +
`$= 0,3 \\cdot 0,3 \\cdot 0,3 = 0,027$ (hoặc $\\left(\\frac{3}{10}\\right)^3 = \\frac{27}{1000}$). \n\n` +
`**d)** $\\left( \\frac{a}{b} \\right)^1$\n` +
`Mọi số mũ $1$ đều bằng chính nó.\n` +
`Do đó: $\\left( \\frac{a}{b} \\right)^1 = \\frac{a}{b}$.`;

  const sol7 = `Số tiền lãi bác An nhận được sau $1$ năm gửi ngân hàng là:\n` +
`$20\\ 000\\ 000 \\cdot 6,5\\% = 20\\ 000\\ 000 \\cdot \\frac{6,5}{100} = 1\\ 300\\ 000$ (đồng).\n\n` +
`Sau $1$ năm, bác An nhận được tổng cộng số tiền cả vốn lẫn lãi là:\n` +
`$20\\ 000\\ 000 + 1\\ 300\\ 000 = 21\\ 300\\ 000$ (đồng).\n\n` +
`**Kết luận:** Bác An nhận được $21\\ 300\\ 000$ đồng sau 1 năm.`;

  const sol8 = `Để điểm trung bình của $4$ bài kiểm tra môn Toán đạt $8,5$ thì tổng điểm $4$ bài kiểm tra phải là:\n` +
`$$8,5 \\cdot 4 = 34 \\text{ (điểm)}$$\n\n` +
`Tổng số điểm của $3$ bài kiểm tra đầu tiên mà bạn Bình đã đạt được là:\n` +
`$$7,5 + 8,0 + 9,5 = 25 \\text{ (điểm)}$$\n\n` +
`Điểm số của bài kiểm tra thứ $4$ bạn Bình cần đạt được để thỏa mãn mục tiêu là:\n` +
`$$34 - 25 = 9,0 \\text{ (điểm)}$$\n\n` +
`**Kết luận:** Bạn Bình cần đạt $9,0$ điểm ở bài kiểm tra thứ 4.`;

  const sol9 = `**a)** $\\frac{3}{2}x^2 - \\frac{1}{4} = \\frac{23}{4}$\n` +
`$\\Rightarrow \\frac{3}{2}x^2 = \\frac{23}{4} + \\frac{1}{4}$\n` +
`$\\Rightarrow \\frac{3}{2}x^2 = \\frac{24}{4} = 6$\n` +
`$\\Rightarrow x^2 = 6 : \\frac{3}{2} = 6 \\cdot \\frac{2}{3} = 4$\n` +
`$\\Rightarrow x = 2$ hoặc $x = -2$.\n` +
`Vậy $x \\in \\{2; -2\\}$.\n\n` +
`**b)** $(x - 3)^3 = -8$\n` +
`$\\Rightarrow (x - 3)^3 = (-2)^3$\n` +
`$\\Rightarrow x - 3 = -2$\n` +
`$\\Rightarrow x = -2 + 3 = 1$.\n` +
`Vậy $x = 1$.`;

  const sol10 = `Dựa vào tính chất của các tập hợp số, ta điền các kí hiệu $\\in$ (thuộc) hoặc $\\notin$ (không thuộc) như sau:\n\n` +
`- $2 \\in \\mathbb{N}$ (vì $2$ là số tự nhiên)\n` +
`- $0 \\notin \\mathbb{N}^*$ (tập $\\mathbb{N}^*$ không chứa số $0$)\n` +
`- $-2 \\notin \\mathbb{N}$ (số âm không phải số tự nhiên)\n` +
`- $-2 \\in \\mathbb{Z}$ (số nguyên âm thuộc tập số nguyên)\n` +
`- $-2 \\in \\mathbb{Q}$ (mọi số nguyên đều là số hữu tỉ)\n` +
`- $4\\frac{2}{3} \\in \\mathbb{Q}$ (hỗn số là số hữu tỉ)\n` +
`- $\\frac{2}{3} \\notin \\mathbb{Z}$ (phân số không phải là số nguyên)\n` +
`- $\\frac{-2}{3} \\in \\mathbb{Q}$ (phân số âm là số hữu tỉ)\n` +
`- $\\frac{2}{8} \\in \\mathbb{Q}$ (phân số là số hữu tỉ)`;

  const updates = [
    { id: "e505f87b-04c4-4073-9f69-2a3bbbacb520", solution: sol1 },
    { id: "e573e963-a41b-4c7a-81d8-20c3312a68a7", solution: sol2 },
    { id: "e59bbd87-6df4-485c-b16c-2730ef27d96d", solution: sol3 },
    { id: "e5f3e4c1-32c8-42b6-baa0-92bf1fef1a38", solution: sol4 },
    { id: "e6115eb6-f8f2-4fa9-b550-c6fa39a6f300", solution: sol5 },
    { id: "e6478d23-8732-444b-a622-73779c3060da", solution: sol6 },
    { id: "e660a488-c15b-482f-911a-6adec01aabb8", solution: sol7 },
    { id: "e6654bb6-15f5-4805-af36-7c497fe46552", solution: sol8 },
    { id: "e6cc241e-3047-444e-be52-51ab87a7bcd4", solution: sol9 },
    { id: "e725e96e-6e2d-4dd5-8b4f-208ecc6729b6", solution: sol10 }
  ];

  for (const { id, solution } of updates) {
    await sql`
      UPDATE public.questions 
      SET solution = ${solution}, updated_at = NOW() 
      WHERE id = ${id};
    `;
    console.log(`Updated ID: ${id}`);
  }
}

manualFixBatch77().catch(console.error).finally(() => process.exit(0));
