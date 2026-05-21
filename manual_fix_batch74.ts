import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch74() {
  const sql = getDb();

  const sol1 = `**a) Chứng minh $\\Delta AED$ cân tại A:**\n` +
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

  const sol2 = `Điều kiện để biểu thức xác định là $x \\ge 0$, $x$ là số nguyên nên $x$ phải là số chính phương thì $\\sqrt{x}$ mới là số nguyên.\n\n` +
`**a)** $A = \\frac{7}{\\sqrt{x}}$\n` +
`Để $A$ là số nguyên thì $\\sqrt{x}$ phải là ước của $7$. Mà $\\sqrt{x} > 0$ nên $\\sqrt{x} \\in \\{1; 7\\}$.\n` +
`- Nếu $\\sqrt{x} = 1 \\Rightarrow x = 1$.\n` +
`- Nếu $\\sqrt{x} = 7 \\Rightarrow x = 49$.\n` +
`Vậy $x \\in \\{1; 49\\}$.\n\n` +
`**b)** $B = 1 + \\frac{3}{\\sqrt{x} - 1}$\n` +
`Để $B$ là số nguyên thì $\\sqrt{x} - 1$ phải là ước của $3$. Mà Ư$(3) = \\{-3; -1; 1; 3\\}$.\n` +
`- $\\sqrt{x} - 1 = -3 \\Rightarrow \\sqrt{x} = -2$ (loại).\n` +
`- $\\sqrt{x} - 1 = -1 \\Rightarrow \\sqrt{x} = 0 \\Rightarrow x = 0$.\n` +
`- $\\sqrt{x} - 1 = 1 \\Rightarrow \\sqrt{x} = 2 \\Rightarrow x = 4$.\n` +
`- $\\sqrt{x} - 1 = 3 \\Rightarrow \\sqrt{x} = 4 \\Rightarrow x = 16$.\n` +
`Vậy $x \\in \\{0; 4; 16\\}$.\n\n` +
`**c)** $C = 2 + \\frac{\\sqrt{x} - 1}{\\sqrt{x} - 3} = 2 + \\frac{\\sqrt{x} - 3 + 2}{\\sqrt{x} - 3} = 3 + \\frac{2}{\\sqrt{x} - 3}$\n` +
`Để $C$ nguyên thì $\\sqrt{x} - 3$ là ước của $2$. Ư$(2) = \\{-2; -1; 1; 2\\}$.\n` +
`- $\\sqrt{x} - 3 = -2 \\Rightarrow \\sqrt{x} = 1 \\Rightarrow x = 1$.\n` +
`- $\\sqrt{x} - 3 = -1 \\Rightarrow \\sqrt{x} = 2 \\Rightarrow x = 4$.\n` +
`- $\\sqrt{x} - 3 = 1 \\Rightarrow \\sqrt{x} = 4 \\Rightarrow x = 16$.\n` +
`- $\\sqrt{x} - 3 = 2 \\Rightarrow \\sqrt{x} = 5 \\Rightarrow x = 25$.\n` +
`Vậy $x \\in \\{1; 4; 16; 25\\}$.`;

  const sol3 = `**a)** $\\frac{1}{2}x + \\frac{3}{5}x = \\frac{-33}{25}$\n` +
`$\\Rightarrow x \\left( \\frac{1}{2} + \\frac{3}{5} \\right) = \\frac{-33}{25}$\n` +
`$\\Rightarrow x \\left( \\frac{5}{10} + \\frac{6}{10} \\right) = \\frac{-33}{25}$\n` +
`$\\Rightarrow \\frac{11}{10}x = \\frac{-33}{25} \\Rightarrow x = \\frac{-33}{25} : \\frac{11}{10} = \\frac{-33}{25} \\cdot \\frac{10}{11} = \\frac{-3 \\cdot 2}{5} = \\frac{-6}{5}$.\n\n` +
`**b)** $\\left( \\frac{2}{3}x - \\frac{4}{9} \\right)\\left( \\frac{1}{2} + \\frac{-3}{7}:x \\right) = 0$ (ĐK: $x \\ne 0$)\n` +
`Trường hợp 1: $\\frac{2}{3}x - \\frac{4}{9} = 0 \\Rightarrow \\frac{2}{3}x = \\frac{4}{9} \\Rightarrow x = \\frac{4}{9} : \\frac{2}{3} = \\frac{4}{9} \\cdot \\frac{3}{2} = \\frac{2}{3}$.\n` +
`Trường hợp 2: $\\frac{1}{2} + \\frac{-3}{7x} = 0 \\Rightarrow \\frac{-3}{7x} = \\frac{-1}{2} \\Rightarrow 7x = 6 \\Rightarrow x = \\frac{6}{7}$.\n` +
`Vậy $x = \\frac{2}{3}$ hoặc $x = \\frac{6}{7}$.\n\n` +
`**c)** $\\frac{x+5}{2005} + \\frac{x+6}{2004} + \\frac{x+7}{2003} = -3$\n` +
`Cộng 1 vào mỗi phân thức, ta chuyển $-3$ sang vế trái:\n` +
`$\\left( \\frac{x+5}{2005} + 1 \\right) + \\left( \\frac{x+6}{2004} + 1 \\right) + \\left( \\frac{x+7}{2003} + 1 \\right) = 0$\n` +
`$\\Rightarrow \\frac{x+2010}{2005} + \\frac{x+2010}{2004} + \\frac{x+2010}{2003} = 0$\n` +
`$\\Rightarrow (x+2010) \\left( \\frac{1}{2005} + \\frac{1}{2004} + \\frac{1}{2003} \\right) = 0$\n` +
`Vì biểu thức trong ngoặc thứ hai lớn hơn $0$, nên:\n` +
`$x + 2010 = 0 \\Rightarrow x = -2010$.`;

  const sol4 = `Cách đổi số thập phân vô hạn tuần hoàn ra phân số:\n` +
`$0,(a) = \\frac{a}{9}$ và $0,(ab) = \\frac{ab}{99}$.\n\n` +
`**a)** Chứng tỏ $0,(37) + 0,(62) = 1$\n` +
`Ta có:\n` +
`$0,(37) = \\frac{37}{99}$\n` +
`$0,(62) = \\frac{62}{99}$\n` +
`Cộng hai số lại:\n` +
`$0,(37) + 0,(62) = \\frac{37}{99} + \\frac{62}{99} = \\frac{99}{99} = 1$ (đpcm).\n\n` +
`**b)** Chứng tỏ $0,(33) \\cdot 3 = 1$\n` +
`Ta có:\n` +
`$0,(33) = \\frac{33}{99} = \\frac{1}{3}$.\n` +
`Nhân với $3$:\n` +
`$0,(33) \\cdot 3 = \\frac{1}{3} \\cdot 3 = 1$ (đpcm).`;

  const sol5 = `**1) Chứng minh $\\Delta BAK = \\Delta BHK$:**\n` +
`Vì $\\Delta ABC$ vuông tại $A$ nên $AK \\perp AB \\Rightarrow \\widehat{BAK} = 90^\\circ$.\n` +
`Theo đề bài $KH \\perp BC$ nên $\\widehat{BHK} = 90^\\circ$.\n` +
`Xét hai tam giác vuông $\\Delta BAK$ (vuông tại $A$) và $\\Delta BHK$ (vuông tại $H$), ta có:\n` +
`- Cạnh huyền $BK$ chung.\n` +
`- $KA = KH$ (giả thiết).\n` +
`$\\Rightarrow \\Delta BAK = \\Delta BHK$ (cạnh huyền - cạnh góc vuông).\n\n` +
`**2) Chứng minh $BK \\perp AH$:**\n` +
`Từ $\\Delta BAK = \\Delta BHK$ (chứng minh trên), suy ra $BA = BH$ (hai cạnh tương ứng).\n` +
`Lại có $KA = KH$ (giả thiết).\n` +
`Do đó, cả $B$ và $K$ đều nằm trên đường trung trực của đoạn thẳng $AH$.\n` +
`Vậy đường thẳng $BK$ là đường trung trực của $AH$, suy ra $BK \\perp AH$ (đpcm).`;

  const sol6 = `*(Đây là phần giải thích lý thuyết tập hợp số)*\n\n` +
`Ta có mối quan hệ bao hàm giữa các tập hợp số như sau:\n` +
`- Tập số tự nhiên $\\mathbb{N}$.\n` +
`- Tập số nguyên $\\mathbb{Z}$.\n` +
`- Tập số hữu tỉ $\\mathbb{Q}$.\n` +
`- Tập số thực $\\mathbb{R}$.\n` +
`Chuỗi bao hàm là: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$.\n\n` +
`Dựa vào chuỗi này:\n` +
`- Khẳng định $\\mathbb{N} \\subset \\mathbb{Z}$ là hoàn toàn đúng.\n` +
`- Khẳng định $\\mathbb{N} \\subset \\mathbb{Q}$ cũng hoàn toàn đúng.\n` +
`**Kết luận:** Cả đáp án A và D đều đúng theo định nghĩa tập hợp số.`;

  const sol7 = `*(Do đề bài không có hình vẽ, ta chứng minh theo mẫu phương pháp chung)*\n\n` +
`**a) Chứng minh $Ax \\parallel By$:**\n` +
`Để chứng minh $Ax \\parallel By$, ta cần sử dụng các giả thiết về góc trong hình vẽ, ví dụ:\n` +
`- Hai góc so le trong bằng nhau (VD: $\\widehat{xAB} = \\widehat{ABy}$).\n` +
`- Hai góc đồng vị bằng nhau.\n` +
`- Hai góc trong cùng phía bù nhau (tổng bằng $180^\\circ$).\n` +
`Nếu có một trong các điều kiện đó, ta suy ra $Ax \\parallel By$.\n\n` +
`**b) Chứng minh $By \\parallel Cz$:**\n` +
`Tương tự, xét vị trí góc giữa $By$ và $Cz$ với một cát tuyến (như $BC$).\n` +
`Nếu tổng hai góc trong cùng phía bù nhau (VD: $\\widehat{yBC} + \\widehat{BCz} = 180^\\circ$), ta suy ra $By \\parallel Cz$.`;

  const sol8 = `**a) Chứng minh $\\widehat{ABC} = \\widehat{ACB}$:**\n` +
`Xét $\\Delta ABD$ và $\\Delta ACD$, ta có:\n` +
`- $AB = AC$ (gt)\n` +
`- $BD = CD$ (do $D$ là trung điểm $BC$)\n` +
`- Cạnh $AD$ chung\n` +
`$\\Rightarrow \\Delta ABD = \\Delta ACD$ (c.c.c).\n` +
`$\\Rightarrow \\widehat{ABD} = \\widehat{ACD}$ (hai góc tương ứng), hay $\\widehat{ABC} = \\widehat{ACB}$ (đpcm).\n` +
`*(Cách khác: Tam giác $ABC$ có $AB=AC$ nên là tam giác cân tại $A \\Rightarrow \\widehat{ABC} = \\widehat{ACB}$).* \n\n` +
`**b) Chứng minh $AD$ là tia phân giác của $\\widehat{BAC}$:**\n` +
`Từ chứng minh $\\Delta ABD = \\Delta ACD$ ở câu a, ta suy ra hai góc tương ứng bằng nhau:\n` +
`$\\widehat{BAD} = \\widehat{CAD}$.\n` +
`Vì tia $AD$ nằm giữa hai tia $AB$ và $AC$ và chia góc $\\widehat{BAC}$ thành hai góc bằng nhau nên $AD$ là tia phân giác của $\\widehat{BAC}$ (đpcm).`;

  const sol9 = `**a) Viết công thức liên hệ:**\n` +
`Vì $x$ và $y$ tỉ lệ nghịch với nhau nên ta có hệ thức: $x \\cdot y = a$ (với $a$ là hằng số).\n` +
`Thay $x = 3, y = -6$ vào, ta được:\n` +
`$a = 3 \\cdot (-6) = -18$.\n` +
`Vậy công thức liên hệ giữa $x$ và $y$ là: $x \\cdot y = -18$ hay $y = \\frac{-18}{x}$.\n\n` +
`**b) Tính giá trị của $y$:**\n` +
`Áp dụng công thức $y = \\frac{-18}{x}$:\n` +
`- Khi $x = -1 \\Rightarrow y = \\frac{-18}{-1} = 18$.\n` +
`- Khi $x = 2 \\Rightarrow y = \\frac{-18}{2} = -9$.\n` +
`- Khi $x = -3 \\Rightarrow y = \\frac{-18}{-3} = 6$.`;

  const sol10 = `**a)** $1,75 - \\left( x + \\frac{5}{3} \\right) = \\frac{-12}{5}$\n` +
`Đổi $1,75 = \\frac{7}{4}$. Phương trình trở thành:\n` +
`$\\frac{7}{4} - x - \\frac{5}{3} = \\frac{-12}{5}$\n` +
`$\\Rightarrow x = \\frac{7}{4} - \\frac{5}{3} - \\left( \\frac{-12}{5} \\right) = \\frac{7}{4} - \\frac{5}{3} + \\frac{12}{5}$.\n` +
`Quy đồng mẫu số chung là $60$:\n` +
`$x = \\frac{105}{60} - \\frac{100}{60} + \\frac{144}{60} = \\frac{105 - 100 + 144}{60} = \\frac{149}{60}$.\n` +
`Vậy $x = \\frac{149}{60}$.\n\n` +
`**b)** $(2x - 1)^4 = $(2x - 1)^6\n` +
`$\\Rightarrow (2x - 1)^6 - (2x - 1)^4 = 0$\n` +
`$\\Rightarrow (2x - 1)^4 \\left[ (2x - 1)^2 - 1 \\right] = 0$.\n` +
`Trường hợp 1: $(2x - 1)^4 = 0 \\Rightarrow 2x - 1 = 0 \\Rightarrow x = \\frac{1}{2}$.\n` +
`Trường hợp 2: $(2x - 1)^2 - 1 = 0 \\Rightarrow (2x - 1)^2 = 1$.\n` +
`- Khả năng 2.1: $2x - 1 = 1 \\Rightarrow 2x = 2 \\Rightarrow x = 1$.\n` +
`- Khả năng 2.2: $2x - 1 = -1 \\Rightarrow 2x = 0 \\Rightarrow x = 0$.\n` +
`Vậy $x \\in \\{0; \\frac{1}{2}; 1\\}$.`;

  const updates = [
    { id: "d081bd1b-1410-4f2a-9a43-99f85d794bd5", solution: sol1 },
    { id: "d0cceac7-7e0b-4889-bb08-10ec32f98960", solution: sol2 },
    { id: "d1182185-396f-46da-a156-b30147b6eb7b", solution: sol3 },
    { id: "d3078feb-d461-4bcc-94fe-96ac108499a1", solution: sol4 },
    { id: "d3153b14-ced2-41a9-9333-92583e957842", solution: sol5 },
    { id: "d377ec50-afc6-4bdb-8017-7d68de07f9e3", solution: sol6 },
    { id: "d3cd757b-9554-4b47-907d-83c203db48ad", solution: sol7 },
    { id: "d4f3a2b1-450b-43d0-b75c-5792b17961a2", solution: sol8 },
    { id: "d5c00999-1e45-4466-9054-96ea7020b041", solution: sol9 },
    { id: "d68b49c6-2299-4b50-8a70-53187659e285", solution: sol10 }
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

manualFixBatch74().catch(console.error).finally(() => process.exit(0));
