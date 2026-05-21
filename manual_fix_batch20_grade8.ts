import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch20Grade8() {
  const sql = getDb();

  const sol1 = `Ta có biểu thức: $M = 5x^2 + y^2 + 2x(y - 2) + 8$\n` +
`Khai triển và nhóm các hạng tử để tạo thành các bình phương:\n` +
`$M = x^2 + 4x^2 + y^2 + 2xy - 4x + 8$\n` +
`$M = (x^2 + 2xy + y^2) + (4x^2 - 4x + 1) + 7$\n` +
`$M = (x + y)^2 + (2x - 1)^2 + 7$\n` +
`Vì $(x + y)^2 \\ge 0$ và $(2x - 1)^2 \\ge 0$ với mọi $x, y$.\n` +
`Suy ra $M \\ge 7$ với mọi $x, y$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} x + y = 0 \\\\ 2x - 1 = 0 \\end{cases} \\Leftrightarrow \\begin{cases} x = \\frac{1}{2} \\\\ y = -\\frac{1}{2} \\end{cases}$\n` +
`**Kết luận:** Giá trị nhỏ nhất của $M$ là $7$, đạt được khi $x = \\frac{1}{2}$ và $y = -\\frac{1}{2}$.`;

  const sol2 = `**1. Phân tích mẫu thức chung:**\n` +
`Các phân thức đã cho: $\\frac{1}{x - 1}$, $\\frac{2}{1}$, $\\frac{2x - 3}{x^2 + x + 1}$.\n` +
`Mẫu thức chung (MTC) là tích các mẫu số khác nhau: $(x - 1)(x^2 + x + 1)$.\n` +
`$\\Rightarrow$ **Đáp án đúng là B.**\n\n` +
`**2. Tính diện tích hình vuông:**\n` +
`Chu vi hình vuông bằng $8$ cm, suy ra cạnh hình vuông là $a = 8 : 4 = 2$ (cm).\n` +
`Diện tích hình vuông là $S = a^2 = 2^2 = 4$ (cm$^2$).\n` +
`$\\Rightarrow$ **Đáp án đúng là C.**`;

  const sol3 = `Ta có phương trình:\n` +
`$\\left( x + \\frac{1}{3} \\right)(x - 2) = 0$\n` +
`Đây là phương trình tích, do đó:\n` +
`$x + \\frac{1}{3} = 0$ hoặc $x - 2 = 0$\n` +
`- Trường hợp 1: $x + \\frac{1}{3} = 0 \\Leftrightarrow x = -\\frac{1}{3}$.\n` +
`- Trường hợp 2: $x - 2 = 0 \\Leftrightarrow x = 2$.\n` +
`**Kết luận:** Tập nghiệm của phương trình là $S = \\left\\{ -\\frac{1}{3}; 2 \\right\\}$.`;

  const sol4 = `Trong $\\Delta ABC$, $BD$ là đường phân giác của góc $B$ (với $D \\in AC$).\n` +
`Theo tính chất của đường phân giác trong tam giác, ta có tỉ số giữa hai đoạn thẳng trên cạnh đối diện bằng tỉ số hai cạnh kề của hai đoạn thẳng ấy.\n` +
`Tức là:\n` +
`$\\frac{AD}{DC} = \\frac{AB}{BC}$ hoặc $\\frac{AD}{AB} = \\frac{DC}{BC}$.\n` +
`*(Tùy theo các phương án trắc nghiệm A, B, C, D trên đề thi gốc để học sinh khoanh vào đáp án có tỉ lệ thức này)*.`;

  const sol5 = `Từ giả thiết: $a^2 + b^4 + c^6 + d^8 = 1$ và $a^{2016} + b^{2017} + c^{2018} + d^{2019} = 1$.\n` +
`Vì $a, b, c, d \\in \\mathbb{Q}$, ta có $a^2, b^4, c^6, d^8 \\ge 0$.\n` +
`Tổng của chúng bằng $1$ nên mỗi số hạng phải nhỏ hơn hoặc bằng $1$.\n` +
`$\\Rightarrow a^2 \\le 1 \\Rightarrow -1 \\le a \\le 1$.\n` +
`$\\Rightarrow b^4 \\le 1 \\Rightarrow -1 \\le b \\le 1$.\n` +
`$\\Rightarrow c^6 \\le 1 \\Rightarrow -1 \\le c \\le 1$.\n` +
`$\\Rightarrow d^8 \\le 1 \\Rightarrow -1 \\le d \\le 1$.\n` +
`Với $-1 \\le a \\le 1$, ta có $a^{2016} \\le a^2$.\n` +
`Với $-1 \\le b \\le 1$, ta có $b^{2017} \\le b^4$ (do $b^{2017} \\le |b^{2017}| = |b|^{2017} \\le b^4$).\n` +
`Với $-1 \\le c \\le 1$, ta có $c^{2018} \\le c^6$.\n` +
`Với $-1 \\le d \\le 1$, ta có $d^{2019} \\le d^8$.\n` +
`Do đó: $a^{2016} + b^{2017} + c^{2018} + d^{2019} \\le a^2 + b^4 + c^6 + d^8$.\n` +
`Dấu \"=\" xảy ra khi $\\begin{cases} a^{2016} = a^2 \\\\ b^{2017} = b^4 \\\\ c^{2018} = c^6 \\\\ d^{2019} = d^8 \\end{cases}$.\n` +
`Nghiệm của các phương trình này là:\n` +
`$a \\in \\{-1; 0; 1\\}$, $b \\in \\{0; 1\\}$, $c \\in \\{-1; 0; 1\\}$, $d \\in \\{0; 1\\}$.\n` +
`Mà $a^2 + b^4 + c^6 + d^8 = 1$, nên trong 4 số trên chỉ có đúng 1 số bằng $\\pm 1$, 3 số còn lại bằng $0$.\n` +
`Xét biểu thức $M = (a^3 - a) + 3(b^4 - b) + 5(c^5 - c) + 7(d^6 - d)$:\n` +
`- Nếu $a = \\pm 1$ thì $a^3 - a = 0$.\n` +
`- Nếu $b = 1$ thì $b^4 - b = 0$.\n` +
`- Nếu $c = \\pm 1$ thì $c^5 - c = 0$.\n` +
`- Nếu $d = 1$ thì $d^6 - d = 0$.\n` +
`Trong mọi trường hợp (dù biến nào bằng $\\pm 1$, các biến khác bằng $0$), các cụm trong $M$ đều có giá trị bằng $0$.\n` +
`**Kết luận:** Giá trị của biểu thức $M$ là $0$.`;

  const sol6 = `**a) Phân tích đa thức thành nhân tử:**\n` +
`$5x - xy + y^2 - 5y$\n` +
`Nhóm 2 hạng tử đầu, 2 hạng tử cuối:\n` +
`$= x(5 - y) - y(5 - y)$\n` +
`Đặt nhân tử chung $(5 - y)$:\n` +
`$= (x - y)(5 - y)$.\n\n` +
`**b) Tính nhanh giá trị của biểu thức:**\n` +
`Biểu thức: $A = x^2 + 2x + 1 - y^2$\n` +
`$= (x^2 + 2x + 1) - y^2$\n` +
`$= (x + 1)^2 - y^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (x + 1 - y)(x + 1 + y)$.\n` +
`Thay $x = 84, y = 15$ vào biểu thức:\n` +
`$A = (84 + 1 - 15)(84 + 1 + 15) = 70 \\cdot 100 = 7000$.\n` +
`**Kết luận:** Giá trị của biểu thức là $7000$.`;

  const sol7 = `Biểu thức: $P = x^2 - 4xy + 5y^2 + 10x - 22y + 2042$.\n` +
`Ta phân tích nhóm các hạng tử tạo thành các hằng đẳng thức:\n` +
`$P = (x^2 - 4xy + 4y^2) + 10x - 20y + 25 + y^2 - 2y + 1 + 2016$\n` +
`$P = (x - 2y)^2 + 10(x - 2y) + 25 + (y^2 - 2y + 1) + 2016$\n` +
`$P = [(x - 2y)^2 + 2 \\cdot (x - 2y) \\cdot 5 + 5^2] + (y - 1)^2 + 2016$\n` +
`$P = (x - 2y + 5)^2 + (y - 1)^2 + 2016$.\n` +
`Vì $(x - 2y + 5)^2 \\ge 0$ và $(y - 1)^2 \\ge 0$ với mọi $x, y$.\n` +
`Suy ra $P \\ge 2016$ với mọi $x, y$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} y - 1 = 0 \\\\ x - 2y + 5 = 0 \\end{cases} \\Leftrightarrow \\begin{cases} y = 1 \\\\ x = 2(1) - 5 = -3 \\end{cases}$\n` +
`**Kết luận:** Giá trị nhỏ nhất của $P$ là $2016$, đạt được tại $x = -3, y = 1$.`;

  const sol8 = `**1. Tìm x:**\n` +
`$2(x - 2) = x^2 - 4x + 4$\n` +
`$\\Leftrightarrow 2(x - 2) = (x - 2)^2$\n` +
`$\\Leftrightarrow (x - 2)^2 - 2(x - 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)(x - 2 - 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)(x - 4) = 0$\n` +
`$\\Rightarrow x - 2 = 0$ hoặc $x - 4 = 0$\n` +
`$\\Rightarrow x = 2$ hoặc $x = 4$.\n\n` +
`**2. Chứng minh tích số thứ nhất và thứ ba bé hơn bình phương số thứ hai 1 đơn vị:**\n` +
`Gọi ba số tự nhiên liên tiếp là $n - 1, n, n + 1$ (với $n \\in \\mathbb{N}^*$).\n` +
`Tích của số thứ nhất và số thứ ba là: $(n - 1)(n + 1) = n^2 - 1$.\n` +
`Bình phương của số thứ hai là: $n^2$.\n` +
`Ta có: $n^2 - (n^2 - 1) = 1$.\n` +
`Điều này chứng tỏ tích của số thứ nhất và thứ ba nhỏ hơn bình phương của số thứ hai đúng 1 đơn vị (đpcm).`;

  const sol9 = `Trong hình bình hành $ABCD$, hai góc kề một cạnh bù nhau, tức là tổng số đo bằng $180^\\circ$.\n` +
`Ta có: $\\widehat{A} + \\widehat{B} = 180^\\circ$.\n` +
`Theo đề bài $\\widehat{A} = 2\\widehat{B}$, thay vào ta được:\n` +
`$2\\widehat{B} + \\widehat{B} = 180^\\circ \\Leftrightarrow 3\\widehat{B} = 180^\\circ \\Leftrightarrow \\widehat{B} = 60^\\circ$.\n` +
`Mặt khác, trong hình bình hành các góc đối bằng nhau nên $\\widehat{D} = \\widehat{B} = 60^\\circ$.\n` +
`**Đáp án đúng là A.**`;

  const sol10 = `*(Đây là câu hỏi trắc nghiệm không có nội dung gốc. Hệ thống tự động phân loại đây là dạng câu hỏi nhận biết / thông hiểu trắc nghiệm khách quan).* \n\n` +
`**Hướng dẫn chung cho giáo viên:**\n` +
`1. Phân tích nội dung câu hỏi để xác định dạng kiến thức (Đại số hoặc Hình học).\n` +
`2. Sử dụng phương pháp loại trừ hoặc tính toán nhanh để chọn phương án $A, B, C$ hoặc $D$.\n` +
`3. Điền đáp án chi tiết tương ứng với đề gốc.`;

  const updates = [
    { id: "c74ee499-7f12-4bb3-a78f-934e2b300628", solution: sol1 },
    { id: "c784f0f8-9921-44f3-b0f9-8f0f9c8113bf", solution: sol2 },
    { id: "c8c27956-daba-4810-895c-3abfdf83a610", solution: sol3 },
    { id: "c9acbf86-f66d-4dc7-94b5-29f134e263d9", solution: sol4 },
    { id: "ca69d3c4-a16e-46e9-8c92-187d7ce01a17", solution: sol5 },
    { id: "ca915468-166d-4003-b57d-8ff2e1365476", solution: sol6 },
    { id: "cddb2e44-e763-450d-8299-c5631edce5a0", solution: sol7 },
    { id: "cf534b94-5e80-482a-a52d-077f2db3e475", solution: sol8 },
    { id: "d03703e6-3da2-4f0c-8a18-9337987ee4f1", solution: sol9 },
    { id: "d0a8d95e-efe9-43d4-8bf9-819cd89ee4ac", solution: sol10 }
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

manualFixBatch20Grade8().catch(console.error).finally(() => process.exit(0));
