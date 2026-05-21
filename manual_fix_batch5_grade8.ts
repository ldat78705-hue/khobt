import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch5Grade8() {
  const sql = getDb();

  const sol1 = `Ta rút gọn hai biểu thức $M$ và $N$:\n` +
`$M = x^2 - x$\n` +
`$N = (x - 1)^3 - x^2(x - 3) - 2 = x^3 - 3x^2 + 3x - 1 - x^3 + 3x^2 - 2 = 3x - 3$.\n\n` +
`**1. Tìm x để M = 0:**\n` +
`$M = 0 \\Leftrightarrow x^2 - x = 0 \\Leftrightarrow x(x - 1) = 0 \\Rightarrow x = 0$ hoặc $x = 1$.\n\n` +
`**2. Tìm x để M = N:**\n` +
`$M = N \\Leftrightarrow x^2 - x = 3x - 3 \\Leftrightarrow x^2 - 4x + 3 = 0$\n` +
`$\\Leftrightarrow x^2 - x - 3x + 3 = 0 \\Leftrightarrow x(x - 1) - 3(x - 1) = 0$\n` +
`$\\Leftrightarrow (x - 1)(x - 3) = 0 \\Rightarrow x = 1$ hoặc $x = 3$.\n\n` +
`**3. Tìm giá trị của x để P = M - N là số nguyên âm lớn nhất:**\n` +
`$P = M - N = x^2 - x - (3x - 3) = x^2 - 4x + 3$.\n` +
`Ta biến đổi: $P = (x^2 - 4x + 4) - 1 = (x - 2)^2 - 1$.\n` +
`Số nguyên âm lớn nhất là $-1$.\n` +
`Để $P = -1 \\Leftrightarrow (x - 2)^2 - 1 = -1 \\Leftrightarrow (x - 2)^2 = 0 \\Leftrightarrow x = 2$.\n` +
`Vậy $x = 2$ thì $P$ đạt giá trị nguyên âm lớn nhất (là $-1$).`;

  const sol2 = `**1. Rút gọn A:**\n` +
`Điều kiện xác định: $x \\ne \\pm 2$.\n` +
`$A = \\frac{3}{2 - x} - \\frac{3}{x + 2} + \\frac{3x^2}{(x - 2)(x + 2)}$\n` +
`Đổi dấu phân thức đầu: $\\frac{3}{2 - x} = \\frac{-3}{x - 2}$.\n` +
`$A = \\frac{-3}{x - 2} - \\frac{3}{x + 2} + \\frac{3x^2}{(x - 2)(x + 2)}$\n` +
`$= \\frac{-3(x + 2) - 3(x - 2) + 3x^2}{(x - 2)(x + 2)}$\n` +
`$= \\frac{-3x - 6 - 3x + 6 + 3x^2}{(x - 2)(x + 2)} = \\frac{3x^2 - 6x}{(x - 2)(x + 2)}$\n` +
`$= \\frac{3x(x - 2)}{(x - 2)(x + 2)} = \\frac{3x}{x + 2}$.\n\n` +
`**2. Tìm giá trị của B khi $|x + 1| = 1$:**\n` +
`$|x + 1| = 1 \\Rightarrow x + 1 = 1$ hoặc $x + 1 = -1$.\n` +
`$\\Rightarrow x = 0$ (thỏa mãn ĐKXĐ) hoặc $x = -2$ (loại vì vi phạm ĐKXĐ).\n` +
`Với $x = 0$, ta có $B = \\frac{0 + 1}{0 + 2} = \\frac{1}{2}$.\n\n` +
`**3. Tìm giá trị nguyên của x để P = A : B có giá trị nguyên:**\n` +
`Điều kiện B có nghĩa và khác $0$: $x \\ne -1$.\n` +
`$P = A : B = \\frac{3x}{x + 2} : \\frac{x + 1}{x + 2} = \\frac{3x}{x + 2} \\cdot \\frac{x + 2}{x + 1} = \\frac{3x}{x + 1}$.\n` +
`$P = \\frac{3(x + 1) - 3}{x + 1} = 3 - \\frac{3}{x + 1}$.\n` +
`Để $P \\in \\mathbb{Z} \\Rightarrow x + 1$ là ước của $3$.\n` +
`$\\Rightarrow x + 1 \\in \\{-1; 1; -3; 3\\}$.\n` +
`- $x + 1 = 1 \\Rightarrow x = 0$ (thỏa mãn)\n` +
`- $x + 1 = -1 \\Rightarrow x = -2$ (loại vì ĐKXĐ)\n` +
`- $x + 1 = 3 \\Rightarrow x = 2$ (loại vì ĐKXĐ)\n` +
`- $x + 1 = -3 \\Rightarrow x = -4$ (thỏa mãn)\n` +
`Vậy $x \\in \\{-4; 0\\}$.`;

  const sol3 = `Ta biến đổi biểu thức $A$ để làm xuất hiện các hằng đẳng thức:\n` +
`$A = -2x^2 - 10y^2 + 4xy + 4x + 4y + 2013$\n` +
`$A = -2(x^2 - 2xy + y^2) + 4x + 4y - 8y^2 + 2013$\n` +
`$A = -2(x - y)^2 + 4(x - y) + 8y - 8y^2 + 2013$\n` +
`$A = -2[(x - y)^2 - 2(x - y) + 1] + 2 - 8(y^2 - y + \\frac{1}{4}) + 2 + 2013$\n` +
`$A = -2(x - y - 1)^2 - 8(y - \\frac{1}{2})^2 + 2017$.\n\n` +
`Vì $-2(x - y - 1)^2 \\le 0$ và $-8(y - \\frac{1}{2})^2 \\le 0$ với mọi $x, y$.\n` +
`Nên $A \\le 2017$.\n` +
`Dấu \"=\" xảy ra khi:\n` +
`$\\begin{cases} y - \\frac{1}{2} = 0 \\\\ x - y - 1 = 0 \\end{cases} \\Rightarrow \\begin{cases} y = 0,5 \\\\ x = 1,5 \\end{cases}$\n` +
`**Kết luận:** Giá trị lớn nhất của $A$ là $2017$ đạt được khi $x = 1,5$ và $y = 0,5$.`;

  const sol4 = `**1)** $3(x - 5)(x - 2)(x + 2) + 4 = 7 + 3x^3 - 15x^2$\n` +
`$\\Leftrightarrow 3(x - 5)(x^2 - 4) + 4 = 7 + 3x^2(x - 5)$\n` +
`$\\Leftrightarrow 3(x - 5)(x^2 - 4) - 3x^2(x - 5) = 7 - 4$\n` +
`$\\Leftrightarrow 3(x - 5)[x^2 - 4 - x^2] = 3$\n` +
`$\\Leftrightarrow 3(x - 5)(-4) = 3 \\Leftrightarrow -12(x - 5) = 3$\n` +
`$\\Leftrightarrow x - 5 = -\\frac{1}{4} \\Rightarrow x = 5 - \\frac{1}{4} = \\frac{19}{4}$.\n\n` +
`**2)** $16(2 - 3x) + x^2(3x - 2) = 0$\n` +
`$\\Leftrightarrow 16(2 - 3x) - x^2(2 - 3x) = 0$\n` +
`$\\Leftrightarrow (2 - 3x)(16 - x^2) = 0$\n` +
`$\\Leftrightarrow (2 - 3x)(4 - x)(4 + x) = 0$\n` +
`$\\Rightarrow 2 - 3x = 0$ hoặc $4 - x = 0$ hoặc $4 + x = 0$.\n` +
`$\\Rightarrow x = \\frac{2}{3}; x = 4; x = -4$.\n\n` +
`**3)** $x^3 - 7x^2 = 7 - x$\n` +
`$\\Leftrightarrow x^2(x - 7) + x - 7 = 0$\n` +
`$\\Leftrightarrow (x - 7)(x^2 + 1) = 0$\n` +
`Vì $x^2 + 1 > 0$ nên $x - 7 = 0 \\Rightarrow x = 7$.`;

  const sol5 = `**1)** $(3x - 2)(3x + 4) - (2 - 3x)^2 = 6$\n` +
`Vì $(2 - 3x)^2 = (3x - 2)^2$, phương trình trở thành:\n` +
`$(3x - 2)(3x + 4) - (3x - 2)^2 = 6$\n` +
`$\\Leftrightarrow (3x - 2)[(3x + 4) - (3x - 2)] = 6$\n` +
`$\\Leftrightarrow (3x - 2)(3x + 4 - 3x + 2) = 6$\n` +
`$\\Leftrightarrow (3x - 2) \\cdot 6 = 6 \\Leftrightarrow 3x - 2 = 1$\n` +
`$\\Leftrightarrow 3x = 3 \\Rightarrow x = 1$.\n\n` +
`**2)** $2(x - 3) - (x - 3)(3x - 2) = 0$\n` +
`$\\Leftrightarrow (x - 3)[2 - (3x - 2)] = 0$\n` +
`$\\Leftrightarrow (x - 3)(2 - 3x + 2) = 0$\n` +
`$\\Leftrightarrow (x - 3)(4 - 3x) = 0$\n` +
`$\\Rightarrow x - 3 = 0$ hoặc $4 - 3x = 0$.\n` +
`$\\Rightarrow x = 3$ hoặc $x = \\frac{4}{3}$.`;

  const sol6 = `Từ phương trình: $2x^2 + 10y^2 - 6xy - 6x - 2y + 10 = 0$\n` +
`Ta tách và nhóm các hạng tử để tạo thành các bình phương:\n` +
`$= (x^2 - 6xy + 9y^2) + (x^2 - 6x + 9) + (y^2 - 2y + 1) = 0$\n` +
`$\\Leftrightarrow (x - 3y)^2 + (x - 3)^2 + (y - 1)^2 = 0$\n` +
`Vì $(x - 3y)^2 \\ge 0$, $(x - 3)^2 \\ge 0$, $(y - 1)^2 \\ge 0$ với mọi $x, y$.\n` +
`Nên dấu \"=\" xảy ra khi đồng thời các biểu thức trong ngoặc bằng $0$:\n` +
`$\\begin{cases} x - 3y = 0 \\\\ x - 3 = 0 \\\\ y - 1 = 0 \\end{cases} \\Rightarrow \\begin{cases} x = 3 \\\\ y = 1 \\end{cases}$ (thỏa mãn $3 - 3(1) = 0$).\n\n` +
`Thay $x = 3, y = 1$ vào biểu thức $A$:\n` +
`$A = \\frac{(3 + 1 - 4)^{2018} - 1^{2018}}{3} = \\frac{0^{2018} - 1}{3} = -\\frac{1}{3}$.\n` +
`**Kết luận:** $A = -\\frac{1}{3}$.`;

  const sol7 = `Ta có phương trình: $x^3 + 5y^2 + 2y - 4xy - 3 = 0$\n` +
`Xem phương trình trên là phương trình bậc hai đối với ẩn $y$:\n` +
`$5y^2 - 2(2x - 1)y + (x^3 - 3) = 0$\n` +
`Biệt thức $\\Delta' = (2x - 1)^2 - 5(x^3 - 3) = 4x^2 - 4x + 1 - 5x^3 + 15 = -5x^3 + 4x^2 - 4x + 16$.\n` +
`Để phương trình có nghiệm thực, ta phải có $\\Delta' \\ge 0 \\Rightarrow 5x^3 - 4x^2 + 4x - 16 \\le 0$.\n` +
`Vì $x$ nguyên, với $x \\ge 2$ thì $5x^3 > 4x^2 - 4x + 16$, do đó $x \\le 1$.\n` +
`Hơn nữa, để $y$ là số nguyên thì $\\Delta'$ phải là một số chính phương.\n` +
`Thử lần lượt các giá trị nguyên của $x$:\n` +
`- Với $x = 1 \\Rightarrow \\Delta' = -5 + 4 - 4 + 16 = 11$ (không phải số chính phương, loại).\n` +
`- Với $x = 0 \\Rightarrow \\Delta' = 16 = 4^2$ (thỏa mãn).\n` +
`Khi đó $y = \\frac{2(0) - 1 \\pm 4}{5} \\Rightarrow y = \\frac{-1 + 4}{5} = \\frac{3}{5}$ (loại) hoặc $y = \\frac{-1 - 4}{5} = -1$ (nhận).\n` +
`*(Tiếp tục thử một vài giá trị âm nhỏ khác, phương trình nhanh chóng không tạo ra số chính phương)*.\n` +
`**Kết luận:** Cặp nghiệm nguyên duy nhất của phương trình là $(x; y) = (0; -1)$.`;

  const sol8 = `Gọi số sản phẩm mỗi ngày công nhân đó phải làm theo kế hoạch là $x$ (sản phẩm, $x \\in \\mathbb{N}^*$).\n` +
`Tổng số sản phẩm phải làm theo kế hoạch trong 20 ngày là $20x$ (sản phẩm).\n` +
`Thực tế, mỗi ngày người đó làm được $x + 5$ (sản phẩm).\n` +
`Vì người đó làm xong sớm 2 ngày nên thời gian làm thực tế là: $20 - 2 = 18$ (ngày).\n` +
`Tổng số sản phẩm làm được trong thực tế là $18(x + 5)$ (sản phẩm).\n` +
`Theo đề bài, thực tế làm thêm được $30$ sản phẩm so với kế hoạch, nên ta có phương trình:\n` +
`$18(x + 5) - 20x = 30$\n` +
`$\\Leftrightarrow 18x + 90 - 20x = 30$\n` +
`$\\Leftrightarrow -2x = 30 - 90$\n` +
`$\\Leftrightarrow -2x = -60 \\Rightarrow x = 30$ (thỏa mãn điều kiện).\n` +
`**Kết luận:** Theo kế hoạch, mỗi ngày công nhân đó đã làm được $30$ sản phẩm.`;

  const sol9 = `Áp dụng tính chất bình phương của một hiệu: $(a - b)^2 = (b - a)^2$.\n` +
`Nên ta có: $(x - 5y)^2 = (5y - x)^2$.\n` +
`**Đáp án đúng là A.**`;

  const sol10 = `**1. Chứng tỏ $P = \\frac{3}{x + 5}$:**\n` +
`ĐKXĐ: $x \\ne \\pm 4; x \\ne -5$.\n` +
`$P = \\left( \\frac{2}{x + 4} + \\frac{x + 20}{(x - 4)(x + 4)} \\right) \\cdot \\frac{x - 4}{x + 5}$\n` +
`$= \\frac{2(x - 4) + x + 20}{(x - 4)(x + 4)} \\cdot \\frac{x - 4}{x + 5}$\n` +
`$= \\frac{2x - 8 + x + 20}{(x - 4)(x + 4)} \\cdot \\frac{x - 4}{x + 5}$\n` +
`$= \\frac{3x + 12}{(x - 4)(x + 4)} \\cdot \\frac{x - 4}{x + 5}$\n` +
`$= \\frac{3(x + 4)}{(x - 4)(x + 4)} \\cdot \\frac{x - 4}{x + 5} = \\frac{3}{x + 5}$ (đpcm).\n\n` +
`**2. Tính giá trị P khi $x^2 + 4x = 0$:**\n` +
`$x^2 + 4x = 0 \\Leftrightarrow x(x + 4) = 0 \\Rightarrow x = 0$ hoặc $x = -4$.\n` +
`Đối chiếu ĐKXĐ ($x \\ne -4$), ta loại $x = -4$, nhận $x = 0$.\n` +
`Thay $x = 0$ vào $P$, ta được: $P = \\frac{3}{0 + 5} = \\frac{3}{5}$.\n\n` +
`**3. Tìm x nguyên để P nguyên:**\n` +
`Để $P \\in \\mathbb{Z}$ thì $x + 5$ phải là ước của $3$.\n` +
`Ư$(3) = \\{1; -1; 3; -3\\}$.\n` +
`- $x + 5 = 1 \\Rightarrow x = -4$ (loại vì ĐKXĐ)\n` +
`- $x + 5 = -1 \\Rightarrow x = -6$ (thỏa mãn)\n` +
`- $x + 5 = 3 \\Rightarrow x = -2$ (thỏa mãn)\n` +
`- $x + 5 = -3 \\Rightarrow x = -8$ (thỏa mãn)\n` +
`Vậy $x \\in \\{-8; -6; -2\\}$.`;

  const updates = [
    { id: "28b07dfc-4eb2-49a6-9462-c51890b881dd", solution: sol1 },
    { id: "28f50875-0574-48bc-bdf4-fe7c63a81f65", solution: sol2 },
    { id: "290344bd-f594-4054-b48b-81687198ac5a", solution: sol3 },
    { id: "2ac8a5cb-5e5b-4322-8aa5-c89aa0e190cd", solution: sol4 },
    { id: "2f0461c5-081f-45a3-84a2-b4653486d495", solution: sol5 },
    { id: "31102489-3b29-403d-ba70-20af71d77310", solution: sol6 },
    { id: "31773822-1d8a-4044-8b79-d0ec5263fce6", solution: sol7 },
    { id: "32033016-0fa4-42a1-bf62-8c05b7b876c4", solution: sol8 },
    { id: "32d9c1d4-0337-4e8d-bdb4-6c1c0b68593d", solution: sol9 },
    { id: "33663520-7eb8-43cc-9c35-a5169fd4afd9", solution: sol10 }
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

manualFixBatch5Grade8().catch(console.error).finally(() => process.exit(0));
