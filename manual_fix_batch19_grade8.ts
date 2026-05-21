import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function manualFixBatch19Grade8() {
  const sql = getDb();

  const sol1 = `**a) Chia đa thức A cho đa thức B:**\n` +
`Thực hiện phép chia đa thức $A = 4n^3 - 2n^2 - 6n + 5$ cho $B = 2n - 1$:\n` +
`- $(4n^3 - 2n^2) : (2n - 1) = 2n^2$. Nhân ngược lên và trừ: $(4n^3 - 2n^2) - (4n^3 - 2n^2) = 0$.\n` +
`Hạ $-6n + 5$ xuống.\n` +
`- $(-6n + 5) : (2n - 1)$: Lấy $-6n : 2n = -3$. Nhân ngược: $-3(2n - 1) = -6n + 3$. Trừ đi dư: $(-6n + 5) - (-6n + 3) = 2$.\n` +
`Vậy thương của phép chia là $Q = 2n^2 - 3$, dư là $R = 2$.\n` +
`Ta có: $A = (2n - 1)(2n^2 - 3) + 2$.\n\n` +
`**b) Tìm giá trị nguyên của n để A chia hết cho B:**\n` +
`Để đa thức $A$ chia hết cho đa thức $B$ thì phần dư phải chia hết cho $B$, tức là $2 \\vdots (2n - 1)$.\n` +
`Vì $n \\in \\mathbb{Z}$ nên $2n - 1$ là ước số nguyên của $2$. $U(2) = \\{1; -1; 2; -2\\}$.\n` +
`- $2n - 1 = 1 \\Rightarrow 2n = 2 \\Rightarrow n = 1$ (Thỏa mãn)\n` +
`- $2n - 1 = -1 \\Rightarrow 2n = 0 \\Rightarrow n = 0$ (Thỏa mãn)\n` +
`- $2n - 1 = 2 \\Rightarrow 2n = 3 \\Rightarrow n = \\frac{3}{2}$ (Loại)\n` +
`- $2n - 1 = -2 \\Rightarrow 2n = -1 \\Rightarrow n = -\\frac{1}{2}$ (Loại)\n` +
`**Kết luận:** $n \\in \\{0; 1\\}$.`;

  const sol2 = `Ta có phương trình:\n` +
`$\\frac{x + 1}{2x} = 1$\n` +
`Điều kiện xác định: $x \\ne 0$.\n` +
`Nhân cả hai vế với $2x$:\n` +
`$x + 1 = 2x$\n` +
`$\\Leftrightarrow 2x - x = 1$\n` +
`$\\Leftrightarrow x = 1$ (thỏa mãn ĐKXĐ).\n` +
`**Kết luận:** Phân thức có giá trị bằng $1$ khi $x = 1$.`;

  const sol3 = `**a) Chứng minh DE = MH:**\n` +
`Ta có $\\Delta MNP$ vuông tại $M \\Rightarrow \\widehat{M} = 90^\\circ$.\n` +
`$HD \\perp MN \\Rightarrow \\widehat{MDH} = 90^\\circ$.\n` +
`$HE \\perp MP \\Rightarrow \\widehat{MEH} = 90^\\circ$.\n` +
`Tứ giác $MDHE$ có 3 góc vuông nên là hình chữ nhật.\n` +
`Hai đường chéo của hình chữ nhật bằng nhau nên $DE = MH$ (đpcm).\n\n` +
`**b) Chứng minh $\\widehat{OHA} = \\widehat{OEA}$:**\n` +
`Hình chữ nhật $MDHE$ có $O$ là giao điểm 2 đường chéo nên $O$ là trung điểm $MH$ và $DE$, đồng thời $OH = OE \\Rightarrow \\Delta OHE$ cân tại $O \\Rightarrow \\widehat{OHE} = \\widehat{OEH}$.\n` +
`Xét $\\Delta HEP$ vuông tại $E$, có $EA$ là trung tuyến ứng với cạnh huyền $HP$ ($A$ trung điểm $HP$) $\\Rightarrow EA = HA \\Rightarrow \\Delta EHA$ cân tại $A \\Rightarrow \\widehat{AEH} = \\widehat{AHE}$.\n` +
`Ta có $\\widehat{OHA} = \\widehat{MHP} = 90^\\circ$ (vì $MH \\perp NP$).\n` +
`Xét $\\widehat{OEA} = \\widehat{OEH} + \\widehat{HEA} = \\widehat{OHE} + \\widehat{AHE} = \\widehat{MHP} = 90^\\circ$.\n` +
`Vậy $\\widehat{OHA} = \\widehat{OEA} = 90^\\circ$ (đpcm).\n\n` +
`**c) Chứng minh AO vuông góc với MN:**\n` +
`Xét $\\Delta MHP$, $O$ là trung điểm $MH$, $A$ là trung điểm $HP$.\n` +
`$\\Rightarrow OA$ là đường trung bình của $\\Delta MHP \\Rightarrow OA \\parallel MP$.\n` +
`Mà $MP \\perp MN$ (do $\\Delta MNP$ vuông tại $M$).\n` +
`Suy ra $OA \\perp MN$ (đpcm).\n\n` +
`**d) Chứng minh $S_{MNP} = 2S_{DEAI}$:**\n` +
`Ta có diện tích $S_{DEAI} = S_{HDE} + S_{HAE} + S_{HDI}$.\n` +
`Vì $O$ là trung điểm $MH$ và $DE$ nên $S_{HDE} = \\frac{1}{2} S_{MDHE}$.\n` +
`Trong $\\Delta HNP$ vuông tại $M$, $I$ là trung điểm $NH \\Rightarrow S_{HDI} = \\frac{1}{2} S_{HDN}$.\n` +
`Trong $\\Delta HEP$ vuông tại $E$, $A$ là trung điểm $HP \\Rightarrow S_{HAE} = \\frac{1}{2} S_{HEP}$.\n` +
`Từ đó $S_{DEAI} = \\frac{1}{2}(S_{MDHE} + S_{HDN} + S_{HEP})$.\n` +
`Mà tổng diện tích ba hình $MDHE, HDN, HEP$ chính bằng diện tích $\\Delta MNP$.\n` +
`Vậy $S_{DEAI} = \\frac{1}{2} S_{MNP} \\Rightarrow S_{MNP} = 2S_{DEAI}$ (đpcm).`;

  const sol4 = `**a)** $4x^2 - 4xy + y^2$\n` +
`$= (2x)^2 - 2 \\cdot 2x \\cdot y + y^2$\n` +
`$= (2x - y)^2$.\n\n` +
`**b)** $9x^3 - 9x^2y - 4x + 4y$\n` +
`Nhóm 2 hạng tử đầu và 2 hạng tử cuối:\n` +
`$= 9x^2(x - y) - 4(x - y)$\n` +
`$= (x - y)(9x^2 - 4)$\n` +
`$= (x - y)\\left[ (3x)^2 - 2^2 \\right]$\n` +
`$= (x - y)(3x - 2)(3x + 2)$.\n\n` +
`**c)** $x^3 + 2 + 3(x^3 - 2)$\n` +
`Khai triển và thu gọn:\n` +
`$= x^3 + 2 + 3x^3 - 6$\n` +
`$= 4x^3 - 4$\n` +
`$= 4(x^3 - 1)$\n` +
`Áp dụng hằng đẳng thức hiệu hai lập phương:\n` +
`$= 4(x - 1)(x^2 + x + 1)$.`;

  const sol5 = `**a) Chứng minh AKMH là hình chữ nhật:**\n` +
`Ta có $\\widehat{A} = 90^\\circ$ ($\\Delta ABC$ vuông tại $A$).\n` +
`$MH \\perp AB \\Rightarrow \\widehat{MHA} = 90^\\circ$.\n` +
`$MK \\perp AC \\Rightarrow \\widehat{MKA} = 90^\\circ$.\n` +
`Tứ giác $AKMH$ có 3 góc vuông nên là hình chữ nhật.\n\n` +
`**b) Chứng minh BHKM là hình bình hành:**\n` +
`Trong $\\Delta ABC$ vuông, $M$ là trung điểm $BC$, $MK \\perp AC \\Rightarrow MK \\parallel AB$. K là trung điểm $AC$.\n` +
`Tương tự $MH \\parallel AC \\Rightarrow H$ là trung điểm $AB$.\n` +
`$\\Rightarrow MK$ là đường trung bình của $\\Delta ABC \\Rightarrow MK \\parallel BH$ và $MK = \\frac{1}{2}AB = BH$.\n` +
`Tứ giác $BHKM$ có $MK \\parallel BH$ và $MK = BH$ nên là hình bình hành.\n\n` +
`**c) Chứng minh HI = KJ:**\n` +
`Gọi $O$ là giao điểm 2 đường chéo $AM$ và $HK$ của hình chữ nhật $AKMH \\Rightarrow O$ là trung điểm $AM$ và $HK$.\n` +
`Xét $\\Delta AMH$, $AE$ và $HO$ là hai đường trung tuyến cắt nhau tại $I \\Rightarrow I$ là trọng tâm $\\Delta AMH \\Rightarrow HI = \\frac{2}{3}HO$.\n` +
`Xét $\\Delta AMK$, $AF$ và $KO$ là hai đường trung tuyến cắt nhau tại $J \\Rightarrow J$ là trọng tâm $\\Delta AMK \\Rightarrow KJ = \\frac{2}{3}KO$.\n` +
`Mà $HO = KO$ (do $O$ trung điểm $HK$) $\\Rightarrow HI = KJ$ (đpcm).\n\n` +
`**d) Tính độ dài EF:**\n` +
`Xét $\\Delta MHK$ có $E, F$ là trung điểm $MH, MK \\Rightarrow EF$ là đường trung bình $\\Rightarrow EF = \\frac{1}{2}HK$.\n` +
`Vì $AKMH$ là hình chữ nhật nên $HK = AM \\Rightarrow EF = \\frac{1}{2}AM$.\n` +
`Giả sử $\\Delta ABG$ vuông tại $G \\Rightarrow AG \\perp BG$. $AM, BN$ là các trung tuyến cắt nhau tại $G$.\n` +
`Ta có $BG^2 + AG^2 = AB^2 \\Rightarrow \\left( \\frac{2}{3}BN \\right)^2 + \\left( \\frac{2}{3}AM \\right)^2 = AB^2 \\Rightarrow \\frac{4}{9}(BN^2 + AM^2) = AB^2$.\n` +
`Trong $\\Delta ABC$ vuông tại $A$, trung tuyến $BN^2 = AB^2 + \\frac{AC^2}{4}$ và $AM^2 = \\frac{BC^2}{4} = \\frac{AB^2 + AC^2}{4}$.\n` +
`Thay vào: $\\frac{4}{9}\\left( AB^2 + \\frac{AC^2}{4} + \\frac{AB^2 + AC^2}{4} \\right) = AB^2 \\Rightarrow \\frac{4}{9}\\left( \\frac{5}{4}AB^2 + \\frac{2}{4}AC^2 \\right) = AB^2$.\n` +
`$\\Leftrightarrow \\frac{5}{9}AB^2 + \\frac{2}{9}AC^2 = AB^2 \\Leftrightarrow \\frac{2}{9}AC^2 = \\frac{4}{9}AB^2 \\Leftrightarrow AC^2 = 2AB^2$.\n` +
`Vì $AB = 4\\sqrt{3} \\Rightarrow AB^2 = 48 \\Rightarrow AC^2 = 96$.\n` +
`Khi đó $BC^2 = AB^2 + AC^2 = 144 \\Rightarrow BC = 12$ (cm).\n` +
`$AM = \\frac{1}{2}BC = 6$ (cm). Vậy $EF = \\frac{1}{2}AM = 3$ (cm).`;

  const sol6 = `*(Câu hỏi này thiếu hình vẽ minh họa gốc. Dưới đây là phương pháp giải tổng quát để tìm $x, y$ trong các bài toán hình học lớp 8)*\n\n` +
`**Phương pháp chung:**\n` +
`1. **Sử dụng Đường trung bình:** Nếu có đoạn thẳng nối trung điểm 2 cạnh của tam giác, độ dài đoạn đó ($x$) bằng một nửa độ dài cạnh thứ 3 ($y = 2x$). Đối với hình thang, đường trung bình bằng nửa tổng 2 đáy.\n` +
`2. **Sử dụng Định lý Thales:** Nếu có 2 đường thẳng song song tạo thành các đoạn tỉ lệ, lập phương trình $\\frac{a}{b} = \\frac{x}{y}$ để giải.\n` +
`3. **Sử dụng Định lý Pytago:** Nếu hình vẽ là tam giác vuông và đã biết 2 cạnh, cạnh còn lại được tính bằng $x^2 = a^2 + b^2$ (cạnh huyền) hoặc $x^2 = c^2 - a^2$ (cạnh góc vuông).\n` +
`*(Giáo viên sử dụng trực tiếp hình vẽ trên đề để ráp số vào các công thức trên).*`;

  const sol7 = `Ta có phương trình: $(2m - 1)x = m + 8$ (*)\n` +
`Để phương trình vô nghiệm, hệ số của $x$ phải bằng $0$ và hằng số tự do phải khác $0$.\n` +
`Điều kiện 1: Hệ số của $x$ bằng $0$\n` +
`$2m - 1 = 0 \\Leftrightarrow m = \\frac{1}{2}$.\n` +
`Điều kiện 2: Hằng số tự do khác $0$\n` +
`Thay $m = \\frac{1}{2}$ vào vế phải: $\\frac{1}{2} + 8 = \\frac{17}{2} \\ne 0$ (thỏa mãn).\n` +
`Vậy khi $m = \\frac{1}{2}$ thì phương trình trở thành $0x = \\frac{17}{2}$, phương trình này vô nghiệm.\n` +
`**Kết luận:** Phương trình vô nghiệm khi $m = \\frac{1}{2}$.`;

  const sol8 = `*(Đây là câu hỏi trắc nghiệm không có nội dung gốc. Hệ thống tự động phân loại đây là dạng câu hỏi nhận biết / thông hiểu trắc nghiệm khách quan).* \n\n` +
`**Hướng dẫn chung cho giáo viên:**\n` +
`1. Phân tích nội dung câu hỏi để xác định dạng kiến thức (Đại số hoặc Hình học).\n` +
`2. Sử dụng phương pháp loại trừ hoặc tính toán nhanh để chọn phương án $A, B, C$ hoặc $D$.\n` +
`3. Điền đáp án chi tiết tương ứng với đề gốc.`;

  const sol9 = `Từ giả thiết: $(x + y + z)(xy + yz + zx) = xyz$\n` +
`Biến đổi đẳng thức trên:\n` +
`$(x + y + z)(xy + yz + zx) - xyz = 0$\n` +
`$\\Leftrightarrow [(x + y) + z](xy + yz + zx) - xyz = 0$\n` +
`$\\Leftrightarrow (x + y)(xy + yz + zx) + z(xy + yz + zx) - xyz = 0$\n` +
`$\\Leftrightarrow (x + y)(xy + yz + zx) + xyz + yz^2 + z^2x - xyz = 0$\n` +
`$\\Leftrightarrow (x + y)(xy + yz + zx) + z^2(x + y) = 0$\n` +
`$\\Leftrightarrow (x + y)(xy + yz + zx + z^2) = 0$\n` +
`$\\Leftrightarrow (x + y)[y(x + z) + z(x + z)] = 0$\n` +
`$\\Leftrightarrow (x + y)(y + z)(x + z) = 0$\n` +
`Suy ra có 3 trường hợp xảy ra: $x = -y$ hoặc $y = -z$ hoặc $z = -x$.\n` +
`- TH1: Nếu $x = -y$, ta có:\n` +
`Vế trái: $x^{2017} + y^{2017} + z^{2017} = (-y)^{2017} + y^{2017} + z^{2017} = -y^{2017} + y^{2017} + z^{2017} = z^{2017}$.\n` +
`Vế phải: $(x + y + z)^{2017} = (-y + y + z)^{2017} = z^{2017}$.\n` +
`Vậy $VT = VP$.\n` +
`- TH2: Nếu $y = -z$, chứng minh tương tự ta cũng được $VT = VP$.\n` +
`- TH3: Nếu $z = -x$, chứng minh tương tự ta cũng được $VT = VP$.\n` +
`**Kết luận:** Đẳng thức $x^{2017} + y^{2017} + z^{2017} = (x + y + z)^{2017}$ luôn đúng (đpcm).`;

  const sol10 = `Gọi độ dài quãng đường $AB$ là $x$ (km, $x > 0$).\n` +
`Thời gian xe máy đi từ $A$ đến $B$ là: $\\frac{x}{30}$ (giờ).\n` +
`Thời gian xe máy đi từ $B$ về $A$ là: $\\frac{x}{28}$ (giờ).\n` +
`Đổi thời gian: $14$ giờ $30$ phút = $14,5$ giờ = $\\frac{29}{2}$ giờ.\n` +
`Vì tổng thời gian cả đi và về là $14$ giờ $30$ phút, ta có phương trình:\n` +
`$\\frac{x}{30} + \\frac{x}{28} = \\frac{29}{2}$\n` +
`Quy đồng mẫu thức vế trái (Mẫu chung là 420):\n` +
`$\\frac{14x}{420} + \\frac{15x}{420} = \\frac{29}{2}$\n` +
`$\\Leftrightarrow \\frac{29x}{420} = \\frac{29}{2}$\n` +
`$\\Leftrightarrow \\frac{x}{420} = \\frac{1}{2}$\n` +
`$\\Leftrightarrow x = \\frac{420}{2} = 210$ (thỏa mãn ĐK).\n` +
`**Kết luận:** Độ dài quãng đường $AB$ là $210$ km.`;

  const updates = [
    { id: "b3ffc3c6-792b-4285-b5e7-547626478a5d", solution: sol1 },
    { id: "b7f96b9b-46a9-4eb5-9af8-73cb6c269cc8", solution: sol2 },
    { id: "b8636bab-44cb-49b0-b756-f975d09b265d", solution: sol3 },
    { id: "ba8a1d97-4882-4452-8a5d-8d7e765b8cbb", solution: sol4 },
    { id: "bcc99179-2f93-4144-bb8d-2cbe0f70d84d", solution: sol5 },
    { id: "c3faf740-f209-42ac-af12-3ddc701aef02", solution: sol6 },
    { id: "c3ff34e3-8180-4e70-a4ae-aa598513516c", solution: sol7 },
    { id: "c544efe0-5ae6-4a79-8920-ef0fd8db9bdd", solution: sol8 },
    { id: "c5a7e232-d250-45f6-b244-9180ac9e5e23", solution: sol9 },
    { id: "c623482a-1b6e-4247-9ae0-bd9de48b662f", solution: sol10 }
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

manualFixBatch19Grade8().catch(console.error).finally(() => process.exit(0));
