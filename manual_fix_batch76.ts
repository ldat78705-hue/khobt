import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch76() {
  const sql = getDb();

  const sol1 = `Vì $\\Delta ABC$ và $\\Delta HIK$ bằng nhau nên các đỉnh tương ứng phải được sắp xếp đúng thứ tự.\n` +
`Theo đề bài:\n` +
`- $\\widehat{B} = \\widehat{K}$ nên đỉnh $B$ tương ứng với đỉnh $K$.\n` +
`- $AB = IK$ và đỉnh $B$ tương ứng với $K$, nên đỉnh $A$ tương ứng với đỉnh $I$.\n` +
`Do đó, đỉnh còn lại là $C$ sẽ tương ứng với đỉnh $H$.\n` +
`Kí hiệu sự bằng nhau của hai tam giác phải viết theo đúng thứ tự các đỉnh tương ứng là:\n` +
`$$\\Delta ABC = \\Delta IKH$$`;

  const sol2 = `**a)** $(2x - 1) \\cdot \\left( x + \\frac{2}{3} \\right) = 0$\n` +
`Trường hợp 1: $2x - 1 = 0 \\Rightarrow 2x = 1 \\Rightarrow x = \\frac{1}{2}$.\n` +
`Trường hợp 2: $x + \\frac{2}{3} = 0 \\Rightarrow x = -\\frac{2}{3}$.\n` +
`Vậy $x \\in \\left\\{ \\frac{1}{2}; -\\frac{2}{3} \\right\\}$.\n\n` +
`**b)** $\\left( x - \\frac{1}{2} \\right)^2 = \\frac{1}{4}$\n` +
`$\\Rightarrow \\left( x - \\frac{1}{2} \\right)^2 = \\left( \\frac{1}{2} \\right)^2 = \\left( -\\frac{1}{2} \\right)^2$\n` +
`Trường hợp 1: $x - \\frac{1}{2} = \\frac{1}{2} \\Rightarrow x = 1$.\n` +
`Trường hợp 2: $x - \\frac{1}{2} = -\\frac{1}{2} \\Rightarrow x = 0$.\n` +
`Vậy $x \\in \\{0; 1\\}$.\n\n` +
`**c)** $|x - 0,5| = \\frac{3}{2}$\n` +
`Đổi $0,5 = \\frac{1}{2}$. Phương trình trở thành $|x - \\frac{1}{2}| = \\frac{3}{2}$.\n` +
`Trường hợp 1: $x - \\frac{1}{2} = \\frac{3}{2} \\Rightarrow x = \\frac{3}{2} + \\frac{1}{2} = \\frac{4}{2} = 2$.\n` +
`Trường hợp 2: $x - \\frac{1}{2} = -\\frac{3}{2} \\Rightarrow x = -\\frac{3}{2} + \\frac{1}{2} = -\\frac{2}{2} = -1$.\n` +
`Vậy $x \\in \\{2; -1\\}$.`;

  const sol3 = `Tổng số thẻ bài trong thùng là:\n` +
`$10 + 15 + 35 = 60$ (thẻ).\n` +
`Số thẻ bài màu vàng là nhiều nhất ($35$ thẻ), nên khả năng (xác suất) bạn Ngân lấy được thẻ bài màu vàng là lớn nhất.\n` +
`Xác suất lấy được thẻ bài màu vàng là:\n` +
`$P = \\frac{35}{60} = \\frac{7}{12}$.\n` +
`**Kết luận:** Xác suất lấy thẻ màu vàng là lớn nhất, bằng $\\frac{7}{12}$.`;

  const sol4 = `Ta thu gọn và sắp xếp các đa thức theo luỹ thừa giảm dần của biến:\n` +
`$f(x) = 6x^7 - 5x^3 + 1$\n` +
`$g(x) = -4x^7 + 2x - 3$\n` +
`$h(x) = -2x^7 + 7x^2 + 2x$\n\n` +
`**Tính $f(x) + g(x) + h(x)$:**\n` +
`$f(x) + g(x) + h(x) = (6x^7 - 4x^7 - 2x^7) - 5x^3 + 7x^2 + (2x + 2x) + (1 - 3)$\n` +
`$= 0x^7 - 5x^3 + 7x^2 + 4x - 2$\n` +
`$= -5x^3 + 7x^2 + 4x - 2$.\n\n` +
`**Tính $f(x) + g(x) - h(x)$:**\n` +
`Đầu tiên tính $f(x) + g(x)$:\n` +
`$f(x) + g(x) = (6x^7 - 4x^7) - 5x^3 + 2x + (1 - 3) = 2x^7 - 5x^3 + 2x - 2$.\n` +
`Trừ đi $h(x)$:\n` +
`$f(x) + g(x) - h(x) = (2x^7 - 5x^3 + 2x - 2) - (-2x^7 + 7x^2 + 2x)$\n` +
`$= 2x^7 - 5x^3 + 2x - 2 + 2x^7 - 7x^2 - 2x$\n` +
`$= (2x^7 + 2x^7) - 5x^3 - 7x^2 + (2x - 2x) - 2$\n` +
`$= 4x^7 - 5x^3 - 7x^2 - 2$.`;

  const sol5 = `Vì $\\Delta ABC = \\Delta DEF$ nên các góc tương ứng bằng nhau:\n` +
`$\\widehat{D} = \\widehat{A} = 32^\\circ$.\n` +
`$\\widehat{C} = \\widehat{F} = 78^\\circ$.\n` +
`$\\widehat{E} = \\widehat{B}$.\n` +
`Xét tam giác $ABC$, tổng ba góc bằng $180^\\circ$:\n` +
`$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$\n` +
`$\\Rightarrow 32^\\circ + \\widehat{B} + 78^\\circ = 180^\\circ$\n` +
`$\\Rightarrow \\widehat{B} + 110^\\circ = 180^\\circ \\Rightarrow \\widehat{B} = 70^\\circ$.\n` +
`Do $\\widehat{E} = \\widehat{B}$ nên $\\widehat{E} = 70^\\circ$.\n` +
`Vậy $\\widehat{B} = \\widehat{E} = 70^\\circ$.\n` +
`**Đáp án đúng là D.**`;

  const sol6 = `**a) Chứng minh $ON = OP$:**\n` +
`Vì $Ox$ là đường trung trực của đoạn thẳng $MN$ nên điểm $O$ thuộc $Ox$ sẽ cách đều $M$ và $N$.\n` +
`$\\Rightarrow OM = ON$ (1).\n` +
`Vì $Oy$ là đường trung trực của đoạn thẳng $MP$ nên điểm $O$ thuộc $Oy$ sẽ cách đều $M$ và $P$.\n` +
`$\\Rightarrow OM = OP$ (2).\n` +
`Từ (1) và (2) suy ra $ON = OP$ (đpcm).\n\n` +
`**b) Chứng minh ba điểm $P, O, N$ thẳng hàng:**\n` +
`Vì $\\Delta OMN$ cân tại $O$ (do $OM = ON$) và $Ox$ là trung trực của $MN$ nên $Ox$ đồng thời là tia phân giác của $\\widehat{MON}$.\n` +
`$\\Rightarrow \\widehat{MOx} = \\widehat{NOx} \\Rightarrow \\widehat{MON} = 2\\widehat{MOx}$.\n` +
`Tương tự, $\\Delta OMP$ cân tại $O$ có $Oy$ là trung trực nên $Oy$ là tia phân giác của $\\widehat{MOP}$.\n` +
`$\\Rightarrow \\widehat{MOy} = \\widehat{POy} \\Rightarrow \\widehat{MOP} = 2\\widehat{MOy}$.\n` +
`Ta có:\n` +
`$\\widehat{NOP} = \\widehat{MON} + \\widehat{MOP} = 2\\widehat{MOx} + 2\\widehat{MOy} = 2(\\widehat{MOx} + \\widehat{MOy}) = 2\\widehat{xOy}$.\n` +
`Mà $\\widehat{xOy} = 90^\\circ$ (góc vuông), suy ra:\n` +
`$\\widehat{NOP} = 2 \\cdot 90^\\circ = 180^\\circ$.\n` +
`Vậy góc $\\widehat{NOP}$ là góc bẹt, do đó ba điểm $P, O, N$ thẳng hàng (đpcm).`;

  const sol7 = `Xác định loại dữ liệu của các câu hỏi khảo sát:\n\n` +
`1) **Bạn có cho rằng chơi thể thao là một thói quen tốt?** (Các đáp án: Rất đồng ý, Đồng ý, Không đồng ý, Rất không đồng ý)\n` +
`- Các đáp án thu được là chữ/văn bản chứ không phải số học.\n` +
`- Do đó đây là **Dữ liệu định tính**.\n` +
`*(Cụ thể hơn, đây là dữ liệu định tính có thể phân loại theo thứ bậc/mức độ).* \n\n` +
`2) **Quê bạn ở đâu?**\n` +
`- Đáp án thu được là tên tỉnh, thành phố, tên địa phương (không phải số học).\n` +
`- Do đó đây là **Dữ liệu định tính**.\n` +
`*(Cụ thể hơn, đây là dữ liệu định tính không có thứ tự).*`;

  const sol8 = `Ta nhân hai đa thức $A$ và $B$:\n` +
`$A \\cdot B = (x^4 + 2x^2) \\cdot (x^2 - 1)$\n` +
`Áp dụng quy tắc nhân đa thức với đa thức:\n` +
`$= x^4 \\cdot x^2 + x^4 \\cdot (-1) + 2x^2 \\cdot x^2 + 2x^2 \\cdot (-1)$\n` +
`$= x^6 - x^4 + 2x^4 - 2x^2$\n` +
`Rút gọn các hạng tử đồng dạng ($-x^4 + 2x^4 = x^4$):\n` +
`$= x^6 + x^4 - 2x^2$.\n` +
`Đối chiếu với các đáp án, ta thấy kết quả phù hợp với đáp án A.\n` +
`**Đáp án đúng là A.**`;

  const sol9 = `Định lí là một khẳng định toán học luôn đúng đã được chứng minh. Cấu trúc thường là \"Nếu [Giả thiết] thì [Kết luận]\".\n\n` +
`**Các phát biểu là định lí gồm có:**\n\n` +
`1. \"Nếu một đường thẳng cắt một trong hai đường thẳng song song thì nó sẽ cắt đường thẳng còn lại.\"\n` +
`- **Giả thiết:** Một đường thẳng cắt một trong hai đường thẳng song song.\n` +
`- **Kết luận:** Nó sẽ cắt đường thẳng còn lại.\n\n` +
`2. \"Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia.\"\n` +
`- **Giả thiết:** Một đường thẳng vuông góc với một trong hai đường thẳng song song.\n` +
`- **Kết luận:** Nó cũng vuông góc với đường thẳng kia.\n\n` +
`3. \"Nếu hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau.\"\n` +
`- **Giả thiết:** Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba.\n` +
`- **Kết luận:** Chúng song song với nhau.\n\n` +
`*(Các phát biểu số 3 và số 5 trong đề không phải là định lí đúng).*`;

  const sol10 = `**Tính $A$:**\n` +
`$A = \\left( \\frac{\\sqrt{25}}{11} \\right) \\cdot \\frac{\\sqrt{49}}{15} \\cdot \\left( \\frac{\\sqrt{121}}{-5} \\right) \\cdot \\frac{1}{7}$\n` +
`Ta tính các căn bậc hai:\n` +
`$A = \\frac{5}{11} \\cdot \\frac{7}{15} \\cdot \\frac{11}{-5} \\cdot \\frac{1}{7}$\n` +
`Đổi chỗ và nhóm các thừa số một cách hợp lý:\n` +
`$A = \\left( \\frac{5}{11} \\cdot \\frac{11}{-5} \\right) \\cdot \\left( \\frac{7}{15} \\cdot \\frac{1}{7} \\right)$\n` +
`$A = (-1) \\cdot \\frac{1}{15} = \\frac{-1}{15}$.\n\n` +
`**Tính $B$:**\n` +
`$B = \\left( -\\frac{1}{\\sqrt{36}} \\right) \\cdot \\left( -\\frac{\\sqrt{225}}{19} \\right) \\cdot \\frac{38}{45}$\n` +
`Ta tính các căn bậc hai:\n` +
`$B = \\left( -\\frac{1}{6} \\right) \\cdot \\left( -\\frac{15}{19} \\right) \\cdot \\frac{38}{45}$\n` +
`Tích của hai số âm là số dương:\n` +
`$B = \\frac{1}{6} \\cdot \\frac{15}{19} \\cdot \\frac{38}{45}$\n` +
`Rút gọn chéo ($38$ với $19$ được $2$; $15$ với $45$ được $1/3$):\n` +
`$B = \\frac{1}{6} \\cdot \\frac{1 \\cdot 2}{1 \\cdot 3} = \\frac{2}{18} = \\frac{1}{9}$.`;

  const updates = [
    { id: "de0ecc55-3305-4825-a640-4db47a5b8625", solution: sol1 },
    { id: "de87e90b-0478-47c5-821d-5f4622eb3861", solution: sol2 },
    { id: "dfb1bee0-398a-4478-a2da-2236543899ea", solution: sol3 },
    { id: "dff74fc5-54ea-4b87-aa6d-41535e3b0b5a", solution: sol4 },
    { id: "e0f0da69-706d-4ee6-890a-2bbae926f5ce", solution: sol5 },
    { id: "e155a0ed-a214-400b-ad29-9436795edc9e", solution: sol6 },
    { id: "e1f43409-4fcd-4fd4-ac57-5eea48b25d58", solution: sol7 },
    { id: "e2c2fea9-db34-485c-8c26-4321639c6b79", solution: sol8 },
    { id: "e4560696-f816-42df-a328-0badf0c123e8", solution: sol9 },
    { id: "e4c7b466-c427-4503-a6ab-0d5cc122f174", solution: sol10 }
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

manualFixBatch76().catch(console.error).finally(() => process.exit(0));
