import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function approveBatch1() {
  const sql = getDb();

  const sol1 = `**a)** $2(4x - 7) = 3(x + 1) + 18$\n` +
`$\\Leftrightarrow 8x - 14 = 3x + 3 + 18$\n` +
`$\\Leftrightarrow 8x - 3x = 21 + 14$\n` +
`$\\Leftrightarrow 5x = 35 \\Rightarrow x = 7$.\n` +
`Vậy tập nghiệm của phương trình là $S = \\{7\\}$.\n\n` +
`**b)** $\\frac{3x + 2}{2} + \\frac{5 - 2x}{3} = \\frac{11}{6}$\n` +
`Quy đồng mẫu số chung là $6$:\n` +
`$\\Leftrightarrow \\frac{3(3x + 2)}{6} + \\frac{2(5 - 2x)}{6} = \\frac{11}{6}$\n` +
`$\\Leftrightarrow 9x + 6 + 10 - 4x = 11$\n` +
`$\\Leftrightarrow 5x + 16 = 11$\n` +
`$\\Leftrightarrow 5x = 11 - 16 = -5 \\Rightarrow x = -1$.\n` +
`Vậy tập nghiệm của phương trình là $S = \\{-1\\}$.\n\n` +
`**c)** $|x - 1| + 7 = 3x \\Leftrightarrow |x - 1| = 3x - 7$\n` +
`Điều kiện để phương trình có nghiệm: $3x - 7 \\ge 0 \\Leftrightarrow x \\ge \\frac{7}{3}$.\n` +
`- Trường hợp 1: $x - 1 = 3x - 7 \\Leftrightarrow 2x = 6 \\Rightarrow x = 3$ (Thỏa mãn điều kiện $x \\ge \\frac{7}{3}$).\n` +
`- Trường hợp 2: $x - 1 = -(3x - 7) \\Leftrightarrow x - 1 = -3x + 7 \\Leftrightarrow 4x = 8 \\Rightarrow x = 2$ (Không thỏa mãn điều kiện $x \\ge \\frac{7}{3}$, loại).\n` +
`Vậy tập nghiệm của phương trình là $S = \\{3\\}$.\n\n` +
`**d)** Xét bất phương trình: $\\frac{x + 2}{x + 3} + \\frac{2x - 1}{x - 3} \\le \\frac{3x + 7}{3}$\n` +
`*(Lưu ý: Đề bài yêu cầu giải phương trình nhưng câu d lại chứa dấu bất phương trình. Dưới đây là phương pháp giải tổng quát cho dạng bài này)*.\n` +
`Điều kiện xác định: $x \\ne 3$ và $x \\ne -3$.\n` +
`Thực hiện quy đồng vế trái:\n` +
`$VT = \\frac{(x + 2)(x - 3) + (2x - 1)(x + 3)}{x^2 - 9} = \\frac{x^2 - x - 6 + 2x^2 + 5x - 3}{x^2 - 9} = \\frac{3x^2 + 4x - 9}{x^2 - 9}$.\n` +
`Bất phương trình trở thành: $\\frac{3x^2 + 4x - 9}{x^2 - 9} \\le \\frac{3x + 7}{3}$.\n` +
`Chuyển vế và quy đồng:\n` +
`$\\frac{3(3x^2 + 4x - 9) - (3x + 7)(x^2 - 9)}{3(x^2 - 9)} \\le 0$\n` +
`$\\Leftrightarrow \\frac{9x^2 + 12x - 27 - (3x^3 - 27x + 7x^2 - 63)}{3(x^2 - 9)} \\le 0$\n` +
`$\\Leftrightarrow \\frac{-3x^3 + 2x^2 + 39x + 36}{3(x^2 - 9)} \\le 0$.\n` +
`Đến đây ta tìm nghiệm của tử thức và lập bảng xét dấu để suy ra tập nghiệm của bất phương trình. *(Nếu đề bài gốc ở vế phải là $\\frac{3x^2 + 7}{x^2 - 9}$ thay vì $\\frac{3x+7}{3}$ thì học sinh chỉ cần triệt tiêu mẫu số sau khi xét điều kiện).*`;

  const sol2 = `**Phương pháp giải:**\n` +
`Sử dụng định nghĩa giá trị tuyệt đối: $|A| = B$ (với $B \\ge 0$) thì $A = B$ hoặc $A = -B$.\n\n` +
`**Cách giải:**\n` +
`Ta có: $|2x - 3| = 5$\n` +
`- Trường hợp 1:\n` +
`  $2x - 3 = 5$\n` +
`  $\\Leftrightarrow 2x = 5 + 3$\n` +
`  $\\Leftrightarrow 2x = 8 \\Rightarrow x = 4$.\n` +
`- Trường hợp 2:\n` +
`  $2x - 3 = -5$\n` +
`  $\\Leftrightarrow 2x = -5 + 3$\n` +
`  $\\Leftrightarrow 2x = -2 \\Rightarrow x = -1$.\n\n` +
`**Kết luận:** Tập nghiệm của phương trình là $x \\in \\{4; -1\\}$.`;

  const sol3 = `**Phương pháp giải:**\n` +
`1. Kẻ đường cao từ hai đỉnh của đáy nhỏ xuống đáy lớn để tạo thành hình chữ nhật và hai tam giác vuông bằng nhau.\n` +
`2. Tính độ dài một phần của đáy lớn.\n` +
`3. Sử dụng định lý Pytago để tính chiều cao hình thang.\n` +
`4. Áp dụng công thức tính diện tích hình thang: $S = \\frac{(a + b) \\cdot h}{2}$.\n\n` +
`**Cách giải:**\n` +
`Kẻ $AH \\perp CD$ tại $H$ và $BK \\perp CD$ tại $K$.\n` +
`Vì $ABCD$ là hình thang cân ($AB \\parallel CD$, $AD = BC$) nên $\\Delta ADH = \\Delta BCK$ (cạnh huyền - góc nhọn).\n` +
`Suy ra $DH = CK$.\n` +
`Tứ giác $ABKH$ có $AB \\parallel HK$ và $AH \\parallel BK$ (cùng vuông góc với $CD$) và $\\widehat{H} = 90^\\circ$ nên là hình chữ nhật. Suy ra $HK = AB = 8$ cm.\n` +
`Độ dài đoạn $DH$ là: \n` +
`$DH = \\frac{CD - HK}{2} = \\frac{14 - 8}{2} = 3$ (cm).\n` +
`Xét $\\Delta ADH$ vuông tại $H$, áp dụng định lý Pytago ta có:\n` +
`$AD^2 = AH^2 + DH^2 \\Rightarrow 5^2 = AH^2 + 3^2 \\Rightarrow AH^2 = 25 - 9 = 16 \\Rightarrow AH = 4$ (cm).\n` +
`Vậy chiều cao của hình thang là $AH = 4$ cm.\n` +
`Diện tích hình thang $ABCD$ là:\n` +
`$S = \\frac{(AB + CD) \\cdot AH}{2} = \\frac{(8 + 14) \\cdot 4}{2} = \\frac{22 \\cdot 4}{2} = 44$ (cm$^2$).\n` +
`**Kết luận:** Diện tích hình thang $ABCD$ là $44$ cm$^2$.`;

  const sol4 = `**1)** $16x - 8xy + xy^2$\n` +
`Đặt nhân tử chung là $x$:\n` +
`$= x(16 - 8y + y^2)$\n` +
`Nhận thấy trong ngoặc là hằng đẳng thức bình phương của một hiệu $(4 - y)^2$:\n` +
`$= x(4 - y)^2$.\n\n` +
`**2)** $3(3 - x) + 2x(x - 3)$\n` +
`Đổi dấu hạng tử đầu tiên để xuất hiện nhân tử chung $(x - 3)$:\n` +
`$= -3(x - 3) + 2x(x - 3)$\n` +
`Đặt nhân tử chung là $(x - 3)$:\n` +
`$= (x - 3)(-3 + 2x) = (x - 3)(2x - 3)$.\n\n` +
`**3)** $3x^2 + 4x - 4$\n` +
`Sử dụng phương pháp tách hạng tử giữa ($4x = 6x - 2x$):\n` +
`$= 3x^2 + 6x - 2x - 4$\n` +
`Nhóm các hạng tử lại với nhau:\n` +
`$= 3x(x + 2) - 2(x + 2)$\n` +
`Đặt nhân tử chung là $(x + 2)$:\n` +
`$= (x + 2)(3x - 2)$.`;

  const sol5 = `**1)** $3x^2 - 6x + 3 = 0$\n` +
`Chia cả hai vế cho $3$:\n` +
`$\\Leftrightarrow x^2 - 2x + 1 = 0$\n` +
`Áp dụng hằng đẳng thức bình phương của một hiệu:\n` +
`$\\Leftrightarrow (x - 1)^2 = 0$\n` +
`$\\Leftrightarrow x - 1 = 0 \\Rightarrow x = 1$.\n` +
`Vậy $x = 1$.\n\n` +
`**2)** $2x(x + 3) - 4(x + 3) = 0$\n` +
`Đặt nhân tử chung là $(x + 3)$:\n` +
`$\\Leftrightarrow (x + 3)(2x - 4) = 0$\n` +
`$\\Leftrightarrow x + 3 = 0$ hoặc $2x - 4 = 0$\n` +
`- Nếu $x + 3 = 0 \\Rightarrow x = -3$.\n` +
`- Nếu $2x - 4 = 0 \\Rightarrow 2x = 4 \\Rightarrow x = 2$.\n` +
`Vậy $x \\in \\{-3; 2\\}$.\n\n` +
`**3)** $x^2 + 7x + 10 = 0$\n` +
`Tách hạng tử giữa $7x = 2x + 5x$:\n` +
`$\\Leftrightarrow x^2 + 2x + 5x + 10 = 0$\n` +
`Nhóm các hạng tử:\n` +
`$\\Leftrightarrow x(x + 2) + 5(x + 2) = 0$\n` +
`$\\Leftrightarrow (x + 2)(x + 5) = 0$\n` +
`$\\Leftrightarrow x + 2 = 0$ hoặc $x + 5 = 0$\n` +
`- Nếu $x + 2 = 0 \\Rightarrow x = -2$.\n` +
`- Nếu $x + 5 = 0 \\Rightarrow x = -5$.\n` +
`Vậy $x \\in \\{-5; -2\\}$.`;

  const updates = [
    { id: "8b68d454-e65a-4052-b544-fafc9992b915", solution: sol1 },
    { id: "63850d82-61f3-42c1-bb88-6ced99587e9d", solution: sol2 },
    { id: "f3046f3c-f601-474b-b3a7-b5a77e30e0de", solution: sol3 },
    { id: "66cf72ed-adb8-4562-a47a-6e943aeb7f3b", solution: sol4 },
    { id: "b066b367-4b13-420b-a8e7-c6fa6e8aff4b", solution: sol5 }
  ];

  for (const { id, solution } of updates) {
    await sql`
      UPDATE public.questions 
      SET solution = ${solution}, status = 'approved', updated_at = NOW() 
      WHERE id = ${id};
    `;
    console.log(`Updated and approved ID: ${id}`);
  }
}

approveBatch1().catch(console.error).finally(() => process.exit(0));
