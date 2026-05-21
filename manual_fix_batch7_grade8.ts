import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch7Grade8() {
  const sql = getDb();

  const sol1 = `**1.** Khai triển hằng đẳng thức:\n` +
`$(2x - 1)^2 = (2x)^2 - 2 \\cdot 2x \\cdot 1 + 1^2 = 4x^2 - 4x + 1$.\n` +
`Mặt khác, $(2x - 1)^2 = (1 - 2x)^2$ (bình phương của hai số đối nhau luôn bằng nhau).\n` +
`Do đó, đáp án đúng có thể là A (nếu trắc nghiệm chọn 1 đáp án tường minh dạng khai triển) hoặc B.\n\n` +
`**2.** Rút gọn biểu thức:\n` +
`Ta áp dụng hằng đẳng thức tổng và hiệu hai lập phương:\n` +
`$(x - y)(x^2 + xy + y^2) = x^3 - y^3$\n` +
`$(x + y)(x^2 - xy + y^2) = x^3 + y^3$\n` +
`Biểu thức trở thành:\n` +
`$= (x^3 - y^3) - (x^3 + y^3) = x^3 - y^3 - x^3 - y^3 = -2y^3$.\n` +
`**Kết luận:** Kết quả rút gọn là $-2y^3$.`;

  const sol2 = `**1. Tìm ĐKXĐ và rút gọn biểu thức A:**\n` +
`Điều kiện xác định: $x \\ne 3, x \\ne -3$.\n` +
`$A = \\left( \\frac{x(x - 3)}{(x + 3)(x - 3)} + \\frac{2x(x + 3)}{(x - 3)(x + 3)} - \\frac{3x^2 + 12}{(x - 3)(x + 3)} \\right) \\cdot \\frac{x - 3}{3}$\n` +
`$= \\frac{x^2 - 3x + 2x^2 + 6x - 3x^2 - 12}{(x - 3)(x + 3)} \\cdot \\frac{x - 3}{3}$\n` +
`$= \\frac{3x - 12}{(x - 3)(x + 3)} \\cdot \\frac{x - 3}{3}$\n` +
`$= \\frac{3(x - 4)}{(x - 3)(x + 3)} \\cdot \\frac{x - 3}{3} = \\frac{x - 4}{x + 3}$.\n\n` +
`**2. Tính giá trị của biểu thức A khi $x = -4$:**\n` +
`Thay $x = -4$ (thỏa mãn ĐKXĐ) vào $A$:\n` +
`$A = \\frac{-4 - 4}{-4 + 3} = \\frac{-8}{-1} = 8$.\n\n` +
`**3. Tìm giá trị nguyên của x để biểu thức A nhận giá trị nguyên:**\n` +
`$A = \\frac{x - 4}{x + 3} = \\frac{x + 3 - 7}{x + 3} = 1 - \\frac{7}{x + 3}$.\n` +
`Để $A \\in \\mathbb{Z}$ thì $x + 3$ phải là ước của $7$.\n` +
`Ư$(7) = \\{1; -1; 7; -7\\}$.\n` +
`- $x + 3 = 1 \\Rightarrow x = -2$\n` +
`- $x + 3 = -1 \\Rightarrow x = -4$\n` +
`- $x + 3 = 7 \\Rightarrow x = 4$\n` +
`- $x + 3 = -7 \\Rightarrow x = -10$\n` +
`Tất cả các giá trị đều thỏa mãn ĐKXĐ.\n` +
`Vậy $x \\in \\{-10; -4; -2; 4\\}$.`;

  const sol3 = `Để phương trình $\\frac{x}{3 - x} = \\frac{5x}{(x + 2)(x - 3)}$ xác định, các mẫu thức phải khác $0$.\n` +
`Ta có:\n` +
`- $3 - x \\ne 0 \\Leftrightarrow x \\ne 3$\n` +
`- $x + 2 \\ne 0 \\Leftrightarrow x \\ne -2$\n` +
`- $x - 3 \\ne 0 \\Leftrightarrow x \\ne 3$\n` +
`Gộp các điều kiện lại, ta được $x \\ne 3$ và $x \\ne -2$.\n` +
`**Kết luận:** Điều kiện xác định của phương trình là $x \\ne 3$ và $x \\ne -2$.`;

  const sol4 = `**a)** $9x^2 - 3 = (3x + 1)(2x - 3)$\n` +
`$\\Leftrightarrow 9x^2 - 3 = 6x^2 - 9x + 2x - 3$\n` +
`$\\Leftrightarrow 9x^2 - 3 = 6x^2 - 7x - 3$\n` +
`$\\Leftrightarrow 9x^2 - 6x^2 + 7x = 0$\n` +
`$\\Leftrightarrow 3x^2 + 7x = 0 \\Leftrightarrow x(3x + 7) = 0$\n` +
`$\\Rightarrow x = 0$ hoặc $3x + 7 = 0 \\Rightarrow x = -\\frac{7}{3}$.\n\n` +
`**b)** $\\frac{3x}{x - 5} + \\frac{1}{x} = \\frac{4x + 3}{x(x - 5)} + 3$\n` +
`Điều kiện xác định: $x \\ne 0; x \\ne 5$.\n` +
`Quy đồng mẫu hai vế và khử mẫu:\n` +
`$\\frac{3x^2}{x(x - 5)} + \\frac{x - 5}{x(x - 5)} = \\frac{4x + 3}{x(x - 5)} + \\frac{3x(x - 5)}{x(x - 5)}$\n` +
`$\\Rightarrow 3x^2 + x - 5 = 4x + 3 + 3x^2 - 15x$\n` +
`$\\Leftrightarrow x - 5 = -11x + 3$\n` +
`$\\Leftrightarrow x + 11x = 3 + 5 \\Leftrightarrow 12x = 8 \\Rightarrow x = \\frac{8}{12} = \\frac{2}{3}$ (thỏa mãn ĐKXĐ).\n` +
`Vậy $x = \\frac{2}{3}$.`;

  const sol5 = `**a) Chứng minh $\\Delta AHB \\sim \\Delta CAB$:**\n` +
`Xét $\\Delta AHB$ và $\\Delta CAB$ có:\n` +
`$\\widehat{AHB} = \\widehat{CAB} = 90^\\circ$\n` +
`Góc $\\widehat{B}$ chung\n` +
`$\\Rightarrow \\Delta AHB \\sim \\Delta CAB$ (g-g).\n\n` +
`**b) Chứng minh $AH^2 = BH \\cdot CH$:**\n` +
`Tương tự câu a, chứng minh được $\\Delta AHC \\sim \\Delta BAC$ (g-g).\n` +
`Từ đó $\\Delta AHB \\sim \\Delta CHA$ (vì cùng đồng dạng với $\\Delta CAB$).\n` +
`$\\Rightarrow \\frac{AH}{CH} = \\frac{HB}{HA} \\Rightarrow AH^2 = HB \\cdot CH$ (đpcm).\n\n` +
`**c) Chứng minh $\\Delta AMN \\sim \\Delta ACB$:**\n` +
`Xét tứ giác $AMHN$ có $\\widehat{A} = \\widehat{M} = \\widehat{N} = 90^\\circ$ nên là hình chữ nhật.\n` +
`Suy ra hai đường chéo $AH = MN$ và chúng cắt nhau tại trung điểm của mỗi đường.\n` +
`Gọi $O$ là giao điểm của $AH$ và $MN$. $\\Delta OAM$ cân tại $O \\Rightarrow \\widehat{AMN} = \\widehat{OAM} = \\widehat{MAH}$.\n` +
`Mặt khác, cùng phụ với góc $\\widehat{CAH}$, ta có $\\widehat{MAH} = \\widehat{C}$.\n` +
`Suy ra $\\widehat{AMN} = \\widehat{C}$.\n` +
`Xét $\\Delta AMN$ và $\\Delta ACB$ có:\n` +
`$\\widehat{A} = 90^\\circ$ chung;\n` +
`$\\widehat{AMN} = \\widehat{C}$ (chứng minh trên).\n` +
`$\\Rightarrow \\Delta AMN \\sim \\Delta ACB$ (g-g).\n\n` +
`**d) Chứng minh I là trung điểm của BC:**\n` +
`Trong tam giác vuông $AKM$ (do $AK \\perp MN$ tại $K$), ta có $\\widehat{MAK} + \\widehat{AMK} = 90^\\circ$.\n` +
`Mà $\\widehat{AMK} = \\widehat{C}$ (cmt), nên $\\widehat{MAK} + \\widehat{C} = 90^\\circ$.\n` +
`Mặt khác, trong $\\Delta ABC$ vuông tại $A$, ta có $\\widehat{B} + \\widehat{C} = 90^\\circ$.\n` +
`Từ đó suy ra $\\widehat{MAK} = \\widehat{B}$, hay $\\widehat{IAB} = \\widehat{B}$.\n` +
`Suy ra $\\Delta IAB$ cân tại $I \\Rightarrow IA = IB$.\n` +
`Lại có $\\widehat{IAC} = 90^\\circ - \\widehat{IAB} = 90^\\circ - \\widehat{B} = \\widehat{C}$.\n` +
`Suy ra $\\Delta IAC$ cân tại $I \\Rightarrow IA = IC$.\n` +
`Từ hai điều trên, $IB = IC$, suy ra $I$ là trung điểm của $BC$ (đpcm).`;

  const sol6 = `**a)** $\\frac{x - 1}{3} + \\frac{x + 3}{x} = 2$ (ĐKXĐ: $x \\ne 0$)\n` +
`Quy đồng khử mẫu với mẫu chung $3x$:\n` +
`$\\Leftrightarrow x(x - 1) + 3(x + 3) = 6x \\Leftrightarrow x^2 - x + 3x + 9 - 6x = 0$\n` +
`$\\Leftrightarrow x^2 - 4x + 9 = 0$\n` +
`$\\Leftrightarrow (x - 2)^2 + 5 = 0$ (Vô nghiệm vì $(x - 2)^2 + 5 > 0$).\n\n` +
`**b)** $x^2 - 25 = (2x - 1)(x + 5)$\n` +
`$\\Leftrightarrow (x - 5)(x + 5) - (2x - 1)(x + 5) = 0$\n` +
`$\\Leftrightarrow (x + 5)[(x - 5) - (2x - 1)] = 0$\n` +
`$\\Leftrightarrow (x + 5)(x - 5 - 2x + 1) = 0$\n` +
`$\\Leftrightarrow (x + 5)(-x - 4) = 0 \\Rightarrow x = -5$ hoặc $x = -4$.\n\n` +
`**c)** $\\frac{x - 2}{x + 2} - \\frac{x^2 + 2}{x(x + 2)} = \\frac{3}{x}$ (ĐKXĐ: $x \\ne 0; x \\ne -2$)\n` +
`$\\Leftrightarrow \\frac{x(x - 2)}{x(x + 2)} - \\frac{x^2 + 2}{x(x + 2)} = \\frac{3(x + 2)}{x(x + 2)}$\n` +
`$\\Rightarrow x^2 - 2x - (x^2 + 2) = 3x + 6$\n` +
`$\\Leftrightarrow x^2 - 2x - x^2 - 2 = 3x + 6$\n` +
`$\\Leftrightarrow -2x - 2 = 3x + 6 \\Leftrightarrow -5x = 8 \\Rightarrow x = -\\frac{8}{5}$ (thỏa mãn ĐKXĐ).\n` +
`Vậy $x = -\\frac{8}{5}$.`;

  const sol7 = `**a)** $3xy^2 - 45x^2y$\n` +
`$= 3xy(y - 15x)$.\n\n` +
`**b)** $x^2 - 5x + xy - 5y$\n` +
`Nhóm hạng tử:\n` +
`$= (x^2 - 5x) + (xy - 5y)$\n` +
`$= x(x - 5) + y(x - 5)$\n` +
`$= (x - 5)(x + y)$.\n\n` +
`**c)** $25y^2 - 4x^2 + 4x - 1$\n` +
`Nhóm và dùng hằng đẳng thức:\n` +
`$= 25y^2 - (4x^2 - 4x + 1)$\n` +
`$= (5y)^2 - (2x - 1)^2$\n` +
`$= (5y - (2x - 1))(5y + (2x - 1))$\n` +
`$= (5y - 2x + 1)(5y + 2x - 1)$.\n\n` +
`**d)** $x^2 - 8x - 33$\n` +
`Tách hạng tử:\n` +
`$= x^2 - 11x + 3x - 33$\n` +
`$= x(x - 11) + 3(x - 11)$\n` +
`$= (x - 11)(x + 3)$.`;

  const sol8 = `**1)** $(3x - 1)^2 = (x - 1)^2$\n` +
`$\\Leftrightarrow (3x - 1)^2 - (x - 1)^2 = 0$\n` +
`$\\Leftrightarrow [(3x - 1) - (x - 1)][(3x - 1) + (x - 1)] = 0$\n` +
`$\\Leftrightarrow (3x - 1 - x + 1)(3x - 1 + x - 1) = 0$\n` +
`$\\Leftrightarrow 2x(4x - 2) = 0$\n` +
`$\\Rightarrow 2x = 0$ hoặc $4x - 2 = 0 \\Rightarrow x = 0$ hoặc $x = \\frac{1}{2}$.\n\n` +
`**2)** Theo định lý Bê-du (Bézout), đa thức $B$ chia hết cho đa thức $C = x - 2$ khi và chỉ khi giá trị của đa thức $B$ tại $x = 2$ bằng $0$.\n` +
`Ta có: $B(2) = 2^3 - 3 \\cdot 2^2 + 5 \\cdot 2 - 2m = 0$\n` +
`$\\Leftrightarrow 8 - 12 + 10 - 2m = 0$\n` +
`$\\Leftrightarrow 6 - 2m = 0 \\Rightarrow 2m = 6 \\Rightarrow m = 3$.\n` +
`**Kết luận:** $m = 3$.`;

  const sol9 = `Áp dụng bất đẳng thức Cauchy-Schwarz dạng phân thức (hoặc Bunhiacopxki), ta có:\n` +
`$\\left( a + \\frac{1}{a} \\right)^2 + \\left( b + \\frac{1}{b} \\right)^2 + \\left( c + \\frac{1}{c} \\right)^2 \\ge \\frac{1}{3} \\left( a + b + c + \\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} \\right)^2$\n` +
`Theo giả thiết $a + b + c = 1$. \n` +
`Lại có bất đẳng thức $\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} \\ge \\frac{9}{a + b + c} = \\frac{9}{1} = 9$.\n` +
`Thay vào ta được:\n` +
`$VT \\ge \\frac{1}{3} (1 + 9)^2 = \\frac{100}{3}$.\n` +
`Mà $\\frac{100}{3} = 33,333... > 33$.\n` +
`Vậy $\\left( a + \\frac{1}{a} \\right)^2 + \\left( b + \\frac{1}{b} \\right)^2 + \\left( c + \\frac{1}{c} \\right)^2 > 33$ (đpcm).\n` +
`*(Dấu \"=\" không bao giờ xảy ra đối với số $33$ vì giá trị nhỏ nhất của biểu thức là $\\frac{100}{3}$ khi $a = b = c = \\frac{1}{3}$)*.`;

  const sol10 = `**a)** $2x(x - 3) - 3(3 - x) = 0$\n` +
`$\\Leftrightarrow 2x(x - 3) + 3(x - 3) = 0$\n` +
`$\\Leftrightarrow (x - 3)(2x + 3) = 0 \\Rightarrow x = 3$ hoặc $x = -\\frac{3}{2}$.\n\n` +
`**b)** $x^3 + 5x^2 - 5x = 15x - 32$\n` +
`*(Lưu ý: Hạng tử $-5$ khả năng cao là do thiếu sót khi gõ từ $-5x$ trong đề gốc, để nghiệm chẵn)*\n` +
`$\\Leftrightarrow x^3 + 5x^2 - 20x + 32 = 0$\n` +
`Nhẩm nghiệm thấy $x = -8$:\n` +
`$= x^3 + 8x^2 - 3x^2 - 24x + 4x + 32 = 0$\n` +
`$\\Leftrightarrow x^2(x + 8) - 3x(x + 8) + 4(x + 8) = 0$\n` +
`$\\Leftrightarrow (x + 8)(x^2 - 3x + 4) = 0$\n` +
`Vì $x^2 - 3x + 4 = (x - 1,5)^2 + 1,75 > 0$ nên $x + 8 = 0 \\Rightarrow x = -8$.\n\n` +
`**c)** $8x^2 + 2x - 15 = 0$\n` +
`$\\Leftrightarrow 8x^2 + 12x - 10x - 15 = 0$\n` +
`$\\Leftrightarrow 4x(2x + 3) - 5(2x + 3) = 0$\n` +
`$\\Leftrightarrow (2x + 3)(4x - 5) = 0 \\Rightarrow x = -\\frac{3}{2}$ hoặc $x = \\frac{5}{4}$.`;

  const updates = [
    { id: "3e88b352-ecaf-44fb-bfc1-a5ef89ebb01e", solution: sol1 },
    { id: "3f219778-22c4-4b1e-a989-1ae2ee301428", solution: sol2 },
    { id: "4021b9c7-e0e6-4a23-974f-209ed7680a13", solution: sol3 },
    { id: "405ff4f0-a561-45c5-a836-d009a3264af2", solution: sol4 },
    { id: "42f64cac-ffbb-414d-a53d-00b45d0dc83a", solution: sol5 },
    { id: "44775386-1495-43a4-b40f-f529373479a9", solution: sol6 },
    { id: "45a48b4b-bba8-49b4-93d2-1c2dc2aa6562", solution: sol7 },
    { id: "46590834-dac4-47de-8200-b997d935c100", solution: sol8 },
    { id: "471b7da2-9dac-4805-8fec-eab81b80df15", solution: sol9 },
    { id: "477aeff9-cbd8-4c67-9868-68f242f94f66", solution: sol10 }
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

manualFixBatch7Grade8().catch(console.error).finally(() => process.exit(0));
