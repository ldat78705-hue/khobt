import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch23Grade8() {
  const sql = getDb();

  const sol1 = `**a) Rút gọn biểu thức A:**\n` +
`Điều kiện xác định: $x \\ne 0; x \\ne 5$.\n` +
`$A = \\frac{3x - 2}{x} - \\frac{x - 7}{x - 5} - \\frac{10}{x(x - 5)}$\n` +
`$A = \\frac{(3x - 2)(x - 5)}{x(x - 5)} - \\frac{x(x - 7)}{x(x - 5)} - \\frac{10}{x(x - 5)}$\n` +
`$A = \\frac{3x^2 - 15x - 2x + 10 - x^2 + 7x - 10}{x(x - 5)}$\n` +
`$A = \\frac{2x^2 - 10x}{x(x - 5)} = \\frac{2x(x - 5)}{x(x - 5)} = 2$.\n\n` +
`**b) Tìm x nguyên để B nguyên:**\n` +
`Ta có: $B = A \\cdot \\frac{x + 1}{x - 1} = 2 \\cdot \\frac{x + 1}{x - 1} = \\frac{2x + 2}{x - 1}$.\n` +
`ĐKXĐ bổ sung của $B$: $x \\ne 1$. Vậy ĐKXĐ chung: $x \\ne 0, x \\ne 1, x \\ne 5$.\n` +
`Biến đổi $B$: $B = \\frac{2(x - 1) + 4}{x - 1} = 2 + \\frac{4}{x - 1}$.\n` +
`Để $B$ nhận giá trị nguyên với $x$ nguyên thì $x - 1$ phải là ước của $4$.\n` +
`$x - 1 \\in \\{1; -1; 2; -2; 4; -4\\}$.\n` +
`- $x - 1 = 1 \\Rightarrow x = 2$ (TM)\n` +
`- $x - 1 = -1 \\Rightarrow x = 0$ (Loại vì vi phạm ĐKXĐ)\n` +
`- $x - 1 = 2 \\Rightarrow x = 3$ (TM)\n` +
`- $x - 1 = -2 \\Rightarrow x = -1$ (TM)\n` +
`- $x - 1 = 4 \\Rightarrow x = 5$ (Loại vì vi phạm ĐKXĐ)\n` +
`- $x - 1 = -4 \\Rightarrow x = -3$ (TM)\n` +
`**Kết luận:** $x \\in \\{-3; -1; 2; 3\\}$.`;

  const sol2 = `**a) Rút gọn và tính giá trị của A:**\n` +
`$A = (7x + 5)^2 + (3x - 5)^2 - (10 - 6x)(5 + 7x)$\n` +
`$A = (7x + 5)^2 + (3x - 5)^2 + 2(3x - 5)(7x + 5)$\n` +
`Đây là hằng đẳng thức $a^2 + b^2 + 2ab = (a + b)^2$.\n` +
`$A = [(7x + 5) + (3x - 5)]^2 = (10x)^2 = 100x^2$.\n` +
`Tại $x = -2$, ta có: $A = 100(-2)^2 = 100 \\cdot 4 = 400$.\n\n` +
`**b) Rút gọn và tính giá trị của B:**\n` +
`$B = (2x + y)(y^2 + 4x^2 - 2xy) - 8x(x - 1)(x + 1)$\n` +
`$B = (y + 2x)(y^2 - y \\cdot 2x + (2x)^2) - 8x(x^2 - 1)$\n` +
`Áp dụng hằng đẳng thức tổng hai lập phương:\n` +
`$B = (y^3 + (2x)^3) - (8x^3 - 8x)$\n` +
`$B = y^3 + 8x^3 - 8x^3 + 8x = y^3 + 8x$.\n` +
`Tại $x = -2; y = 3$, ta có:\n` +
`$B = 3^3 + 8(-2) = 27 - 16 = 11$.`;

  const sol3 = `Phân thức đối của một phân thức $\\frac{A}{B}$ là $-\\frac{A}{B} = \\frac{-A}{B}$.\n` +
`Phân thức đối của $\\frac{x - 1}{x + 3}$ là:\n` +
`$-\\frac{x - 1}{x + 3} = \\frac{-(x - 1)}{x + 3} = \\frac{1 - x}{x + 3}$.\n` +
`**Đáp án đúng là D.**`;

  const sol4 = `**1)** $2x^3 - 8x^2 + 8x$\n` +
`Đặt nhân tử chung là $2x$:\n` +
`$= 2x(x^2 - 4x + 4)$\n` +
`$= 2x(x - 2)^2$.\n\n` +
`**2)** $2x^2 - 3x + 5$\n` +
`Đa thức này vô nghiệm trên tập số thực ($\\Delta = (-3)^2 - 4 \\cdot 2 \\cdot 5 = 9 - 40 = -31 < 0$). Do đó, không thể phân tích thành nhân tử với hệ số thực.\n` +
`*(Lưu ý: Có thể đề bài bị lỗi dấu, nếu đề là $2x^2 - 3x - 5$ thì phân tích được thành $(2x - 5)(x + 1)$)*.\n\n` +
`**3)** $x^2y - x^3 - 9y + 9x$\n` +
`Nhóm 2 hạng tử đầu, 2 hạng tử cuối:\n` +
`$= (x^2y - 9y) - (x^3 - 9x)$\n` +
`$= y(x^2 - 9) - x(x^2 - 9)$\n` +
`$= (x^2 - 9)(y - x)$\n` +
`$= (x - 3)(x + 3)(y - x)$.`;

  const sol5 = `**Khẳng định trên là SAI.**\n` +
`Theo định lý về tam giác đồng dạng:\n` +
`Nếu $\\Delta A'B'C' \\sim \\Delta ABC$ theo tỉ số đồng dạng $k = 3$, thì tỉ số chu vi của $\\Delta A'B'C'$ so với chu vi $\\Delta ABC$ là $k = 3$.\n` +
`Tức là $\\frac{P_{A'B'C'}}{P_{ABC}} = 3$.\n` +
`Suy ra tỉ số chu vi $\\Delta ABC$ so với chu vi $\\Delta A'B'C'$ phải là $\\frac{P_{ABC}}{P_{A'B'C'}} = \\frac{1}{3}$.\n` +
`Vậy khẳng định tỉ số là 3 là sai.`;

  const sol6 = `**a)** $\\frac{x + 2}{x - 3} + \\frac{x}{x + 2} = \\frac{x^2 + 6}{x^2 - x - 6}$\n` +
`Điều kiện xác định: $x \\ne 3; x \\ne -2$.\n` +
`Quy đồng mẫu thức $(x - 3)(x + 2)$:\n` +
`$\\Leftrightarrow \\frac{(x + 2)^2}{(x - 3)(x + 2)} + \\frac{x(x - 3)}{(x - 3)(x + 2)} = \\frac{x^2 + 6}{(x - 3)(x + 2)}$\n` +
`$\\Rightarrow x^2 + 4x + 4 + x^2 - 3x = x^2 + 6$\n` +
`$\\Leftrightarrow x^2 + x - 2 = 0$\n` +
`$\\Leftrightarrow (x - 1)(x + 2) = 0 \\Rightarrow x = 1$ hoặc $x = -2$.\n` +
`Đối chiếu ĐKXĐ, $x = -2$ bị loại. Vậy nghiệm của pt là $x = 1$.\n\n` +
`**b)** $(x + 1)^2 + |x - 1| = x^2 + 4$\n` +
`$\\Leftrightarrow x^2 + 2x + 1 + |x - 1| = x^2 + 4$\n` +
`$\\Leftrightarrow |x - 1| = 3 - 2x$\n` +
`Điều kiện có nghiệm: $3 - 2x \\ge 0 \\Leftrightarrow x \\le 1,5$.\n` +
`- Trường hợp 1: $x - 1 \\ge 0 \\Leftrightarrow 1 \\le x \\le 1,5$.\n` +
`  Phương trình: $x - 1 = 3 - 2x \\Leftrightarrow 3x = 4 \\Rightarrow x = \\frac{4}{3}$ (thỏa mãn).\n` +
`- Trường hợp 2: $x - 1 < 0 \\Leftrightarrow x < 1$.\n` +
`  Phương trình: $1 - x = 3 - 2x \\Leftrightarrow x = 2$ (không thỏa mãn $x < 1$).\n` +
`Vậy $x = \\frac{4}{3}$.\n\n` +
`**c)** Giải bất phương trình: $1 - \\frac{x - 1}{3} < \\frac{x + 3}{3} - \\frac{x - 2}{2}$\n` +
`Nhân cả hai vế với mẫu chung là $6$:\n` +
`$\\Leftrightarrow 6 - 2(x - 1) < 2(x + 3) - 3(x - 2)$\n` +
`$\\Leftrightarrow 6 - 2x + 2 < 2x + 6 - 3x + 6$\n` +
`$\\Leftrightarrow 8 - 2x < -x + 12$\n` +
`$\\Leftrightarrow -2x + x < 12 - 8 \\Leftrightarrow -x < 4 \\Leftrightarrow x > -4$.\n` +
`Tập nghiệm: $x > -4$.`;

  const sol7 = `Thực hiện phép chia hai phân thức:\n` +
`$\\frac{5x + 2}{3xy^2} : \\frac{10x + 4}{x^2y}$\n` +
`$= \\frac{5x + 2}{3xy^2} \\cdot \\frac{x^2y}{10x + 4}$\n` +
`$= \\frac{5x + 2}{3xy^2} \\cdot \\frac{x^2y}{2(5x + 2)}$\n` +
`Triệt tiêu các nhân tử chung $(5x + 2)$, $x$ và $y$ ở cả tử và mẫu:\n` +
`$= \\frac{x}{3y \\cdot 2} = \\frac{x}{6y}$.\n` +
`**Đáp án đúng là C.**`;

  const sol8 = `**Khẳng định trên là SAI.**\n` +
`Phương trình: $\\frac{x^2 - 6}{x^2} = x + \\frac{3}{x^2 + 1}$\n` +
`Biểu thức có chứa các mẫu thức: $x^2$ và $x^2 + 1$.\n` +
`Điều kiện xác định là các mẫu thức phải khác $0$:\n` +
`- $x^2 \\ne 0 \\Leftrightarrow x \\ne 0$.\n` +
`- $x^2 + 1 \\ne 0$: Điều này luôn đúng với mọi $x$ vì $x^2 \\ge 0 \\Rightarrow x^2 + 1 \\ge 1 > 0$.\n` +
`Vậy điều kiện xác định duy nhất của phương trình là $x \\ne 0$.\n` +
`Việc thêm $x \\ne 1; x \\ne -1$ là dư thừa và không chính xác so với định nghĩa ĐKXĐ.`;

  const sol9 = `**a) Rút gọn biểu thức A:**\n` +
`$A = (x + 3)^2 + (x - 2)^2 - 2(x + 3)(x - 2)$\n` +
`Nhận thấy đây là dạng hằng đẳng thức $a^2 + b^2 - 2ab = (a - b)^2$, với $a = x + 3$ và $b = x - 2$.\n` +
`$A = [(x + 3) - (x - 2)]^2$\n` +
`$A = (x + 3 - x + 2)^2$\n` +
`$A = 5^2 = 25$.\n\n` +
`**b) Rút gọn biểu thức B:**\n` +
`$B = (x - 2)^3 - x(x - 1)(x - 3) + 3x^2 - 9x + 8$\n` +
`Khai triển hằng đẳng thức và nhân đa thức:\n` +
`$B = (x^3 - 6x^2 + 12x - 8) - x(x^2 - 3x - x + 3) + 3x^2 - 9x + 8$\n` +
`$B = x^3 - 6x^2 + 12x - 8 - x(x^2 - 4x + 3) + 3x^2 - 9x + 8$\n` +
`$B = x^3 - 6x^2 + 12x - 8 - x^3 + 4x^2 - 3x + 3x^2 - 9x + 8$\n` +
`Thu gọn các hạng tử đồng dạng:\n` +
`$B = (x^3 - x^3) + (-6x^2 + 4x^2 + 3x^2) + (12x - 3x - 9x) + (-8 + 8)$\n` +
`$B = 0 + x^2 + 0 + 0 = x^2$.`;

  const sol10 = `**a)** $(x - 2)(x - 5) = x^2 - 4$\n` +
`$\\Leftrightarrow (x - 2)(x - 5) = (x - 2)(x + 2)$\n` +
`$\\Leftrightarrow (x - 2)(x - 5) - (x - 2)(x + 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)[(x - 5) - (x + 2)] = 0$\n` +
`$\\Leftrightarrow (x - 2)(x - 5 - x - 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)(-7) = 0$\n` +
`$\\Leftrightarrow x - 2 = 0 \\Rightarrow x = 2$.\n` +
`Tập nghiệm $S = \\{2\\}$.\n\n` +
`**b)** $\\frac{x + 1}{x - 2} - \\frac{5}{2 + x} = \\frac{12}{x^2 - 4} + 1$\n` +
`$\\Leftrightarrow \\frac{x + 1}{x - 2} - \\frac{5}{x + 2} = \\frac{12}{(x - 2)(x + 2)} + 1$\n` +
`Điều kiện xác định: $x \\ne 2; x \\ne -2$.\n` +
`Quy đồng mẫu thức $(x - 2)(x + 2)$:\n` +
`$\\Leftrightarrow \\frac{(x + 1)(x + 2)}{(x - 2)(x + 2)} - \\frac{5(x - 2)}{(x - 2)(x + 2)} = \\frac{12}{(x - 2)(x + 2)} + \\frac{x^2 - 4}{(x - 2)(x + 2)}$\n` +
`$\\Rightarrow (x^2 + 3x + 2) - (5x - 10) = 12 + x^2 - 4$\n` +
`$\\Leftrightarrow x^2 - 2x + 12 = x^2 + 8$\n` +
`$\\Leftrightarrow -2x = 8 - 12$\n` +
`$\\Leftrightarrow -2x = -4 \\Rightarrow x = 2$.\n` +
`Đối chiếu với ĐKXĐ ($x \\ne 2$), nghiệm $x = 2$ bị loại.\n` +
`**Kết luận:** Phương trình vô nghiệm.`;

  const updates = [
    { id: "e4b6b037-e770-48be-912e-d97519d1a1ce", solution: sol1 },
    { id: "e4dce5f6-534f-419f-9fe6-41aff50d0284", solution: sol2 },
    { id: "e52afa18-cf7d-474b-a114-2339c6d58f60", solution: sol3 },
    { id: "e626fbe6-eca5-4157-bd15-713210879af6", solution: sol4 },
    { id: "e64e1766-66c5-4ff9-b76c-9f3e3b8e58ee", solution: sol5 },
    { id: "e82d1c72-d571-4256-888e-60842ab14e42", solution: sol6 },
    { id: "eacfd011-2786-43ee-b437-fc5e02542f94", solution: sol7 },
    { id: "ebf070b7-513e-4b51-805d-e7b0ecd9451c", solution: sol8 },
    { id: "ebfc13b1-0379-48b0-a43c-1610c2b4d2a9", solution: sol9 },
    { id: "ed3d4213-2670-4e05-9cf2-01d7963879c4", solution: sol10 }
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

manualFixBatch23Grade8().catch(console.error).finally(() => process.exit(0));
