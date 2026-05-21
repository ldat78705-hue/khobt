import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch12Grade8() {
  const sql = getDb();

  const sol1 = `**1)** $(x - 1)^2 + x(5 - x) = 0$\n` +
`$\\Leftrightarrow x^2 - 2x + 1 + 5x - x^2 = 0$\n` +
`$\\Leftrightarrow 3x + 1 = 0 \\Leftrightarrow 3x = -1 \\Rightarrow x = -\\frac{1}{3}$.\n\n` +
`**2)** $x^2 - 4x = 0$\n` +
`$\\Leftrightarrow x(x - 4) = 0 \\Rightarrow x = 0$ hoặc $x - 4 = 0 \\Rightarrow x = 4$.\n\n` +
`**3)** $\\left( x - \\frac{1}{2} \\right)^2 - (x + 2)(x - 2) = 0$\n` +
`$\\Leftrightarrow x^2 - x + \\frac{1}{4} - (x^2 - 4) = 0$\n` +
`$\\Leftrightarrow x^2 - x + \\frac{1}{4} - x^2 + 4 = 0$\n` +
`$\\Leftrightarrow -x + \\frac{17}{4} = 0 \\Rightarrow x = \\frac{17}{4}$.`;

  const sol2 = `**1)** $(2x - 3)(x + 1) = x(2x - 2) + 12$\n` +
`$\\Leftrightarrow 2x^2 + 2x - 3x - 3 = 2x^2 - 2x + 12$\n` +
`$\\Leftrightarrow 2x^2 - x - 3 = 2x^2 - 2x + 12$\n` +
`$\\Leftrightarrow -x + 2x = 12 + 3 \\Leftrightarrow x = 15$.\n` +
`Vậy phương trình có nghiệm $x = 15$.\n\n` +
`**2)** $3 - 5x = 7$\n` +
`$\\Leftrightarrow -5x = 7 - 3$\n` +
`$\\Leftrightarrow -5x = 4 \\Rightarrow x = -\\frac{4}{5}$.\n` +
`Vậy phương trình có nghiệm $x = -\\frac{4}{5}$.\n\n` +
`*(Lưu ý: Ý thứ ba \" + = \" trong đề bài gốc bị khuyết thiếu nội dung nên không thể giải được)*.`;

  const sol3 = `**a)** $(x - 1)(x + 1) - x(x - 4) = 15$\n` +
`$\\Leftrightarrow (x^2 - 1) - (x^2 - 4x) = 15$\n` +
`$\\Leftrightarrow x^2 - 1 - x^2 + 4x = 15$\n` +
`$\\Leftrightarrow 4x = 15 + 1 \\Leftrightarrow 4x = 16 \\Rightarrow x = 4$.\n` +
`Vậy $x = 4$.\n\n` +
`**b)** $x(x - 2)(x + 2) - (x + 3)(x^2 - 3x + 9) = 1$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương và tổng hai lập phương:\n` +
`$\\Leftrightarrow x(x^2 - 4) - (x^3 + 3^3) = 1$\n` +
`$\\Leftrightarrow x^3 - 4x - x^3 - 27 = 1$\n` +
`$\\Leftrightarrow -4x - 27 = 1 \\Leftrightarrow -4x = 28 \\Rightarrow x = -7$.\n` +
`Vậy $x = -7$.`;

  const sol4 = `**1)** $5x^2y + 10xy$\n` +
`$= 5xy(x + 2)$.\n\n` +
`**2)** $x^2 - 2xy + y^2 - 25$\n` +
`$= (x - y)^2 - 5^2$\n` +
`$= (x - y - 5)(x - y + 5)$.\n\n` +
`**3)** $x^3 - 8 + 2x(x - 2)$\n` +
`$= (x^3 - 2^3) + 2x(x - 2)$\n` +
`$= (x - 2)(x^2 + 2x + 4) + 2x(x - 2)$\n` +
`$= (x - 2)(x^2 + 2x + 4 + 2x)$\n` +
`$= (x - 2)(x^2 + 4x + 4)$\n` +
`$= (x - 2)(x + 2)^2$.\n\n` +
`**4)** $x^4 + x^2y^2 + y^4$\n` +
`$= (x^4 + 2x^2y^2 + y^4) - x^2y^2$\n` +
`$= (x^2 + y^2)^2 - (xy)^2$\n` +
`$= (x^2 + y^2 - xy)(x^2 + y^2 + xy)$.`;

  const sol5 = `Ta rút gọn biểu thức:\n` +
`$x(x - y) - y(y - x) = x(x - y) + y(x - y) = (x - y)(x + y) = x^2 - y^2$.\n` +
`**Đáp án đúng là B.**`;

  const sol6 = `Gọi chiều dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian dự định đi hết quãng đường là $t$ (giờ, $t > 0$).\n` +
`Thời gian đi với vận tốc $40$ km/h là $\\frac{x}{40}$ (giờ). Chậm hơn $30$ phút ($0,5$ giờ) nên ta có:\n` +
`$\\frac{x}{40} = t + 0,5 \\Rightarrow t = \\frac{x}{40} - 0,5$ (1)\n` +
`Thời gian đi với vận tốc $50$ km/h là $\\frac{x}{50}$ (giờ). Sớm hơn $24$ phút ($0,4$ giờ) nên ta có:\n` +
`$\\frac{x}{50} = t - 0,4 \\Rightarrow t = \\frac{x}{50} + 0,4$ (2)\n` +
`Từ (1) và (2) suy ra:\n` +
`$\\frac{x}{40} - 0,5 = \\frac{x}{50} + 0,4$\n` +
`$\\Leftrightarrow \\frac{x}{40} - \\frac{x}{50} = 0,9$\n` +
`$\\Leftrightarrow \\frac{5x - 4x}{200} = 0,9$\n` +
`$\\Leftrightarrow x = 0,9 \\cdot 200 = 180$ (thỏa mãn).\n` +
`**Kết luận:** Chiều dài quãng đường $AB$ là $180$ km.`;

  const sol7 = `**1. Tính giá trị của Q với $x = \\frac{1}{2}$:**\n` +
`Thay $x = \\frac{1}{2}$ (thỏa mãn ĐKXĐ $x \\ne 0, x \\ne \\pm 1$) vào biểu thức $Q$:\n` +
`$Q = \\frac{4 \\cdot \\frac{1}{2}}{\\left(\\frac{1}{2}\\right)^2 - 1} = \\frac{2}{\\frac{1}{4} - 1} = \\frac{2}{-\\frac{3}{4}} = -\\frac{8}{3}$.\n\n` +
`**2. Rút gọn P:**\n` +
`$P = \\frac{x + 1}{x - 1} + \\frac{x}{x + 1} - \\frac{x}{(x - 1)(x + 1)}$\n` +
`Mẫu chung là $(x - 1)(x + 1)$:\n` +
`$P = \\frac{(x + 1)^2 + x(x - 1) - x}{(x - 1)(x + 1)}$\n` +
`$P = \\frac{x^2 + 2x + 1 + x^2 - x - x}{x^2 - 1}$\n` +
`$P = \\frac{2x^2 + 1}{x^2 - 1}$.\n\n` +
`**3. Tìm x để A = 3/4:**\n` +
`$A = P : Q = \\frac{2x^2 + 1}{x^2 - 1} : \\frac{4x}{x^2 - 1} = \\frac{2x^2 + 1}{x^2 - 1} \\cdot \\frac{x^2 - 1}{4x} = \\frac{2x^2 + 1}{4x}$.\n` +
`Để $A = \\frac{3}{4} \\Leftrightarrow \\frac{2x^2 + 1}{4x} = \\frac{3}{4}$\n` +
`$\\Leftrightarrow 4(2x^2 + 1) = 12x \\Leftrightarrow 8x^2 - 12x + 4 = 0$\n` +
`Chia cả hai vế cho $4$: $2x^2 - 3x + 1 = 0$\n` +
`$\\Leftrightarrow 2x^2 - 2x - x + 1 = 0 \\Leftrightarrow 2x(x - 1) - (x - 1) = 0 \\Leftrightarrow (x - 1)(2x - 1) = 0$\n` +
`$\\Rightarrow x = 1$ (Loại vì vi phạm ĐKXĐ $x \\ne 1$) hoặc $x = \\frac{1}{2}$ (Nhận).\n` +
`Vậy $x = \\frac{1}{2}$.`;

  const sol8 = `Gọi độ dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian đi từ $A$ đến $B$ là: $\\frac{x}{30}$ (giờ).\n` +
`Thời gian đi từ $B$ về $A$ là: $\\frac{x}{35}$ (giờ).\n` +
`Thời gian nghỉ là $10$ phút = $\\frac{1}{6}$ giờ.\n` +
`Tổng thời gian cả đi, về và nghỉ là $6$ giờ $40$ phút = $6 + \\frac{40}{60}$ = $6 + \\frac{2}{3} = \\frac{20}{3}$ giờ.\n` +
`Ta có phương trình:\n` +
`$\\frac{x}{30} + \\frac{1}{6} + \\frac{x}{35} = \\frac{20}{3}$\n` +
`$\\Leftrightarrow \\frac{x}{30} + \\frac{x}{35} = \\frac{20}{3} - \\frac{1}{6} = \\frac{40 - 1}{6} = \\frac{39}{6} = \\frac{13}{2}$\n` +
`Quy đồng mẫu 2 vế với mẫu số chung $210$:\n` +
`$\\frac{7x + 6x}{210} = \\frac{13 \\cdot 105}{210}$\n` +
`$\\Leftrightarrow 13x = 13 \\cdot 105 \\Rightarrow x = 105$ (thỏa mãn).\n` +
`**Kết luận:** Quãng đường $AB$ dài $105$ km.`;

  const sol9 = `**1. Chứng minh MN // BC:**\n` +
`Trong $\\Delta ABC$, $BM$ và $CN$ là các đường trung tuyến $\\Rightarrow M$ là trung điểm $AC$, $N$ là trung điểm $AB$.\n` +
`Suy ra $MN$ là đường trung bình của $\\Delta ABC \\Rightarrow MN \\parallel BC$.\n\n` +
`**2. Tứ giác AKCI là hình gì? Vì sao?**\n` +
`Tứ giác $AKCI$ có hai đường chéo $AC$ và $IK$ cắt nhau tại $M$.\n` +
`Do $M$ là trung điểm của $AC$ (vì $BM$ là trung tuyến) và $M$ là trung điểm của $IK$ (do $MK = MI$).\n` +
`Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường nên $AKCI$ là hình bình hành.\n\n` +
`**3. Chứng minh I, P, D thẳng hàng:**\n` +
`Trong $\\Delta ABC$, $I$ là giao điểm của hai trung tuyến $BM$ và $CN$ nên $I$ là trọng tâm của $\\Delta ABC$.\n` +
`Do đó trung tuyến thứ ba xuất phát từ $A$ sẽ phải đi qua $I$. Tức là đường thẳng $AI$ đi qua trung điểm $P$ của $BC$. Vậy $A, I, P$ thẳng hàng.\n` +
`Mặt khác, $D$ đối xứng với $A$ qua $I$, suy ra $A, I, D$ thẳng hàng.\n` +
`Vì cả $P$ và $D$ đều nằm trên đường thẳng $AI$ nên $I, P, D$ thẳng hàng (đpcm).\n\n` +
`**4. Tìm điều kiện của tam giác ABC để tứ giác AKCI có đường chéo AC là phân giác của góc IAK:**\n` +
`Tứ giác $AKCI$ đã là hình bình hành. Để hình bình hành có một đường chéo là phân giác của một góc thì hình bình hành đó phải là hình thoi.\n` +
`Vậy $AKCI$ là hình thoi $\\Leftrightarrow AC \\perp IK$. Mà $I, K$ nằm trên đường trung tuyến $BM$.\n` +
`Nên $BM \\perp AC$. \n` +
`Trong $\\Delta ABC$, $BM$ vừa là đường trung tuyến vừa là đường cao, do đó $\\Delta ABC$ phải cân tại $B$ ($BA = BC$).\n` +
`**Kết luận:** Điều kiện để $AC$ là phân giác $\\widehat{IAK}$ là $\\Delta ABC$ cân tại $B$.`;

  const sol10 = `**a)** $\\frac{3x + 2}{2} - \\frac{3x + 1}{6} = 2x + \\frac{5}{3}$\n` +
`Quy đồng mẫu hai vế với mẫu chung $6$:\n` +
`$\\Leftrightarrow \\frac{3(3x + 2)}{6} - \\frac{3x + 1}{6} = \\frac{12x}{6} + \\frac{10}{6}$\n` +
`$\\Leftrightarrow 9x + 6 - 3x - 1 = 12x + 10$\n` +
`$\\Leftrightarrow 6x + 5 = 12x + 10$\n` +
`$\\Leftrightarrow 12x - 6x = 5 - 10 \\Leftrightarrow 6x = -5 \\Rightarrow x = -\\frac{5}{6}$.\n` +
`Vậy $x = -\\frac{5}{6}$.\n\n` +
`**b)** $\\frac{x}{2x - 6} + \\frac{x}{2x + 2} = \\frac{-2x}{(3 - x)(x + 1)}$\n` +
`$\\Leftrightarrow \\frac{x}{2(x - 3)} + \\frac{x}{2(x + 1)} = \\frac{2x}{(x - 3)(x + 1)}$\n` +
`Điều kiện xác định: $x \\ne 3; x \\ne -1$.\n` +
`Quy đồng hai vế với mẫu thức chung $2(x - 3)(x + 1)$:\n` +
`$\\frac{x(x + 1)}{2(x - 3)(x + 1)} + \\frac{x(x - 3)}{2(x - 3)(x + 1)} = \\frac{4x}{2(x - 3)(x + 1)}$\n` +
`$\\Rightarrow x^2 + x + x^2 - 3x = 4x$\n` +
`$\\Leftrightarrow 2x^2 - 2x = 4x \\Leftrightarrow 2x^2 - 6x = 0$\n` +
`$\\Leftrightarrow 2x(x - 3) = 0 \\Rightarrow x = 0$ hoặc $x = 3$.\n` +
`Đối chiếu ĐKXĐ, $x = 3$ bị loại. \n` +
`Vậy $x = 0$.`;

  const updates = [
    { id: "7397ff2c-e5a1-4688-bbbd-1b8b35051cd0", solution: sol1 },
    { id: "73bc9e19-8ed7-4367-a0f6-1387f72dc3dd", solution: sol2 },
    { id: "765ff7b6-f3ea-44b7-85ec-61076c0d5415", solution: sol3 },
    { id: "77f1e3d8-78b0-4ed7-b60b-273a124b56aa", solution: sol4 },
    { id: "79c745d9-526e-44a0-84b4-9231e37f1de6", solution: sol5 },
    { id: "79f4d446-b897-4955-99e5-db3e4dab0bcc", solution: sol6 },
    { id: "7afb2988-c596-4e18-8ad7-90962405133a", solution: sol7 },
    { id: "7c2f2134-7812-483c-9e09-6ea106fb38b8", solution: sol8 },
    { id: "7c8a0600-3896-4f2a-abb6-e8cae8f2cfab", solution: sol9 },
    { id: "7d7c217b-94fa-479e-950d-a1f4fde77ebb", solution: sol10 }
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

manualFixBatch12Grade8().catch(console.error).finally(() => process.exit(0));
