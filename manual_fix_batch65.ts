import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch65() {
  const sql = getDb();

  const sol1 = `Để tìm nghiệm của đa thức, ta cho đa thức bằng $0$ và giải tìm $x$:\n\n` +
`**1)** $A(x) = 3x - 9 = 0 \\Leftrightarrow 3x = 9 \\Leftrightarrow x = 3$.\n` +
`Vậy nghiệm của đa thức $A(x)$ là $x = 3$.\n\n` +
`**2)** $B(x) = 3x + 8 = 0 \\Leftrightarrow 3x = -8 \\Leftrightarrow x = -\\frac{8}{3}$.\n` +
`Vậy nghiệm của đa thức $B(x)$ là $x = -\\frac{8}{3}$.\n\n` +
`**3)** $C(x) = 2x - 9 = 0 \\Leftrightarrow 2x = 9 \\Leftrightarrow x = \\frac{9}{2}$.\n` +
`Vậy nghiệm của đa thức $C(x)$ là $x = \\frac{9}{2}$.\n\n` +
`**4)** $D(x) = (x - 3)(2x + 5) = 0 \\Leftrightarrow x - 3 = 0$ hoặc $2x + 5 = 0$.\n` +
`$\\Leftrightarrow x = 3$ hoặc $x = -\\frac{5}{2}$.\n` +
`Vậy nghiệm của đa thức $D(x)$ là $x = 3; x = -\\frac{5}{2}$.\n\n` +
`**5)** $E(x) = (3x - 1)(2x + 2) = 0 \\Leftrightarrow 3x - 1 = 0$ hoặc $2x + 2 = 0$.\n` +
`$\\Leftrightarrow x = \\frac{1}{3}$ hoặc $x = -1$.\n` +
`Vậy nghiệm của đa thức $E(x)$ là $x = \\frac{1}{3}; x = -1$.\n\n` +
`**6)** $F(x) = x^2 + 2x = 0 \\Leftrightarrow x(x + 2) = 0 \\Leftrightarrow x = 0$ hoặc $x + 2 = 0$.\n` +
`$\\Leftrightarrow x = 0$ hoặc $x = -2$.\n` +
`Vậy nghiệm của đa thức $F(x)$ là $x = 0; x = -2$.`;

  const sol2 = `**a)** $\\frac{14}{15} : \\frac{9}{10} = x : \\frac{3}{7}$\n` +
`$\\Rightarrow x = \\left( \\frac{14}{15} : \\frac{9}{10} \\right) \\cdot \\frac{3}{7}$\n` +
`$\\Rightarrow x = \\left( \\frac{14}{15} \\cdot \\frac{10}{9} \\right) \\cdot \\frac{3}{7} = \\frac{28}{27} \\cdot \\frac{3}{7} = \\frac{4}{9}$.\n` +
`Vậy $x = \\frac{4}{9}$.\n\n` +
`**b)** $1\\frac{3}{5} : 8 = 2,5 : x$\n` +
`$\\Rightarrow \\frac{8}{5} : 8 = \\frac{5}{2} : x \\Rightarrow \\frac{1}{5} = \\frac{5}{2x}$\n` +
`$\\Rightarrow 2x = 5 \\cdot 5 = 25 \\Rightarrow x = \\frac{25}{2} = 12,5$.\n` +
`Vậy $x = 12,5$.\n\n` +
`**c)** $2,5 : (-4x) = 0,5 : 0,2$\n` +
`$\\Rightarrow \\frac{2,5}{-4x} = \\frac{0,5}{0,2} = \\frac{5}{2}$\n` +
`$\\Rightarrow -4x = \\frac{2,5 \\cdot 2}{5} = 1 \\Rightarrow x = -\\frac{1}{4}$.\n` +
`Vậy $x = -\\frac{1}{4}$.\n\n` +
`**d)** $(3x - 1) : 4,5 = 2,8 : 1,5$\n` +
`$\\Rightarrow \\frac{3x - 1}{4,5} = \\frac{2,8}{1,5} = \\frac{28}{15}$\n` +
`$\\Rightarrow 3x - 1 = \\frac{28 \\cdot 4,5}{15} = \\frac{126}{15} = \\frac{42}{5} = 8,4$\n` +
`$\\Rightarrow 3x = 8,4 + 1 = 9,4 \\Rightarrow x = \\frac{9,4}{3} = \\frac{94}{30} = \\frac{47}{15}$.\n` +
`Vậy $x = \\frac{47}{15}$.`;

  const sol3 = `**a)** Lần lượt tính tích $xy$ cho các cặp giá trị:\n` +
`$(-2) \\cdot 15 = -30$\n` +
`$(-3) \\cdot 10 = -30$\n` +
`$4 \\cdot (-7,5) = -30$\n` +
`$5 \\cdot (-6) = -30$\n` +
`$(-6) \\cdot 5 = -30$\n` +
`Như vậy, ở tất cả các ô trong hàng $xy$ đều điền chung một kết quả là: **$-30$**.\n\n` +
`**b)** Giải thích mối quan hệ:\n` +
`Ta thấy tích của hai đại lượng $x$ và $y$ luôn không đổi ($xy = -30$).\n` +
`Do đó, hai đại lượng $x$ và $y$ **tỉ lệ nghịch** với nhau (hệ số tỉ lệ là $-30$).`;

  const sol4 = `**a) Chứng minh $OA = OB$:**\n` +
`Vì $Ot$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{AOM} = \\widehat{BOM}$.\n` +
`Đường thẳng $d$ đi qua $M$ và vuông góc với $Ot$ tại $M$, nên $\\widehat{OMA} = \\widehat{OMB} = 90^\\circ$.\n` +
`Xét $\\Delta OAM$ và $\\Delta OBM$ (hai tam giác vuông tại $M$), ta có:\n` +
`- $\\widehat{AOM} = \\widehat{BOM}$ (chứng minh trên)\n` +
`- Cạnh $OM$ chung.\n` +
`$\\Rightarrow \\Delta OAM = \\Delta OBM$ (cạnh góc vuông - góc nhọn kề).\n` +
`$\\Rightarrow OA = OB$ (hai cạnh tương ứng).\n\n` +
`**b) Lấy điểm $C \\in Ot$, chứng minh $CA = CB$ và $\\widehat{OAC} = \\widehat{OBC}$:**\n` +
`Xét $\\Delta OAC$ và $\\Delta OBC$, ta có:\n` +
`- $OA = OB$ (chứng minh ở câu a)\n` +
`- $\\widehat{AOC} = \\widehat{BOC}$ (do $C$ nằm trên tia phân giác $Ot$)\n` +
`- Cạnh $OC$ chung.\n` +
`$\\Rightarrow \\Delta OAC = \\Delta OBC$ (c.g.c).\n` +
`$\\Rightarrow CA = CB$ (hai cạnh tương ứng) và $\\widehat{OAC} = \\widehat{OBC}$ (hai góc tương ứng) (đpcm).`;

  const sol5 = `**a)** Các ô cầu tam giác trên hình mô phỏng đều có 3 cạnh bằng $15m$, do đó chúng là các tam giác đều bằng nhau.\n\n` +
`**b)** Mỗi nhịp cầu (phần giữa hai trụ đỡ) gồm 8 ô tam giác. Dựa trên hình ảnh thực tế của cấu trúc giàn không gian cầu Long Biên, 8 tam giác xếp xen kẽ sẽ tạo thành phần đáy cầu (chiều dài nhịp) gồm 4 cạnh của tam giác.\n` +
`Chiều dài mỗi nhịp cầu là: $4 \\times 15 = 60$ (m).\n\n` +
`**c)** Cầu Long Biên có 19 nhịp, tổng chiều dài phần cầu trên sông là:\n` +
`$19 \\times 60 = 1140$ (m).\n` +
`Tổng chiều dài cầu Long Biên (bao gồm cả phần đường dẫn) là:\n` +
`$1140 + 900 = 2040$ (m).`;

  const sol6 = `**a)** Lập bảng câu hỏi để giúp Bảo kiểm tra nhận định:\n` +
`Để thu thập dữ liệu chính xác, bảng câu hỏi có thể thiết kế đơn giản như sau:\n` +
`*\"Bạn có yêu thích môn bóng đá không?\"\n` +
`[  ] A. Rất yêu thích\n` +
`[  ] B. Có yêu thích\n` +
`[  ] C. Bình thường\n` +
`[  ] D. Không yêu thích*\n` +
`(Hoặc câu hỏi Yes/No: \"Bạn có thích môn bóng đá không? Có / Không\")\n\n` +
`**b)** Nếu chỉ phát phiếu điều tra cho các bạn nam trong lớp 7A thì dữ liệu thu được sẽ **không đại diện** cho toàn thể lớp 7A. Dữ liệu này bị thiên lệch (thiếu tính ngẫu nhiên và đại diện), vì sở thích của các bạn nữ chưa được khảo sát, dẫn đến kết luận rút ra về \"đa số các bạn lớp 7A\" sẽ không chính xác.`;

  const sol7 = `Độ dài của chim ruồi khổng lồ Nam Mỹ là:\n` +
`$5,5 \\times 4\\frac{1}{8} = 5,5 \\times \\frac{33}{8} = \\frac{11}{2} \\times \\frac{33}{8} = \\frac{363}{16}$ (cm).\n\n` +
`Ta có thể viết dưới dạng số thập phân là $22,6875$ cm.\n` +
`**Kết luận:** Độ dài của chim ruồi khổng lồ Nam Mỹ là $22,6875$ cm.`;

  const sol8 = `Gọi ba cạnh của tam giác cân là $a, b, c$ (cm). Do tam giác cân nên có hai cạnh bằng nhau.\n` +
`Theo đề bài, một cạnh có độ dài là $6$ cm. Ta xét 2 trường hợp:\n\n` +
`**Trường hợp 1:** Cạnh đáy của tam giác cân là $6$ cm.\n` +
`Khi đó hai cạnh bên bằng nhau. Tổng độ dài hai cạnh bên là: $20 - 6 = 14$ (cm).\n` +
`Độ dài mỗi cạnh bên là: $14 : 2 = 7$ (cm).\n` +
`Kiểm tra bất đẳng thức tam giác: $7 + 7 > 6$ (thoả mãn).\n` +
`Vậy hai cạnh còn lại dài $7$ cm và $7$ cm.\n\n` +
`**Trường hợp 2:** Cạnh bên của tam giác cân là $6$ cm.\n` +
`Khi đó cạnh bên thứ hai cũng bằng $6$ cm.\n` +
`Độ dài cạnh đáy là: $20 - 6 - 6 = 8$ (cm).\n` +
`Kiểm tra bất đẳng thức tam giác: $6 + 6 > 8$ (thoả mãn).\n` +
`Vậy hai cạnh còn lại dài $6$ cm và $8$ cm.\n\n` +
`**Kết luận:** Hai cạnh còn lại có thể là ($7$cm, $7$cm) hoặc ($6$cm, $8$cm).`;

  const sol9 = `Tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$.\n` +
`Vì tam giác $ABC$ cân tại $A$ nên hai góc ở đáy bằng nhau: $\\widehat{B} = \\widehat{C}$.\n` +
`Tổng ba góc trong một tam giác bằng $180^\\circ$:\n` +
`$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ \\Rightarrow 40^\\circ + 2\\widehat{B} = 180^\\circ$\n` +
`$\\Rightarrow 2\\widehat{B} = 140^\\circ \\Rightarrow \\widehat{B} = 70^\\circ$.\n` +
`**Đáp án đúng là A.**`;

  const sol10 = `**Bài 1 (Glucid trong ngô):**\n` +
`Khối lượng glucid trong $100g$ ngô bắp tươi là:\n` +
`$100 - (52 + 4,1 + 2,3 + 1,2 + 0,8) = 100 - 60,4 = 39,6$ (g).\n` +
`Khối lượng glucid trong $500g$ ngô bắp tươi (gấp 5 lần $100g$) là:\n` +
`$39,6 \\times 5 = 198$ (g).\n` +
`*Đáp án:* 198 g glucid.\n\n` +
`**Bài 2 (Đèo Hải Vân):**\n` +
`Hầm Hải Vân dài $6,28$ km và bằng $\\frac{157}{500}$ độ dài đèo Hải Vân.\n` +
`Độ dài của đèo Hải Vân là:\n` +
`$6,28 : \\frac{157}{500} = 6,28 \\times \\frac{500}{157} = \\frac{3140}{157} = 20$ (km).\n` +
`*Đáp án:* Đèo Hải Vân dài 20 km.`;

  const updates = [
    { id: "a021d47f-bd2d-44a9-9f44-3ed15bf7e2cb", solution: sol1 },
    { id: "a07f93b5-b45f-4b66-a97b-c80bce19c6e2", solution: sol2 },
    { id: "a0a60b32-9303-4d61-acaf-2736dee820dd", solution: sol3 },
    { id: "a18426b9-53ba-4870-b371-76a0d93fd401", solution: sol4 },
    { id: "a1cca7da-f0e1-43db-bc95-26a251480b20", solution: sol5 },
    { id: "a202f84e-3252-428a-902e-84197153cf39", solution: sol6 },
    { id: "a2b5b940-f79d-41ba-831e-12a447cc6cfd", solution: sol7 },
    { id: "a3c7b0e0-a05a-4019-be58-fd26849d8a53", solution: sol8 },
    { id: "a3d06706-cd7d-4eab-b02a-8aa7c0f1c6cb", solution: sol9 },
    { id: "a47993f8-972c-42dd-9cce-e55f7ba6e8c6", solution: sol10 }
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

manualFixBatch65().catch(console.error).finally(() => process.exit(0));
