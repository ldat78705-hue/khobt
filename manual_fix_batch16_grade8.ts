import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch16Grade8() {
  const sql = getDb();

  const sol1 = `**a) Tính diện tích toàn phần của hình hộp chữ nhật:**\n` +
`Diện tích toàn phần ($S_{tp}$) bằng tổng diện tích xung quanh và diện tích 2 đáy:\n` +
`$S_{tp} = 2(AB \\cdot BC + AB \\cdot AA' + BC \\cdot AA')$\n` +
`$S_{tp} = 2(10 \\cdot 20 + 10 \\cdot 15 + 20 \\cdot 15)$\n` +
`$S_{tp} = 2(200 + 150 + 300) = 2(650) = 1300$ (cm$^2$).\n\n` +
`**b) Tính độ dài đường chéo $AC'$:**\n` +
`Áp dụng định lý Pytago trong không gian cho hình hộp chữ nhật:\n` +
`$AC' = \\sqrt{AB^2 + BC^2 + AA'^2}$\n` +
`$AC' = \\sqrt{10^2 + 20^2 + 15^2} = \\sqrt{100 + 400 + 225} = \\sqrt{725}$\n` +
`$AC' \\approx 26,9$ (cm).`;

  const sol2 = `**a) Chứng minh tứ giác BHCD là hình bình hành:**\n` +
`Do $D$ đối xứng với $H$ qua $M$ nên $M$ là trung điểm của $HD$.\n` +
`Tứ giác $BHCD$ có hai đường chéo $BC$ và $HD$ cắt nhau tại trung điểm $M$ của mỗi đường.\n` +
`Suy ra tứ giác $BHCD$ là hình bình hành.\n\n` +
`**b) Chứng minh Tam giác ABD vuông tại B, tam giác ACD vuông tại C:**\n` +
`Vì $BHCD$ là hình bình hành nên $BD \\parallel CH$ và $CD \\parallel BH$.\n` +
`Trong $\\Delta ABC$, $H$ là trực tâm nên $CH \\perp AB$ và $BH \\perp AC$.\n` +
`Từ $BD \\parallel CH$ và $CH \\perp AB \\Rightarrow BD \\perp AB$. Do đó $\\Delta ABD$ vuông tại $B$.\n` +
`Từ $CD \\parallel BH$ và $BH \\perp AC \\Rightarrow CD \\perp AC$. Do đó $\\Delta ACD$ vuông tại $C$.\n\n` +
`**c) Chứng minh IA = IB = IC = ID:**\n` +
`Xét $\\Delta ABD$ vuông tại $B$, $BI$ là đường trung tuyến ứng với cạnh huyền $AD$ (do $I$ là trung điểm $AD$).\n` +
`$\\Rightarrow IB = \\frac{1}{2}AD \\Rightarrow IB = IA = ID$ (1)\n` +
`Xét $\\Delta ACD$ vuông tại $C$, $CI$ là đường trung tuyến ứng với cạnh huyền $AD$.\n` +
`$\\Rightarrow IC = \\frac{1}{2}AD \\Rightarrow IC = IA = ID$ (2)\n` +
`Từ (1) và (2) suy ra $IA = IB = IC = ID$ (đpcm). \n` +
`*(Điểm $I$ chính là tâm đường tròn ngoại tiếp $\\Delta ABC$ và tứ giác $ABDC$)*.`;

  const sol3 = `*(Đây là câu hỏi thiếu dữ kiện hình vẽ gốc. Tuy nhiên, phương pháp chung để giải dạng bài tìm $x$ trên hình vẽ lớp 8 là:)*\n\n` +
`**1. Nếu hình vẽ liên quan đến Đường trung bình:**\n` +
`- Trong tam giác: Đường trung bình song song với cạnh thứ ba và bằng một nửa cạnh ấy ($x = \\frac{a}{2}$ hoặc $x = 2a$).\n` +
`- Trong hình thang: Đường trung bình song song với hai đáy và bằng nửa tổng hai đáy ($x = \\frac{a + b}{2}$).\n\n` +
`**2. Nếu hình vẽ liên quan đến Định lý Thales:**\n` +
`Nếu có đường thẳng song song cắt hai cạnh của tam giác, ta lập tỉ lệ thức các đoạn thẳng tương ứng: $\\frac{a}{b} = \\frac{c}{x} \\Rightarrow x = \\frac{b \\cdot c}{a}$.\n\n` +
`**3. Nếu hình vẽ liên quan đến Tam giác vuông:**\n` +
`Áp dụng định lý Pytago $x^2 = a^2 + b^2$ để tìm độ dài cạnh chưa biết.`;

  const sol4 = `Ta thực hiện phép nhân đa thức với đa thức:\n` +
`$(x + 2y)(y + 2x) = x \\cdot y + x \\cdot 2x + 2y \\cdot y + 2y \\cdot 2x$\n` +
`$= xy + 2x^2 + 2y^2 + 4xy$\n` +
`$= 2x^2 + 5xy + 2y^2$.\n` +
`**Đáp án đúng là D.**`;

  const sol5 = `Gọi độ dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian đi từ $A$ đến $B$ là: $\\frac{x}{50}$ (giờ).\n` +
`Thời gian đi từ $B$ về $A$ là: $\\frac{x}{40}$ (giờ).\n` +
`Thời gian giao hàng là $15$ phút = $\\frac{1}{4}$ giờ = $0,25$ giờ.\n` +
`Tổng thời gian từ lúc đi đến lúc về là: $9$ giờ $30$ phút - $7$ giờ = $2$ giờ $30$ phút = $2,5$ giờ.\n` +
`Ta có phương trình tổng thời gian:\n` +
`$\\frac{x}{50} + 0,25 + \\frac{x}{40} = 2,5$\n` +
`$\\Leftrightarrow \\frac{x}{50} + \\frac{x}{40} = 2,25$\n` +
`$\\Leftrightarrow \\frac{4x}{200} + \\frac{5x}{200} = \\frac{9}{4}$\n` +
`$\\Leftrightarrow \\frac{9x}{200} = \\frac{9}{4}$\n` +
`$\\Leftrightarrow x = \\frac{9}{4} \\cdot \\frac{200}{9} = \\frac{200}{4} = 50$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Độ dài quãng đường $AB$ là $50$ km.`;

  const sol6 = `**a)** $x^2 - 3x + xy - 3y$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$= x(x - 3) + y(x - 3)$\n` +
`Đặt nhân tử chung $(x - 3)$:\n` +
`$= (x + y)(x - 3)$.\n\n` +
`**b)** $x^2 + y^2 - 2xy - 25$\n` +
`Nhóm 3 hạng tử đầu tạo hằng đẳng thức:\n` +
`$= (x^2 - 2xy + y^2) - 25$\n` +
`$= (x - y)^2 - 5^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (x - y - 5)(x - y + 5)$.`;

  const sol7 = `**a)** $x^2 + 4 - 4x$\n` +
`Sắp xếp lại các hạng tử:\n` +
`$= x^2 - 4x + 4$\n` +
`Áp dụng hằng đẳng thức bình phương của một hiệu $(A - B)^2 = A^2 - 2AB + B^2$:\n` +
`$= x^2 - 2 \\cdot x \\cdot 2 + 2^2$\n` +
`$= (x - 2)^2$.\n\n` +
`**b)** $x^3 - 5x$\n` +
`Đặt nhân tử chung là $x$:\n` +
`$= x(x^2 - 5)$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= x(x - \\sqrt{5})(x + \\sqrt{5})$.`;

  const sol8 = `**1. Tìm giá trị của B biết x = -2:**\n` +
`$B = \\frac{x^2 - 2x - 8}{x - 1} = \\frac{(x - 4)(x + 2)}{x - 1}$.\n` +
`Thay $x = -2$ (thỏa mãn ĐKXĐ) vào $B$:\n` +
`$B = \\frac{(-2)^2 - 2(-2) - 8}{-2 - 1} = \\frac{4 + 4 - 8}{-3} = \\frac{0}{-3} = 0$.\n\n` +
`**2. Rút gọn P = A.B:**\n` +
`$A = \\frac{16}{(x - 4)(x + 4)} + \\frac{2(x - 4)}{(x + 4)(x - 4)} - \\frac{x + 4}{(x - 4)(x + 4)}$\n` +
`$A = \\frac{16 + 2x - 8 - x - 4}{(x - 4)(x + 4)} = \\frac{x + 4}{(x - 4)(x + 4)} = \\frac{1}{x - 4}$.\n` +
`$P = A \\cdot B = \\frac{1}{x - 4} \\cdot \\frac{(x - 4)(x + 2)}{x - 1} = \\frac{x + 2}{x - 1}$.\n\n` +
`**3. Tìm giá trị nguyên của x để P nguyên:**\n` +
`$P = \\frac{x + 2}{x - 1} = \\frac{x - 1 + 3}{x - 1} = 1 + \\frac{3}{x - 1}$.\n` +
`Để $P$ có giá trị nguyên thì $x - 1$ phải là ước của $3$. $U(3) = \\{1; -1; 3; -3\\}$.\n` +
`- $x - 1 = 1 \\Rightarrow x = 2$ (TM)\n` +
`- $x - 1 = -1 \\Rightarrow x = 0$ (TM)\n` +
`- $x - 1 = 3 \\Rightarrow x = 4$ (Loại vì vi phạm ĐKXĐ $x \\ne 4$)\n` +
`- $x - 1 = -3 \\Rightarrow x = -2$ (TM)\n` +
`Vậy $x \\in \\{-2; 0; 2\\}$.`;

  const sol9 = `**a) Chứng minh BDCH là hình bình hành:**\n` +
`Vì $H$ là trực tâm của $\\Delta ABC$ nên $CH \\perp AB$ và $BH \\perp AC$.\n` +
`Theo đề bài, $BD \\perp AB \\Rightarrow BD \\parallel CH$ (cùng $\\perp AB$).\n` +
`Tương tự, $CD \\perp AC \\Rightarrow CD \\parallel BH$ (cùng $\\perp AC$).\n` +
`Tứ giác $BDCH$ có $BD \\parallel CH$ và $CD \\parallel BH$ nên là hình bình hành.\n\n` +
`**b) Chứng minh $\\widehat{BAC} + \\widehat{BHC} = 180^\\circ$:**\n` +
`Xét tứ giác $ABDC$, ta có $\\widehat{ABD} = 90^\\circ$ (do $BD \\perp AB$) và $\\widehat{ACD} = 90^\\circ$ (do $CD \\perp AC$).\n` +
`Tổng 4 góc trong tứ giác là $360^\\circ \\Rightarrow \\widehat{BAC} + \\widehat{BDC} = 360^\\circ - 90^\\circ - 90^\\circ = 180^\\circ$.\n` +
`Mặt khác, $BDCH$ là hình bình hành nên hai góc đối bằng nhau: $\\widehat{BHC} = \\widehat{BDC}$.\n` +
`Thay vào ta được: $\\widehat{BAC} + \\widehat{BHC} = 180^\\circ$ (đpcm).\n\n` +
`**c) Chứng minh H, M, D thẳng hàng:**\n` +
`Vì tứ giác $BDCH$ là hình bình hành.\n` +
`Đường chéo $BC$ và $HD$ cắt nhau tại trung điểm của mỗi đường.\n` +
`Theo đề bài $M$ là trung điểm của $BC$, do đó $M$ cũng phải là trung điểm của đường chéo $HD$.\n` +
`Vậy $H, M, D$ thẳng hàng (đpcm).`;

  const sol10 = `**a) Chứng minh $\\Delta ABC \\sim \\Delta HAC$:**\n` +
`Xét $\\Delta ABC$ và $\\Delta HAC$ có:\n` +
`$\\widehat{BAC} = \\widehat{AHC} = 90^\\circ$\n` +
`$\\widehat{C}$ là góc chung.\n` +
`$\\Rightarrow \\Delta ABC \\sim \\Delta HAC$ (g-g).\n\n` +
`**b) Tính BD, DC:**\n` +
`Trong $\\Delta ABC$ vuông tại $A$: $BC = \\sqrt{AB^2 + AC^2} = \\sqrt{30^2 + 40^2} = 50$ (cm).\n` +
`Vì $BD$ là đường phân giác của $\\widehat{ABC}$ nên: $\\frac{AD}{DC} = \\frac{AB}{BC} = \\frac{30}{50} = \\frac{3}{5}$.\n` +
`Theo tính chất tỉ lệ thức: $\\frac{AD}{3} = \\frac{DC}{5} = \\frac{AD + DC}{3 + 5} = \\frac{40}{8} = 5$.\n` +
`$\\Rightarrow AD = 15$ (cm); $DC = 25$ (cm).\n` +
`Áp dụng Pytago trong $\\Delta ABD$ vuông tại $A$: $BD = \\sqrt{AB^2 + AD^2} = \\sqrt{30^2 + 15^2} = 15\\sqrt{5}$ (cm).\n\n` +
`**c) Chứng minh BD.IH = BI.AD và AI = AD:**\n` +
`Xét $\\Delta IBH$ và $\\Delta DBA$ có:\n` +
`$\\widehat{IHB} = \\widehat{DAB} = 90^\\circ$; $\\widehat{IBH} = \\widehat{DBA}$ ($BD$ là phân giác).\n` +
`$\\Rightarrow \\Delta IBH \\sim \\Delta DBA$ (g-g) $\\Rightarrow \\frac{IH}{AD} = \\frac{BI}{BD} \\Rightarrow BD \\cdot IH = BI \\cdot AD$ (đpcm).\n` +
`Xét góc: $\\widehat{AID} = \\widehat{BIH}$ (đối đỉnh). Mà $\\widehat{BIH} = 90^\\circ - \\widehat{IBH}$.\n` +
`Lại có $\\widehat{ADI} = 90^\\circ - \\widehat{DBA}$. Vì $\\widehat{IBH} = \\widehat{DBA}$ nên $\\widehat{AID} = \\widehat{ADI}$.\n` +
`$\\Rightarrow \\Delta ADI$ cân tại $A \\Rightarrow AI = AD$ (đpcm).\n\n` +
`**d) Chứng minh $\\frac{HI}{IA} = \\frac{AD}{DC}$:**\n` +
`Từ chứng minh trên $\\Delta IBH \\sim \\Delta DBA \\Rightarrow \\frac{HI}{AD} = \\frac{BH}{AB}$.\n` +
`Từ $\\Delta ABC \\sim \\Delta HBA$ (cùng phụ góc B) $\\Rightarrow \\frac{BH}{AB} = \\frac{AB}{BC}$.\n` +
`Từ tính chất phân giác: $\\frac{AB}{BC} = \\frac{AD}{DC}$.\n` +
`Bắc cầu ta có: $\\frac{HI}{AD} = \\frac{AD}{DC}$.\n` +
`Mặt khác, $AI = AD$ (chứng minh câu c). Thay $AD$ ở mẫu bằng $IA$ ta được:\n` +
`$\\frac{HI}{IA} = \\frac{AD}{DC}$ (đpcm).`;

  const updates = [
    { id: "9b57f881-2328-4ac2-b02e-4227a40e9da6", solution: sol1 },
    { id: "9b6d597d-0df6-45a7-9a51-f8e05f984373", solution: sol2 },
    { id: "9b78f175-5741-48f8-afb4-c7d7642d0638", solution: sol3 },
    { id: "9cbd893c-7d39-409d-8bc2-919ab076e314", solution: sol4 },
    { id: "9d2faed3-c250-4cc0-91d4-7702cabb669e", solution: sol5 },
    { id: "9f8d25d9-50b8-4416-ab4c-6aa2458ce4ee", solution: sol6 },
    { id: "a0f23fb5-d79e-42de-8640-e1a9b4279475", solution: sol7 },
    { id: "a1ae695c-ccf8-4ef8-a92b-a988e397665e", solution: sol8 },
    { id: "a1f5d048-9fa5-4204-97b6-65539b5e2c37", solution: sol9 },
    { id: "a27e84c5-7189-4486-bd57-82f6721e11c6", solution: sol10 }
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

manualFixBatch16Grade8().catch(console.error).finally(() => process.exit(0));
