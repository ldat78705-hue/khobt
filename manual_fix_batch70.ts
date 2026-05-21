import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch70() {
  const sql = getDb();

  const sol1 = `Các số hữu tỉ đã cho gồm: $\\frac{-5}{6}; \\frac{2}{3}; 0; \\frac{-7}{8}; \\frac{1}{2}$.\n` +
`Ta chia làm 3 nhóm:\n` +
`- Nhóm số âm: $\\frac{-5}{6}$ và $\\frac{-7}{8}$.\n` +
`- Số 0.\n` +
`- Nhóm số dương: $\\frac{2}{3}$ và $\\frac{1}{2}$.\n\n` +
`**So sánh nhóm số âm:**\n` +
`Quy đồng mẫu số chung là $24$:\n` +
`$\\frac{-5}{6} = \\frac{-20}{24}$ và $\\frac{-7}{8} = \\frac{-21}{24}$.\n` +
`Vì $-21 < -20$ nên $\\frac{-21}{24} < \\frac{-20}{24} \\Rightarrow \\frac{-7}{8} < \\frac{-5}{6}$.\n\n` +
`**So sánh nhóm số dương:**\n` +
`Quy đồng mẫu số chung là $6$:\n` +
`$\\frac{1}{2} = \\frac{3}{6}$ và $\\frac{2}{3} = \\frac{4}{6}$.\n` +
`Vì $3 < 4$ nên $\\frac{3}{6} < \\frac{4}{6} \\Rightarrow \\frac{1}{2} < \\frac{2}{3}$.\n\n` +
`Kết hợp các kết quả, ta được thứ tự tăng dần là:\n` +
`$$\\frac{-7}{8} < \\frac{-5}{6} < 0 < \\frac{1}{2} < \\frac{2}{3}$$`;

  const sol2 = `**a)** $-3,5 \\cdot \\left( \\frac{-4}{21} \\right) = \\frac{-35}{10} \\cdot \\frac{-4}{21} = \\frac{-7}{2} \\cdot \\frac{-4}{21} = \\frac{(-7) \\cdot (-4)}{2 \\cdot 21} = \\frac{28}{42} = \\frac{2}{3}$.\n\n` +
`**b)** $1\\frac{2}{3} \\cdot \\frac{-7}{3} = \\frac{5}{3} \\cdot \\frac{-7}{3} = \\frac{-35}{9}$.\n\n` +
`**c)** $\\frac{-5}{2} : \\frac{3}{-4} = \\frac{-5}{2} \\cdot \\frac{-4}{3} = \\frac{(-5) \\cdot (-4)}{2 \\cdot 3} = \\frac{20}{6} = \\frac{10}{3}$.\n\n` +
`**d)** $\\left( -8\\frac{2}{5} \\right) : \\left( -2\\frac{4}{5} \\right) = \\left( -\\frac{42}{5} \\right) : \\left( -\\frac{14}{5} \\right) = \\left( -\\frac{42}{5} \\right) \\cdot \\left( -\\frac{5}{14} \\right) = \\frac{42}{14} = 3$.`;

  const sol3 = `*(Do đề bài không có hình vẽ kèm theo nên không thể xác định cụ thể giá trị $x$.)*\n\n` +
`Tuy nhiên, phương pháp chung để tính góc $x$ trong các hình vẽ thường là:\n` +
`- Dựa vào định lý tổng $3$ góc trong tam giác bằng $180^\\circ$.\n` +
`- Sử dụng tính chất của hai đường thẳng song song (hai góc so le trong, đồng vị, trong cùng phía).\n` +
`- Áp dụng tính chất của góc kề bù, góc đối đỉnh hoặc góc ngoài của tam giác.`;

  const sol4 = `Vì $DE \\parallel BC$ nên:\n` +
`- $\\widehat{DIB} = \\widehat{IBC}$ (hai góc so le trong).\n` +
`- $\\widehat{EIC} = \\widehat{ICB}$ (hai góc so le trong).\n\n` +
`Mặt khác, do $BI$ là tia phân giác của góc $B$ nên $\\widehat{DBI} = \\widehat{IBC}$.\n` +
`Từ đó suy ra $\\widehat{DIB} = \\widehat{DBI}$.\n` +
`Do tam giác $DIB$ có hai góc bằng nhau nên $\\Delta DIB$ cân tại $D$, suy ra $DI = DB$ (1).\n\n` +
`Tương tự, do $CI$ là tia phân giác của góc $C$ nên $\\widehat{ECI} = \\widehat{ICB}$.\n` +
`Từ đó suy ra $\\widehat{EIC} = \\widehat{ECI}$.\n` +
`Do tam giác $EIC$ có hai góc bằng nhau nên $\\Delta EIC$ cân tại $E$, suy ra $EI = EC$ (2).\n\n` +
`Vì điểm $I$ nằm trên đoạn thẳng $DE$ nên $DE = DI + IE$.\n` +
`Thay (1) và (2) vào, ta được:\n` +
`$DE = DB + EC$ (hay $DE = BD + CE$).\n` +
`(Điều phải chứng minh).`;

  const sol5 = `**a) Tính $\\widehat{CAD}$:**\n` +
`Vì $AD$ là tia phân giác của $\\widehat{A}$ nên:\n` +
`$\\widehat{CAD} = \\widehat{BAD} = \\frac{\\widehat{BAC}}{2} = \\frac{60^\\circ}{2} = 30^\\circ$.\n\n` +
`**b) Tính $\\widehat{CEK}$:**\n` +
`Theo đề bài, từ điểm $E$ vẽ tia $EK \\parallel AD$.\n` +
`Vì $EK \\parallel AD$ nên góc $\\widehat{CEK}$ và góc $\\widehat{CAD}$ là hai góc đồng vị.\n` +
`Suy ra: $\\widehat{CEK} = \\widehat{CAD} = 30^\\circ$.\n` +
`Vậy $\\widehat{CEK} = 30^\\circ$.`;

  const sol6 = `Gọi độ dài ba cạnh của tam giác lần lượt là $a, b, c$ (cm) ($a, b, c > 0$).\n` +
`Theo đề bài, chu vi của tam giác bằng $22$ cm, nên ta có: $a + b + c = 22$.\n` +
`Ba cạnh $a, b, c$ tỉ lệ với $2; 4; 5$, nên ta có dãy tỉ số bằng nhau:\n` +
`$\\frac{a}{2} = \\frac{b}{4} = \\frac{c}{5}$.\n` +
`Áp dụng tính chất dãy tỉ số bằng nhau, ta có:\n` +
`$\\frac{a}{2} = \\frac{b}{4} = \\frac{c}{5} = \\frac{a + b + c}{2 + 4 + 5} = \\frac{22}{11} = 2$.\n` +
`Từ đó ta tính được:\n` +
`- $a = 2 \\cdot 2 = 4$ (cm)\n` +
`- $b = 4 \\cdot 2 = 8$ (cm)\n` +
`- $c = 5 \\cdot 2 = 10$ (cm)\n` +
`**Kết luận:** Độ dài ba cạnh của tam giác lần lượt là $4$ cm, $8$ cm và $10$ cm.`;

  const sol7 = `Số gạo kho đã xuất đi để cứu trợ là:\n` +
`$36 \\cdot \\frac{2}{3} = 24$ (tấn).\n` +
`Số gạo còn lại sau khi cứu trợ là:\n` +
`$36 - 24 = 12$ (tấn).\n` +
`Số gạo còn lại sau khi bán đi $4\\frac{3}{4}$ (tức là $4,75$) tấn là:\n` +
`$12 - 4,75 = 7,25$ (tấn).\n` +
`Sau đó, kho nhập thêm $4$ tấn nữa, vậy số gạo cuối cùng trong kho là:\n` +
`$7,25 + 4 = 11,25$ (tấn).\n` +
`*(Hoặc viết dưới dạng phân số: $11\\frac{1}{4}$ hay $\\frac{45}{4}$ tấn).* \n` +
`**Kết luận:** Số gạo còn lại trong kho là $11,25$ tấn.`;

  const sol8 = `Ta có cách đổi số thập phân vô hạn tuần hoàn ra phân số như sau:\n` +
`$3,(5) = 3 + 0,(5) = 3 + \\frac{5}{9} = \\frac{27}{9} + \\frac{5}{9} = \\frac{32}{9}$.\n` +
`**Đáp án đúng là B.**`;

  const sol9 = `**a)** Đặt $A = \\frac{1}{1 \\cdot 4} + \\frac{1}{4 \\cdot 7} + \\frac{1}{7 \\cdot 10} + \\dots + \\frac{1}{100 \\cdot 103}$\n` +
`Nhân cả hai vế với $3$:\n` +
`$3A = \\frac{3}{1 \\cdot 4} + \\frac{3}{4 \\cdot 7} + \\dots + \\frac{3}{100 \\cdot 103}$\n` +
`Áp dụng công thức $\\frac{3}{n(n+3)} = \\frac{1}{n} - \\frac{1}{n+3}$, ta có:\n` +
`$3A = \\left(1 - \\frac{1}{4}\\right) + \\left(\\frac{1}{4} - \\frac{1}{7}\\right) + \\dots + \\left(\\frac{1}{100} - \\frac{1}{103}\\right)$\n` +
`$3A = 1 - \\frac{1}{103} = \\frac{102}{103}$.\n` +
`Suy ra: $A = \\frac{102}{103} : 3 = \\frac{34}{103}$.\n\n` +
`**b)** Đặt $B = \\frac{-1}{3} + \\frac{-1}{15} + \\frac{-1}{35} + \\dots + \\frac{-1}{9999}$\n` +
`Phân tích mẫu số thành tích hai số lẻ liên tiếp:\n` +
`$B = \\frac{-1}{1 \\cdot 3} + \\frac{-1}{3 \\cdot 5} + \\frac{-1}{5 \\cdot 7} + \\dots + \\frac{-1}{99 \\cdot 101}$\n` +
`Nhân cả hai vế với $-2$:\n` +
`$-2B = \\frac{2}{1 \\cdot 3} + \\frac{2}{3 \\cdot 5} + \\dots + \\frac{2}{99 \\cdot 101}$\n` +
`Áp dụng công thức $\\frac{2}{n(n+2)} = \\frac{1}{n} - \\frac{1}{n+2}$, ta có:\n` +
`$-2B = \\left(1 - \\frac{1}{3}\\right) + \\left(\\frac{1}{3} - \\frac{1}{5}\\right) + \\dots + \\left(\\frac{1}{99} - \\frac{1}{101}\\right)$\n` +
`$-2B = 1 - \\frac{1}{101} = \\frac{100}{101}$.\n` +
`Suy ra: $B = \\frac{100}{101} : (-2) = \\frac{-50}{101}$.`;

  const sol10 = `Ta thực hiện cộng hai phân số cùng mẫu số:\n` +
`$\\frac{3}{4} + \\frac{-1}{4} = \\frac{3 + (-1)}{4} = \\frac{2}{4}$.\n` +
`Rút gọn phân số ta được $\\frac{1}{2}$.\n` +
`**Đáp án đúng là C.**`;

  const updates = [
    { id: "bc119c43-4eb8-45f6-8d84-9b18c1a3bea1", solution: sol1 },
    { id: "bc5ea046-175e-457b-a7fd-756021dc8e59", solution: sol2 },
    { id: "bc768f87-a416-4361-9c5e-37293006ee32", solution: sol3 },
    { id: "bc8a3184-3833-4ae4-88c4-28ada96a638f", solution: sol4 },
    { id: "bce05d15-e966-433e-ab3f-384b1c845d5d", solution: sol5 },
    { id: "bde41af3-5edb-465f-9df6-729e2ffa54cf", solution: sol6 },
    { id: "bec3b7e6-37e0-48f1-aa1f-427b53db250e", solution: sol7 },
    { id: "bed915ce-d200-47d4-a98e-ac046b1ff15e", solution: sol8 },
    { id: "bef8bfb3-f681-457a-b365-9f10e2ffad77", solution: sol9 },
    { id: "bf68ce36-7eed-4764-85f9-02c6016bea00", solution: sol10 }
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

manualFixBatch70().catch(console.error).finally(() => process.exit(0));
