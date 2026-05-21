import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch1Grade6() {
  const sql = getDb();

  const sol1 = `**Phương pháp giải:**\n` +
`Diện tích hình chữ nhật được tính bằng tích của chiều dài và chiều rộng (cùng đơn vị đo).\n` +
`Công thức: $S = a \\cdot b$.\n` +
`Thay số: $S = 12 \\cdot 7{,}5 = 90$ (cm$^2$).\n` +
`**Kết luận:** Số cần điền là $90$.`;

  const sol2 = `*(Đây là câu hỏi trắc nghiệm nhưng thiếu các phương án lựa chọn. Dưới đây là các tính chất của lục giác đều để giáo viên đối chiếu với đáp án cụ thể trong đề)*\n\n` +
`**Các tính chất của hình lục giác đều $ABCDEF$:**\n` +
`- Có $6$ cạnh bằng nhau: $AB = BC = CD = DE = EF = FA$.\n` +
`- Có $6$ góc bằng nhau, mỗi góc ở đỉnh bằng $120^\\circ$.\n` +
`- Có $3$ đường chéo chính bằng nhau ($AD = BE = CF$) và chúng cắt nhau tại một điểm (tâm của lục giác đều).\n` +
`- Tâm của lục giác đều cách đều $6$ đỉnh (là tâm đường tròn ngoại tiếp).\n` +
`Dựa vào các tính chất trên, học sinh chọn phương án mô tả chính xác nhất.`;

  const sol3 = `**Phương pháp giải:**\n` +
`Mặt đồng hồ được chia thành $12$ khoảng giờ đều nhau, tương ứng với một vòng tròn $360^\\circ$.\n` +
`Mỗi khoảng giờ (từ số này đến số liền kề) có số đo góc là: $360^\\circ : 12 = 30^\\circ$.\n` +
`Lúc $3$ giờ đúng:\n` +
`- Kim phút chỉ đúng số $12$.\n` +
`- Kim giờ chỉ đúng số $3$.\n` +
`Khoảng cách giữa hai kim là $3$ khoảng giờ (từ số $12$ đến số $3$).\n` +
`Góc tạo bởi hai kim là: $3 \\cdot 30^\\circ = 90^\\circ$.\n` +
`**Kết luận:** Lúc $3$ giờ đúng, góc tạo bởi kim giờ và kim phút là $90^\\circ$ (góc vuông).`;

  const sol4 = `**Phương pháp giải:**\n` +
`Thực hiện phép tính theo thứ tự:\n` +
`1. Lũy thừa.\n` +
`2. Nhân, chia.\n` +
`3. Cộng, trừ.\n\n` +
`Thực hiện tính:\n` +
`$2^3 \\cdot 5 - 4^2 + 10$\n` +
`$= 8 \\cdot 5 - 16 + 10$\n` +
`$= 40 - 16 + 10$\n` +
`$= 24 + 10$\n` +
`$= 34$.\n` +
`**Kết luận:** Kết quả của biểu thức là $34$.`;

  const sol5 = `**Phương pháp đổi đơn vị:**\n` +
`a) Từ kilômét (km) sang mét (m): Nhân với $1000$.\n` +
`$5{,}3 \\text{ km} = 5{,}3 \\cdot 1000 \\text{ m} = 5300 \\text{ m}$.\n\n` +
`b) Từ giờ sang phút: $1$ giờ = $60$ phút.\n` +
`$2$ giờ $15$ phút $= 2 \\cdot 60 \\text{ phút} + 15 \\text{ phút} = 120 + 15 = 135 \\text{ phút}$.\n\n` +
`c) Từ gam (g) sang kilôgam (kg): Chia cho $1000$.\n` +
`$4500 \\text{ g} = 4500 : 1000 \\text{ kg} = 4{,}5 \\text{ kg}$.\n\n` +
`**Kết quả điền vào chỗ trống:**\n` +
`a) $5300$\n` +
`b) $135$\n` +
`c) $4{,}5$`;

  const sol6 = `**Phương pháp giải:**\n` +
`Thực hiện phép tính theo thứ tự: Lũy thừa $\\rightarrow$ Nhân $\\rightarrow$ Cộng, trừ.\n` +
`$(-3)^2 + 2 \\cdot (-5) + 1$\n` +
`$= 9 + (-10) + 1$\n` +
`$= -1 + 1$\n` +
`$= 0$.\n` +
`**Kết luận:** Kết quả của phép tính là $0$.`;

  const sol7 = `*(Đây là câu hỏi trắc nghiệm nhưng thiếu các phương án lựa chọn. Dưới đây là phương pháp giải tổng quát)*\n\n` +
`**Phương pháp giải:**\n` +
`- Định nghĩa: Số nguyên tố là số tự nhiên lớn hơn $1$, chỉ có $2$ ước là $1$ và chính nó.\n` +
`- Các số nguyên tố nhỏ hơn 20 thường gặp: $2, 3, 5, 7, 11, 13, 17, 19, \\dots$\n` +
`Học sinh quan sát các phương án đưa ra, loại trừ các số là hợp số (chia hết cho các số khác ngoài 1 và chính nó, ví dụ các số chẵn lớn hơn 2, các số tận cùng là 0 hoặc 5 lớn hơn 5, v.v.). Số còn lại thỏa mãn định nghĩa sẽ là số nguyên tố.`;

  const sol8 = `*(Đây là câu hỏi trắc nghiệm nhưng thiếu các phương án lựa chọn. Dưới đây là phương pháp tìm phân số bằng nhau)*\n\n` +
`**Phương pháp giải:**\n` +
`Để tìm một phân số bằng phân số $\\frac{-3}{5}$, ta sử dụng tính chất cơ bản của phân số:\n` +
`- Nhân hoặc chia cả tử số và mẫu số với cùng một số nguyên (khác 0).\n` +
`$\\frac{-3}{5} = \\frac{-3 \\cdot k}{5 \\cdot k}$ (với $k \\in \\mathbb{Z}, k \\ne 0$).\n` +
`Các dạng phân số bằng $\\frac{-3}{5}$ thường gặp:\n` +
`- Đưa dấu âm xuống mẫu: $\\frac{3}{-5}$.\n` +
`- Nhân cả tử và mẫu với 2: $\\frac{-6}{10}$.\n` +
`- Nhân cả tử và mẫu với 3: $\\frac{-9}{15}$.\n` +
`- Đổi dấu âm ra trước phân số: $-\\frac{3}{5}$.\n` +
`Giáo viên đối chiếu với các đáp án của đề bài để chọn phương án khớp nhất.`;

  const updates = [
    { id: "0497f9bb-d1e9-4b76-899f-3938ee40f132", solution: sol1 },
    { id: "05808a04-e311-49b6-a388-2deb47c30a18", solution: sol2 },
    { id: "0b2bd546-a135-47c0-b09d-38d3e8661fca", solution: sol3 },
    { id: "18bd7c79-4625-45ed-a3f3-6c3bd06ff470", solution: sol4 },
    { id: "69d6518e-abf2-4f73-b917-be9df5dc5a8a", solution: sol5 },
    { id: "7a63d640-5572-4b09-bee1-414760ec26ae", solution: sol6 },
    { id: "8ff164f9-482b-4f00-aba5-8ed76f048792", solution: sol7 },
    { id: "c697cb21-e93b-4de3-ba7d-b8b13330f001", solution: sol8 }
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

manualFixBatch1Grade6().catch(console.error).finally(() => process.exit(0));
