import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch67() {
  const sql = getDb();

  const sol1 = `**a)** Tính $A = \\frac{1}{1 \\cdot 2} + \\frac{1}{2 \\cdot 3} + \\frac{1}{3 \\cdot 4} + \\dots + \\frac{1}{99 \\cdot 100}$\n` +
`Ta có: $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$. Áp dụng vào biểu thức:\n` +
`$A = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{99} - \\frac{1}{100}\\right)$\n` +
`$A = 1 - \\frac{1}{100} = \\frac{99}{100}$.\n\n` +
`**b)** Tính $B = \\frac{2}{3 \\cdot 5} + \\frac{2}{5 \\cdot 7} + \\frac{2}{7 \\cdot 9} + \\dots + \\frac{2}{97 \\cdot 99}$\n` +
`Ta có: $\\frac{2}{n(n+2)} = \\frac{1}{n} - \\frac{1}{n+2}$. Áp dụng vào biểu thức:\n` +
`$B = \\left(\\frac{1}{3} - \\frac{1}{5}\\right) + \\left(\\frac{1}{5} - \\frac{1}{7}\\right) + \\dots + \\left(\\frac{1}{97} - \\frac{1}{99}\\right)$\n` +
`$B = \\frac{1}{3} - \\frac{1}{99} = \\frac{33}{99} - \\frac{1}{99} = \\frac{32}{99}$.`;

  const sol2 = `Ta có:\n` +
`$\\left( 1 - \\frac{1}{2} + \\frac{1}{3} \\right) + \\left( \\frac{1}{2} - 2 \\right) - \\left( \\frac{1}{3} + 3 \\right)$\n` +
`$= 1 - \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{2} - 2 - \\frac{1}{3} - 3$\n` +
`Nhóm các số hạng đồng dạng lại với nhau:\n` +
`$= (1 - 2 - 3) + \\left(-\\frac{1}{2} + \\frac{1}{2}\\right) + \\left(\\frac{1}{3} - \\frac{1}{3}\\right)$\n` +
`$= -4 + 0 + 0 = -4$.\n` +
`**Đáp án đúng là C.**`;

  const sol3 = `a) Các loại xe đạp điện được sản xuất (A, B, C,...) là dữ liệu không thể hiện bằng số, thể hiện đặc điểm. Do đó, đây là **dữ liệu định tính**.\n\n` +
`b) Chiều cao của học sinh (146, 151, 155,...) là dữ liệu thể hiện bằng số đo, có thể tính toán được. Do đó, đây là **dữ liệu định lượng**.\n\n` +
`c) Các mức độ xếp loại học lực (Xuất sắc, tốt, khá, đạt,...) là dữ liệu đánh giá theo mức độ, không phải số. Do đó, đây là **dữ liệu định tính**.`;

  const sol4 = `Tổng số học sinh trong lớp là: $20 + 18 = 38$ (học sinh).\n` +
`Số học sinh nữ là $18$ học sinh.\n` +
`Xác suất chọn ngẫu nhiên được một học sinh nữ là:\n` +
`$P = \\frac{18}{38} = \\frac{9}{19}$.\n` +
`**Đáp án đúng là C.**`;

  const sol5 = `*(Đối với phần đọc biểu đồ không có hình ảnh minh hoạ:)*\n` +
`a) Biểu đồ thường biểu diễn doanh thu của cửa hàng theo các tháng.\n` +
`b) Đơn vị thời gian là tháng.\n` +
`c - h) Cần quan sát cột/đường cao nhất, thấp nhất trên biểu đồ để xác định kết quả tương ứng.\n\n` +
`**Phần vẽ biểu đồ cột cho bảng thống kê \"Vật nuôi yêu thích\":**\n` +
`Học sinh vẽ biểu đồ cột dọc:\n` +
`- Trục ngang (trục hoành) ghi tên các vật nuôi: Chó, Mèo, Chim, Cá.\n` +
`- Trục dọc (trục tung) ghi số lượng bạn yêu thích (chia vạch: $0, 5, 10, 15, 20$).\n` +
`- Cột tương ứng: Chó (10), Mèo (20), Chim (7), Cá (3).`;

  const sol6 = `Xét hai tam giác $\\Delta ABC$ và $\\Delta ADE$, ta có:\n` +
`1) $AB = AD$ (theo giả thiết).\n` +
`2) $\\widehat{A}$ là góc chung.\n` +
`3) Tính độ dài cạnh $AC$ và $AE$:\n` +
`Ta có $AE = AB + BE$ và $AC = AD + DC$.\n` +
`Vì $AB = AD$ (gt) và $BE = DC$ (gt) nên cộng vế theo vế ta được: $AB + BE = AD + DC$, hay $AE = AC$.\n` +
`Từ (1), (2), (3) ta suy ra $\\Delta ABC = \\Delta ADE$ (cạnh - góc - cạnh).\n` +
`(Điều phải chứng minh).`;

  const sol7 = `**a)** $\\sqrt{1,21} = 1,1$ (vì $1,1 \\ge 0$ và $1,1^2 = 1,21$).\n\n` +
`**b)** $-\\sqrt{81} = -9$.\n\n` +
`**c)** $4,2 + \\sqrt{1,21} = 4,2 + 1,1 = 5,3$.\n\n` +
`**d)** $-5,6 - \\sqrt{0,81} = -5,6 - 0,9 = -6,5$.`;

  const sol8 = `*(Do đề bài không đính kèm biểu đồ hình 5.1, học sinh sử dụng kỹ năng đọc biểu đồ đoạn thẳng để trả lời:)*\n\n` +
`a) Biểu đồ đoạn thẳng trên cho ta biết thông tin về **số bàn thắng của cầu thủ Messi ghi được cho câu lạc bộ Barcelona qua các mùa giải**.\n\n` +
`b) Học sinh tìm trên trục hoành vị trí \"mùa giải 2018-2019\", sau đó gióng thẳng đứng lên đồ thị, rồi gióng sang trục tung để đọc số bàn thắng (ví dụ: $51$ bàn).\n\n` +
`c) Để tìm tổng số bàn thắng trong 5 mùa giải, học sinh đọc số bàn thắng của từng mùa giải rồi cộng tất cả các giá trị đó lại với nhau.`;

  const sol9 = `Vì $x$ và $y$ là hai đại lượng tỉ lệ nghịch nên ta có: $x_1 y_1 = x_2 y_2 = a$ (hằng số).\n` +
`Thay $x_1 = 3$ và $x_2 = 2$, ta được: $3y_1 = 2y_2 \\Rightarrow y_2 = \\frac{3}{2}y_1 = 1,5y_1$.\n` +
`Theo đề bài: $2y_1 + 3y_2 = -26$. Thay $y_2 = 1,5y_1$ vào, ta có:\n` +
`$2y_1 + 3(1,5y_1) = -26$\n` +
`$2y_1 + 4,5y_1 = -26 \\Rightarrow 6,5y_1 = -26 \\Rightarrow y_1 = -4$.\n` +
`Hệ số tỉ lệ: $a = x_1 y_1 = 3 \\cdot (-4) = -12$.\n` +
`**Công thức liên hệ:** $x \\cdot y = -12$ hay $y = \\frac{-12}{x}$.\n\n` +
`**a)** Tính $y$:\n` +
`- Khi $x = -4 \\Rightarrow y = \\frac{-12}{-4} = 3$.\n` +
`- Khi $x = 0,5 \\Rightarrow y = \\frac{-12}{0,5} = -24$.\n\n` +
`**b)** Tính $x$:\n` +
`Từ $y = \\frac{-12}{x} \\Rightarrow x = \\frac{-12}{y}$.\n` +
`- Khi $y = 6 \\Rightarrow x = \\frac{-12}{6} = -2$.\n` +
`- Khi $y = \\frac{-3}{2} \\Rightarrow x = -12 : \\left(\\frac{-3}{2}\\right) = -12 \\cdot \\left(\\frac{-2}{3}\\right) = 8$.`;

  const sol10 = `*Lưu ý: Gọi $M, N$ là chân đường vuông góc kẻ từ $D, E$ xuống $BC$.*\n\n` +
`**a) Chứng minh $\\widehat{B} = \\widehat{C}$:**\n` +
`Tam giác $ABC$ có $AB = AC$ (giả thiết) nên $\\Delta ABC$ là tam giác cân tại $A$.\n` +
`Theo tính chất tam giác cân, hai góc ở đáy bằng nhau, suy ra $\\widehat{B} = \\widehat{C}$.\n\n` +
`**b) Chứng minh $BM = CN$:**\n` +
`Ta có $AB = AC$ và $AD = AE$, suy ra $AB - AD = AC - AE$, hay $DB = EC$.\n` +
`Xét $\\Delta DMB$ vuông tại $M$ và $\\Delta ENC$ vuông tại $N$ (vì $DM \\perp BC, EN \\perp BC$), ta có:\n` +
`- Cạnh huyền $DB = EC$ (chứng minh trên)\n` +
`- Góc nhọn $\\widehat{B} = \\widehat{C}$ (chứng minh câu a)\n` +
`$\\Rightarrow \\Delta DMB = \\Delta ENC$ (cạnh huyền - góc nhọn).\n` +
`$\\Rightarrow BM = CN$ (hai cạnh tương ứng) (đpcm).`;

  const updates = [
    { id: "aba12448-4f85-4f4d-ad2c-f03982704e8b", solution: sol1 },
    { id: "abc090d7-a8cb-4082-af30-e890f1eeab15", solution: sol2 },
    { id: "ac4a531a-94b0-433f-8448-7ce9aa39ae4f", solution: sol3 },
    { id: "aca4446f-960c-4001-b890-3571913b8683", solution: sol4 },
    { id: "ad1f18be-07b5-43e8-a96b-323ba6682aa7", solution: sol5 },
    { id: "ad4891bb-c562-4d55-b492-f7d271f5e773", solution: sol6 },
    { id: "ad63a9de-1a5b-4094-893f-13d3f0d338c6", solution: sol7 },
    { id: "ae2cfd71-8b7c-4626-a9ae-7e7260f6b8e9", solution: sol8 },
    { id: "aec253ec-66d1-41cb-ba2a-2968c7c345c4", solution: sol9 },
    { id: "b0e70742-5e99-4fd2-8705-cfd6f17fef67", solution: sol10 }
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

manualFixBatch67().catch(console.error).finally(() => process.exit(0));
