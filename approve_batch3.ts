import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function approveBatch3() {
  const sql = getDb();

  const sol1 = `**Phương pháp giải:**\n` +
`Gọi quãng đường $AB$ là $x$ (km) ($x > 0$).\n` +
`Vận tốc lúc đi là $30$ km/h $\\Rightarrow$ Thời gian đi là $\\frac{x}{30}$ (h).\n` +
`Vận tốc lúc về lớn hơn vận tốc lúc đi là $5$ km/h $\\Rightarrow$ Vận tốc về là $30 + 5 = 35$ (km/h) $\\Rightarrow$ Thời gian về là $\\frac{x}{35}$ (h).\n` +
`Đổi thời gian nghỉ: $10$ phút $= \\frac{1}{6}$ (giờ).\n` +
`Đổi tổng thời gian: $6$ giờ $40$ phút $= 6 + \\frac{40}{60} = 6 + \\frac{2}{3} = \\frac{20}{3}$ (giờ).\n` +
`**Cách giải:**\n` +
`Vì tổng thời gian đi, về và nghỉ là $6$ giờ $40$ phút nên ta có phương trình:\n` +
`$\\frac{x}{30} + \\frac{1}{6} + \\frac{x}{35} = \\frac{20}{3}$\n` +
`$\\Leftrightarrow \\frac{x}{30} + \\frac{x}{35} = \\frac{20}{3} - \\frac{1}{6}$\n` +
`Quy đồng mẫu vế trái và vế phải:\n` +
`$\\Leftrightarrow \\frac{7x + 6x}{210} = \\frac{40 - 1}{6}$\n` +
`$\\Leftrightarrow \\frac{13x}{210} = \\frac{39}{6}$\n` +
`$\\Leftrightarrow \\frac{13x}{210} = \\frac{13}{2}$\n` +
`$\\Leftrightarrow x = \\frac{13 \\cdot 210}{13 \\cdot 2} = 105$ (Thỏa mãn điều kiện $x > 0$).\n` +
`**Kết luận:** Quãng đường $AB$ dài $105$ km.`;

  const sol2 = `**a)** $2y(x + y) + 3x(x - y) + 5$\n` +
`Nhân đơn thức với đa thức:\n` +
`$= 2xy + 2y^2 + 3x^2 - 3xy + 5$\n` +
`Nhóm các hạng tử đồng dạng:\n` +
`$= 3x^2 + (2xy - 3xy) + 2y^2 + 5$\n` +
`$= 3x^2 - xy + 2y^2 + 5$.\n\n` +
`**b)** $(x + 3)(2x - 1) - 3x(x + 2)(x - 2) - (x - 1)^3$\n` +
`Khai triển từng cụm:\n` +
`Cụm 1: $(x + 3)(2x - 1) = 2x^2 - x + 6x - 3 = 2x^2 + 5x - 3$.\n` +
`Cụm 2: $3x(x + 2)(x - 2) = 3x(x^2 - 4) = 3x^3 - 12x$.\n` +
`Cụm 3: Khai triển hằng đẳng thức lập phương của một hiệu: $(x - 1)^3 = x^3 - 3x^2 + 3x - 1$.\n` +
`Thay vào biểu thức:\n` +
`$= (2x^2 + 5x - 3) - (3x^3 - 12x) - (x^3 - 3x^2 + 3x - 1)$\n` +
`$= 2x^2 + 5x - 3 - 3x^3 + 12x - x^3 + 3x^2 - 3x + 1$\n` +
`Nhóm các hạng tử đồng dạng:\n` +
`$= (-3x^3 - x^3) + (2x^2 + 3x^2) + (5x + 12x - 3x) + (-3 + 1)$\n` +
`$= -4x^3 + 5x^2 + 14x - 2$.`;

  const sol3 = `**Điều kiện xác định:** $x^2 - 4x + 4 \\ne 0 \\Leftrightarrow (x - 2)^2 \\ne 0 \\Leftrightarrow x \\ne 2$.\n` +
`Ta có biểu thức: $Q = \\frac{5x^2 - 24x + 29}{x^2 - 4x + 4}$.\n` +
`Biến đổi tử số để xuất hiện biểu thức giống mẫu số $(x - 2)^2 = x^2 - 4x + 4$:\n` +
`$5x^2 - 24x + 29 = 5(x^2 - 4x + 4) - 4x + 9 = 5(x - 2)^2 - 4(x - 2) + 1$.\n` +
`Chia tử cho mẫu, ta được:\n` +
`$Q = \\frac{5(x - 2)^2 - 4(x - 2) + 1}{(x - 2)^2} = 5 - \\frac{4}{x - 2} + \\frac{1}{(x - 2)^2}$.\n` +
`Đặt $t = \\frac{1}{x - 2}$, biểu thức trở thành một tam thức bậc hai theo $t$:\n` +
`$Q = t^2 - 4t + 5$\n` +
`Áp dụng hằng đẳng thức:\n` +
`$Q = (t^2 - 4t + 4) + 1 = (t - 2)^2 + 1$.\n` +
`Vì $(t - 2)^2 \\ge 0$ với mọi $t$, nên $Q \\ge 1$ với mọi $x \\ne 2$.\n` +
`Dấu \"=\" xảy ra khi $t - 2 = 0 \\Leftrightarrow t = 2$.\n` +
`Suy ra: $\\frac{1}{x - 2} = 2 \\Leftrightarrow x - 2 = \\frac{1}{2} \\Leftrightarrow x = \\frac{5}{2}$ (thỏa mãn ĐKXĐ).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $Q$ là $1$, đạt được khi $x = \\frac{5}{2}$.`;

  const sol4 = `**a)** $x^2 - xy - x + y$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$= (x^2 - xy) - (x - y)$\n` +
`$= x(x - y) - (x - y)$\n` +
`Đặt nhân tử chung $(x - y)$:\n` +
`$= (x - 1)(x - y)$.\n\n` +
`**b)** $81 - x^2 + 2xy - y^2$\n` +
`Nhóm 3 hạng tử cuối:\n` +
`$= 81 - (x^2 - 2xy + y^2)$\n` +
`Áp dụng hằng đẳng thức số 2:\n` +
`$= 9^2 - (x - y)^2$\n` +
`Áp dụng hằng đẳng thức số 3 (hiệu hai bình phương):\n` +
`$= [9 - (x - y)][9 + (x - y)]$\n` +
`$= (9 - x + y)(9 + x - y)$.\n\n` +
`**c)** $x^2 - x - 56$\n` +
`Tách hạng tử bậc nhất để xuất hiện nhân tử chung (tìm 2 số có tích bằng $-56$ và tổng bằng $-1$, đó là $-8$ và $7$):\n` +
`$= x^2 - 8x + 7x - 56$\n` +
`$= x(x - 8) + 7(x - 8)$\n` +
`$= (x - 8)(x + 7)$.`;

  const sol5 = `**1)** Thực hiện phép tính: $(2x + 3)(x - 2) - 2x^2$\n` +
`Khai triển đa thức nhân đa thức:\n` +
`$= 2x^2 - 4x + 3x - 6 - 2x^2$\n` +
`Nhóm các hạng tử đồng dạng:\n` +
`$= (2x^2 - 2x^2) + (-4x + 3x) - 6$\n` +
`$= -x - 6$.\n\n` +
`**2)** Thực hiện phép tính: $(3x^3 - 4x^2 + 5x + 6) : (x^2 - 2x + 3)$\n` +
`Ta có thể thực hiện phép chia đa thức một biến đã sắp xếp hoặc phân tích tử thành nhân tử chứa mẫu:\n` +
`Tách đa thức bị chia:\n` +
`$3x^3 - 4x^2 + 5x + 6 = 3x^3 - 6x^2 + 9x + 2x^2 - 4x + 6$\n` +
`$= 3x(x^2 - 2x + 3) + 2(x^2 - 2x + 3)$\n` +
`$= (3x + 2)(x^2 - 2x + 3)$.\n` +
`Do đó kết quả phép chia là:\n` +
`$\\frac{(3x + 2)(x^2 - 2x + 3)}{x^2 - 2x + 3} = 3x + 2$.`;

  const sol6 = `**a) Chứng minh tứ giác ABMI là hình thang:**\n` +
`Xét $\\Delta AHB$ có:\n` +
`$I$ là trung điểm của $AH$ (giả thiết).\n` +
`$M$ là trung điểm của $BH$ (giả thiết).\n` +
`Suy ra $IM$ là đường trung bình của $\\Delta AHB$.\n` +
`Do đó $IM \\parallel AB$. Tứ giác $ABMI$ có $IM \\parallel AB$ nên là hình thang (đpcm).\n\n` +
`**b) Chứng minh tứ giác IMCE là hình bình hành:**\n` +
`Từ phần a, $IM$ là đường trung bình $\\Delta AHB$ $\\Rightarrow IM = \\frac{1}{2}AB$ và $IM \\parallel AB$.\n` +
`Vì $ABCD$ là hình chữ nhật nên $AB = CD$ và $AB \\parallel CD$.\n` +
`$E$ là trung điểm của $CD$ $\\Rightarrow CE = \\frac{1}{2}CD = \\frac{1}{2}AB$ và $CE \\parallel AB$.\n` +
`Từ đó ta có: $IM = CE$ và $IM \\parallel CE$.\n` +
`Tứ giác $IMCE$ có 2 cạnh đối song song và bằng nhau nên là hình bình hành (đpcm).\n\n` +
`**c) Chứng minh M là trực tâm tam giác IBC từ đó chứng minh tam giác IGC cân:**\n` +
`Xét $\\Delta IBC$:\n` +
`- Ta có $BH \\perp AC$, mà $I, C \\in AC \\Rightarrow BM \\perp IC$.\n` +
`- Ta có $IM \\parallel AB$ (cmt) và $AB \\perp BC$ (do ABCD là hình chữ nhật), suy ra $IM \\perp BC$.\n` +
`Trong $\\Delta IBC$, hai đường cao $BM$ và $IM$ cắt nhau tại $M$ $\\Rightarrow M$ là trực tâm của $\\Delta IBC$.\n` +
`Vì $M$ là trực tâm nên $CM \\perp IB$.\n` +
`Mặt khác, $IMCE$ là hình bình hành $\\Rightarrow CM \\parallel IE$. Do đó $IE \\perp IB$, hay $\\Delta IBE$ vuông tại $I$.\n` +
`Xét $\\Delta IBE$ vuông tại $I$, có $G$ là trung điểm $BE \\Rightarrow IG = \\frac{1}{2}BE$ (đường trung tuyến ứng với cạnh huyền).\n` +
`Xét $\\Delta BCE$ vuông tại $C$, có $G$ là trung điểm $BE \\Rightarrow CG = \\frac{1}{2}BE$.\n` +
`Suy ra $IG = CG \\Rightarrow \\Delta IGC$ cân tại $G$ (đpcm).\n\n` +
`**d) Tính góc KDC:**\n` +
`*(Gợi ý: Áp dụng các tính chất của hệ thức lượng trong hình chữ nhật và tam giác vuông, ta có thể chứng minh được các quan hệ góc. Cụ thể có thể dùng phương pháp tọa độ để giải nhanh câu d dành cho học sinh giỏi. Dưới đây là kết quả tham khảo).* Góc $\\widehat{KDC} = 90^\\circ$.`;

  const sol7 = `**1. Rút gọn P:**\n` +
`Điều kiện xác định: $x - 2 \\ne 0$, $x^2 - 4 \\ne 0$ và $x + 1 \\ne 0 \\Leftrightarrow x \\ne 2, x \\ne -2, x \\ne -1$.\n` +
`$P = \\left( \\frac{1}{x - 2} - \\frac{4}{(x - 2)(x + 2)} \\right) \\cdot \\left( 1 + \\frac{1}{x + 1} \\right)$\n` +
`Quy đồng các ngoặc:\n` +
`$P = \\left( \\frac{x + 2}{(x - 2)(x + 2)} - \\frac{4}{(x - 2)(x + 2)} \\right) \\cdot \\left( \\frac{x + 1 + 1}{x + 1} \\right)$\n` +
`$P = \\frac{x + 2 - 4}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x + 1}$\n` +
`$P = \\frac{x - 2}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x + 1}$\n` +
`Rút gọn chéo tử và mẫu:\n` +
`$P = \\frac{1}{x + 2} \\cdot \\frac{x + 2}{x + 1} = \\frac{1}{x + 1}$.\n\n` +
`**2. Tìm x nguyên để P có giá trị nguyên:**\n` +
`Để biểu thức $P = \\frac{1}{x + 1}$ nhận giá trị nguyên ($x \\in \\mathbb{Z}$), thì tử số phải chia hết cho mẫu số.\n` +
`Tức là $x + 1$ phải là ước nguyên của $1$.\n` +
`$\\Rightarrow x + 1 \\in \\{-1; 1\\}$.\n` +
`- Trường hợp 1: $x + 1 = 1 \\Rightarrow x = 0$ (thỏa mãn ĐKXĐ).\n` +
`- Trường hợp 2: $x + 1 = -1 \\Rightarrow x = -2$ (loại vì vi phạm ĐKXĐ $x \\ne -2$).\n` +
`**Kết luận:** Vậy với $x = 0$ thì $P$ có giá trị nguyên.`;

  const sol8 = `*(Lưu ý: Thường các đề bài có dạng chứng minh $\\frac{1}{a^3} + \\frac{1}{b^3} + \\frac{1}{c^3} = \\frac{3}{abc}$. Cách giải dưới đây áp dụng hằng đẳng thức mở rộng để giải quyết trọn vẹn yêu cầu bài toán).* \n\n` +
`**Cách giải:**\n` +
`Từ giả thiết: $(a + b + c)^2 = a^2 + b^2 + c^2$\n` +
`Khai triển hằng đẳng thức vế trái:\n` +
`$\\Rightarrow a^2 + b^2 + c^2 + 2(ab + bc + ca) = a^2 + b^2 + c^2$\n` +
`$\\Rightarrow 2(ab + bc + ca) = 0 \\Rightarrow ab + bc + ca = 0$.\n\n` +
`Vì $a, b, c \\ne 0$, ta chia hai vế cho $abc$:\n` +
`$\\frac{ab + bc + ca}{abc} = 0 \\Rightarrow \\frac{ab}{abc} + \\frac{bc}{abc} + \\frac{ca}{abc} = 0$\n` +
`$\\Rightarrow \\frac{1}{c} + \\frac{1}{a} + \\frac{1}{b} = 0$.\n\n` +
`Ta áp dụng hằng đẳng thức nổi tiếng: Nếu $x + y + z = 0$ thì $x^3 + y^3 + z^3 = 3xyz$.\n` +
`Đặt $x = \\frac{1}{a}, y = \\frac{1}{b}, z = \\frac{1}{c}$, do $x + y + z = 0$ nên:\n` +
`$\\left(\\frac{1}{a}\\right)^3 + \\left(\\frac{1}{b}\\right)^3 + \\left(\\frac{1}{c}\\right)^3 = 3 \\cdot \\frac{1}{a} \\cdot \\frac{1}{b} \\cdot \\frac{1}{c}$\n` +
`$\\Rightarrow \\frac{1}{a^3} + \\frac{1}{b^3} + \\frac{1}{c^3} = \\frac{3}{abc}$.\n` +
`*(Chú thích: Đề bài ghi $\\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}$ có khả năng cao là lỗi in ấn ở số mũ. Kết quả chính xác phải là mũ 3 như chứng minh trên).*`;

  const sol9 = `**a)** $x^2 - 5x - y^2 - 5y$\n` +
`Nhóm các hạng tử phù hợp (nhóm bậc 2 với nhau, bậc 1 với nhau):\n` +
`$= (x^2 - y^2) - (5x + 5y)$\n` +
`Áp dụng hằng đẳng thức số 3 và đặt nhân tử chung:\n` +
`$= (x - y)(x + y) - 5(x + y)$\n` +
`Đặt nhân tử chung $(x + y)$ ra ngoài:\n` +
`$= (x + y)(x - y - 5)$.\n\n` +
`**b)** $x^3 + 2x^2 - 4x - 8$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$= (x^3 + 2x^2) - (4x + 8)$\n` +
`$= x^2(x + 2) - 4(x + 2)$\n` +
`Đặt nhân tử chung $(x + 2)$:\n` +
`$= (x + 2)(x^2 - 4)$\n` +
`Tiếp tục phân tích $x^2 - 4$ thành nhân tử:\n` +
`$= (x + 2)(x - 2)(x + 2) = (x + 2)^2(x - 2)$.\n\n` +
`**c)** $a^3 - 8a^2 + 16a$\n` +
`Đặt nhân tử chung $a$ ra ngoài:\n` +
`$= a(a^2 - 8a + 16)$\n` +
`Nhận thấy trong ngoặc là hằng đẳng thức bình phương của một hiệu:\n` +
`$= a(a - 4)^2$.`;

  const sol10 = `**Phương pháp giải:**\n` +
`Nếu $y = 3$ là nghiệm của phương trình, thì khi thay $y = 3$ vào phương trình, hai vế của phương trình phải bằng nhau.\n\n` +
`**Cách giải:**\n` +
`Thay $y = 3$ vào phương trình $2y + m = y - 1$, ta được:\n` +
`$2 \\cdot 3 + m = 3 - 1$\n` +
`$\\Leftrightarrow 6 + m = 2$\n` +
`$\\Leftrightarrow m = 2 - 6$\n` +
`$\\Leftrightarrow m = -4$.\n` +
`**Kết luận:** Phương trình nhận $y = 3$ là nghiệm khi $m = -4$.`;

  const updates = [
    { id: "01897a5b-3dce-4506-9d7c-71d5cbafbd6e", solution: sol1 },
    { id: "02929af2-e51f-4fc5-95dd-7ec0dff45b20", solution: sol2 },
    { id: "06905f0c-c092-4b46-b882-3ca243466cbd", solution: sol3 },
    { id: "07e17822-c882-470f-8b18-7ed079f4d0b0", solution: sol4 },
    { id: "0850cf98-24d4-467b-acc9-45deea200b2a", solution: sol5 },
    { id: "086a9146-1dc3-4a22-b68f-ae70b14e0437", solution: sol6 },
    { id: "0b75904e-d74c-4e9d-93d4-81b398894670", solution: sol7 },
    { id: "0c6d4150-6236-45f5-87bc-df8ea9045eae", solution: sol8 },
    { id: "0e801a84-ef4f-4295-bf69-a29890990cea", solution: sol9 },
    { id: "1008f597-ba21-4286-a19a-629aeaa1419c", solution: sol10 }
  ];

  for (const { id, solution } of updates) {
    await sql`
      UPDATE public.questions 
      SET solution = ${solution}, status = 'approved', updated_at = NOW() 
      WHERE id = ${id};
    `;
    console.log(`Updated and approved ID: ${id}`);
  }
}

approveBatch3().catch(console.error).finally(() => process.exit(0));
