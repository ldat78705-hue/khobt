import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch22Grade8() {
  const sql = getDb();

  const sol1 = `*(Đây là câu hỏi trắc nghiệm Đúng/Sai nhưng thiếu nội dung các khẳng định. Dưới đây là phương pháp giải chung)*\n\n` +
`**Phương pháp giải:**\n` +
`1. Phân tích kĩ từng khẳng định trong đề bài.\n` +
`2. Đối chiếu với các định lý, tính chất, hằng đẳng thức hoặc quy tắc đã học.\n` +
`- Nếu khẳng định đúng trong mọi trường hợp $\\Rightarrow$ Chọn ĐÚNG.\n` +
`- Nếu khẳng định có ít nhất một trường hợp sai $\\Rightarrow$ Chọn SAI.\n` +
`*(Giáo viên tùy biến áp dụng cho các khẳng định cụ thể trên đề)*.`;

  const sol2 = `**a) Chứng minh tứ giác AHCE là hình chữ nhật:**\n` +
`Vì $E$ đối xứng với $H$ qua $D$ nên $D$ là trung điểm của $HE$.\n` +
`Lại có $D$ là trung điểm của $AC$ (giả thiết).\n` +
`Tứ giác $AHCE$ có 2 đường chéo $AC$ và $HE$ cắt nhau tại trung điểm $D$ của mỗi đường nên $AHCE$ là hình bình hành.\n` +
`Mặt khác, $AH \\perp BC$ (vì $AH$ là đường cao) $\\Rightarrow \\widehat{AHC} = 90^\\circ$.\n` +
`Hình bình hành $AHCE$ có một góc vuông nên là hình chữ nhật.\n\n` +
`**b) Chứng minh tứ giác AEHI là hình bình hành:**\n` +
`Vì $AHCE$ là hình chữ nhật nên $AE \\parallel HC \\Rightarrow AE \\parallel HI$ (do $I, H, C$ cùng nằm trên đường thẳng $BC$).\n` +
`Đề bài cho $AI \\parallel HE$.\n` +
`Tứ giác $AEHI$ có các cặp cạnh đối song song ($AE \\parallel HI$ và $AI \\parallel HE$) nên là hình bình hành.\n\n` +
`**c) Chứng minh AK là tia phân giác của góc IAC:**\n` +
`Do $AEHI$ là hình bình hành nên $HI = AE$.\n` +
`Do $AHCE$ là hình chữ nhật nên $HC = AE$.\n` +
`Suy ra $HI = HC$. Mà $I, H, C$ thẳng hàng $\\Rightarrow H$ là trung điểm của $IC$.\n` +
`Trên tia đối của tia $HA$ lấy điểm $K$ sao cho $AH = HK \\Rightarrow H$ là trung điểm của $AK$.\n` +
`Tứ giác $ACIK$ có 2 đường chéo $AK$ và $IC$ cắt nhau tại trung điểm $H$ nên là hình bình hành.\n` +
`Lại có $AK \\perp IC$ (vì $AH \\perp BC$).\n` +
`Hình bình hành $ACIK$ có hai đường chéo vuông góc nên là hình thoi.\n` +
`Trong hình thoi $ACIK$, đường chéo $AK$ đồng thời là đường phân giác của $\\widehat{IAC}$ (đpcm).\n\n` +
`**d) Điều kiện để CAIK là hình vuông:**\n` +
`Hình thoi $CAIK$ là hình vuông khi và chỉ khi có một góc vuông, tức là $\\widehat{ACI} = 90^\\circ$ hoặc hai đường chéo bằng nhau ($AK = CI$).\n` +
`Điều kiện $AK = CI \\Leftrightarrow 2AH = 2HC \\Leftrightarrow AH = HC$.\n` +
`Tam giác vuông $AHC$ (vuông tại $H$) có $AH = HC$ nên là tam giác vuông cân $\\Rightarrow \\widehat{C} = 45^\\circ$.\n` +
`Xét tam giác $ABC$ vuông tại $A$ có $\\widehat{C} = 45^\\circ \\Rightarrow \\Delta ABC$ vuông cân tại $A$.\n` +
`*(Dù giả thiết cho AB < AC, nhưng để CAIK là hình vuông thì bắt buộc tam giác ABC phải vuông cân tại A, đây là dạng bài tìm điều kiện có thể phá vỡ giả thiết ban đầu)*.\n` +
`Khi $\\Delta ABC$ vuông cân tại $A$, ta có $AH = HC$. Hình chữ nhật $AHCE$ có hai cạnh kề bằng nhau ($AH = HC$) nên tứ giác $AHCE$ là hình vuông.`;

  const sol3 = `**a)** $\\frac{(x + 5)^2 - 9}{x^2 + 4x + 4}$\n` +
`$= \\frac{(x + 5)^2 - 3^2}{(x + 2)^2} = \\frac{(x + 5 - 3)(x + 5 + 3)}{(x + 2)^2}$\n` +
`$= \\frac{(x + 2)(x + 8)}{(x + 2)^2} = \\frac{x + 8}{x + 2}$.\n\n` +
`**b)** $2 - \\frac{x}{x - 6} + \\frac{36}{x^2 - 6x}$\n` +
`$= 2 - \\frac{x}{x - 6} + \\frac{36}{x(x - 6)}$ (MTC là $x(x - 6)$)\n` +
`$= \\frac{2x(x - 6)}{x(x - 6)} - \\frac{x^2}{x(x - 6)} + \\frac{36}{x(x - 6)}$\n` +
`$= \\frac{2x^2 - 12x - x^2 + 36}{x(x - 6)}$\n` +
`$= \\frac{x^2 - 12x + 36}{x(x - 6)} = \\frac{(x - 6)^2}{x(x - 6)} = \\frac{x - 6}{x}$.\n\n` +
`**c)** $\\frac{2x}{x + 3} - \\frac{2x - 30}{9 - x^2} + \\frac{x + 1}{x - 3}$\n` +
`$= \\frac{2x}{x + 3} + \\frac{2x - 30}{x^2 - 9} + \\frac{x + 1}{x - 3}$\n` +
`$= \\frac{2x(x - 3)}{(x - 3)(x + 3)} + \\frac{2x - 30}{(x - 3)(x + 3)} + \\frac{(x + 1)(x + 3)}{(x - 3)(x + 3)}$\n` +
`$= \\frac{2x^2 - 6x + 2x - 30 + x^2 + 4x + 3}{x^2 - 9}$\n` +
`$= \\frac{3x^2 - 27}{x^2 - 9} = \\frac{3(x^2 - 9)}{x^2 - 9} = 3$.`;

  const sol4 = `**a) Tìm điều kiện xác định:**\n` +
`$M = \\frac{x + 3}{x - 2} + \\frac{x - 3}{x + 2} - \\frac{2x^2 + 3x + 6}{x^2 - 4}$\n` +
`Biểu thức xác định khi các mẫu thức khác 0:\n` +
`$x - 2 \\ne 0$, $x + 2 \\ne 0$ và $x^2 - 4 \\ne 0$.\n` +
`$\\Rightarrow x \\ne \\pm 2$. ĐKXĐ: $x \\ne \\pm 2$.\n\n` +
`**b) Rút gọn M:**\n` +
`$M = \\frac{(x + 3)(x + 2)}{(x - 2)(x + 2)} + \\frac{(x - 3)(x - 2)}{(x - 2)(x + 2)} - \\frac{2x^2 + 3x + 6}{(x - 2)(x + 2)}$\n` +
`$M = \\frac{x^2 + 5x + 6 + x^2 - 5x + 6 - 2x^2 - 3x - 6}{(x - 2)(x + 2)}$\n` +
`$M = \\frac{6 - 3x}{(x - 2)(x + 2)} = \\frac{-3(x - 2)}{(x - 2)(x + 2)} = \\frac{-3}{x + 2}$.\n\n` +
`**c) Tính giá trị của M khi x = 3:**\n` +
`Thay $x = 3$ (thỏa mãn ĐKXĐ) vào $M$ đã rút gọn:\n` +
`$M = \\frac{-3}{3 + 2} = \\frac{-3}{5}$.\n\n` +
`**d) Tìm x nguyên để M nguyên:**\n` +
`Để $M = \\frac{-3}{x + 2}$ nhận giá trị nguyên thì $-3$ phải chia hết cho $(x + 2)$.\n` +
`Hay $x + 2 \\in U(-3) = \\{1; -1; 3; -3\\}$.\n` +
`- $x + 2 = 1 \\Rightarrow x = -1$ (TM)\n` +
`- $x + 2 = -1 \\Rightarrow x = -3$ (TM)\n` +
`- $x + 2 = 3 \\Rightarrow x = 1$ (TM)\n` +
`- $x + 2 = -3 \\Rightarrow x = -5$ (TM)\n` +
`**Kết luận:** $x \\in \\{-5; -3; -1; 1\\}$.`;

  const sol5 = `Xét từng khẳng định:\n` +
`**A. Tứ giác có 4 cạnh bằng nhau và có 1 góc vuông là hình vuông:**\n` +
`Tứ giác có 4 cạnh bằng nhau là hình thoi. Hình thoi có 1 góc vuông thì là hình vuông. $\\Rightarrow$ **Khẳng định ĐÚNG.**\n\n` +
`**B. Hình thoi là 1 hình thang cân:**\n` +
`Hình thoi có các cạnh đối song song nên nó là hình thang. Tuy nhiên, hai đường chéo của hình thoi cắt nhau tại trung điểm nhưng không bằng nhau (trừ khi nó là hình vuông). Do đó, nó không thỏa mãn tính chất 2 đường chéo bằng nhau của hình thang cân. $\\Rightarrow$ **Khẳng định SAI.**\n\n` +
`**C. Trong hình chữ nhật, giao điểm của 2 đường chéo cách đều 4 đỉnh:**\n` +
`Hình chữ nhật có 2 đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường. Do đó khoảng cách từ giao điểm đến 4 đỉnh là bằng nhau (bằng nửa đường chéo). $\\Rightarrow$ **Khẳng định ĐÚNG.**`;

  const sol6 = `Gọi chiều dài của con đường người đó đi từ $A$ đến $B$ là $x$ (km) ($x > 0$).\n` +
`Thời gian đi từ $A$ đến $B$ là: $\\frac{x}{20}$ (giờ).\n` +
`Chiều dài con đường lúc về là: $x + 10$ (km).\n` +
`Vận tốc lúc về lớn hơn lúc đi $6$ km/h, nên vận tốc lúc về là: $20 + 6 = 26$ (km/h).\n` +
`Thời gian quay về từ $B$ đến $A$ là: $\\frac{x + 10}{26}$ (giờ).\n` +
`Vì thời gian về ít hơn thời gian đi $1$ giờ, ta có phương trình:\n` +
`$\\frac{x}{20} - \\frac{x + 10}{26} = 1$\n` +
`$\\Leftrightarrow \\frac{x}{20} - \\frac{x}{26} - \\frac{10}{26} = 1$\n` +
`$\\Leftrightarrow x \\left( \\frac{1}{20} - \\frac{1}{26} \\right) = 1 + \\frac{10}{26}$\n` +
`$\\Leftrightarrow x \\cdot \\frac{26 - 20}{520} = \\frac{36}{26}$\n` +
`$\\Leftrightarrow x \\cdot \\frac{6}{520} = \\frac{36}{26}$\n` +
`$\\Leftrightarrow x = \\frac{36}{26} : \\frac{6}{520} = \\frac{36}{26} \\cdot \\frac{520}{6} = 6 \\cdot 20 = 120$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Chiều dài con đường từ $A$ đến $B$ là $120$ km.`;

  const sol7 = `Hai tam giác $\\Delta ABC$ và $\\Delta DEF$ đồng dạng với nhau (kí hiệu $\\Delta ABC \\sim \\Delta DEF$) nếu chúng thỏa mãn một trong 3 trường hợp đồng dạng:\n` +
`- Cạnh - cạnh - cạnh (c-c-c): 3 cặp cạnh tương ứng tỉ lệ.\n` +
`- Cạnh - góc - cạnh (c-g-c): 2 cặp cạnh tương ứng tỉ lệ và góc xen giữa bằng nhau.\n` +
`- Góc - góc (g-g): 2 cặp góc tương ứng bằng nhau.\n` +
`Xét các phương án:\n` +
`Phương án C: $\\widehat{A} = \\widehat{D}; \\widehat{B} = \\widehat{E}$ thỏa mãn trường hợp đồng dạng Góc - Góc (g-g).\n` +
`**Đáp án đúng là C.**`;

  const sol8 = `**a) Rút gọn các biểu thức:**\n` +
`$A = x(x^2 - 5x + 15) = x^3 - 5x^2 + 15x$.\n\n` +
`$B = x(x - 2) + (3 - x)(3 + x)$\n` +
`$B = x^2 - 2x + (9 - x^2)$\n` +
`$B = -2x + 9$.\n\n` +
`$C = (x + 4)^2 - 2(x - 5)(x + 4) + (x - 5)^2$ *(sửa lỗi gõ đề x=4 thành x+4)*\n` +
`Áp dụng hằng đẳng thức $a^2 - 2ab + b^2 = (a - b)^2$:\n` +
`$C = [(x + 4) - (x - 5)]^2 = (x + 4 - x + 5)^2 = 9^2 = 81$.\n\n` +
`**b) Tính giá trị biểu thức B tại x = 5:**\n` +
`Thay $x = 5$ vào biểu thức $B = -2x + 9$:\n` +
`$B = -2(5) + 9 = -10 + 9 = -1$.\n` +
`**Kết luận:** Tại $x = 5$, giá trị của biểu thức $B$ là $-1$.`;

  const sol9 = `Phương trình đã cho: $\\frac{4}{2x - 3} = \\frac{7}{3x - 5}$\n` +
`Điều kiện xác định là các mẫu thức phải khác $0$:\n` +
`$\\begin{cases} 2x - 3 \\ne 0 \\\\ 3x - 5 \\ne 0 \\end{cases}$\n` +
`$\\Leftrightarrow \\begin{cases} x \\ne \\frac{3}{2} \\\\ x \\ne \\frac{5}{3} \\end{cases}$\n` +
`**Kết luận:** Điều kiện xác định của phương trình là $x \\ne \\frac{3}{2}$ và $x \\ne \\frac{5}{3}$.`;

  const sol10 = `Theo giả thiết $xyz = 1$. Ta thay $1 = xyz$ vào số hạng thứ ba và $xy = \\frac{1}{z}$ vào một số vị trí để đồng nhất mẫu số.\n` +
`$M = \\frac{1}{1 + x + xy} + \\frac{1}{1 + y + yz} + \\frac{1}{1 + z + zx}$\n` +
`Nhân cả tử và mẫu của phân thức thứ hai với $x$:\n` +
`$\\frac{1}{1 + y + yz} = \\frac{x}{x(1 + y + yz)} = \\frac{x}{x + xy + xyz} = \\frac{x}{x + xy + 1}$\n` +
`Nhân cả tử và mẫu của phân thức thứ ba với $xy$:\n` +
`$\\frac{1}{1 + z + zx} = \\frac{xy}{xy(1 + z + zx)} = \\frac{xy}{xy + xyz + x^2yz}$\n` +
`Thay $xyz = 1$ và $x^2yz = x(xyz) = x \\cdot 1 = x$, ta được:\n` +
`$\\frac{xy}{xy + 1 + x} = \\frac{xy}{1 + x + xy}$\n` +
`Cộng cả ba phân thức đã biến đổi:\n` +
`$M = \\frac{1}{1 + x + xy} + \\frac{x}{1 + x + xy} + \\frac{xy}{1 + x + xy} = \\frac{1 + x + xy}{1 + x + xy} = 1$.\n` +
`**Kết luận:** Giá trị của biểu thức $M$ là $1$.`;

  const updates = [
    { id: "d5894a9f-9240-4d7d-a906-53f981cc0f90", solution: sol1 },
    { id: "d8f83675-9a6a-4e13-b22a-c7c0cec4834a", solution: sol2 },
    { id: "da0fbf51-c11c-4c6b-9163-8b789edf4749", solution: sol3 },
    { id: "dc66e9c9-b6a8-4699-a73a-674bfc99ce11", solution: sol4 },
    { id: "dd204f01-c5cc-496c-b996-5c3ba6af6834", solution: sol5 },
    { id: "df13e08e-cb74-4b6a-a890-8f3a1865d202", solution: sol6 },
    { id: "e12b68ce-c489-4466-a38a-905a7c0246d9", solution: sol7 },
    { id: "e23747df-1d6e-457a-92de-3ee09f9cefa2", solution: sol8 },
    { id: "e284caf1-0c3d-4563-9074-ec7057ac3139", solution: sol9 },
    { id: "e4092eb8-5866-46a0-a7bf-5e09aa9e9a4d", solution: sol10 }
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

manualFixBatch22Grade8().catch(console.error).finally(() => process.exit(0));
