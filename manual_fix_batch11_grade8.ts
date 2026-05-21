import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch11Grade8() {
  const sql = getDb();

  const sol1 = `*(Đây là câu hỏi lý thuyết trắc nghiệm chưa đầy đủ đáp án. Phương pháp nhận biết chung được cung cấp dưới đây).* \n\n` +
`**Phương pháp nhận biết phương trình bậc nhất một ẩn:**\n` +
`Phương trình bậc nhất một ẩn là phương trình có dạng $ax + b = 0$, trong đó:\n` +
`- $x$ là ẩn số.\n` +
`- $a$ và $b$ là các hằng số đã cho.\n` +
`- Điều kiện bắt buộc: $a \\ne 0$.\n\n` +
`*Ví dụ:* $2x - 5 = 0$; $\\frac{1}{2}x + 3 = 0$ là các phương trình bậc nhất một ẩn.`;

  const sol2 = `Ta có biểu thức: $M = 5x^2 + 9y^2 - 12xy + 24x - 48y + 81$\n` +
`Ta sẽ nhóm và hoàn thành bình phương:\n` +
`$M = (4x^2 - 12xy + 9y^2 + 32x - 48y + 64) + (x^2 - 8x + 16) + 1$\n` +
`Giải thích việc tách:\n` +
`- Nhóm 1: $(2x - 3y)^2 + 16(2x - 3y) + 64 = (2x - 3y + 8)^2$\n` +
`- Nhóm 2: $x^2 - 8x + 16 = (x - 4)^2$\n` +
`- Phần dư: $64 + 16 + 1 = 81$ (vừa khớp với hằng số đề bài).\n\n` +
`Do đó: $M = (2x - 3y + 8)^2 + (x - 4)^2 + 1$.\n` +
`Vì $(2x - 3y + 8)^2 \\ge 0$ và $(x - 4)^2 \\ge 0$ với mọi $x, y$.\n` +
`Nên $M \\ge 1$ với mọi $x, y$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} x - 4 = 0 \\\\ 2x - 3y + 8 = 0 \\end{cases} \\Rightarrow \\begin{cases} x = 4 \\\\ 2(4) - 3y + 8 = 0 \\end{cases} \\Rightarrow \\begin{cases} x = 4 \\\\ 3y = 16 \\end{cases} \\Rightarrow x = 4, y = \\frac{16}{3}$.\n` +
`**Kết luận:** Giá trị nhỏ nhất của $M$ là $1$.`;

  const sol3 = `*(Lưu ý: Đề bài ghi $x \\ne 1$ có thể là lỗi đánh máy, điều kiện đúng để mẫu thức khác $0$ là $x \\ne -1$)*.\n\n` +
`Điều kiện xác định: $x^2 + 2x + 1 \\ne 0 \\Leftrightarrow (x + 1)^2 \\ne 0 \\Leftrightarrow x \\ne -1$.\n` +
`Ta có: $A = \\frac{2x^2 + 2x + 1}{x^2 + 2x + 1}$\n` +
`Biến đổi tử thức: $2x^2 + 2x + 1 = (x^2 + 2x + 1) + x^2 = (x + 1)^2 + x^2$.\n` +
`Khi đó: $A = \\frac{(x + 1)^2 + x^2}{(x + 1)^2} = 1 + \\frac{x^2}{(x + 1)^2} = 1 + \\left( \\frac{x}{x + 1} \\right)^2$.\n` +
`Vì $\\left( \\frac{x}{x + 1} \\right)^2 \\ge 0$ với mọi $x \\ne -1$.\n` +
`Nên $A \\ge 1$ với mọi $x \\ne -1$.\n` +
`Dấu \"=\" xảy ra khi $\\frac{x}{x + 1} = 0 \\Leftrightarrow x = 0$ (thỏa mãn ĐKXĐ).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $A$ là $1$ khi $x = 0$.`;

  const sol4 = `Áp dụng bất đẳng thức Bunhiacopxki (Cauchy-Schwarz dạng phân thức) cho 3 bộ số, ta có:\n` +
`$\\left( \\frac{1}{16x^2} + \\frac{1}{4y^2} + \\frac{1}{z^2} \\right)(x^2 + y^2 + z^2) \\ge \\left( \\frac{1}{\\sqrt{16}} + \\frac{1}{\\sqrt{4}} + \\frac{1}{\\sqrt{1}} \\right)^2$\n` +
`$\\Leftrightarrow M \\cdot (x^2 + y^2 + z^2) \\ge \\left( \\frac{1}{4} + \\frac{1}{2} + 1 \\right)^2$\n` +
`Theo giả thiết $x^2 + y^2 + z^2 = 1$, ta có:\n` +
`$M \\cdot 1 \\ge \\left( \\frac{7}{4} \\right)^2 = \\frac{49}{16}$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\frac{x^2}{\\frac{1}{4}} = \\frac{y^2}{\\frac{1}{2}} = \\frac{z^2}{1} = \\frac{x^2 + y^2 + z^2}{\\frac{1}{4} + \\frac{1}{2} + 1} = \\frac{1}{\\frac{7}{4}} = \\frac{4}{7}$.\n` +
`$\\Rightarrow x^2 = \\frac{1}{4} \\cdot \\frac{4}{7} = \\frac{1}{7} \\Rightarrow x = \\frac{1}{\\sqrt{7}}$\n` +
`$\\Rightarrow y^2 = \\frac{1}{2} \\cdot \\frac{4}{7} = \\frac{2}{7} \\Rightarrow y = \\sqrt{\\frac{2}{7}}$\n` +
`$\\Rightarrow z^2 = 1 \\cdot \\frac{4}{7} = \\frac{4}{7} \\Rightarrow z = \\frac{2}{\\sqrt{7}}$\n` +
`(Vì $x, y, z > 0$).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $M$ là $\\frac{49}{16}$.`;

  const sol5 = `**1)** $(x + 3)^2 + (x - 3)^2 + 2(x^2 - 9)$\n` +
`$= (x + 3)^2 + 2(x + 3)(x - 3) + (x - 3)^2$\n` +
`Đây là hằng đẳng thức bình phương của một tổng $a^2 + 2ab + b^2 = (a + b)^2$:\n` +
`$= [(x + 3) + (x - 3)]^2$\n` +
`$= (2x)^2 = 4x^2$.\n\n` +
`**2)** $(4x - 1)^3 - (4x - 3)(16x^2 + 3)$\n` +
`Khai triển hằng đẳng thức lập phương một hiệu:\n` +
`$(4x - 1)^3 = (4x)^3 - 3(4x)^2 \\cdot 1 + 3(4x) \\cdot 1^2 - 1^3 = 64x^3 - 48x^2 + 12x - 1$.\n` +
`Nhân đa thức:\n` +
`$(4x - 3)(16x^2 + 3) = 64x^3 + 12x - 48x^2 - 9 = 64x^3 - 48x^2 + 12x - 9$.\n` +
`Trừ hai vế:\n` +
`$= (64x^3 - 48x^2 + 12x - 1) - (64x^3 - 48x^2 + 12x - 9)$\n` +
`$= 64x^3 - 48x^2 + 12x - 1 - 64x^3 + 48x^2 - 12x + 9$\n` +
`$= -1 + 9 = 8$.`;

  const sol6 = `*(Đây là câu hỏi lý thuyết trắc nghiệm chưa đầy đủ đáp án. Phương pháp nhận biết chung được cung cấp dưới đây).* \n\n` +
`**Phương pháp nhận biết phương trình bậc nhất một ẩn:**\n` +
`Phương trình bậc nhất một ẩn là phương trình có dạng $ax + b = 0$, trong đó:\n` +
`- $x$ là ẩn số.\n` +
`- $a$ và $b$ là các hằng số đã cho.\n` +
`- Điều kiện bắt buộc: $a \\ne 0$.\n\n` +
`*Ví dụ:* $2x - 5 = 0$; $\\frac{1}{2}x + 3 = 0$ là các phương trình bậc nhất một ẩn.`;

  const sol7 = `**a)** $4x^2y - 2xy^2$\n` +
`Đặt nhân tử chung là $2xy$:\n` +
`$= 2xy(2x - y)$.\n\n` +
`**b)** $x^2 - 2xy + y^2 - 9$\n` +
`Nhóm 3 hạng tử đầu tạo hằng đẳng thức:\n` +
`$= (x - y)^2 - 3^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (x - y - 3)(x - y + 3)$.\n\n` +
`**c)** $(x + 2)(x^2 - 2x) - 3x - 6$\n` +
`$= (x + 2)(x^2 - 2x) - 3(x + 2)$\n` +
`$= (x + 2)(x^2 - 2x - 3)$\n` +
`Phân tích tiếp $x^2 - 2x - 3 = x^2 - 3x + x - 3 = x(x - 3) + (x - 3) = (x - 3)(x + 1)$.\n` +
`$= (x + 2)(x - 3)(x + 1)$.`;

  const sol8 = `Điều kiện xác định: $x \\ne -1; x \\ne 0$.\n` +
`Phương trình: $\\frac{x + a}{x + 1} + \\frac{x - 2}{x} = 2$\n` +
`Quy đồng khử mẫu với mẫu chung $x(x + 1)$:\n` +
`$x(x + a) + (x + 1)(x - 2) = 2x(x + 1)$\n` +
`$\\Leftrightarrow x^2 + ax + x^2 - x - 2 = 2x^2 + 2x$\n` +
`$\\Leftrightarrow 2x^2 + (a - 1)x - 2 = 2x^2 + 2x$\n` +
`$\\Leftrightarrow (a - 1)x - 2x = 2$\n` +
`$\\Leftrightarrow (a - 3)x = 2$ (*)\n` +
`Phương trình ban đầu vô nghiệm khi và chỉ khi phương trình (*) vô nghiệm hoặc (*) có nghiệm nhưng vi phạm ĐKXĐ.\n` +
`- **Trường hợp 1:** (*) vô nghiệm $\\Leftrightarrow a - 3 = 0 \\Leftrightarrow a = 3$. (Khi đó $0x = 2$, vô nghiệm).\n` +
`- **Trường hợp 2:** (*) có nghiệm vi phạm ĐKXĐ.\n` +
`Nghiệm của (*) là $x = \\frac{2}{a - 3}$ (với $a \\ne 3$).\n` +
`Vi phạm ĐKXĐ tức là $x = 0$ hoặc $x = -1$.\n` +
`+ Nếu $x = 0 \\Rightarrow \\frac{2}{a - 3} = 0$ (Vô lý).\n` +
`+ Nếu $x = -1 \\Rightarrow \\frac{2}{a - 3} = -1 \\Rightarrow a - 3 = -2 \\Rightarrow a = 1$.\n` +
`**Kết luận:** Vậy với $a = 3$ hoặc $a = 1$ thì phương trình vô nghiệm.`;

  const sol9 = `Ta biến đổi biểu thức $B$:\n` +
`$B = -3x^2 - 12x - 8$\n` +
`$B = -3(x^2 + 4x) - 8$\n` +
`Thêm bớt để tạo hằng đẳng thức trong ngoặc:\n` +
`$B = -3(x^2 + 4x + 4 - 4) - 8$\n` +
`$B = -3[(x + 2)^2 - 4] - 8$\n` +
`$B = -3(x + 2)^2 + 12 - 8$\n` +
`$B = -3(x + 2)^2 + 4$.\n` +
`Vì $-3(x + 2)^2 \\le 0$ với mọi $x$, nên $B \\le 4$ với mọi $x$.\n` +
`Dấu \"=\" xảy ra khi $x + 2 = 0 \\Leftrightarrow x = -2$.\n` +
`**Kết luận:** Giá trị lớn nhất của $B$ là $4$ tại $x = -2$.`;

  const sol10 = `**a) Chứng minh $\\Delta ABC \\sim \\Delta HBA$ và $AB \\cdot AH = BH \\cdot AC$:**\n` +
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
`Trong $\\Delta AHC$, ta có $IK \\parallel AC$. Các đoạn thẳng $AH$ và $CH$ cắt nhau tại $H$.\n` +
`Tứ giác $AIKC$ là hình thang ($IK \\parallel AC$).\n` +
`Theo Bổ đề hình thang: Đường thẳng đi qua giao điểm của hai cạnh bên ($H$) và giao điểm của hai đường chéo ($M$) sẽ đi qua trung điểm của hai đáy.\n` +
`Do đó tia $HM$ sẽ đi qua trung điểm của đáy $AC$.\n` +
`Mà $N$ là trung điểm của $AC$ nên tia $HM$ đi qua $N$.\n` +
`Vậy $H, M, N$ thẳng hàng (đpcm).`;

  const updates = [
    { id: "681b9a42-a37f-475d-959c-a7039c14b06d", solution: sol1 },
    { id: "68bdb75a-72c0-42af-8fc8-5117eb9a8d93", solution: sol2 },
    { id: "69323b3a-74ea-49d1-8d48-f668b2e94833", solution: sol3 },
    { id: "6a1973c6-444e-433c-af9f-0fceb380125f", solution: sol4 },
    { id: "6b83b620-df0b-41f1-b4e0-96ba93ee18c6", solution: sol5 },
    { id: "6ca2a76c-3358-493d-82d7-c22a5933abf8", solution: sol6 },
    { id: "6d20af7b-764d-4b70-998f-c4333620bc39", solution: sol7 },
    { id: "712371c3-b8d4-42d0-86ca-fdd27d2ad155", solution: sol8 },
    { id: "71d6a5d9-a8ed-40a1-bc05-e7bd504c01c9", solution: sol9 },
    { id: "7368f073-9001-4091-ab54-d2a0dfc26afa", solution: sol10 }
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

manualFixBatch11Grade8().catch(console.error).finally(() => process.exit(0));
