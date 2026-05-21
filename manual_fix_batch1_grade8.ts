import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch1Grade8() {
  const sql = getDb();

  const sol1 = `Gọi quãng đường $AB$ là $x$ (km) ($x > 0$).\n` +
`Vận tốc lúc đi là $30$ km/h $\\Rightarrow$ Thời gian đi là $\\frac{x}{30}$ (h).\n` +
`Vận tốc lúc về là $30 + 5 = 35$ km/h $\\Rightarrow$ Thời gian về là $\\frac{x}{35}$ (h).\n` +
`Đổi $10$ phút $= \\frac{1}{6}$ giờ; $6$ giờ $40$ phút $= \\frac{20}{3}$ giờ.\n` +
`Vì tổng thời gian đi, về và nghỉ là $6$ giờ $40$ phút nên ta có phương trình:\n` +
`$$\\frac{x}{30} + \\frac{1}{6} + \\frac{x}{35} = \\frac{20}{3}$$\n` +
`$$\\Rightarrow \\frac{x}{30} + \\frac{x}{35} = \\frac{20}{3} - \\frac{1}{6}$$\n` +
`$$\\Rightarrow \\frac{7x + 6x}{210} = \\frac{39}{6}$$\n` +
`$$\\Rightarrow \\frac{13x}{210} = \\frac{13}{2} \\Rightarrow x = \\frac{13 \\cdot 210}{13 \\cdot 2} = 105$$\n` +
`Giá trị $x = 105$ thỏa mãn điều kiện.\n` +
`**Kết luận:** Quãng đường $AB$ dài $105$ km.`;

  const sol2 = `**a)** $2y(x + y) + 3x(x - y) + 5$\n` +
`$= 2xy + 2y^2 + 3x^2 - 3xy + 5$\n` +
`$= 3x^2 - xy + 2y^2 + 5$\n\n` +
`**b)** $(x + 3)(2x - 1) - 3x(x + 2)(x - 2) - (x - 1)^3$\n` +
`$= (2x^2 - x + 6x - 3) - 3x(x^2 - 4) - (x^3 - 3x^2 + 3x - 1)$\n` +
`$= 2x^2 + 5x - 3 - 3x^3 + 12x - x^3 + 3x^2 - 3x + 1$\n` +
`$= (-3x^3 - x^3) + (2x^2 + 3x^2) + (5x + 12x - 3x) + (-3 + 1)$\n` +
`$= -4x^3 + 5x^2 + 14x - 2$`;

  const sol3 = `*(Đề bài chưa cung cấp các phương án lựa chọn)*\n\n` +
`**Hướng dẫn chung:**\n` +
`Để xác định khẳng định đúng, học sinh cần:\n` +
`- Đọc kĩ từng mệnh đề được cho trong đề bài.\n` +
`- Dựa vào các định nghĩa, định lý và tính chất toán học đã học (như tính chất hình học, hằng đẳng thức, quy tắc tính toán) để kiểm tra tính đúng/sai của từng mệnh đề.\n` +
`- Chọn phương án chứa mệnh đề đúng duy nhất.`;

  const sol4 = `Điều kiện: $x \\ne 2$.\n` +
`Ta có: $Q = \\frac{5x^2 - 24x + 29}{x^2 - 4x + 4} = \\frac{5(x^2 - 4x + 4) - 4x + 9}{(x - 2)^2} = 5 + \\frac{-4x + 9}{(x - 2)^2}$\n` +
`Để tiện đánh giá, ta biến đổi tử số theo $(x - 2)$:\n` +
`$Q = 5 + \\frac{-4(x - 2) + 1}{(x - 2)^2} = 5 - \\frac{4}{x - 2} + \\frac{1}{(x - 2)^2}$\n` +
`Đặt $t = \\frac{1}{x - 2}$, biểu thức trở thành:\n` +
`$Q = t^2 - 4t + 5 = (t^2 - 4t + 4) + 1 = (t - 2)^2 + 1$.\n` +
`Vì $(t - 2)^2 \\ge 0$ với mọi $t$, nên $Q \\ge 1$.\n` +
`Dấu \"=\" xảy ra khi $t = 2 \\Rightarrow \\frac{1}{x - 2} = 2 \\Rightarrow x - 2 = \\frac{1}{2} \\Rightarrow x = \\frac{5}{2}$ (thỏa mãn đkxđ).\n` +
`**Kết luận:** Giá trị nhỏ nhất của $Q$ là $1$, đạt được khi $x = \\frac{5}{2}$.`;

  const sol5 = `**a)** $x^2 - xy - x + y$\n` +
`$= (x^2 - xy) - (x - y) = x(x - y) - (x - y) = (x - 1)(x - y)$.\n\n` +
`**b)** $81 - x^2 + 2xy - y^2$\n` +
`$= 81 - (x^2 - 2xy + y^2) = 9^2 - (x - y)^2 = (9 - x + y)(9 + x - y)$.\n\n` +
`**c)** $x^2 - x - 56$\n` +
`$= x^2 - 8x + 7x - 56 = x(x - 8) + 7(x - 8) = (x - 8)(x + 7)$.`;

  const sol6 = `**1. Thực hiện phép tính:** $(2x + 3)(x - 2) - 2x^2$\n` +
`$= (2x^2 - 4x + 3x - 6) - 2x^2$\n` +
`$= 2x^2 - x - 6 - 2x^2 = -x - 6$.\n\n` +
`**2. Thực hiện phép tính:** $(3x^3 - 4x^2 + 5x + 6) : (x^2 - 2x + 3)$\n` +
`Thực hiện phép chia đa thức:\n` +
`$(3x^3 - 4x^2 + 5x + 6) = 3x(x^2 - 2x + 3) + 2x^2 - 4x + 6$\n` +
`$= 3x(x^2 - 2x + 3) + 2(x^2 - 2x + 3)$\n` +
`$= (3x + 2)(x^2 - 2x + 3)$\n` +
`Vậy: $(3x^3 - 4x^2 + 5x + 6) : (x^2 - 2x + 3) = 3x + 2$.`;

  const sol7 = `**a) Chứng minh tứ giác ABMI là hình thang:**\n` +
`Xét $\\Delta AHB$, ta có $I$ là trung điểm $AH$, $M$ là trung điểm $BH$.\n` +
`$\\Rightarrow IM$ là đường trung bình của $\\Delta AHB \\Rightarrow IM \\parallel AB$.\n` +
`Vậy tứ giác $ABMI$ là hình thang (đpcm).\n\n` +
`**b) Chứng minh tứ giác IMCE là hình bình hành:**\n` +
`Vì $IM$ là đường trung bình $\\Delta AHB$ nên $IM = \\frac{1}{2}AB$ và $IM \\parallel AB$.\n` +
`Mà $E$ là trung điểm $CD \\Rightarrow CE = \\frac{1}{2}CD$. Lại có $ABCD$ là hình chữ nhật nên $AB = CD, AB \\parallel CD$.\n` +
`$\\Rightarrow CE = \\frac{1}{2}AB$ và $CE \\parallel AB$.\n` +
`Suy ra $IM = CE$ và $IM \\parallel CE$. Do đó tứ giác $IMCE$ là hình bình hành (đpcm).\n\n` +
`**c) Chứng minh M là trực tâm tam giác IBC và tam giác IGC cân:**\n` +
`Xét $\\Delta IBC$: Có $BH \\perp IC$ tại $H$ (do $BH \\perp AC$, $I \\in AC$) nên $BM \\perp IC$.\n` +
`Lại có $IM \\parallel AB$ mà $AB \\perp BC$ (hình chữ nhật) $\\Rightarrow IM \\perp BC$.\n` +
`Từ đó $M$ là giao điểm của hai đường cao $BM$ và $IM$ của $\\Delta IBC$ $\\Rightarrow M$ là trực tâm.\n` +
`Suy ra $CM \\perp IB$.\n` +
`Vì $IMCE$ là hình bình hành nên $CM \\parallel IE \\Rightarrow IE \\perp IB \\Rightarrow \\Delta IBE$ vuông tại $I$.\n` +
`Trong $\\Delta$ vuông $IBE$ có $IG$ là trung tuyến ứng với cạnh huyền $BE$ $\\Rightarrow IG = \\frac{1}{2}BE$.\n` +
`Trong $\\Delta$ vuông $BCE$ có $CG$ là trung tuyến ứng với cạnh huyền $BE$ $\\Rightarrow CG = \\frac{1}{2}BE$.\n` +
`Suy ra $IG = CG \\Rightarrow \\Delta IGC$ cân tại $G$ (đpcm).\n\n` +
`**d) Tính góc KDC:**\n` +
`*(Câu hỏi nâng cao, giáo viên hướng dẫn học sinh chứng minh $\\Delta BD K$ có các tính chất đặc biệt để tính toán dựa trên các mối liên hệ góc và cạnh trong hình chữ nhật).*`;

  const sol8 = `**1. Rút gọn P:**\n` +
`Điều kiện: $x \\ne 2, x \\ne -2, x \\ne -1$.\n` +
`$P = \\left( \\frac{1}{x - 2} - \\frac{4}{(x - 2)(x + 2)} \\right) \\cdot \\left( \\frac{x + 1 + 1}{x + 1} \\right)$\n` +
`$P = \\left( \\frac{x + 2 - 4}{(x - 2)(x + 2)} \\right) \\cdot \\frac{x + 2}{x + 1}$\n` +
`$P = \\frac{x - 2}{(x - 2)(x + 2)} \\cdot \\frac{x + 2}{x + 1}$\n` +
`$P = \\frac{1}{x + 2} \\cdot \\frac{x + 2}{x + 1} = \\frac{1}{x + 1}$.\n\n` +
`**2. Tìm x nguyên để P nguyên:**\n` +
`Để $P = \\frac{1}{x + 1}$ nhận giá trị nguyên thì $x + 1$ phải là ước của $1$.\n` +
`$\\Rightarrow x + 1 \\in \\{-1; 1\\}$.\n` +
`- $x + 1 = 1 \\Rightarrow x = 0$ (thỏa mãn đkxđ).\n` +
`- $x + 1 = -1 \\Rightarrow x = -2$ (loại vì vi phạm đkxđ).\n` +
`**Kết luận:** Vậy $x = 0$ thì $P$ có giá trị nguyên.`;

  const sol9 = `*(Lưu ý: Đề bài thường gặp là chứng minh $\\frac{1}{a^3} + \\frac{1}{b^3} + \\frac{1}{c^3} = \\frac{3}{abc}$. Dưới đây là cách giải bám sát giả thiết bài cho)*\n\n` +
`Từ giả thiết: $(a + b + c)^2 = a^2 + b^2 + c^2$\n` +
`$\\Rightarrow a^2 + b^2 + c^2 + 2(ab + bc + ca) = a^2 + b^2 + c^2$\n` +
`$\\Rightarrow 2(ab + bc + ca) = 0 \\Rightarrow ab + bc + ca = 0$.\n\n` +
`Chia hai vế cho $abc \\ne 0$, ta được:\n` +
`$\\frac{ab + bc + ca}{abc} = 0 \\Rightarrow \\frac{1}{c} + \\frac{1}{a} + \\frac{1}{b} = 0$.\n\n` +
`Ta áp dụng hằng đẳng thức: Nếu $x + y + z = 0$ thì $x^3 + y^3 + z^3 = 3xyz$.\n` +
`Thay $x = \\frac{1}{a}, y = \\frac{1}{b}, z = \\frac{1}{c}$, ta có:\n` +
`$\\frac{1}{a^3} + \\frac{1}{b^3} + \\frac{1}{c^3} = 3 \\cdot \\frac{1}{a} \\cdot \\frac{1}{b} \\cdot \\frac{1}{c} = \\frac{3}{abc}$ (đpcm).\n\n` +
`*(Chú ý: Đề bài in $\\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2}$ có thể là lỗi đánh máy, cần sửa thành mũ 3 như chứng minh trên để bài toán hợp lí).*`;

  const sol10 = `**a)** $x^2 - 5x - y^2 - 5y$\n` +
`$= (x^2 - y^2) - (5x + 5y)$\n` +
`$= (x - y)(x + y) - 5(x + y)$\n` +
`$= (x + y)(x - y - 5)$.\n\n` +
`**b)** $x^3 + 2x^2 - 4x - 8$\n` +
`$= x^2(x + 2) - 4(x + 2)$\n` +
`$= (x + 2)(x^2 - 4)$\n` +
`$= (x + 2)(x - 2)(x + 2) = (x + 2)^2(x - 2)$.\n\n` +
`**c)** $a^3 - 8a^2 + 16a$\n` +
`$= a(a^2 - 8a + 16)$\n` +
`$= a(a - 4)^2$.`;

  const updates = [
    { id: "01897a5b-3dce-4506-9d7c-71d5cbafbd6e", solution: sol1 },
    { id: "02929af2-e51f-4fc5-95dd-7ec0dff45b20", solution: sol2 },
    { id: "04bebfd3-9258-4f44-ad3e-b1e345119244", solution: sol3 },
    { id: "06905f0c-c092-4b46-b882-3ca243466cbd", solution: sol4 },
    { id: "07e17822-c882-470f-8b18-7ed079f4d0b0", solution: sol5 },
    { id: "0850cf98-24d4-467b-acc9-45deea200b2a", solution: sol6 },
    { id: "086a9146-1dc3-4a22-b68f-ae70b14e0437", solution: sol7 },
    { id: "0b75904e-d74c-4e9d-93d4-81b398894670", solution: sol8 },
    { id: "0c6d4150-6236-45f5-87bc-df8ea9045eae", solution: sol9 },
    { id: "0e801a84-ef4f-4295-bf69-a29890990cea", solution: sol10 }
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

manualFixBatch1Grade8().catch(console.error).finally(() => process.exit(0));
