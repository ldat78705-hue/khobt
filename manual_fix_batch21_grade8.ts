import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch21Grade8() {
  const sql = getDb();

  const sol1 = `**Khẳng định trên là SAI.**\n` +
`Hai phương trình là tương đương khi chúng có cùng tập nghiệm.\n` +
`- Giải phương trình (1): $\\frac{x(x - 1)}{2x^2 - 1} = 0$\n` +
`Điều kiện xác định: $2x^2 - 1 \\ne 0 \\Leftrightarrow x \\ne \\pm \\frac{1}{\\sqrt{2}}$.\n` +
`Khi đó $x(x - 1) = 0 \\Rightarrow x = 0$ hoặc $x = 1$ (cả hai đều thỏa mãn ĐKXĐ).\n` +
`Tập nghiệm của phương trình (1) là $S_1 = \\{0; 1\\}$.\n` +
`- Giải phương trình (2): $x(x^2 + 3) = 0$\n` +
`Vì $x^2 + 3 > 0$ với mọi $x$, nên $x = 0$.\n` +
`Tập nghiệm của phương trình (2) là $S_2 = \\{0\\}$.\n` +
`Vì $S_1 \\ne S_2$ nên hai phương trình không tương đương.`;

  const sol2 = `**a) Thực hiện phép tính:**\n` +
`$(x^3y^3 - x^2y^3 - 4x^3y^2) : 2x^2y^2$\n` +
`$= \\frac{x^3y^3}{2x^2y^2} - \\frac{x^2y^3}{2x^2y^2} - \\frac{4x^3y^2}{2x^2y^2}$\n` +
`$= \\frac{1}{2}xy - \\frac{1}{2}y - 2x$.\n\n` +
`**b) Thu gọn biểu thức A và B:**\n` +
`$A = (x - 2)^3 - x^2(x - 4) + 8$\n` +
`$A = (x^3 - 6x^2 + 12x - 8) - x^3 + 4x^2 + 8$\n` +
`$A = -2x^2 + 12x$.\n` +
`$B = (x^2 - 6x + 9) : (x - 3) - x(x + 7) - 9$\n` +
`$B = (x - 3)^2 : (x - 3) - (x^2 + 7x) - 9$\n` +
`$B = (x - 3) - x^2 - 7x - 9$\n` +
`$B = -x^2 - 6x - 12$.\n\n` +
`**c) Tính giá trị biểu thức A tại $x = -1$:**\n` +
`Thay $x = -1$ vào biểu thức $A = -2x^2 + 12x$:\n` +
`$A = -2(-1)^2 + 12(-1) = -2(1) - 12 = -14$.\n\n` +
`**d) Chứng minh C luôn âm:**\n` +
`$C = A + B = (-2x^2 + 12x) + (-x^2 - 6x - 12) = -3x^2 + 6x - 12$.\n` +
`$C = -3(x^2 - 2x + 4) = -3[(x - 1)^2 + 3] = -3(x - 1)^2 - 9$.\n` +
`Vì $(x - 1)^2 \\ge 0$ nên $-3(x - 1)^2 \\le 0$.\n` +
`Do đó $C = -3(x - 1)^2 - 9 \\le -9 < 0$ với mọi $x$.\n` +
`Vậy biểu thức C luôn âm (đpcm).`;

  const sol3 = `**1)** $x^2 - y^2 - 2x + 2y$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$= (x^2 - y^2) - (2x - 2y)$\n` +
`$= (x - y)(x + y) - 2(x - y)$\n` +
`Đặt nhân tử chung $(x - y)$:\n` +
`$= (x - y)(x + y - 2)$.\n\n` +
`**2)** $x^2 + 4y^2 - 25 + 4xy$\n` +
`Nhóm các hạng tử tạo hằng đẳng thức:\n` +
`$= (x^2 + 4xy + 4y^2) - 25$\n` +
`$= (x + 2y)^2 - 5^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (x + 2y - 5)(x + 2y + 5)$.`;

  const sol4 = `Theo định lý Bê-du (Bézout), ta có:\n` +
`- Đa thức $f(x)$ chia cho $x - 3$ dư 2 $\\Rightarrow f(3) = 2$.\n` +
`- Đa thức $f(x)$ chia cho $x + 4$ dư 9 $\\Rightarrow f(-4) = 9$.\n` +
`Vì đa thức chia là $x^2 + x - 12 = (x - 3)(x + 4)$ có bậc 2, nên phần dư sẽ có dạng bậc nhất là $ax + b$.\n` +
`Theo đề bài, thương là $x^2 + 3$, do đó ta có thể viết:\n` +
`$f(x) = (x^2 + x - 12)(x^2 + 3) + ax + b$.\n` +
`Thay $x = 3$ vào ta được: $f(3) = 3a + b = 2$.\n` +
`Thay $x = -4$ vào ta được: $f(-4) = -4a + b = 9$.\n` +
`Giải hệ phương trình:\n` +
`$\\begin{cases} 3a + b = 2 \\\\ -4a + b = 9 \\end{cases} \\Leftrightarrow \\begin{cases} 7a = -7 \\\\ b = 2 - 3a \\end{cases} \\Leftrightarrow \\begin{cases} a = -1 \\\\ b = 5 \\end{cases}$.\n` +
`Vậy phần dư là $-x + 5$.\n` +
`Đa thức cần tìm là:\n` +
`$f(x) = (x^2 + x - 12)(x^2 + 3) - x + 5$\n` +
`$f(x) = x^4 + 3x^2 + x^3 + 3x - 12x^2 - 36 - x + 5$\n` +
`$f(x) = x^4 + x^3 - 9x^2 + 2x - 31$.`;

  const sol5 = `Ta biến đổi biểu thức $P$:\n` +
`$P = \\left( 4x^2 + \\frac{1}{x^2} + 4 \\right) + \\left( 4y^2 + \\frac{1}{y^2} + 4 \\right) = 4(x^2 + y^2) + \\left( \\frac{1}{x^2} + \\frac{1}{y^2} \\right) + 8$.\n` +
`Áp dụng bất đẳng thức Bunyakovsky (hoặc hệ quả Cauchy) ta có:\n` +
`$x^2 + y^2 \\ge \\frac{(x + y)^2}{2} = \\frac{1}{2}$. Suy ra $4(x^2 + y^2) \\ge 2$.\n` +
`Áp dụng bất đẳng thức Bunyakovsky cho phân thức:\n` +
`$\\frac{1}{x^2} + \\frac{1}{y^2} \\ge \\frac{(1 + 1)^2}{x^2 + y^2} = \\frac{4}{x^2 + y^2}$.\n` +
`Lại áp dụng $x^2 + y^2 \\le \\frac{(x + y)^2}{2}$ là sai, ta có $x^2 + y^2 \\ge \\frac{(x + y)^2}{2} = \\frac{1}{2}$, nghịch đảo sẽ bị ngược chiều.\n` +
`Ta nên dùng BĐT Cauchy-Schwarz dạng phân thức (BĐT Schwarz):\n` +
`$\\frac{1}{x^2} + \\frac{1}{y^2} \\ge \\frac{(1 + 1)^2}{x^2 + y^2} = \\frac{4}{x^2 + y^2}$. \n` +
`Điều này chưa tối ưu. Cách khác, dùng Cauchy-Schwarz 2 lần:\n` +
`$\\frac{1}{x^2} + \\frac{1}{y^2} \\ge \\frac{1}{2} \\left( \\frac{1}{x} + \\frac{1}{y} \\right)^2 \\ge \\frac{1}{2} \\left( \\frac{4}{x + y} \\right)^2 = \\frac{1}{2} \\cdot 16 = 8$.\n` +
`Cộng vế theo vế ta được:\n` +
`$P \\ge 2 + 8 + 8 = 18$.\n` +
`Dấu \"=\" xảy ra khi $x = y = \\frac{1}{2}$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $P$ là $18$ đạt được tại $x = y = \\frac{1}{2}$.`;

  const sol6 = `**a) Tính DB, DC:**\n` +
`$\\Delta ABC$ vuông tại $A \\Rightarrow BC = \\sqrt{AB^2 + AC^2} = \\sqrt{21^2 + 28^2} = 35$ (cm).\n` +
`Vì $AD$ là phân giác $\\widehat{A}$ nên $\\frac{DB}{DC} = \\frac{AB}{AC} = \\frac{21}{28} = \\frac{3}{4}$.\n` +
`Theo dãy tỉ số bằng nhau: $\\frac{DB}{3} = \\frac{DC}{4} = \\frac{DB + DC}{3 + 4} = \\frac{35}{7} = 5$.\n` +
`$\\Rightarrow DB = 5 \\cdot 3 = 15$ (cm); $DC = 5 \\cdot 4 = 20$ (cm).\n\n` +
`**b) Tính DE, EC:**\n` +
`Vì $E$ là hình chiếu của $D$ trên $AC \\Rightarrow DE \\perp AC$. Mà $AB \\perp AC \\Rightarrow DE \\parallel AB$.\n` +
`Áp dụng định lý Thales (hoặc hệ quả) trong $\\Delta ABC$:\n` +
`$\\frac{CE}{CA} = \\frac{CD}{CB} \\Rightarrow \\frac{CE}{28} = \\frac{20}{35} = \\frac{4}{7} \\Rightarrow CE = \\frac{4}{7} \\cdot 28 = 16$ (cm).\n` +
`$\\frac{DE}{AB} = \\frac{CD}{CB} \\Rightarrow \\frac{DE}{21} = \\frac{4}{7} \\Rightarrow DE = \\frac{4}{7} \\cdot 21 = 12$ (cm).\n\n` +
`**c) Chứng minh $\\Delta ABC \\sim \\Delta EDC$:**\n` +
`Xét $\\Delta ABC$ và $\\Delta EDC$ có:\n` +
`$\\widehat{C}$ chung; $\\widehat{BAC} = \\widehat{DEC} = 90^\\circ$.\n` +
`$\\Rightarrow \\Delta ABC \\sim \\Delta EDC$ (g-g).\n` +
`Tỉ số đồng dạng $k = \\frac{AC}{EC} = \\frac{28}{16} = \\frac{7}{4}$.\n\n` +
`**d) Chứng minh IG // AC:**\n` +
`$I$ là tâm đường tròn nội tiếp (giao các đường phân giác). Khoảng cách từ $I$ đến các cạnh của $\\Delta ABC$ là bán kính $r$.\n` +
`$r = \\frac{AB + AC - BC}{2} = \\frac{21 + 28 - 35}{2} = 7$ (cm).\n` +
`Suy ra khoảng cách từ $I$ đến $AC$ là $7$ cm.\n` +
`$G$ là trọng tâm $\\Delta ABC$, khoảng cách từ $G$ đến $AC$ bằng $\\frac{1}{3}$ chiều cao hạ từ $B$ xuống $AC$ (chính là cạnh $AB$).\n` +
`Khoảng cách từ $G$ đến $AC$ = $\\frac{1}{3} AB = \\frac{1}{3} \\cdot 21 = 7$ (cm).\n` +
`Vì hai điểm $I$ và $G$ nằm cùng phía so với $AC$ và có khoảng cách đến $AC$ bằng nhau nên $IG \\parallel AC$ (đpcm).`;

  const sol7 = `**PHẦN TỰ LUẬN**\n` +
`**1) Tìm m để pt nhận $x = 4$ là nghiệm:**\n` +
`Thay $x = 4$ vào phương trình (1):\n` +
`$\\frac{4 + 2}{4 - m} = \\frac{4 + 1}{4 - 1} \\Leftrightarrow \\frac{6}{4 - m} = \\frac{5}{3}$\n` +
`$\\Rightarrow 5(4 - m) = 18 \\Leftrightarrow 20 - 5m = 18 \\Leftrightarrow 5m = 2 \\Rightarrow m = \\frac{2}{5}$.\n\n` +
`**2) Tìm m để phương trình có nghiệm duy nhất:**\n` +
`Điều kiện xác định: $x \\ne 1$ và $x \\ne m$.\n` +
`Quy đồng khử mẫu: $(x + 2)(x - 1) = (x + 1)(x - m)$\n` +
`$\\Leftrightarrow x^2 + x - 2 = x^2 - mx + x - m$\n` +
`$\\Leftrightarrow mx = 2 - m$\n` +
`Để pt có nghiệm duy nhất thì $m \\ne 0$, khi đó $x = \\frac{2 - m}{m}$.\n` +
`Nghiệm này phải thỏa mãn ĐKXĐ:\n` +
`- $\\frac{2 - m}{m} \\ne 1 \\Leftrightarrow 2 - m \\ne m \\Leftrightarrow 2m \\ne 2 \\Leftrightarrow m \\ne 1$.\n` +
`- $\\frac{2 - m}{m} \\ne m \\Leftrightarrow 2 - m \\ne m^2 \\Leftrightarrow m^2 + m - 2 \\ne 0 \\Leftrightarrow (m - 1)(m + 2) \\ne 0 \\Rightarrow m \\ne 1$ và $m \\ne -2$.\n` +
`Vậy điều kiện của $m$ là: $m \\ne 0, m \\ne 1, m \\ne -2$.\n\n` +
`**PHẦN TRẮC NGHIỆM ĐIỀN KHUYẾT**\n` +
`1. Tỉ số của hai đoạn thẳng... bằng: **$\\frac{2}{25}$** (vì $80\\text{mm} = 8\\text{cm}; 10\\text{dm} = 100\\text{cm}$, tỉ số $\\frac{8}{100} = \\frac{2}{25}$).\n` +
`2. Nếu ... $\\frac{MB}{MA} = \\frac{NC}{NA}$ thì: **$MN \\parallel BC$** (Định lý Thales đảo).\n` +
`3. Nếu $\\Delta ABC \\sim \\Delta MNP$ và $\\Delta MNP \\sim \\Delta EGH$ thì: **$\\Delta ABC \\sim \\Delta EGH$**.\n` +
`4. Nếu $\\Delta ABC \\sim \\Delta DMN$ theo tỉ số $k=3$ thì $\\Delta DMN \\sim \\Delta ABC$ theo tỉ số: **$k' = \\frac{1}{3}$**.\n` +
`5. Nếu **$\\Delta ABC \\sim \\Delta A'B'C'$** theo tỉ số $k = \\frac{1}{2}$ thì tỉ số diện tích bằng bình phương tỉ số đồng dạng.`;

  const sol8 = `**a)** $5(3x + 2) = 4x - 1$\n` +
`$\\Leftrightarrow 15x + 10 = 4x - 1$\n` +
`$\\Leftrightarrow 15x - 4x = -1 - 10$\n` +
`$\\Leftrightarrow 11x = -11 \\Rightarrow x = -1$.\n\n` +
`**b)** $(3x - 1)(4x + 3) + 2(3x - 1) = 0$\n` +
`$\\Leftrightarrow (3x - 1)(4x + 3 + 2) = 0$\n` +
`$\\Leftrightarrow (3x - 1)(4x + 5) = 0$\n` +
`$\\Rightarrow 3x - 1 = 0 \\Rightarrow x = \\frac{1}{3}$\n` +
`hoặc $4x + 5 = 0 \\Rightarrow x = -\\frac{5}{4}$.\n\n` +
`**c)** $\\frac{x}{2(x - 3)} + \\frac{x}{2(x + 1)} = \\frac{2x}{(x + 1)(x - 3)}$\n` +
`Điều kiện xác định: $x \\ne 3; x \\ne -1$.\n` +
`Quy đồng mẫu $2(x - 3)(x + 1)$:\n` +
`$\\Leftrightarrow \\frac{x(x + 1)}{2(x - 3)(x + 1)} + \\frac{x(x - 3)}{2(x - 3)(x + 1)} = \\frac{4x}{2(x - 3)(x + 1)}$\n` +
`$\\Rightarrow x^2 + x + x^2 - 3x = 4x$\n` +
`$\\Leftrightarrow 2x^2 - 2x - 4x = 0$\n` +
`$\\Leftrightarrow 2x^2 - 6x = 0$\n` +
`$\\Leftrightarrow 2x(x - 3) = 0$\n` +
`$\\Rightarrow x = 0$ hoặc $x - 3 = 0 \\Rightarrow x = 3$.\n` +
`Đối chiếu ĐKXĐ, $x = 3$ bị loại. Vậy $x = 0$ (thỏa mãn).`;

  const sol9 = `**Khẳng định trên là SAI.**\n` +
`Trong $\\Delta ABC$, có $AM$ là đường phân giác của góc $A$ (với $M \\in BC$).\n` +
`Theo tính chất đường phân giác trong tam giác, tỉ số giữa hai đoạn thẳng trên cạnh đối diện (do phân giác chia ra) bằng tỉ số hai cạnh kề của hai đoạn thẳng đó.\n` +
`Do đó, tỉ lệ thức đúng phải là:\n` +
`$\\frac{AB}{AC} = \\frac{MB}{MC}$ (Độ dài đoạn $MB$ tỉ lệ thuận với cạnh $AB$, độ dài $MC$ tỉ lệ thuận với cạnh $AC$).\n` +
`Biểu thức $\\frac{AB}{AC} = \\frac{MC}{MB}$ đã bị viết ngược tỉ số ở vế phải.`;

  const sol10 = `Từ giả thiết: $5x^2 + 8xy + 5y^2 + 4x - 4y + 8 = 0$\n` +
`Phân tích và nhóm các hạng tử tạo thành các hằng đẳng thức:\n` +
`$4(x^2 + 2xy + y^2) + (x^2 + 4x + 4) + (y^2 - 4y + 4) = 0$\n` +
`$\\Leftrightarrow 4(x + y)^2 + (x + 2)^2 + (y - 2)^2 = 0$\n` +
`Vì $(x + y)^2 \\ge 0$, $(x + 2)^2 \\ge 0$, $(y - 2)^2 \\ge 0$ với mọi $x, y$.\n` +
`Nên tổng của chúng bằng $0$ khi và chỉ khi từng số hạng bằng $0$:\n` +
`$\\begin{cases} x + y = 0 \\\\ x + 2 = 0 \\\\ y - 2 = 0 \\end{cases} \\Leftrightarrow \\begin{cases} x = -2 \\\\ y = 2 \\end{cases}$ (Thỏa mãn $x + y = -2 + 2 = 0$).\n` +
`Tính giá trị của biểu thức $P$:\n` +
`$P = (x + y)^8 + (x + 1)^{11} + (y - 1)^{2018}$\n` +
`Thay $x = -2, y = 2$ vào $P$:\n` +
`$P = 0^8 + (-2 + 1)^{11} + (2 - 1)^{2018} = 0 + (-1)^{11} + 1^{2018}$\n` +
`$P = 0 - 1 + 1 = 0$.\n` +
`**Kết luận:** Giá trị của biểu thức $P$ là $0$.`;

  const updates = [
    { id: "d0ae051b-1264-45bc-8714-0ba8bcc9475a", solution: sol1 },
    { id: "d0f8a21f-a993-4d40-a774-e22fdac67179", solution: sol2 },
    { id: "d16ca5e3-ee41-47f9-9119-e6792834b9ea", solution: sol3 },
    { id: "d26c685c-690a-499b-b7f7-57f6f715fd65", solution: sol4 },
    { id: "d3032b60-5c44-479a-8aa7-7f00b38fdd79", solution: sol5 },
    { id: "d34199f5-7801-46c6-90cf-b84f5e32bd10", solution: sol6 },
    { id: "d4448cf9-73cb-4733-98bc-53cce168fd42", solution: sol7 },
    { id: "d523d0af-a8eb-4500-b11b-7d8979b88165", solution: sol8 },
    { id: "d52cd2b4-7a10-4927-954f-eac09a7bd4b8", solution: sol9 },
    { id: "d571b34e-d220-430d-b625-8da46336f287", solution: sol10 }
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

manualFixBatch21Grade8().catch(console.error).finally(() => process.exit(0));
