import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch63() {
  const sql = getDb();

  const sol1 = `Số gạo kho đã xuất đi để cứu trợ là:\n` +
`$120 \\cdot \\frac{1}{4} = 30$ (tấn).\n` +
`Số gạo còn lại sau khi xuất đi cứu trợ và bán đi $25$ tấn là:\n` +
`$120 - 30 - 25 = 65$ (tấn).\n` +
`Số gạo còn lại trong kho sau khi nhập thêm $15$ tấn là:\n` +
`$65 + 15 = 80$ (tấn).\n` +
`Vậy trong kho còn lại $80$ tấn gạo.`;

  const sol2 = `Theo quy ước ký hiệu các tập hợp số trong Toán học:\n` +
`- $\\mathbb{N}$: Tập hợp các số tự nhiên.\n` +
`- $\\mathbb{N}^*$: Tập hợp các số tự nhiên khác 0.\n` +
`- $\\mathbb{Q}$: Tập hợp các số hữu tỉ.\n` +
`- $\\mathbb{R}$: Tập hợp các số thực.\n` +
`Vậy kí hiệu của tập hợp các số hữu tỉ là $\\mathbb{Q}$.\n` +
`$\\Rightarrow$ **Đáp án C**.`;

  const sol3 = `Do không có hình vẽ biểu đồ chưa hoàn thiện, học sinh cần tự vẽ biểu đồ hình quạt tròn (hoặc cột) dựa trên tỉ lệ phần trăm đã cho. Dưới đây là hướng dẫn vẽ biểu đồ hình quạt tròn:\n` +
`**Bước 1: Tính góc ở tâm của các hình quạt:**\n` +
`Cả hình tròn là $360^\\circ$ tương ứng với $100\\%$.\n` +
`- Góc của Ô tô: $360^\\circ \\cdot 10\\% = 36^\\circ$.\n` +
`- Góc của Xe buýt: $360^\\circ \\cdot 20\\% = 72^\\circ$.\n` +
`- Góc của Xe đạp: $360^\\circ \\cdot 50\\% = 180^\\circ$ (chiếm đúng nửa hình tròn).\n` +
`- Góc của Đi bộ: $360^\\circ \\cdot 20\\% = 72^\\circ$.\n\n` +
`**Bước 2: Vẽ biểu đồ:**\n` +
`- Vẽ một đường tròn, kẻ một đường kính để chia lấy một nửa ($180^\\circ$) làm phần của "Xe đạp" ($50\\%$).\n` +
`- Nửa còn lại chia làm 3 phần: dùng thước đo độ kẻ các góc $36^\\circ, 72^\\circ, 72^\\circ$ tương ứng cho Ô tô ($10\\%$), Xe buýt ($20\\%$) và Đi bộ ($20\\%$).\n` +
`- Ghi chú tên phương tiện và tỉ lệ phần trăm vào từng phần hình quạt.`;

  const sol4 = `**a) Tìm $x, y$ biết $\\frac{x}{3} = \\frac{y}{5}$ và $x + y = 16$:**\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau, ta có:\n` +
`$\\frac{x}{3} = \\frac{y}{5} = \\frac{x + y}{3 + 5} = \\frac{16}{8} = 2$.\n` +
`Suy ra:\n` +
`- $\\frac{x}{3} = 2 \\Rightarrow x = 2 \\cdot 3 = 6$.\n` +
`- $\\frac{y}{5} = 2 \\Rightarrow y = 2 \\cdot 5 = 10$.\n` +
`Vậy $x = 6$, $y = 10$.\n\n` +
`**b) Tìm $x, y$ biết $\\frac{x}{y} = 5$ và $x + y = 18$:**\n` +
`Ta có $\\frac{x}{y} = 5 \\Rightarrow x = 5y$.\n` +
`Thay $x = 5y$ vào phương trình thứ hai $x + y = 18$, ta được:\n` +
`$5y + y = 18$\n` +
`$6y = 18 \\Rightarrow y = 18 : 6 = 3$.\n` +
`Khi đó $x = 5y = 5 \\cdot 3 = 15$.\n` +
`Vậy $x = 15$, $y = 3$.`;

  const sol5 = `**a) Tính với $x + y + z = 30$:**\n` +
`Áp dụng tính chất dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{5} = \\frac{x + y + z}{2 + 3 + 5} = \\frac{30}{10} = 3$.\n` +
`Suy ra:\n` +
`- $x = 3 \\cdot 2 = 6$.\n` +
`- $y = 3 \\cdot 3 = 9$.\n` +
`- $z = 3 \\cdot 5 = 15$.\n` +
`Vậy $x = 6$, $y = 9$, $z = 15$.\n\n` +
`**b) Tính với $x - 2y + 3z = 38$:**\n` +
`Từ giả thiết ta có:\n` +
`$\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{5} \\Rightarrow \\frac{x}{2} = \\frac{2y}{6} = \\frac{3z}{15}$.\n` +
`Áp dụng tính chất dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{2} = \\frac{2y}{6} = \\frac{3z}{15} = \\frac{x - 2y + 3z}{2 - 6 + 15} = \\frac{38}{11}$.\n` +
`Suy ra:\n` +
`- $x = \\frac{38}{11} \\cdot 2 = \\frac{76}{11}$.\n` +
`- $y = \\frac{38}{11} \\cdot 3 = \\frac{114}{11}$.\n` +
`- $z = \\frac{38}{11} \\cdot 5 = \\frac{190}{11}$.\n` +
`Vậy $x = \\frac{76}{11}$, $y = \\frac{114}{11}$, $z = \\frac{190}{11}$.`;

  const sol6 = `**a) Tìm công thức liên hệ:**\n` +
`Vì $x$ và $y$ là hai đại lượng tỉ lệ thuận nên $y = kx$ ($k \\neq 0$).\n` +
`Gọi hai giá trị của $x$ là $x_1, x_2$ và hai giá trị tương ứng của $y$ là $y_1, y_2$.\n` +
`Theo đề bài, hiệu của hai giá trị $x$ là $x_1 - x_2 = 6$ và hiệu tương ứng của $y$ là $y_1 - y_2 = -3$.\n` +
`Theo tính chất của đại lượng tỉ lệ thuận: $\\frac{y_1}{x_1} = \\frac{y_2}{x_2} = k$.\n` +
`Áp dụng tính chất dãy tỉ số bằng nhau:\n` +
`$k = \\frac{y_1 - y_2}{x_1 - x_2} = \\frac{-3}{6} = -\\frac{1}{2}$.\n` +
`Vậy công thức liên hệ là: $y = -\\frac{1}{2}x$.\n\n` +
`**b) Điền bảng:**\n` +
`Dựa vào công thức $y = -\\frac{1}{2}x$, ta tính được các giá trị còn thiếu (từ trên xuống, trái sang phải):\n` +
`- Với $x = -2 \\Rightarrow y = -\\frac{1}{2} \\cdot (-2) = 1$.\n` +
`- Với $x = -\\frac{1}{2} \\Rightarrow y = -\\frac{1}{2} \\cdot \\left( -\\frac{1}{2} \\right) = \\frac{1}{4}$.\n` +
`- Với $x = 0 \\Rightarrow y = -\\frac{1}{2} \\cdot 0 = 0$.\n` +
`- Với $y = -1 \\Rightarrow x = y : \\left( -\\frac{1}{2} \\right) = -1 \\cdot (-2) = 2$.\n` +
`- Với $y = 8 \\Rightarrow x = 8 \\cdot (-2) = -16$.\n` +
`- Với $y = -6 \\Rightarrow x = -6 \\cdot (-2) = 12$.\n` +
`*(Học sinh tự điền các giá trị $1, \\frac{1}{4}, 0, 2, -16, 12$ vào các ô trống tương ứng trong bảng).*`;

  const sol7 = `Do ô tô đi với vận tốc không đổi, nên thời gian đi và quãng đường đi được là hai đại lượng tỉ lệ thuận.\n` +
`Gọi $t$ (giờ) là thời gian để ô tô đi hết toàn bộ quãng đường $AB$ (tương ứng với $1$ quãng đường).\n` +
`Theo bài ra, trong $1$ giờ ô tô đi được $\\frac{1}{4}$ quãng đường.\n` +
`Ta có tỉ lệ:\n` +
`$\\frac{1}{\\frac{1}{4}} = \\frac{t}{1}$\n` +
`$\\Rightarrow t = 1 : \\frac{1}{4} = 1 \\cdot 4 = 4$ (giờ).\n` +
`Vậy ô tô phải mất $4$ giờ để đi hết quãng đường $AB$.`;

  const sol8 = `**a)** $(-0,25) \\cdot \\frac{4}{17} \\cdot \\left( -3\\frac{5}{21} \\right) \\cdot \\left( \\frac{-7}{23} \\right)$\n` +
`$= \\left( -\\frac{1}{4} \\right) \\cdot \\frac{4}{17} \\cdot \\left( -\\frac{68}{21} \\right) \\cdot \\left( -\\frac{7}{23} \\right)$\n` +
`Tích có 3 số âm nên kết quả là số âm:\n` +
`$= - \\left( \\frac{1 \\cdot 4 \\cdot 68 \\cdot 7}{4 \\cdot 17 \\cdot 21 \\cdot 23} \\right) = - \\left( \\frac{4}{4} \\cdot \\frac{68}{17} \\cdot \\frac{7}{21} \\cdot \\frac{1}{23} \\right) = - \\left( 1 \\cdot 4 \\cdot \\frac{1}{3} \\cdot \\frac{1}{23} \\right) = -\\frac{4}{69}$.\n\n` +
`**b)** $\\frac{2}{3} - 4 \\cdot \\left( \\frac{1}{2} + \\frac{3}{4} \\right)$\n` +
`$= \\frac{2}{3} - 4 \\cdot \\left( \\frac{2}{4} + \\frac{3}{4} \\right) = \\frac{2}{3} - 4 \\cdot \\frac{5}{4} = \\frac{2}{3} - 5 = \\frac{2}{3} - \\frac{15}{3} = -\\frac{13}{3}$.\n\n` +
`**c)** $21 - 3\\frac{3}{4} : \\left( \\frac{3}{8} - \\frac{1}{6} \\right)$\n` +
`$= 21 - \\frac{15}{4} : \\left( \\frac{9}{24} - \\frac{4}{24} \\right) = 21 - \\frac{15}{4} : \\frac{5}{24}$\n` +
`$= 21 - \\frac{15}{4} \\cdot \\frac{24}{5} = 21 - (3 \\cdot 6) = 21 - 18 = 3$.\n\n` +
`**d)** $\\left( -\\frac{1}{3} + \\frac{5}{6} \\right) \\cdot 11 - 7$\n` +
`$= \\left( -\\frac{2}{6} + \\frac{5}{6} \\right) \\cdot 11 - 7 = \\frac{3}{6} \\cdot 11 - 7 = \\frac{1}{2} \\cdot 11 - 7$\n` +
`$= \\frac{11}{2} - \\frac{14}{2} = -\\frac{3}{2}$.`;

  const sol9 = `Bài toán thực chất là các bước giải chi tiết cho các phép tính số hữu tỉ. Ta trình bày lại cho rõ ràng:\n` +
`**a)** $\\left( \\frac{4}{9} + \\frac{5}{9} \\right) + \\left( \\frac{-5}{11} + \\frac{-6}{11} \\right) = \\frac{9}{9} + \\frac{-11}{11} = 1 + (-1) = 0$.\n\n` +
`**b)** $\\frac{-5}{7} \\cdot \\left( \\frac{2}{11} + \\frac{9}{11} \\right) + \\frac{12}{7} = \\frac{-5}{7} \\cdot 1 + \\frac{12}{7} = \\frac{7}{7} = 1$.\n\n` +
`**c)** $\\left( 15\\frac{1}{4} - 25\\frac{1}{4} \\right) : \\left( -\\frac{5}{7} \\right) = (-10) \\cdot \\left( -\\frac{7}{5} \\right) = \\frac{70}{5} = 14$.\n\n` +
`**d)** $\\frac{1}{4} \\cdot \\frac{8}{5} - \\frac{1}{4} \\cdot \\frac{8}{5} + \\frac{1}{2} = 0 + \\frac{1}{2} = \\frac{1}{2}$.\n` +
`*(Các phép tính trên minh họa việc áp dụng tính chất giao hoán, kết hợp và phân phối của phép nhân đối với phép cộng để tính nhanh).*`;

  const sol10 = `Đa thức ban đầu là: $x^4 - 2x^2 + x^3 - x^4 + 1$.\n` +
`**Bước 1: Thu gọn đa thức** bằng cách nhóm các hạng tử đồng dạng:\n` +
`$(x^4 - x^4) + x^3 - 2x^2 + 1 = 0 + x^3 - 2x^2 + 1 = x^3 - 2x^2 + 1$.\n` +
`**Bước 2: Sắp xếp theo lũy thừa giảm dần của biến:**\n` +
`Đa thức $x^3 - 2x^2 + 1$ đã được sắp xếp sẵn theo lũy thừa giảm dần (mũ 3, mũ 2, mũ 0).\n` +
`Đối chiếu với các đáp án, ta thấy:\n` +
`$\\Rightarrow$ **Đáp án C**.`;

  const updates = [
    { id: "95f483b1-483a-4102-9f15-bbfb7d3a2e7a", solution: sol1 },
    { id: "964e38a4-f4cb-4d2b-ab21-190e04c07f18", solution: sol2 },
    { id: "96704cd0-2498-4987-9c82-c0bd39241358", solution: sol3 },
    { id: "969b38b8-d5f9-4c60-8395-96d9abc51b55", solution: sol4 },
    { id: "96aba02a-9735-4b9d-a223-e037ff004801", solution: sol5 },
    { id: "96b9f20b-9945-4090-a4c6-9e2b7123f31b", solution: sol6 },
    { id: "96d9841f-c8e1-4dc6-817f-3a4dc71501f9", solution: sol7 },
    { id: "97abed25-04d9-478e-a790-c40e391a5e66", solution: sol8 },
    { id: "9899be31-fcd5-4678-9514-dd5471190f4f", solution: sol9 },
    { id: "98a55ecf-1744-4b2c-ad59-b24cd1abaa06", solution: sol10 }
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

manualFixBatch63().catch(console.error).finally(() => process.exit(0));
