import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch17Grade8() {
  const sql = getDb();

  const sol1 = `Ta có phương trình:\n` +
`$(x + 5)^2 = 25$\n` +
`$\\Leftrightarrow (x + 5)^2 = 5^2$\n` +
`$\\Rightarrow x + 5 = 5$ hoặc $x + 5 = -5$.\n` +
`- Trường hợp 1: $x + 5 = 5 \\Leftrightarrow x = 0$.\n` +
`- Trường hợp 2: $x + 5 = -5 \\Leftrightarrow x = -10$.\n` +
`**Kết luận:** Tập nghiệm của phương trình là $S = \\{0; -10\\}$.`;

  const sol2 = `**1. Tính giá trị của biểu thức B khi $x = -3$:**\n` +
`Thay $x = -3$ (thỏa mãn ĐKXĐ) vào $B = \\frac{x + 2}{3x + 2}$:\n` +
`$B = \\frac{-3 + 2}{3(-3) + 2} = \\frac{-1}{-9 + 2} = \\frac{-1}{-7} = \\frac{1}{7}$.\n\n` +
`**2. Rút gọn biểu thức M = A.B:**\n` +
`Rút gọn $A$ với mẫu chung là $x^2 - 4 = (x - 2)(x + 2)$:\n` +
`$A = \\frac{1}{x + 2} + \\frac{2x}{x^2 - 4} + \\frac{3}{x - 2}$\n` +
`$A = \\frac{x - 2 + 2x + 3(x + 2)}{(x - 2)(x + 2)}$\n` +
`$A = \\frac{x - 2 + 2x + 3x + 6}{(x - 2)(x + 2)} = \\frac{6x + 4}{(x - 2)(x + 2)} = \\frac{2(3x + 2)}{(x - 2)(x + 2)}$.\n` +
`Khi đó: $M = A \\cdot B = \\frac{2(3x + 2)}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{3x + 2} = \\frac{2}{x - 2}$.\n\n` +
`**3. Tìm giá trị nhỏ nhất của biểu thức N:**\n` +
`$N = M \\cdot (x^3 - x^2 - 2x) = \\frac{2}{x - 2} \\cdot x(x^2 - x - 2)$\n` +
`$N = \\frac{2}{x - 2} \\cdot x(x - 2)(x + 1) = 2x(x + 1) = 2x^2 + 2x$.\n` +
`Biến đổi $N = 2\\left( x^2 + x + \\frac{1}{4} \\right) - \\frac{1}{2} = 2\\left( x + \\frac{1}{2} \\right)^2 - \\frac{1}{2}$.\n` +
`Vì $2\\left( x + \\frac{1}{2} \\right)^2 \\ge 0 \\Rightarrow N \\ge -\\frac{1}{2}$.\n` +
`Dấu \"=\" xảy ra khi $x = -\\frac{1}{2}$ (thỏa mãn ĐKXĐ).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $N$ là $-\\frac{1}{2}$ khi $x = -\\frac{1}{2}$.`;

  const sol3 = `**a) Chứng minh BCNM là hình thang cân:**\n` +
`$\\Delta ABC$ có $M, N$ là trung điểm $AB, AC \\Rightarrow MN$ là đường trung bình $\\Rightarrow MN \\parallel BC$.\n` +
`Tứ giác $BCNM$ có $MN \\parallel BC$ nên là hình thang.\n` +
`Hơn nữa $\\Delta ABC$ cân tại $A$ nên $\\widehat{B} = \\widehat{C}$. Vậy $BCNM$ là hình thang cân.\n\n` +
`**b) Chứng minh APCD là hình chữ nhật:**\n` +
`Tứ giác $APCD$ có $N$ là trung điểm đường chéo $AC$, $N$ là trung điểm đường chéo $PD$ (do $D$ đối xứng $P$ qua $N$).\n` +
`Suy ra $APCD$ là hình bình hành.\n` +
`$\\Delta ABC$ cân tại $A$, $AP$ là đường trung tuyến (do $P$ trung điểm $BC$) $\\Rightarrow AP \\perp BC \\Rightarrow \\widehat{APC} = 90^\\circ$.\n` +
`Hình bình hành có 1 góc vuông nên $APCD$ là hình chữ nhật.\n\n` +
`**c) Chứng minh $DG = \\frac{1}{3}BD$:**\n` +
`Do $APCD$ là hình chữ nhật $\\Rightarrow AD \\parallel PC$ và $AD = PC$. Mà $PC = BP$ (vì $P$ trung điểm $BC$).\n` +
`$\\Rightarrow AD \\parallel BP$ và $AD = BP \\Rightarrow ABPD$ là hình bình hành.\n` +
`$O$ là giao điểm của $BD$ và $AP$, nên $O$ là trung điểm của $AP$ và $BD$.\n` +
`Xét $\\Delta ADC$, có $DO$ là đường trung tuyến (vì $O$ trung điểm $AP$) và $CN$ là đường trung tuyến (vì $N$ trung điểm $AD$? Không, $N$ trung điểm $AC$).\n` +
`Thực ra $DO$ (hay $BD$) cắt $AC$ tại $G$, nên $G$ là giao điểm của trung tuyến $DO$ và cạnh $AC$. \n` +
`Trong $\\Delta ADC$, $DO$ là trung tuyến, $G$ nằm trên trung tuyến $DO$ và cắt $AC$. Do đó $G$ là trọng tâm $\\Delta ADC$ (bởi vì $AC$ và $DP$ cắt nhau tại trung điểm mỗi đường, đường thẳng qua $D, O$ chính là trung tuyến ứng với $AP$).\n` +
`Suy ra $DG = \\frac{2}{3}DO$. Mà $DO = \\frac{1}{2}BD \\Rightarrow DG = \\frac{2}{3} \\cdot \\frac{1}{2}BD = \\frac{1}{3}BD$ (đpcm).\n\n` +
`**d) Điều kiện để ONEP là hình vuông và tính diện tích:**\n` +
`$O, N$ là trung điểm $AP, AC \\Rightarrow ON$ là đường trung bình $\\Delta APC \\Rightarrow ON \\parallel PC$ hay $ON \\parallel PE$.\n` +
`Và $ON = \\frac{1}{2}PC = \\frac{1}{2}PE$? (Thực ra $E$ là hình chiếu của $N$ lên $BC \\Rightarrow NE \\perp BC$).\n` +
`Tứ giác $ONEP$ có $ON \\parallel PE$ và $NE \\perp PE \\Rightarrow ONEP$ là hình thang vuông.\n` +
`Đồng thời $OP$ nằm trên $AP \\perp BC \\Rightarrow OP \\parallel NE$. Vậy $ONEP$ là hình chữ nhật.\n` +
`Để $ONEP$ là hình vuông thì $ON = OP \\Leftrightarrow \\frac{1}{2}PC = \\frac{1}{2}AP \\Leftrightarrow PC = AP$.\n` +
`$\\Delta APC$ vuông tại $P$ có $PC = AP$ nên vuông cân tại $P \\Rightarrow \\widehat{C} = 45^\\circ$.\n` +
`Vậy $\\Delta ABC$ cân tại $A$ có $\\widehat{C} = 45^\\circ$ $\\Rightarrow \\Delta ABC$ vuông cân tại $A$.\n` +
`* Tính $S_{ABC}$ khi $PN = 2\\sqrt{2}$:\n` +
`$PN$ là đường trung bình $\\Delta ABC \\Rightarrow PN = \\frac{1}{2}AB \\Rightarrow AB = 4\\sqrt{2}$ cm.\n` +
`Diện tích $\\Delta ABC$ vuông cân: $S = \\frac{1}{2}AB \\cdot AC = \\frac{1}{2} \\cdot 4\\sqrt{2} \\cdot 4\\sqrt{2} = 16$ (cm$^2$).`;

  const sol4 = `**1)** $2x^2 - 18$\n` +
`$= 2(x^2 - 9)$\n` +
`$= 2(x - 3)(x + 3)$.\n\n` +
`**2)** $x^2 - 12x - y^2 + 36$\n` +
`Nhóm 3 hạng tử để tạo hằng đẳng thức:\n` +
`$= (x^2 - 12x + 36) - y^2$\n` +
`$= (x - 6)^2 - y^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (x - 6 - y)(x - 6 + y)$.`;

  const sol5 = `**a) Tính AD, DC:**\n` +
`Trong $\\Delta ABC$, $BD$ là đường phân giác của góc $B$, theo tính chất đường phân giác ta có:\n` +
`$\\frac{AD}{DC} = \\frac{AB}{BC} = \\frac{4}{6} = \\frac{2}{3}$.\n` +
`Theo tính chất dãy tỉ số bằng nhau:\n` +
`$\\frac{AD}{2} = \\frac{DC}{3} = \\frac{AD + DC}{2 + 3} = \\frac{AC}{5} = \\frac{5}{5} = 1$.\n` +
`$\\Rightarrow AD = 2$ (cm), $DC = 3$ (cm).\n\n` +
`**b) Tính AM:**\n` +
`Gọi giao điểm của đường thẳng qua $A$ song song $BC$ cắt $BD$ kéo dài tại $M$.\n` +
`Do $AM \\parallel BC$, áp dụng hệ quả định lý Thales (hoặc xét $\\Delta ADM \\sim \\Delta CDB$):\n` +
`$\\frac{AM}{BC} = \\frac{AD}{DC} = \\frac{2}{3}$.\n` +
`$\\Rightarrow AM = \\frac{2}{3} \\cdot BC = \\frac{2}{3} \\cdot 6 = 4$ (cm).\n\n` +
`**c) Tính tỷ số $\\frac{AE}{NE}$:**\n` +
`Điểm $N$ nằm trên tia đối của tia $BC$ và $BN = BC$, góc $\\widehat{ABC}$ và $\\widehat{ABN}$ là hai góc kề bù.\n` +
`$BD$ là phân giác trong của góc $\\widehat{ABC}$. Mà $BE \\perp BD$ ($E \\in AN$).\n` +
`Trong một tam giác, đường phân giác ngoài vuông góc với đường phân giác trong tại cùng một đỉnh.\n` +
`Do đó, $BE$ chính là đường phân giác của góc $\\widehat{ABN}$ trong $\\Delta ABN$.\n` +
`Áp dụng tính chất đường phân giác cho $\\Delta ABN$ với phân giác $BE$:\n` +
`$\\frac{AE}{NE} = \\frac{AB}{BN}$.\n` +
`Vì $BN = BC = 6$ (cm) và $AB = 4$ (cm):\n` +
`$\\Rightarrow \\frac{AE}{NE} = \\frac{4}{6} = \\frac{2}{3}$.`;

  const sol6 = `**1. Rút gọn A:**\n` +
`ĐKXĐ: $x \\ne \\pm 2$.\n` +
`Cụm 1: $\\frac{x}{x^2 - 4} + \\frac{1}{x + 2} - \\frac{2}{x - 2} = \\frac{x + (x - 2) - 2(x + 2)}{(x - 2)(x + 2)} = \\frac{x + x - 2 - 2x - 4}{x^2 - 4} = \\frac{-6}{(x - 2)(x + 2)}$.\n` +
`Cụm 2: $1 - \\frac{x}{x + 2} = \\frac{x + 2 - x}{x + 2} = \\frac{2}{x + 2}$.\n` +
`Chia hai cụm:\n` +
`$A = \\frac{-6}{(x - 2)(x + 2)} : \\frac{2}{x + 2} = \\frac{-6}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{2} = \\frac{-3}{x - 2}$.\n\n` +
`**2. Tính giá trị của A khi x = -4:**\n` +
`Tại $x = -4$ (thỏa mãn ĐKXĐ), $A = \\frac{-3}{-4 - 2} = \\frac{-3}{-6} = \\frac{1}{2}$.\n\n` +
`**3. Tìm giá trị nguyên của x để A nguyên:**\n` +
`$A = \\frac{-3}{x - 2}$. Để $A \\in \\mathbb{Z}$ thì $x - 2$ phải là ước của $-3$.\n` +
`$U(-3) = \\{1; -1; 3; -3\\}$.\n` +
`- $x - 2 = 1 \\Rightarrow x = 3$ (TM)\n` +
`- $x - 2 = -1 \\Rightarrow x = 1$ (TM)\n` +
`- $x - 2 = 3 \\Rightarrow x = 5$ (TM)\n` +
`- $x - 2 = -3 \\Rightarrow x = -1$ (TM)\n` +
`Vậy $x \\in \\{-1; 1; 3; 5\\}$.`;

  const sol7 = `**1. Rút gọn P và tìm ĐKXĐ:**\n` +
`ĐKXĐ: $x \\ne \\pm 3; x \\ne -2$.\n` +
`Phân thức trong ngoặc:\n` +
`$\\frac{2x - 1}{x + 3} + \\frac{x}{x - 3} - \\frac{3 - 10x}{(x - 3)(x + 3)}$\n` +
`$= \\frac{(2x - 1)(x - 3) + x(x + 3) - (3 - 10x)}{(x - 3)(x + 3)}$\n` +
`$= \\frac{2x^2 - 7x + 3 + x^2 + 3x - 3 + 10x}{(x - 3)(x + 3)} = \\frac{3x^2 + 6x}{(x - 3)(x + 3)} = \\frac{3x(x + 2)}{(x - 3)(x + 3)}$.\n` +
`Khi đó $P = \\frac{3x(x + 2)}{(x - 3)(x + 3)} : \\frac{x + 2}{x - 3} = \\frac{3x(x + 2)}{(x - 3)(x + 3)} \\cdot \\frac{x - 3}{x + 2} = \\frac{3x}{x + 3}$.\n\n` +
`**2. Tính giá trị P khi $x^2 - 7x + 12 = 0$:**\n` +
`$x^2 - 7x + 12 = 0 \\Leftrightarrow (x - 3)(x - 4) = 0 \\Rightarrow x = 3$ hoặc $x = 4$.\n` +
`Đối chiếu ĐKXĐ, $x = 3$ bị loại. Nhận $x = 4$.\n` +
`Tại $x = 4 \\Rightarrow P = \\frac{3 \\cdot 4}{4 + 3} = \\frac{12}{7}$.\n\n` +
`**3. Tìm x nguyên để P có giá trị nguyên dương:**\n` +
`$P = \\frac{3x}{x + 3} = \\frac{3x + 9 - 9}{x + 3} = 3 - \\frac{9}{x + 3}$.\n` +
`Để $P \\in \\mathbb{Z}$ thì $x + 3 \\in U(9) = \\{1; -1; 3; -3; 9; -9\\}$.\n` +
`Tính x và đối chiếu $P > 0$:\n` +
`- $x + 3 = 1 \\Rightarrow x = -2$ (Loại vì vi phạm ĐKXĐ)\n` +
`- $x + 3 = -1 \\Rightarrow x = -4 \\Rightarrow P = 3 - (-9) = 12 > 0$ (Nhận)\n` +
`- $x + 3 = 3 \\Rightarrow x = 0 \\Rightarrow P = 3 - 3 = 0$ (Loại vì $0$ không dương)\n` +
`- $x + 3 = -3 \\Rightarrow x = -6 \\Rightarrow P = 3 - (-3) = 6 > 0$ (Nhận)\n` +
`- $x + 3 = 9 \\Rightarrow x = 6 \\Rightarrow P = 3 - 1 = 2 > 0$ (Nhận)\n` +
`- $x + 3 = -9 \\Rightarrow x = -12 \\Rightarrow P = 3 - (-1) = 4 > 0$ (Nhận)\n` +
`Vậy $x \\in \\{-12; -6; -4; 6\\}$.`;

  const sol8 = `Điều kiện xác định: $x \\ne 1; x \\ne -1$.\n` +
`$\\frac{x + 3}{x - 1} = \\frac{x + m}{x + 1}$\n` +
`Quy đồng khử mẫu:\n` +
`$(x + 3)(x + 1) = (x + m)(x - 1)$\n` +
`$\\Leftrightarrow x^2 + 4x + 3 = x^2 + (m - 1)x - m$\n` +
`$\\Leftrightarrow 4x - (m - 1)x = -m - 3$\n` +
`$\\Leftrightarrow (5 - m)x = -m - 3$ (*)\n` +
`**Biện luận:**\n` +
`- Nếu $5 - m = 0 \\Leftrightarrow m = 5$: Phương trình (*) trở thành $0x = -8$ (Vô nghiệm).\n` +
`- Nếu $5 - m \\ne 0 \\Leftrightarrow m \\ne 5$: Phương trình (*) có nghiệm duy nhất $x = \\frac{-m - 3}{5 - m} = \\frac{m + 3}{m - 5}$.\n` +
`Tuy nhiên, để là nghiệm của pt ban đầu, $x$ phải thỏa mãn ĐKXĐ:\n` +
`+ $x \\ne 1 \\Leftrightarrow \\frac{m + 3}{m - 5} \\ne 1 \\Leftrightarrow m + 3 \\ne m - 5 \\Leftrightarrow 3 \\ne -5$ (Luôn đúng).\n` +
`+ $x \\ne -1 \\Leftrightarrow \\frac{m + 3}{m - 5} \\ne -1 \\Leftrightarrow m + 3 \\ne -(m - 5) \\Leftrightarrow m + 3 \\ne -m + 5 \\Leftrightarrow 2m \\ne 2 \\Leftrightarrow m \\ne 1$.\n` +
`**Kết luận:**\n` +
`+ Với $m = 1$ hoặc $m = 5$: Phương trình vô nghiệm.\n` +
`+ Với $m \\ne 1$ và $m \\ne 5$: Phương trình có nghiệm duy nhất $x = \\frac{m + 3}{m - 5}$.`;

  const sol9 = `Thực hiện phép tính (nhân đa thức và thu gọn):\n` +
`$15 + x + (x - 5)(2x + 3) - 2x(x - 3)$\n` +
`$= 15 + x + (2x^2 + 3x - 10x - 15) - (2x^2 - 6x)$\n` +
`$= 15 + x + 2x^2 - 7x - 15 - 2x^2 + 6x$\n` +
`$= (2x^2 - 2x^2) + (x - 7x + 6x) + (15 - 15)$\n` +
`$= 0x + 0 = 0$.\n` +
`Kết quả phép tính bằng $0$.`;

  const sol10 = `**1. Tính giá trị của A khi x = -3:**\n` +
`$A = x^3 + 6x^2 + 12x + 8$\n` +
`$A = x^3 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 + 2^3$\n` +
`$A = (x + 2)^3$.\n` +
`Tại $x = -3$, $A = (-3 + 2)^3 = (-1)^3 = -1$.\n\n` +
`**2. Cho x + y = 1. Tính giá trị của B:**\n` +
`$B = x^3 + y^3 + 3(xy - 1)$\n` +
`Áp dụng hằng đẳng thức $x^3 + y^3 = (x + y)(x^2 - xy + y^2)$:\n` +
`$B = (x + y)(x^2 - xy + y^2) + 3xy - 3$\n` +
`Vì $x + y = 1$ nên:\n` +
`$B = 1 \\cdot (x^2 - xy + y^2) + 3xy - 3$\n` +
`$B = x^2 + 2xy + y^2 - 3$\n` +
`$B = (x + y)^2 - 3$\n` +
`Thay $x + y = 1$ vào:\n` +
`$B = 1^2 - 3 = -2$.\n` +
`**Kết luận:** $B = -2$.`;

  const updates = [
    { id: "a280112d-1652-4775-b5a8-b9913446b37e", solution: sol1 },
    { id: "a34bf55f-8dc4-4374-9bf8-f95908309c16", solution: sol2 },
    { id: "a3b9de6d-0d02-4988-bde5-2f7a34f639d5", solution: sol3 },
    { id: "a45dec01-6c8f-4ed2-8d5c-6324fe66ad57", solution: sol4 },
    { id: "a501ca2d-66aa-4939-a3e3-961a8f0780b2", solution: sol5 },
    { id: "a519e2b1-426e-46e4-98a4-7e6423375df7", solution: sol6 },
    { id: "a64e5080-e657-4cdd-98e3-c6b819eeddd7", solution: sol7 },
    { id: "a669ac7d-bb9b-47e6-9373-db0dec549b53", solution: sol8 },
    { id: "a69060b0-2461-42d8-a58d-a9fe91f2471b", solution: sol9 },
    { id: "a6c1e1b2-887d-47e2-aec5-f478ac897103", solution: sol10 }
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

manualFixBatch17Grade8().catch(console.error).finally(() => process.exit(0));
