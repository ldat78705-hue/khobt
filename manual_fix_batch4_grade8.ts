import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch4Grade8() {
  const sql = getDb();

  const sol1 = `Giải phương trình:\n` +
`$2x^2 - 2x = 0$\n` +
`$\\Leftrightarrow 2x(x - 1) = 0$\n` +
`$\\Leftrightarrow x = 0$ hoặc $x - 1 = 0$\n` +
`$\\Leftrightarrow x = 0$ hoặc $x = 1$.\n` +
`**Kết luận:** Tập nghiệm của phương trình là $S = \\{0; 1\\}$.`;

  const sol2 = `**a) Chứng minh tứ giác ABCE là hình bình hành:**\n` +
`Tứ giác $ABCE$ có hai đường chéo $AC$ và $BE$ cắt nhau tại trung điểm $D$ (do $D$ là trung điểm $AC$ và $E$ đối xứng $B$ qua $D$ nên $D$ là trung điểm $BE$).\n` +
`Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường là hình bình hành.\n` +
`Vậy $ABCE$ là hình bình hành (đpcm).\n\n` +
`**b) Tứ giác AMEC là hình gì? Vì sao?**\n` +
`Do $M$ đối xứng với $B$ qua $A$ nên $A$ là trung điểm của $BM \\Rightarrow AM = AB$ và $M, A, B$ thẳng hàng.\n` +
`Vì $ABCE$ là hình bình hành $\\Rightarrow CE \\parallel AB$ và $CE = AB$.\n` +
`Suy ra $CE \\parallel AM$ và $CE = AM$. \n` +
`Tứ giác $AMEC$ có hai cạnh đối song song và bằng nhau nên là hình bình hành.\n` +
`Mặt khác, $\\Delta ABC$ vuông tại $A \\Rightarrow AC \\perp AB \\Rightarrow AC \\perp AM$.\n` +
`Hình bình hành $AMEC$ có một góc vuông $\\widehat{MAC} = 90^\\circ$ nên là hình chữ nhật.\n\n` +
`**c) Chứng minh KC = 2BK:**\n` +
`Trong $\\Delta BDM$, $A$ là trung điểm $BM$ và $AK \\parallel MD$ (do $AK \\parallel DI$).\n` +
`Suy ra $AK$ là đường trung bình của $\\Delta BDM \\Rightarrow K$ là trung điểm $BI \\Rightarrow BK = KI$ (1).\n` +
`Trong $\\Delta AKC$, $D$ là trung điểm $AC$ và $DI \\parallel AK$.\n` +
`Suy ra $DI$ là đường trung bình của $\\Delta AKC \\Rightarrow I$ là trung điểm $KC \\Rightarrow KI = IC$ (2).\n` +
`Từ (1) và (2) suy ra $BK = KI = IC$.\n` +
`Do đó $KC = KI + IC = 2BK$ (đpcm).\n\n` +
`**d) Tính diện tích của tứ giác MECB:**\n` +
`Áp dụng định lý Pytago cho $\\Delta ABC$ vuông tại $A$:\n` +
`$AB = \\sqrt{BC^2 - AC^2} = \\sqrt{10^2 - 8^2} = 6$ cm.\n` +
`Tứ giác $MECB$ có $CE \\parallel MB$ (vì $CE \\parallel AB$) nên là hình thang.\n` +
`Hơn nữa, $AC \\perp MB$ tại $A$ nên $AC$ chính là chiều cao của hình thang $MECB$.\n` +
`Đáy bé $CE = AB = 6$ cm. Đáy lớn $MB = 2AB = 12$ cm.\n` +
`Diện tích hình thang $MECB$ là:\n` +
`$S = \\frac{(CE + MB) \\cdot AC}{2} = \\frac{(6 + 12) \\cdot 8}{2} = 72$ (cm$^2$).`;

  const sol3 = `**a)** $x^2 + 4x = 0$\n` +
`$\\Leftrightarrow x(x + 4) = 0 \\Rightarrow x = 0$ hoặc $x = -4$.\n\n` +
`**b)** $5x(3x - 2) = 4 - 9x^2$\n` +
`$\\Leftrightarrow 15x^2 - 10x = 4 - 9x^2$\n` +
`$\\Leftrightarrow 24x^2 - 10x - 4 = 0 \\Leftrightarrow 12x^2 - 5x - 2 = 0$\n` +
`$\\Leftrightarrow 12x^2 - 8x + 3x - 2 = 0 \\Leftrightarrow 4x(3x - 2) + (3x - 2) = 0$\n` +
`$\\Leftrightarrow (3x - 2)(4x + 1) = 0 \\Rightarrow x = \\frac{2}{3}$ hoặc $x = -\\frac{1}{4}$.\n\n` +
`**c)** $x^2 + 7x = 8$\n` +
`$\\Leftrightarrow x^2 + 7x - 8 = 0 \\Leftrightarrow x^2 - x + 8x - 8 = 0$\n` +
`$\\Leftrightarrow x(x - 1) + 8(x - 1) = 0 \\Leftrightarrow (x - 1)(x + 8) = 0$\n` +
`$\\Rightarrow x = 1$ hoặc $x = -8$.\n\n` +
`**d)** $2x^2 + 4y^2 + 10x + 4xy = -25$\n` +
`$\\Leftrightarrow (x^2 + 4xy + 4y^2) + (x^2 + 10x + 25) = 0$\n` +
`$\\Leftrightarrow (x + 2y)^2 + (x + 5)^2 = 0$\n` +
`Vì $(x + 2y)^2 \\ge 0$ và $(x + 5)^2 \\ge 0$, nên dấu \"=\" xảy ra khi:\n` +
`$\\begin{cases} x + 5 = 0 \\\\ x + 2y = 0 \\end{cases} \\Rightarrow \\begin{cases} x = -5 \\\\ -5 + 2y = 0 \\end{cases} \\Rightarrow x = -5; y = 2,5$.`;

  const sol4 = `**a)** $\\frac{x - 5}{4} - 2x + 1 = \\frac{x}{3} - \\frac{2 - x}{6}$\n` +
`Quy đồng mẫu chung là 12:\n` +
`$\\Leftrightarrow 3(x - 5) - 24x + 12 = 4x - 2(2 - x)$\n` +
`$\\Leftrightarrow 3x - 15 - 24x + 12 = 4x - 4 + 2x$\n` +
`$\\Leftrightarrow -21x - 3 = 6x - 4 \\Leftrightarrow 27x = 1 \\Rightarrow x = \\frac{1}{27}$.\n\n` +
`**b)** $(2x - 1)^2 = (x - 2)(2x - 1)$\n` +
`$\\Leftrightarrow (2x - 1)^2 - (x - 2)(2x - 1) = 0$\n` +
`$\\Leftrightarrow (2x - 1)[(2x - 1) - (x - 2)] = 0$\n` +
`$\\Leftrightarrow (2x - 1)(x + 1) = 0 \\Rightarrow x = \\frac{1}{2}$ hoặc $x = -1$.\n\n` +
`**c)** $\\frac{x + 5}{x - 5} - \\frac{x - 5}{x + 5} = \\frac{-3}{25 - x^2}$ (ĐKXĐ: $x \\ne \\pm 5$)\n` +
`$\\Leftrightarrow \\frac{(x + 5)^2 - (x - 5)^2}{x^2 - 25} = \\frac{3}{x^2 - 25}$\n` +
`$\\Rightarrow (x^2 + 10x + 25) - (x^2 - 10x + 25) = 3$\n` +
`$\\Leftrightarrow 20x = 3 \\Rightarrow x = \\frac{3}{20}$ (thỏa mãn ĐKXĐ).\n\n` +
`**d)** $x^2 - x - 12 = 0$\n` +
`$\\Leftrightarrow x^2 - 4x + 3x - 12 = 0 \\Leftrightarrow x(x - 4) + 3(x - 4) = 0$\n` +
`$\\Leftrightarrow (x - 4)(x + 3) = 0 \\Rightarrow x = 4$ hoặc $x = -3$.`;

  const sol5 = `Ta khai triển và rút gọn hai vế của phương trình:\n` +
`**Vế trái (VT):**\n` +
`VT $= (x + 5)(4 - 3x) - (3x + 2)^2 + (2x + 1)^3$\n` +
`$= (4x - 3x^2 + 20 - 15x) - (9x^2 + 12x + 4) + (8x^3 + 12x^2 + 6x + 1)$\n` +
`$= -3x^2 - 11x + 20 - 9x^2 - 12x - 4 + 8x^3 + 12x^2 + 6x + 1$\n` +
`$= 8x^3 + (-3 - 9 + 12)x^2 + (-11 - 12 + 6)x + (20 - 4 + 1)$\n` +
`$= 8x^3 - 17x + 17$.\n\n` +
`**Vế phải (VP):**\n` +
`Áp dụng hằng đẳng thức hiệu hai lập phương:\n` +
`VP $= (2x - 1)(4x^2 + 2x + 1) = (2x)^3 - 1^3 = 8x^3 - 1$.\n\n` +
`**Giải phương trình VT = VP:**\n` +
`$8x^3 - 17x + 17 = 8x^3 - 1$\n` +
`$\\Leftrightarrow -17x = -1 - 17$\n` +
`$\\Leftrightarrow -17x = -18 \\Rightarrow x = \\frac{18}{17}$.\n` +
`**Kết luận:** $x = \\frac{18}{17}$.`;

  const sol6 = `Để phương trình $\\frac{x - 2}{x} + \\frac{3}{2x - 1} = 0$ xác định, các mẫu thức phải khác $0$.\n` +
`Ta có hệ điều kiện:\n` +
`$\\begin{cases} x \\ne 0 \\\\ 2x - 1 \\ne 0 \\end{cases} \\Leftrightarrow \\begin{cases} x \\ne 0 \\\\ x \\ne \\frac{1}{2} \\end{cases}$\n` +
`**Kết luận:** Điều kiện xác định là $x \\ne 0$ và $x \\ne \\frac{1}{2}$.`;

  const sol7 = `Ta giải phương trình đã cho:\n` +
`$7x + 1 = 2x \\Leftrightarrow 7x - 2x = -1 \\Leftrightarrow 5x = -1 \\Leftrightarrow x = -\\frac{1}{5}$.\n` +
`Phương trình tương đương là phương trình có cùng tập nghiệm $S = \\left\\{ -\\frac{1}{5} \\right\\}$.\n` +
`*(Học sinh giải các phương án trắc nghiệm được cho để tìm ra phương trình có nghiệm duy nhất $x = -\\frac{1}{5}$)*.`;

  const sol8 = `Theo tính chất đường phân giác trong tam giác, do $AD$ là phân giác góc $A$ của $\\Delta ABC$, ta có:\n` +
`$\\frac{DB}{DC} = \\frac{AB}{AC}$\n` +
`Thay các số liệu $AB = 5$ cm, $AC = 10$ cm, $DC = 2$ cm vào tỉ lệ thức:\n` +
`$\\frac{DB}{2} = \\frac{5}{10} \\Rightarrow \\frac{DB}{2} = \\frac{1}{2}$\n` +
`$\\Rightarrow DB = \\frac{2 \\cdot 1}{2} = 1$ (cm).\n` +
`**Kết luận:** Độ dài $DB = 1$ cm.`;

  const sol9 = `**a) Chứng minh $\\Delta ADH \\sim \\Delta BDA$:**\n` +
`Xét $\\Delta ADH$ và $\\Delta BDA$ có:\n` +
`$\\widehat{AHD} = \\widehat{DAB} = 90^\\circ$ (vì $AH \\perp BD$ và $ABCD$ là hình chữ nhật).\n` +
`Góc $\\widehat{ADH}$ chung.\n` +
`$\\Rightarrow \\Delta ADH \\sim \\Delta BDA$ (g-g).\n\n` +
`**b) Chứng minh $\\Delta ADH \\sim \\Delta BAH$ và $A{{H}^2}=DH \\cdot BH$:**\n` +
`Xét $\\Delta ADH$ và $\\Delta BAH$ có:\n` +
`$\\widehat{AHD} = \\widehat{BHA} = 90^\\circ$.\n` +
`$\\widehat{DAH} = \\widehat{ABH}$ (cùng phụ với góc $\\widehat{BAH}$).\n` +
`$\\Rightarrow \\Delta ADH \\sim \\Delta BAH$ (g-g).\n` +
`Từ đó suy ra tỉ số đồng dạng: $\\frac{AH}{BH} = \\frac{DH}{AH} \\Rightarrow AH^2 = DH \\cdot BH$ (đpcm).\n\n` +
`**c) Tính AD, AB:**\n` +
`Theo câu b: $AH^2 = 9 \\cdot 16 = 144 \\Rightarrow AH = 12$ cm.\n` +
`Áp dụng định lý Pytago trong $\\Delta ADH$ vuông tại $H$:\n` +
`$AD = \\sqrt{AH^2 + DH^2} = \\sqrt{12^2 + 9^2} = \\sqrt{144 + 81} = \\sqrt{225} = 15$ cm.\n` +
`Áp dụng định lý Pytago trong $\\Delta ABH$ vuông tại $H$:\n` +
`$AB = \\sqrt{AH^2 + BH^2} = \\sqrt{12^2 + 16^2} = \\sqrt{144 + 256} = \\sqrt{400} = 20$ cm.\n\n` +
`**d) Chứng minh tứ giác MNDK là hình bình hành và $\\widehat{AMN}=90^\\circ$:**\n` +
`Trong $\\Delta ABH$, $K$ là trung điểm $AH$, $M$ là trung điểm $BH \\Rightarrow KM$ là đường trung bình $\\Rightarrow KM \\parallel AB$ và $KM = \\frac{1}{2}AB$.\n` +
`Trong hình chữ nhật $ABCD$, $N$ là trung điểm $CD \\Rightarrow DN \\parallel AB$ và $DN = \\frac{1}{2}CD = \\frac{1}{2}AB$.\n` +
`Suy ra $KM \\parallel DN$ và $KM = DN \\Rightarrow MNDK$ là hình bình hành.\n` +
`Ta chứng minh $DK \\perp AM$:\n` +
`Xét $\\Delta ADM$ có $AH \\perp DM$ (do $AH \\perp BD$).\n` +
`Mặt khác, $KM \\parallel AB$, mà $AD \\perp AB \\Rightarrow KM \\perp AD$.\n` +
`$\\Delta ADM$ có hai đường cao $AH$ và $MK$ cắt nhau tại $K$, nên $K$ là trực tâm $\\Delta ADM \\Rightarrow DK \\perp AM$.\n` +
`Vì $MNDK$ là hình bình hành nên $MN \\parallel DK$. \n` +
`Do $DK \\perp AM$ suy ra $MN \\perp AM \\Rightarrow \\widehat{AMN} = 90^\\circ$ (đpcm).`;

  const sol10 = `**a)** $\\frac{2x - 3}{4} + 2 = \\frac{1 - x}{6}$\n` +
`Quy đồng mẫu chung $12$:\n` +
`$\\Leftrightarrow 3(2x - 3) + 24 = 2(1 - x) \\Leftrightarrow 6x - 9 + 24 = 2 - 2x$\n` +
`$\\Leftrightarrow 8x = -13 \\Rightarrow x = -\\frac{13}{8}$.\n\n` +
`**b)** $x^2 - 11x + 18 = 0$\n` +
`$\\Leftrightarrow x^2 - 2x - 9x + 18 = 0 \\Leftrightarrow x(x - 2) - 9(x - 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)(x - 9) = 0 \\Rightarrow x = 2$ hoặc $x = 9$.\n\n` +
`**c)** $x^3 + 2x^2 + x + 2 = 0$\n` +
`$\\Leftrightarrow x^2(x + 2) + (x + 2) = 0 \\Leftrightarrow (x + 2)(x^2 + 1) = 0$\n` +
`Vì $x^2 + 1 > 0 \\Rightarrow x + 2 = 0 \\Rightarrow x = -2$.\n\n` +
`**d)** $\\frac{x + 2}{x - 2} - \\frac{x - 2}{x + 2} = \\frac{-4}{4 - x^2}$ (ĐKXĐ: $x \\ne \\pm 2$)\n` +
`$\\Leftrightarrow \\frac{(x + 2)^2 - (x - 2)^2}{x^2 - 4} = \\frac{4}{x^2 - 4}$\n` +
`$\\Rightarrow (x^2 + 4x + 4) - (x^2 - 4x + 4) = 4$\n` +
`$\\Leftrightarrow 8x = 4 \\Rightarrow x = \\frac{1}{2}$ (thỏa mãn ĐKXĐ).`;

  const updates = [
    { id: "1e207123-43ef-481e-9a37-40cbc5d79cdf", solution: sol1 },
    { id: "1e491329-45cb-4d30-9f51-32672e8387d4", solution: sol2 },
    { id: "1e9d22dc-e2a7-449d-9cb0-d5c0786c94be", solution: sol3 },
    { id: "2096d8a9-dcc0-457e-80d8-a0f138198b98", solution: sol4 },
    { id: "22d4e22f-6bbf-4703-80c1-29e675ba9361", solution: sol5 },
    { id: "23527ba5-d4b9-4a53-9e15-554c8cffbda8", solution: sol6 },
    { id: "23a5ab7d-f79a-4e13-bf68-b049ed23cf63", solution: sol7 },
    { id: "250f9d9f-fc6a-446b-a6c1-35753141d8df", solution: sol8 },
    { id: "261972fc-9bc9-4b99-9f54-3de9d188d61b", solution: sol9 },
    { id: "27787d8f-bf53-402a-94f9-6e9f05167196", solution: sol10 }
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

manualFixBatch4Grade8().catch(console.error).finally(() => process.exit(0));
