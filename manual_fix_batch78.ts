import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch78() {
  const sql = getDb();

  const sol1 = `Căn bậc hai số học của một số $a \\ge 0$ là số $x \\ge 0$ sao cho $x^2 = a$.\n` +
`Căn bậc hai số học của $4$ là $\\sqrt{4} = 2$.\n` +
`**Đáp án đúng là C.**`;

  const sol2 = `Tập hợp các thẻ bài là các số từ $1$ đến $30$. Tổng số thẻ bài là $30$ thẻ.\n` +
`Số thẻ ghi số $6$ là $1$ thẻ.\n` +
`Xác suất lấy được thẻ ghi số $6$ là: $P = \\frac{1}{30}$.\n` +
`**Đáp án đúng là A.**`;

  const sol3 = `*(Do đề bài không đính kèm hình ảnh thống kê nên học sinh sẽ điền bảng dựa trên kĩ năng đọc hiểu hình ảnh thực tế)*\n\n` +
`**Phương pháp giải:**\n` +
`1. Quan sát hình ảnh, đếm và phân loại tổng số bình ga đã bán.\n` +
`2. Phân loại theo kích thước (đếm riêng số bình cỡ lớn và bình cỡ nhỏ) và điền vào bảng.\n` +
`3. Ghi lại các màu sắc của bình ga xuất hiện trong hình.\n` +
`4. **Phân loại dữ liệu:**\n` +
`- Dữ liệu về số lượng bình ga (tổng số, cỡ lớn, cỡ nhỏ) là **Dữ liệu định lượng** (số liệu đếm được).\n` +
`- Dữ liệu về màu sắc bình ga, kích thước bình ga (lớn/nhỏ) là **Dữ liệu định tính**.`;

  const sol4 = `Ta thực hiện phép chia $8$ cho $7$:\n` +
`$8 : 7 = 1,142857142...$\n` +
`Để làm tròn đến chữ số thập phân thứ ba, ta xét chữ số ở hàng phần chục nghìn (chữ số thập phân thứ 4) là $8$.\n` +
`Vì $8 \\ge 5$ nên ta cộng thêm $1$ vào hàng phần nghìn (chữ số $2$).\n` +
`Kết quả làm tròn là: $1,143$.\n` +
`**Đáp án đúng là C.**`;

  const sol5 = `Vì $AB \\perp AD$ và $CD \\perp AD$ nên hai đường thẳng $AB$ và $CD$ cùng vuông góc với đường thẳng $AD$.\n` +
`$\\Rightarrow AB \\parallel CD$ (1).\n\n` +
`Ta có $\\widehat{CDE} = 130^\\circ$ và $\\widehat{DEF} = 130^\\circ$.\n` +
`Hai góc này ở vị trí so le trong so với đường thẳng cát tuyến $DE$.\n` +
`Vì $\\widehat{CDE} = \\widehat{DEF} = 130^\\circ$ nên suy ra $CD \\parallel EF$ (2).\n\n` +
`Từ (1) và (2) theo tính chất bắc cầu, ta có $AB \\parallel EF$ (đpcm).`;

  const sol6 = `*(Do đề bài không đính kèm biểu đồ hình quạt, học sinh sử dụng phương pháp tính sau để giải bài toán nếu có số liệu phần trăm)*\n\n` +
`**a) Tính lượng xuất khẩu từng loại gạo:**\n` +
`Tổng lượng gạo xuất khẩu là $16,5$ triệu tấn.\n` +
`Dựa vào biểu đồ, lấy phần trăm của từng loại gạo nhân với tổng lượng gạo:\n` +
`- Lượng gạo trắng = $16,5 \\cdot \\% \\text{ Gạo trắng}$.\n` +
`- Lượng gạo thơm = $16,5 \\cdot \\% \\text{ Gạo thơm}$.\n` +
`- Lượng gạo nếp = $16,5 \\cdot \\% \\text{ Gạo nếp}$.\n\n` +
`**b) Tính phần chênh lệch:**\n` +
`- Tổng khối lượng gạo thơm và gạo nếp = Lượng gạo thơm + Lượng gạo nếp.\n` +
`- Khối lượng gạo trắng nhiều hơn = Lượng gạo trắng - Tổng (gạo thơm + gạo nếp).`;

  const sol7 = `**a)** $-\\frac{2}{3}x = \\frac{4}{15}$\n` +
`$\\Rightarrow x = \\frac{4}{15} : \\left(-\\frac{2}{3}\\right) = \\frac{4}{15} \\cdot \\left(-\\frac{3}{2}\\right) = \\frac{-12}{30} = -\\frac{2}{5}$.\n\n` +
`**b)** $-\\frac{7}{19}x = -\\frac{13}{24}$\n` +
`$\\Rightarrow x = -\\frac{13}{24} : \\left(-\\frac{7}{19}\\right) = -\\frac{13}{24} \\cdot \\left(-\\frac{19}{7}\\right) = \\frac{247}{168}$.\n\n` +
`**c)** $\\frac{-2}{5} + \\frac{5}{6}x = \\frac{-4}{15}$\n` +
`$\\Rightarrow \\frac{5}{6}x = \\frac{-4}{15} - \\left(\\frac{-2}{5}\\right) = \\frac{-4}{15} + \\frac{6}{15} = \\frac{2}{15}$\n` +
`$\\Rightarrow x = \\frac{2}{15} : \\frac{5}{6} = \\frac{2}{15} \\cdot \\frac{6}{5} = \\frac{12}{75} = \\frac{4}{25}$.\n\n` +
`**d)** $\\frac{2}{3} + \\frac{7}{4}:x = \\frac{5}{6}$\n` +
`$\\Rightarrow \\frac{7}{4}:x = \\frac{5}{6} - \\frac{2}{3} = \\frac{5}{6} - \\frac{4}{6} = \\frac{1}{6}$\n` +
`$\\Rightarrow x = \\frac{7}{4} : \\frac{1}{6} = \\frac{7}{4} \\cdot 6 = \\frac{42}{4} = \\frac{21}{2}$.`;

  const sol8 = `Tia $Oz$ là phân giác của $\\widehat{xOy} = 120^\\circ$ nên:\n` +
`$\\widehat{xOz} = \\widehat{zOy} = \\frac{120^\\circ}{2} = 60^\\circ$.\n\n` +
`**1) Chứng minh $OA \\parallel CB; OC \\parallel AB$:**\n` +
`Xét tam giác $OAB$, có $OA = OB$ (giả thiết) nên $\\Delta OAB$ cân tại $O$. \n` +
`Mà $\\widehat{AOB} = \\widehat{xOz} = 60^\\circ$, nên $\\Delta OAB$ là tam giác đều.\n` +
`Suy ra $\\widehat{OAB} = 60^\\circ$.\n` +
`Xét tam giác $OBC$, có $OB = OC$ (giả thiết) nên $\\Delta OBC$ cân tại $O$.\n` +
`Mà $\\widehat{BOC} = \\widehat{zOy} = 60^\\circ$, nên $\\Delta OBC$ là tam giác đều.\n` +
`Suy ra $\\widehat{OCB} = 60^\\circ$.\n` +
`Ta có $\\widehat{xOy} + \\widehat{OCB} = 120^\\circ + 60^\\circ = 180^\\circ$.\n` +
`Hai góc này ở vị trí trong cùng phía nên $OA \\parallel CB$ (đpcm).\n` +
`Tương tự, $\\widehat{xOy} + \\widehat{OAB} = 120^\\circ + 60^\\circ = 180^\\circ \\Rightarrow OC \\parallel AB$ (đpcm).\n\n` +
`**2) Chứng minh $OB \\perp AC$:**\n` +
`Xét tam giác $OAC$, có $OA = OC$ (giả thiết) nên $\\Delta OAC$ cân tại $O$.\n` +
`Vì $OB$ nằm trên tia $Oz$ (tia phân giác của góc $O$), nên $OB$ cũng đồng thời là đường cao của tam giác cân $OAC$.\n` +
`Suy ra $OB \\perp AC$ (đpcm).`;

  const sol9 = `**a)** $\\frac{4}{9} + \\frac{-5}{11} + \\frac{5}{9} + \\frac{-6}{11}$\n` +
`$= \\left( \\frac{4}{9} + \\frac{5}{9} \\right) + \\left( \\frac{-5}{11} + \\frac{-6}{11} \\right)$\n` +
`$= \\frac{9}{9} + \\frac{-11}{11} = 1 + (-1) = 0$.\n\n` +
`**b)** $\\frac{-5}{7} \\cdot \\frac{2}{11} + \\frac{-5}{7} \\cdot \\frac{9}{11} + 1\\frac{5}{7}$\n` +
`$= \\frac{-5}{7} \\cdot \\left( \\frac{2}{11} + \\frac{9}{11} \\right) + \\frac{12}{7}$\n` +
`$= \\frac{-5}{7} \\cdot \\frac{11}{11} + \\frac{12}{7} = \\frac{-5}{7} \\cdot 1 + \\frac{12}{7}$\n` +
`$= \\frac{-5 + 12}{7} = \\frac{7}{7} = 1$.\n\n` +
`**c)** $15\\frac{1}{4} : \\left( \\frac{-5}{7} \\right) - 25\\frac{1}{4} : \\left( \\frac{-5}{7} \\right)$\n` +
`$= \\left( 15\\frac{1}{4} - 25\\frac{1}{4} \\right) : \\left( \\frac{-5}{7} \\right)$\n` +
`$= -10 : \\left( \\frac{-5}{7} \\right) = -10 \\cdot \\left( \\frac{7}{-5} \\right) = 2 \\cdot 7 = 14$.\n\n` +
`**d)** $0,25 \\cdot 1\\frac{3}{5} - \\frac{1}{4} \\cdot \\frac{8}{5} + \\frac{1}{2}$\n` +
`$= \\frac{1}{4} \\cdot \\frac{8}{5} - \\frac{1}{4} \\cdot \\frac{8}{5} + \\frac{1}{2}$\n` +
`$= 0 + \\frac{1}{2} = \\frac{1}{2}$.`;

  const sol10 = `Gọi số cây trồng được của lớp 7A và lớp 7B lần lượt là $x$ và $y$ ($x, y \\in \\mathbb{N}^*$).\n` +
`Theo đề bài, tỉ số giữa số cây lớp 7A và lớp 7B là $0,8$ nên ta có:\n` +
`$\\frac{x}{y} = 0,8 = \\frac{4}{5} \\Rightarrow \\frac{x}{4} = \\frac{y}{5}$.\n` +
`Lớp 7B trồng nhiều hơn lớp 7A là $20$ cây nên:\n` +
`$y - x = 20$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau, ta có:\n` +
`$\\frac{y}{5} = \\frac{x}{4} = \\frac{y - x}{5 - 4} = \\frac{20}{1} = 20$.\n` +
`Suy ra:\n` +
`- $x = 20 \\cdot 4 = 80$ (cây)\n` +
`- $y = 20 \\cdot 5 = 100$ (cây)\n` +
`**Kết luận:** Lớp 7A trồng được $80$ cây, lớp 7B trồng được $100$ cây.`;

  const updates = [
    { id: "e83abd36-29c3-4b0a-8277-bdfcd0b544ce", solution: sol1 },
    { id: "e9705fa9-2025-44a8-97e4-69c23ede0bae", solution: sol2 },
    { id: "ea293fc1-4bd2-46fa-a0ff-87872b6f7ce2", solution: sol3 },
    { id: "eb375f56-e7ab-4a5b-b572-73662992f746", solution: sol4 },
    { id: "eb662a0b-6320-4762-a51f-e44a6586fb95", solution: sol5 },
    { id: "eb797a19-f627-42bd-bcaf-10565c58a816", solution: sol6 },
    { id: "ebff6368-765f-4f05-a25c-7e4c54f71052", solution: sol7 },
    { id: "ec027b90-0020-4c66-bc4e-670d2accd739", solution: sol8 },
    { id: "ec342655-f6fb-4a52-9013-095876c6e2f1", solution: sol9 },
    { id: "ecd7c555-1911-4f3b-99f5-a5ecf7e1fe94", solution: sol10 }
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

manualFixBatch78().catch(console.error).finally(() => process.exit(0));
