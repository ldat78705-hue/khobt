import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch81() {
  const sql = getDb();

  const sol1 = `Dựa vào bảng dữ liệu của Mai, ta có thể phân loại các dữ liệu như sau:\n\n` +
`**1. Dữ liệu định lượng:**\n` +
`- **Tuổi** ($12, 13$): Là các số liệu đo lường, đếm được.\n\n` +
`**2. Dữ liệu định tính:**\n` +
`- **Giới tính** (Nam, Nữ): Là dữ liệu phân loại đối tượng bằng chữ, không có thứ bậc.\n` +
`- **Màu yêu thích** (Đen, Hồng, Xanh, Trắng): Là dữ liệu bằng chữ thể hiện sở thích cá nhân, không có thứ bậc.`;

  const sol2 = `**a) Chứng minh $\\Delta ABD = \\Delta ACD$:**\n` +
`Vì $BD \\perp Ax$ tại $B$ nên $\\Delta ABD$ vuông tại $B$.\n` +
`Vì $CD \\perp Ay$ tại $C$ nên $\\Delta ACD$ vuông tại $C$.\n` +
`Xét hai tam giác vuông $\\Delta ABD$ và $\\Delta ACD$, ta có:\n` +
`- Cạnh huyền $AD$ chung.\n` +
`- $\\widehat{DAB} = \\widehat{DAC}$ (vì $Az$ là tia phân giác của $\\widehat{xAy}$).\n` +
`$\\Rightarrow \\Delta ABD = \\Delta ACD$ (cạnh huyền - góc nhọn).\n\n` +
`**b) Chứng minh $\\Delta DBE = \\Delta DCH$:**\n` +
`Từ chứng minh câu a, ta suy ra: $DB = DC$ và $AB = AC$ (các cạnh tương ứng).\n` +
`Xét hai tam giác vuông $\\Delta DBE$ (vuông tại $B$) và $\\Delta DCH$ (vuông tại $C$):\n` +
`- $DB = DC$ (chứng minh trên).\n` +
`- $\\widehat{BDE} = \\widehat{CDH}$ (hai góc đối đỉnh).\n` +
`$\\Rightarrow \\Delta DBE = \\Delta DCH$ (cạnh góc vuông - góc nhọn kề).\n\n` +
`**c) Chứng minh $AD \\perp BC$:**\n` +
`Vì $AB = AC$ nên $\\Delta ABC$ là tam giác cân tại $A$.\n` +
`Trong tam giác cân $\\Delta ABC$, $AD$ là đường phân giác của góc ở đỉnh $A$.\n` +
`Theo tính chất tam giác cân, đường phân giác xuất phát từ đỉnh cũng đồng thời là đường cao.\n` +
`$\\Rightarrow AD \\perp BC$ (đpcm).`;

  const sol3 = `Sử dụng các kí hiệu $\\in$ (thuộc) và $\\notin$ (không thuộc) cho các tập hợp số, ta điền như sau:\n\n` +
`- $\\frac{6}{13} \\notin \\mathbb{I}$ (Phân số là số hữu tỉ, không thuộc tập số vô tỉ $\\mathbb{I}$).\n` +
`- $\\frac{-2}{3} \\in \\mathbb{Q}$ (Phân số là số hữu tỉ, thuộc tập $\\mathbb{Q}$).\n` +
`- $\\sqrt{2} \\notin \\mathbb{Q}$ (Căn bậc hai của $2$ là số vô tỉ, không phải số hữu tỉ).`;

  const sol4 = `Chiều rộng của mảnh vườn hình chữ nhật là:\n` +
`$15 \\cdot \\frac{2}{3} = 10$ (m).\n\n` +
`Diện tích của mảnh vườn hình chữ nhật đó là:\n` +
`$15 \\cdot 10 = 150$ (m$^2$).\n\n` +
`**Kết luận:** Diện tích mảnh vườn là $150$ m$^2$.`;

  const sol5 = `Ta thực hiện phép tính bằng cách cộng/trừ các hạng tử đồng dạng của các đa thức:\n\n` +
`$A + B = (3x^3 - 5x^2 + 11) + (5x^3 + 3x - 8) = 8x^3 - 5x^2 + 3x + 3$\n\n` +
`$A + C = (3x^3 - 5x^2 + 11) + (7x^3 - 10x^2 + 4x) = 10x^3 - 15x^2 + 4x + 11$\n\n` +
`$B + C = (5x^3 + 3x - 8) + (7x^3 - 10x^2 + 4x) = 12x^3 - 10x^2 + 7x - 8$\n\n` +
`$A + B + C = (8x^3 - 5x^2 + 3x + 3) + (7x^3 - 10x^2 + 4x) = 15x^3 - 15x^2 + 7x + 3$\n\n` +
`$A - B = (3x^3 - 5x^2 + 11) - (5x^3 + 3x - 8) = -2x^3 - 5x^2 - 3x + 19$\n\n` +
`$A - C = (3x^3 - 5x^2 + 11) - (7x^3 - 10x^2 + 4x) = -4x^3 + 5x^2 - 4x + 11$\n\n` +
`$B - C = (5x^3 + 3x - 8) - (7x^3 - 10x^2 + 4x) = -2x^3 + 10x^2 - x - 8$`;

  const sol6 = `**a)** $2x^2 = 8$\n` +
`$\\Rightarrow x^2 = 8 : 2 = 4$\n` +
`$\\Rightarrow x^2 = 2^2 = (-2)^2$\n` +
`$\\Rightarrow x = 2$ hoặc $x = -2$.\n` +
`Vậy $x \\in \\{-2; 2\\}$.\n\n` +
`**b)** $3\\sqrt{x} = 15$ (Điều kiện: $x \\ge 0$)\n` +
`$\\Rightarrow \\sqrt{x} = 15 : 3 = 5$\n` +
`Bình phương hai vế:\n` +
`$\\Rightarrow x = 5^2 = 25$ (thỏa mãn điều kiện).\n` +
`Vậy $x = 25$.`;

  const sol7 = `*(Vì bài toán không có hình vẽ kèm theo, ta giả sử điểm $O$ nằm trong khoảng giữa hai đường thẳng $Ax$ và $By$ tạo thành đường gấp khúc $AOB$)*\n\n` +
`Qua $O$ kẻ tia $Oz \\parallel Ax \\parallel By$ (tia $Oz$ nằm trong góc $\\widehat{AOB}$).\n` +
`Vì $Oz \\parallel Ax$ nên $\\widehat{AOz}$ và $\\widehat{A}$ là hai góc so le trong.\n` +
`$\\Rightarrow \\widehat{AOz} = \\widehat{A} = 50^\\circ$.\n` +
`Vì $Oz \\parallel By$ nên $\\widehat{BOz}$ và $\\widehat{B}$ là hai góc trong cùng phía.\n` +
`$\\Rightarrow \\widehat{BOz} + \\widehat{B} = 180^\\circ \\Rightarrow \\widehat{BOz} + 140^\\circ = 180^\\circ \\Rightarrow \\widehat{BOz} = 40^\\circ$.\n` +
`Ta có tia $Oz$ nằm giữa hai tia $OA$ và $OB$ nên:\n` +
`$\\widehat{AOB} = \\widehat{AOz} + \\widehat{BOz} = 50^\\circ + 40^\\circ = 90^\\circ$.\n` +
`Vì góc $\\widehat{AOB} = 90^\\circ$ nên hai đường thẳng $AO$ và $BO$ vuông góc với nhau.\n` +
`$\\Rightarrow AO \\perp BO$ (đpcm).`;

  const sol8 = `Ta có biểu thức:\n` +
`$$A = \\frac{3}{1 \\cdot 4} + \\frac{3}{4 \\cdot 7} + \\frac{3}{7 \\cdot 10} + \\dots + \\frac{3}{94 \\cdot 97} + \\frac{3}{97 \\cdot 100}$$\n` +
`Nhận xét: Mỗi phân số có dạng $\\frac{k}{n(n+k)} = \\frac{1}{n} - \\frac{1}{n+k}$.\n` +
`Trong biểu thức $A$, tử số bằng đúng hiệu của hai thừa số dưới mẫu ($4 - 1 = 3, 7 - 4 = 3...$).\n` +
`Áp dụng nhận xét trên, ta tách các phân số:\n` +
`$$A = \\left( \\frac{1}{1} - \\frac{1}{4} \\right) + \\left( \\frac{1}{4} - \\frac{1}{7} \\right) + \\left( \\frac{1}{7} - \\frac{1}{10} \\right) + \\dots + \\left( \\frac{1}{94} - \\frac{1}{97} \\right) + \\left( \\frac{1}{97} - \\frac{1}{100} \\right)$$\n` +
`Triệt tiêu các cặp phân số đối nhau ở giữa:\n` +
`$$A = 1 - \\frac{1}{100} = \\frac{100}{100} - \\frac{1}{100} = \\frac{99}{100}$$\n` +
`**Kết luận:** $A = \\frac{99}{100}$.`;

  const sol9 = `Tổng số bóng trong hộp là:\n` +
`$2$ (xanh) $+ 3$ (đỏ) $+ 4$ (vàng) $= 9$ (quả bóng).\n` +
`Vậy có $9$ kết quả có thể xảy ra khi lấy ngẫu nhiên một quả bóng.\n` +
`Số lượng bóng đỏ là $3$ quả, nên số kết quả thuận lợi cho biến cố “Lấy được quả bóng đỏ” là $3$.\n` +
`Xác suất lấy được quả bóng đỏ là: $P = \\frac{3}{9} = \\frac{1}{3}$.\n` +
`**Đáp án đúng là B.**`;

  const sol10 = `Gọi $\\widehat{B_1}$ và $\\widehat{B_2}$ lần lượt là hai góc tạo bởi tia phân giác $BD$ (với $\\widehat{B_1} = \\widehat{ABD}$, $\\widehat{B_2} = \\widehat{DBC}$).\n` +
`Vì $BD$ là tia phân giác của $\\widehat{ABC}$ nên:\n` +
`$\\widehat{B_1} = \\widehat{B_2} = \\frac{\\widehat{ABC}}{2}$.\n` +
`Xét tam giác $BEC$ có $BE = BC$ (giả thiết) nên $\\Delta BEC$ là tam giác cân tại $B$.\n` +
`Suy ra hai góc ở đáy bằng nhau: $\\widehat{E} = \\widehat{BCE}$.\n` +
`Theo định lý về góc ngoài của tam giác, góc ngoài tại đỉnh $B$ của $\\Delta BEC$ (chính là góc $\\widehat{ABC}$ kề bù với $\\widehat{EBC}$) bằng tổng hai góc trong không kề với nó:\n` +
`$\\widehat{ABC} = \\widehat{E} + \\widehat{BCE} = 2\\widehat{E}$.\n` +
`Từ đó suy ra $\\widehat{E} = \\frac{\\widehat{ABC}}{2}$.\n` +
`Như vậy ta có $\\widehat{B_1} = \\widehat{E}$ (vì cùng bằng $\\frac{\\widehat{ABC}}{2}$).\n` +
`Mặt khác, góc $\\widehat{B_1}$ (tức $\\widehat{ABD}$) và $\\widehat{E}$ nằm ở vị trí đồng vị so với hai đường thẳng $BD$ và $EC$ bị đường thẳng $AE$ cắt.\n` +
`Vì hai góc đồng vị bằng nhau nên $BD \\parallel EC$ (đpcm).`;

  const updates = [
    { id: "f83f249e-72e6-4246-a453-5ec5162e7b91", solution: sol1 },
    { id: "f8b015a4-38fd-4b65-81cd-94b429e804f4", solution: sol2 },
    { id: "f9455b50-6abb-4831-8713-3822e55ee3ea", solution: sol3 },
    { id: "f979c21d-385c-4300-a3cd-843011016528", solution: sol4 },
    { id: "fa0e4696-0579-41fa-90ea-b470bdf95113", solution: sol5 },
    { id: "fa62829f-d082-438f-b0d9-0cea949385be", solution: sol6 },
    { id: "fbd5e15d-c45f-47b6-98eb-b48073dcca98", solution: sol7 },
    { id: "fc2ba29f-14e5-480f-8806-c8c4a76b3b20", solution: sol8 },
    { id: "fc84abf3-4e94-4c83-88e9-0c739c36cfcc", solution: sol9 },
    { id: "fcbb3bbf-610d-4015-ab91-63c147ce0e65", solution: sol10 }
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

manualFixBatch81().catch(console.error).finally(() => process.exit(0));
