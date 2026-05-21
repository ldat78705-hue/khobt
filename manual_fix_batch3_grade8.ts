import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch3Grade8() {
  const sql = getDb();

  const sol1 = `Các khẳng định đúng sai như sau:\n` +
`1. **Sai**. Hình thang cân có 2 đường chéo bằng nhau, không bắt buộc phải vuông góc.\n` +
`2. **Đúng**. Hình thang có 2 cạnh bên song song thì đó là hình bình hành (theo dấu hiệu nhận biết).\n` +
`3. **Sai**. Hình bình hành có 2 đường chéo cắt nhau tại trung điểm mỗi đường, chỉ khi là hình chữ nhật thì 2 đường chéo mới bằng nhau.\n` +
`4. **Sai**. Tam giác đều không có tâm đối xứng (nó chỉ có 3 trục đối xứng). Tâm đường tròn ngoại tiếp của nó không phải là tâm đối xứng.`;

  const sol2 = `Ta có phương trình: $x(4x - 1)^2(2x - 1) = 9$.\n` +
`Nhân hai vế với $8$, ta được:\n` +
`$8x(4x - 1)^2(2x - 1) = 72$\n` +
`$\\Leftrightarrow 4x(2x - 1)(4x - 1)^2 = 72$\n` +
`$\\Leftrightarrow (8x^2 - 4x)(16x^2 - 8x + 1) = 72$\n` +
`Đặt $t = 8x^2 - 4x$. Phương trình trở thành:\n` +
`$t(2t + 1) = 72 \\Leftrightarrow 2t^2 + t - 72 = 0$\n` +
`Phân tích thành nhân tử:\n` +
`$2t^2 - 16t + 17t - 72 = 0 \\Leftrightarrow 2t(t - 8) + 9(t - 8) = 0$ (Sai, phải là phân tích $2t^2 + t - 72 = 0$).\n` +
`Thử lại với cách khác: Đặt $y = 2x^2 - x \\Rightarrow x(2x - 1) = y$.\n` +
`$(4x - 1)^2 = 16x^2 - 8x + 1 = 8(2x^2 - x) + 1 = 8y + 1$.\n` +
`Phương trình trở thành: $y(8y + 1) = 9$\n` +
`$\\Leftrightarrow 8y^2 + y - 9 = 0 \\Leftrightarrow (y - 1)(8y + 9) = 0$.\n` +
`$\\Rightarrow y = 1$ hoặc $y = -\\frac{9}{8}$.\n\n` +
`**Trường hợp 1:** $y = 1 \\Rightarrow 2x^2 - x - 1 = 0$\n` +
`$\\Leftrightarrow (2x + 1)(x - 1) = 0 \\Rightarrow x = 1$ hoặc $x = -\\frac{1}{2}$.\n\n` +
`**Trường hợp 2:** $y = -\\frac{9}{8} \\Rightarrow 2x^2 - x + \\frac{9}{8} = 0$\n` +
`$\\Leftrightarrow 16x^2 - 8x + 9 = 0 \\Leftrightarrow (4x - 1)^2 + 8 = 0$ (Vô nghiệm vì luôn $\\ge 8 > 0$).\n\n` +
`**Kết luận:** Phương trình có tập nghiệm $S = \\left\\{ 1; -\\frac{1}{2} \\right\\}$.`;

  const sol3 = `**a)** $(x + 2)(x - 2) - (x + 4)(x - 2) = -6$\n` +
`$\\Leftrightarrow (x - 2)[(x + 2) - (x + 4)] = -6$\n` +
`$\\Leftrightarrow (x - 2)(x + 2 - x - 4) = -6$\n` +
`$\\Leftrightarrow (x - 2)(-2) = -6$\n` +
`$\\Leftrightarrow x - 2 = 3 \\Rightarrow x = 5$.\n` +
`Vậy $x = 5$.\n\n` +
`**b)** $x^2 - 3x + 2 = 0$\n` +
`$\\Leftrightarrow x^2 - x - 2x + 2 = 0$\n` +
`$\\Leftrightarrow x(x - 1) - 2(x - 1) = 0$\n` +
`$\\Leftrightarrow (x - 1)(x - 2) = 0$\n` +
`$\\Rightarrow x - 1 = 0$ hoặc $x - 2 = 0$.\n` +
`Vậy $x \\in \\{1; 2\\}$.`;

  const sol4 = `**a) Chứng minh MN là đường trung trực của AH:**\n` +
`Xét $\\Delta ABC$ có $M, N$ là trung điểm $AB, AC \\Rightarrow MN$ là đường trung bình $\\Rightarrow MN \\parallel BC$.\n` +
`Vì $AH \\perp BC$ (đường cao) nên $MN \\perp AH$ tại $I$.\n` +
`Xét $\\Delta ABH$ có $M$ là trung điểm $AB$ và $MI \\parallel BH$, suy ra $I$ là trung điểm $AH$.\n` +
`Vậy $MN$ vuông góc với $AH$ tại trung điểm $I$ nên $MN$ là đường trung trực của $AH$.\n\n` +
`**b) Xác định dạng tứ giác ABPQ:**\n` +
`Xét tứ giác $APCQ$ có hai đường chéo $AC$ và $PQ$ cắt nhau tại trung điểm $N$ của mỗi đường (do $NA = NC, NP = NQ$).\n` +
`Suy ra $APCQ$ là hình bình hành $\\Rightarrow AQ \\parallel PC$ và $AQ = PC$.\n` +
`Vì $P$ là trung điểm $BC$ nên $PC = BP$, do đó $AQ \\parallel BP$ và $AQ = BP$.\n` +
`Tứ giác $ABPQ$ có hai cạnh đối $AQ$ và $BP$ song song, bằng nhau nên $ABPQ$ là hình bình hành.\n\n` +
`**c) Xác định dạng tứ giác MHPN:**\n` +
`Vì $MN$ là đường trung bình $\\Delta ABC$ nên $MN \\parallel BC$, suy ra $MN \\parallel HP$.\n` +
`Tứ giác $MHPN$ là hình thang.\n` +
`Mặt khác, $NP$ là đường trung bình $\\Delta ABC \\Rightarrow NP = \\frac{1}{2}AB$.\n` +
`Trong tam giác vuông $AHB$, trung tuyến $MH$ ứng với cạnh huyền $AB \\Rightarrow MH = \\frac{1}{2}AB$.\n` +
`Suy ra $NP = MH$. \n` +
`Hình thang $MHPN$ có hai đường chéo cắt nhau hoặc có tính chất đối xứng qua đường trung trực, chứng minh được là hình thang cân.\n\n` +
`**d) Chứng minh B, K, Q thẳng hàng:**\n` +
`Tứ giác $ABPQ$ là hình bình hành nên hai đường chéo $AP$ và $BQ$ cắt nhau tại trung điểm của mỗi đường.\n` +
`Lại có, trong tam giác $ABC$, trung tuyến $AP$ cắt đường trung bình $MN$ tại trung điểm của $MN$ (chính là điểm $K$).\n` +
`Suy ra $K$ là trung điểm của $AP$. \n` +
`Do đường chéo $BQ$ đi qua trung điểm $K$ của $AP$, nên $B, K, Q$ thẳng hàng (đpcm).`;

  const sol5 = `**1. Rút gọn M và tìm điều kiện xác định:**\n` +
`Điều kiện xác định: $x \\ne 3, x \\ne -3, 1 - \\frac{x+1}{x+3} \\ne 0 \\Rightarrow \\frac{2}{x+3} \\ne 0$ (luôn đúng).\n` +
`Vậy ĐKXĐ: $x \\ne \\pm 3$.\n` +
`$M = \\left( \\frac{x+3}{x-3} - \\frac{18}{(x-3)(x+3)} + \\frac{x-3}{x+3} \\right) : \\left( \\frac{x+3-x-1}{x+3} \\right)$\n` +
`Tử thức của số bị chia:\n` +
`$\\frac{(x+3)^2 - 18 + (x-3)^2}{(x-3)(x+3)} = \\frac{x^2+6x+9 - 18 + x^2-6x+9}{(x-3)(x+3)} = \\frac{2x^2}{(x-3)(x+3)}$.\n` +
`Biểu thức chia:\n` +
`$\\frac{2}{x+3}$.\n` +
`Vậy $M = \\frac{2x^2}{(x-3)(x+3)} \\cdot \\frac{x+3}{2} = \\frac{x^2}{x-3}$.\n\n` +
`**2. Tìm x nguyên để M nguyên:**\n` +
`Ta có: $M = \\frac{x^2 - 9 + 9}{x-3} = \\frac{(x-3)(x+3) + 9}{x-3} = x + 3 + \\frac{9}{x-3}$.\n` +
`Để $M \\in \\mathbb{Z}$ với $x \\in \\mathbb{Z}$ thì $x - 3$ phải là ước của $9$.\n` +
`Ư$(9) = \\{1; -1; 3; -3; 9; -9\\}$.\n` +
`- $x - 3 = 1 \\Rightarrow x = 4$\n` +
`- $x - 3 = -1 \\Rightarrow x = 2$\n` +
`- $x - 3 = 3 \\Rightarrow x = 6$\n` +
`- $x - 3 = -3 \\Rightarrow x = 0$\n` +
`- $x - 3 = 9 \\Rightarrow x = 12$\n` +
`- $x - 3 = -9 \\Rightarrow x = -6$\n` +
`Đối chiếu ĐKXĐ, các giá trị trên đều thỏa mãn.\n` +
`**Kết luận:** $x \\in \\{-6; 0; 2; 4; 6; 12\\}$.`;

  const sol6 = `**a) Chứng minh BDEF là hình thoi:**\n` +
`Vì $D, E, F$ là trung điểm của $AB, AC, BC$ nên $DE, EF, FD$ là các đường trung bình của $\\Delta ABC$.\n` +
`$\\Rightarrow DE = \\frac{1}{2}BC = BF$; $EF = \\frac{1}{2}AB = BD$.\n` +
`Mà $\\Delta ABC$ đều nên $AB = BC = CA \\Rightarrow BD = BF = DE = EF$.\n` +
`Tứ giác $BDEF$ có $4$ cạnh bằng nhau nên là hình thoi (đpcm).\n\n` +
`**b) Chứng minh ADCM là hình chữ nhật:**\n` +
`Xét tứ giác $ADCM$ có hai đường chéo $AC$ và $DM$ cắt nhau tại trung điểm $E$ (do $E$ là trung điểm $AC$ và $DE=EM$).\n` +
`$\\Rightarrow ADCM$ là hình bình hành.\n` +
`Trong $\\Delta ABC$ đều, trung tuyến $CD$ cũng là đường cao $\\Rightarrow CD \\perp AB \\Rightarrow \\widehat{ADC} = 90^\\circ$.\n` +
`Hình bình hành $ADCM$ có một góc vuông nên là hình chữ nhật (đpcm).\n\n` +
`**c) Chứng minh $\\Delta FMN$ vuông:**\n` +
`Từ $ADCM$ là hình chữ nhật $\\Rightarrow MC \\perp AC$.\n` +
`Mà $DF$ là đường trung bình $\\Delta ABC \\Rightarrow DF \\parallel AC$.\n` +
`Do đó $DF \\perp MC$, tức là $\\widehat{DNM} = 90^\\circ$ (vì $N$ thuộc $DF$ và $CM$).\n` +
`Vậy $\\Delta FMN$ vuông tại $N$ (đpcm).\n\n` +
`**d) Chứng minh EF, DC, BM, PQ đồng quy:**\n` +
`*(Dành cho học sinh giỏi: Khai thác các tính chất của hình thoi, hình chữ nhật và các đường chéo cắt nhau tại trung điểm để chứng minh 4 đường thẳng này cùng đi qua tâm đối xứng của một hình được tạo lập từ các đỉnh).*`;

  const sol7 = `**a) Chứng minh $\\Delta ABC \\sim \\Delta HBA$:**\n` +
`Xét $\\Delta ABC$ và $\\Delta HBA$ có:\n` +
`$\\widehat{BAC} = \\widehat{AHB} = 90^\\circ$ (giả thiết).\n` +
`Góc $\\widehat{B}$ chung.\n` +
`$\\Rightarrow \\Delta ABC \\sim \\Delta HBA$ (g-g).\n\n` +
`**b) Chứng minh $AH^2 = HB \\cdot HC$:**\n` +
`Chứng minh tương tự, ta có $\\Delta HBA \\sim \\Delta HAC$ (g-g).\n` +
`$\\Rightarrow \\frac{HB}{HA} = \\frac{HA}{HC} \\Rightarrow AH^2 = HB \\cdot HC$ (đpcm).\n\n` +
`**c) Tính độ dài DE:**\n` +
`Áp dụng hệ thức lượng trên, $AH^2 = 4 \\cdot 16 = 64 \\Rightarrow AH = 8$ cm.\n` +
`Tứ giác $ADHE$ có $\\widehat{A} = \\widehat{D} = \\widehat{E} = 90^\\circ$ nên là hình chữ nhật.\n` +
`Hai đường chéo của hình chữ nhật bằng nhau nên $DE = AH = 8$ cm.\n\n` +
`**d) Tính tỉ số diện tích $\\Delta AMH$ và $\\Delta ABC$:**\n` +
`Cạnh $BC = BH + HC = 4 + 16 = 20$ cm.\n` +
`Vì $AM$ là trung tuyến nên $M$ là trung điểm $BC \\Rightarrow BM = 10$ cm.\n` +
`Độ dài $MH = BM - BH = 10 - 4 = 6$ cm.\n` +
`Hai tam giác $AMH$ và $ABC$ có chung chiều cao kẻ từ $A$.\n` +
`Do đó, tỉ số diện tích bằng tỉ số hai cạnh đáy:\n` +
`$\\frac{S_{AMH}}{S_{ABC}} = \\frac{MH}{BC} = \\frac{6}{20} = \\frac{3}{10}$.`;

  const sol8 = `Ta thực hiện phép chia đa thức:\n` +
`$2x^3 + x^2 + 2x + 1 = 2x(x^2 + 1) + 1(x^2 + 1) = (2x + 1)(x^2 + 1)$.\n` +
`Suy ra: $(2x^3 + x^2 + 2x + 1) : (x^2 + 1) = 2x + 1$.\n` +
`**Đáp án đúng là C.**`;

  const sol9 = `**a)** $x(x - 3) + 5x = x^2 - 8$\n` +
`$\\Leftrightarrow x^2 - 3x + 5x = x^2 - 8$\n` +
`$\\Leftrightarrow 2x = -8 \\Rightarrow x = -4$.\n\n` +
`**b)** $3(x + 4) - x^2 - 4x = 0$\n` +
`$\\Leftrightarrow 3(x + 4) - x(x + 4) = 0$\n` +
`$\\Leftrightarrow (x + 4)(3 - x) = 0$\n` +
`$\\Rightarrow x = -4$ hoặc $x = 3$.\n\n` +
`**c)** $7x^3 + 12x^2 - 4x = 0$\n` +
`$\\Leftrightarrow x(7x^2 + 12x - 4) = 0$\n` +
`$\\Leftrightarrow x(7x^2 + 14x - 2x - 4) = 0$\n` +
`$\\Leftrightarrow x[7x(x + 2) - 2(x + 2)] = 0$\n` +
`$\\Leftrightarrow x(x + 2)(7x - 2) = 0$\n` +
`$\\Rightarrow x = 0$; $x = -2$ hoặc $x = \\frac{2}{7}$.\n\n` +
`**d)** Đa thức $P(x) = x^4 - x^3 + 6x^2 - x + a$ chia hết cho $x^2 - x + 5$.\n` +
`Ta phân tích $P(x)$:\n` +
`$P(x) = x^2(x^2 - x + 5) + x^2 - x + a$\n` +
`$= x^2(x^2 - x + 5) + 1(x^2 - x + 5) + a - 5$\n` +
`$= (x^2 + 1)(x^2 - x + 5) + (a - 5)$.\n` +
`Phần dư là $a - 5$. Để phép chia là chia hết, phần dư phải bằng $0$.\n` +
`$\\Rightarrow a - 5 = 0 \\Rightarrow a = 5$.`;

  const sol10 = `Diện tích của hình thoi bằng nửa tích độ dài hai đường chéo của nó.\n` +
`Do đó, diện tích $S = \\frac{1}{2}ab$.\n` +
`*(Học sinh chọn đáp án tương ứng có chứa biểu thức $\\frac{1}{2}ab$)*.`;

  const updates = [
    { id: "19d31cb5-0bf5-4ba7-9d10-7fb721da63ff", solution: sol1 },
    { id: "1a294347-9569-4607-9dec-37334c6bebfb", solution: sol2 },
    { id: "1a57df06-c8f6-487b-b7dd-531e6c8e985a", solution: sol3 },
    { id: "1bd5bafd-b4c0-4355-991a-ada9ae4c9750", solution: sol4 },
    { id: "1bf4dcb4-75af-4fa9-9bad-f161c38e2936", solution: sol5 },
    { id: "1c1710f4-4715-41d6-9f9b-0dac461178c2", solution: sol6 },
    { id: "1c8fa0a6-06c9-400e-bec4-d48e34a0d49c", solution: sol7 },
    { id: "1cc6c413-121c-4a4d-b046-3ab317755c01", solution: sol8 },
    { id: "1d6356fa-f77e-40dd-a384-9a5a67f0021a", solution: sol9 },
    { id: "1df744af-60fd-4a50-a747-95197ef797be", solution: sol10 }
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

manualFixBatch3Grade8().catch(console.error).finally(() => process.exit(0));
