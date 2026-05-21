import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch13Grade8() {
  const sql = getDb();

  const sol1 = `Theo tính chất của hai tam giác đồng dạng:\n` +
`Nếu $\\Delta MNP \\sim \\Delta EGF$ thì tỉ số các cạnh tương ứng bằng nhau.\n` +
`Các đỉnh tương ứng là: $M$ tương ứng $E$, $N$ tương ứng $G$, $P$ tương ứng $F$.\n` +
`Suy ra tỉ lệ thức: $\\frac{MN}{EG} = \\frac{NP}{GF} = \\frac{MP}{EF}$.\n` +
`Từ $\\frac{MN}{EG} = \\frac{NP}{GF}$ ta có thể hoán đổi trung tỉ để được: $\\frac{MN}{NP} = \\frac{EG}{GF}$.\n` +
`**(Đây là một mệnh đề ĐÚNG).**`;

  const sol2 = `**a) Chứng minh ∆BDE đồng dạng ∆DCE:**\n` +
`Xét $\\Delta BDE$ và $\\Delta DCE$ có:\n` +
`$\\widehat{E}$ chung.\n` +
`$\\widehat{BDE} = \\widehat{DCE} = 90^\\circ$ (do $DE \\perp BD$ và $ABCD$ là hình chữ nhật nên $DC \\perp CE$).\n` +
`$\\Rightarrow \\Delta BDE \\sim \\Delta DCE$ (g-g).\n\n` +
`**b) Chứng minh $DC^2 = CH \\cdot DB$ và tính CH:**\n` +
`Vì $BD \\perp DE$ và $CH \\perp DE$ nên $BD \\parallel CH$.\n` +
`Tứ giác $BDHC$ có $BD \\parallel CH$ nên là hình thang.\n` +
`Hai đường chéo $BC$ và $DH$ cắt nhau tại $E$. Xét $\\Delta DHC$ và $\\Delta BCD$:\n` +
`$\\widehat{DHC} = \\widehat{BCD} = 90^\\circ$.\n` +
`$\\widehat{CDH} = \\widehat{DBC}$ (cùng phụ với $\\widehat{BDC}$). \n` +
`$\\Rightarrow \\Delta DHC \\sim \\Delta BCD$ (g-g).\n` +
`$\\Rightarrow \\frac{DC}{BD} = \\frac{HC}{CD} \\Rightarrow DC^2 = HC \\cdot BD$ (đpcm).\n` +
`* Tính $CH$:\n` +
`Áp dụng định lý Pytago trong $\\Delta BCD$ vuông tại $C$: $BD = \\sqrt{BC^2 + CD^2} = \\sqrt{6^2 + 8^2} = 10$ (cm).\n` +
`Ta có $HC = \\frac{DC^2}{BD} = \\frac{8^2}{10} = 6,4$ (cm).\n\n` +
`**c) Chứng minh K là trung điểm HC:**\n` +
`Vì $HC \\parallel BD$, nên $HK \\parallel OD$ và $CK \\parallel OB$.\n` +
`Áp dụng hệ quả định lý Thales trong $\\Delta EOD$ và $\\Delta EOB$:\n` +
`$\\frac{HK}{OD} = \\frac{EK}{EO}$ và $\\frac{CK}{OB} = \\frac{EK}{EO}$.\n` +
`Suy ra $\\frac{HK}{OD} = \\frac{CK}{OB}$. \n` +
`Mà $O$ là trung điểm đường chéo $BD$ của hình chữ nhật nên $OD = OB$.\n` +
`Từ đó $HK = CK \\Rightarrow K$ là trung điểm của $HC$.\n\n` +
`**d) Chứng minh OE, CD, BH đồng quy:**\n` +
`Xét hình thang $BDHC$ ($BD \\parallel HC$).\n` +
`Giao điểm của hai đường chéo $BC$ và $DH$ là $E$.\n` +
`Gọi $I$ là giao điểm của hai cạnh bên $BH$ và $CD$.\n` +
`Theo Bổ đề hình thang, đường thẳng đi qua giao điểm của hai cạnh bên ($I$) và giao điểm của hai đường chéo ($E$) sẽ đi qua trung điểm của hai đáy.\n` +
`Trung điểm của $BD$ là $O$, trung điểm của $HC$ là $K$.\n` +
`Do đó, đường thẳng $EI$ phải đi qua $O$ và $K$. Nói cách khác, $O, E, I$ thẳng hàng.\n` +
`Vậy ba đường thẳng $OE, CD, BH$ đồng quy tại $I$.`;

  const sol3 = `Ta thực hiện phép trừ hai phân thức có cùng mẫu thức:\n` +
`$\\frac{4x + 1}{7x^2} - \\frac{1 - 3x}{7x^2} = \\frac{4x + 1 - (1 - 3x)}{7x^2}$\n` +
`$= \\frac{4x + 1 - 1 + 3x}{7x^2} = \\frac{7x}{7x^2} = \\frac{1}{x}$.\n` +
`**Đáp án đúng là D.**`;

  const sol4 = `Gọi chiều dài đoạn đường đội dự định sửa là $x$ (m, $x > 0$).\n` +
`Thời gian hoàn thành theo dự định là: $\\frac{x}{40}$ (ngày).\n` +
`Thực tế mỗi ngày sửa được: $40 - 10 = 30$ (m).\n` +
`Thời gian hoàn thành thực tế là: $\\frac{x}{30}$ (ngày).\n` +
`Vì thời gian thực tế kéo dài thêm $6$ ngày so với dự định, ta có phương trình:\n` +
`$\\frac{x}{30} - \\frac{x}{40} = 6$\n` +
`Quy đồng mẫu chung $120$:\n` +
`$\\frac{4x - 3x}{120} = 6$\n` +
`$\\Leftrightarrow x = 6 \\cdot 120 = 720$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Chiều dài đoạn đường đội công nhân dự định sửa là $720$ mét.`;

  const sol5 = `**a) Tứ giác MBCN là hình gì? Tại sao?**\n` +
`Vì $M$ là trung điểm $AB$ nên $AM = MB = \\frac{AB}{2}$. Mà $AB = 2BC \\Rightarrow MB = BC$.\n` +
`Ta có $Mx \\parallel BC \\Rightarrow MN \\parallel BC$.\n` +
`Và $Cy \\parallel AB \\Rightarrow CN \\parallel MB$.\n` +
`Tứ giác $MBCN$ có $MN \\parallel BC$ và $CN \\parallel MB$ nên là hình bình hành.\n` +
`Hình bình hành $MBCN$ có hai cạnh kề $MB = BC$ nên là hình thoi.\n\n` +
`**b) Chứng minh $BN \\perp AN$:**\n` +
`Do $MBCN$ là hình thoi nên $MN = MB = AM$. \n` +
`Trong $\\Delta ABN$, đường trung tuyến $NM$ ứng với cạnh $AB$ bằng nửa cạnh $AB$ ($NM = AM = MB$).\n` +
`Suy ra $\\Delta ABN$ vuông tại $N \\Rightarrow BN \\perp AN$.\n\n` +
`**c) Chứng minh DE = DF:**\n` +
`Hình thoi $MBCN$ có hai đường chéo $MC$ và $BN$ cắt nhau tại trung điểm $E$ của mỗi đường và $MC \\perp BN$.\n` +
`Lại có $AN \\perp BN$ (chứng minh b) $\\Rightarrow MC \\parallel AN$, hay $CE \\parallel AF$.\n` +
`Trong $\\Delta ABC$, $MN \\parallel BC$ đi qua trung điểm $M$ của $AB$ nên nó cũng đi qua trung điểm của $AC$. Vậy $D$ là trung điểm $AC \\Rightarrow CD = DA$.\n` +
`Trong $\\Delta DAF$, có $CE \\parallel AF$, $C$ nằm trên đường thẳng $AD$. Áp dụng hệ quả định lý Thales:\n` +
`$\\frac{DE}{DF} = \\frac{DC}{DA} = 1 \\Rightarrow DE = DF$ (đpcm).\n\n` +
`**d) Chứng minh B, G, F thẳng hàng:**\n` +
`Trong $\\Delta ABN$, có $AE$ là đường trung tuyến (do $E$ là trung điểm $BN$).\n` +
`$NM$ là đường trung tuyến (do $M$ là trung điểm $AB$).\n` +
`Hai trung tuyến này cắt nhau tại $G \\Rightarrow G$ là trọng tâm của $\\Delta ABN$.\n` +
`Ta xét đoạn $AF$: Do $CE \\parallel AF \\Rightarrow \\frac{CE}{AF} = \\frac{DC}{DA} = 1 \\Rightarrow CE = AF$.\n` +
`Mà $E$ là trung điểm $MC \\Rightarrow CE = ME$. Suy ra $ME = AF$.\n` +
`Mặt khác, $ME$ là đường trung bình của $\\Delta ABN$ ($M, E$ là trung điểm $AB, BN$) $\\Rightarrow ME = \\frac{1}{2}AN$.\n` +
`Suy ra $AF = \\frac{1}{2}AN$, tức là $F$ là trung điểm của $AN$.\n` +
`Vậy $BF$ là đường trung tuyến thứ ba của $\\Delta ABN$. Vì $G$ là trọng tâm nên $BF$ phải đi qua $G$.\n` +
`Kết luận: $B, G, F$ thẳng hàng.`;

  const sol6 = `**a) Tìm giá trị nhỏ nhất của $A = 2x^2 - x + 2017$**\n` +
`$A = 2\\left( x^2 - \\frac{1}{2}x \\right) + 2017 = 2\\left( x^2 - 2 \\cdot x \\cdot \\frac{1}{4} + \\frac{1}{16} - \\frac{1}{16} \\right) + 2017$\n` +
`$A = 2\\left( x - \\frac{1}{4} \\right)^2 - \\frac{1}{8} + 2017 = 2\\left( x - \\frac{1}{4} \\right)^2 + \\frac{16135}{8}$.\n` +
`Vì $2\\left( x - \\frac{1}{4} \\right)^2 \\ge 0 \\Rightarrow A \\ge \\frac{16135}{8}$.\n` +
`GTNN của $A$ là $\\frac{16135}{8}$ đạt được khi $x = \\frac{1}{4}$.\n\n` +
`**b) Chứng minh $M = (a + b)(b + c)(c + a) - 2abc$ chia hết cho 6**\n` +
`Biến đổi $M$:\n` +
`$M = (a + b + c)(ab + bc + ca) - abc - 2abc = (a + b + c)(ab + bc + ca) - 3abc$.\n` +
`Theo giả thiết $a + b + c$ chia hết cho $6$, nên $(a + b + c)(ab + bc + ca)$ chia hết cho $6$.\n` +
`Để chứng minh $M$ chia hết cho $6$, ta chỉ cần chứng minh $3abc$ chia hết cho $6$, tức là chứng minh $abc$ là số chẵn (chia hết cho $2$).\n` +
`Giả sử $a, b, c$ đều là số lẻ, khi đó tổng $a + b + c$ là số lẻ, không thể chia hết cho $6$ (vô lý).\n` +
`Do đó, trong ba số $a, b, c$ phải có ít nhất một số chẵn.\n` +
`Suy ra tích $abc$ chia hết cho $2 \\Rightarrow 3abc$ chia hết cho $6$.\n` +
`Vậy $M$ chia hết cho $6$ (đpcm).`;

  const sol7 = `**a) Tìm điều kiện xác định:**\n` +
`Các mẫu thức phải khác $0$:\n` +
`- $a + 3 \\ne 0 \\Rightarrow a \\ne -3$\n` +
`- $a - 2 \\ne 0 \\Rightarrow a \\ne 2$\n` +
`- $a^2 - 2a = a(a - 2) \\ne 0 \\Rightarrow a \\ne 0$ và $a \\ne 2$.\n` +
`Vậy ĐKXĐ: $a \\ne -3; a \\ne 2; a \\ne 0$.\n\n` +
`**b) Rút gọn biểu thức P:**\n` +
`$P = \\frac{a + 2}{a + 3} - \\frac{5}{(a + 3)(a - 2)} - \\frac{a}{a(a - 2)}$\n` +
`$P = \\frac{a + 2}{a + 3} - \\frac{5}{(a + 3)(a - 2)} - \\frac{1}{a - 2}$\n` +
`Mẫu chung là $(a + 3)(a - 2)$:\n` +
`$P = \\frac{(a + 2)(a - 2) - 5 - (a + 3)}{(a + 3)(a - 2)}$\n` +
`$P = \\frac{a^2 - 4 - 5 - a - 3}{(a + 3)(a - 2)} = \\frac{a^2 - a - 12}{(a + 3)(a - 2)}$\n` +
`$P = \\frac{a^2 - 4a + 3a - 12}{(a + 3)(a - 2)} = \\frac{a(a - 4) + 3(a - 4)}{(a + 3)(a - 2)}$\n` +
`$P = \\frac{(a - 4)(a + 3)}{(a + 3)(a - 2)} = \\frac{a - 4}{a - 2}$.\n\n` +
`**c) Tính P khi $8a = 8a^2$:**\n` +
`$8a = 8a^2 \\Leftrightarrow 8a^2 - 8a = 0 \\Leftrightarrow 8a(a - 1) = 0$\n` +
`$\\Rightarrow a = 0$ (Loại vì vi phạm ĐKXĐ) hoặc $a = 1$ (Nhận).\n` +
`Thay $a = 1$ vào $P$: $P = \\frac{1 - 4}{1 - 2} = \\frac{-3}{-1} = 3$.`;

  const sol8 = `**1)** $9x^2 - 12x + 4$\n` +
`$= (3x)^2 - 2 \\cdot 3x \\cdot 2 + 2^2$\n` +
`$= (3x - 2)^2$.\n\n` +
`**2)** $2xy + 16 - x^2 - y^2$\n` +
`$= 16 - (x^2 - 2xy + y^2)$\n` +
`$= 4^2 - (x - y)^2$\n` +
`$= (4 - x + y)(4 + x - y)$.\n\n` +
`**3)** $3x + 2x^2 - 2$\n` +
`Sắp xếp và tách hạng tử:\n` +
`$= 2x^2 + 3x - 2$\n` +
`$= 2x^2 + 4x - x - 2$\n` +
`$= 2x(x + 2) - (x + 2)$\n` +
`$= (x + 2)(2x - 1)$.`;

  const sol9 = `**1. Rút gọn biểu thức A:**\n` +
`Điều kiện xác định: $x \\ne \\pm 1$.\n` +
`$A = \\left( \\frac{x + 2}{x + 1} - \\frac{x}{x - 1} \\right) \\cdot \\frac{3(x + 1)}{2}$\n` +
`$A = \\frac{(x + 2)(x - 1) - x(x + 1)}{(x + 1)(x - 1)} \\cdot \\frac{3(x + 1)}{2}$\n` +
`$A = \\frac{x^2 - x + 2x - 2 - x^2 - x}{(x + 1)(x - 1)} \\cdot \\frac{3(x + 1)}{2}$\n` +
`$A = \\frac{-2}{(x + 1)(x - 1)} \\cdot \\frac{3(x + 1)}{2} = \\frac{-3}{x - 1}$.\n\n` +
`**2. Tìm x để A < 0:**\n` +
`$A < 0 \\Leftrightarrow \\frac{-3}{x - 1} < 0$\n` +
`Vì $-3 < 0$ nên để phân thức âm thì mẫu thức $x - 1 > 0 \\Leftrightarrow x > 1$.\n` +
`Kết hợp ĐKXĐ, ta có $x > 1$.\n\n` +
`**3. Tìm x nguyên để A nguyên:**\n` +
`$A = \\frac{-3}{x - 1}$. Để $A \\in \\mathbb{Z}$ thì $x - 1$ phải là ước của $-3$.\n` +
`$U(-3) = \\{1; -1; 3; -3\\}$.\n` +
`- $x - 1 = 1 \\Rightarrow x = 2$ (TM)\n` +
`- $x - 1 = -1 \\Rightarrow x = 0$ (TM)\n` +
`- $x - 1 = 3 \\Rightarrow x = 4$ (TM)\n` +
`- $x - 1 = -3 \\Rightarrow x = -2$ (TM)\n` +
`Vậy $x \\in \\{-2; 0; 2; 4\\}$.`;

  const sol10 = `**a)** $2(4x - 7) = 3(x + 1) + 18$\n` +
`$\\Leftrightarrow 8x - 14 = 3x + 3 + 18$\n` +
`$\\Leftrightarrow 8x - 3x = 21 + 14 \\Leftrightarrow 5x = 35 \\Rightarrow x = 7$.\n\n` +
`**b)** $\\frac{3x + 2}{2} + \\frac{5 - 2x}{3} = \\frac{11}{6}$\n` +
`Quy đồng mẫu số chung là $6$:\n` +
`$\\Leftrightarrow \\frac{3(3x + 2)}{6} + \\frac{2(5 - 2x)}{6} = \\frac{11}{6}$\n` +
`$\\Leftrightarrow 9x + 6 + 10 - 4x = 11$\n` +
`$\\Leftrightarrow 5x = 11 - 16 \\Leftrightarrow 5x = -5 \\Rightarrow x = -1$.\n\n` +
`**c)** $|x - 1| + 7 = 3x \\Leftrightarrow |x - 1| = 3x - 7$ (Điều kiện $3x - 7 \\ge 0 \\Rightarrow x \\ge \\frac{7}{3}$)\n` +
`- TH1: $x - 1 = 3x - 7 \\Leftrightarrow 2x = 6 \\Rightarrow x = 3$ (Thỏa mãn ĐK $x \\ge \\frac{7}{3}$).\n` +
`- TH2: $x - 1 = -3x + 7 \\Leftrightarrow 4x = 8 \\Rightarrow x = 2$ (Không thỏa mãn ĐK $x \\ge \\frac{7}{3}$, loại).\n` +
`Vậy $x = 3$.\n\n` +
`**d)** *(Lưu ý đề bài yêu cầu giải phương trình nhưng dấu lại là bất phương trình $\\le$. Ta coi đây là bài giải bất phương trình)*.\n` +
`$\\frac{x + 2}{x + 3} + \\frac{2x - 1}{x - 3} \\le \\frac{3x + 7}{3}$ (Điều kiện: $x \\ne \\pm 3$)\n` +
`*(Phương pháp: Quy đồng, chuyển vế, xét dấu lập bảng xét dấu của phân thức)*.`;

  const updates = [
    { id: "7d7fb747-e825-4b16-b1d0-703231fec2a9", solution: sol1 },
    { id: "7fc3eca2-e1e6-470e-8573-46400287f5fb", solution: sol2 },
    { id: "8047c2e0-0a02-40b4-8c18-22038291e02d", solution: sol3 },
    { id: "81212b4b-2f6d-46c6-9d64-6c4547174dcd", solution: sol4 },
    { id: "8184b2d4-a9c6-4246-a436-2a56b55e4bbd", solution: sol5 },
    { id: "8344059d-b758-4c82-98c2-4a66f766b2bd", solution: sol6 },
    { id: "86ca2be1-41e0-456f-af45-e707b1265870", solution: sol7 },
    { id: "86dec698-40a1-4875-8dc4-9abecc7f44b6", solution: sol8 },
    { id: "883e915b-f439-4465-8cb4-026aeac2e5d6", solution: sol9 },
    { id: "8b68d454-e65a-4052-b544-fafc9992b915", solution: sol10 }
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

manualFixBatch13Grade8().catch(console.error).finally(() => process.exit(0));
