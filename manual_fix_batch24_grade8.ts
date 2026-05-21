import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch24Grade8() {
  const sql = getDb();

  const sol1 = `**a) Tính thể tích lượng nước và chiều rộng của bể:**\n` +
`Thể tích của 120 thùng nước được đổ vào bể là:\n` +
`$V_{nước} = 120 \\cdot 20 = 2400$ (lít) = $2400$ (dm$^3$) = $2,4$ (m$^3$).\n` +
`Vì mực nước trong bể cao $0,8$m, ta có công thức thể tích: $V = \\text{dài} \\cdot \\text{rộng} \\cdot \\text{chiều cao mực nước}$.\n` +
`$\\Rightarrow 2,4 = 2 \\cdot \\text{rộng} \\cdot 0,8$\n` +
`$\\Rightarrow 1,6 \\cdot \\text{rộng} = 2,4 \\Rightarrow \\text{rộng} = 2,4 : 1,6 = 1,5$ (m).\n` +
`Vậy chiều rộng của bể là $1,5$m.\n\n` +
`**b) Tính chiều cao của bể:**\n` +
`Người ta đổ thêm 60 thùng nước nữa thì đầy bể. Thể tích nước đổ thêm là:\n` +
`$V_{thêm} = 60 \\cdot 20 = 1200$ (lít) = $1200$ (dm$^3$) = $1,2$ (m$^3$).\n` +
`Thể tích toàn phần của bể là:\n` +
`$V_{bể} = V_{nước} + V_{thêm} = 2,4 + 1,2 = 3,6$ (m$^3$).\n` +
`Chiều cao của bể là:\n` +
`$h = \\frac{V_{bể}}{\\text{dài} \\cdot \\text{rộng}} = \\frac{3,6}{2 \\cdot 1,5} = \\frac{3,6}{3} = 1,2$ (m).\n` +
`**Kết luận:** Chiều rộng bể là $1,5$m; Chiều cao bể là $1,2$m.`;

  const sol2 = `**a)** $(x - 1)^2 + x(5 - x) = 8$\n` +
`$\\Leftrightarrow x^2 - 2x + 1 + 5x - x^2 = 8$\n` +
`$\\Leftrightarrow 3x + 1 = 8$\n` +
`$\\Leftrightarrow 3x = 7 \\Rightarrow x = \\frac{7}{3}$.\n\n` +
`**b)** $(12x^4 - 6x) : 6x + 2x(2 + x)(2 - x) = 7$\n` +
`$\\Leftrightarrow (2x^3 - 1) + 2x(4 - x^2) = 7$\n` +
`$\\Leftrightarrow 2x^3 - 1 + 8x - 2x^3 = 7$\n` +
`$\\Leftrightarrow 8x = 8 \\Rightarrow x = 1$.\n\n` +
`**c)** $x^3 - 3x^2 + x - 3 = 0$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$\\Leftrightarrow x^2(x - 3) + (x - 3) = 0$\n` +
`$\\Leftrightarrow (x - 3)(x^2 + 1) = 0$\n` +
`Vì $x^2 + 1 > 0$ với mọi $x$, nên $x - 3 = 0 \\Rightarrow x = 3$.`;

  const sol3 = `**a) Chứng minh BHCK là hình bình hành:**\n` +
`Vì $K$ đối xứng với $H$ qua $M$ nên $M$ là trung điểm của $HK$.\n` +
`Mà $M$ là trung điểm của $BC$ (giả thiết).\n` +
`Tứ giác $BHCK$ có 2 đường chéo $BC$ và $HK$ cắt nhau tại trung điểm $M$ của mỗi đường, nên $BHCK$ là hình bình hành.\n\n` +
`**b) Chứng minh BK $\\perp$ AB và CK $\\perp$ AC:**\n` +
`Vì $BHCK$ là hình bình hành nên $BK \\parallel HC$. \n` +
`Mà $HC$ chính là đường cao $CF \\perp AB$, suy ra $BK \\perp AB$.\n` +
`Tương tự, $CK \\parallel BH$. Mà $BH$ chính là đường cao $BE \\perp AC$, suy ra $CK \\perp AC$.\n\n` +
`**c) Chứng minh BIKC là hình thang cân:**\n` +
`$I$ đối xứng với $H$ qua $BC$ nên $BC$ là đường trung trực của $HI \\Rightarrow BC \\perp HI$ tại $D$ ($D$ là trung điểm $HI$).\n` +
`Trong $\\Delta HIK$, có $M$ là trung điểm $HK$ và $D$ là trung điểm $HI$, suy ra $MD$ là đường trung bình $\\Rightarrow MD \\parallel IK$ hay $BC \\parallel IK$.\n` +
`Do đó $BIKC$ là hình thang.\n` +
`Mặt khác, $I$ đối xứng với $H$ qua $BC \\Rightarrow \\widehat{IBC} = \\widehat{HBC}$.\n` +
`Trong hình bình hành $BHCK$, ta có $CK \\parallel BH \\Rightarrow \\widehat{KCB} = \\widehat{HBC}$ (so le trong).\n` +
`Từ đó $\\widehat{IBC} = \\widehat{KCB}$. Hình thang $BIKC$ có hai góc kề đáy bằng nhau nên là hình thang cân.\n\n` +
`**d) Điều kiện để GHCK là hình thang cân:**\n` +
`Gọi $G$ là giao điểm của $BK$ và $HI$. Ta có $HI \\perp BC$ và $BK \\perp AB \\Rightarrow GK \\perp AB$. \n` +
`Mà $HC \\perp AB$ (đường cao) $\\Rightarrow HC \\parallel GK$.\n` +
`Tứ giác $GHCK$ có $HC \\parallel GK$ nên là hình thang.\n` +
`Để $GHCK$ là hình thang cân thì hai đường chéo phải bằng nhau hoặc 2 góc kề một đáy bằng nhau. Thực tế cần có $GH = CK$.\n` +
`Vì $CK = BH$ (do $BHCK$ là hình bình hành), nên ta cần $GH = BH$.\n` +
`Xét $\\Delta GBC$ có $GD \\perp BC$ (do $HI \\perp BC$). Nếu $BH = GH$, ta dễ dàng chứng minh được $\\Delta BDG$ là tam giác vuông cân tại $D$, dẫn đến $\\widehat{GBD} = 45^\\circ$.\n` +
`Lại có $\\widehat{GBD} = \\widehat{KBC} = \\widehat{HCB} = 90^\\circ - \\widehat{B}$ (trong $\\Delta HBC$).\n` +
`Từ đó $90^\\circ - \\widehat{B} = 45^\\circ \\Rightarrow \\widehat{B} = 45^\\circ$.\n` +
`**Kết luận:** Tam giác $ABC$ cần có thêm điều kiện $\\widehat{B} = 45^\\circ$ để tứ giác $GHCK$ là hình thang cân.`;

  const sol4 = `**1)** $x^2 - xy + x$\n` +
`Đặt nhân tử chung là $x$:\n` +
`$= x(x - y + 1)$.\n\n` +
`**2)** $x^2 - 2xy - 4 + y^2$\n` +
`Nhóm các hạng tử để tạo hằng đẳng thức:\n` +
`$= (x^2 - 2xy + y^2) - 4$\n` +
`$= (x - y)^2 - 2^2$\n` +
`$= (x - y - 2)(x - y + 2)$.\n\n` +
`**3)** $x^3 - x^2 - 16x + 16$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$= x^2(x - 1) - 16(x - 1)$\n` +
`$= (x - 1)(x^2 - 16)$\n` +
`$= (x - 1)(x - 4)(x + 4)$.`;

  const sol5 = `**a) Tính giá trị biểu thức A:**\n` +
`$A = \\frac{x + 1}{x + 3}$. Tại $x = 5$ (thỏa mãn $x \\ne -3$):\n` +
`$A = \\frac{5 + 1}{5 + 3} = \\frac{6}{8} = \\frac{3}{4}$.\n\n` +
`**b) Rút gọn biểu thức B:**\n` +
`Điều kiện xác định: $x \\ne \\pm 3$.\n` +
`$B = \\frac{3}{x - 3} + \\frac{6x}{x^2 - 9} + \\frac{x}{x + 3}$\n` +
`$B = \\frac{3(x + 3)}{(x - 3)(x + 3)} + \\frac{6x}{(x - 3)(x + 3)} + \\frac{x(x - 3)}{(x - 3)(x + 3)}$\n` +
`$B = \\frac{3x + 9 + 6x + x^2 - 3x}{(x - 3)(x + 3)}$\n` +
`$B = \\frac{x^2 + 6x + 9}{(x - 3)(x + 3)} = \\frac{(x + 3)^2}{(x - 3)(x + 3)} = \\frac{x + 3}{x - 3}$.\n\n` +
`**c) Tìm x nguyên dương để P thuộc Z:**\n` +
`$P = A \\cdot B = \\frac{x + 1}{x + 3} \\cdot \\frac{x + 3}{x - 3} = \\frac{x + 1}{x - 3}$ (với $x \\ne \\pm 3$).\n` +
`Ta phân tích: $P = \\frac{x - 3 + 4}{x - 3} = 1 + \\frac{4}{x - 3}$.\n` +
`Để $P \\in \\mathbb{Z}$ thì $4 \\vdots (x - 3) \\Rightarrow x - 3 \\in U(4) = \\{1; -1; 2; -2; 4; -4\\}$.\n` +
`Lập bảng giá trị:\n` +
`- $x - 3 = 1 \\Rightarrow x = 4$\n` +
`- $x - 3 = -1 \\Rightarrow x = 2$\n` +
`- $x - 3 = 2 \\Rightarrow x = 5$\n` +
`- $x - 3 = -2 \\Rightarrow x = 1$\n` +
`- $x - 3 = 4 \\Rightarrow x = 7$\n` +
`- $x - 3 = -4 \\Rightarrow x = -1$ (loại vì $x$ không là số tự nhiên)\n` +
`Đối chiếu ĐKXĐ ($x \\ne \\pm 3$) và $x \\in \\mathbb{N}$, các giá trị nhận được là: $x \\in \\{1; 2; 4; 5; 7\\}$.`;

  const sol6 = `**a)** $-2x(-3x + 2) - (x + 2)^2$\n` +
`$= 6x^2 - 4x - (x^2 + 4x + 4)$\n` +
`$= 6x^2 - 4x - x^2 - 4x - 4$\n` +
`$= 5x^2 - 8x - 4$.\n\n` +
`**b)** $(x + 2)(x^2 - 2x + 4) - 2(x + 1)(1 - x)$\n` +
`Áp dụng hằng đẳng thức $a^3 + b^3$ và $(a+b)(a-b)$:\n` +
`$= (x^3 + 2^3) - 2(1 - x^2)$\n` +
`$= x^3 + 8 - 2 + 2x^2$\n` +
`$= x^3 + 2x^2 + 6$.\n\n` +
`**c)** $(2x - 1)^2 - 2(4x^2 - 1) + (2x + 1)^2$\n` +
`$= (2x - 1)^2 - 2(2x - 1)(2x + 1) + (2x + 1)^2$\n` +
`Áp dụng hằng đẳng thức $a^2 - 2ab + b^2 = (a - b)^2$ với $a = 2x - 1$ và $b = 2x + 1$:\n` +
`$= [(2x - 1) - (2x + 1)]^2$\n` +
`$= (2x - 1 - 2x - 1)^2$\n` +
`$= (-2)^2 = 4$.`;

  const sol7 = `**a) Chứng minh AIHK là hình chữ nhật:**\n` +
`Ta có $\\widehat{A} = 90^\\circ$ (vì $\\Delta ABC$ vuông tại $A$).\n` +
`$D$ đối xứng với $H$ qua $AB \\Rightarrow AB$ là đường trung trực của $DH \\Rightarrow \\widehat{AID} = \\widehat{AIH} = 90^\\circ \\Rightarrow \\widehat{I} = 90^\\circ$.\n` +
`$E$ đối xứng với $H$ qua $AC \\Rightarrow AC$ là đường trung trực của $EH \\Rightarrow \\widehat{AKE} = \\widehat{AKH} = 90^\\circ \\Rightarrow \\widehat{K} = 90^\\circ$.\n` +
`Tứ giác $AIHK$ có 3 góc vuông ($\\widehat{A} = \\widehat{I} = \\widehat{K} = 90^\\circ$) nên là hình chữ nhật.\n\n` +
`**b) Chứng minh D, A, E thẳng hàng:**\n` +
`Vì $AB$ là trung trực của $DH \\Rightarrow \\Delta ADH$ cân tại $A \\Rightarrow AB$ là phân giác $\\widehat{DAH} \\Rightarrow \\widehat{DAB} = \\widehat{HAB}$.\n` +
`Vì $AC$ là trung trực của $EH \\Rightarrow \\Delta AEH$ cân tại $A \\Rightarrow AC$ là phân giác $\\widehat{HAE} \\Rightarrow \\widehat{HAC} = \\widehat{CAE}$.\n` +
`Ta có: $\\widehat{DAE} = \\widehat{DAB} + \\widehat{HAB} + \\widehat{HAC} + \\widehat{CAE} = 2(\\widehat{HAB} + \\widehat{HAC}) = 2 \\cdot 90^\\circ = 180^\\circ$.\n` +
`Vậy $D, A, E$ thẳng hàng.\n\n` +
`**c) Chứng minh AM $\\perp$ IK:**\n` +
`Trong hình chữ nhật $AIHK$, đường chéo $AH$ và $IK$ cắt nhau nên $\\widehat{AKI} = \\widehat{AHI}$.\n` +
`Mà $\\widehat{AHI} = \\widehat{B}$ (cùng phụ với $\\widehat{BAH}$). Suy ra $\\widehat{AKI} = \\widehat{B}$.\n` +
`Trong $\\Delta ABC$ vuông tại $A$, trung tuyến $AM = \\frac{1}{2}BC = MC \\Rightarrow \\Delta AMC$ cân tại $M \\Rightarrow \\widehat{MAC} = \\widehat{C}$.\n` +
`Gọi $N$ là giao điểm của $AM$ và $IK$. Xét $\\Delta ANK$ có:\n` +
`$\\widehat{NAK} + \\widehat{AKN} = \\widehat{MAC} + \\widehat{AKI} = \\widehat{C} + \\widehat{B} = 90^\\circ$.\n` +
`Suy ra $\\widehat{ANK} = 180^\\circ - 90^\\circ = 90^\\circ$. Vậy $AM \\perp IK$ (đpcm).`;

  const sol8 = `Ta có biểu thức: $A = \\frac{x^2 - 2x + 2016}{x^2}$ với $x > 0$.\n` +
`Chia tử cho mẫu, ta được:\n` +
`$A = 1 - \\frac{2}{x} + \\frac{2016}{x^2}$.\n` +
`Đặt $t = \\frac{1}{x} > 0$. Biểu thức trở thành:\n` +
`$A = 2016t^2 - 2t + 1$\n` +
`$A = 2016 \\left( t^2 - \\frac{2}{2016}t \\right) + 1$\n` +
`$A = 2016 \\left( t^2 - 2 \\cdot t \\cdot \\frac{1}{2016} + \\frac{1}{2016^2} \\right) - \\frac{1}{2016} + 1$\n` +
`$A = 2016 \\left( t - \\frac{1}{2016} \\right)^2 + \\frac{2015}{2016}$.\n` +
`Vì $\\left( t - \\frac{1}{2016} \\right)^2 \\ge 0$ nên $A \\ge \\frac{2015}{2016}$.\n` +
`Dấu \"=\" xảy ra khi $t = \\frac{1}{2016} \\Leftrightarrow \\frac{1}{x} = \\frac{1}{2016} \\Leftrightarrow x = 2016$ (thỏa mãn $x > 0$).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $A$ là $\\frac{2015}{2016}$, đạt được tại $x = 2016$.`;

  const sol9 = `**1. Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường và bằng nhau là hình chữ nhật:** $\\Rightarrow$ **ĐÚNG** (Dấu hiệu nhận biết hình chữ nhật).\n` +
`**2. Phân thức đối của $\\frac{2x}{3-x}$ là $\\frac{-2x}{x-3}$:** $\\Rightarrow$ **SAI**.\n` +
`Phân thức đối của $\\frac{2x}{3-x}$ là $-\\frac{2x}{3-x} = \\frac{-2x}{3-x} = \\frac{2x}{x-3}$.\n` +
`Khẳng định $\\frac{-2x}{x-3}$ là sai (dấu âm ở cả tử và mẫu thì phân thức không đổi).\n` +
`**3. Hình chữ nhật có hai đường chéo bằng nhau là hình vuông:** $\\Rightarrow$ **SAI** (Mọi hình chữ nhật đều có hai đường chéo bằng nhau, muốn là hình vuông thì 2 đường chéo phải vuông góc).\n` +
`**4. Kết quả rút gọn $\\frac{8xy^3}{12x^3y^2}$ là $\\frac{2y}{3x^2}$:** $\\Rightarrow$ **ĐÚNG** (Chia tử và mẫu cho $4xy^2$, ta được $\\frac{2y}{3x^2}$).`;

  const sol10 = `Gọi chiều dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian ô tô đi từ $A$ đến $B$ với vận tốc $35$ km/h là: $\\frac{x}{35}$ (giờ).\n` +
`Thời gian ô tô đi từ $B$ về $A$ với vận tốc $42$ km/h là: $\\frac{x}{42}$ (giờ).\n` +
`Vì thời gian về ít hơn thời gian đi nửa giờ ($0,5$ giờ = $\\frac{1}{2}$ giờ), ta có phương trình:\n` +
`$\\frac{x}{35} - \\frac{x}{42} = \\frac{1}{2}$\n` +
`Quy đồng mẫu thức với MTC là $210$:\n` +
`$\\frac{6x}{210} - \\frac{5x}{210} = \\frac{1}{2}$\n` +
`$\\Leftrightarrow \\frac{x}{210} = \\frac{1}{2}$\n` +
`$\\Leftrightarrow x = \\frac{210}{2} = 105$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Chiều dài quãng đường $AB$ là $105$ km.`;

  const updates = [
    { id: "ed8228c0-6159-4295-a867-1a2901987eb3", solution: sol1 },
    { id: "eec7b446-f152-47f2-bedd-6ba7d2e43a9e", solution: sol2 },
    { id: "ef2628bc-d14f-4e0f-a12b-cac7db354364", solution: sol3 },
    { id: "f19a9986-f261-435a-aba0-9e362038e464", solution: sol4 },
    { id: "f3bc33fb-b7e1-4416-bdc5-635aeda46d2b", solution: sol5 },
    { id: "f64556ed-d2a4-42ee-ae9a-f7e24207f841", solution: sol6 },
    { id: "f6f32a3b-509b-46db-9c18-5c9b22602126", solution: sol7 },
    { id: "f7d4497f-9b57-4682-a476-f80e322d6a13", solution: sol8 },
    { id: "f8708414-c952-483c-b002-528fbb141feb", solution: sol9 },
    { id: "f8d46cac-8331-4f55-a0da-1d39522678f7", solution: sol10 }
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

manualFixBatch24Grade8().catch(console.error).finally(() => process.exit(0));
