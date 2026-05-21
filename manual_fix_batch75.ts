import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch75() {
  const sql = getDb();

  const sol1 = `**a) Lớp 7A có bao nhiêu học sinh?**\n` +
`Tổng số học sinh lớp 7A là tổng số học sinh yêu thích tất cả các loại truyện trong bảng:\n` +
`$6 + 8 + 16 + 4 = 34$ (học sinh).\n\n` +
`**b) Loại truyện nào có ít bạn thích đọc nhất?**\n` +
`Quan sát bảng số liệu, số học sinh ít nhất là $4$ bạn, tương ứng với loại truyện **Cổ tích**.\n\n` +
`**c) Đa số các bạn học sinh lớp 7A thích đọc loại truyện nào?**\n` +
`Số lượng học sinh thích nhiều nhất là $16$ bạn, tương ứng với loại **Truyện tranh**.`;

  const sol2 = `*(Vì đề bài không có hình vẽ minh hoạ, ta giải theo phương pháp kẻ đường phụ quen thuộc của dạng toán này)*\n\n` +
`Giả sử điểm $F$ nằm trong khoảng giữa hai đường thẳng song song $BC$ và $DE$ tạo thành đường gấp khúc.\n` +
`Qua điểm $F$, kẻ đường thẳng $xy \\parallel BC \\parallel DE$.\n` +
`Khi đó, $\\widehat{DFC}$ được chia thành hai góc là $\\widehat{DFx}$ và $\\widehat{CFx}$ (với tia $Fx$ nằm trong góc $DFC$).\n` +
`Vì $xy \\parallel DE$ nên $\\widehat{DFx} = \\widehat{EDA} = 40^\\circ$ (hai góc so le trong).\n` +
`Vì $xy \\parallel BC$ nên $\\widehat{CFx} = \\widehat{FCB} = 30^\\circ$ (hai góc so le trong).\n` +
`Suy ra: $\\widehat{DFC} = \\widehat{DFx} + \\widehat{CFx} = 40^\\circ + 30^\\circ = 70^\\circ$.\n` +
`**Kết luận:** $\\widehat{DFC} = 70^\\circ$.`;

  const sol3 = `*(Do đề bài không có hình vẽ kèm theo nên không thể xác định cụ thể giá trị $\\widehat{NQP}$.)*\n\n` +
`Tuy nhiên, phương pháp chung để tính góc trong các hình vẽ thường là:\n` +
`- Dựa vào định lý tổng $3$ góc trong tam giác bằng $180^\\circ$.\n` +
`- Sử dụng tính chất của hai đường thẳng song song (hai góc so le trong, đồng vị, trong cùng phía).\n` +
`- Áp dụng tính chất của góc kề bù, góc đối đỉnh hoặc góc ngoài của tam giác.`;

  const sol4 = `Vì $BI \\perp AM$ tại $I$ nên $\\Delta BIM$ vuông tại $I$.\n` +
`Vì $CK \\perp AM$ tại $K$ nên $\\Delta CKM$ vuông tại $K$.\n` +
`Xét hai tam giác vuông $\\Delta BIM$ và $\\Delta CKM$, ta có:\n` +
`- Cạnh huyền $BM = CM$ (vì $M$ là trung điểm của $BC$)\n` +
`- Góc nhọn $\\widehat{BMI} = \\widehat{CMK}$ (hai góc đối đỉnh)\n` +
`$\\Rightarrow \\Delta BIM = \\Delta CKM$ (cạnh huyền - góc nhọn).\n` +
`$\\Rightarrow BI = CK$ (hai cạnh tương ứng) (đpcm).`;

  const sol5 = `Vì $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$ nên ta có công thức:\n` +
`$y = kx$.\n` +
`Khi $x = 12$ thì $y = 3$, thay vào công thức ta được:\n` +
`$3 = k \\cdot 12 \\Rightarrow k = \\frac{3}{12} = \\frac{1}{4}$.\n` +
`**Đáp án đúng là D.**`;

  const sol6 = `Tứ giác tạo bởi $O, C, A, B$ có $AC \\parallel OB$ (vì $AC \\parallel Oy$) và $AB \\parallel OC$ (vì $AB \\parallel Ox$).\n` +
`Do đó, $OCAB$ là hình bình hành.\n\n` +
`**a) Tính $\\widehat{xCA}; \\widehat{CAB}$:**\n` +
`Vì $AC \\parallel Oy$ nên $\\widehat{xCA}$ và $\\widehat{xOy}$ là hai góc trong cùng phía bù nhau.\n` +
`$\\Rightarrow \\widehat{xCA} + \\widehat{xOy} = 180^\\circ \\Rightarrow \\widehat{xCA} = 180^\\circ - 30^\\circ = 150^\\circ$.\n` +
`Vì $OCAB$ là hình bình hành nên góc đối $\\widehat{CAB} = \\widehat{xOy} = 30^\\circ$.\n\n` +
`**b) Tính $\\widehat{ABy}; \\widehat{ABO}$:**\n` +
`Vì $AB \\parallel Ox$ nên $\\widehat{ABO}$ và $\\widehat{xOy}$ là hai góc trong cùng phía bù nhau.\n` +
`$\\Rightarrow \\widehat{ABO} + \\widehat{xOy} = 180^\\circ \\Rightarrow \\widehat{ABO} = 180^\\circ - 30^\\circ = 150^\\circ$.\n` +
`$\\widehat{ABy}$ là góc kề bù với $\\widehat{ABO}$ (hoặc là góc đồng vị với $\\widehat{xOy}$ nếu xét theo đường thẳng chứa tia $Oy$).\n` +
`$\\Rightarrow \\widehat{ABy} = 180^\\circ - 150^\\circ = 30^\\circ$.`;

  const sol7 = `Đại lượng $y$ liên hệ với đại lượng $x$ theo công thức $y = \\frac{a}{x}$ (hay $xy = a$) với $a$ là hằng số khác $0$. Khi đó ta nói $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a$.\n` +
`Đối chiếu với các phương án, phát biểu B là chính xác nhất.\n` +
`**Đáp án đúng là B.**`;

  const sol8 = `**1) Chứng minh $AH < AD$:**\n` +
`Vì $AH \\perp BC$ nên $AH$ là đường vuông góc kẻ từ $A$ xuống đường thẳng $BC$.\n` +
`$AD$ là một đường xiên kẻ từ $A$ xuống $BC$ (do $D$ khác $H$).\n` +
`Theo quan hệ giữa đường vuông góc và đường xiên, đường vuông góc luôn ngắn hơn đường xiên. Suy ra $AH < AD$ (1).\n\n` +
`**2) Chứng minh $AD < AB$:**\n` +
`Giả sử điểm $D$ nằm giữa $H$ và $B$ (nếu nằm giữa $H$ và $C$ thì chứng minh tương tự do tam giác $ABC$ cân tại $A$ nên $AB = AC$).\n` +
`Ta có hình chiếu của đường xiên $AD$ trên $BC$ là $HD$, và hình chiếu của đường xiên $AB$ trên $BC$ là $HB$.\n` +
`Vì điểm $D$ nằm giữa $H$ và $B$ nên $HD < HB$.\n` +
`Theo quan hệ giữa đường xiên và hình chiếu, hình chiếu nào lớn hơn thì đường xiên tương ứng lớn hơn. Suy ra $AD < AB$ (2).\n\n` +
`Từ (1) và (2) ta kết luận: $AH < AD < AB$ (đpcm).`;

  const sol9 = `Tổng số học sinh trong tổ Bốn là: $6$ (nữ) $+ 5$ (nam) $= 11$ (bạn).\n` +
`Số kết quả có thể xảy ra khi bốc ngẫu nhiên một lá thăm là $11$.\n\n` +
`**a) Biến cố A: \"Bạn được chọn là nữ\"**\n` +
`Số bạn nữ trong tổ là $6$ bạn, nên số kết quả thuận lợi cho A là $6$.\n` +
`Xác suất của biến cố A là: $P(A) = \\frac{6}{11}$.\n\n` +
`**b) Biến cố B: \"Bạn được chọn là nam\"**\n` +
`Số bạn nam trong tổ là $5$ bạn, nên số kết quả thuận lợi cho B là $5$.\n` +
`Xác suất của biến cố B là: $P(B) = \\frac{5}{11}$.`;

  const sol10 = `Phân tích từng đáp án:\n` +
`A. $\\frac{3}{2} \\in \\mathbb{Q}$: Đúng, vì $\\frac{3}{2}$ là phân số nên thuộc tập hợp số hữu tỉ $\\mathbb{Q}$.\n` +
`B. $\\frac{2}{3} \\in \\mathbb{Z}$: Sai, vì $\\frac{2}{3}$ không phải là số nguyên nên không thuộc $\\mathbb{Z}$.\n` +
`C. $\\frac{-9}{2} \\notin \\mathbb{Q}$: Sai, vì $\\frac{-9}{2}$ là phân số nên nó thuộc $\\mathbb{Q}$.\n` +
`D. Cả 3 đáp án đều đúng: Sai.\n` +
`**Đáp án đúng là A.**`;

  const updates = [
    { id: "d6c7c859-ec09-4698-8282-3b7602334aab", solution: sol1 },
    { id: "d722870e-7666-4e75-b44d-2370cf837161", solution: sol2 },
    { id: "d9e0eebe-a58d-4edc-a77e-65a9770333a0", solution: sol3 },
    { id: "da733dce-ef01-4678-9f64-2c5850db0e54", solution: sol4 },
    { id: "dacabfd3-bcf3-4a1a-9102-4c099df09347", solution: sol5 },
    { id: "db40e24f-3db8-402f-b734-e06f72fcbbbb", solution: sol6 },
    { id: "db57427c-f507-4932-b111-e02c697b25d8", solution: sol7 },
    { id: "dbcbb2bd-6494-4cee-b54b-2c77a60b250f", solution: sol8 },
    { id: "dc5210c3-6c3c-42dc-b640-bc73fa0b86b3", solution: sol9 },
    { id: "dd56f265-644c-4551-a6e8-c8ba2d14ba9e", solution: sol10 }
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

manualFixBatch75().catch(console.error).finally(() => process.exit(0));
