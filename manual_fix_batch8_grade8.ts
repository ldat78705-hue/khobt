import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch8Grade8() {
  const sql = getDb();

  const sol1 = `Gọi thời gian từ lúc ô tô khởi hành đến lúc hai xe gặp nhau là $t$ (giờ) ($t > 0$).\n` +
`Vì xe máy xuất phát trước ô tô $20$ phút ($\\frac{1}{3}$ giờ) nên thời gian xe máy đi cho đến khi gặp nhau là: $t + \\frac{1}{3}$ (giờ).\n` +
`Quãng đường xe máy đã đi là: $30\\left(t + \\frac{1}{3}\\right)$ (km).\n` +
`Quãng đường ô tô đã đi là: $45t$ (km).\n` +
`Hai xe đi ngược chiều và gặp nhau, tổng quãng đường hai xe đi được đúng bằng độ dài quãng đường $AB$ ($90$ km). Ta có phương trình:\n` +
`$30\\left(t + \\frac{1}{3}\\right) + 45t = 90$\n` +
`$\\Leftrightarrow 30t + 10 + 45t = 90$\n` +
`$\\Leftrightarrow 75t = 80 \\Rightarrow t = \\frac{80}{75} = \\frac{16}{15}$ (giờ) = $1$ giờ $4$ phút.\n` +
`**Kết luận:** Sau $1$ giờ $4$ phút (hay $\\frac{16}{15}$ giờ) kể từ lúc ô tô khởi hành thì hai xe gặp nhau.`;

  const sol2 = `**1. Tìm x:**\n` +
`$5x(x + 1) - 3(x + 1)(x - 1) = 2x^2 + 23$\n` +
`$\\Leftrightarrow 5x^2 + 5x - 3(x^2 - 1) = 2x^2 + 23$\n` +
`$\\Leftrightarrow 5x^2 + 5x - 3x^2 + 3 = 2x^2 + 23$\n` +
`$\\Leftrightarrow 2x^2 + 5x + 3 = 2x^2 + 23$\n` +
`$\\Leftrightarrow 5x = 23 - 3 \\Leftrightarrow 5x = 20 \\Rightarrow x = 4$.\n` +
`Vậy $x = 4$.\n\n` +
`**2. Thực hiện phép tính:**\n` +
`ĐKXĐ: $x \\ne \\pm y$.\n` +
`$\\frac{2}{x + y} + \\frac{1}{x - y} + \\frac{-2x}{x^2 - y^2}$\n` +
`Mẫu thức chung là $x^2 - y^2 = (x - y)(x + y)$. Quy đồng:\n` +
`$= \\frac{2(x - y)}{(x + y)(x - y)} + \\frac{1(x + y)}{(x - y)(x + y)} - \\frac{2x}{(x - y)(x + y)}$\n` +
`$= \\frac{2x - 2y + x + y - 2x}{(x - y)(x + y)}$\n` +
`$= \\frac{x - y}{(x - y)(x + y)} = \\frac{1}{x + y}$.`;

  const sol3 = `*(Lưu ý: Đề bài gốc có lỗi đánh máy \"Gọi H là trung điểm của AC\" trong khi $AH$ là đường cao. Sửa lại chuẩn logic hình học: \"Gọi I là trung điểm của AC, D đối xứng H qua I\")*\n\n` +
`**a) Chứng minh tứ giác ADCH là hình chữ nhật:**\n` +
`Vì $D$ đối xứng với $H$ qua $I$ nên $I$ là trung điểm của $HD$.\n` +
`Tứ giác $ADCH$ có hai đường chéo $AC$ và $HD$ cắt nhau tại trung điểm $I$ của mỗi đường nên là hình bình hành.\n` +
`Mặt khác, $AH$ là đường cao của $\\Delta ABC$ nên $\\widehat{AHC} = 90^\\circ$.\n` +
`Hình bình hành $ADCH$ có một góc vuông nên là hình chữ nhật.\n\n` +
`**b) Chứng minh tứ giác ADHB là hình bình hành:**\n` +
`Vì $ADCH$ là hình chữ nhật nên $AD \\parallel HC$ và $AD = HC$.\n` +
`Do $\\Delta ABC$ cân tại $A$, đường cao $AH$ đồng thời là đường trung tuyến $\\Rightarrow H$ là trung điểm $BC \\Rightarrow BH = HC$.\n` +
`Suy ra $AD = BH$ và $AD \\parallel BH$ (do $H, B, C$ thẳng hàng).\n` +
`Tứ giác $ADHB$ có hai cạnh đối $AD \\parallel BH$ và $AD = BH$ nên là hình bình hành.\n\n` +
`**c) Chứng minh điểm A đối xứng với điểm H qua đường thẳng EI:**\n` +
`Xét $\\Delta ABC$ có $E$ là trung điểm $AB$, $I$ là trung điểm $AC \\Rightarrow EI$ là đường trung bình $\\Rightarrow EI \\parallel BC$.\n` +
`Mà $AH \\perp BC$ nên $AH \\perp EI$.\n` +
`Gọi $K$ là giao điểm của $EI$ và $AH$. Trong $\\Delta ABH$, $E$ là trung điểm $AB$ và $EK \\parallel BH$, nên $K$ là trung điểm $AH$.\n` +
`Đường thẳng $EI$ vuông góc với $AH$ tại trung điểm $K$ của $AH$, do đó $EI$ là đường trung trực của $AH$.\n` +
`Vậy $A$ đối xứng với $H$ qua $EI$.\n\n` +
`**d) Chứng minh AF = 1/3 AC:**\n` +
`Vì $AD \\parallel BC \\Rightarrow AD \\parallel BH \\Rightarrow \\Delta AFD \\sim \\Delta CFB$ (hệ quả định lý Thales).\n` +
`Ta có tỉ số: $\\frac{AF}{FC} = \\frac{AD}{BC}$.\n` +
`Mà $AD = HC = \\frac{1}{2}BC \\Rightarrow \\frac{AF}{FC} = \\frac{1}{2} \\Rightarrow FC = 2AF$.\n` +
`Lại có $AC = AF + FC = AF + 2AF = 3AF \\Rightarrow AF = \\frac{1}{3}AC$ (đpcm).`;

  const sol4 = `Ta có biến đổi:\n` +
`$-(2x - 4)(x + 1) = (-(2x - 4))(x + 1) = (4 - 2x)(x + 1)$.\n` +
`Nên $21 - (2x - 4)(x + 1) = 21 + (4 - 2x)(x + 1)$.\n` +
`**Đáp án đúng là B.**`;

  const sol5 = `Ta xét biểu thức: $(x + y - \\frac{z}{2})^2 + \\frac{3}{4}z^2$\n` +
`Khai triển biểu thức:\n` +
`$(x + y)^2 - z(x + y) + \\frac{z^2}{4} + \\frac{3}{4}z^2 = x^2 + 2xy + y^2 - zx - zy + z^2$\n` +
`Sắp xếp lại:\n` +
`$= x^2 + y^2 + z^2 + 2xy - yz - zx$.\n` +
`Vì bình phương luôn không âm nên $(x + y - \\frac{z}{2})^2 + \\frac{3}{4}z^2 \\ge 0$.\n` +
`$\\Rightarrow x^2 + y^2 + z^2 + 2xy - yz - zx \\ge 0$\n` +
`$\\Rightarrow 2xy - yz - zx \\ge -(x^2 + y^2 + z^2)$.\n` +
`Mà theo giả thiết $x^2 + y^2 + z^2 = 200$.\n` +
`Nên $M = 2xy - yz - zx \\ge -200$.\n` +
`Dấu \"=\" xảy ra khi và chỉ khi:\n` +
`$\\begin{cases} x + y - \\frac{z}{2} = 0 \\\\ z = 0 \\\\ x^2 + y^2 + z^2 = 200 \\end{cases} \\Rightarrow \\begin{cases} z = 0 \\\\ x = -y \\\\ 2x^2 = 200 \\end{cases} \\Rightarrow x = \\pm 10, y = \\mp 10, z = 0$.\n` +
`**Kết luận:** Giá trị nhỏ nhất của $M$ là $-200$.`;

  const sol6 = `**a) $5x^3y + 40y$**\n` +
`Đặt nhân tử chung $5y$:\n` +
`$= 5y(x^3 + 8) = 5y(x^3 + 2^3)$\n` +
`Áp dụng hằng đẳng thức tổng hai lập phương:\n` +
`$= 5y(x + 2)(x^2 - 2x + 4)$.\n\n` +
`**b) $16x^2 + 8xy + y^2 - 16$**\n` +
`Nhóm 3 hạng tử đầu tạo hằng đẳng thức:\n` +
`$= (4x + y)^2 - 4^2$\n` +
`Áp dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= (4x + y - 4)(4x + y + 4)$.\n\n` +
`**c) $3x^2 + 14x - 15$**\n` +
`Tách hạng tử $14x = 15x - x$:\n` +
`$= 3x^2 + 15x - x - 15$\n` +
`$= 3x(x + 5) - (x + 5)$\n` +
`$= (x + 5)(3x - 1)$.`;

  const sol7 = `**a)** $(2x - 1)(x + 3) - (x - 2)^2 - x(x - 1)$\n` +
`$= (2x^2 + 6x - x - 3) - (x^2 - 4x + 4) - (x^2 - x)$\n` +
`$= 2x^2 + 5x - 3 - x^2 + 4x - 4 - x^2 + x$\n` +
`$= (2x^2 - x^2 - x^2) + (5x + 4x + x) + (-3 - 4)$\n` +
`$= 10x - 7$.\n\n` +
`**b)** $(x - 3)(x^2 + 3x + 9) - x(x - 2)(x + 2)$\n` +
`Áp dụng hằng đẳng thức hiệu hai lập phương và hiệu hai bình phương:\n` +
`$= (x^3 - 3^3) - x(x^2 - 2^2)$\n` +
`$= x^3 - 27 - x(x^2 - 4)$\n` +
`$= x^3 - 27 - x^3 + 4x$\n` +
`$= 4x - 27$.`;

  const sol8 = `Vì tại cùng một thời điểm, các tia sáng mặt trời chiếu song song, nên tam giác tạo bởi vật thật, bóng và tia sáng mặt trời của hai vật là hai tam giác vuông đồng dạng.\n` +
`Gọi $h_1, h_2$ là chiều cao của tháp và cây cột; $s_1, s_2$ là chiều dài bóng của chúng.\n` +
`Ta có tỉ lệ: $\\frac{h_1}{s_1} = \\frac{h_2}{s_2}$\n` +
`Thay số: $\\frac{AB}{63} = \\frac{2}{3}$\n` +
`$\\Rightarrow AB = \\frac{63 \\cdot 2}{3} = 42$ (m).\n` +
`**Kết luận:** Chiều cao $AB$ của tháp là $42$ mét.`;

  const sol9 = `Ta biến đổi biểu thức $A$:\n` +
`$A = x^2 + 2y^2 - 2xy + 4y + 2014$\n` +
`$A = (x^2 - 2xy + y^2) + (y^2 + 4y + 4) + 2010$\n` +
`$A = (x - y)^2 + (y + 2)^2 + 2010$.\n` +
`Vì $(x - y)^2 \\ge 0$ và $(y + 2)^2 \\ge 0$ với mọi $x, y$, nên $A \\ge 2010$.\n` +
`Dấu \"=\" xảy ra khi:\n` +
`$\\begin{cases} x - y = 0 \\\\ y + 2 = 0 \\end{cases} \\Rightarrow \\begin{cases} x = y \\\\ y = -2 \\end{cases} \\Rightarrow x = -2, y = -2$.\n` +
`**Kết luận:** Giá trị nhỏ nhất của $A$ là $2010$ tại $x = -2; y = -2$.`;

  const sol10 = `Gọi độ dài quãng đường $AB$ (lúc đi) là $x$ (km, $x > 0$).\n` +
`Độ dài quãng đường lúc về là $x + 6$ (km).\n` +
`Thời gian người đó đi xe đạp từ $A$ đến $B$ là: $\\frac{x}{9}$ (giờ).\n` +
`Thời gian người đó đi từ $B$ về $A$ là: $\\frac{x + 6}{12}$ (giờ).\n` +
`Đổi $20$ phút = $\\frac{1}{3}$ giờ.\n` +
`Vì thời gian về ít hơn thời gian đi $20$ phút, ta có phương trình:\n` +
`$\\frac{x}{9} - \\frac{x + 6}{12} = \\frac{1}{3}$\n` +
`Quy đồng mẫu chung $36$:\n` +
`$\\Leftrightarrow \\frac{4x}{36} - \\frac{3(x + 6)}{36} = \\frac{12}{36}$\n` +
`$\\Rightarrow 4x - 3x - 18 = 12$\n` +
`$\\Leftrightarrow x - 18 = 12 \\Rightarrow x = 30$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Quãng đường $AB$ dài $30$ km.`;

  const updates = [
    { id: "47b707f3-28c4-438f-ac94-477a356802d8", solution: sol1 },
    { id: "48b43403-238f-44e9-a17a-256391c2a5f5", solution: sol2 },
    { id: "49288b5c-dcd7-4bd6-8482-71a8a4d9b9d8", solution: sol3 },
    { id: "4936ac89-e306-434d-a8ac-eb18be456e65", solution: sol4 },
    { id: "4be13c2b-8c6f-49f5-813f-705c42dab568", solution: sol5 },
    { id: "4cb5e27b-d54d-4103-9d5f-7edae1ff9bc9", solution: sol6 },
    { id: "4cc64f22-0d06-4bae-a83f-f0dccab9ef57", solution: sol7 },
    { id: "4e175c36-e35c-4a82-981c-71f63ce3c163", solution: sol8 },
    { id: "4f951615-5cfc-40b7-b20f-4a59ae428663", solution: sol9 },
    { id: "507a780a-4411-4fb7-8dc0-14c745c34ab3", solution: sol10 }
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

manualFixBatch8Grade8().catch(console.error).finally(() => process.exit(0));
