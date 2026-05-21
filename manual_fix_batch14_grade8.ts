import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch14Grade8() {
  const sql = getDb();

  const sol1 = `*(Do câu hỏi tham chiếu đến \"hình 1\" không có số liệu cụ thể nên đây là phương pháp giải chung)*\n\n` +
`Theo tính chất đường phân giác trong tam giác:\n` +
`Trong $\\Delta ABC$, vì $AM$ là tia phân giác của $\\widehat{A}$ ($M \\in BC$), ta có tỉ lệ thức:\n` +
`$\\frac{MB}{MC} = \\frac{AB}{AC}$\n` +
`Từ tỉ lệ thức này, ta có thể tính độ dài đoạn thẳng $MB$ bằng công thức:\n` +
`$MB = \\frac{AB}{AC} \\cdot MC$ (nếu biết $AB, AC, MC$)\n` +
`Hoặc tính thông qua cạnh $BC$: $MB = \\frac{AB}{AB + AC} \\cdot BC$.`;

  const sol2 = `**1. Tìm thương và số dư của phép chia $A(x)$ cho $B(x)$:**\n` +
`Ta thực hiện phép chia đa thức:\n` +
`- $(2x^3 - x^2 - x + 1) : (x - 2)$\n` +
`- Lấy $2x^3 : x = 2x^2$. Nhân ngược: $2x^2(x - 2) = 2x^3 - 4x^2$.\n` +
`  Trừ đi ta được: $(-x^2) - (-4x^2) = 3x^2$. Hạ $-x + 1$ xuống thành $3x^2 - x + 1$.\n` +
`- Lấy $3x^2 : x = 3x$. Nhân ngược: $3x(x - 2) = 3x^2 - 6x$.\n` +
`  Trừ đi ta được: $(-x) - (-6x) = 5x$. Hạ $1$ xuống thành $5x + 1$.\n` +
`- Lấy $5x : x = 5$. Nhân ngược: $5(x - 2) = 5x - 10$.\n` +
`  Trừ đi ta được: $1 - (-10) = 11$.\n` +
`**Kết luận:** Thương là $Q(x) = 2x^2 + 3x + 5$; Số dư là $R = 11$.\n\n` +
`**2. Tìm số nguyên x để A(x) chia hết cho B(x):**\n` +
`Từ phép chia trên ta có biểu diễn: $A(x) = (2x^2 + 3x + 5)(x - 2) + 11$.\n` +
`Để $A(x)$ chia hết cho $B(x) = x - 2$ thì phần dư $11$ phải chia hết cho $x - 2$.\n` +
`Suy ra $x - 2 \\in U(11) = \\{1; -1; 11; -11\\}$.\n` +
`- $x - 2 = 1 \\Rightarrow x = 3$\n` +
`- $x - 2 = -1 \\Rightarrow x = 1$\n` +
`- $x - 2 = 11 \\Rightarrow x = 13$\n` +
`- $x - 2 = -11 \\Rightarrow x = -9$\n` +
`**Kết luận:** $x \\in \\{-9; 1; 3; 13\\}$.`;

  const sol3 = `Phát biểu này là **SAI**.\n\n` +
`**Giải thích:**\n` +
`Phương trình $(x + 3)(4x - 8) = 0$ là phương trình **tích**. \n` +
`Nếu khai triển ra, ta sẽ được phương trình bậc hai: $4x^2 + 4x - 24 = 0$.\n` +
`Phương trình bậc nhất một ẩn phải có dạng $ax + b = 0$ (với $a \\ne 0$) và bậc cao nhất của ẩn chỉ là $1$.`;

  const sol4 = `Ta có phương trình:\n` +
`$\\frac{2}{3}x(x^2 - 16) = 0$\n` +
`Đây là phương trình tích, suy ra:\n` +
`Trường hợp 1: $\\frac{2}{3}x = 0 \\Rightarrow x = 0$.\n` +
`Trường hợp 2: $x^2 - 16 = 0 \\Leftrightarrow x^2 = 16 \\Rightarrow x = 4$ hoặc $x = -4$.\n` +
`**Kết luận:** Các số $x$ tìm được là $x \\in \\{-4; 0; 4\\}$.`;

  const sol5 = `Gọi độ dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian ô tô thứ nhất đi hết quãng đường là: $\\frac{x}{50}$ (giờ).\n` +
`Thời gian ô tô thứ hai đi hết quãng đường là: $\\frac{x}{65}$ (giờ).\n` +
`Đổi $1$ giờ $30$ phút = $1,5$ giờ = $\\frac{3}{2}$ giờ.\n` +
`Vì ô tô thứ hai cần ít thời gian hơn ô tô thứ nhất là $1$ giờ $30$ phút, ta có phương trình:\n` +
`$\\frac{x}{50} - \\frac{x}{65} = \\frac{3}{2}$\n` +
`Quy đồng mẫu chung $650$:\n` +
`$\\Leftrightarrow \\frac{13x}{650} - \\frac{10x}{650} = \\frac{975}{650}$\n` +
`$\\Leftrightarrow 3x = 975 \\Rightarrow x = 325$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Quãng đường $AB$ dài $325$ km.`;

  const sol6 = `**1)** $3x - 11 = x + 7$\n` +
`$\\Leftrightarrow 3x - x = 7 + 11 \\Leftrightarrow 2x = 18 \\Rightarrow x = 9$.\n\n` +
`**2)** $2x(x - 3) = x - 3$\n` +
`$\\Leftrightarrow 2x(x - 3) - (x - 3) = 0$\n` +
`$\\Leftrightarrow (x - 3)(2x - 1) = 0 \\Rightarrow x = 3$ hoặc $2x - 1 = 0 \\Rightarrow x = 3$ hoặc $x = \\frac{1}{2}$.\n\n` +
`**3)** $\\frac{x + 2}{x - 2} - \\frac{5}{x} = \\frac{8}{x^2 - 2x}$\n` +
`Điều kiện xác định: $x \\ne 0; x \\ne 2$.\n` +
`Mẫu chung là $x(x - 2)$, quy đồng và khử mẫu:\n` +
`$\\Leftrightarrow x(x + 2) - 5(x - 2) = 8$\n` +
`$\\Leftrightarrow x^2 + 2x - 5x + 10 - 8 = 0$\n` +
`$\\Leftrightarrow x^2 - 3x + 2 = 0 \\Leftrightarrow x^2 - x - 2x + 2 = 0$\n` +
`$\\Leftrightarrow x(x - 1) - 2(x - 1) = 0 \\Leftrightarrow (x - 1)(x - 2) = 0$\n` +
`$\\Rightarrow x = 1$ (thỏa mãn ĐKXĐ) hoặc $x = 2$ (loại vì vi phạm ĐKXĐ).\n` +
`Vậy nghiệm là $x = 1$.\n\n` +
`**4)** $\\frac{2x + 1}{4} - \\frac{x - 5}{3} \\le \\frac{4x - 1}{12} + 2$\n` +
`Quy đồng với mẫu chung 12 và khử mẫu (vì 12 > 0 chiều BPT không đổi):\n` +
`$\\Leftrightarrow 3(2x + 1) - 4(x - 5) \\le (4x - 1) + 24$\n` +
`$\\Leftrightarrow 6x + 3 - 4x + 20 \\le 4x + 23$\n` +
`$\\Leftrightarrow 2x + 23 \\le 4x + 23$\n` +
`$\\Leftrightarrow 2x - 4x \\le 23 - 23 \\Leftrightarrow -2x \\le 0 \\Rightarrow x \\ge 0$.\n` +
`Vậy tập nghiệm của BPT là $S = \\{x \\mid x \\ge 0\\}$.`;

  const sol7 = `**1) $(x^3 - 1) = (x - 1)(x^2 - 1)$:** Phát biểu **SAI**.\n` +
`(Sửa đúng: $(x^3 - 1) = (x - 1)(x^2 + x + 1)$).\n\n` +
`**2) Hình thang cân có hai cạnh bên bằng nhau:** Phát biểu **ĐÚNG**.\n` +
`(Theo tính chất của hình thang cân).\n\n` +
`**3) $(a - b)^2 = (b - a)^2$:** Phát biểu **ĐÚNG**.\n` +
`(Vì bình phương của hai số đối nhau luôn bằng nhau).\n\n` +
`**4) Tứ giác có hai đường chéo bằng nhau và vuông góc với nhau là hình vuông:** Phát biểu **SAI**.\n` +
`(Thiếu điều kiện hai đường chéo phải **cắt nhau tại trung điểm của mỗi đường**. Ví dụ hình diều có hai đường chéo vuông góc nhưng không phải hình vuông).`;

  const sol8 = `Ta có bất phương trình:\n` +
`$\\frac{3x + 5}{4} - \\frac{x - 4}{6} \\le \\frac{3x + 7}{3}$\n` +
`Quy đồng mẫu hai vế với mẫu số chung là $12$:\n` +
`$\\Leftrightarrow \\frac{3(3x + 5)}{12} - \\frac{2(x - 4)}{12} \\le \\frac{4(3x + 7)}{12}$\n` +
`Khử mẫu số (do $12 > 0$ nên giữ nguyên chiều bất phương trình):\n` +
`$\\Leftrightarrow 3(3x + 5) - 2(x - 4) \\le 4(3x + 7)$\n` +
`$\\Leftrightarrow 9x + 15 - 2x + 8 \\le 12x + 28$\n` +
`$\\Leftrightarrow 7x + 23 \\le 12x + 28$\n` +
`$\\Leftrightarrow 7x - 12x \\le 28 - 23$\n` +
`$\\Leftrightarrow -5x \\le 5$\n` +
`Chia cả hai vế cho $-5$ (đổi chiều bất phương trình):\n` +
`$\\Leftrightarrow x \\ge -1$.\n` +
`**Kết luận:** Tập nghiệm của bất phương trình là $S = \\{x \\mid x \\ge -1\\}$. Biểu diễn trên trục số là miền giá trị từ $-1$ trở đi về bên phải, dùng ngoặc vuông tại $-1$.`;

  const sol9 = `Ta giải phương trình: $2x^3 + 3x^2 + 6x + 5 = 0$\n` +
`Sử dụng phương pháp nhẩm nghiệm, ta thấy $x = -1$ là nghiệm của phương trình vì: $2(-1)^3 + 3(-1)^2 + 6(-1) + 5 = -2 + 3 - 6 + 5 = 0$.\n` +
`Sử dụng lược đồ Horner hoặc tách hạng tử để phân tích thành nhân tử:\n` +
`$2x^3 + 2x^2 + x^2 + x + 5x + 5 = 0$\n` +
`$\\Leftrightarrow 2x^2(x + 1) + x(x + 1) + 5(x + 1) = 0$\n` +
`$\\Leftrightarrow (x + 1)(2x^2 + x + 5) = 0$\n` +
`Trường hợp 1: $x + 1 = 0 \\Rightarrow x = -1$.\n` +
`Trường hợp 2: $2x^2 + x + 5 = 0$\n` +
`Ta có: $2x^2 + x + 5 = 2\\left( x^2 + \\frac{1}{2}x \\right) + 5 = 2\\left( x^2 + 2 \\cdot x \\cdot \\frac{1}{4} + \\frac{1}{16} \\right) - \\frac{1}{8} + 5 = 2\\left( x + \\frac{1}{4} \\right)^2 + \\frac{39}{8}$.\n` +
`Vì $2\\left( x + \\frac{1}{4} \\right)^2 \\ge 0$ nên phương trình $2x^2 + x + 5 = 0$ vô nghiệm.\n` +
`**Kết luận:** Phương trình có nghiệm duy nhất $x = -1$.`;

  const sol10 = `Gọi số sản phẩm tổ sản xuất theo kế hoạch là $x$ (sản phẩm, $x > 0, x \\in \\mathbb{N}^*$).\n` +
`Thời gian hoàn thành lô hàng theo dự kiến là: $\\frac{x}{30}$ (giờ).\n` +
`Thời gian thực tế để hoàn thành lô hàng là: $\\frac{x}{27}$ (giờ).\n` +
`Đổi $1$ giờ $10$ phút = $1 + \\frac{10}{60}$ = $\\frac{7}{6}$ giờ.\n` +
`Vì tổ hoàn thành chậm hơn $1$ giờ $10$ phút so với dự kiến, ta có phương trình:\n` +
`$\\frac{x}{27} - \\frac{x}{30} = \\frac{7}{6}$\n` +
`Quy đồng mẫu số chung là $270$:\n` +
`$\\Leftrightarrow \\frac{10x}{270} - \\frac{9x}{270} = \\frac{7 \\cdot 45}{270}$\n` +
`$\\Leftrightarrow 10x - 9x = 315 \\Leftrightarrow x = 315$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Số sản phẩm mà tổ sản xuất theo kế hoạch là $315$ sản phẩm.`;

  const updates = [
    { id: "8b71737a-c5eb-4257-89db-4497dd7da67e", solution: sol1 },
    { id: "8bb7e071-9643-4885-911b-3a2b01d34cd7", solution: sol2 },
    { id: "8c74be0e-ae08-4ed9-ad26-dcf0e19d67bd", solution: sol3 },
    { id: "8d18b86f-91ba-428f-bc4b-c3eadbb93125", solution: sol4 },
    { id: "8d8933a6-0b7c-4eee-8548-ad7198a363c6", solution: sol5 },
    { id: "8d9c19e0-4f9f-49df-b7a7-dff7f21ee4b0", solution: sol6 },
    { id: "8f7b326d-d6ca-448a-8a55-8ececa84144b", solution: sol7 },
    { id: "8f9542d8-803f-4d8e-8681-4cac1bbc7d72", solution: sol8 },
    { id: "8fa19912-2ece-4071-9678-01415edff420", solution: sol9 },
    { id: "9055d7da-a3ed-4345-bf16-5bd0c5983479", solution: sol10 }
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

manualFixBatch14Grade8().catch(console.error).finally(() => process.exit(0));
