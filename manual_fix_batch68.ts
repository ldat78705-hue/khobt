import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch68() {
  const sql = getDb();

  const sol1 = `Vì $\\Delta ABC$ đều nên $AB = BC = CA$ và $\\widehat{A} = \\widehat{B} = \\widehat{C} = 60^\\circ$.\n` +
`Theo đề bài, $AM = BN = CP$.\n` +
`Ta có:\n` +
`- $MB = AB - AM$\n` +
`- $NC = BC - BN$\n` +
`- $PA = CA - CP$\n` +
`Do $AB = BC = CA$ và $AM = BN = CP$ nên suy ra $MB = NC = PA$.\n` +
`Xét ba tam giác $\\Delta AMP, \\Delta BNM$ và $\\Delta CPN$, ta có:\n` +
`- $AM = BN = CP$ (gt)\n` +
`- $\\widehat{A} = \\widehat{B} = \\widehat{C} = 60^\\circ$ (gt)\n` +
`- $AP = BM = CN$ (chứng minh trên)\n` +
`$\\Rightarrow \\Delta AMP = \\Delta BNM = \\Delta CPN$ (c.g.c).\n` +
`$\\Rightarrow MP = MN = NP$ (các cạnh tương ứng).\n` +
`Vì ba cạnh bằng nhau nên $\\Delta MNP$ là tam giác đều.`;

  const sol2 = `Xe máy đi 100 km tiêu thụ hết $2\\frac{1}{4}$ lít xăng, tức là $\\frac{9}{4}$ lít $= 2,25$ lít.\n` +
`Số lít xăng xe máy tiêu thụ khi đi 1 km là:\n` +
`$2,25 : 100 = 0,0225$ (lít).\n` +
`Số lít xăng xe máy tiêu thụ khi đi quãng đường 150 km là:\n` +
`$150 \\cdot 0,0225 = 3,375$ (lít) (hoặc $3\\frac{3}{8}$ lít).\n` +
`*(Cách khác: Quãng đường 150 km gấp 1,5 lần 100 km nên lượng xăng tiêu thụ là $2,25 \\cdot 1,5 = 3,375$ lít).* \n` +
`**Kết luận:** Xe máy đó đi 150 km thì tiêu thụ hết $3,375$ lít xăng.`;

  const sol3 = `Vì $x$ và $y$ là hai đại lượng tỉ lệ thuận nên $y = kx$ (với $k$ là hằng số tỉ lệ, $k \\ne 0$).\n` +
`Dựa vào bảng, giả sử cặp giá trị cuối cùng là tương ứng với nhau (vì đề bài thường cho ít nhất một cặp giá trị để tìm $k$). Nếu cặp đó là $x = 5, y = -4$, ta có:\n` +
`$-4 = k \\cdot 5 \\Rightarrow k = -\\frac{4}{5} = -0,8$.\n` +
`Khi đó công thức là: $y = -0,8x$.\n` +
`Ta tính các giá trị $y$ tương ứng:\n` +
`- Khi $x = -3 \\Rightarrow y = -0,8 \\cdot (-3) = 2,4$.\n` +
`- Khi $x = -1 \\Rightarrow y = -0,8 \\cdot (-1) = 0,8$.\n` +
`- Khi $x = 1 \\Rightarrow y = -0,8 \\cdot 1 = -0,8$.\n` +
`- Khi $x = 2 \\Rightarrow y = -0,8 \\cdot 2 = -1,6$.\n` +
`*(Nếu số $-4$ ở cột $x=2$ thì $k=-2$ và bảng sẽ có kết quả khác tương ứng).*`;

  const sol4 = `Vì $\\widehat{xOy}$ là góc bẹt nên $\\widehat{xOy} = 180^\\circ$.\n` +
`Tia $Oz$ nằm giữa hai tia $Ox$ và $Oy$ (để tạo thành góc $\\widehat{yOz}$ và $\\widehat{xOz}$ kề bù). Ta có:\n` +
`$\\widehat{xOz} + \\widehat{yOz} = 180^\\circ$\n` +
`$\\Rightarrow \\widehat{xOz} + 50^\\circ = 180^\\circ \\Rightarrow \\widehat{xOz} = 180^\\circ - 50^\\circ = 130^\\circ$.\n` +
`Vì $Om$ là tia phân giác của $\\widehat{xOz}$ nên:\n` +
`$\\widehat{zOm} = \\frac{\\widehat{xOz}}{2} = \\frac{130^\\circ}{2} = 65^\\circ$.\n` +
`Góc $\\widehat{yOm}$ là tổng của hai góc kề nhau $\\widehat{yOz}$ và $\\widehat{zOm}$:\n` +
`$\\widehat{yOm} = \\widehat{yOz} + \\widehat{zOm} = 50^\\circ + 65^\\circ = 115^\\circ$.\n` +
`**Kết luận:** $\\widehat{yOm} = 115^\\circ$.`;

  const sol5 = `**a)** So sánh các phân số cùng mẫu số dương (mẫu chung là 17). Phân số nào có tử số bé hơn thì phân số đó bé hơn:\n` +
`$-16 < -14 < -12 < -11 < -9 < -3 < -1$.\n` +
`Sắp xếp: $\\frac{-16}{17}; \\frac{-14}{17}; \\frac{-12}{17}; \\frac{-11}{17}; \\frac{-9}{17}; \\frac{-3}{17}; \\frac{-1}{17}$.\n\n` +
`**b)** Các phân số có cùng tử số là số âm ($-5$). Phân số nào có mẫu số bé hơn thì có giá trị bé hơn (do giá trị tuyệt đối lớn hơn nhưng mang dấu âm):\n` +
`$\\frac{-5}{2} < \\frac{-5}{3} < \\frac{-5}{4} < \\frac{-5}{7} < \\frac{-5}{8} < \\frac{-5}{9} < \\frac{-5}{11}$.\n\n` +
`**c)** Nhóm 1 (số âm): $\\frac{-14}{37}$ và $\\frac{-14}{33}$. Vì mẫu $33 < 37$ nên $\\frac{-14}{33} < \\frac{-14}{37}$.\n` +
`Nhóm 2 (số 0): $0$.\n` +
`Nhóm 3 (số dương): $\\frac{4}{3}; \\frac{17}{20}; \\frac{18}{19}$.\n` +
`Ta có $\\frac{4}{3} > 1$. Lại có $1 - \\frac{17}{20} = \\frac{3}{20} = \\frac{57}{380}$; $1 - \\frac{18}{19} = \\frac{1}{19} = \\frac{20}{380}$.\n` +
`Vì $\\frac{57}{380} > \\frac{20}{380}$ nên $1 - \\frac{17}{20} > 1 - \\frac{18}{19} \\Rightarrow \\frac{17}{20} < \\frac{18}{19}$.\n` +
`Vậy thứ tự là: $\\frac{-14}{33}; \\frac{-14}{37}; 0; \\frac{17}{20}; \\frac{18}{19}; \\frac{4}{3}$.`;

  const sol6 = `Ta có: $\\left| x + \\frac{3}{5} \\right| - \\left| x - \\frac{7}{3} \\right| = 0$\n` +
`$\\Leftrightarrow \\left| x + \\frac{3}{5} \\right| = \\left| x - \\frac{7}{3} \\right|$\n` +
`Điều này xảy ra khi và chỉ khi:\n` +
`**Trường hợp 1:** $x + \\frac{3}{5} = x - \\frac{7}{3}$\n` +
`$\\Leftrightarrow \\frac{3}{5} = -\\frac{7}{3}$ (vô lý, loại).\n\n` +
`**Trường hợp 2:** $x + \\frac{3}{5} = -\\left( x - \\frac{7}{3} \\right)$\n` +
`$\\Leftrightarrow x + \\frac{3}{5} = -x + \\frac{7}{3}$\n` +
`$\\Leftrightarrow 2x = \\frac{7}{3} - \\frac{3}{5}$\n` +
`$\\Leftrightarrow 2x = \\frac{35}{15} - \\frac{9}{15} = \\frac{26}{15}$\n` +
`$\\Leftrightarrow x = \\frac{26}{15} : 2 = \\frac{13}{15}$.\n` +
`**Vậy** $x = \\frac{13}{15}$.`;

  const sol7 = `Số hữu tỉ $\\frac{-2}{3}$ là một số âm, do đó điểm biểu diễn của nó phải nằm bên trái điểm $0$.\n` +
`Mặt khác, $\\frac{-2}{3} > -1$ nên điểm biểu diễn của nó phải nằm bên phải điểm $-1$.\n` +
`Kết hợp lại, điểm biểu diễn số hữu tỉ $\\frac{-2}{3}$ nằm bên phải điểm $-1$ và bên trái điểm $0$.\n` +
`**Đáp án đúng là D.**`;

  const sol8 = `**1)** Số lượng học sinh được điều tra:\n` +
`Dựa vào bảng thống kê, từ STT 1 đến 10, có tổng cộng **10** học sinh được điều tra.\n\n` +
`**2)** Phân loại dữ liệu thu được:\n` +
`- Dữ liệu \"Giới tính\" (Nam, Nữ) là **dữ liệu định tính**.\n` +
`- Dữ liệu \"Khả năng\" (Xuất sắc, Tốt, Khá, Đạt, Chưa đạt) là **dữ liệu định tính** (dạng thứ bậc).\n\n` +
`**3)** Tính đại diện của dữ liệu:\n` +
`Dữ liệu trên **không đại diện** cho khả năng học Toán của toàn thể học sinh lớp 7A. Lý do là cả 10 học sinh được điều tra đều là \"Nam\", mẫu điều tra này thiếu tính ngẫu nhiên và bỏ sót hoàn toàn nhóm học sinh nữ trong lớp.`;

  const sol9 = `Số đối của một số hữu tỉ $a$ là số $-a$ (có cùng giá trị tuyệt đối nhưng ngược dấu).\n` +
`Số đối của số hữu tỉ $\\frac{-1}{2}$ là $\\frac{1}{2}$.\n` +
`**Đáp án đúng là C.**`;

  const sol10 = `**1)** Phân loại dữ liệu:\n` +
`Dữ liệu \"Lượng đóng góp\" ($2,3; 2,4; 2,4; 2,6; 2,9$) là các số liệu biểu diễn giá trị đo lường (đơn vị tỉ đô la), do đó đây là **dữ liệu định lượng**.\n\n` +
`**2)** Vẽ biểu đồ đoạn thẳng:\n` +
`Học sinh vẽ hệ trục toạ độ:\n` +
`- Trục hoành (nằm ngang) biểu diễn thời gian (Năm): 2015, 2016, 2017, 2018, 2019.\n` +
`- Trục tung (thẳng đứng) biểu diễn Lượng đóng góp (Tỉ đô la): chia các vạch tương ứng từ 2,0 đến 3,0.\n` +
`- Đánh dấu các điểm toạ độ và nối chúng lại thành đường gấp khúc.\n\n` +
`**3)** Xu thế:\n` +
`Qua các năm từ 2015 đến 2019, lượng đóng góp trực tiếp của ngành du lịch vào GDP toàn cầu có **xu thế tăng lên** (từ 2,3 tỉ đô la lên 2,9 tỉ đô la).`;

  const updates = [
    { id: "b15c95b7-8bb9-4a54-9d5c-5068eb0f226f", solution: sol1 },
    { id: "b23bbd55-e765-41c7-b6ce-7b34d38e6e90", solution: sol2 },
    { id: "b2c2654a-65ac-4836-9945-7f44eb4731a4", solution: sol3 },
    { id: "b2e329a8-3e5e-406f-b3f2-475783dac380", solution: sol4 },
    { id: "b3e40f5b-d882-4124-be9f-6b540cd623c1", solution: sol5 },
    { id: "b4e0b181-aca1-43ca-95e3-9c46c40597ed", solution: sol6 },
    { id: "b4f386b0-9c9a-4735-9b55-abf55eed73a5", solution: sol7 },
    { id: "b4ffd46f-8adf-4c70-8b62-0c2a39121589", solution: sol8 },
    { id: "b5a6495d-0db7-4a8a-afbc-8e27ab42de2a", solution: sol9 },
    { id: "b5fe8b02-7479-425e-bd68-e0c8926d50f8", solution: sol10 }
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

manualFixBatch68().catch(console.error).finally(() => process.exit(0));
