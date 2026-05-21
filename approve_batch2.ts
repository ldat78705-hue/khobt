import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function approveBatch2() {
  const sql = getDb();

  const sol6 = `**A. BÀI 6 (HÌNH HỌC)**\n` +
`**a)** Xét $\\Delta BEC$ và $\\Delta ADC$ có $\\widehat{BEC} = \\widehat{ADC} = 90^\\circ$ và $\\widehat{C}$ chung $\\Rightarrow \\Delta BEC \\sim \\Delta ADC$ (g-g).\n` +
`Từ đó $\\frac{CE}{CD} = \\frac{BC}{AC} \\Rightarrow \\frac{CE}{BC} = \\frac{CD}{AC}$. Kết hợp $\\widehat{C}$ chung $\\Rightarrow \\Delta CDE \\sim \\Delta CAB$ (c-g-c).\n\n` +
`**b)** Tương tự câu a, ta có $\\Delta BDF \\sim \\Delta BAC \\Rightarrow \\widehat{BDF} = \\widehat{BAC}$.\n` +
`Và từ $\\Delta CDE \\sim \\Delta CAB \\Rightarrow \\widehat{CDE} = \\widehat{CAB} = \\widehat{BAC}$. Do đó $\\widehat{BDF} = \\widehat{CDE}$.\n` +
`Vì $AD \\perp BC$ nên $\\widehat{ADE} = 90^\\circ - \\widehat{CDE}$ và $\\widehat{ADF} = 90^\\circ - \\widehat{BDF}$. Suy ra $\\widehat{ADE} = \\widehat{ADF}$, vậy $DH$ là phân giác $\\widehat{FDE}$.\n\n` +
`**c)** Ta cần chứng minh $J, F, D$ thẳng hàng.\n` +
`Vì $EI \\parallel BC$ và $AJ \\parallel BC$ (do $d \\parallel BC$), nên $EI \\parallel AJ$.\n` +
`Xét $\\Delta CAJ$ có $EI \\parallel AJ$, theo hệ quả định lý Thales: $\\frac{EI}{AJ} = \\frac{CE}{CA} \\Rightarrow AJ = EI \\cdot \\frac{CA}{CE}$.\n` +
`Mặt khác, trong $\\Delta ADC$ vuông tại $D$, $EI \\perp AD$ (do $EI \\parallel BC \\perp AD$) $\\Rightarrow \\Delta AIE \\sim \\Delta ADC$ (g-g).\n` +
`$\\Rightarrow \\frac{EI}{DC} = \\frac{AE}{AC} \\Rightarrow EI = DC \\cdot \\frac{AE}{AC}$.\n` +
`Thay $EI$ vào biểu thức của $AJ$, ta được: $AJ = \\left(DC \\cdot \\frac{AE}{AC}\\right) \\cdot \\frac{CA}{CE} = DC \\cdot \\frac{AE}{CE} \\Rightarrow \\frac{AJ}{DC} = \\frac{AE}{CE}$ (1).\n` +
`Xét $\\Delta ABC$ với các đường cao $AD, BE, CF$ đồng quy tại $H$, theo định lý Ceva ta có:\n` +
`$\\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1 \\Rightarrow \\frac{AF}{FB} \\cdot \\frac{BD}{DC} = \\frac{AE}{CE}$ (2).\n` +
`Từ (1) và (2) suy ra $\\frac{AJ}{DC} = \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\Rightarrow \\frac{AJ}{BD} = \\frac{AF}{FB}$.\n` +
`Xét $\\Delta BDF$ và $\\Delta AJF$ có $\\widehat{DBF} = \\widehat{JAF}$ (hai góc so le trong do $AJ \\parallel BC$) và $\\frac{FB}{FA} = \\frac{BD}{AJ}$.\n` +
`Suy ra $\\Delta BDF \\sim \\Delta AJF$ (c-g-c) $\\Rightarrow \\widehat{BFD} = \\widehat{AFJ}$.\n` +
`Mà $A, F, B$ thẳng hàng nên $J, F, D$ thẳng hàng (hai góc đối đỉnh). (đpcm).\n\n` +
`**B. BÀI 7 (ĐẠI SỐ)**\n` +
`**1)** Tại $x = \\frac{1}{2}$ (thỏa mãn ĐKXĐ), $Q = \\frac{4 \\cdot \\frac{1}{2}}{(\\frac{1}{2})^2 - 1} = \\frac{2}{\\frac{1}{4} - 1} = \\frac{2}{-\\frac{3}{4}} = -\\frac{8}{3}$.\n` +
`**2)** $P = \\frac{x + 1}{x - 1} + \\frac{x}{x + 1} - \\frac{x}{(x - 1)(x + 1)} = \\frac{(x + 1)^2 + x(x - 1) - x}{(x - 1)(x + 1)} = \\frac{x^2 + 2x + 1 + x^2 - 2x}{x^2 - 1} = \\frac{2x^2 + 1}{x^2 - 1}$.\n` +
`**3)** $A = P : Q = \\frac{2x^2 + 1}{x^2 - 1} : \\frac{4x}{x^2 - 1} = \\frac{2x^2 + 1}{4x}$.\n` +
`$A = \\frac{3}{4} \\Leftrightarrow \\frac{2x^2 + 1}{4x} = \\frac{3}{4} \\Leftrightarrow 2x^2 + 1 = 3x \\Leftrightarrow 2x^2 - 3x + 1 = 0 \\Leftrightarrow (x - 1)(2x - 1) = 0$.\n` +
`$\\Rightarrow x = 1$ (loại vì vi phạm ĐKXĐ) hoặc $x = \\frac{1}{2}$ (nhận). Vậy $x = \\frac{1}{2}$.`;

  const sol7 = `**a) Chứng minh $\\Delta ABC \\sim \\Delta HBA$ và $AB \\cdot AH = BH \\cdot AC$:**\n` +
`Xét $\\Delta ABC$ và $\\Delta HBA$ có:\n` +
`$\\widehat{BAC} = \\widehat{AHB} = 90^\\circ$\n` +
`Góc $\\widehat{B}$ chung\n` +
`$\\Rightarrow \\Delta ABC \\sim \\Delta HBA$ (g-g).\n` +
`Từ đồng dạng suy ra tỉ số: $\\frac{AB}{HB} = \\frac{AC}{HA} \\Rightarrow AB \\cdot AH = BH \\cdot AC$ (đpcm).\n\n` +
`**b) Tính AI, HI:**\n` +
`Áp dụng định lý Pytago trong $\\Delta ABH$ vuông tại $H$:\n` +
`$AH = \\sqrt{AB^2 - BH^2} = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ (cm).\n` +
`Vì $BI$ là tia phân giác của $\\widehat{ABH}$ trong $\\Delta ABH$, áp dụng tính chất đường phân giác:\n` +
`$\\frac{AI}{HI} = \\frac{AB}{BH} = \\frac{5}{3}$.\n` +
`Theo tính chất dãy tỉ số bằng nhau:\n` +
`$\\frac{AI}{5} = \\frac{HI}{3} = \\frac{AI + HI}{5 + 3} = \\frac{AH}{8} = \\frac{4}{8} = 0,5$.\n` +
`$\\Rightarrow AI = 5 \\cdot 0,5 = 2,5$ (cm).\n` +
`$\\Rightarrow HI = 3 \\cdot 0,5 = 1,5$ (cm).\n\n` +
`**c) Chứng minh IK // AC:**\n` +
`Trong $\\Delta AHC$, $AK$ là tia phân giác của $\\widehat{HAC}$ nên: $\\frac{HK}{KC} = \\frac{AH}{AC}$.\n` +
`Từ chứng minh câu a, $\\Delta ABC \\sim \\Delta HBA \\Rightarrow \\frac{AH}{AC} = \\frac{HB}{AB}$.\n` +
`Và từ tính chất phân giác $BI$ ở câu b, $\\frac{HB}{AB} = \\frac{HI}{IA}$.\n` +
`Bắc cầu, ta có: $\\frac{HK}{KC} = \\frac{HI}{IA}$.\n` +
`Theo định lý Thales đảo trong $\\Delta AHC$, ta suy ra $IK \\parallel AC$ (đpcm).\n\n` +
`**d) Chứng minh H, M, N thẳng hàng:**\n` +
`Trong $\\Delta AHC$, ta có $IK \\parallel AC$. Tứ giác $AIKC$ là hình thang với hai đáy là $IK$ và $AC$.\n` +
`Các đường thẳng chứa hai cạnh bên của hình thang là $AI$ (chính là $AH$) và $CK$ (chính là $BC$) cắt nhau tại $H$.\n` +
`Hai đường chéo của hình thang là $AK$ và $IC$ cắt nhau tại $M$.\n` +
`Theo Bổ đề hình thang: Đường thẳng đi qua giao điểm của hai cạnh bên ($H$) và giao điểm của hai đường chéo ($M$) sẽ đi qua trung điểm của hai đáy.\n` +
`Do đó tia $HM$ sẽ đi qua trung điểm của đáy $AC$.\n` +
`Mà $N$ là trung điểm của $AC$ nên tia $HM$ đi qua $N$.\n` +
`Vậy $H, M, N$ thẳng hàng (đpcm).`;

  const sol8 = `**a) Chứng minh tứ giác BHCD là hình bình hành:**\n` +
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

  const sol9 = `**1)** Rút gọn biểu thức:\n` +
`$(x + 3)^2 + (x - 3)^2 + 2(x^2 - 9)$\n` +
`$= (x + 3)^2 + 2(x + 3)(x - 3) + (x - 3)^2$\n` +
`Đây là cấu trúc của hằng đẳng thức bình phương của một tổng $a^2 + 2ab + b^2 = (a + b)^2$ với $a = (x + 3)$ và $b = (x - 3)$:\n` +
`$= [(x + 3) + (x - 3)]^2$\n` +
`$= (2x)^2 = 4x^2$.\n\n` +
`**2)** Rút gọn biểu thức:\n` +
`$(4x - 1)^3 - (4x - 3)(16x^2 + 3)$\n` +
`Khai triển hằng đẳng thức lập phương một hiệu:\n` +
`$(4x - 1)^3 = (4x)^3 - 3(4x)^2 \\cdot 1 + 3(4x) \\cdot 1^2 - 1^3 = 64x^3 - 48x^2 + 12x - 1$.\n` +
`Nhân đa thức:\n` +
`$(4x - 3)(16x^2 + 3) = 64x^3 + 12x - 48x^2 - 9 = 64x^3 - 48x^2 + 12x - 9$.\n` +
`Trừ hai vế:\n` +
`$= (64x^3 - 48x^2 + 12x - 1) - (64x^3 - 48x^2 + 12x - 9)$\n` +
`$= 64x^3 - 48x^2 + 12x - 1 - 64x^3 + 48x^2 - 12x + 9$\n` +
`$= -1 + 9 = 8$.`;

  const sol10 = `**a)** $4x^2y - 2xy^2$\n` +
`Đặt nhân tử chung là $2xy$:\n` +
`$= 2xy(2x - y)$.\n\n` +
`**b)** $x^2 - 2xy + y^2 - 9$\n` +
`Nhóm 3 hạng tử đầu tạo hằng đẳng thức:\n` +
`$= (x^2 - 2xy + y^2) - 9$\n` +
`$= (x - y)^2 - 3^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (x - y - 3)(x - y + 3)$.\n\n` +
`**c)** $(x + 2)(x^2 - 2x) - 3x - 6$\n` +
`Nhóm hai hạng tử cuối và đưa -3 ra ngoài:\n` +
`$= (x + 2)(x^2 - 2x) - 3(x + 2)$\n` +
`Đặt nhân tử chung $(x + 2)$:\n` +
`$= (x + 2)(x^2 - 2x - 3)$\n` +
`Phân tích tiếp tam thức bậc hai $x^2 - 2x - 3 = x^2 - 3x + x - 3 = x(x - 3) + (x - 3) = (x - 3)(x + 1)$.\n` +
`$= (x + 2)(x - 3)(x + 1)$.`;

  const updates = [
    { id: "b2523314-b91a-45be-9f18-86621aa02d8f", solution: sol6 },
    { id: "7368f073-9001-4091-ab54-d2a0dfc26afa", solution: sol7 },
    { id: "9b6d597d-0df6-45a7-9a51-f8e05f984373", solution: sol8 },
    { id: "6b83b620-df0b-41f1-b4e0-96ba93ee18c6", solution: sol9 },
    { id: "6d20af7b-764d-4b70-998f-c4333620bc39", solution: sol10 }
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

approveBatch2().catch(console.error).finally(() => process.exit(0));
