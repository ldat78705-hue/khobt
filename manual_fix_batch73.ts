import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch73() {
  const sql = getDb();

  const sol1 = `Ta quy đồng mẫu số chung là $60$:\n` +
`$\\frac{-3}{20} = \\frac{-9}{60}$\n` +
`$\\frac{-2}{15} = \\frac{-8}{60}$\n` +
`Cộng hai phân số lại với nhau:\n` +
`$\\frac{-9}{60} + \\frac{-8}{60} = \\frac{-9 + (-8)}{60} = \\frac{-17}{60}$.\n` +
`**Đáp án đúng là B.**`;

  const sol2 = `Từ một đẳng thức dạng $a \\cdot d = b \\cdot c$, ta có thể lập được $4$ tỉ lệ thức bằng cách đổi chỗ các ngoại tỉ, trung tỉ cho nhau.\n\n` +
`**a) $6 \\cdot 63 = 9 \\cdot 42$:**\n` +
`Các tỉ lệ thức lập được là:\n` +
`1) $\\frac{6}{9} = \\frac{42}{63}$\n` +
`2) $\\frac{6}{42} = \\frac{9}{63}$\n` +
`3) $\\frac{63}{9} = \\frac{42}{6}$\n` +
`4) $\\frac{63}{42} = \\frac{9}{6}$\n\n` +
`**b) $0,24 \\cdot 1,61 = 0,84 \\cdot 0,46$:**\n` +
`Các tỉ lệ thức lập được là:\n` +
`1) $\\frac{0,24}{0,84} = \\frac{0,46}{1,61}$\n` +
`2) $\\frac{0,24}{0,46} = \\frac{0,84}{1,61}$\n` +
`3) $\\frac{1,61}{0,84} = \\frac{0,46}{0,24}$\n` +
`4) $\\frac{1,61}{0,46} = \\frac{0,84}{0,24}$`;

  const sol3 = `Tích của hai đơn thức là:\n` +
`$(-2y^3) \\cdot \\left(\\frac{-2}{5}y^2\\right) = \\left( -2 \\cdot \\frac{-2}{5} \\right) \\cdot (y^3 \\cdot y^2) = \\frac{4}{5}y^5$.\n` +
`Bậc của đơn thức $\\frac{4}{5}y^5$ là $5$.\n` +
`**Đáp án đúng là B.**`;

  const sol4 = `**a) Phân loại các phân số:**\n` +
`Đầu tiên ta rút gọn các phân số (nếu chưa tối giản):\n` +
`$\\frac{3}{8}; \\frac{7}{20}; \\frac{5}{11}; \\frac{13}{22}; \\frac{1}{60}$; và $\\frac{91}{65} = \\frac{7}{5}$.\n` +
`Xét mẫu số của các phân số tối giản:\n` +
`- Các mẫu số: $8 = 2^3$; $20 = 2^2 \\cdot 5$; $5 = 5$. Mẫu số chỉ chứa ước nguyên tố $2$ và $5$ nên các phân số $\\frac{3}{8}; \\frac{7}{20}; \\frac{91}{65}$ viết được dưới dạng **số thập phân hữu hạn**.\n` +
`- Các mẫu số: $11 = 11$; $22 = 2 \\cdot 11$; $60 = 2^2 \\cdot 3 \\cdot 5$. Mẫu số chứa ước nguyên tố khác $2$ và $5$ (như $3, 11$) nên các phân số $\\frac{5}{11}; \\frac{13}{22}; \\frac{1}{60}$ viết được dưới dạng **số thập phân vô hạn tuần hoàn**.\n\n` +
`**b) Viết dưới dạng số thập phân:**\n` +
`- Số thập phân hữu hạn:\n` +
`  $\\frac{3}{8} = 0,375$\n` +
`  $\\frac{7}{20} = 0,35$\n` +
`  $\\frac{91}{65} = \\frac{7}{5} = 1,4$\n` +
`- Số thập phân vô hạn tuần hoàn:\n` +
`  $\\frac{5}{11} = 0,4545... = 0,(45)$\n` +
`  $\\frac{13}{22} = 0,59090... = 0,5(90)$\n` +
`  $\\frac{1}{60} = 0,01666... = 0,01(6)$`;

  const sol5 = `Ta có: $\\frac{x}{3} = \\frac{y}{4}$ và $\\frac{y}{5} = \\frac{z}{6}$.\n` +
`Để nối hai dãy tỉ số này, ta quy đồng mẫu số của $y$. BCNN(4, 5) = 20.\n` +
`$\\frac{x}{3} = \\frac{y}{4} \\Rightarrow \\frac{x}{15} = \\frac{y}{20}$\n` +
`$\\frac{y}{5} = \\frac{z}{6} \\Rightarrow \\frac{y}{20} = \\frac{z}{24}$\n` +
`Từ đó ta có dãy tỉ số bằng nhau: $\\frac{x}{15} = \\frac{y}{20} = \\frac{z}{24}$.\n` +
`Áp dụng tính chất của dãy tỉ số bằng nhau cho $x$ và $z$:\n` +
`$\\frac{x}{15} = \\frac{y}{20} = \\frac{z}{24} = \\frac{x + z}{15 + 24} = \\frac{78}{39} = 2$.\n` +
`Suy ra:\n` +
`- $x = 15 \\cdot 2 = 30$.\n` +
`- $y = 20 \\cdot 2 = 40$.\n` +
`- $z = 24 \\cdot 2 = 48$.\n` +
`**Kết luận:** $x = 30, y = 40, z = 48$.`;

  const sol6 = `Căn bậc hai số học của một số $a \\ge 0$ là số $x \\ge 0$ sao cho $x^2 = a$.\n` +
`- Căn bậc hai số học của $81$ là $\\sqrt{81} = 9$.\n` +
`- Căn bậc hai số học của $8100$ là $\\sqrt{8100} = 90$.\n` +
`- Căn bậc hai số học của $0,81$ là $\\sqrt{0,81} = 0,9$.\n` +
`- Căn bậc hai số học của $81^2$ là $\\sqrt{81^2} = 81$.`;

  const sol7 = `Gieo một con xúc xắc, tập hợp các kết quả có thể xảy ra là: $\\Omega = \\{1; 2; 3; 4; 5; 6\\}$. Tổng số kết quả có thể là $6$.\n\n` +
`**a) Biến cố A: \"Số chấm xuất hiện là số chẵn\"**\n` +
`Các kết quả thuận lợi cho A: $\\{2; 4; 6\\}$ (có $3$ kết quả).\n` +
`Xác suất của biến cố A: $P(A) = \\frac{3}{6} = \\frac{1}{2}$.\n\n` +
`**b) Biến cố B: \"Số chấm xuất hiện là số vừa chia hết cho 2, vừa chia hết cho 3\"**\n` +
`Các kết quả thuận lợi cho B: $\\{6\\}$ (có $1$ kết quả).\n` +
`Xác suất của biến cố B: $P(B) = \\frac{1}{6}$.\n\n` +
`**c) Biến cố C: \"Số chấm xuất hiện không phải là số nguyên tố và là ước của 24\"**\n` +
`- Các số không phải là số nguyên tố trong $\\Omega$: $\\{1; 4; 6\\}$ (số $1$ không phải số nguyên tố cũng không phải hợp số; $4, 6$ là hợp số).\n` +
`- Các ước của $24$ trong $\\Omega$: $\\{1; 2; 3; 4; 6\\}$.\n` +
`Giao của hai điều kiện trên là các kết quả thuận lợi cho C: $\\{1; 4; 6\\}$ (có $3$ kết quả).\n` +
`Xác suất của biến cố C: $P(C) = \\frac{3}{6} = \\frac{1}{2}$.`;

  const sol8 = `*(Do đề bài không đính kèm biểu đồ hình 5.12, học sinh áp dụng phương pháp sau để giải bài toán)*\n\n` +
`**a) Đọc dữ liệu từ biểu đồ:**\n` +
`Học sinh quan sát biểu đồ từ năm $2013$ đến $2018$, tìm cột cao nhất (đỉnh cao nhất trên biểu đồ đoạn thẳng). Gióng cột đó xuống trục hoành để biết đó là **năm nào**, và gióng sang trục tung để biết **số trận lũ lụt** là bao nhiêu.\n\n` +
`**b) Lập bảng thống kê:**\n` +
`Kẻ một bảng gồm hai hàng:\n` +
`- Hàng 1 (Năm): Ghi lần lượt các năm $2013, 2014, 2015, 2016, 2017, 2018$.\n` +
`- Hàng 2 (Số trận lũ lụt): Gióng từng năm trên đồ thị sang trục tung để lấy số liệu chính xác tương ứng và điền vào bảng.`;

  const sol9 = `*(Do đề bài không có hình vẽ kèm theo nên học sinh cần dựa vào các dấu hiệu nhận biết hai đường thẳng song song)*\n\n` +
`Để chỉ ra các đường thẳng song song trong hình, ta cần tìm các cặp đường thẳng bị cắt bởi một cát tuyến và thoả mãn một trong các điều kiện sau:\n` +
`1) Có một cặp góc **so le trong** bằng nhau.\n` +
`2) Có một cặp góc **đồng vị** bằng nhau.\n` +
`3) Có một cặp góc **trong cùng phía** bù nhau (tổng bằng $180^\\circ$).\n` +
`4) Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba.\n\n` +
`Nếu thấy trên hình có kí hiệu các góc bằng nhau thoả mãn các điều kiện trên, ta kết luận được hai đường thẳng đó song song.`;

  const sol10 = `**a) Chứng minh $HK = IB$:**\n` +
`Xét tứ giác $IBHK$, ta có:\n` +
`- $IK \\parallel BH$ (do $IK \\parallel BC$)\n` +
`- $HK \\parallel IB$ (do $HK \\parallel AB$)\n` +
`Tứ giác có các cạnh đối song song nên $IBHK$ là hình bình hành.\n` +
`Suy ra các cạnh đối bằng nhau: $HK = IB$ (đpcm).\n\n` +
`**b) Chứng minh $AK = KC$:**\n` +
`Theo đề bài, $I$ là trung điểm của $AB$ nên $AI = IB$.\n` +
`Từ câu a có $HK = IB$, suy ra $HK = AI$.\n` +
`Vì $IK \\parallel BC$ nên $\\widehat{AIK} = \\widehat{ABC}$ (đồng vị).\n` +
`Vì $HK \\parallel AB$ nên $\\widehat{KHC} = \\widehat{ABC}$ (đồng vị) và $\\widehat{HKC} = \\widehat{A}$ (đồng vị).\n` +
`Từ đó suy ra $\\widehat{AIK} = \\widehat{KHC}$.\n` +
`Xét $\\Delta AIK$ và $\\Delta HKC$, ta có:\n` +
`- $\\widehat{A} = \\widehat{HKC}$ (chứng minh trên)\n` +
`- $AI = HK$ (chứng minh trên)\n` +
`- $\\widehat{AIK} = \\widehat{KHC}$ (chứng minh trên)\n` +
`$\\Rightarrow \\Delta AIK = \\Delta HKC$ (g.c.g).\n` +
`$\\Rightarrow AK = KC$ (hai cạnh tương ứng) (đpcm).`;

  const updates = [
    { id: "cc55c6f2-f709-4f88-b830-627390577688", solution: sol1 },
    { id: "ccc162bd-5c53-4087-b5c0-f31b5bfb5641", solution: sol2 },
    { id: "cd44d02e-d80a-434c-abb3-fa8053b13c24", solution: sol3 },
    { id: "cd572af5-6045-44ff-ac45-d582f1495bae", solution: sol4 },
    { id: "cdf37197-7f30-4138-92f8-d81706b2a0bb", solution: sol5 },
    { id: "ce1a1608-daaf-4c54-bd1d-fb7e18b1d0f1", solution: sol6 },
    { id: "ce20a216-6c9c-4336-b5b0-c962e28ae8dc", solution: sol7 },
    { id: "ced502fc-7067-46e2-9ca9-995e8dd698aa", solution: sol8 },
    { id: "cf849377-4116-43e6-af70-9b14c4ef232e", solution: sol9 },
    { id: "d02e5edf-5dd3-42dd-9d48-90c396f550fa", solution: sol10 }
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

manualFixBatch73().catch(console.error).finally(() => process.exit(0));
