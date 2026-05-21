import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch71() {
  const sql = getDb();

  const sol1 = `**a) So sánh độ dài các đoạn thẳng $BD$ và $CE$:**\n` +
`Vì $\\Delta ABC$ cân tại $A$ nên $\\widehat{ABC} = \\widehat{ACB}$.\n` +
`Do $BD$ là phân giác của $\\widehat{ABC}$ nên $\\widehat{ABD} = \\frac{1}{2}\\widehat{ABC}$.\n` +
`Do $CE$ là phân giác của $\\widehat{ACB}$ nên $\\widehat{ACE} = \\frac{1}{2}\\widehat{ACB}$.\n` +
`Suy ra $\\widehat{ABD} = \\widehat{ACE}$.\n` +
`Xét $\\Delta ABD$ và $\\Delta ACE$, ta có:\n` +
`- $\\widehat{A}$ chung\n` +
`- $AB = AC$ (gt)\n` +
`- $\\widehat{ABD} = \\widehat{ACE}$ (cmt)\n` +
`$\\Rightarrow \\Delta ABD = \\Delta ACE$ (g.c.g).\n` +
`$\\Rightarrow BD = CE$ (hai cạnh tương ứng).\n\n` +
`**b) Chứng minh $BI = IC, IE = ID$:**\n` +
`Xét tam giác $\\Delta IBC$, ta có $\\widehat{IBC} = \\frac{1}{2}\\widehat{ABC}$ và $\\widehat{ICB} = \\frac{1}{2}\\widehat{ACB}$.\n` +
`Vì $\\widehat{ABC} = \\widehat{ACB}$ nên $\\widehat{IBC} = \\widehat{ICB}$.\n` +
`Suy ra $\\Delta IBC$ cân tại $I$, do đó $BI = IC$ (đpcm).\n\n` +
`Mặt khác, ta có $IE = CE - IC$ và $ID = BD - BI$.\n` +
`Vì $CE = BD$ (chứng minh câu a) và $IC = BI$ (chứng minh trên) nên suy ra $IE = ID$ (đpcm).`;

  const sol2 = `Vì $x < y < 1$, ta có:\n` +
`- $x < 1 \\Rightarrow x - 1 < 0 \\Rightarrow \\left| x - 1 \\right| = -(x - 1) = 1 - x$.\n` +
`- $y < 1 \\Rightarrow y - 1 < 0 \\Rightarrow \\left| y - 1 \\right| = -(y - 1) = 1 - y$.\n\n` +
`Thay vào phương trình $\\left| x - 1 \\right| - \\left| y - 1 \\right| = 50$, ta được:\n` +
`$(1 - x) - (1 - y) = 50$\n` +
`$\\Leftrightarrow 1 - x - 1 + y = 50$\n` +
`$\\Leftrightarrow y - x = 50$\n` +
`$\\Leftrightarrow -(x - y) = 50$\n` +
`$\\Leftrightarrow x - y = -50$.\n\n` +
`**Kết luận:** $B = -50$.`;

  const sol3 = `Biến đổi biểu thức $A$:\n` +
`$A = 3^{n+3} + 3^{n+1} + 2^{n+2} + 2^{n+1}$\n` +
`$A = (3^{n+3} + 3^{n+1}) + (2^{n+2} + 2^{n+1})$\n` +
`$A = 3^{n+1}(3^2 + 1) + 2^{n+1}(2^1 + 1)$\n` +
`$A = 3^{n+1} \\cdot (9 + 1) + 2^{n+1} \\cdot 3$\n` +
`$A = 10 \\cdot 3^{n+1} + 3 \\cdot 2^{n+1}$.\n\n` +
`Tách các hạng tử để làm xuất hiện nhân tử $6$:\n` +
`- Vì $n$ là số nguyên dương ($n \\ge 1$), nên $3^{n+1} = 3^n \\cdot 3$. \n` +
`Do đó: $10 \\cdot 3^{n+1} = 10 \\cdot 3 \\cdot 3^n = 30 \\cdot 3^n$. Mà $30$ chia hết cho $6$, nên $30 \\cdot 3^n \\,\\vdots\\, 6$.\n\n` +
`- Tương tự, $2^{n+1} = 2^n \\cdot 2$. \n` +
`Do đó: $3 \\cdot 2^{n+1} = 3 \\cdot 2 \\cdot 2^n = 6 \\cdot 2^n$. Mà $6$ chia hết cho $6$, nên $6 \\cdot 2^n \\,\\vdots\\, 6$.\n\n` +
`Cộng hai biểu thức chia hết cho $6$ lại với nhau, ta được:\n` +
`$A = 30 \\cdot 3^n + 6 \\cdot 2^n$ chia hết cho $6$ với mọi số nguyên dương $n$ (đpcm).`;

  const sol4 = `**a)** $x + \\frac{1}{3} = \\frac{4}{5}$\n` +
`$\\Rightarrow x = \\frac{4}{5} - \\frac{1}{3} = \\frac{12}{15} - \\frac{5}{15} = \\frac{7}{15}$.\n` +
`Vậy $x = \\frac{7}{15}$.\n\n` +
`**b)** \\frac{2}{3}x - \\frac{1}{2} = \\frac{5}{6}\n` +
`$\\Rightarrow \\frac{2}{3}x = \\frac{5}{6} + \\frac{1}{2} = \\frac{5}{6} + \\frac{3}{6} = \\frac{8}{6} = \\frac{4}{3}$\n` +
`$\\Rightarrow x = \\frac{4}{3} : \\frac{2}{3} = \\frac{4}{3} \\cdot \\frac{3}{2} = 2$.\n` +
`Vậy $x = 2$.\n\n` +
`**c)** $x : \\frac{-3}{4} = \\frac{8}{9}$\n` +
`$\\Rightarrow x = \\frac{8}{9} \\cdot \\left(\\frac{-3}{4}\\right) = \\frac{-24}{36} = \\frac{-2}{3}$.\n` +
`Vậy $x = \\frac{-2}{3}$.\n\n` +
`**d)** $\\frac{3}{4} - \\left( x + \\frac{1}{2} \\right) = \\frac{1}{4}$\n` +
`$\\Rightarrow x + \\frac{1}{2} = \\frac{3}{4} - \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}$\n` +
`$\\Rightarrow x = \\frac{1}{2} - \\frac{1}{2} = 0$.\n` +
`Vậy $x = 0$.`;

  const sol5 = `Tập hợp các số trên $6$ thanh gỗ là: $X = \\{1, 2, 3, 4, 5, 6\\}$.\n` +
`Khi lấy ra ngẫu nhiên đồng thời $2$ thanh gỗ, ta xét các biến cố:\n\n` +
`1) **Biến cố P:** \"Tích các số gắn trên hai thanh gỗ là bội của $7$\".\n` +
`- Mọi số trong hộp đều nhỏ hơn $7$ và không chia hết cho $7$. Do số $7$ là số nguyên tố nên tích hai số nhỏ hơn $7$ không thể là bội của $7$.\n` +
`- Vậy P là **biến cố không thể**.\n\n` +
`2) **Biến cố Q:** \"Hai thanh gỗ lấy ra gắn số chẵn\".\n` +
`- Ta có thể rút được $2$ thanh số chẵn (ví dụ $2$ và $4$), nhưng cũng có thể rút ra thẻ số lẻ. Sự kiện này có thể xảy ra nhưng không chắc chắn.\n` +
`- Vậy Q là **biến cố ngẫu nhiên**.\n\n` +
`3) **Biến cố R:** \"Hiệu các số gắn trên hai thanh gỗ không nhỏ hơn $1$\".\n` +
`- Do lấy ra hai thanh gỗ phân biệt (không trùng nhau) nên hai số này luôn khác nhau, dẫn tới hiệu giá trị lớn trừ giá trị nhỏ luôn $\\ge 1$.\n` +
`- Vậy R là **biến cố chắc chắn**.\n\n` +
`4) **Biến cố S:** \"Tổng các số gắn trên hai thanh gỗ nhỏ hơn $12$\".\n` +
`- Tổng lớn nhất có thể của hai thanh là $5 + 6 = 11$, và $11 < 12$. Mọi trường hợp rút khác đều cho tổng nhỏ hơn $11$.\n` +
`- Vậy S là **biến cố chắc chắn**.`;

  const sol6 = `Để giúp Vân kiểm tra ý kiến \"Đa số các bạn học sinh trong lớp thích môn Mỹ Thuật\", phương án thu thập dữ liệu phù hợp nhất là:\n\n` +
`**Tiến hành khảo sát toàn bộ học sinh trong lớp 7A (Khảo sát toàn thể):**\n` +
`- Có thể phát **phiếu khảo sát** hoặc tạo **biểu mẫu trực tuyến** cho từng học sinh với câu hỏi: \"Bạn có thích môn Mỹ thuật không?\" (Có/Không).\n` +
`- Hoặc giáo viên/lớp trưởng yêu cầu cả lớp **giơ tay biểu quyết trực tiếp** xem có bao nhiêu bạn yêu thích môn Mỹ thuật, sau đó ghi chép lại.\n\n` +
`Dựa vào số liệu thu được đem so sánh với sĩ số lớp. Nếu tỉ lệ thích lớn hơn $50%$ thì ý kiến của Vân là đúng, ngược lại là sai.`;

  const sol7 = `*(Do đề bài không đính kèm biểu đồ cụ thể, học sinh cần áp dụng kĩ năng chuyển đổi dữ liệu từ biểu đồ cột/tròn sang bảng thống kê)*\n\n` +
`**Các bước thực hiện:**\n` +
`1. Quan sát trục hoành (hoặc các thành phần của biểu đồ tròn) để xác định danh sách tên \"Các con vật được nuôi\".\n` +
`2. Quan sát trục tung (cột độ cao) để đọc số lượng (số con tương ứng với từng loài vật).\n` +
`3. Kẻ bảng gồm $2$ hàng (hoặc $2$ cột): Hàng trên ghi \"Tên con vật\", hàng dưới ghi \"Số lượng\". Điền số liệu đọc được vào bảng một cách chính xác.`;

  const sol8 = `Để biểu diễn dữ liệu vào biểu đồ hình quạt tròn (hoặc cập nhật kí hiệu), trước tiên ta tính tỉ lệ phần trăm của từng mục chi phí:\n` +
`Tổng chi phí sinh hoạt = $4.000.000 + 2.500.000 + 1.500.000 + 2.000.000 = 10.000.000$ (Đồng).\n\n` +
`Tỉ lệ phần trăm các mục chi tiêu:\n` +
`- Ăn uống: $\\frac{4.000.000}{10.000.000} \\cdot 100\\% = 40\\%$.\n` +
`- Giáo dục: $\\frac{2.500.000}{10.000.000} \\cdot 100\\% = 25\\%$.\n` +
`- Điện nước: $\\frac{1.500.000}{10.000.000} \\cdot 100\\% = 15\\%$.\n` +
`- Các khoản khác: $\\frac{2.000.000}{10.000.000} \\cdot 100\\% = 20\\%$.\n\n` +
`Học sinh vẽ biểu đồ hình quạt tròn với các góc ở tâm tương ứng:\n` +
`- Ăn uống: $40\\% \\times 360^\\circ = 144^\\circ$.\n` +
`- Giáo dục: $25\\% \\times 360^\\circ = 90^\\circ$ (góc vuông).\n` +
`- Điện nước: $15\\% \\times 360^\\circ = 54^\\circ$.\n` +
`- Các khoản khác: $20\\% \\times 360^\\circ = 72^\\circ$.`;

  const sol9 = `*(Do đề bài không có hình vẽ kèm theo nên không thể xác định cụ thể giá trị $x$.)*\n\n` +
`Tuy nhiên, phương pháp chung để tính góc $x$ trong các hình vẽ thường là:\n` +
`- Dựa vào định lý tổng $3$ góc trong tam giác bằng $180^\\circ$.\n` +
`- Sử dụng tính chất của hai đường thẳng song song (hai góc so le trong, đồng vị, trong cùng phía).\n` +
`- Áp dụng tính chất của góc kề bù, góc đối đỉnh hoặc góc ngoài của tam giác.`;

  const sol10 = `*(Đây là bài toán liên quan đến đại lượng tỉ lệ thuận)*\n\n` +
`Số lít xăng xe tiêu thụ khi đi $1$ km là:\n` +
`$$2\\frac{1}{4} : 100 = 2,25 : 100 = 0,0225 \\text{ (lít)}$$\n\n` +
`Số lít xăng xe tiêu thụ khi đi $150$ km là:\n` +
`$$0,0225 \\cdot 150 = 3,375 \\text{ (lít)}$$\n\n` +
`*(Hoặc dùng quy tắc tam suất: $\\frac{150 \\cdot 2,25}{100} = 3,375$ lít)*\n\n` +
`**Kết luận:** Xe máy đó đi $150$ km thì tiêu thụ hết $3,375$ lít xăng.`;

  const updates = [
    { id: "c15664bd-b4ef-45c5-b790-c0219faa3ffd", solution: sol1 },
    { id: "c1e3bdbd-6419-4610-bbf7-754d682ddc02", solution: sol2 },
    { id: "c211de1a-d03f-48ee-9c00-00ff77c71e33", solution: sol3 },
    { id: "c23157be-6595-4203-a467-c9d96684d9bd", solution: sol4 },
    { id: "c2600ebb-0b03-4849-902d-f250dd0f381b", solution: sol5 },
    { id: "c483dfca-f5dd-4cec-b365-36206ee44f4c", solution: sol6 },
    { id: "c4e4e56d-8ba9-442c-8fb8-2fe693298c8f", solution: sol7 },
    { id: "c649125b-7283-4216-be08-7d036faabb55", solution: sol8 },
    { id: "c6610660-d4a7-4840-b310-f578897580ec", solution: sol9 },
    { id: "c67ea934-e069-41a3-9e75-f368d514c346", solution: sol10 }
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

manualFixBatch71().catch(console.error).finally(() => process.exit(0));
