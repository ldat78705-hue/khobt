import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch6Grade8() {
  const sql = getDb();

  const sol1 = `Giải phương trình: $x^4 + 3x^3 + 6x + 4 = 0$.\n` +
`Ta phân tích vế trái thành nhân tử bằng cách thêm bớt:\n` +
`$x^4 + 3x^3 + 6x + 4 = x^4 + 3x^3 + 2x^2 - 2x^2 + 6x + 4$\n` +
`$= (x^4 - x^3 + 2x^2) + (4x^3 - 4x^2 + 8x) + (2x^2 - 2x + 4)$\n` +
`$= x^2(x^2 - x + 2) + 4x(x^2 - x + 2) + 2(x^2 - x + 2)$\n` +
`$= (x^2 - x + 2)(x^2 + 4x + 2) = 0$\n\n` +
`Ta có hai trường hợp:\n` +
`**Trường hợp 1:** $x^2 - x + 2 = 0$\n` +
`Ta có $x^2 - x + 2 = (x - \\frac{1}{2})^2 + \\frac{7}{4} > 0$ với mọi $x$. Do đó phương trình này vô nghiệm.\n\n` +
`**Trường hợp 2:** $x^2 + 4x + 2 = 0$\n` +
`$\\Leftrightarrow (x + 2)^2 - 2 = 0 \\Leftrightarrow (x + 2)^2 = 2$\n` +
`$\\Rightarrow x + 2 = \\sqrt{2}$ hoặc $x + 2 = -\\sqrt{2}$\n` +
`$\\Rightarrow x = -2 + \\sqrt{2}$ hoặc $x = -2 - \\sqrt{2}$.\n\n` +
`**Kết luận:** Tập nghiệm của phương trình là $S = \\{-2 + \\sqrt{2}; -2 - \\sqrt{2}\\}$.`;

  const sol2 = `Ta có biểu thức: $A = a^4 - 2a^3 + 2a^2 - 2a + 2$\n` +
`Tiến hành phân tích biểu thức thành các bình phương:\n` +
`$A = (a^4 - 2a^3 + a^2) + (a^2 - 2a + 1) + 1$\n` +
`$A = (a^2 - a)^2 + (a - 1)^2 + 1$\n` +
`Vì $(a^2 - a)^2 \\ge 0$ và $(a - 1)^2 \\ge 0$ với mọi $a$.\n` +
`Do đó $A \\ge 1$ với mọi $a$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} a^2 - a = 0 \\\\ a - 1 = 0 \\end{cases} \\Leftrightarrow \\begin{cases} a(a - 1) = 0 \\\\ a = 1 \\end{cases} \\Rightarrow a = 1$.\n` +
`**Kết luận:** Giá trị nhỏ nhất của $A$ là $1$, đạt được khi $a = 1$.`;

  const sol3 = `Gọi năng suất dự định của phân xưởng là $x$ (sản phẩm/ngày) ($x \\in \\mathbb{N}^*$).\n` +
`Theo dự định, thời gian hoàn thành là $10$ ngày nên tổng số sản phẩm dự định sản xuất là $10x$ (sản phẩm).\n` +
`Trên thực tế, mỗi ngày phân xưởng sản xuất được $x + 20$ (sản phẩm).\n` +
`Thời gian hoàn thành thực tế là $10 - 2 = 8$ (ngày).\n` +
`Tổng số sản phẩm thực tế đã sản xuất là $8(x + 20)$ (sản phẩm).\n` +
`Vì xưởng làm vượt mức $40$ sản phẩm so với dự định, ta có phương trình:\n` +
`$8(x + 20) - 10x = 40$\n` +
`$\\Leftrightarrow 8x + 160 - 10x = 40$\n` +
`$\\Leftrightarrow -2x = 40 - 160$\n` +
`$\\Leftrightarrow -2x = -120 \\Rightarrow x = 60$ (thỏa mãn điều kiện).\n` +
`**Kết luận:** Năng suất dự định của phân xưởng là $60$ sản phẩm mỗi ngày.`;

  const sol4 = `**1)** $3x(2x^2 - 4x + 3)$\n` +
`$= 3x \\cdot 2x^2 - 3x \\cdot 4x + 3x \\cdot 3$\n` +
`$= 6x^3 - 12x^2 + 9x$.\n\n` +
`**2)** $(12x^2y^2 + 6xy) : 3xy$\n` +
`$= \\frac{12x^2y^2}{3xy} + \\frac{6xy}{3xy}$\n` +
`$= 4xy + 2$.\n\n` +
`**3)** $\\frac{x^2 + y^2}{x - y} + \\frac{2xy}{y - x}$\n` +
`Đổi dấu phân thức thứ hai: $\\frac{2xy}{y - x} = \\frac{-2xy}{x - y}$.\n` +
`Biểu thức trở thành:\n` +
`$= \\frac{x^2 + y^2}{x - y} - \\frac{2xy}{x - y}$\n` +
`$= \\frac{x^2 - 2xy + y^2}{x - y}$\n` +
`$= \\frac{(x - y)^2}{x - y} = x - y$.`;

  const sol5 = `**a) Chứng minh tứ giác ABEF là hình thoi:**\n` +
`Vì $E, F$ là trung điểm $BC, AD \\Rightarrow BE = \\frac{1}{2}BC$ và $AF = \\frac{1}{2}AD$.\n` +
`Mà $ABCD$ là hình bình hành nên $AD = BC$ và $AD \\parallel BC$.\n` +
`Suy ra $AF = BE$ và $AF \\parallel BE$, do đó tứ giác $ABEF$ là hình bình hành.\n` +
`Lại có $BC = 2AB$ (giả thiết) nên $BE = \\frac{1}{2}BC = AB$.\n` +
`Hình bình hành $ABEF$ có hai cạnh kề $AB = BE$ nên là hình thoi (đpcm).\n\n` +
`**b) Chứng minh $FI \\perp BC$:**\n` +
`Do $I$ đối xứng với $A$ qua $B$ nên $B$ là trung điểm $AI \\Rightarrow AB = BI$.\n` +
`Mà $ABEF$ là hình thoi nên $AB = BE$ và $AB \\parallel EF$.\n` +
`Suy ra $BI = BE$ và $BI \\parallel EF$. Do đó tứ giác $BEFI$ là hình bình hành.\n` +
`Hình bình hành $BEFI$ có $BI = BE$ nên là hình thoi.\n` +
`Theo tính chất hình thoi, hai đường chéo $FI$ và $BE$ vuông góc với nhau.\n` +
`Mà $E$ nằm trên $BC$, nên $FI \\perp BC$ (đpcm).\n\n` +
`**c) Chứng minh 3 điểm D, E, I thẳng hàng:**\n` +
`Ta có $CD \\parallel AB$ và $CD = AB$ (tính chất hình bình hành $ABCD$).\n` +
`Lại có $BI \\parallel AB$ và $BI = AB$ (do $I, B, A$ thẳng hàng và $B$ là trung điểm $AI$).\n` +
`Suy ra $CD \\parallel BI$ và $CD = BI$. Do đó tứ giác $BCDI$ là hình bình hành.\n` +
`Trong hình bình hành $BCDI$, hai đường chéo là $BD$ và $CI$ sẽ cắt nhau tại trung điểm của mỗi đường.\n` +
`Cạnh còn lại là đường chéo $BC$ và $DI$. Vì $E$ là trung điểm của đường chéo $BC$, nên $E$ cũng phải là trung điểm của đường chéo $DI$.\n` +
`Vậy $D, E, I$ thẳng hàng (đpcm).\n\n` +
`**d) Tính diện tích tam giác AED:**\n` +
`Kẻ đường cao $AH$ từ $A$ xuống $AD$ (không cần thiết). Gọi đường cao của hình bình hành $ABCD$ từ đỉnh $B$ xuống $AD$ là $h$.\n` +
`Diện tích $\\Delta AED$ chung đáy $AD$ và có đường cao từ $E$ xuống $AD$ bằng $h$.\n` +
`Nên $S_{AED} = \\frac{1}{2} \\cdot AD \\cdot h = \\frac{1}{2} S_{ABCD}$.\n` +
`Kẻ $BK \\perp AD$ tại $K$. Trong $\\Delta ABK$ vuông tại $K$, $\\widehat{BAK} = 60^\\circ \\Rightarrow h = BK = AB \\cdot \\sin 60^\\circ = 2 \\cdot \\frac{\\sqrt{3}}{2} = \\sqrt{3}$ cm.\n` +
`$AD = BC = 2AB = 4$ cm.\n` +
`$S_{ABCD} = AD \\cdot h = 4\\sqrt{3}$ (cm$^2$).\n` +
`$\\Rightarrow S_{AED} = 2\\sqrt{3}$ (cm$^2$).`;

  const sol6 = `Khẳng định: \"Hai tam giác cân thì đồng dạng với nhau\" là **SAI**.\n\n` +
`**Giải thích:**\n` +
`Hai tam giác cân chỉ đồng dạng với nhau khi chúng thỏa mãn thêm ít nhất một trong các điều kiện sau:\n` +
`1. Góc ở đỉnh của hai tam giác bằng nhau.\n` +
`2. Góc ở đáy của hai tam giác bằng nhau.\n` +
`3. Tỉ số giữa cạnh bên và cạnh đáy của hai tam giác bằng nhau.\n` +
`Nếu chỉ biết chúng là tam giác cân (ví dụ một tam giác cân có góc ở đỉnh là $30^\\circ$, một tam giác cân có góc ở đỉnh là $100^\\circ$) thì chúng hoàn toàn không đồng dạng.`;

  const sol7 = `**a)** $3x + 1 = \\frac{-7}{2}$\n` +
`$\\Leftrightarrow 3x = \\frac{-7}{2} - 1 = \\frac{-9}{2} \\Leftrightarrow x = \\frac{-9}{6} = -\\frac{3}{2}$.\n\n` +
`**b)** $\\frac{x + 4}{5} + \\frac{3x + 2}{10} = 7$\n` +
`$\\Leftrightarrow \\frac{2(x + 4) + 3x + 2}{10} = \\frac{70}{10}$\n` +
`$\\Leftrightarrow 2x + 8 + 3x + 2 = 70 \\Leftrightarrow 5x + 10 = 70 \\Leftrightarrow 5x = 60 \\Rightarrow x = 12$.\n\n` +
`**c)** $(3x - 5)^2 - 2(9x^2 - 25) = 0$\n` +
`$\\Leftrightarrow (3x - 5)^2 - 2(3x - 5)(3x + 5) = 0$\n` +
`$\\Leftrightarrow (3x - 5)[(3x - 5) - 2(3x + 5)] = 0$\n` +
`$\\Leftrightarrow (3x - 5)(3x - 5 - 6x - 10) = 0$\n` +
`$\\Leftrightarrow (3x - 5)(-3x - 15) = 0$\n` +
`$\\Rightarrow 3x - 5 = 0$ hoặc $-3x - 15 = 0 \\Rightarrow x = \\frac{5}{3}$ hoặc $x = -5$.\n\n` +
`**d)** $\\frac{x + 1}{x - 2} - \\frac{5}{x + 2} = \\frac{12}{x^2 - 4} + 1$ (ĐKXĐ: $x \\ne \\pm 2$)\n` +
`$\\Leftrightarrow \\frac{(x + 1)(x + 2) - 5(x - 2)}{(x - 2)(x + 2)} = \\frac{12 + (x^2 - 4)}{(x - 2)(x + 2)}$\n` +
`$\\Rightarrow x^2 + 3x + 2 - 5x + 10 = x^2 + 8$\n` +
`$\\Leftrightarrow x^2 - 2x + 12 = x^2 + 8$\n` +
`$\\Leftrightarrow -2x = 8 - 12 = -4 \\Rightarrow x = 2$ (Loại vì vi phạm ĐKXĐ).\n` +
`Vậy phương trình vô nghiệm.`;

  const sol8 = `**a) Tìm GTNN của $A$:**\n` +
`$A = x^2 + 3x - 5 = (x^2 + 2 \\cdot x \\cdot 1,5 + 2,25) - 5 - 2,25$\n` +
`$= (x + 1,5)^2 - 7,25$\n` +
`Vì $(x + 1,5)^2 \\ge 0$ nên $A \\ge -7,25$.\n` +
`Dấu \"=\" xảy ra khi $x = -1,5$.\n` +
`Vậy GTNN của $A$ là $-7,25$.\n\n` +
`**b) Chứng minh $A(x)$ nhận giá trị nguyên:**\n` +
`*(Dựa trên cấu trúc đề, phân số $\\frac{1}{14}x^3$ khả năng cao là lỗi đánh máy của $\\frac{1}{24}x^3$ hoặc các hệ số để tạo ra tích 5 số nguyên liên tiếp. Ta giải theo hướng biểu thức chuẩn)*:\n` +
`Ta chứng minh đa thức: $A(x) = \\frac{x^5 - 5x^4 + 5x^3 + 5x^2 - 6x}{120}$ luôn nhận giá trị nguyên với $x \\in \\mathbb{Z}$.\n` +
`Biến đổi tử số:\n` +
`$x^5 - 5x^4 + 5x^3 + 5x^2 - 6x = x(x^4 - 5x^3 + 5x^2 + 5x - 6)$\n` +
`$= x(x - 1)(x^3 - 4x^2 + x + 6) = x(x - 1)(x + 1)(x^2 - 5x + 6)$\n` +
`$= x(x - 1)(x + 1)(x - 2)(x - 3)$\n` +
`$= (x - 3)(x - 2)(x - 1)x(x + 1)$.\n` +
`Tử số là tích của $5$ số nguyên liên tiếp.\n` +
`Tích của $5$ số nguyên liên tiếp thì chia hết cho $5! = 120$.\n` +
`Do đó, $\\frac{(x - 3)(x - 2)(x - 1)x(x + 1)}{120}$ luôn là một số nguyên với mọi $x \\in \\mathbb{Z}$.`;

  const sol9 = `**a)** $5x(3 - 2x) - 7(2x - 3)$\n` +
`Đổi dấu hạng tử thứ hai: $-7(2x - 3) = +7(3 - 2x)$.\n` +
`$= 5x(3 - 2x) + 7(3 - 2x)$\n` +
`$= (3 - 2x)(5x + 7)$.\n\n` +
`**b)** $x^3 - 4x^2 + 4x$\n` +
`Đặt nhân tử chung là $x$:\n` +
`$= x(x^2 - 4x + 4)$\n` +
`Áp dụng hằng đẳng thức:\n` +
`$= x(x - 2)^2$.\n\n` +
`**c)** $x^2 + 2x - 15$\n` +
`Tách hạng tử $2x = 5x - 3x$:\n` +
`$= x^2 + 5x - 3x - 15$\n` +
`$= x(x + 5) - 3(x + 5)$\n` +
`$= (x + 5)(x - 3)$.`;

  const sol10 = `**1)** $\\frac{7x - 1}{6} + 2x = \\frac{16 - x}{5}$\n` +
`Quy đồng mẫu chung $30$:\n` +
`$\\Leftrightarrow 5(7x - 1) + 30 \\cdot 2x = 6(16 - x)$\n` +
`$\\Leftrightarrow 35x - 5 + 60x = 96 - 6x$\n` +
`$\\Leftrightarrow 95x - 5 = 96 - 6x$\n` +
`$\\Leftrightarrow 101x = 101 \\Rightarrow x = 1$.\n\n` +
`**2)** $x^2 - 25 = (x + 5)(3 - 2x)$\n` +
`$\\Leftrightarrow (x - 5)(x + 5) - (x + 5)(3 - 2x) = 0$\n` +
`$\\Leftrightarrow (x + 5)[(x - 5) - (3 - 2x)] = 0$\n` +
`$\\Leftrightarrow (x + 5)(x - 5 - 3 + 2x) = 0$\n` +
`$\\Leftrightarrow (x + 5)(3x - 8) = 0 \\Rightarrow x = -5$ hoặc $x = \\frac{8}{3}$.\n\n` +
`**3)** $\\frac{1}{x + 1} - \\frac{5}{x - 2} = \\frac{15}{(x + 1)(2 - x)}$ (ĐKXĐ: $x \\ne -1, x \\ne 2$)\n` +
`$\\Leftrightarrow \\frac{1}{x + 1} - \\frac{5}{x - 2} = \\frac{-15}{(x + 1)(x - 2)}$\n` +
`$\\Rightarrow (x - 2) - 5(x + 1) = -15$\n` +
`$\\Leftrightarrow x - 2 - 5x - 5 = -15$\n` +
`$\\Leftrightarrow -4x - 7 = -15 \\Leftrightarrow -4x = -8 \\Rightarrow x = 2$ (Loại vì vi phạm ĐKXĐ).\n` +
`Vậy phương trình vô nghiệm.`;

  const updates = [
    { id: "346d825f-2d5b-45de-9e61-bedfb8184881", solution: sol1 },
    { id: "355baf94-d008-432b-9e46-4c0d9d406a7d", solution: sol2 },
    { id: "38f3271a-d1fd-4e73-831c-ff4d4fe3f0fe", solution: sol3 },
    { id: "39568b00-7094-4f76-b914-1fda778659e8", solution: sol4 },
    { id: "397255ab-5027-4c4a-a161-d3e04a60a85a", solution: sol5 },
    { id: "3ab8b7b4-2e6f-41e1-a35c-a7d2f66fadf5", solution: sol6 },
    { id: "3c85bc44-74d4-4a02-a234-f11041a6ce86", solution: sol7 },
    { id: "3ce2be24-125a-44ca-be98-67c1a712ca92", solution: sol8 },
    { id: "3d3a1207-4795-4c4d-973b-08da89241d70", solution: sol9 },
    { id: "3e4b542c-817b-4abf-8059-e1114ed1f1d6", solution: sol10 }
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

manualFixBatch6Grade8().catch(console.error).finally(() => process.exit(0));
