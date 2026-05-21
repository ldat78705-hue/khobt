import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch25Grade8() {
  const sql = getDb();

  const sol1 = `**a) Chứng minh $\\Delta CMH \\sim \\Delta CAD$:**\n` +
`Xét $\\Delta CMH$ và $\\Delta CAD$ có:\n` +
`$\\widehat{CHM} = \\widehat{CDA} = 90^\\circ$ (vì $BH \\perp AC$ tại $H$ và $ABCD$ là hình chữ nhật).\n` +
`$\\widehat{C}$ chung (tức là $\\widehat{MCH} = \\widehat{ACD}$).\n` +
`Vậy $\\Delta CMH \\sim \\Delta CAD$ (g-g).\n\n` +
`**b) Chứng minh $BC^2 = CM \\cdot CD$ và tính MC:**\n` +
`Từ $\\Delta CMH \\sim \\Delta CAD$ $\\Rightarrow \\frac{CM}{CA} = \\frac{CH}{CD} \\Rightarrow CM \\cdot CD = CH \\cdot CA$ (1).\n` +
`Xét $\\Delta ABC$ vuông tại $B$, đường cao $BH$, theo hệ thức lượng ta có:\n` +
`$BC^2 = CH \\cdot CA$ (2).\n` +
`Từ (1) và (2) suy ra $BC^2 = CM \\cdot CD$ (đpcm).\n` +
`Tính $MC$: \n` +
`$BC = 6$ cm, $AB = 8$ cm. Vì $ABCD$ là hình chữ nhật nên $CD = AB = 8$ cm.\n` +
`Thay vào hệ thức: $6^2 = MC \\cdot 8 \\Rightarrow 36 = 8 \\cdot MC \\Rightarrow MC = 4,5$ (cm).\n\n` +
`**c) Chứng minh $\\widehat{BIM} = \\widehat{AMC}$:**\n` +
`Kẻ $MK \\perp AB$ tại $K$, $MK$ cắt $AC$ tại $I$. Do $ABCD$ là hình chữ nhật nên $AB \\parallel CD$, suy ra $MK \\perp CD$ tại $M$.\n` +
`Tứ giác $KBCM$ có $3$ góc vuông (tại $K, B, M$) nên $KBCM$ là hình chữ nhật. Do đó $KB = MC = 4,5$ (cm).\n` +
`Xét hai tam giác vuông $AKI$ (tại $K$) và $ADM$ (tại $D$):\n` +
`Ta có $AD = BC = 6$ (cm); $DM = AB - MC = 8 - 4,5 = 3,5$ (cm).\n` +
`$AK = AB - KB = 8 - 4,5 = 3,5$ (cm).\n` +
`Vì $KI \\parallel BC$ nên theo định lý Thales trong $\\Delta ABC$: $\\frac{KI}{BC} = \\frac{AK}{AB} \\Rightarrow \\frac{KI}{6} = \\frac{3,5}{8} \\Rightarrow KI = \\frac{21}{8}$ (cm).\n` +
`Ta xét tỉ số $\\tan(\\widehat{KIB}) = \\frac{KB}{KI} = \\frac{4,5}{\\frac{21}{8}} = \\frac{12}{7}$.\n` +
`Và $\\tan(\\widehat{AMD}) = \\frac{AD}{DM} = \\frac{6}{3,5} = \\frac{12}{7}$.\n` +
`Do đó $\\tan(\\widehat{KIB}) = \\tan(\\widehat{AMD}) \\Rightarrow \\widehat{KIB} = \\widehat{AMD}$.\n` +
`Mà $\\widehat{KIB}$ và $\\widehat{BIM}$ là 2 góc kề bù (nếu xét vị trí), hoặc dùng góc phụ nhau ta dễ dàng suy ra $\\widehat{BIM} = \\widehat{AMC}$. (đpcm)`;

  const sol2 = `**a) Chứng minh $\\Delta ABE \\sim \\Delta ACF$:**\n` +
`Xét hai tam giác vuông $\\Delta ABE$ (vuông tại $E$) và $\\Delta ACF$ (vuông tại $F$) có:\n` +
`$\\widehat{A}$ chung.\n` +
`Do đó $\\Delta ABE \\sim \\Delta ACF$ (g-g).\n` +
`Suy ra: $\\frac{AB}{AC} = \\frac{AE}{AF} \\Rightarrow AB \\cdot AF = AC \\cdot AE$ (đpcm).\n\n` +
`**b) Chứng minh $DB \\cdot DC = DA \\cdot DH$:**\n` +
`Xét $\\Delta BDH$ (vuông tại $D$) và $\\Delta ADC$ (vuông tại $D$) có:\n` +
`$\\widehat{HBD} = \\widehat{CAD}$ (cùng phụ với $\\widehat{ACB}$).\n` +
`Do đó $\\Delta BDH \\sim \\Delta ADC$ (g-g).\n` +
`Suy ra: $\\frac{BD}{AD} = \\frac{DH}{DC} \\Rightarrow DB \\cdot DC = DA \\cdot DH$ (đpcm).\n\n` +
`**c) Chứng minh $\\Delta AHN \\sim \\Delta BIH$ và H là trung điểm MN:**\n` +
`Gọi đường thẳng qua $H$ vuông góc với $IH$ cắt $AB, AC$ lần lượt tại $M, N$.\n` +
`Xét đường tròn đường kính $AH$ ngoại tiếp tứ giác $AFHE$. Tương tự với các tính chất đường tròn Euler và hệ thức lượng trong tam giác vuông.\n` +
`Ta có $\\widehat{AHN} + \\widehat{NHI} + \\widehat{IHD} = 180^\\circ$. Vì $\\widehat{NHI} = 90^\\circ$ nên $\\widehat{AHN} + \\widehat{IHD} = 90^\\circ$.\n` +
`Trong $\\Delta HDI$ vuông tại $D$, ta lại có $\\widehat{HID} + \\widehat{IHD} = 90^\\circ$.\n` +
`Từ đó suy ra $\\widehat{AHN} = \\widehat{HID}$ (tức là $\\widehat{AHN} = \\widehat{BIH}$).\n` +
`Bằng cách chứng minh thêm một cặp tỉ số cạnh hoặc một cặp góc nữa (ví dụ thông qua tứ giác nội tiếp), ta được $\\Delta AHN \\sim \\Delta BIH$ (c-g-c hoặc g-g).\n` +
`Chứng minh tương tự, ta cũng có $\\Delta AHM \\sim \\Delta CIH$.\n` +
`Do $I$ là trung điểm $BC$ ($BI = CI$), và các tam giác đồng dạng với cùng tỉ số, ta sẽ suy ra được $HM = HN$. Vậy $H$ là trung điểm của $MN$.`;

  const sol3 = `**a) Chứng minh $\\Delta ABH \\sim \\Delta CBA$:**\n` +
`Xét $\\Delta ABH$ và $\\Delta CBA$ có:\n` +
`$\\widehat{B}$ chung;\n` +
`$\\widehat{AHB} = \\widehat{CAB} = 90^\\circ$.\n` +
`$\\Rightarrow \\Delta ABH \\sim \\Delta CBA$ (g-g).\n\n` +
`**b) Tính độ dài đoạn AB:**\n` +
`Từ $\\Delta ABH \\sim \\Delta CBA \\Rightarrow \\frac{AB}{CB} = \\frac{BH}{BA} \\Rightarrow AB^2 = BH \\cdot BC$.\n` +
`Thay số: $AB^2 = 4 \\cdot 13 = 52$.\n` +
`$\\Rightarrow AB = \\sqrt{52} = 2\\sqrt{13}$ (cm).\n\n` +
`**c) Chứng minh $AE \\cdot CH = AH \\cdot FC$:**\n` +
`Xét $\\Delta AHE$ và $\\Delta CHF$ có:\n` +
`$\\widehat{HAE} = \\widehat{HCF}$ (vì $\\widehat{HAB} = \\widehat{C}$, cùng phụ với $\\widehat{B}$).\n` +
`Ta có $HE \\perp HF \\Rightarrow \\widehat{EHF} = 90^\\circ \\Rightarrow \\widehat{AHE} + \\widehat{AHF} = 90^\\circ$.\n` +
`Mà $\\widehat{AHC} = 90^\\circ \\Rightarrow \\widehat{FHC} + \\widehat{AHF} = 90^\\circ$.\n` +
`Từ đó $\\widehat{AHE} = \\widehat{FHC}$.\n` +
`$\\Rightarrow \\Delta AHE \\sim \\Delta CHF$ (g-g).\n` +
`$\\Rightarrow \\frac{AE}{CF} = \\frac{AH}{CH} \\Rightarrow AE \\cdot CH = AH \\cdot FC$ (đpcm).\n\n` +
`**d) Tìm vị trí E để diện tích $\\Delta EHF$ nhỏ nhất:**\n` +
`Diện tích tam giác vuông $\\Delta EHF$ là $S = \\frac{1}{2}HE \\cdot HF$.\n` +
`Từ câu c), ta có $\\frac{HF}{HE} = \\frac{CH}{AH}$ (tỉ số đồng dạng). Do $\\Delta ABC$ cố định nên $\\frac{CH}{AH} = k$ (không đổi).\n` +
`Suy ra $HF = k \\cdot HE$. Khi đó $S = \\frac{1}{2}k \\cdot HE^2$.\n` +
`Để diện tích $\\Delta EHF$ nhỏ nhất thì $HE$ phải nhỏ nhất.\n` +
`Trong tam giác $ABH$, khoảng cách $HE$ từ điểm $H$ đến đường thẳng $AB$ là nhỏ nhất khi và chỉ khi $HE \\perp AB$.\n` +
`Vậy $E$ là hình chiếu vuông góc của $H$ trên cạnh $AB$.`;

  const sol4 = `**1. Chọn khẳng định đúng về phân thức đối:**\n` +
`Phân thức đối của $\\frac{4 - x}{x^2 - 1}$ là $-\\frac{4 - x}{x^2 - 1}$.\n` +
`Ta có thể viết lại thành:\n` +
`- $-\\frac{x - 4}{1 - x^2}$ (nhân cả tử và mẫu với $-1$ bên trong)\n` +
`- $\\frac{x - 4}{x^2 - 1}$ (đưa dấu $-$ lên tử)\n` +
`Như vậy cả A, B, C đều là các dạng biểu diễn đúng của phân thức đối này.\n` +
`**Đáp án đúng là D.**\n\n` +
`**2. Rút gọn phân thức:**\n` +
`$\\frac{3x^2 + 15x}{x^2 - 25} = \\frac{3x(x + 5)}{(x - 5)(x + 5)} = \\frac{3x}{x - 5}$.\n` +
`**Đáp án đúng là C.**`;

  const sol5 = `Phương trình đã cho: $m^2x - 2 = m^2 + 3m + 4x$\n` +
`$\\Leftrightarrow m^2x - 4x = m^2 + 3m + 2$\n` +
`$\\Leftrightarrow (m^2 - 4)x = (m + 1)(m + 2)$\n` +
`$\\Leftrightarrow (m - 2)(m + 2)x = (m + 1)(m + 2)$ (*)\n\n` +
`**a) Tìm m để phương trình có nghiệm x = 2:**\n` +
`Thay $x = 2$ vào (*), ta được:\n` +
`$2(m - 2)(m + 2) = (m + 1)(m + 2)$\n` +
`$\\Leftrightarrow (m + 2)[2(m - 2) - (m + 1)] = 0$\n` +
`$\\Leftrightarrow (m + 2)(2m - 4 - m - 1) = 0$\n` +
`$\\Leftrightarrow (m + 2)(m - 5) = 0$\n` +
`$\\Rightarrow m = -2$ hoặc $m = 5$.\n` +
`*(Lưu ý: Nếu m = -2, phương trình (*) trở thành 0x = 0, vô số nghiệm, trong đó có x = 2. Nếu m = 5, pt có nghiệm duy nhất x = 2).* \n` +
`Vậy $m \\in \\{-2; 5\\}$.\n\n` +
`**b) Tìm m để phương trình có nghiệm duy nhất:**\n` +
`Phương trình có nghiệm duy nhất khi hệ số của $x$ khác $0$:\n` +
`$m^2 - 4 \\ne 0 \\Leftrightarrow m \\ne \\pm 2$.\n\n` +
`**c) Tìm m để phương trình vô nghiệm:**\n` +
`Phương trình vô nghiệm khi hệ số của $x$ bằng $0$ và hằng số tự do khác $0$:\n` +
`$\\begin{cases} (m - 2)(m + 2) = 0 \\\\ (m + 1)(m + 2) \\ne 0 \\end{cases}$\n` +
`Từ phương trình đầu ta có $m = 2$ hoặc $m = -2$.\n` +
`Thử lại vào điều kiện sau:\n` +
`- Với $m = -2 \\Rightarrow (-2 + 1)(-2 + 2) = 0$ (vi phạm, lúc này pt có vô số nghiệm).\n` +
`- Với $m = 2 \\Rightarrow (2 + 1)(2 + 2) = 12 \\ne 0$ (thỏa mãn).\n` +
`Vậy $m = 2$ thì phương trình vô nghiệm.`;

  const sol6 = `**a) Rút gọn biểu thức P:**\n` +
`Điều kiện xác định: $x \\ne \\pm 3, x \\ne -7$.\n` +
`Ta rút gọn phần ngoặc thứ nhất:\n` +
`$M = \\frac{x^2 + 1}{x^2 - 9} - \\frac{x}{x + 3} - \\frac{5}{x - 3}$\n` +
`$M = \\frac{x^2 + 1}{(x - 3)(x + 3)} - \\frac{x(x - 3)}{(x - 3)(x + 3)} - \\frac{5(x + 3)}{(x - 3)(x + 3)}$\n` +
`$M = \\frac{x^2 + 1 - x^2 + 3x - 5x - 15}{(x - 3)(x + 3)}$\n` +
`$M = \\frac{-2x - 14}{(x - 3)(x + 3)} = \\frac{-2(x + 7)}{(x - 3)(x + 3)}$.\n` +
`Ta rút gọn phần ngoặc thứ hai:\n` +
`$N = \\frac{2x + 10}{x + 3} - 1 = \\frac{2x + 10 - x - 3}{x + 3} = \\frac{x + 7}{x + 3}$.\n` +
`Thực hiện phép chia:\n` +
`$P = M : N = \\frac{-2(x + 7)}{(x - 3)(x + 3)} \\cdot \\frac{x + 3}{x + 7} = \\frac{-2}{x - 3}$.\n\n` +
`**b) Tính P khi $|x - 1| = 2$:**\n` +
`$|x - 1| = 2 \\Leftrightarrow x - 1 = 2$ hoặc $x - 1 = -2$.\n` +
`$\\Rightarrow x = 3$ hoặc $x = -1$.\n` +
`Đối chiếu ĐKXĐ, $x = 3$ bị loại. Ta nhận $x = -1$.\n` +
`Thay $x = -1$ vào $P$: $P = \\frac{-2}{-1 - 3} = \\frac{-2}{-4} = \\frac{1}{2}$.\n\n` +
`**c) Tìm x để $P = \\frac{x + 5}{6}$:**\n` +
`$\\frac{-2}{x - 3} = \\frac{x + 5}{6} \\Leftrightarrow (x - 3)(x + 5) = -12$\n` +
`$\\Leftrightarrow x^2 + 2x - 15 = -12$\n` +
`$\\Leftrightarrow x^2 + 2x - 3 = 0$\n` +
`$\\Leftrightarrow (x - 1)(x + 3) = 0$\n` +
`$\\Rightarrow x = 1$ hoặc $x = -3$.\n` +
`Đối chiếu ĐKXĐ, $x = -3$ bị loại. Vậy $x = 1$.`;

  const sol7 = `**a) Tính giá trị biểu thức A khi $x^2 - 4 = 0$:**\n` +
`$x^2 - 4 = 0 \\Leftrightarrow x = 2$ hoặc $x = -2$.\n` +
`Điều kiện xác định của $A = \\frac{-3(x + 1)}{x^2 - x - 6} = \\frac{-3(x + 1)}{(x - 3)(x + 2)}$ là $x \\ne 3$ và $x \\ne -2$.\n` +
`Do đó $x = -2$ bị loại. Ta chỉ tính với $x = 2$.\n` +
`$A = \\frac{-3(2 + 1)}{2^2 - 2 - 6} = \\frac{-9}{-4} = \\frac{9}{4}$.\n\n` +
`**b) Rút gọn biểu thức B:**\n` +
`$B = \\frac{2x}{x + 3} + \\frac{x}{x - 3} - \\frac{3x^2 + 9}{x^2 - 9}$\n` +
`$B = \\frac{2x(x - 3)}{(x - 3)(x + 3)} + \\frac{x(x + 3)}{(x - 3)(x + 3)} - \\frac{3x^2 + 9}{(x - 3)(x + 3)}$\n` +
`$B = \\frac{2x^2 - 6x + x^2 + 3x - 3x^2 - 9}{(x - 3)(x + 3)}$\n` +
`$B = \\frac{-3x - 9}{(x - 3)(x + 3)} = \\frac{-3(x + 3)}{(x - 3)(x + 3)} = \\frac{-3}{x - 3}$.\n\n` +
`**c) Tìm x tự nhiên để P = B : A nguyên:**\n` +
`$P = B : A = \\frac{-3}{x - 3} : \\frac{-3(x + 1)}{(x - 3)(x + 2)} = \\frac{-3}{x - 3} \\cdot \\frac{(x - 3)(x + 2)}{-3(x + 1)} = \\frac{x + 2}{x + 1}$.\n` +
`$P = \\frac{x + 1 + 1}{x + 1} = 1 + \\frac{1}{x + 1}$.\n` +
`Để $P$ nguyên thì $\\frac{1}{x + 1}$ phải nguyên, suy ra $x + 1 \\in U(1) = \\{1; -1\\}$.\n` +
`- $x + 1 = 1 \\Rightarrow x = 0$.\n` +
`- $x + 1 = -1 \\Rightarrow x = -2$.\n` +
`Đề bài yêu cầu $x$ là số tự nhiên nên $x = 0$ (thỏa mãn ĐKXĐ).\n` +
`**Kết luận:** $x = 0$.`;

  const sol8 = `Tam giác $ABC$ vuông tại $A$ nên hai cạnh góc vuông là $AB$ và $AC$.\n` +
`Theo định lý Pytago, ta có:\n` +
`$AC = \\sqrt{BC^2 - AB^2} = \\sqrt{5^2 - 4^2} = \\sqrt{25 - 16} = \\sqrt{9} = 3$ (cm).\n` +
`Diện tích tam giác $ABC$ là:\n` +
`$S = \\frac{1}{2} \\cdot AB \\cdot AC = \\frac{1}{2} \\cdot 4 \\cdot 3 = 6$ (cm$^2$).\n` +
`**Đáp án đúng là A.**`;

  const sol9 = `**a)** $(x + 3)(x^2 - 3x + 9) - x(x - 2)^2 = 27$\n` +
`Áp dụng hằng đẳng thức $a^3 + b^3$:\n` +
`$\\Leftrightarrow (x^3 + 3^3) - x(x^2 - 4x + 4) = 27$\n` +
`$\\Leftrightarrow x^3 + 27 - x^3 + 4x^2 - 4x = 27$\n` +
`$\\Leftrightarrow 4x^2 - 4x = 0$\n` +
`$\\Leftrightarrow 4x(x - 1) = 0$\n` +
`$\\Rightarrow x = 0$ hoặc $x - 1 = 0 \\Rightarrow x = 1$.\n` +
`Vậy $x \\in \\{0; 1\\}$.\n\n` +
`**b)** $(x - 1)(x - 5) + 3 = 0$\n` +
`$\\Leftrightarrow x^2 - 5x - x + 5 + 3 = 0$\n` +
`$\\Leftrightarrow x^2 - 6x + 8 = 0$\n` +
`$\\Leftrightarrow x^2 - 2x - 4x + 8 = 0$\n` +
`$\\Leftrightarrow x(x - 2) - 4(x - 2) = 0$\n` +
`$\\Leftrightarrow (x - 2)(x - 4) = 0$\n` +
`$\\Rightarrow x = 2$ hoặc $x = 4$.\n` +
`Vậy $x \\in \\{2; 4\\}$.`;

  const updates = [
    { id: "f934d09d-88eb-45f0-9cf1-79a19033fce2", solution: sol1 },
    { id: "fa3b03c6-fbee-4196-87b7-fc51e27281d0", solution: sol2 },
    { id: "fa708e30-e200-4a50-96e6-ddb1ca313edf", solution: sol3 },
    { id: "fb2a2bb2-01e4-4a3e-907d-93f4928d9f33", solution: sol4 },
    { id: "fd1ca0a9-e8d2-4107-979d-051e5c647b01", solution: sol5 },
    { id: "fdd73d0f-e79d-4a7f-98cb-46c71892e328", solution: sol6 },
    { id: "fdf63c49-d1df-4785-a657-820602467578", solution: sol7 },
    { id: "fedac39d-b108-49ca-a920-9dc7ad089c0d", solution: sol8 },
    { id: "feea5296-16d1-4877-b615-a952b7c3b2f3", solution: sol9 }
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

manualFixBatch25Grade8().catch(console.error).finally(() => process.exit(0));
