import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch82() {
  const sql = getDb();

  const sol1 = `Vì $\\Delta SQP = \\Delta HKG$ nên các cạnh và các góc tương ứng bằng nhau.\n\n` +
`**Các cặp cạnh bằng nhau:**\n` +
`- $SQ = HK$\n` +
`- $QP = KG$\n` +
`- $SP = HG$\n\n` +
`**Các cặp góc bằng nhau:**\n` +
`- $\\widehat{S} = \\widehat{H}$\n` +
`- $\\widehat{Q} = \\widehat{K}$\n` +
`- $\\widehat{P} = \\widehat{G}$`;

  const sol2 = `Nửa chu vi của hình chữ nhật bằng tổng của chiều dài và chiều rộng.\n` +
`Do đó, chiều dài hình chữ nhật là:\n` +
`$\\frac{15}{2} - \\frac{7}{2} = \\frac{15 - 7}{2} = \\frac{8}{2} = 4$ (m).\n` +
`**Đáp án đúng là D.**`;

  const sol3 = `Tập hợp các số thực bao gồm cả số hữu tỉ và số vô tỉ, được kí hiệu là $\\mathbb{R}$.\n` +
`**Đáp án đúng là D.**`;

  const sol4 = `**a)** $\\frac{1}{3} + \\frac{1}{2}:x = \\frac{1}{5}$\n` +
`$\\Rightarrow \\frac{1}{2}:x = \\frac{1}{5} - \\frac{1}{3}$\n` +
`Quy đồng mẫu số (mẫu chung là $15$):\n` +
`$\\Rightarrow \\frac{1}{2}:x = \\frac{3}{15} - \\frac{5}{15} = \\frac{-2}{15}$\n` +
`$\\Rightarrow x = \\frac{1}{2} : \\left(\\frac{-2}{15}\\right) = \\frac{1}{2} \\cdot \\frac{-15}{2} = \\frac{-15}{4}$.\n\n` +
`**b)** $x^2 - \\frac{16}{25} = 0$\n` +
`$\\Rightarrow x^2 = \\frac{16}{25}$\n` +
`$\\Rightarrow x^2 = \\left(\\frac{4}{5}\\right)^2 = \\left(-\\frac{4}{5}\\right)^2$\n` +
`$\\Rightarrow x = \\frac{4}{5}$ hoặc $x = -\\frac{4}{5}$.\n` +
`Vậy $x \\in \\left\\{ \\frac{4}{5}; -\\frac{4}{5} \\right\\}$.`;

  const sol5 = `**1. Có bao nhiêu loại trái cây được điều tra? Kể tên.**\n` +
`Quan sát bảng dữ liệu, có $4$ loại trái cây được điều tra.\n` +
`Tên các loại trái cây đó là: **Mít, Xoài, Cam, Chuối tiêu**.\n\n` +
`**2. Phân loại dữ liệu:**\n` +
`- **Dữ liệu định tính** (dữ liệu không phải là số): Loại trái cây, Màu sắc khi chín.\n` +
`- **Dữ liệu định lượng** (dữ liệu là số): Khối lượng trung bình, Hàm lượng vitamin C trung bình.\n\n` +
`**3. Xét tính hợp lí của cột khối lượng trung bình:**\n` +
`Dữ liệu khối lượng trung bình của quả **Cam là $1\\ 000$ g** ($1$ kg) là **không hợp lí**, vì thực tế một quả cam bình thường chỉ nặng khoảng $100$ g đến $300$ g, rất hiếm quả cam nào nặng tới $1$ kg. Các dữ liệu còn lại tương đối hợp lí so với thực tế.`;

  const sol6 = `*(Do đề bài không đính kèm hình ảnh biểu đồ, học sinh tự trả lời dựa trên các phương pháp đọc biểu đồ tròn sau đây)*\n\n` +
`**Phương pháp giải:**\n` +
`**a) Biểu đồ biểu diễn các thông tin về vấn đề gì?**\n` +
`Nhìn vào tiêu đề (tên) của biểu đồ hoặc câu dẫn ở phần ghi chú để biết vấn đề được khảo sát/biểu diễn.\n\n` +
`**b) Có bao nhiêu đối tượng được biểu diễn?**\n` +
`Đếm số lượng các hình quạt tròn (mỗi màu sắc/phần chia) hoặc đếm số mục trong bảng chú giải.\n\n` +
`**c) Tỉ lệ phần trăm của mỗi đối tượng so với toàn thể là bao nhiêu?**\n` +
`Đọc các con số (có kí hiệu $\\%$) được ghi trực tiếp trên từng hình quạt tương ứng với mỗi đối tượng. Tổng của tất cả các tỉ lệ này luôn bằng $100\\%$.`;

  const updates = [
    { id: "fce930ae-517a-4cc5-9067-1d4560667530", solution: sol1 },
    { id: "fd06965c-5ef7-42dc-95b5-b5872f706425", solution: sol2 },
    { id: "fe2db4f6-fad4-478b-83d1-df2063c7f6a9", solution: sol3 },
    { id: "fe7ae288-1fb4-45d1-8782-6212e57fb9b5", solution: sol4 },
    { id: "fea055db-de07-4305-ab84-2c4cec193760", solution: sol5 },
    { id: "ff3b8306-b684-47c8-b051-9e7aad1b5a3c", solution: sol6 }
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

manualFixBatch82().catch(console.error).finally(() => process.exit(0));
