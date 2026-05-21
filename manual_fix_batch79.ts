import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch79() {
  const sql = getDb();

  const sol1 = `Gọi số đo ba góc $\\widehat{A}, \\widehat{B}, \\widehat{C}$ của tam giác $ABC$ lần lượt là $x, y, z$ (độ) ($x, y, z > 0$).\n` +
`Theo định lý tổng ba góc trong một tam giác, ta có: $x + y + z = 180^\\circ$.\n` +
`Theo đề bài, ba góc tỉ lệ với $5; 6; 7$ nên ta có dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{5} = \\frac{y}{6} = \\frac{z}{7}$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau:\n` +
`$\\frac{x}{5} = \\frac{y}{6} = \\frac{z}{7} = \\frac{x + y + z}{5 + 6 + 7} = \\frac{180}{18} = 10$.\n` +
`Từ đó suy ra:\n` +
`- $x = 10 \\cdot 5 = 50^\\circ$.\n` +
`- $y = 10 \\cdot 6 = 60^\\circ$.\n` +
`- $z = 10 \\cdot 7 = 70^\\circ$.\n` +
`**Kết luận:** Số đo ba góc $A, B, C$ của tam giác lần lượt là $50^\\circ, 60^\\circ, 70^\\circ$.`;

  const sol2 = `Để kiểm tra ý kiến “Đa số các bạn học sinh trong lớp viết chữ đẹp”, Lan cần tiến hành thu thập dữ liệu bằng phương pháp sau:\n\n` +
`**Phương pháp thu thập trực tiếp:**\n` +
`1. Lan mượn vở bài tập (hoặc bài kiểm tra) của toàn bộ học sinh trong lớp.\n` +
`2. Quan sát và phân loại chữ viết của từng bạn theo các tiêu chí đã định sẵn (ví dụ: Đẹp, Khá, Bình thường, Xấu).\n` +
`3. Ghi chép (kiểm đếm) số lượng các bạn thuộc mỗi loại vào một bảng thống kê.\n` +
`4. Tính tỉ lệ phần trăm các bạn được đánh giá là chữ \"Đẹp\". Nếu tỉ lệ này chiếm đa số (trên $50\\%$), ý kiến của Lan là đúng.`;

  const sol3 = `*(Do đề bài không có hình vẽ kèm theo nên học sinh cần dựa vào các đặc điểm nhận biết sau để phân loại)*\n\n` +
`**1. Nhận biết tam giác cân:**\n` +
`- Hình nào có kí hiệu $2$ cạnh bằng nhau hoặc $2$ góc ở đáy bằng nhau thì đó là tam giác cân.\n` +
`- **Giải thích:** Theo định nghĩa, tam giác có hai cạnh bằng nhau là tam giác cân.\n\n` +
`**2. Nhận biết tam giác đều:**\n` +
`- Hình nào có kí hiệu $3$ cạnh bằng nhau hoặc $3$ góc bằng nhau (bằng $60^\\circ$) thì đó là tam giác đều.\n` +
`- **Giải thích:** Theo định nghĩa, tam giác có ba cạnh bằng nhau (hoặc ba góc bằng nhau) là tam giác đều.`;

  const sol4 = `**a)** $\\sqrt{x} - 3 = 0$\n` +
`$\\Rightarrow \\sqrt{x} = 3$\n` +
`Bình phương hai vế (vì $x \\ge 0$):\n` +
`$\\Rightarrow x = 3^2 \\Rightarrow x = 9$ (thỏa mãn).\n` +
`Vậy $x = 9$.\n\n` +
`**b)** $\\sqrt{x} - 4 = 0$\n` +
`$\\Rightarrow \\sqrt{x} = 4$\n` +
`Bình phương hai vế:\n` +
`$\\Rightarrow x = 4^2 \\Rightarrow x = 16$ (thỏa mãn).\n` +
`Vậy $x = 16$.`;

  const sol5 = `Điền các chữ số thích hợp vào ô trống để thoả mãn bất đẳng thức:\n\n` +
`**a)** $-4,023 < -4,\\dots 13$\n` +
`Vì là số âm nên trị tuyệt đối phải thỏa mãn: $4,023 > 4,\\dots 13$. Suy ra ô trống chỉ có thể là chữ số $0$.\n` +
`Điền số: **$0$** (Ta được: $-4,023 < -4,013$).\n\n` +
`**b)** $-5,6 \\dots 8 > -5,613$\n` +
`Trị tuyệt đối phải thỏa mãn: $5,6 \\dots 8 < 5,613$. Suy ra chữ số cần điền phải nhỏ hơn $1$, đó là chữ số $0$.\n` +
`Điền số: **$0$** (Ta được: $-5,608 > -5,613$).\n\n` +
`**c)** $6,71467 > 6,7 \\dots 982$\n` +
`Đây là số dương. Ở hàng phần trăm bên trái là $1$, bên phải là ô trống. Nếu điền $1$ thì $6,71467 < 6,71982$ (không thỏa mãn). Do đó chữ số cần điền phải là $0$.\n` +
`Điền số: **$0$** (Ta được: $6,71467 > 6,70982$).\n\n` +
`**d)** $-\\sqrt{3} > -1,73 \\dots 05$\n` +
`Ta có $-\\sqrt{3} \\approx -1,7320508...$ \n` +
`Yêu cầu: $-1,73205... > -1,73 \\dots 05 \\Rightarrow 1,73205... < 1,73 \\dots 05$.\n` +
`Chữ số cần điền phải lớn hơn hoặc bằng $2$. Ta có thể điền $3$ (hoặc $4, 5, \\dots, 9$).\n` +
`Điền số: **$3$** (Ta được: $-\\sqrt{3} > -1,73305$).`;

  const sol6 = `Ta rút gọn từng phân số ở các phương án:\n` +
`A. $\\frac{-4}{10} = \\frac{-4 : 2}{10 : 2} = \\frac{-2}{5}$ (Bằng)\n` +
`B. $\\frac{2}{-5} = \\frac{-2}{5}$ (Bằng)\n` +
`C. $\\frac{6}{15} = \\frac{6 : 3}{15 : 3} = \\frac{2}{5} \\ne \\frac{-2}{5}$ (Không bằng)\n` +
`D. $\\frac{-8}{20} = \\frac{-8 : 4}{20 : 4} = \\frac{-2}{5}$ (Bằng)\n` +
`**Đáp án đúng là C.**`;

  const sol7 = `Vì $AB \\perp Ox$ nên $\\Delta OAB$ là tam giác vuông tại $B$.\n` +
`Vì $AC \\perp Oy$ nên $\\Delta OAC$ là tam giác vuông tại $C$.\n` +
`Xét hai tam giác vuông $\\Delta OAB$ và $\\Delta OAC$, ta có:\n` +
`- Cạnh huyền $OA$ chung.\n` +
`- $\\widehat{AOB} = \\widehat{AOC}$ (do $Oz$ là tia phân giác của góc $\\widehat{xOy}$).\n` +
`$\\Rightarrow \\Delta OAB = \\Delta OAC$ (cạnh huyền - góc nhọn) (đpcm).`;

  const sol8 = `*(Học sinh sử dụng giấy ô li để vẽ biểu đồ)*\n\n` +
`**1. Hướng dẫn vẽ biểu đồ đoạn thẳng:**\n` +
`- Kẻ hai trục vuông góc: Trục hoành (nằm ngang) biểu diễn Số thứ tự lần làm bài ($1, 2, 3, 4, 5, 6$). Trục tung (thẳng đứng) biểu diễn Kết quả phần trăm ($0, 20, 40, 60, 80, 100$).\n` +
`- Chấm các điểm có tọa độ tương ứng với bảng số liệu: $(1; 20)$, $(2; 60)$, $(3; 80)$, $(4; 90)$, $(5; 95)$, $(6; 97)$.\n` +
`- Dùng thước thẳng nối liên tiếp các điểm đó lại với nhau.\n\n` +
`**2. Nhận xét sự tiến bộ của Minh:**\n` +
`- Đồ thị có xu hướng đi lên liên tục qua cả $6$ lần làm bài, không có lần nào bị tụt điểm.\n` +
`- Tỉ lệ số câu đúng tăng mạnh ở các lần đầu (từ $20\\%$ lên $60\\%$ ở lần $2$) và sau đó tiệm cận mức tối đa ($97\\%$ ở lần $6$).\n` +
`- **Kết luận:** Điều này cho thấy Minh có sự tiến bộ rất rõ rệt, ổn định và đang nắm vững kiến thức tiếng Anh qua từng lần luyện tập.`;

  const sol9 = `Đây là các phát biểu về tính chất của các tập hợp số, tất cả đều là các khẳng định đúng:\n\n` +
`**a)** $-5 \\in \\mathbb{Q}$: Số nguyên âm $-5$ cũng là số hữu tỉ.\n\n` +
`**b)** $\\frac{-3}{4} \\notin \\mathbb{Z}$: Phân số $\\frac{-3}{4}$ không phải là số nguyên.\n\n` +
`**c)** $0 \\in \\mathbb{Q}$: Số $0$ là số hữu tỉ.\n\n` +
`**d)** $\\mathbb{Z} \\subset \\mathbb{Q}$: Tập hợp số nguyên là tập con của tập hợp số hữu tỉ.\n\n` +
`**e)** $\\mathbb{N} \\subset \\mathbb{Z}$: Tập hợp số tự nhiên là tập con của tập hợp số nguyên.\n\n` +
`**f)** $3,2 \\in \\mathbb{Q}$: Số thập phân $3,2 = \\frac{32}{10}$ là số hữu tỉ.`;

  const sol10 = `**a) Chứng minh $\\Delta AMB = \\Delta EMC$:**\n` +
`Xét $\\Delta AMB$ và $\\Delta EMC$, ta có:\n` +
`- $MB = MC$ (vì $M$ là trung điểm của $BC$).\n` +
`- $\\widehat{AMB} = \\widehat{EMC}$ (hai góc đối đỉnh).\n` +
`- $MA = ME$ (giả thiết).\n` +
`$\\Rightarrow \\Delta AMB = \\Delta EMC$ (c.g.c).\n\n` +
`**b) Chứng minh $\\widehat{MAB} = \\widehat{MEC}$:**\n` +
`Từ chứng minh $\\Delta AMB = \\Delta EMC$ ở câu a, ta suy ra các góc tương ứng bằng nhau.\n` +
`Do đó, $\\widehat{MAB} = \\widehat{MEC}$ (đpcm).\n\n` +
`**c) Chứng minh $AB \\parallel CE$:**\n` +
`Từ câu b, ta có $\\widehat{MAB} = \\widehat{MEC}$.\n` +
`Mặt khác, hai góc này nằm ở vị trí so le trong so với đường thẳng $AE$ cắt hai đường thẳng $AB$ và $CE$.\n` +
`Suy ra $AB \\parallel CE$ (đpcm).`;

  const updates = [
    { id: "ed4c5a92-889d-4136-9145-d3019483de84", solution: sol1 },
    { id: "ed8ed631-e434-4d60-8dd9-19e538dfdc79", solution: sol2 },
    { id: "edcfb092-b6bd-4248-b938-7cdb6d08ff33", solution: sol3 },
    { id: "ee8599ef-fd78-43f4-b805-d517646aae32", solution: sol4 },
    { id: "f073acb7-87fe-4997-8554-f8f91c04328a", solution: sol5 },
    { id: "f08a262c-abbd-456c-88df-bea1cbdb50a4", solution: sol6 },
    { id: "f117c33d-fb83-440e-96fa-c97083a952d4", solution: sol7 },
    { id: "f2113cc3-dd85-4d04-9334-9d842561ec51", solution: sol8 },
    { id: "f215b83f-bfb1-4e7a-983b-a82decc3dea0", solution: sol9 },
    { id: "f23649c2-d505-4466-b7ec-86c95e3d69e5", solution: sol10 }
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

manualFixBatch79().catch(console.error).finally(() => process.exit(0));
