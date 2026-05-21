import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch64() {
  const sql = getDb();

  const sol1 = `Trong ba tuần đầu, nhà máy đã thực hiện được số phần kế hoạch là:\n` +
`$\\frac{4}{15} + \\frac{7}{30} + \\frac{3}{10} = \\frac{8}{30} + \\frac{7}{30} + \\frac{9}{30} = \\frac{24}{30} = \\frac{4}{5}$ (kế hoạch).\n\n` +
`Để hoàn thành kế hoạch của tháng (coi toàn bộ kế hoạch là 1), trong tuần cuối nhà máy phải thực hiện số phần kế hoạch là:\n` +
`$1 - \\frac{4}{5} = \\frac{1}{5}$ (kế hoạch).\n\n` +
`**Kết luận:** Tuần cuối nhà máy phải thực hiện $\\frac{1}{5}$ kế hoạch.`;

  const sol2 = `Từ tỉ lệ thức $\\frac{-15}{5,1} = \\frac{-35}{11,9}$, theo tính chất của tỉ lệ thức ta có thể lập được 3 tỉ lệ thức khác bằng cách đổi chỗ các ngoại tỉ, nội tỉ, hoặc nghịch đảo hai vế:\n\n` +
`1) Đổi chỗ hai ngoại tỉ: $\\frac{11,9}{5,1} = \\frac{-35}{-15}$\n\n` +
`2) Đổi chỗ hai nội tỉ: $\\frac{-15}{-35} = \\frac{5,1}{11,9}$\n\n` +
`3) Nghịch đảo hai vế (hoặc đổi chỗ cả ngoại tỉ và nội tỉ): $\\frac{5,1}{-15} = \\frac{11,9}{-35}$`;

  const sol3 = `a) Vì $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k = -\\frac{3}{4}$, nên biểu diễn $y$ theo $x$ là:\n` +
`$y = -\\frac{3}{4}x$.\n\n` +
`b) Từ $y = -\\frac{3}{4}x$, ta suy ra $x = y : \\left( -\\frac{3}{4} \\right) = -\\frac{4}{3}y$.\n` +
`Vậy $x$ tỉ lệ thuận với $y$ theo hệ số tỉ lệ là $-\\frac{4}{3}$.`;

  const sol4 = `Mật độ dân số khu vực Đông Nam Á gấp mật độ dân số thế giới số lần là:\n` +
`$124 : 48 = \\frac{124}{48} = \\frac{31}{12} \\approx 2,5833...$\n\n` +
`Làm tròn kết quả đến chữ số thập phân thứ nhất, ta được:\n` +
`$\\frac{31}{12} \\approx 2,6$ (lần).\n\n` +
`**Kết luận:** Mật độ dân số khu vực Đông Nam Á gấp khoảng $2,6$ lần mật độ dân số thế giới.`;

  const sol5 = `**a)** $5^x + 5^{x+2} = 650$\n` +
`$\\Rightarrow 5^x + 5^x \\cdot 5^2 = 650$\n` +
`$\\Rightarrow 5^x \\cdot (1 + 25) = 650$\n` +
`$\\Rightarrow 5^x \\cdot 26 = 650$\n` +
`$\\Rightarrow 5^x = 650 : 26 = 25$\n` +
`$\\Rightarrow 5^x = 5^2 \\Rightarrow x = 2$.\n\n` +
`**b)** $3^{x-1} + 5 \\cdot 3^{x-1} = 162$\n` +
`$\\Rightarrow 3^{x-1} \\cdot (1 + 5) = 162$\n` +
`$\\Rightarrow 3^{x-1} \\cdot 6 = 162$\n` +
`$\\Rightarrow 3^{x-1} = 162 : 6 = 27$\n` +
`$\\Rightarrow 3^{x-1} = 3^3 \\Rightarrow x - 1 = 3 \\Rightarrow x = 4$.`;

  const sol6 = `*(Có nhiều cách biểu diễn, dưới đây là một số ví dụ minh hoạ)*\n\n` +
`a) $\\frac{3}{8} = \\frac{1}{8} + \\frac{2}{8} = \\frac{1}{8} + \\frac{1}{4}$.\n\n` +
`b) $\\frac{5}{12} = \\frac{1}{12} + \\frac{4}{12} = \\frac{1}{12} + \\frac{1}{3}$.\n\n` +
`c) $\\frac{1}{11} = \\frac{2}{11} - \\frac{1}{11}$ hoặc $\\frac{1}{11} = \\frac{3}{11} - \\frac{2}{11}$.\n\n` +
`d) $\\frac{1}{4} = \\frac{1}{8} + \\frac{1}{8}$ hoặc $\\frac{1}{4} = \\frac{1}{2} - \\frac{1}{4}$.`;

  const sol7 = `**a)** $-\\sqrt{225} + \\sqrt{36}$\n` +
`Ta có: $\\sqrt{225} = 15$ và $\\sqrt{36} = 6$.\n` +
`$\\Rightarrow -\\sqrt{225} + \\sqrt{36} = -15 + 6 = -9$.\n\n` +
`**b)** $-\\sqrt{100} - \\sqrt{49}$\n` +
`Ta có: $\\sqrt{100} = 10$ và $\\sqrt{49} = 7$.\n` +
`$\\Rightarrow -\\sqrt{100} - \\sqrt{49} = -10 - 7 = -17$.`;

  const sol8 = `*(Do đề bài không hiển thị hình ảnh các tam giác, ta áp dụng phương pháp sau để nhận biết:)*\n\n` +
`- **Tam giác cân:** Là tam giác có hai cạnh bằng nhau. Nếu hình vẽ có ký hiệu hai cạnh bằng nhau (hoặc hai góc ở đáy bằng nhau), đó là tam giác cân.\n` +
`- **Tam giác đều:** Là tam giác có ba cạnh bằng nhau. Nếu hình vẽ có ký hiệu cả ba cạnh bằng nhau (hoặc ba góc bằng nhau và mỗi góc bằng $60^\\circ$), đó là tam giác đều.\n\n` +
`*Lưu ý: Tam giác đều cũng là một trường hợp đặc biệt của tam giác cân.*`;

  const sol9 = `**a)** $x^2 - 100 = 0$\n` +
`$\\Rightarrow x^2 = 100$\n` +
`$\\Rightarrow x = 10$ hoặc $x = -10$.\n` +
`Vậy $x \\in \\{-10; 10\\}$.\n\n` +
`**b)** $x^2 - 25 = 0$\n` +
`$\\Rightarrow x^2 = 25$\n` +
`$\\Rightarrow x = 5$ hoặc $x = -5$.\n` +
`Vậy $x \\in \\{-5; 5\\}$.`;

  const sol10 = `a) Ta có: $0,3 : 2,7 = \\frac{0,3}{2,7} = \\frac{1}{9}$.\n` +
`$1,71 : 15,39 = \\frac{1,71}{15,39} = \\frac{171}{1539} = \\frac{1}{9}$.\n` +
`Vì $0,3 : 2,7 = 1,71 : 15,39$ nên **có** lập được tỉ lệ thức.\n\n` +
`b) Ta có: $4,86 : 11,34 = \\frac{4,86}{11,34} = \\frac{486}{1134} = \\frac{3}{7}$.\n` +
`$9,3 : 21,6 = \\frac{9,3}{21,6} = \\frac{93}{216} = \\frac{31}{72}$.\n` +
`Vì $\\frac{3}{7} \\ne \\frac{31}{72}$ nên **không** lập được tỉ lệ thức.\n\n` +
`c) Ta có: $\\frac{3}{5} : 6 = \\frac{3}{5} \\cdot \\frac{1}{6} = \\frac{1}{10}$.\n` +
`$\\frac{4}{5} : 8 = \\frac{4}{5} \\cdot \\frac{1}{8} = \\frac{1}{10}$.\n` +
`Vì hai tỉ số bằng nhau nên **có** lập được tỉ lệ thức.\n\n` +
`d) Ta có: $2\\frac{1}{3} : 7 = \\frac{7}{3} : 7 = \\frac{7}{3} \\cdot \\frac{1}{7} = \\frac{1}{3}$.\n` +
`$3\\frac{1}{4} : 13 = \\frac{13}{4} : 13 = \\frac{13}{4} \\cdot \\frac{1}{13} = \\frac{1}{4}$.\n` +
`Vì $\\frac{1}{3} \\ne \\frac{1}{4}$ nên **không** lập được tỉ lệ thức.`;

  const updates = [
    { id: "9b6bcd53-d67c-447d-8a4e-7281108fcd2e", solution: sol1 },
    { id: "9b72ae71-d1dd-4301-be8a-d3b369298641", solution: sol2 },
    { id: "9b93585d-2cfb-417c-947b-29c331a74e80", solution: sol3 },
    { id: "9ba00685-594a-464e-bae9-d7e40b2fe171", solution: sol4 },
    { id: "9bd0c307-2f5c-4054-9f48-d63d578bddf7", solution: sol5 },
    { id: "9d04e96f-8abb-4ecd-9edd-dfced5d0ceba", solution: sol6 },
    { id: "9e1f971e-cf20-472c-973f-b7bfe8e92835", solution: sol7 },
    { id: "9e4546ac-efaa-43d7-9657-500143b8b226", solution: sol8 },
    { id: "9e7cafcf-8aef-42c6-b2c1-566cb5c6766f", solution: sol9 },
    { id: "9e96fba4-9912-4794-9422-4e848ea3d8ea", solution: sol10 }
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

manualFixBatch64().catch(console.error).finally(() => process.exit(0));
