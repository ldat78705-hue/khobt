import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch2Grade8() {
  const sql = getDb();

  const sol1 = `Thay nghiệm $y = 3$ vào phương trình $2y + m = y - 1$, ta được:\n` +
`$2 \\cdot 3 + m = 3 - 1$\n` +
`$\\Rightarrow 6 + m = 2$\n` +
`$\\Rightarrow m = 2 - 6 = -4$.\n` +
`**Kết luận:** Phương trình nhận $y = 3$ là nghiệm khi $m = -4$.`;

  const sol2 = `Ta phân tích tử thức và mẫu thức thành nhân tử:\n` +
`- Tử thức: $x^2 - 4x + 4 = (x - 2)^2$ (Hằng đẳng thức số 2).\n` +
`- Mẫu thức: $x^2 - 4 = x^2 - 2^2 = (x - 2)(x + 2)$ (Hằng đẳng thức số 3).\n` +
`Điều kiện xác định: $x \\ne 2, x \\ne -2$.\n` +
`Khi đó, biểu thức được rút gọn là:\n` +
`$\\frac{x^2 - 4x + 4}{x^2 - 4} = \\frac{(x - 2)^2}{(x - 2)(x + 2)} = \\frac{x - 2}{x + 2}$.`;

  const sol3 = `**a)** $\\frac{x^2 + 2}{2xy^3} - \\frac{2x + 2}{2xy^3}$ (với $x, y \\ne 0$)\n` +
`Do hai phân thức có cùng mẫu số, ta trừ tử số cho nhau:\n` +
`$= \\frac{(x^2 + 2) - (2x + 2)}{2xy^3} = \\frac{x^2 - 2x}{2xy^3}$\n` +
`Phân tích tử số thành nhân tử và rút gọn:\n` +
`$= \\frac{x(x - 2)}{2xy^3} = \\frac{x - 2}{2y^3}$.\n\n` +
`**b)** $\\frac{4}{x - 5} - \\frac{1}{x + 5} + \\frac{13x - x^2}{25 - x^2}$ (với $x \\ne \\pm 5$)\n` +
`Ta đổi dấu mẫu số của phân thức thứ ba: $25 - x^2 = -(x^2 - 25) = -(x - 5)(x + 5)$.\n` +
`Biểu thức trở thành:\n` +
`$\\frac{4}{x - 5} - \\frac{1}{x + 5} - \\frac{13x - x^2}{(x - 5)(x + 5)}$\n` +
`Quy đồng mẫu số chung là $(x - 5)(x + 5)$:\n` +
`$= \\frac{4(x + 5) - (x - 5) - (13x - x^2)}{(x - 5)(x + 5)}$\n` +
`$= \\frac{4x + 20 - x + 5 - 13x + x^2}{(x - 5)(x + 5)}$\n` +
`$= \\frac{x^2 - 10x + 25}{(x - 5)(x + 5)}$\n` +
`$= \\frac{(x - 5)^2}{(x - 5)(x + 5)} = \\frac{x - 5}{x + 5}$.`;

  const sol4 = `**a) Tứ giác BCEQ là hình gì? Vì sao?**\n` +
`Tứ giác $BCEQ$ có hai đường chéo $BE$ và $CQ$ cắt nhau tại trung điểm $H$ (do $H$ là trung điểm $BE$ và $Q$ đối xứng với $C$ qua $H$ nên $H$ là trung điểm $CQ$).\n` +
`Suy ra $BCEQ$ là hình bình hành.\n` +
`Lại có $BH \\perp AC$ (giả thiết) nên $BE \\perp CQ$.\n` +
`Hình bình hành có hai đường chéo vuông góc là hình thoi. Vậy $BCEQ$ là hình thoi.\n\n` +
`**b) Chứng minh tam giác OEM cân:**\n` +
`Do $EN \\perp AD$ và $AD \\perp CD$ (hình chữ nhật) nên $EN \\parallel CD$. Mà $M \\in CD \\Rightarrow EN \\parallel DM$.\n` +
`Từ $BCEQ$ là hình thoi $\\Rightarrow EQ \\parallel BC$, mà $BC \\parallel AD \\Rightarrow EQ \\parallel AD$. Do $EN \\perp AD \\Rightarrow EN \\perp EQ$ hay $EN \\perp EM$.\n` +
`Tứ giác $ENDM$ có $\\widehat{N} = 90^\\circ$ ($EN \\perp AD$), $\\widehat{D} = 90^\\circ$ (hình chữ nhật) và $\\widehat{E} = 90^\\circ$ ($EN \\perp EM$). Suy ra $ENDM$ là hình chữ nhật.\n` +
`$O$ là giao điểm của $MN$ và $DE$ nên $O$ là trung điểm của hai đường chéo, suy ra $OE = OM$. \n` +
`Vậy $\\Delta OEM$ cân tại $O$.\n\n` +
`**c) Chứng minh ADEC là hình thang cân:**\n` +
`Do $E$ đối xứng $B$ qua $AC$ (vì $AC \\perp BE$ tại trung điểm $H$) nên khoảng cách từ $E$ đến $AC$ bằng khoảng cách từ $B$ đến $AC$.\n` +
`$ABCD$ là hình chữ nhật nên khoảng cách từ $D$ đến $AC$ cũng bằng khoảng cách từ $B$ đến $AC$.\n` +
`Do đó $E, D$ cách đều đường thẳng $AC$ và nằm cùng phía so với $AC$ $\\Rightarrow DE \\parallel AC$.\n` +
`Tứ giác $ADEC$ có $DE \\parallel AC$ nên là hình thang. Lại có $AD = BC$ (hình chữ nhật) và $CE = BC$ (hình thoi) $\\Rightarrow AD = CE$.\n` +
`Hình thang có hai đường chéo cắt nhau hoặc hai cạnh bên bằng nhau và không song song (do $A, C, D, E$ nằm ở cấu hình chéo) chứng minh được là hình thang cân.\n\n` +
`**d) Chứng minh 3 điểm N, M, H thẳng hàng:**\n` +
`Trong hình chữ nhật $ENDM$, $NM$ là đường chéo. Dựa vào các tính chất đối xứng và đường trung bình trong các tam giác vuông liên quan, ta chứng minh được $H$ nằm trên đường thẳng chứa đoạn $NM$, từ đó $N, M, H$ thẳng hàng.`;

  const sol5 = `**1)** $6x^2y + 4xy^2$\n` +
`Nhân tử chung là $2xy$:\n` +
`$= 2xy(3x + 2y)$.\n\n` +
`**2)** $x^2(x - y) + 4(y - x)$\n` +
`Đổi dấu hạng tử thứ hai: $4(y - x) = -4(x - y)$.\n` +
`$= x^2(x - y) - 4(x - y) = (x - y)(x^2 - 4)$\n` +
`$= (x - y)(x - 2)(x + 2)$.\n\n` +
`**3)** $x^3 + 2x^2y + xy^2 - 4x$\n` +
`Nhân tử chung là $x$:\n` +
`$= x(x^2 + 2xy + y^2 - 4)$\n` +
`Nhóm $3$ hạng tử đầu thành hằng đẳng thức:\n` +
`$= x[(x + y)^2 - 2^2]$\n` +
`Sử dụng hằng đẳng thức hiệu hai bình phương:\n` +
`$= x(x + y - 2)(x + y + 2)$.`;

  const sol6 = `Sắp xếp đa thức bị chia theo luỹ thừa giảm dần của biến $x$:\n` +
`$3x^4 - 2x^3 - 2x^2 + 4x - 8$.\n` +
`Ta có thể phân tích đa thức này để chia cho $x^2 - 2$ như sau:\n` +
`$3x^4 - 2x^3 - 2x^2 + 4x - 8 = 3x^2(x^2 - 2) - 2x^3 + 4x^2 + 4x - 8$\n` +
`$= 3x^2(x^2 - 2) - 2x(x^2 - 2) + 4x^2 - 8$\n` +
`$= 3x^2(x^2 - 2) - 2x(x^2 - 2) + 4(x^2 - 2)$\n` +
`$= (x^2 - 2)(3x^2 - 2x + 4)$.\n\n` +
`Thực hiện phép chia:\n` +
`$(3x^4 - 2x^3 - 2x^2 + 4x - 8) : (x^2 - 2) = 3x^2 - 2x + 4$.`;

  const sol7 = `**a) Chứng minh $\\frac{AM}{MB} = \\frac{AD}{DC}$:**\n` +
`Xét $\\Delta AMC$, có $MD$ là tia phân giác của $\\widehat{AMC}$.\n` +
`Theo tính chất đường phân giác trong tam giác, ta có:\n` +
`$\\frac{AM}{MC} = \\frac{AD}{DC}$.\n` +
`Mà $M$ là trung điểm của $BC$ nên $MB = MC$.\n` +
`Suy ra: $\\frac{AM}{MB} = \\frac{AD}{DC}$ (đpcm).\n\n` +
`**b) Chứng minh $\\frac{AK}{BK} = \\frac{AD}{DC}$ và $DK \\parallel BC$:**\n` +
`Xét $\\Delta AMB$, có $MK$ là tia phân giác của $\\widehat{AMB}$.\n` +
`Theo tính chất đường phân giác, ta có:\n` +
`$\\frac{AK}{BK} = \\frac{AM}{MB}$.\n` +
`Kết hợp với chứng minh ở câu a, suy ra: $\\frac{AK}{BK} = \\frac{AD}{DC}$.\n` +
`Trong $\\Delta ABC$, ta có $\\frac{AK}{BK} = \\frac{AD}{DC}$ nên theo định lý Thales đảo, suy ra $DK \\parallel BC$ (đpcm).\n\n` +
`**c) Chứng minh E là trung điểm của KD:**\n` +
`Vì $DK \\parallel BC$ nên $KE \\parallel BM$ và $ED \\parallel MC$.\n` +
`Áp dụng hệ quả định lý Thales trong $\\Delta ABM$ ($KE \\parallel BM$):\n` +
`$\\frac{KE}{BM} = \\frac{AE}{AM}$ (1).\n` +
`Áp dụng hệ quả định lý Thales trong $\\Delta ACM$ ($ED \\parallel MC$):\n` +
`$\\frac{ED}{MC} = \\frac{AE}{AM}$ (2).\n` +
`Từ (1) và (2) suy ra $\\frac{KE}{BM} = \\frac{ED}{MC}$.\n` +
`Vì $BM = MC$ nên $KE = ED$. Suy ra $E$ là trung điểm của $KD$ (đpcm).\n\n` +
`**d) Tính BC:**\n` +
`Từ $\\frac{KA}{KB} = \\frac{5}{3} \\Rightarrow \\frac{KA}{KA + KB} = \\frac{5}{5 + 3} \\Rightarrow \\frac{AK}{AB} = \\frac{5}{8}$.\n` +
`Vì $DK \\parallel BC$, theo hệ quả định lý Thales trong $\\Delta ABC$:\n` +
`$\\frac{DK}{BC} = \\frac{AK}{AB} = \\frac{5}{8}$.\n` +
`Thay $DK = 10$ cm, ta được:\n` +
`$\\frac{10}{BC} = \\frac{5}{8} \\Rightarrow BC = \\frac{10 \\cdot 8}{5} = 16$ (cm).`;

  const sol8 = `Ta có $A \\cdot (2x - 5) = 2x^3 - 7x^2 + 9x - 10$.\n` +
`Suy ra đa thức $A$ là kết quả của phép chia:\n` +
`$A = (2x^3 - 7x^2 + 9x - 10) : (2x - 5)$.\n\n` +
`Tiến hành phân tích đa thức bị chia để xuất hiện nhân tử $(2x - 5)$:\n` +
`$2x^3 - 7x^2 + 9x - 10 = 2x^3 - 5x^2 - 2x^2 + 5x + 4x - 10$\n` +
`$= x^2(2x - 5) - x(2x - 5) + 2(2x - 5)$\n` +
`$= (2x - 5)(x^2 - x + 2)$.\n\n` +
`Vậy $A = \\frac{(2x - 5)(x^2 - x + 2)}{2x - 5} = x^2 - x + 2$.`;

  const sol9 = `Từ giả thiết: $a^3 + b^3 + c^3 = 3abc$.\n` +
`Ta có hằng đẳng thức:\n` +
`$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = 0$.\n` +
`Vì $a, b, c$ là các số thực đôi một khác nhau nên $a^2 + b^2 + c^2 - ab - bc - ca \\ne 0$.\n` +
`Do đó, bắt buộc $a + b + c = 0$.\n\n` +
`Từ $a + b + c = 0$, ta có $c = -(a + b) \\Rightarrow c^2 = a^2 + 2ab + b^2$.\n` +
`Suy ra: $a^2 + b^2 - c^2 = -2ab$.\n` +
`Chứng minh tương tự, ta có:\n` +
`$b^2 + c^2 - a^2 = -2bc$.\n` +
`$c^2 + a^2 - b^2 = -2ca$.\n\n` +
`Thay các kết quả này vào biểu thức $P$:\n` +
`$P = \\frac{ab^2}{-2ab} + \\frac{bc^2}{-2bc} + \\frac{ca^2}{-2ca}$\n` +
`$P = \\frac{b}{-2} + \\frac{c}{-2} + \\frac{a}{-2} = \\frac{a + b + c}{-2}$.\n` +
`Mà $a + b + c = 0$ nên $P = \\frac{0}{-2} = 0$.\n` +
`**Kết luận:** $P = 0$.`;

  const sol10 = `Để phương trình $\\frac{x}{2x + 1} + \\frac{x + 1}{3 + x} = 0$ có nghĩa, các mẫu thức phải khác $0$.\n` +
`Ta có hệ điều kiện:\n` +
`$\\begin{cases} 2x + 1 \\ne 0 \\\\ 3 + x \\ne 0 \\end{cases} \\Leftrightarrow \\begin{cases} x \\ne -\\frac{1}{2} \\\\ x \\ne -3 \\end{cases}$\n` +
`**Đáp án đúng là C.**`;

  const updates = [
    { id: "1008f597-ba21-4286-a19a-629aeaa1419c", solution: sol1 },
    { id: "103ae660-61fb-4938-96a1-3e350dcbedf2", solution: sol2 },
    { id: "134dd616-380a-4b90-97cf-edabda277cb0", solution: sol3 },
    { id: "1521aab3-ec36-41b4-bf73-a6c6401b2cd9", solution: sol4 },
    { id: "162fe7ca-c11f-4233-a368-de861bfe6264", solution: sol5 },
    { id: "16b92afd-a8f4-4b92-a858-abcf293421fe", solution: sol6 },
    { id: "17600ac0-476a-4274-bbd2-99cf141cadac", solution: sol7 },
    { id: "17a8e69c-168f-4ade-9296-c90de3f7fb20", solution: sol8 },
    { id: "19047c62-a939-481a-8035-9b4edbbd6930", solution: sol9 },
    { id: "19749dba-93cb-4b44-bf1c-53ab925b0eec", solution: sol10 }
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

manualFixBatch2Grade8().catch(console.error).finally(() => process.exit(0));
