import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch66() {
  const sql = getDb();

  const sol1 = `*(Do đề bài không có hình vẽ kèm theo nên ta phân tích dựa trên số liệu góc)*\n` +
`Theo đề bài, ta có $\\widehat{cAa'} = 120^\\circ$ và $\\widehat{ABb} = 60^\\circ$.\n` +
`Tổng hai góc này là: $120^\\circ + 60^\\circ = 180^\\circ$.\n` +
`Nếu hai góc $\\widehat{cAa'}$ và $\\widehat{ABb}$ ở vị trí **trong cùng phía** (điều này thường xảy ra khi đường thẳng $c$ cắt cả $a, a'$ và $b, b'$ tại $A$ và $B$), thì vì tổng hai góc trong cùng phía bằng $180^\\circ$, ta kết luận được hai đường thẳng $aa'$ và $bb'$ **có song song** với nhau.\n` +
`(Nếu chúng ở vị trí so le trong thì để song song chúng phải bằng nhau. Vì $120^\\circ \\ne 60^\\circ$ nên chúng không thể ở vị trí so le trong mà song song được).`;

  const sol2 = `Điền vào chỗ trống:\n\n` +
`1) Nếu **một cạnh và hai góc kề** của tam giác này bằng **một cạnh và hai góc kề** của tam giác kia thì hai tam giác đó bằng nhau. (g.c.g)\n\n` +
`2) Nếu $\\Delta ABC$ và $\\Delta DFE$ có: $\\widehat{B}=\\widehat{E}, BC=DE, \\widehat{C}=\\widehat{D}$ thì **$\\Delta ABC = \\Delta DFE$ (g.c.g)**.\n\n` +
`3) Nếu $\\Delta MNP$ và $\\Delta SRQ$ có: $PN=QR, \\widehat{N}=\\widehat{Q}, \\widehat{P}=\\widehat{R}$ thì **$\\Delta MNP = \\Delta SQR$ (g.c.g)** (chú ý thứ tự đỉnh tương ứng).`;

  const sol3 = `Gọi độ dài hai cạnh của hình chữ nhật lần lượt là $x, y$ (m) ($x, y > 0$).\n` +
`Nửa chu vi của hình chữ nhật là: $56 : 2 = 28$ (m). Suy ra $x + y = 28$.\n` +
`Theo đề bài, tỉ số giữa hai cạnh bằng $\\frac{3}{4}$, ta có:\n` +
`$\\frac{x}{y} = \\frac{3}{4} \\Rightarrow \\frac{x}{3} = \\frac{y}{4}$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{3} = \\frac{y}{4} = \\frac{x + y}{3 + 4} = \\frac{28}{7} = 4$.\n` +
`Suy ra: $x = 3 \\cdot 4 = 12$ (m) và $y = 4 \\cdot 4 = 16$ (m).\n` +
`Diện tích của hình chữ nhật là:\n` +
`$S = x \\cdot y = 12 \\cdot 16 = 192$ (m$^2$).\n` +
`**Kết luận:** Diện tích hình chữ nhật là $192$ m$^2$.`;

  const sol4 = `Xét $\\Delta ABC$ cân tại $B$, ta có cạnh bên là $BA$ và $BC$, cạnh đáy là $AC$.\n` +
`Do đó, hai góc ở đáy bằng nhau: $\\widehat{A} = \\widehat{C}$.\n` +
`Theo đề bài, góc ở đáy bằng $40^\\circ$ nên $\\widehat{A} = \\widehat{C} = 40^\\circ$.\n` +
`Tổng ba góc trong tam giác bằng $180^\\circ$:\n` +
`$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$\n` +
`$\\Rightarrow 40^\\circ + \\widehat{B} + 40^\\circ = 180^\\circ$\n` +
`$\\Rightarrow \\widehat{B} = 180^\\circ - 80^\\circ = 100^\\circ$.\n` +
`**Kết luận:** Số đo góc ở đỉnh $\\widehat{B}$ là $100^\\circ$.`;

  const sol5 = `*(Do đề bài không kèm hình vẽ, nên ta không có dữ kiện cụ thể (chiều dài cạnh, góc, hoặc tam giác) để tính $x$.)*\n\n` +
`Tuy nhiên, để tìm $x$ trong các bài toán hình học thông thường, học sinh cần áp dụng:\n` +
`- Định lý tổng 3 góc trong tam giác (nếu $x$ là số đo góc).\n` +
`- Định lý Pythagore cho tam giác vuông (nếu $x$ là độ dài cạnh).\n` +
`- Tính chất hai tam giác bằng nhau hoặc tỉ lệ thức.`;

  const sol6 = `Đơn thức một biến là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và một biến.\n` +
`A. $11x^4$ (có 1 biến $x$)\n` +
`B. $\\frac{1}{3}x^3$ (có 1 biến $x$)\n` +
`C. $-11x^4$ (có 1 biến $x$)\n` +
`D. $3x^4y$ (có 2 biến là $x$ và $y$)\n` +
`Vì vậy $3x^4y$ không phải là đơn thức 1 biến.\n` +
`**Đáp án đúng là D.**`;

  const sol7 = `**1) Chứng minh $A > \\frac{1}{3}$:**\n` +
`$A = \\frac{1}{101} + \\frac{1}{102} + \\dots + \\frac{1}{150}$.\n` +
`Tổng $A$ gồm 50 phân số.\n` +
`Ta thấy mỗi phân số trong tổng đều lớn hơn phân số nhỏ nhất là $\\frac{1}{150}$.\n` +
`Do đó: $A > \\frac{1}{150} + \\frac{1}{150} + \\dots + \\frac{1}{150}$ (50 số hạng)\n` +
`$\\Rightarrow A > 50 \\cdot \\frac{1}{150} = \\frac{50}{150} = \\frac{1}{3}$ (đpcm).\n\n` +
`**2) Chứng minh $B > \\frac{7}{12}$:**\n` +
`$B = \\frac{1}{101} + \\frac{1}{102} + \\dots + \\frac{1}{200}$.\n` +
`Tổng $B$ gồm 100 phân số. Ta chia thành 2 nhóm, mỗi nhóm 50 phân số:\n` +
`$B = \\left( \\frac{1}{101} + \\dots + \\frac{1}{150} \\right) + \\left( \\frac{1}{151} + \\dots + \\frac{1}{200} \\right)$.\n` +
`Áp dụng cách đánh giá tương tự:\n` +
`- Nhóm 1: $\\frac{1}{101} + \\dots + \\frac{1}{150} > 50 \\cdot \\frac{1}{150} = \\frac{1}{3}$.\n` +
`- Nhóm 2: $\\frac{1}{151} + \\dots + \\frac{1}{200} > 50 \\cdot \\frac{1}{200} = \\frac{1}{4}$.\n` +
`Cộng vế theo vế ta được:\n` +
`$B > \\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$ (đpcm).`;

  const sol8 = `**a)** $\\left( 1\\frac{3}{2} + \\frac{3}{4} \\right)^2$\n` +
`Đổi hỗn số (nếu hiểu là $1 + \\frac{3}{2}$): $1 + \\frac{3}{2} = \\frac{5}{2} = \\frac{10}{4}$.\n` +
`Biểu thức trở thành: $\\left( \\frac{10}{4} + \\frac{3}{4} \\right)^2 = \\left( \\frac{13}{4} \\right)^2 = \\frac{169}{16}$.\n\n` +
`**b)** $\\left( \\left( \\frac{5}{4} - \\frac{3}{4} \\right)^2 \\right)^2$\n` +
`Ta có: $\\frac{5}{4} - \\frac{3}{4} = \\frac{2}{4} = \\frac{1}{2}$.\n` +
`Biểu thức trở thành: $\\left( \\left( \\frac{1}{2} \\right)^2 \\right)^2 = \\left( \\frac{1}{4} \\right)^2 = \\frac{1}{16}$.`;

  const sol9 = `**a) Chứng minh $\\Delta ADC = \\Delta EDB$:**\n` +
`Vì $D$ là trung điểm của $BC$ nên $DB = DC$.\n` +
`Vì $Bx \\parallel AC$ nên $\\widehat{ACD} = \\widehat{EBD}$ (hai góc so le trong).\n` +
`Hai góc $\\widehat{ADC}$ và $\\widehat{EDB}$ là hai góc đối đỉnh nên $\\widehat{ADC} = \\widehat{EDB}$.\n` +
`Xét $\\Delta ADC$ và $\\Delta EDB$ có:\n` +
`- $\\widehat{ACD} = \\widehat{EBD}$ (cmt)\n` +
`- $DC = DB$ (gt)\n` +
`- $\\widehat{ADC} = \\widehat{EDB}$ (cmt)\n` +
`$\\Rightarrow \\Delta ADC = \\Delta EDB$ (g.c.g) (đpcm).\n\n` +
`**b) Chứng minh $\\Delta AIF = \\Delta BIE$:**\n` +
`Từ $\\Delta ADC = \\Delta EDB$ (câu a), ta suy ra $AC = EB$ (hai cạnh tương ứng).\n` +
`Theo giả thiết $AF = AC$, do đó suy ra $AF = EB$.\n` +
`Vì $Bx \\parallel AC$ nên đường thẳng $BE \\parallel AF$. Do đó:\n` +
`- $\\widehat{FAI} = \\widehat{EBI}$ (hai góc so le trong).\n` +
`- $\\widehat{AFI} = \\widehat{BEI}$ (hai góc so le trong).\n` +
`Xét $\\Delta AIF$ và $\\Delta BIE$ có:\n` +
`- $\\widehat{FAI} = \\widehat{EBI}$ (cmt)\n` +
`- $AF = BE$ (cmt)\n` +
`- $\\widehat{AFI} = \\widehat{BEI}$ (cmt)\n` +
`$\\Rightarrow \\Delta AIF = \\Delta BIE$ (g.c.g) (đpcm).`;

  const sol10 = `Số hữu tỉ là số có thể viết được dưới dạng phân số $\\frac{a}{b}$, trong đó $a$ và $b$ là các số nguyên ($a, b \\in \\mathbb{Z}$) và mẫu số $b$ phải khác $0$ ($b \\ne 0$).\n` +
`Dựa vào định nghĩa trên, ta thấy:\n` +
`A. Sai vì $a$ không nhất thiết phải bằng $0$.\n` +
`B. Đúng vì $a, b \\in \\mathbb{Z}$ và $b \\ne 0$.\n` +
`C. Sai vì $a, b$ có thể là số âm (số nguyên) chứ không chỉ là số tự nhiên.\n` +
`D. Sai vì $a$ có thể là số âm.\n` +
`**Đáp án đúng là B.**`;

  const updates = [
    { id: "a589ea42-b959-438b-81f3-43d65201fd9f", solution: sol1 },
    { id: "a6422c78-2eba-44dc-b8a2-f36cf745fbb5", solution: sol2 },
    { id: "a642da76-8e44-4387-919e-d594a95d63b2", solution: sol3 },
    { id: "a6b38ce4-aed1-4e94-a0c2-b6831390cbd3", solution: sol4 },
    { id: "a6fbbc2d-61c7-4e89-8145-5d6477778651", solution: sol5 },
    { id: "a86a392a-a470-4af9-bec6-390f6fd833ce", solution: sol6 },
    { id: "a91ab166-13e1-4399-9cdf-67f7e71f8c42", solution: sol7 },
    { id: "a9915b31-74d5-4122-885c-818686e96cff", solution: sol8 },
    { id: "aa12145e-dafd-4d11-8b92-523b89534c8b", solution: sol9 },
    { id: "ab3d4b1d-94a9-4a87-9107-6d9ce8dbc62d", solution: sol10 }
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

manualFixBatch66().catch(console.error).finally(() => process.exit(0));
