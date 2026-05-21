import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch9Grade8() {
  const sql = getDb();

  const sol1 = `Ta biến đổi biểu thức $P$ để làm xuất hiện các bình phương:\n` +
`$P = 8x^2 + 3y^2 - 8xy - 6y + 21$\n` +
`$P = (8x^2 - 8xy + 2y^2) + (y^2 - 6y + 9) + 12$\n` +
`$P = 2(4x^2 - 4xy + y^2) + (y - 3)^2 + 12$\n` +
`$P = 2(2x - y)^2 + (y - 3)^2 + 12$.\n\n` +
`Vì $2(2x - y)^2 \\ge 0$ và $(y - 3)^2 \\ge 0$ với mọi $x, y$.\n` +
`Nên $P \\ge 12$ với mọi $x, y$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} 2x - y = 0 \\\\ y - 3 = 0 \\end{cases} \\Rightarrow \\begin{cases} 2x = 3 \\\\ y = 3 \\end{cases} \\Rightarrow x = 1,5; y = 3$.\n` +
`**Kết luận:** Giá trị nhỏ nhất của $P$ là $12$ đạt được tại $x = 1,5$ và $y = 3$.`;

  const sol2 = `**1. Rút gọn P:**\n` +
`Điều kiện xác định: $x \\ne 0, x \\ne -4$.\n` +
`$P = \\frac{8}{x^2 + 4x} + \\frac{5}{x + 4} - \\frac{2}{x}$\n` +
`$P = \\frac{8}{x(x + 4)} + \\frac{5}{x + 4} - \\frac{2}{x}$\n` +
`Quy đồng mẫu thức chung là $x(x + 4)$:\n` +
`$P = \\frac{8}{x(x + 4)} + \\frac{5x}{x(x + 4)} - \\frac{2(x + 4)}{x(x + 4)}$\n` +
`$P = \\frac{8 + 5x - 2x - 8}{x(x + 4)} = \\frac{3x}{x(x + 4)} = \\frac{3}{x + 4}$.\n\n` +
`**2. Tính giá trị của P tại $x = \\frac{1}{2}$:**\n` +
`Giá trị $x = \\frac{1}{2}$ thỏa mãn ĐKXĐ.\n` +
`Thay $x = \\frac{1}{2}$ vào biểu thức $P$ đã rút gọn:\n` +
`$P = \\frac{3}{\\frac{1}{2} + 4} = \\frac{3}{\\frac{9}{2}} = 3 \\cdot \\frac{2}{9} = \\frac{2}{3}$.`;

  const sol3 = `**1)** Phân tích đa thức thành nhân tử:\n` +
`$2(x - 3) - y(x - 3) = (x - 3)(2 - y)$.\n\n` +
`**2)** Tính nhanh giá trị của biểu thức:\n` +
`$55^2 + 45^2 + 90 \\cdot 55$\n` +
`$= 55^2 + 2 \\cdot 45 \\cdot 55 + 45^2$\n` +
`Áp dụng hằng đẳng thức bình phương của một tổng:\n` +
`$= (55 + 45)^2 = 100^2 = 10000$.\n\n` +
`**3)** Làm tính chia:\n` +
`$(2x^2y^2 - 12xy^3 + 6x^2y) : 2xy$\n` +
`$= \\frac{2x^2y^2}{2xy} - \\frac{12xy^3}{2xy} + \\frac{6x^2y}{2xy}$\n` +
`$= xy - 6y^2 + 3x$.`;

  const sol4 = `**1)** $(x + 1)(x + 3) - x(x - 1) = 8$\n` +
`$\\Leftrightarrow x^2 + 3x + x + 3 - x^2 + x = 8$\n` +
`$\\Leftrightarrow (x^2 - x^2) + (4x + x) + 3 = 8$\n` +
`$\\Leftrightarrow 5x + 3 = 8 \\Leftrightarrow 5x = 5 \\Rightarrow x = 1$.\n\n` +
`**2)** $9x^2 = 1 - (3x + 1)(2x - 9)$\n` +
`$\\Leftrightarrow 9x^2 = 1 - (6x^2 - 27x + 2x - 9)$\n` +
`$\\Leftrightarrow 9x^2 = 1 - (6x^2 - 25x - 9)$\n` +
`$\\Leftrightarrow 9x^2 = 1 - 6x^2 + 25x + 9$\n` +
`$\\Leftrightarrow 9x^2 + 6x^2 - 25x - 10 = 0$\n` +
`$\\Leftrightarrow 15x^2 - 25x - 10 = 0$\n` +
`Chia cả hai vế cho $5$:\n` +
`$\\Leftrightarrow 3x^2 - 5x - 2 = 0$\n` +
`$\\Leftrightarrow 3x^2 - 6x + x - 2 = 0 \\Leftrightarrow 3x(x - 2) + (x - 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)(3x + 1) = 0 \\Rightarrow x = 2$ hoặc $x = -\\frac{1}{3}$.`;

  const sol5 = `**a)** $x^2 - 4x = 0$\n` +
`$\\Leftrightarrow x(x - 4) = 0 \\Rightarrow x = 0$ hoặc $x = 4$.\n\n` +
`**b)** $x(x + 3) - 2x - 6 = 0$\n` +
`$\\Leftrightarrow x(x + 3) - 2(x + 3) = 0$\n` +
`$\\Leftrightarrow (x + 3)(x - 2) = 0 \\Rightarrow x = -3$ hoặc $x = 2$.\n\n` +
`**c)** $x^3 + 27 + (x + 3)(x - 9) = 0$\n` +
`$\\Leftrightarrow (x^3 + 3^3) + (x + 3)(x - 9) = 0$\n` +
`$\\Leftrightarrow (x + 3)(x^2 - 3x + 9) + (x + 3)(x - 9) = 0$\n` +
`$\\Leftrightarrow (x + 3)(x^2 - 3x + 9 + x - 9) = 0$\n` +
`$\\Leftrightarrow (x + 3)(x^2 - 2x) = 0$\n` +
`$\\Leftrightarrow (x + 3)x(x - 2) = 0$\n` +
`$\\Rightarrow x = -3$; $x = 0$ hoặc $x = 2$.`;

  const sol6 = `**a)** $3x^2 - 12x + 12$\n` +
`$= 3(x^2 - 4x + 4)$\n` +
`$= 3(x - 2)^2$.\n\n` +
`**b)** $x^2 + 7x + 7y - y^2$\n` +
`$= (x^2 - y^2) + 7(x + y)$\n` +
`$= (x - y)(x + y) + 7(x + y)$\n` +
`$= (x + y)(x - y + 7)$.\n\n` +
`**c)** $x^2 - xy - 6y^2$\n` +
`$= x^2 - 3xy + 2xy - 6y^2$\n` +
`$= x(x - 3y) + 2y(x - 3y)$\n` +
`$= (x - 3y)(x + 2y)$.\n\n` +
`**d)** $x^3 - 3x^2 - 6x + 8$\n` +
`$= (x^3 - x^2) - 2x^2 + 2x - 8x + 8$\n` +
`$= x^2(x - 1) - 2x(x - 1) - 8(x - 1)$\n` +
`$= (x - 1)(x^2 - 2x - 8)$\n` +
`$= (x - 1)(x^2 - 4x + 2x - 8)$\n` +
`$= (x - 1)[x(x - 4) + 2(x - 4)] = (x - 1)(x - 4)(x + 2)$.`;

  const sol7 = `**a)** $4x(x - 7) - 4x^2 = 56$\n` +
`$\\Leftrightarrow 4x^2 - 28x - 4x^2 = 56$\n` +
`$\\Leftrightarrow -28x = 56 \\Rightarrow x = -2$.\n\n` +
`**b)** $12x(3x - 2) - (4 - 6x) = 0$\n` +
`$\\Leftrightarrow 12x(3x - 2) + 2(3x - 2) = 0$\n` +
`$\\Leftrightarrow 2(3x - 2)(6x + 1) = 0$\n` +
`$\\Rightarrow 3x - 2 = 0$ hoặc $6x + 1 = 0 \\Rightarrow x = \\frac{2}{3}$ hoặc $x = -\\frac{1}{6}$.\n\n` +
`**c)** $4(x - 5) - (5 - x)^2 = 0$\n` +
`Vì $(5 - x)^2 = (x - 5)^2$, phương trình trở thành:\n` +
`$4(x - 5) - (x - 5)^2 = 0$\n` +
`$\\Leftrightarrow (x - 5)[4 - (x - 5)] = 0$\n` +
`$\\Leftrightarrow (x - 5)(9 - x) = 0 \\Rightarrow x = 5$ hoặc $x = 9$.`;

  const sol8 = `*(Đây là định dạng câu hỏi yêu cầu học sinh làm bài tập tự luận trên giấy, hệ thống không có đáp án trắc nghiệm điền dấu. Giáo viên chấm bài theo các bước làm cụ thể của học sinh).*`;

  const sol9 = `Do $MM' \\parallel NN'$, áp dụng hệ quả của định lý Thales trong tam giác $ONN'$, ta có:\n` +
`$\\frac{OM}{MN} = \\frac{OM'}{M'N'}$\n` +
`Thay các độ dài $MN = 4$ cm, $OM' = 12$ cm, $M'N' = 8$ cm vào tỉ lệ thức:\n` +
`$\\frac{OM}{4} = \\frac{12}{8}$\n` +
`$\\Rightarrow OM = \\frac{4 \\cdot 12}{8} = 6$ (cm).\n` +
`**Kết luận:** Số đo của đoạn thẳng $OM$ là $6$ cm.`;

  const sol10 = `Ta biến đổi biểu thức $A$:\n` +
`$A = 2a^2b^2 + 2b^2c^2 + 2a^2c^2 - a^4 - b^4 - c^4$\n` +
`$A = 4a^2b^2 - (a^4 + b^4 + c^4 + 2a^2b^2 - 2b^2c^2 - 2a^2c^2)$\n` +
`$A = (2ab)^2 - (a^2 + b^2 - c^2)^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$A = (2ab - a^2 - b^2 + c^2)(2ab + a^2 + b^2 - c^2)$\n` +
`$A = [c^2 - (a - b)^2][(a + b)^2 - c^2]$\n` +
`Tiếp tục áp dụng hiệu hai bình phương:\n` +
`$A = (c - a + b)(c + a - b)(a + b - c)(a + b + c)$.\n\n` +
`Vì $a, b, c$ là độ dài ba cạnh của một tam giác, theo bất đẳng thức tam giác ta có:\n` +
`- $b + c > a \\Rightarrow b + c - a > 0 \\Rightarrow c - a + b > 0$\n` +
`- $a + c > b \\Rightarrow c + a - b > 0$\n` +
`- $a + b > c \\Rightarrow a + b - c > 0$\n` +
`- $a + b + c > 0$ (hiển nhiên do $a, b, c > 0$).\n\n` +
`Tích của $4$ số dương là một số dương.\n` +
`Vậy $A > 0$ (đpcm).`;

  const updates = [
    { id: "50915018-6468-4eff-9626-de713252c2db", solution: sol1 },
    { id: "50a96679-6aa8-4216-acfc-fba94d898036", solution: sol2 },
    { id: "5288a046-4302-4132-8ca8-17e7e20ed4c3", solution: sol3 },
    { id: "555bbc5f-271c-4eda-b2e2-153ab48be57a", solution: sol4 },
    { id: "58c3afbc-cb99-4c13-bcd8-1be3fae39bae", solution: sol5 },
    { id: "5a71fe0d-e55e-4f6b-a3b8-d2d9a044d7f4", solution: sol6 },
    { id: "5a9fe889-2969-47b7-8d69-008811b44ef2", solution: sol7 },
    { id: "5b14020e-1347-4d5d-b17f-d97d772d89f1", solution: sol8 },
    { id: "5b25f49b-b56b-4811-9ad9-856ac7407e77", solution: sol9 },
    { id: "5ca17b06-c99d-49f6-9529-c2dbbc02a3bb", solution: sol10 }
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

manualFixBatch9Grade8().catch(console.error).finally(() => process.exit(0));
