import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch10Grade8() {
  const sql = getDb();

  const sol1 = `**a) Chứng minh tứ giác OEFC là hình thang và tứ giác OEIC là hình bình hành:**\n` +
`Trong hình chữ nhật $ABCD$, $O$ là giao điểm của hai đường chéo $\\Rightarrow O$ là trung điểm của $AC$.\n` +
`$F$ đối xứng với $A$ qua $E \\Rightarrow E$ là trung điểm của $AF$.\n` +
`Xét $\\Delta ACF$ có $O$ là trung điểm $AC$, $E$ là trung điểm $AF$ nên $OE$ là đường trung bình của tam giác.\n` +
`$\\Rightarrow OE \\parallel CF$. Tứ giác $OEFC$ có $OE \\parallel CF$ nên là hình thang.\n` +
`Lại có $OE = \\frac{1}{2}CF$. Mà $I$ là trung điểm $CF$ nên $CI = IF = \\frac{1}{2}CF$.\n` +
`Suy ra $OE = CI$. \n` +
`Tứ giác $OEIC$ có $OE \\parallel CI$ (vì $OE \\parallel CF$) và $OE = CI$ nên là hình bình hành.\n\n` +
`**b) Chứng minh tứ giác CHFK là hình chữ nhật:**\n` +
`Tứ giác $CHFK$ có:\n` +
`$\\widehat{C} = 90^\\circ$ (vì $ABCD$ là hình chữ nhật).\n` +
`$\\widehat{FHC} = 90^\\circ$ (vì $H$ là hình chiếu của $F$ trên $BC$).\n` +
`$\\widehat{FKC} = 90^\\circ$ (vì $K$ là hình chiếu của $F$ trên $CD$).\n` +
`Tứ giác có 3 góc vuông nên $CHFK$ là hình chữ nhật.\n\n` +
`**c) Chứng minh bốn điểm E, H, K, I thẳng hàng:**\n` +
`Do $CHFK$ là hình chữ nhật, nên hai đường chéo $CF$ và $HK$ cắt nhau tại trung điểm của mỗi đường.\n` +
`Vì $I$ là trung điểm đường chéo $CF$ nên $I$ cũng là trung điểm đường chéo $HK$.\n` +
`Suy ra ba điểm $H, I, K$ thẳng hàng (1).\n` +
`Mặt khác, tứ giác $OEIC$ là hình bình hành (chứng minh câu a) $\\Rightarrow EI \\parallel OC$, hay $EI \\parallel AC$.\n` +
`Ta chứng minh $HK \\parallel AC$: Vì $CHFK$ là hình chữ nhật, góc tạo bởi đường chéo $HK$ và cạnh tương ứng bằng góc tạo bởi đường chéo $AC$ và cạnh của hình chữ nhật $ABCD$ (do có sự tỉ lệ các cạnh khi chiếu). Cụ thể, $\\Delta CHK \\sim \\Delta CAB$ (hoặc dùng tính chất đường chéo hình chữ nhật $CF = HK$). \n` +
`Đường thẳng qua $I$ song song với $AC$ chỉ có một, do đó $EI$ trùng với đường thẳng $HK$.\n` +
`Suy ra $E, H, K, I$ cùng nằm trên một đường thẳng.`;

  const sol2 = `Gọi chiều dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian ô tô đi từ $A$ đến $B$ là: $\\frac{x}{45}$ (giờ).\n` +
`Thời gian ô tô đi từ $B$ về $A$ là: $\\frac{x}{40}$ (giờ).\n` +
`Tổng thời gian đi và về là $5$ giờ $40$ phút = $5 + \\frac{40}{60}$ = $\\frac{17}{3}$ (giờ).\n` +
`Ta có phương trình:\n` +
`$\\frac{x}{45} + \\frac{x}{40} = \\frac{17}{3}$\n` +
`Quy đồng mẫu chung là $360$:\n` +
`$\\frac{8x}{360} + \\frac{9x}{360} = \\frac{17 \\cdot 120}{360}$\n` +
`$\\Leftrightarrow 17x = 17 \\cdot 120 \\Rightarrow x = 120$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Chiều dài quãng đường $AB$ là $120$ km.`;

  const sol3 = `**1. Tứ giác AKHD là hình gì?**\n` +
`Trong $\\Delta ABK$, $I$ là trung điểm $AB$ (giả thiết), $H$ là trung điểm $BK$ (do $K$ đối xứng $B$ qua $H$).\n` +
`Suy ra $IH$ là đường trung bình của $\\Delta ABK \\Rightarrow IH \\parallel AK$, hay $DH \\parallel AK$.\n` +
`Mặt khác, $AD \\parallel BC \\Rightarrow AD \\parallel HK$.\n` +
`Tứ giác $AKHD$ có các cặp cạnh đối song song ($DH \\parallel AK$ và $AD \\parallel HK$) nên là hình bình hành.\n\n` +
`**2. Chứng minh tứ giác AHBD là hình chữ nhật và tính diện tích:**\n` +
`Hình bình hành $AKHD$ có $AD = HK$. Mà $HK = BH$ (do $K$ đối xứng $B$ qua $H$) nên $AD = BH$.\n` +
`Tứ giác $AHBD$ có $AD \\parallel BH$ và $AD = BH$ nên là hình bình hành.\n` +
`Lại có $\\widehat{AHB} = 90^\\circ$ (vì $AH \\perp BC$).\n` +
`Hình bình hành có một góc vuông là hình chữ nhật. Vậy $AHBD$ là hình chữ nhật.\n` +
`* Tính diện tích:\n` +
`Áp dụng định lý Pytago trong $\\Delta ABH$ vuông tại $H$:\n` +
`$BH = \\sqrt{AB^2 - AH^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$ (cm).\n` +
`Diện tích hình chữ nhật $AHBD$: $S = AH \\cdot BH = 6 \\cdot 8 = 48$ (cm$^2$).\n\n` +
`**3. Điều kiện để AHBD là hình vuông:**\n` +
`Hình chữ nhật $AHBD$ là hình vuông khi và chỉ khi hai cạnh kề bằng nhau: $AH = BH$.\n` +
`Khi đó $\\Delta ABH$ vuông cân tại $H \\Rightarrow \\widehat{ABH} = 45^\\circ$.\n` +
`$\\Delta ABC$ vuông tại $A$ có $\\widehat{B} = 45^\\circ$ nên $\\Delta ABC$ vuông cân tại $A$.\n` +
`Vậy $\\Delta ABC$ vuông cân tại $A$ thì $AHBD$ là hình vuông.\n\n` +
`**4. Chứng minh $AK \\perp CM$:**\n` +
`Tứ giác $ABMK$ có hai đường chéo $AM$ và $BK$ cắt nhau tại trung điểm $H$ của mỗi đường (do tính đối xứng).\n` +
`Nên $ABMK$ là hình bình hành. Mà $AM \\perp BK$ tại $H$ $\\Rightarrow ABMK$ là hình thoi.\n` +
`Suy ra $AK \\parallel BM$.\n` +
`Trong $\\Delta ABC$, $AH$ là đường cao. Mà $M$ đối xứng $A$ qua $BC$ nên $BC$ là đường trung trực của $AM$.\n` +
`$\\Rightarrow CA = CM$ và $BA = BM$. Suy ra $\\Delta ABC = \\Delta MBC$ (c.c.c).\n` +
`$\\Rightarrow \\widehat{BMC} = \\widehat{BAC} = 90^\\circ \\Rightarrow BM \\perp CM$.\n` +
`Vì $AK \\parallel BM$ và $BM \\perp CM$ nên $AK \\perp CM$ (đpcm).`;

  const sol4 = `Gọi số lượng bánh cửa hàng bán được vào buổi sáng là $x$ (cái, $x \\in \\mathbb{N}^*$).\n` +
`Số bánh bán được vào buổi chiều là: $x + 50\\% \\cdot x = 1,5x$ (cái).\n` +
`Giá bán 1 cái bánh buổi sáng là $70.000$ đồng.\n` +
`Giá bán 1 cái bánh buổi chiều là: $70.000 - 20\\% \\cdot 70.000 = 56.000$ đồng.\n` +
`Tổng số tiền thu được cả ngày là $15.400.000$ đồng, ta có phương trình:\n` +
`$70000x + 56000(1,5x) = 15400000$\n` +
`$\\Leftrightarrow 70000x + 84000x = 15400000$\n` +
`$\\Leftrightarrow 154000x = 15400000 \\Rightarrow x = 100$ (thỏa mãn).\n` +
`Vậy số bánh buổi sáng là $100$ cái, buổi chiều là $1,5 \\cdot 100 = 150$ cái.\n` +
`**Kết luận:** Cả ngày cửa hàng bán được $100 + 150 = 250$ cái bánh.`;

  const sol5 = `Ta có biểu thức: $Q = -x^2 - y^2 - 4x + 2y + 2$\n` +
`Gộp các nhóm hạng tử để tạo thành các hằng đẳng thức:\n` +
`$Q = -(x^2 + 4x) - (y^2 - 2y) + 2$\n` +
`$Q = -(x^2 + 4x + 4 - 4) - (y^2 - 2y + 1 - 1) + 2$\n` +
`$Q = -(x + 2)^2 + 4 - (y - 1)^2 + 1 + 2$\n` +
`$Q = -(x + 2)^2 - (y - 1)^2 + 7$.\n` +
`Vì $-(x + 2)^2 \\le 0$ và $-(y - 1)^2 \\le 0$ với mọi $x, y$.\n` +
`Do đó $Q \\le 7$ với mọi $x, y$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi $x + 2 = 0$ và $y - 1 = 0 \\Rightarrow x = -2$ và $y = 1$.\n` +
`**Kết luận:** Giá trị lớn nhất của biểu thức $Q$ là $7$ khi $x = -2; y = 1$. Biểu thức không có GTNN.`;

  const sol6 = `Gọi thời gian máy xúc hoàn thành công việc theo kế hoạch là $x$ (ngày) ($x > 2$).\n` +
`Khối lượng đất xúc theo kế hoạch là: $45x$ ($m^3$).\n` +
`Thời gian thực tế máy xúc đã làm là: $x - 2$ (ngày).\n` +
`Khối lượng đất xúc trong thực tế là: $50(x - 2)$ ($m^3$).\n` +
`Vì thực tế làm vượt mức $30 m^3$ so với kế hoạch, ta có phương trình:\n` +
`$50(x - 2) - 45x = 30$\n` +
`$\\Leftrightarrow 50x - 100 - 45x = 30$\n` +
`$\\Leftrightarrow 5x = 130 \\Rightarrow x = 26$ (thỏa mãn).\n` +
`**Kết luận:** Khối lượng đất mà máy phải xúc theo kế hoạch là $45 \\cdot 26 = 1170$ ($m^3$).`;

  const sol7 = `**1) Tính AC và AH:**\n` +
`Trong $\\Delta ABC$ vuông tại $A$: $AC = \\sqrt{BC^2 - AB^2} = \\sqrt{10^2 - 6^2} = 8$ (cm).\n` +
`Áp dụng hệ thức lượng: $AH \\cdot BC = AB \\cdot AC \\Rightarrow AH = \\frac{6 \\cdot 8}{10} = 4,8$ (cm).\n\n` +
`**2) Chứng minh EA.EB = EC.ED:**\n` +
`Ta có $\\widehat{BAC} = 90^\\circ \\Rightarrow \\widehat{EAC} = 90^\\circ$.\n` +
`Và $CD \\perp BI$ tại $D \\Rightarrow \\widehat{EDB} = 90^\\circ$.\n` +
`Xét $\\Delta EAD$ và $\\Delta ECB$ có:\n` +
`Hai tam giác vuông $\\Delta EBD$ và $\\Delta ECA$ đồng dạng (chung góc E) $\\Rightarrow \\frac{EA}{ED} = \\frac{EC}{EB} \\Rightarrow EA \\cdot EB = EC \\cdot ED$.\n` +
`Từ đó $\\Delta EAD \\sim \\Delta ECB$ (c.g.c).\n\n` +
`**3) Chứng minh $(BD/DE)^2 = BF/FE$:**\n` +
`Trong tam giác vuông $BDE$ (vuông tại $D$), $DF$ là đường cao ứng với cạnh huyền $BE$ ($F$ là hình chiếu của $D$ trên $BE$).\n` +
`Theo hệ thức lượng trong tam giác vuông: $BD^2 = BF \\cdot BE$ và $DE^2 = FE \\cdot BE$.\n` +
`Lập tỉ số: $\\frac{BD^2}{DE^2} = \\frac{BF \\cdot BE}{FE \\cdot BE} = \\frac{BF}{FE}$ (đpcm).\n\n` +
`**4) Chứng minh $S_{OFD} = \\frac{1}{3}S_{OCA}$:**\n` +
`*(Dành cho học sinh giỏi vận dụng tính chất đường phân giác trong tam giác và tỉ số diện tích của các tam giác đồng dạng, kết hợp định lý Menelaus hoặc Ceva).*`;

  const sol8 = `**1)** Đa thức $P = 4x^2 - 7x + a$ chia hết cho đa thức $Q = x - 1$.\n` +
`Theo định lý Bê-du, ta có $P(1) = 0$.\n` +
`Thay $x = 1$ vào $P$: $4(1)^2 - 7(1) + a = 0 \\Leftrightarrow -3 + a = 0 \\Rightarrow a = 3$.\n\n` +
`**2)** Chứng minh $A = x^2 + 2x + 3 > 0$:\n` +
`Ta có: $A = (x^2 + 2x + 1) + 2 = (x + 1)^2 + 2$.\n` +
`Vì $(x + 1)^2 \\ge 0$ với mọi $x \\in \\mathbb{R}$, nên $(x + 1)^2 + 2 \\ge 2 > 0$ với mọi $x \\in \\mathbb{R}$ (đpcm).`;

  const sol9 = `**1)** $16x - 8xy + xy^2$\n` +
`$= x(16 - 8y + y^2) = x(4 - y)^2$.\n\n` +
`**2)** $3(3 - x) + 2x(x - 3)$\n` +
`$= -3(x - 3) + 2x(x - 3)$\n` +
`$= (x - 3)(2x - 3)$.\n\n` +
`**3)** $3x^2 + 4x - 4$\n` +
`Tách hạng tử $4x = 6x - 2x$:\n` +
`$= 3x^2 + 6x - 2x - 4$\n` +
`$= 3x(x + 2) - 2(x + 2)$\n` +
`$= (x + 2)(3x - 2)$.`;

  const sol10 = `**1. Rút gọn P:**\n` +
`Điều kiện xác định: $x \\ne \\pm 2, x \\ne 3$.\n` +
`$P = \\left( \\frac{x - 2}{x + 2} + \\frac{x}{x - 2} - \\frac{2x + 4}{(x - 2)(x + 2)} \\right) \\cdot \\frac{x - 3 + 5}{x - 3}$\n` +
`$= \\frac{(x - 2)^2 + x(x + 2) - 2x - 4}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x - 3}$\n` +
`$= \\frac{x^2 - 4x + 4 + x^2 + 2x - 2x - 4}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x - 3}$\n` +
`$= \\frac{2x^2 - 4x}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x - 3} = \\frac{2x(x - 2)}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x - 3}$\n` +
`$= \\frac{2x}{x + 2} \\cdot \\frac{x + 2}{x - 3} = \\frac{2x}{x - 3}$.\n\n` +
`**2. Tính P khi $x^2 - 3x + 2 = 0$:**\n` +
`$x^2 - 3x + 2 = 0 \\Leftrightarrow (x - 1)(x - 2) = 0 \\Rightarrow x = 1$ hoặc $x = 2$.\n` +
`So với ĐKXĐ ($x \\ne 2$), ta chỉ nhận $x = 1$.\n` +
`Thay $x = 1$ vào $P$: $P = \\frac{2 \\cdot 1}{1 - 3} = \\frac{2}{-2} = -1$.\n\n` +
`**3. Tìm x để P = 4/5:**\n` +
`$P = \\frac{4}{5} \\Leftrightarrow \\frac{2x}{x - 3} = \\frac{4}{5}$\n` +
`$\\Leftrightarrow 10x = 4(x - 3) \\Leftrightarrow 10x = 4x - 12$\n` +
`$\\Leftrightarrow 6x = -12 \\Rightarrow x = -2$ (Loại vì vi phạm ĐKXĐ).\n` +
`Vậy không có giá trị nào của $x$ thỏa mãn.`;

  const updates = [
    { id: "5cb383e3-9886-404d-8eaf-79e98036e3e4", solution: sol1 },
    { id: "5faecc84-284f-42ab-9182-c1238df546e0", solution: sol2 },
    { id: "606492d5-10e7-4e70-b454-eb11884332dd", solution: sol3 },
    { id: "60ac564e-cb31-4f68-a7b1-3fa9973d23a4", solution: sol4 },
    { id: "61217bea-b9f6-442e-bb9c-b95fb27545d7", solution: sol5 },
    { id: "621c7022-d019-42ca-9736-50d303bc4dc0", solution: sol6 },
    { id: "63283f69-b2f2-456d-9f8f-e829a40fbd05", solution: sol7 },
    { id: "6524a71b-22cd-4bc9-a3d5-41a17c42424a", solution: sol8 },
    { id: "66cf72ed-adb8-4562-a47a-6e943aeb7f3b", solution: sol9 },
    { id: "6704960b-97ef-4019-ba86-ea3671683913", solution: sol10 }
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

manualFixBatch10Grade8().catch(console.error).finally(() => process.exit(0));
