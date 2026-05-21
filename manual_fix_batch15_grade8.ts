import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch15Grade8() {
  const sql = getDb();

  const sol1 = `*(Đây là câu hỏi trắc nghiệm lý thuyết chưa có các đáp án lựa chọn A, B, C, D. Giáo viên dựa vào phương pháp sau để đối chiếu)*.\n\n` +
`**Phương pháp giải:**\n` +
`Hai phương trình được gọi là tương đương nếu chúng có **cùng một tập nghiệm**.\n` +
`Giải phương trình đề bài: $2x + 6 = 0 \\Leftrightarrow 2x = -6 \\Rightarrow x = -3$.\n` +
`Tập nghiệm của phương trình là $S = \\{-3\\}$.\n` +
`Để tìm phương trình tương đương, ta chỉ cần giải các phương trình ở các đáp án (nếu có), phương trình nào cũng có tập nghiệm $S = \\{-3\\}$ thì đó là đáp án đúng.`;

  const sol2 = `**a) Tính $A(x) : B(x)$:**\n` +
`Thực hiện phép chia đa thức $A(x)$ cho $B(x)$:\n` +
`- Đặt tính chia: $(4x^4 - 11x^3 + 26x^2 - 43x + 26) : (4x - 3)$\n` +
`- $4x^4 : 4x = x^3$. Nhân ngược: $x^3(4x - 3) = 4x^4 - 3x^3$. Trừ đi dư: $-8x^3 + 26x^2$.\n` +
`- $-8x^3 : 4x = -2x^2$. Nhân ngược: $-2x^2(4x - 3) = -8x^3 + 6x^2$. Trừ đi dư: $20x^2 - 43x$.\n` +
`- $20x^2 : 4x = 5x$. Nhân ngược: $5x(4x - 3) = 20x^2 - 15x$. Trừ đi dư: $-28x + 26$.\n` +
`- $-28x : 4x = -7$. Nhân ngược: $-7(4x - 3) = -28x + 21$. Trừ đi dư: $5$.\n` +
`**Kết luận:** Thương là $Q(x) = x^3 - 2x^2 + 5x - 7$, dư là $5$.\n\n` +
`**b) Tìm x nguyên để A(x) chia hết cho B(x):**\n` +
`Ta có: $A(x) = B(x) \\cdot (x^3 - 2x^2 + 5x - 7) + 5$.\n` +
`Để $A(x)$ chia hết cho $B(x)$ thì phần dư $5$ phải chia hết cho $4x - 3$.\n` +
`Vì $x$ nguyên nên $4x - 3$ phải là ước của $5$. $U(5) = \\{1; -1; 5; -5\\}$.\n` +
`- $4x - 3 = 1 \\Rightarrow 4x = 4 \\Rightarrow x = 1$ (thỏa mãn)\n` +
`- $4x - 3 = -1 \\Rightarrow 4x = 2 \\Rightarrow x = \\frac{1}{2}$ (loại vì không nguyên)\n` +
`- $4x - 3 = 5 \\Rightarrow 4x = 8 \\Rightarrow x = 2$ (thỏa mãn)\n` +
`- $4x - 3 = -5 \\Rightarrow 4x = -2 \\Rightarrow x = -\\frac{1}{2}$ (loại)\n` +
`**Kết luận:** $x \\in \\{1; 2\\}$.`;

  const sol3 = `**a) Chứng minh tứ giác ADME là hình chữ nhật:**\n` +
`Ta có: $\\widehat{A} = 90^\\circ$ ($\\Delta ABC$ vuông tại $A$).\n` +
`$MD \\perp AB \\Rightarrow \\widehat{ADM} = 90^\\circ$.\n` +
`$ME \\perp AC \\Rightarrow \\widehat{AEM} = 90^\\circ$.\n` +
`Tứ giác $ADME$ có 3 góc vuông nên là hình chữ nhật.\n\n` +
`**b) Chứng minh DK = IE:**\n` +
`Vì $ADME$ là hình chữ nhật nên $AD = ME$ và $AD \\parallel ME$.\n` +
`$I$ đối xứng với $D$ qua $A \\Rightarrow A$ là trung điểm $DI \\Rightarrow DI = 2AD$.\n` +
`$K$ đối xứng với $E$ qua $M \\Rightarrow M$ là trung điểm $EK \\Rightarrow EK = 2ME$.\n` +
`Từ $AD = ME \\Rightarrow DI = EK$.\n` +
`Mặt khác, $D, A, I$ cùng nằm trên đường thẳng $AB$; $E, M, K$ cùng nằm trên đường thẳng qua $M$ song song $AB$ (vì $ME \\parallel AD$).\n` +
`Suy ra $DI \\parallel EK$.\n` +
`Tứ giác $DIKE$ có $DI = EK$ và $DI \\parallel EK$ nên là hình bình hành.\n` +
`Do đó hai cạnh đối $DK = IE$ (đpcm).\n\n` +
`**c) Chứng minh 3 điểm K, O, I thẳng hàng:**\n` +
`Tứ giác $ADME$ là hình chữ nhật, $O$ là giao điểm của hai đường chéo $AM$ và $DE$ nên $O$ là trung điểm của $DE$.\n` +
`Trong hình bình hành $DIKE$, hai đường chéo $DK$ và $IE$ cắt nhau tại trung điểm của mỗi đường.\n` +
`Mặt khác, hình bình hành $DIKE$ có $DE$ là đường chéo? Không, $DE$ và $IK$ không phải là đường chéo.\n` +
`Thực chất, xét hình bình hành $AIMK$ (do $AI = MK = AD$ và $AI \\parallel MK$), hai đường chéo $AM$ và $IK$ cắt nhau tại trung điểm của mỗi đường.\n` +
`Mà $O$ là trung điểm $AM$ (do tính chất hcn $ADME$), suy ra $O$ cũng là trung điểm của $IK$.\n` +
`Vậy $I, O, K$ thẳng hàng.\n\n` +
`**d) Chứng minh tứ giác DPQE là hình thang vuông:**\n` +
`Trong $\\Delta BDM$ vuông tại $D$, $DP$ là đường trung tuyến ứng với cạnh huyền $BM$ $\\Rightarrow DP = PM = PB \\Rightarrow \\Delta PDM$ cân tại $P \\Rightarrow \\widehat{PDM} = \\widehat{PMD}$.\n` +
`Ta có $\\widehat{PDE} = \\widehat{PDM} + \\widehat{MDE}$.\n` +
`Mà $\\widehat{MDE} = \\widehat{MAD}$ (tính chất hcn $ADME$).\n` +
`Lại có $\\widehat{PMD} + \\widehat{MAD} = 90^\\circ$ (vì $\\Delta ABM$ vuông tại $M$, $AM \\perp BC$).\n` +
`Suy ra $\\widehat{PDE} = \\widehat{PMD} + \\widehat{MAD} = 90^\\circ \\Rightarrow DP \\perp DE$.\n` +
`Chứng minh tương tự, $EQ \\perp DE$.\n` +
`Vậy $DP \\parallel EQ$ (cùng $\\perp DE$) và có góc vuông nên $DPQE$ là hình thang vuông.`;

  const sol4 = `**1)** $(x - 1)(x + 2) - x(x - 2) = -5$\n` +
`$\\Leftrightarrow (x^2 + 2x - x - 2) - (x^2 - 2x) = -5$\n` +
`$\\Leftrightarrow x^2 + x - 2 - x^2 + 2x = -5$\n` +
`$\\Leftrightarrow 3x - 2 = -5 \\Leftrightarrow 3x = -3 \\Rightarrow x = -1$.\n` +
`Vậy $x = -1$.\n\n` +
`**2)** $3x(x - 5) - 10 + 2x = 0$\n` +
`$\\Leftrightarrow 3x(x - 5) + 2x - 10 = 0$\n` +
`$\\Leftrightarrow 3x(x - 5) + 2(x - 5) = 0$\n` +
`$\\Leftrightarrow (x - 5)(3x + 2) = 0$\n` +
`$\\Rightarrow x - 5 = 0 \\Rightarrow x = 5$\n` +
`hoặc $3x + 2 = 0 \\Rightarrow x = -\\frac{2}{3}$.\n` +
`Vậy $x = 5$ hoặc $x = -\\frac{2}{3}$.`;

  const sol5 = `**1. Tính giá trị của A khi $|2x - 1| = 3$:**\n` +
`$|2x - 1| = 3 \\Rightarrow 2x - 1 = 3$ hoặc $2x - 1 = -3$.\n` +
`- Với $2x - 1 = 3 \\Rightarrow x = 2$ (Loại vì vi phạm ĐKXĐ $x \\ne 2$).\n` +
`- Với $2x - 1 = -3 \\Rightarrow 2x = -2 \\Rightarrow x = -1$ (Thỏa mãn ĐKXĐ).\n` +
`Tại $x = -1$, thay vào $A = \\frac{x + 2}{(x - 2)^2}$ ta được: $A = \\frac{-1 + 2}{(-1 - 2)^2} = \\frac{1}{(-3)^2} = \\frac{1}{9}$.\n\n` +
`**2. Rút gọn B và tính P:**\n` +
`$B = \\frac{x + 2}{x} + \\frac{1}{x - 2} + \\frac{6 - x^2}{x(x - 2)}$\n` +
`Mẫu chung là $x(x - 2)$:\n` +
`$B = \\frac{(x + 2)(x - 2) + x + 6 - x^2}{x(x - 2)}$\n` +
`$B = \\frac{x^2 - 4 + x + 6 - x^2}{x(x - 2)} = \\frac{x + 2}{x(x - 2)}$.\n` +
`Ta có $P = A : B = \\frac{x + 2}{(x - 2)^2} : \\frac{x + 2}{x(x - 2)} = \\frac{x + 2}{(x - 2)^2} \\cdot \\frac{x(x - 2)}{x + 2} = \\frac{x}{x - 2}$ (đpcm).\n\n` +
`**3. Tìm x để P < 1:**\n` +
`$P < 1 \\Leftrightarrow \\frac{x}{x - 2} < 1 \\Leftrightarrow \\frac{x}{x - 2} - 1 < 0 \\Leftrightarrow \\frac{x - (x - 2)}{x - 2} < 0$\n` +
`$\\Leftrightarrow \\frac{2}{x - 2} < 0$.\n` +
`Vì $2 > 0$ nên $x - 2 < 0 \\Rightarrow x < 2$.\n` +
`Kết hợp điều kiện xác định ($x \\ne 0, x \\ne \\pm 2$), ta được:\n` +
`$x < 2$ và $x \\ne 0, x \\ne -2$.`;

  const sol6 = `**a) Thu gọn biểu thức M:**\n` +
`$M = (4x + 3)^2 - 2x(x + 6) - 5(x - 2)(x + 2)$\n` +
`$M = (16x^2 + 24x + 9) - (2x^2 + 12x) - 5(x^2 - 4)$\n` +
`$M = 16x^2 + 24x + 9 - 2x^2 - 12x - 5x^2 + 20$\n` +
`$M = 9x^2 + 12x + 29$.\n\n` +
`**b) Tính giá trị biểu thức tại $x = -2$:**\n` +
`Thay $x = -2$ vào biểu thức đã thu gọn:\n` +
`$M = 9(-2)^2 + 12(-2) + 29 = 9(4) - 24 + 29 = 36 - 24 + 29 = 41$.\n\n` +
`**c) Chứng minh biểu thức M luôn dương:**\n` +
`Ta biến đổi $M = 9x^2 + 12x + 29$\n` +
`$M = (3x)^2 + 2 \\cdot (3x) \\cdot 2 + 4 + 25$\n` +
`$M = (3x + 2)^2 + 25$.\n` +
`Vì $(3x + 2)^2 \\ge 0$ với mọi $x$, nên $M = (3x + 2)^2 + 25 \\ge 25 > 0$ với mọi $x$.\n` +
`Vậy biểu thức $M$ luôn dương (đpcm).`;

  const sol7 = `**a) Chứng minh các tứ giác MNCP và BMPN là hình bình hành:**\n` +
`- Tứ giác $MNCP$ có $MN \\parallel CP$ (do $MN \\parallel AC$) và $MP \\parallel CN$ (do $MP \\parallel BC$).\n` +
`Tứ giác có 2 cặp cạnh đối song song nên $MNCP$ là hình bình hành.\n- Xét $\\Delta ABC$, $M$ là trung điểm $AB$, $MN \\parallel AC \\Rightarrow N$ là trung điểm $BC$.\n` +
`Tương tự $P$ là trung điểm $AC$.\n` +
`Khi đó $MN$ là đường trung bình $\\Rightarrow MN = \\frac{1}{2}AC = AP = PC$. \n` +
`Tương tự $MP$ là đường trung bình $\\Rightarrow MP = \\frac{1}{2}BC = BN = NC$.\n` +
`Tứ giác $BMPN$ có $MP \\parallel BN$ và $MP = BN$ nên $BMPN$ là hình bình hành.\n\n` +
`**b) Chứng minh $IQ = \\frac{1}{4}BC$:** *(Lưu ý: Đề gốc ghi $\\frac{1}{2}BC$ là lỗi đánh máy, chính xác phải là $\\frac{1}{4}BC$)*\n` +
`Hình bình hành $BMPN$ có hai đường chéo $MN$ và $BP$ cắt nhau tại $I \\Rightarrow I$ là trung điểm $MN$.\n` +
`Hình bình hành $MNCP$ có hai đường chéo $MC$ và $PN$ cắt nhau tại $Q \\Rightarrow Q$ là trung điểm $PN$.\n` +
`Xét $\\Delta MNP$, có $I$ là trung điểm $MN$, $Q$ là trung điểm $PN$ $\\Rightarrow IQ$ là đường trung bình của $\\Delta MNP$.\n` +
`$\\Rightarrow IQ = \\frac{1}{2}MP$.\n` +
`Mà $MP = \\frac{1}{2}BC$ (chứng minh trên) $\\Rightarrow IQ = \\frac{1}{2} \\cdot \\frac{1}{2}BC = \\frac{1}{4}BC$ (đpcm).\n\n` +
`**c) Tam giác ABC có điều kiện gì thì BMPN là hình chữ nhật:**\n` +
`Hình bình hành $BMPN$ là hình chữ nhật khi và chỉ khi có 1 góc vuông, tức là $\\widehat{MBN} = 90^\\circ$.\n` +
`Hay góc $\\widehat{B}$ của $\\Delta ABC$ bằng $90^\\circ$.\n` +
`**Kết luận:** Điều kiện là $\\Delta ABC$ vuông tại $B$.`;

  const sol8 = `Gọi chiều rộng của sân vườn (phần rào vuông góc với tường) là $x$ (m, $x > 0$).\n` +
`Sân vườn hình chữ nhật cần rào 3 cạnh (do 1 chiều song song với tường không cần rào).\n` +
`Sẽ có 2 cạnh có chiều dài $x$ và 1 cạnh có chiều dài $y$ (song song với tường).\n` +
`Tổng chiều dài hàng rào là $15$m $\\Rightarrow 2x + y = 15 \\Rightarrow y = 15 - 2x$ (ĐK: $x < 7,5$).\n` +
`Diện tích sân vườn là $S = x \\cdot y = x(15 - 2x) = 15x - 2x^2$.\n` +
`Ta biến đổi để tìm GTLN của $S$:\n` +
`$S = -2\\left( x^2 - 7,5x \\right) = -2\\left( x^2 - 2 \\cdot x \\cdot 3,75 + 3,75^2 - 3,75^2 \\right)$\n` +
`$S = -2(x - 3,75)^2 + 2 \\cdot 3,75^2 = -2(x - 3,75)^2 + 28,125$.\n` +
`Vì $-2(x - 3,75)^2 \\le 0$ nên $S \\le 28,125$.\n` +
`Dấu \"=\" xảy ra khi $x = 3,75$ (m), khi đó $y = 15 - 2(3,75) = 7,5$ (m).\n` +
`**Kết luận:** Diện tích sân vườn lớn nhất có thể rào được là $28,125$ m$^2$.`;

  const sol9 = `**a)** $2x + 5 = 3 - x$\n` +
`$\\Leftrightarrow 2x + x = 3 - 5 \\Leftrightarrow 3x = -2 \\Rightarrow x = -\\frac{2}{3}$.\n\n` +
`**b)** $x^2 - 49 = 0$\n` +
`$\\Leftrightarrow (x - 7)(x + 7) = 0 \\Rightarrow x = 7$ hoặc $x = -7$.\n\n` +
`**c)** $\\frac{1}{x + 1} - \\frac{1}{x - 1} = \\frac{2x}{x^2 - 1}$\n` +
`Điều kiện xác định: $x \\ne 1; x \\ne -1$.\n` +
`Quy đồng mẫu và khử mẫu:\n` +
`$\\Leftrightarrow \\frac{x - 1}{(x + 1)(x - 1)} - \\frac{x + 1}{(x + 1)(x - 1)} = \\frac{2x}{(x + 1)(x - 1)}$\n` +
`$\\Rightarrow (x - 1) - (x + 1) = 2x$\n` +
`$\\Leftrightarrow x - 1 - x - 1 = 2x \\Leftrightarrow -2 = 2x \\Rightarrow x = -1$.\n` +
`Đối chiếu ĐKXĐ, $x = -1$ bị loại.\n` +
`**Kết luận:** Phương trình vô nghiệm.`;

  const sol10 = `**a)** $4x^4 + 4x^3 - x^2 - x$\n` +
`$= x(4x^3 + 4x^2 - x - 1)$\n` +
`$= x[4x^2(x + 1) - (x + 1)]$\n` +
`$= x(x + 1)(4x^2 - 1)$\n` +
`$= x(x + 1)(2x - 1)(2x + 1)$.\n\n` +
`**b)** $1 - 2a + 2bc + a^2 - b^2 - c^2$\n` +
`Sắp xếp lại:\n` +
`$= (a^2 - 2a + 1) - (b^2 - 2bc + c^2)$\n` +
`$= (a - 1)^2 - (b - c)^2$\n` +
`Áp dụng hiệu hai bình phương:\n` +
`$= (a - 1 - b + c)(a - 1 + b - c)$.\n\n` +
`**c)** $(x - 7)(x - 5)(x - 4)(x - 2) - 72$\n` +
`Nhóm hợp lý: $[(x - 7)(x - 2)] \\cdot [(x - 5)(x - 4)] - 72$\n` +
`$= (x^2 - 9x + 14)(x^2 - 9x + 20) - 72$\n` +
`Đặt $t = x^2 - 9x + 17$, biểu thức trở thành:\n` +
`$(t - 3)(t + 3) - 72 = t^2 - 9 - 72 = t^2 - 81$\n` +
`$= (t - 9)(t + 9)$\n` +
`Thay $t$ trở lại:\n` +
`$= (x^2 - 9x + 17 - 9)(x^2 - 9x + 17 + 9)$\n` +
`$= (x^2 - 9x + 8)(x^2 - 9x + 26)$\n` +
`$= (x - 1)(x - 8)(x^2 - 9x + 26)$.`;

  const updates = [
    { id: "9294eebd-3081-4428-aef8-361147e97d76", solution: sol1 },
    { id: "93b7f7dc-abf0-416d-ae1d-2f3bbc12a1c4", solution: sol2 },
    { id: "93df999f-8feb-42ef-86ac-b38e95a63c3b", solution: sol3 },
    { id: "94beaf20-bd90-414c-9d9c-9a59bba6dffd", solution: sol4 },
    { id: "94c4be08-8722-45fb-9b8e-958c4713992c", solution: sol5 },
    { id: "957f4510-44b4-4564-9064-27e227f37fbe", solution: sol6 },
    { id: "969175ea-161e-40c5-8da9-05169e7a8329", solution: sol7 },
    { id: "993534a8-1d2e-4729-8fe2-45d489b2f887", solution: sol8 },
    { id: "9a092f08-8cca-4d92-bc87-bf758397a488", solution: sol9 },
    { id: "9a58f63d-3212-47a5-a721-3f3e5ab35bce", solution: sol10 }
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

manualFixBatch15Grade8().catch(console.error).finally(() => process.exit(0));
