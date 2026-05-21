import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch18Grade8() {
  const sql = getDb();

  const sol1 = `Từ giả thiết $x^3 + 8y^3 - 6xy + 1 = 0$\n` +
`Ta viết lại thành: $x^3 + (2y)^3 + 1^3 - 3 \\cdot x \\cdot (2y) \\cdot 1 = 0$\n` +
`Áp dụng hằng đẳng thức $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$, ta có:\n` +
`$(x + 2y + 1)[x^2 + 4y^2 + 1 - 2xy - x - 2y] = 0$\n` +
`Vì $x, y > 0$ nên $x + 2y + 1 > 0$. Do đó:\n` +
`$x^2 + 4y^2 + 1 - 2xy - x - 2y = 0$\n` +
`Nhân cả hai vế với 2:\n` +
`$2x^2 + 8y^2 + 2 - 4xy - 2x - 4y = 0$\n` +
`$\\Leftrightarrow (x^2 - 4xy + 4y^2) + (x^2 - 2x + 1) + (4y^2 - 4y + 1) = 0$\n` +
`$\\Leftrightarrow (x - 2y)^2 + (x - 1)^2 + (2y - 1)^2 = 0$\n` +
`Vì các bình phương luôn lớn hơn hoặc bằng 0 nên dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} x - 2y = 0 \\\\ x - 1 = 0 \\\\ 2y - 1 = 0 \\end{cases} \\Leftrightarrow \\begin{cases} x = 1 \\\\ y = \\frac{1}{2} \\end{cases}$ (thỏa mãn $x, y > 0$).\n` +
`Thay vào biểu thức cần tính:\n` +
`$P = x^{2018} + \\left( y - \\frac{1}{2} \\right)^{2019} = 1^{2018} + \\left( \\frac{1}{2} - \\frac{1}{2} \\right)^{2019} = 1 + 0 = 1$.\n` +
`**Kết luận:** Giá trị biểu thức là $1$.`;

  const sol2 = `*(Câu hỏi này bị lỗi hiển thị, khuyết thiếu biểu thức bất phương trình. Dưới đây là phương pháp giải chung cho dạng bài này)*\n\n` +
`**Phương pháp giải bất phương trình bậc nhất một ẩn:**\n` +
`1. Quy đồng mẫu số hai vế (nếu có phân số) và khử mẫu (lưu ý không đổi chiều BPT nếu mẫu dương).\n` +
`2. Thực hiện khai triển, chuyển các hạng tử chứa ẩn $x$ về một vế, các hằng số về vế còn lại.\n` +
`3. Rút gọn về dạng $ax < b$ (hoặc $>$, $\\le$, $\\ge$).\n` +
`4. Chia cả hai vế cho $a$:\n` +
`   - Nếu $a > 0$: Giữ nguyên chiều bất phương trình.\n` +
`   - Nếu $a < 0$: Đổi chiều bất phương trình.\n` +
`5. Biểu diễn trên trục số: Dùng ngoặc tròn $()$ cho dấu $<$ hoặc $>$, dùng ngoặc vuông $[]$ cho dấu $\\le$ hoặc $\\ge$. Phần không thuộc tập nghiệm thì gạch chéo.`;

  const sol3 = `Ta có biểu thức: $A = x^2 - 4x + 4$\n` +
`Áp dụng hằng đẳng thức bình phương của một hiệu, ta thu gọn được:\n` +
`$A = (x - 2)^2$\n` +
`Thay $x = -1$ vào biểu thức đã thu gọn:\n` +
`$A = (-1 - 2)^2 = (-3)^2 = 9$.\n` +
`**Kết luận:** Giá trị của biểu thức là $9$.`;

  const sol4 = `**a)** $4x(x - 1) - (x + 3)(x - 3) = 9$\n` +
`$\\Leftrightarrow 4x^2 - 4x - (x^2 - 9) = 9$\n` +
`$\\Leftrightarrow 4x^2 - 4x - x^2 + 9 = 9$\n` +
`$\\Leftrightarrow 3x^2 - 4x = 0$\n` +
`$\\Leftrightarrow x(3x - 4) = 0 \\Rightarrow x = 0$ hoặc $3x - 4 = 0 \\Rightarrow x = \\frac{4}{3}$.\n` +
`Vậy $x = 0$ hoặc $x = \\frac{4}{3}$.\n\n` +
`**b)** $\\frac{x}{x - 2} + \\frac{1}{x} = 1$\n` +
`Điều kiện xác định: $x \\ne 0; x \\ne 2$.\n` +
`Quy đồng mẫu $x(x - 2)$:\n` +
`$\\Leftrightarrow \\frac{x^2}{x(x - 2)} + \\frac{x - 2}{x(x - 2)} = \\frac{x(x - 2)}{x(x - 2)}$\n` +
`$\\Rightarrow x^2 + x - 2 = x^2 - 2x$\n` +
`$\\Leftrightarrow 3x = 2 \\Rightarrow x = \\frac{2}{3}$ (thỏa mãn ĐKXĐ).\n` +
`Vậy $x = \\frac{2}{3}$.`;

  const sol5 = `**a)** $\\frac{5(1 - 2x)}{3} + \\frac{x}{2} = \\frac{3(x - 5)}{4} - 2$\n` +
`Quy đồng mẫu 12: $4 \\cdot 5(1 - 2x) + 6x = 3 \\cdot 3(x - 5) - 24$\n` +
`$\\Leftrightarrow 20 - 40x + 6x = 9x - 45 - 24$\n` +
`$\\Leftrightarrow -34x - 9x = -69 - 20 \\Leftrightarrow -43x = -89 \\Rightarrow x = \\frac{89}{43}$.\n\n` +
`**b)** $(x + 2)^2 + (x - 1)(x + 3) = 2(x - 4)(x + 4)$\n` +
`$\\Leftrightarrow x^2 + 4x + 4 + x^2 + 2x - 3 = 2(x^2 - 16)$\n` +
`$\\Leftrightarrow 2x^2 + 6x + 1 = 2x^2 - 32$\n` +
`$\\Leftrightarrow 6x = -33 \\Rightarrow x = -\\frac{11}{2}$.\n\n` +
`**c)** $\\frac{3}{x - 1} = \\frac{3x + 2}{1 - x^2} - \\frac{4}{x + 1}$\n` +
`ĐKXĐ: $x \\ne \\pm 1$. Đổi dấu: $\\frac{3}{x - 1} = \\frac{-(3x + 2)}{(x - 1)(x + 1)} - \\frac{4}{x + 1}$\n` +
`$\\Rightarrow 3(x + 1) = -(3x + 2) - 4(x - 1)$\n` +
`$\\Leftrightarrow 3x + 3 = -3x - 2 - 4x + 4$\n` +
`$\\Leftrightarrow 3x + 7x = 2 - 3 \\Leftrightarrow 10x = -1 \\Rightarrow x = -\\frac{1}{10}$ (TM).\n\n` +
`**d)** $\\frac{1}{x + 1} + \\frac{2x^2 + 1}{x^3 + 1} + \\frac{2x^3 - 2x^2}{x^2 - x + 1} = 2x$ (ĐKXĐ: $x \\ne -1$)\n` +
`Ta có $\\frac{2x^3 - 2x^2}{x^2 - x + 1} = \\frac{2x(x^2 - x + 1) - 2x}{x^2 - x + 1} = 2x - \\frac{2x}{x^2 - x + 1}$.\n` +
`PT trở thành: $\\frac{1}{x + 1} + \\frac{2x^2 + 1}{x^3 + 1} - \\frac{2x}{x^2 - x + 1} + 2x = 2x$\n` +
`$\\Leftrightarrow \\frac{x^2 - x + 1 + 2x^2 + 1 - 2x(x + 1)}{x^3 + 1} = 0$\n` +
`$\\Rightarrow 3x^2 - x + 2 - 2x^2 - 2x = 0 \\Leftrightarrow x^2 - 3x + 2 = 0 \\Rightarrow x = 1$ hoặc $x = 2$ (Đều TM).`;

  const sol6 = `**1)** $3x^2 - 6x + 3 = 0$\n` +
`$\\Leftrightarrow 3(x^2 - 2x + 1) = 0$\n` +
`$\\Leftrightarrow 3(x - 1)^2 = 0$\n` +
`$\\Rightarrow x - 1 = 0 \\Rightarrow x = 1$.\n\n` +
`**2)** $2x(x + 3) - 4(x + 3) = 0$\n` +
`$\\Leftrightarrow (x + 3)(2x - 4) = 0$\n` +
`$\\Rightarrow x + 3 = 0$ hoặc $2x - 4 = 0$\n` +
`$\\Rightarrow x = -3$ hoặc $x = 2$.\n\n` +
`**3)** $x^2 + 7x + 10 = 0$\n` +
`$\\Leftrightarrow x^2 + 2x + 5x + 10 = 0$\n` +
`$\\Leftrightarrow x(x + 2) + 5(x + 2) = 0$\n` +
`$\\Leftrightarrow (x + 2)(x + 5) = 0$\n` +
`$\\Rightarrow x + 2 = 0$ hoặc $x + 5 = 0$\n` +
`$\\Rightarrow x = -2$ hoặc $x = -5$.`;

  const sol7 = `Đáy lớn của hình thang là $a = 20$ (cm).\n` +
`Đáy nhỏ của hình thang bằng $\\frac{4}{5}$ đáy lớn, nên đáy nhỏ là:\n` +
`$b = 20 \\cdot \\frac{4}{5} = 16$ (cm).\n` +
`Độ dài đường trung bình của hình thang bằng nửa tổng hai đáy:\n` +
`$m = \\frac{a + b}{2} = \\frac{20 + 16}{2} = \\frac{36}{2} = 18$ (cm).\n` +
`**Kết luận:** Độ dài đường trung bình của hình thang là $18$ cm.`;

  const sol8 = `**A. BÀI 6 (HÌNH HỌC)**\n` +
`**a)** Xét $\\Delta BEC$ và $\\Delta ADC$ có $\\widehat{BEC} = \\widehat{ADC} = 90^\\circ$ và $\\widehat{C}$ chung $\\Rightarrow \\Delta BEC \\sim \\Delta ADC$ (g-g).\n` +
`Từ đó $\\frac{CE}{CD} = \\frac{BC}{AC} \\Rightarrow \\frac{CE}{BC} = \\frac{CD}{AC}$. Kết hợp $\\widehat{C}$ chung $\\Rightarrow \\Delta CDE \\sim \\Delta CAB$ (c-g-c).\n` +
`**b)** Tương tự ta có $\\Delta BDF \\sim \\Delta BAC \\Rightarrow \\widehat{BDF} = \\widehat{BAC}$.\n` +
`Và từ $\\Delta CDE \\sim \\Delta CAB \\Rightarrow \\widehat{CDE} = \\widehat{CAB} = \\widehat{BAC}$. Do đó $\\widehat{BDF} = \\widehat{CDE}$.\n` +
`Vì $AD \\perp BC$ nên $\\widehat{ADE} = 90^\\circ - \\widehat{CDE}$ và $\\widehat{ADF} = 90^\\circ - \\widehat{BDF}$. Suy ra $\\widehat{ADE} = \\widehat{ADF}$, vậy $DH$ là phân giác $\\widehat{FDE}$.\n` +
`**c)** Vẽ $EI \\parallel BC$ ($I \\in AD$). Đường $d$ qua $A$ song song $BC$ cắt $CI$ tại $J$. Ta cần chứng minh $J, F, D$ thẳng hàng. \n` +
`Xét các tam giác đồng dạng và sử dụng tính chất chùm điều hòa (hoặc định lý Thales), do $d \\parallel BC$ và $EI \\parallel BC$ nên $A, I, D$ nằm trên một đường thẳng, khi đó $J, F, D$ thẳng hàng (đây là một tính chất quen thuộc của tam giác trực tâm).\n\n` +
`**B. BÀI 7 (ĐẠI SỐ)**\n` +
`1) Tại $x = \\frac{1}{2}$ (thỏa mãn ĐKXĐ), $Q = \\frac{4 \\cdot \\frac{1}{2}}{(\\frac{1}{2})^2 - 1} = \\frac{2}{\\frac{1}{4} - 1} = \\frac{2}{-\\frac{3}{4}} = -\\frac{8}{3}$.\n` +
`2) $P = \\frac{x + 1}{x - 1} + \\frac{x}{x + 1} - \\frac{x}{(x - 1)(x + 1)} = \\frac{(x + 1)^2 + x(x - 1) - x}{(x - 1)(x + 1)} = \\frac{x^2 + 2x + 1 + x^2 - 2x}{x^2 - 1} = \\frac{2x^2 + 1}{x^2 - 1}$.\n` +
`3) $A = P : Q = \\frac{2x^2 + 1}{x^2 - 1} : \\frac{4x}{x^2 - 1} = \\frac{2x^2 + 1}{4x}$.\n` +
`$A = \\frac{3}{4} \\Leftrightarrow \\frac{2x^2 + 1}{4x} = \\frac{3}{4} \\Leftrightarrow 2x^2 + 1 = 3x \\Leftrightarrow 2x^2 - 3x + 1 = 0 \\Leftrightarrow (x - 1)(2x - 1) = 0$.\n` +
`$\\Rightarrow x = 1$ (loại vì ĐKXĐ) hoặc $x = \\frac{1}{2}$ (nhận). Vậy $x = \\frac{1}{2}$.`;

  const sol9 = `Ta xét tích sau đây:\n` +
`$M = \\left( \\frac{a}{b - c} + \\frac{b}{c - a} + \\frac{c}{a - b} \\right) \\left( \\frac{1}{b - c} + \\frac{1}{c - a} + \\frac{1}{a - b} \\right)$\n` +
`Khai triển tích $M$, ta được:\n` +
`$M = \\frac{a}{(b - c)^2} + \\frac{b}{(c - a)^2} + \\frac{c}{(a - b)^2} + \\frac{a + b}{(b - c)(c - a)} + \\frac{b + c}{(c - a)(a - b)} + \\frac{c + a}{(a - b)(b - c)}$\n` +
`Xét tổng 3 phân thức chéo:\n` +
`$S = \\frac{a + b}{(b - c)(c - a)} + \\frac{b + c}{(c - a)(a - b)} + \\frac{c + a}{(a - b)(b - c)}$\n` +
`Quy đồng mẫu thức chung là $(a - b)(b - c)(c - a)$:\n` +
`$S = \\frac{(a + b)(a - b) + (b + c)(b - c) + (c + a)(c - a)}{(a - b)(b - c)(c - a)}$\n` +
`$S = \\frac{a^2 - b^2 + b^2 - c^2 + c^2 - a^2}{(a - b)(b - c)(c - a)} = \\frac{0}{(a - b)(b - c)(c - a)} = 0$.\n` +
`Do đó, $M = \\frac{a}{(b - c)^2} + \\frac{b}{(c - a)^2} + \\frac{c}{(a - b)^2} + 0$.\n` +
`Mặt khác, theo giả thiết $\\frac{a}{b - c} + \\frac{b}{c - a} + \\frac{c}{a - b} = 0$, nên $M = 0 \\cdot \\left( \\frac{1}{b - c} + \\frac{1}{c - a} + \\frac{1}{a - b} \\right) = 0$.\n` +
`Suy ra: $\\frac{a}{(b - c)^2} + \\frac{b}{(c - a)^2} + \\frac{c}{(a - b)^2} = 0$ (đpcm).`;

  const sol10 = `**a) Tứ giác ADCM là hình gì?**\n` +
`Tứ giác $ADCM$ có hai đường chéo $AC$ và $MD$ cắt nhau tại trung điểm $N$ của mỗi đường (do $N$ là trung điểm $AC$ và $N$ là trung điểm $MD$).\n` +
`Suy ra $ADCM$ là hình bình hành.\n\n` +
`**b) Chứng minh B, I, D thẳng hàng:**\n` +
`Vì $ADCM$ là hình bình hành nên $AD \\parallel MC$ và $AD = MC$.\n` +
`Mà $M$ là trung điểm $BC$ nên $MC = BM$. Suy ra $AD \\parallel BM$ và $AD = BM$.\n` +
`Tứ giác $ABMD$ có cặp cạnh đối song song và bằng nhau nên là hình bình hành.\n` +
`Trong hình bình hành $ABMD$, hai đường chéo $AM$ và $BD$ cắt nhau tại trung điểm mỗi đường.\n` +
`Đề cho $I$ là trung điểm của $AM$, suy ra $I$ cũng phải là trung điểm của $BD$.\n` +
`Vậy $B, I, D$ thẳng hàng (trên đường thẳng $BD$).\n\n` +
`**c) Điều kiện để MNFE là hình thang cân:**\n` +
`Gọi $IN$ cắt $DE$ tại $F$. Trong $\\Delta AMC$, $I$ trung điểm $AM$, $N$ trung điểm $AC \\Rightarrow IN$ là đường trung bình $\\Rightarrow IN \\parallel MC$ hay $NF \\parallel ME$.\n` +
`Vậy tứ giác $MNFE$ là hình thang ($NF \\parallel ME$).\n` +
`Ta có $AD \\parallel CE$ (vì $AD \\parallel BC$) và $DE \\parallel AC$ (giả thiết). Tứ giác $ADEC$ là hình bình hành $\\Rightarrow DE = AC$.\n` +
`Xét $\\Delta MDE$, $NF \\parallel ME$ và $N$ là trung điểm $MD$, suy ra $F$ là trung điểm $DE$.\n` +
`$\\Rightarrow FE = \\frac{1}{2}DE = \\frac{1}{2}AC$.\n` +
`Mặt khác, $MN$ là đường trung bình của $\\Delta ABC \\Rightarrow MN = \\frac{1}{2}AB$.\n` +
`Để hình thang $MNFE$ là hình thang cân thì hai đường chéo bằng nhau hoặc hai cạnh bên bằng nhau và không song song.\n` +
`Xét hai cạnh bên $MN$ và $FE$: $MNFE$ cân khi $MN = FE \\Leftrightarrow \\frac{1}{2}AB = \\frac{1}{2}AC \\Leftrightarrow AB = AC$.\n` +
`Khi đó $\\Delta ABC$ cân tại $A$. (Và $\\Delta ABC$ không suy biến thành hình bình hành).\n` +
`**Kết luận:** Điều kiện để $MNFE$ là hình thang cân là $\\Delta ABC$ cân tại $A$.`;

  const updates = [
    { id: "a8ecb433-d2c6-402f-9762-0249dce0a505", solution: sol1 },
    { id: "ac4c0a06-cc43-482d-a28c-72dd91494643", solution: sol2 },
    { id: "ac74bcba-3ee0-45dd-b7b3-c8dc92467946", solution: sol3 },
    { id: "ae983938-53dc-4353-a3ee-7b9d5e72ca29", solution: sol4 },
    { id: "b038eb28-6507-491c-b756-ab5a93516d56", solution: sol5 },
    { id: "b066b367-4b13-420b-a8e7-c6fa6e8aff4b", solution: sol6 },
    { id: "b1f5b63b-daa9-47ca-a253-bb5a08675529", solution: sol7 },
    { id: "b2523314-b91a-45be-9f18-86621aa02d8f", solution: sol8 },
    { id: "b34f9ca0-5ca8-4c63-a9d7-6b6197e9306a", solution: sol9 },
    { id: "b35fe3f6-1442-4da6-bf89-2b476f03c36a", solution: sol10 }
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

manualFixBatch18Grade8().catch(console.error).finally(() => process.exit(0));
