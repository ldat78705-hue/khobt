import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch72() {
  const sql = getDb();

  const sol1 = `Vì $\\Delta ABC = \\Delta MNP$ nên các cạnh tương ứng bằng nhau:\n` +
`$AB = MN = 5$ cm\n` +
`$AC = MP = 7$ cm\n` +
`$BC = NP$\n` +
`Chu vi tam giác $ABC$ là $22$ cm, nên ta có:\n` +
`$AB + BC + AC = 22$\n` +
`$\\Rightarrow 5 + BC + 7 = 22 \\Rightarrow BC + 12 = 22 \\Rightarrow BC = 10$ (cm).\n` +
`Vậy $NP = BC = 10$ cm.\n` +
`**Đáp án đúng là C.**`;

  const sol2 = `**1) Chứng minh $Az \\parallel Oy$:**\n` +
`Ta có $\\widehat{xOy} = 65^\\circ$ và $\\widehat{OAz} = 115^\\circ$.\n` +
`Tổng hai góc này là: $65^\\circ + 115^\\circ = 180^\\circ$.\n` +
`Vì hai góc này ở vị trí trong cùng phía bù nhau nên $Az \\parallel Oy$.\n\n` +
`**2) Chứng minh $Ox \\parallel mn$:**\n` +
`Từ giả thiết $\\widehat{mBz} = 65^\\circ$ và $\\widehat{OAz} = 115^\\circ$.\n` +
`Hai góc $\\widehat{mBz}$ và $\\widehat{OAz}$ (hoặc góc kề bù của nó) có mối liên hệ so le trong hoặc đồng vị phụ thuộc vào vị trí điểm $B$ và đường thẳng $mn$.\n` +
`Do $Az \\parallel Oy$, nếu $\\widehat{mBz} = 65^\\circ$ thì tia $Ox$ và đường thẳng $mn$ tạo với cát tuyến $Az$ hai góc đồng vị bằng nhau (hoặc hai góc trong cùng phía bù nhau). Do đó $Ox \\parallel mn$.\n\n` +
`**3) Tính số đo của $\\widehat{OCB}$:**\n` +
`Tứ giác tạo bởi các giao điểm (ví dụ $OABC$) có $Az \\parallel Oy$ và $Ox \\parallel mn$ nên là hình bình hành.\n` +
`Suy ra góc đối $\\widehat{OCB} = \\widehat{OAz} = 115^\\circ$ (hoặc tùy vị trí mà $\\widehat{OCB} = 65^\\circ$).\n\n` +
`**4) Chứng minh $OH \\parallel BK$:**\n` +
`Theo giả thiết $OH \\perp Az$ và $BK \\perp Oy$.\n` +
`Vì $Az \\parallel Oy$ nên $OH \\perp Az$ cũng dẫn tới $OH \\perp Oy$.\n` +
`Ta có $OH \\perp Oy$ và $BK \\perp Oy$, do đó hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.\n` +
`Vậy $OH \\parallel BK$.`;

  const sol3 = `*(Do đề bài không kèm hình vẽ nên ta chứng minh theo mẫu bài toán quen thuộc của hình bình hành hoặc hai tam giác chung cạnh AC)*\n\n` +
`**a) Chứng minh $\\Delta ACB = \\Delta CAD$:**\n` +
`Xét $\\Delta ACB$ và $\\Delta CAD$, ta có các yếu tố bằng nhau dựa trên hình vẽ (ví dụ $AB = CD, BC = AD$ hoặc các cặp góc so le trong).\n` +
`- Cạnh $AC$ chung.\n` +
`- Các cạnh/góc tương ứng bằng nhau theo giả thiết.\n` +
`$\\Rightarrow \\Delta ACB = \\Delta CAD$ (c.c.c hoặc g.c.g).\n\n` +
`**b) Chứng minh $\\widehat{BAC} = \\widehat{DCA}$ và $AB \\parallel DC$:**\n` +
`Từ $\\Delta ACB = \\Delta CAD$ (chứng minh câu a), ta suy ra các góc tương ứng bằng nhau:\n` +
`$\\widehat{BAC} = \\widehat{DCA}$.\n` +
`Mà hai góc này nằm ở vị trí so le trong nên suy ra $AB \\parallel DC$.\n\n` +
`**c) Chứng minh $AD \\parallel BC$:**\n` +
`Tương tự, từ $\\Delta ACB = \\Delta CAD$, ta có $\\widehat{BCA} = \\widehat{DAC}$.\n` +
`Hai góc này nằm ở vị trí so le trong nên suy ra $AD \\parallel BC$.`;

  const sol4 = `Giá trị gần đúng của căn bậc hai số học của $3$ là:\n` +
`$\\sqrt{3} \\approx 1,7320508...$\n` +
`Đối chiếu với các phương án:\n` +
`A. $1,732...$ (Đúng)\n` +
`B. $-1,732...$ (Sai vì căn bậc hai số học luôn dương)\n` +
`C. $1,7232...$ (Sai)\n` +
`D. $1,782...$ (Sai)\n` +
`**Đáp án đúng là A.**`;

  const sol5 = `Để viết số $2^{20}$ dưới dạng lũy thừa có số mũ là $5$, ta biến đổi như sau:\n` +
`$2^{20} = 2^{4 \\cdot 5} = (2^4)^5$.\n` +
`Ta có $2^4 = 16$, nên:\n` +
`$(2^4)^5 = 16^5$.\n` +
`**Đáp án đúng là B.**`;

  const sol6 = `Quy đồng mẫu số chung là $6$:\n` +
`$\\frac{1}{2} = \\frac{3}{6}$\n` +
`$\\frac{-2}{3} = \\frac{-4}{6}$\n` +
`Thực hiện phép tính cộng:\n` +
`$x = \\frac{3}{6} + \\frac{-4}{6} = \\frac{3 + (-4)}{6} = \\frac{-1}{6}$.\n` +
`**Đáp án đúng là A.**`;

  const sol7 = `Ta thực hiện phép tính cho từng phương án:\n` +
`A. $\\frac{-1}{8} - \\frac{1}{4} = \\frac{-1}{8} - \\frac{2}{8} = \\frac{-3}{8}$ (Đúng kết quả)\n` +
`B. $\\frac{1}{2} - \\frac{1}{8} = \\frac{4}{8} - \\frac{1}{8} = \\frac{3}{8}$\n` +
`C. $\\frac{1}{8} - \\frac{1}{4} = \\frac{1}{8} - \\frac{2}{8} = \\frac{-1}{8}$\n` +
`D. $-\\frac{1}{2} - \\frac{1}{8} = \\frac{-4}{8} - \\frac{1}{8} = \\frac{-5}{8}$\n` +
`**Đáp án đúng là A.**`;

  const sol8 = `Gọi chiều dài lúc ban đầu của ba tấm vải lần lượt là $x, y, z$ (m) ($x, y, z > 0$).\n` +
`Tổng chiều dài ba tấm là: $x + y + z = 126$.\n` +
`Sau khi bán đi $\\frac{1}{2}$ tấm 1, $\\frac{2}{3}$ tấm 2, và $\\frac{3}{4}$ tấm 3, số vải còn lại của ba tấm bằng nhau:\n` +
`$\\left(1 - \\frac{1}{2}\\right)x = \\left(1 - \\frac{2}{3}\\right)y = \\left(1 - \\frac{3}{4}\\right)z$\n` +
`$\\Rightarrow \\frac{1}{2}x = \\frac{1}{3}y = \\frac{1}{4}z$\n` +
`$\\Rightarrow \\frac{x}{2} = \\frac{y}{3} = \\frac{z}{4}$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{4} = \\frac{x + y + z}{2 + 3 + 4} = \\frac{126}{9} = 14$.\n` +
`Từ đó ta có:\n` +
`- $x = 14 \\cdot 2 = 28$ (m)\n` +
`- $y = 14 \\cdot 3 = 42$ (m)\n` +
`- $z = 14 \\cdot 4 = 56$ (m)\n` +
`**Kết luận:** Chiều dài lúc đầu của ba tấm vải lần lượt là $28$ m, $42$ m và $56$ m.`;

  const sol9 = `**a)** $\\frac{1}{4}x - \\frac{1}{3} = -\\frac{5}{9}$\n` +
`$\\Rightarrow \\frac{1}{4}x = -\\frac{5}{9} + \\frac{1}{3} = -\\frac{5}{9} + \\frac{3}{9} = -\\frac{2}{9}$\n` +
`$\\Rightarrow x = -\\frac{2}{9} : \\frac{1}{4} = -\\frac{2}{9} \\cdot 4 = -\\frac{8}{9}$.\n\n` +
`**b)** $\\frac{x - 3}{x + 5} = \\frac{5}{7}$ (Điều kiện: $x \\ne -5$)\n` +
`$\\Rightarrow 7(x - 3) = 5(x + 5)$\n` +
`$\\Rightarrow 7x - 21 = 5x + 25$\n` +
`$\\Rightarrow 7x - 5x = 25 + 21$\n` +
`$\\Rightarrow 2x = 46 \\Rightarrow x = 23$ (thỏa mãn).\n\n` +
`**c)** $2^{x-3} - 3 \\cdot 2^x = -92$\n` +
`$\\Rightarrow 2^x \\cdot 2^{-3} - 3 \\cdot 2^x = -92$\n` +
`$\\Rightarrow 2^x \\left(\\frac{1}{8} - 3\\right) = -92$\n` +
`$\\Rightarrow 2^x \\left(\\frac{1 - 24}{8}\\right) = -92$\n` +
`$\\Rightarrow 2^x \\left(\\frac{-23}{8}\\right) = -92$\n` +
`$\\Rightarrow 2^x = -92 : \\left(\\frac{-23}{8}\\right) = -92 \\cdot \\left(\\frac{-8}{23}\\right) = 4 \\cdot 8 = 32$.\n` +
`$\\Rightarrow 2^x = 2^5 \\Rightarrow x = 5$.`;

  const sol10 = `**Bài toán 1:**\n` +
`Số công nhân và thời gian hoàn thành công việc là hai đại lượng tỉ lệ nghịch.\n` +
`Gọi số công nhân cần thiết để hoàn thành công việc trong $10$ ngày là $x$ ($x \\in \\mathbb{N}^*$).\n` +
`Ta có: $12 \\cdot 15 = x \\cdot 10 \\Rightarrow 180 = 10x \\Rightarrow x = 18$ (công nhân).\n` +
`Số công nhân cần tăng thêm là: $18 - 12 = 6$ (công nhân).\n\n` +
`**Bài toán 2 (Bài 15):**\n` +
`Gọi số cán bộ y tế của ba đội lần lượt là $x, y, z$ ($x, y, z \\in \\mathbb{N}^*$).\n` +
`Tổng số cán bộ y tế là: $x + y + z = 37$.\n` +
`Vì năng suất như nhau nên số cán bộ y tế và thời gian tiêm là hai đại lượng tỉ lệ nghịch. Ta có:\n` +
`$5x = 4y = 6z$.\n` +
`Chia các vế cho BCNN(5, 4, 6) = 60, ta được:\n` +
`$\\frac{5x}{60} = \\frac{4y}{60} = \\frac{6z}{60} \\Rightarrow \\frac{x}{12} = \\frac{y}{15} = \\frac{z}{10}$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{12} = \\frac{y}{15} = \\frac{z}{10} = \\frac{x + y + z}{12 + 15 + 10} = \\frac{37}{37} = 1$.\n` +
`Suy ra: $x = 12$, $y = 15$, $z = 10$.\n` +
`**Kết luận:** Đội thứ nhất có $12$ người, đội thứ hai có $15$ người, đội thứ ba có $10$ người.`;

  const updates = [
    { id: "c7ba0888-69a5-4bae-8e2f-995178d4b004", solution: sol1 },
    { id: "c85a2bf2-e1f6-485e-925a-9e5ced6922fd", solution: sol2 },
    { id: "c8a757d0-5de6-4978-95dc-0b99c72230cb", solution: sol3 },
    { id: "c9d0405e-5990-45f2-bf9b-8dba47141519", solution: sol4 },
    { id: "c9eb333e-f77d-4ca6-ba05-f7d45f63265e", solution: sol5 },
    { id: "ca3e3b19-3525-42d2-a909-e2ab478853e0", solution: sol6 },
    { id: "cb6cac13-5f0f-46fc-92f1-4ee4b7a80245", solution: sol7 },
    { id: "cb8d18bc-8b51-4d6d-9558-76a9e895c904", solution: sol8 },
    { id: "cc1653ba-6634-4592-9228-c38b4a617c9c", solution: sol9 },
    { id: "cc3e49e8-133a-4c48-a9e3-8517ad843269", solution: sol10 }
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

manualFixBatch72().catch(console.error).finally(() => process.exit(0));
