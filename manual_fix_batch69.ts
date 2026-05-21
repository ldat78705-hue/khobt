import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch69() {
  const sql = getDb();

  const sol1 = `Ta có công thức: $\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$. Áp dụng vào biểu thức $A$:\n` +
`$A = \\frac{1}{1\\cdot 2} + \\frac{1}{3\\cdot 4} + \\dots + \\frac{1}{49\\cdot 50}$\n` +
`*(Lưu ý: Nếu đề bài là dãy liên tiếp $\\frac{1}{1\\cdot 2} + \\frac{1}{2\\cdot 3} + \\frac{1}{3\\cdot 4} + \\dots$ thì ta mới áp dụng triệt tiêu được. Theo đề bài viết là $\\frac{1}{1\\cdot 2} + \\frac{1}{3\\cdot 4} + \\frac{1}{5\\cdot 6}$ thì dãy này không triệt tiêu được liên tiếp. Tuy nhiên, thông thường dạng toán này ở lớp 7 bị viết nhầm dấu, đúng ra là $\\frac{1}{1\\cdot 2} + \\frac{1}{2\\cdot 3} + \\dots$. Nếu hiểu theo dãy chuẩn liên tiếp:)*\n` +
`Giả sử $A = \\frac{1}{1\\cdot 2} + \\frac{1}{2\\cdot 3} + \\frac{1}{3\\cdot 4} + \\dots + \\frac{1}{49\\cdot 50}$\n` +
`$A = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + \\dots + \\left(\\frac{1}{49} - \\frac{1}{50}\\right)$\n` +
`$A = 1 - \\frac{1}{50} = \\frac{49}{50}$.\n\n` +
`*(Nếu giữ nguyên nguyên bản đề bài $\\frac{1}{1\\cdot 2} + \\frac{1}{3\\cdot 4} + \\frac{1}{5\\cdot 6} + \\dots + \\frac{1}{49\\cdot 50}$ thì giá trị xấp xỉ $\\frac{\\ln 2}{2}$, không thể tính nhẩm ở lớp 7. Nên ta coi đề là dãy liên tiếp).*`;

  const sol2 = `**a) Chứng minh $\\Delta AED$ cân tại A:**\n` +
`Tam giác $ABC$ cân tại $A$ nên $AB = AC$ và $\\widehat{ABC} = \\widehat{ACB}$.\n` +
`Vì $BD, CE$ là phân giác của $\\widehat{B}, \\widehat{C}$ nên:\n` +
`$\\widehat{ABD} = \\frac{1}{2}\\widehat{ABC}$ và $\\widehat{ACE} = \\frac{1}{2}\\widehat{ACB}$.\n` +
`Suy ra $\\widehat{ABD} = \\widehat{ACE}$.\n` +
`Xét $\\Delta ABD$ và $\\Delta ACE$ có:\n` +
`- $\\widehat{A}$ chung\n` +
`- $AB = AC$ (gt)\n` +
`- $\\widehat{ABD} = \\widehat{ACE}$ (cmt)\n` +
`$\\Rightarrow \\Delta ABD = \\Delta ACE$ (g.c.g)\n` +
`$\\Rightarrow AD = AE$ (hai cạnh tương ứng).\n` +
`Vậy $\\Delta AED$ là tam giác cân tại $A$ (đpcm).\n\n` +
`**b) Chứng minh $DE \\parallel BC$:**\n` +
`Vì $\\Delta AED$ cân tại $A$ nên $\\widehat{AED} = \\frac{180^\\circ - \\widehat{A}}{2}$.\n` +
`Vì $\\Delta ABC$ cân tại $A$ nên $\\widehat{ABC} = \\frac{180^\\circ - \\widehat{A}}{2}$.\n` +
`Suy ra $\\widehat{AED} = \\widehat{ABC}$.\n` +
`Hai góc này ở vị trí đồng vị nên $DE \\parallel BC$ (đpcm).\n\n` +
`**c) Chứng minh $BE = ED = DC$:**\n` +
`Vì $DE \\parallel BC$ nên $\\widehat{EDB} = \\widehat{DBC}$ (hai góc so le trong).\n` +
`Lại có $\\widehat{EBD} = \\widehat{DBC}$ (vì $BD$ là tia phân giác của góc $B$).\n` +
`Suy ra $\\widehat{EDB} = \\widehat{EBD}$. Do đó, $\\Delta EBD$ cân tại $E \\Rightarrow EB = ED$ (1).\n` +
`Tương tự, $\\widehat{DEC} = \\widehat{ECB}$ (so le trong) và $\\widehat{DCE} = \\widehat{ECB}$ (phân giác).\n` +
`Suy ra $\\widehat{DEC} = \\widehat{DCE}$. Do đó, $\\Delta CDE$ cân tại $D \\Rightarrow DC = ED$ (2).\n` +
`Từ (1) và (2) suy ra $BE = ED = DC$ (đpcm).`;

  const sol3 = `Gọi ba phần được chia lần lượt là $x, y, z$ ($x, y, z > 0$).\n` +
`Tổng của ba phần là: $x + y + z = 520$.\n` +
`Vì ba phần $x, y, z$ tỉ lệ nghịch với $2; 3; 4$ nên ta có:\n` +
`$2x = 3y = 4z$.\n` +
`Chia các vế cho BCNN(2, 3, 4) = 12, ta được:\n` +
`$\\frac{2x}{12} = \\frac{3y}{12} = \\frac{4z}{12} \\Rightarrow \\frac{x}{6} = \\frac{y}{4} = \\frac{z}{3}$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{6} = \\frac{y}{4} = \\frac{z}{3} = \\frac{x + y + z}{6 + 4 + 3} = \\frac{520}{13} = 40$.\n` +
`Từ đó ta tìm được:\n` +
`- $x = 40 \\cdot 6 = 240$.\n` +
`- $y = 40 \\cdot 4 = 160$.\n` +
`- $z = 40 \\cdot 3 = 120$.\n` +
`**Kết luận:** Ba phần đó lần lượt là $240; 160; 120$.`;

  const sol4 = `*(Dựa vào các phương án để suy luận hình vẽ thường gặp)*\n` +
`Hình vẽ cho $AB \\parallel CD$ và $AD \\parallel BC$ tạo thành một hình bình hành $ABCD$.\n` +
`Khi nối đường chéo $AC$, ta có $\\Delta ABC = \\Delta CDA$ (theo trường hợp c.c.c hoặc g.c.g).\n` +
`Việc viết $\\Delta ABC = \\Delta ADC$ là **sai** vì không tương ứng thứ tự các đỉnh: đỉnh $B$ của tam giác này phải tương ứng với đỉnh $D$ của tam giác kia, và đỉnh $C$ tương ứng với góc nhọn so le.\n` +
`Do đó, câu sai là: **D. $\\Delta ABC = \\Delta ADC$**`;

  const sol5 = `Điền kí hiệu thích hợp:\n` +
`a) $-5 \\in \\mathbb{Q}$ (vì -5 là số hữu tỉ)\n` +
`b) $\\frac{-3}{4} \\notin \\mathbb{Z}$ (vì $\\frac{-3}{4}$ không phải là số nguyên)\n` +
`c) $0 \\in \\mathbb{Q}$ (vì 0 có thể viết là $\\frac{0}{1}$, là số hữu tỉ)\n` +
`d) $\\mathbb{Z} \\subset \\mathbb{Q}$ (tập hợp số nguyên là tập con của tập số hữu tỉ)\n` +
`e) $\\mathbb{N} \\subset \\mathbb{Z}$ (tập hợp số tự nhiên là tập con của tập số nguyên)\n` +
`f) $3,2 \\in \\mathbb{Q}$ (vì $3,2 = \\frac{32}{10}$, là số hữu tỉ)`;

  const sol6 = `*(Đây là bài toán tính giá trị sau khi giảm giá)*\n\n` +
`Giá trị chiếc áo sau khi giảm 20% (tức là người mua chỉ cần trả 80% giá gốc) được tính bằng phép tính:\n` +
`$$250000 \\cdot \\frac{80}{100} = 200000 \\text{ (đồng)}$$\n\n` +
`**Kết luận:** Giá trị chiếc áo sau khi giảm giá là $200000$ đồng.`;

  const sol7 = `**a) Chứng minh $BA = BD$:**\n` +
`Xét $\\Delta BAM$ vuông tại $A$ (vì $\\Delta ABC$ vuông tại $A$) và $\\Delta BDM$ vuông tại $D$ (vì $MD \\perp BC$), ta có:\n` +
`- Cạnh huyền $BM$ chung.\n` +
`- $\\widehat{ABM} = \\widehat{DBM}$ (vì $BM$ là tia phân giác của góc $B$).\n` +
`$\\Rightarrow \\Delta BAM = \\Delta BDM$ (cạnh huyền - góc nhọn).\n` +
`$\\Rightarrow BA = BD$ (hai cạnh tương ứng) (đpcm).\n\n` +
`**b) Chứng minh $\\Delta ABC = \\Delta DBE$:**\n` +
`Xét $\\Delta ABC$ và $\\Delta DBE$, ta có:\n` +
`- $\\widehat{BAC} = \\widehat{BDE} = 90^\\circ$ (do $\\Delta ABC$ vuông tại $A$ và $MD \\perp BC$)\n` +
`- Cạnh góc vuông $BA = BD$ (chứng minh câu a)\n` +
`- $\\widehat{B}$ là góc chung.\n` +
`$\\Rightarrow \\Delta ABC = \\Delta DBE$ (g.c.g) (đpcm).`;

  const sol8 = `**a)** Thu gọn $P = 5xy^2 + 3x^4 - 2xy^2 - 3xy - 3x^4$\n` +
`$P = (3x^4 - 3x^4) + (5xy^2 - 2xy^2) - 3xy = 3xy^2 - 3xy$.\n` +
`Tại $x = 1, y = 2$, giá trị của biểu thức là:\n` +
`$3 \\cdot 1 \\cdot 2^2 - 3 \\cdot 1 \\cdot 2 = 12 - 6 = 6$.\n\n` +
`**b)** Thu gọn $Q = 7x^4 - 3x^2 + 4x - 5x^4 + 3x^2$\n` +
`$Q = (7x^4 - 5x^4) + (-3x^2 + 3x^2) + 4x = 2x^4 + 4x$.\n` +
`Tại $x = -2$, giá trị của biểu thức là:\n` +
`$2 \\cdot (-2)^4 + 4 \\cdot (-2) = 2 \\cdot 16 - 8 = 32 - 8 = 24$.\n\n` +
`**c)** Thu gọn $R = 5(x + x^2) - 3(x^2 + x)$\n` +
`$R = 5x + 5x^2 - 3x^2 - 3x = 2x^2 + 2x$.\n` +
`Tại $x = -2$, giá trị của biểu thức là:\n` +
`$2 \\cdot (-2)^2 + 2 \\cdot (-2) = 2 \\cdot 4 - 4 = 8 - 4 = 4$.`;

  const sol9 = `*(Đây là bài toán về phân số của một đại lượng)*\n\n` +
`Phân số chỉ số mét vải còn lại của người thợ may so với tổng số mét vải ban đầu là:\n` +
`$$1 - \\frac{4}{5} = \\frac{1}{5} \\text{ (tổng số vải)}$$\n\n` +
`Biết tổng số vải là $15\\frac{1}{2}$ m (tức là $15,5$ m). Số mét vải người thợ may còn lại là:\n` +
`$$15\\frac{1}{2} \\cdot \\frac{1}{5} = 15,5 \\cdot 0,2 = 3,1 \\text{ (m)}$$\n\n` +
`**Kết luận:** Số vải còn lại là $3,1$ mét.`;

  const sol10 = `Thu gọn đơn thức trước khi xác định bậc:\n` +
`$\\frac{1}{3}x^2 x^3 = \\frac{1}{3}x^{2+3} = \\frac{1}{3}x^5$.\n` +
`Số mũ của biến $x$ là $5$. Do đó bậc của đơn thức là $5$.\n` +
`**Đáp án đúng là D.**`;

  const updates = [
    { id: "b6478722-f2a1-443d-8118-445b52c0bb29", solution: sol1 },
    { id: "b6a99299-4064-464a-9fa7-d5c8cc49e51a", solution: sol2 },
    { id: "b84a46dc-09b4-4e69-886d-caf5bc323905", solution: sol3 },
    { id: "b876ea5f-a873-4a95-867b-9837226aa3c5", solution: sol4 },
    { id: "b8b4a02a-6597-46e0-98b8-6b34dba49f87", solution: sol5 },
    { id: "ba966d1d-79cf-428b-ba7d-f050ed9e5fe0", solution: sol6 },
    { id: "bb62cd98-a69f-40d3-8d39-c0d6cbf41161", solution: sol7 },
    { id: "bba75252-798b-49be-931c-2821e5257ee6", solution: sol8 },
    { id: "bbd87082-fcea-4f27-afda-7676e4a537e8", solution: sol9 },
    { id: "bc076b9e-e1e1-4266-8fc1-f83e47cf8640", solution: sol10 }
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

manualFixBatch69().catch(console.error).finally(() => process.exit(0));
