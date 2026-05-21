import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch80() {
  const sql = getDb();

  const sol1 = `Gọi giá tiền $1$ mét vải loại I là $x$ (đồng), số mét vải loại II mua được là $y$ (m).\n` +
`Giá tiền $1$ mét vải loại II là $120\\% \\cdot x = 1,2x$.\n` +
`Vì số tiền mua vải không đổi nên số lượng vải mua được và giá tiền mỗi mét vải là hai đại lượng tỉ lệ nghịch.\n` +
`Ta có: $80 \\cdot x = y \\cdot 1,2x$.\n` +
`$\\Rightarrow 80 = y \\cdot 1,2 \\Rightarrow y = 80 : 1,2 = \\frac{800}{12} = \\frac{200}{3} = 66\\frac{2}{3}$.\n` +
`**Kết luận:** Với cùng số tiền đó, có thể mua được $\\frac{200}{3}$ m (khoảng $66,67$ m) vải loại II.`;

  const sol2 = `Xét $\\Delta ABC$, ta có $\\widehat{A} = 90^\\circ$ (vì vuông tại A).\n` +
`Đồng thời $AB = AC$ nên $\\Delta ABC$ là tam giác vuông cân tại A.\n` +
`Trong tam giác vuông cân, hai góc ở đáy bằng nhau và có tổng số đo bằng $90^\\circ$.\n` +
`Suy ra: $\\widehat{B} = \\widehat{C} = \\frac{90^\\circ}{2} = 45^\\circ$.\n` +
`**Kết luận:** $\\widehat{B} = 45^\\circ; \\widehat{C} = 45^\\circ$.`;

  const sol3 = `Để viết số thập phân dưới dạng phân số tối giản, ta đổi sang phân số thập phân rồi rút gọn:\n\n` +
`- $0,475 = \\frac{475}{1000}$. Chia cả tử và mẫu cho $25$, ta được: $\\frac{19}{40}$.\n\n` +
`- $-2,84 = -\\frac{284}{100}$. Chia cả tử và mẫu cho $4$, ta được: $\\frac{-71}{25}$.\n\n` +
`- $7,375 = \\frac{7375}{1000}$. Chia cả tử và mẫu cho $125$, ta được: $\\frac{59}{8}$.`;

  const sol4 = `**a)** $\\frac{7}{2} - \\left( \\frac{3}{4} + \\frac{1}{5} \\right)$\n` +
`Quy đồng trong ngoặc với mẫu chung là $20$:\n` +
`$= \\frac{7}{2} - \\left( \\frac{15}{20} + \\frac{4}{20} \\right) = \\frac{7}{2} - \\frac{19}{20}$\n` +
`Quy đồng với mẫu chung $20$:\n` +
`$= \\frac{70}{20} - \\frac{19}{20} = \\frac{51}{20}$.\n\n` +
`**b)** $\\frac{1}{4} + \\frac{3}{4} \\cdot \\frac{-5}{9} - \\left( -\\frac{2021}{2022} \\right)^0$\n` +
`Nhớ rằng mọi số $x \\ne 0$ thì $x^0 = 1$:\n` +
`$= \\frac{1}{4} + \\frac{3 \\cdot (-5)}{4 \\cdot 9} - 1 = \\frac{1}{4} + \\frac{-15}{36} - 1 = \\frac{1}{4} - \\frac{5}{12} - 1$\n` +
`Quy đồng mẫu số chung là $12$:\n` +
`$= \\frac{3}{12} - \\frac{5}{12} - \\frac{12}{12} = \\frac{3 - 5 - 12}{12} = \\frac{-14}{12} = \\frac{-7}{6}$.`;

  const sol5 = `Bỏ dấu ngoặc rồi nhóm các hạng tử hợp lý:\n\n` +
`**a)** $\\left( \\frac{7}{8} - \\frac{5}{2} + \\frac{4}{7} \\right) - \\left( -\\frac{3}{7} + 1 - \\frac{13}{8} \\right)$\n` +
`$= \\frac{7}{8} - \\frac{5}{2} + \\frac{4}{7} + \\frac{3}{7} - 1 + \\frac{13}{8} = \\left( \\frac{7}{8} + \\frac{13}{8} \\right) + \\left( \\frac{4}{7} + \\frac{3}{7} \\right) - \\frac{5}{2} - 1$\n` +
`$= \\frac{20}{8} + \\frac{7}{7} - \\frac{5}{2} - 1 = \\frac{5}{2} + 1 - \\frac{5}{2} - 1 = 0$.\n\n` +
`**b)** $\\frac{-3}{7} + \\left( 3 - \\frac{3}{4} \\right) - \\left( 2,25 - \\frac{10}{7} \\right)$\n` +
`Đổi $2,25 = \\frac{9}{4}$. Biểu thức trở thành:\n` +
`$= \\frac{-3}{7} + 3 - \\frac{3}{4} - \\frac{9}{4} + \\frac{10}{7} = \\left( \\frac{-3}{7} + \\frac{10}{7} \\right) - \\left( \\frac{3}{4} + \\frac{9}{4} \\right) + 3$\n` +
`$= \\frac{7}{7} - \\frac{12}{4} + 3 = 1 - 3 + 3 = 1$.\n\n` +
`**c)** $\\frac{1}{2} - \\frac{43}{101} + \\left( -\\frac{1}{3} \\right) - \\frac{1}{6}$\n` +
`$= \\left( \\frac{1}{2} - \\frac{1}{3} - \\frac{1}{6} \\right) - \\frac{43}{101} = \\left( \\frac{3}{6} - \\frac{2}{6} - \\frac{1}{6} \\right) - \\frac{43}{101} = 0 - \\frac{43}{101} = -\\frac{43}{101}$.\n\n` +
`**d)** $\\left( \\frac{5}{3} - \\frac{3}{7} + 9 \\right) - \\left( 2 + \\frac{5}{7} - \\frac{2}{3} \\right) + \\left( \\frac{8}{7} - \\frac{4}{3} - 10 \\right)$\n` +
`$= \\frac{5}{3} - \\frac{3}{7} + 9 - 2 - \\frac{5}{7} + \\frac{2}{3} + \\frac{8}{7} - \\frac{4}{3} - 10$\n` +
`$= \\left( \\frac{5}{3} + \\frac{2}{3} - \\frac{4}{3} \\right) + \\left( -\\frac{3}{7} - \\frac{5}{7} + \\frac{8}{7} \\right) + (9 - 2 - 10)$\n` +
`$= \\frac{3}{3} + 0 - 3 = 1 - 3 = -2$.`;

  const sol6 = `*(Do đề bài không đính kèm biểu đồ cụ thể, ta thực hiện theo phương pháp chung sau)*\n\n` +
`**a. Tính tỉ lệ người bị thừa cân (BMI $\\ge 23$):**\n` +
`- Quan sát biểu đồ hình quạt tròn.\n` +
`- Xác định các phần hình quạt biểu diễn nhóm người có $BMI \\ge 23$ (ví dụ: nhóm \"Thừa cân\", \"Tiền béo phì\", \"Béo phì độ I\", \"Béo phì độ II\",...). \n` +
`- Cộng tất cả các tỉ lệ phần trăm của các nhóm này lại để ra kết quả.\n\n` +
`**b. Tìm giá trị điền vào dấu \"?\":**\n` +
`- Tổng các thành phần trong biểu đồ hình quạt tròn luôn bằng $100\\%$.\n` +
`- Lấy $100\\%$ trừ đi tổng tỉ lệ phần trăm của tất cả các phần đã biết số liệu để tìm ra giá trị của \"?\".`;

  const sol7 = `Áp dụng định lý tổng ba góc trong một tam giác cho $\\Delta ABC$, ta có:\n` +
`$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180^\\circ$\n` +
`$\\Rightarrow 98^\\circ + \\widehat{B} + 57^\\circ = 180^\\circ$\n` +
`$\\Rightarrow \\widehat{B} + 155^\\circ = 180^\\circ$\n` +
`$\\Rightarrow \\widehat{B} = 180^\\circ - 155^\\circ = 25^\\circ$.\n` +
`**Đáp án đúng là A.**`;

  const sol8 = `**a)** $\\frac{1}{12} + \\frac{-3}{12}$\n` +
`$= \\frac{1 + (-3)}{12} = \\frac{-2}{12} = \\frac{-1}{6}$.\n\n` +
`**b)** $\\frac{7}{8} - \\frac{5}{4}$\n` +
`Quy đồng mẫu số chung là $8$:\n` +
`$= \\frac{7}{8} - \\frac{10}{8} = \\frac{7 - 10}{8} = \\frac{-3}{8}$.\n\n` +
`**c)** $1\\frac{2}{5} + 3\\frac{3}{5}$\n` +
`Đổi ra phân số:\n` +
`$= \\frac{7}{5} + \\frac{18}{5} = \\frac{25}{5} = 5$.\n` +
`*(Hoặc cộng phần nguyên với phần nguyên, phân số với phân số: $1+3 + \\frac{2+3}{5} = 4+1=5$).*\n\n` +
`**d)** $\\frac{-14}{20} + 0,6$\n` +
`Đổi $\\frac{-14}{20} = -0,7$. \n` +
`Ta được: $-0,7 + 0,6 = -0,1$ (hoặc $\\frac{-1}{10}$).`;

  const sol9 = `**1. Có bao nhiêu loại thực phẩm được điều tra? Kể tên.**\n` +
`Quan sát bảng dữ liệu, có $4$ loại thực phẩm được điều tra.\n` +
`Tên các loại thực phẩm đó là: **Gia cầm, Thịt bò, Lòng đỏ trứng, Thịt ba chỉ**.\n\n` +
`**2. Phân loại dữ liệu có trong bảng:**\n` +
`- Dữ liệu về \"Loại thực phẩm\" (gồm Gia cầm, Thịt bò, Lòng đỏ trứng, Thịt ba chỉ) là **Dữ liệu định tính** (dữ liệu dạng chữ, phân loại đối tượng).\n` +
`- Dữ liệu về \"Hàm lượng protein\" (gồm $11; 26; 16; 9$) là **Dữ liệu định lượng** (dữ liệu dạng số đo đếm được).`;

  const sol10 = `Dựa vào tính chất của các dãy dữ liệu thu được, ta phân loại như sau:\n\n` +
`**1. Cân nặng của $5$ bạn ($41; 57; 47; 46; 53$):**\n` +
`- Đây là các con số biểu diễn khối lượng, có thể đo lường và tính toán (như tính trung bình cộng).\n` +
`- Phân loại: **Dữ liệu định lượng**.\n\n` +
`**2. Màu sắc yêu thích (Trắng, hồng, đen, đỏ):**\n` +
`- Đây là tên các màu sắc, dùng để mô tả sở thích, không phải là số.\n` +
`- Phân loại: **Dữ liệu định tính (không có thứ bậc)**.\n\n` +
`**3. Đánh giá về năng lực học Toán (Xuất sắc, tốt, khá, đạt, chưa đạt):**\n` +
`- Đây là các xếp loại bằng chữ, dùng để phân loại mức độ học tập và có thể sắp xếp theo trình tự (từ cao xuống thấp).\n` +
`- Phân loại: **Dữ liệu định tính (có thứ bậc)**.`;

  const updates = [
    { id: "f2819af1-256b-4131-92b1-cab2674edcda", solution: sol1 },
    { id: "f31004be-ce0e-40de-9c1c-941510bbdfb5", solution: sol2 },
    { id: "f3c196ca-1756-448a-be55-dd51d510efac", solution: sol3 },
    { id: "f44ddb59-0514-480f-b454-394716bf5bb9", solution: sol4 },
    { id: "f4f76951-0909-4712-8d1c-05400c7cada6", solution: sol5 },
    { id: "f551094a-fdf5-44c0-8657-7a6258c50036", solution: sol6 },
    { id: "f571e83c-adb5-439f-bfd1-7cd966db6c0c", solution: sol7 },
    { id: "f6bd1b91-c5fd-4434-baf8-b154570fcec1", solution: sol8 },
    { id: "f82b7b09-207b-46bf-a4f5-d3563939d2d8", solution: sol9 },
    { id: "f831399c-ef76-4d79-9ff7-d50c69a168ca", solution: sol10 }
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

manualFixBatch80().catch(console.error).finally(() => process.exit(0));
