const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 7;
const B = [
  { id: '7b3c6ad3-82a3-4fdc-8aa7-d8e066354d18', p: 'T7-C2BTC', t: 'so_hoc', q: [
    { c: `Viết các số sau dưới dạng số thập phân: $\\dfrac{3}{8}$; $\\dfrac{5}{6}$; $\\dfrac{7}{11}$.`, a: `$0{,}375$; $0{,}8\\overline{3}$; $0{,}\\overline{63}$.`, s: `$\\frac{3}{8} = 0{,}375$ (hữu hạn).\n$\\frac{5}{6} = 0{,}8333... = 0{,}8\\overline{3}$ (vô hạn tuần hoàn).\n$\\frac{7}{11} = 0{,}6363... = 0{,}\\overline{63}$.`, d: 'nhan_biet' },
    { c: `So sánh $\\sqrt{5}$ và $2{,}3$.`, a: `$\\sqrt{5} < 2{,}3$.`, s: `$\\sqrt{5} \\approx 2{,}236$. Vì $2{,}236 < 2{,}3$ nên $\\sqrt{5} < 2{,}3$.`, d: 'nhan_biet' },
    { c: `Tìm $x$ biết $x^2 = 49$.`, a: `$x = \\pm 7$.`, s: `$x^2 = 49 \\Rightarrow x = 7$ hoặc $x = -7$.`, d: 'nhan_biet' },
    { c: `Tính: $\\left(-\\dfrac{2}{3}\\right)^3 \\times \\left(\\dfrac{3}{2}\\right)^2$.`, a: `$-\\dfrac{2}{3}$.`, s: `$= \\dfrac{-8}{27} \\times \\dfrac{9}{4} = \\dfrac{-72}{108} = -\\dfrac{2}{3}$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $|x - 2| = 3{,}5$.`, a: `$x = 5{,}5$ hoặc $x = -1{,}5$.`, s: `$x - 2 = 3{,}5 \\Rightarrow x = 5{,}5$.\n$x - 2 = -3{,}5 \\Rightarrow x = -1{,}5$.`, d: 'thong_hieu' },
    { c: `Biểu diễn $0{,}\\overline{142857}$ dưới dạng phân số.`, a: `$\\dfrac{1}{7}$.`, s: `$x = 0{,}142857...$. $10^6 x = 142857{,}142857...$\n$999999x = 142857 \\Rightarrow x = \\frac{142857}{999999} = \\frac{1}{7}$.`, d: 'thong_hieu' },
    { c: `CMR $\\sqrt{3}$ là số vô tỉ.`, a: `Chứng minh phản chứng.`, s: `Giả sử $\\sqrt{3} = \\frac{a}{b}$ tối giản. Thì $3b^2 = a^2$, nên $3 | a^2$ → $3|a$, đặt $a = 3k$.\n$3b^2 = 9k^2 \\Rightarrow b^2 = 3k^2$ → $3|b$. Vậy $3|a$ và $3|b$, mâu thuẫn tối giản. $\\blacksquare$`, d: 'van_dung' },
    { c: `Tính: $\\left(1 + \\dfrac{1}{2}\\right)\\left(1 + \\dfrac{1}{3}\\right)\\cdots\\left(1 + \\dfrac{1}{9}\\right)$.`, a: `$5$.`, s: `$= \\frac{3}{2} \\cdot \\frac{4}{3} \\cdot \\frac{5}{4} \\cdots \\frac{10}{9} = \\frac{10}{2} = 5$ (telescoping).`, d: 'van_dung' },
    { c: `Tìm $x \\in \\mathbb{R}$: $|x-1| + |x-3| = 4$.`, a: `$x \\le 1$ hoặc $x \\ge 3$.`, s: `$|x-1|+|x-3| \\ge |(x-1)-(x-3)| = 2$. Bằng $4$:\nKhi $x \\le 1$: $(1-x)+(3-x)=4 \\Rightarrow 4-2x=4 \\Rightarrow x=0$ ✓ (và mọi $x \\le 1$: $4-2x=4$ chỉ khi $x=0$).\nSửa: $x \\le 1$: $4-2x = 4 \\Rightarrow x = 0$.\n$1 < x < 3$: $(x-1)+(3-x) = 2 \\neq 4$.\n$x \\ge 3$: $2x-4=4 \\Rightarrow x=4$.\nĐáp án: $x \\in \\{0, 4\\}$.`, d: 'van_dung_cao' },
    { c: `Tính: $\\dfrac{1}{1 \\times 3} + \\dfrac{1}{3 \\times 5} + \\ldots + \\dfrac{1}{(2n-1)(2n+1)}$.`, a: `$\\dfrac{n}{2n+1}$.`, s: `$\\frac{1}{(2k-1)(2k+1)} = \\frac{1}{2}\\left(\\frac{1}{2k-1}-\\frac{1}{2k+1}\\right)$.\nTổng $= \\frac{1}{2}\\left(1 - \\frac{1}{2n+1}\\right) = \\frac{n}{2n+1}$.`, d: 'van_dung_cao' },
  ]},
  { id: 'bbfdc347-0168-42ca-8265-290017b13697', p: 'T7-C3B10', t: 'hinh_hoc', q: [
    { c: `Phát biểu tiên đề Euclid về đường thẳng song song.`, a: `Qua một điểm ngoài đường thẳng, có duy nhất một đường thẳng song song.`, s: `**Tiên đề Euclid**: Qua một điểm nằm ngoài một đường thẳng, có một và chỉ một đường thẳng song song với đường thẳng đã cho.`, d: 'nhan_biet' },
    { c: `Cho $a \\parallel b$ và $c$ cắt $a$. Hỏi $c$ có cắt $b$ không?`, a: `Có.`, s: `Nếu $a \\parallel b$ và $c$ cắt $a$ thì $c$ cắt $b$. Vì nếu $c \\parallel b$ thì do $a \\parallel b$ suy ra $c \\parallel a$ (mâu thuẫn với $c$ cắt $a$).`, d: 'nhan_biet' },
    { c: `Cho $a \\parallel b$, đường thẳng $c$ cắt $a$ và $b$. Một cặp góc so le trong bằng $65°$. Tìm góc so le trong còn lại.`, a: `$65°$.`, s: `Hai góc so le trong bằng nhau khi $a \\parallel b$. Vậy góc còn lại $= 65°$.`, d: 'nhan_biet' },
    { c: `$a \\parallel b$, $c$ cắt $a, b$. Góc đồng vị $= 110°$. Tìm góc trong cùng phía.`, a: `$70°$.`, s: `Góc đồng vị $= 110°$. Góc trong cùng phía bù với góc đồng vị: $180° - 110° = 70°$.`, d: 'thong_hieu' },
    { c: `$a \\parallel b \\parallel c$. Đường cắt tạo với $a$ góc $50°$. Tìm góc tạo với $c$.`, a: `$50°$ (so le trong hoặc đồng vị).`, s: `Vì $a \\parallel c$ nên góc đồng vị bằng nhau $= 50°$.`, d: 'thong_hieu' },
    { c: `$a \\parallel b$, $c \\perp a$. CMR $c \\perp b$.`, a: `$c \\perp b$.`, s: `$c \\perp a$ → $c$ cắt $a$ tạo góc $90°$. Vì $a \\parallel b$, góc đồng vị $= 90°$ → $c \\perp b$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `$a \\parallel b$, cát tuyến cắt $a$ tại $A$, $b$ tại $B$. $\\widehat{A_1} = 3x + 10°$, $\\widehat{B_1} = 5x - 20°$ (so le trong). Tìm $x$.`, a: `$x = 15°$.`, s: `So le trong: $3x+10 = 5x-20 \\Rightarrow 2x = 30 \\Rightarrow x = 15°$.`, d: 'van_dung' },
    { c: `Cho $\\widehat{A}$ và $\\widehat{B}$ là hai góc trong cùng phía, $\\widehat{A} - \\widehat{B} = 40°$. Tìm $\\widehat{A}, \\widehat{B}$.`, a: `$\\widehat{A} = 110°, \\widehat{B} = 70°$.`, s: `$\\widehat{A} + \\widehat{B} = 180°$ và $\\widehat{A} - \\widehat{B} = 40°$.\n$2\\widehat{A} = 220° \\Rightarrow \\widehat{A} = 110°$, $\\widehat{B} = 70°$.`, d: 'van_dung' },
    { c: `CMR nếu hai đường thẳng cùng song song với đường thẳng thứ ba thì chúng song song với nhau.`, a: `$a \\parallel c, b \\parallel c \\Rightarrow a \\parallel b$.`, s: `Giả sử $a$ cắt $b$ tại $M$. Thì qua $M$ có hai đường thẳng ($a$ và $b$) cùng song song $c$, mâu thuẫn tiên đề Euclid. Vậy $a \\parallel b$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$a \\parallel b$. Điểm $M$ giữa $a, b$. $MA$ cắt $a$, $MB$ cắt $b$. $\\widehat{MAa} = 40°$, $\\widehat{MBb} = 60°$. Tính $\\widehat{AMB}$.`, a: `$100°$.`, s: `Qua $M$ kẻ $c \\parallel a \\parallel b$. $\\widehat{AMc} = 40°$ (so le trong với $\\widehat{MAa}$).\n$\\widehat{BMc} = 60°$ (so le trong với $\\widehat{MBb}$).\n$\\widehat{AMB} = 40° + 60° = 100°$.`, d: 'van_dung_cao' },
  ]},
  { id: 'fda54110-2d5b-4249-9df0-6d718a094df5', p: 'T7-C3BTC', t: 'hinh_hoc', q: [
    { c: `Hai góc đối đỉnh có tính chất gì?`, a: `Bằng nhau.`, s: `Hai góc đối đỉnh luôn bằng nhau.`, d: 'nhan_biet' },
    { c: `$a \\perp b$. Góc giữa $a$ và $b$ bằng bao nhiêu?`, a: `$90°$.`, s: `Hai đường thẳng vuông góc tạo thành $4$ góc vuông $= 90°$.`, d: 'nhan_biet' },
    { c: `Nêu dấu hiệu nhận biết hai đường thẳng song song bằng cặp góc so le trong.`, a: `Hai góc so le trong bằng nhau.`, s: `Nếu đường thẳng $c$ cắt $a, b$ tạo cặp góc so le trong bằng nhau thì $a \\parallel b$.`, d: 'nhan_biet' },
    { c: `$a \\parallel b$, cát tuyến cắt tạo góc đồng vị $= 75°$. Tìm tất cả các góc.`, a: `$75°, 75°, 105°, 105°$ (mỗi giao điểm).`, s: `Tại mỗi giao điểm: $75°$ và $180° - 75° = 105°$ (kề bù).\nGóc đồng vị: $75° = 75°$, $105° = 105°$.`, d: 'thong_hieu' },
    { c: `Cho tam giác $ABC$. Kẻ $d \\parallel BC$ qua $A$. CMR tổng ba góc tam giác $= 180°$.`, a: `Dùng góc so le trong.`, s: `$d \\parallel BC$, $AB$ cắt → $\\widehat{BAd_1} = \\widehat{B}$ (so le trong). $AC$ cắt → $\\widehat{CAd_2} = \\widehat{C}$.\n$\\widehat{BAd_1} + \\widehat{A} + \\widehat{CAd_2} = 180°$ (góc bẹt) → $\\widehat{A}+\\widehat{B}+\\widehat{C} = 180°$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `$\\widehat{xOy} = 120°$, $Oz$ phân giác. Tính $\\widehat{xOz}$.`, a: `$60°$.`, s: `$\\widehat{xOz} = \\frac{120°}{2} = 60°$.`, d: 'thong_hieu' },
    { c: `Hai đường thẳng cắt nhau tạo góc $70°$. Tìm tia phân giác mỗi góc.`, a: `$35°$ và $55°$.`, s: `Góc $70°$ → phân giác chia thành $35°$. Góc kề bù $110°$ → phân giác $55°$. Hai phân giác vuông góc nhau.`, d: 'van_dung' },
    { c: `Cho $a \\parallel b$, cát tuyến $c$. Tia phân giác các góc so le trong tạo với nhau góc bao nhiêu?`, a: `Song song.`, s: `Hai góc so le trong bằng nhau $= \\alpha$. Phân giác chia mỗi góc thành $\\frac{\\alpha}{2}$. Hai phân giác tạo cặp góc so le trong bằng $\\frac{\\alpha}{2}$ → song song.`, d: 'van_dung' },
    { c: `Cho tam giác $ABC$, $\\widehat{A} = 60°$. Tia phân giác $\\widehat{B}$ và $\\widehat{C}$ cắt nhau tại $I$. Tính $\\widehat{BIC}$.`, a: `$120°$.`, s: `$\\widehat{B} + \\widehat{C} = 180° - 60° = 120°$.\n$\\widehat{IBC} + \\widehat{ICB} = 60°$.\n$\\widehat{BIC} = 180° - 60° = 120°$.`, d: 'van_dung_cao' },
    { c: `$a \\parallel b$, $M$ giữa $a, b$. Chứng minh $\\widehat{AMB} = \\widehat{MAa} + \\widehat{MBb}$ (góc so le trong tương ứng).`, a: `Kẻ $c \\parallel a$ qua $M$.`, s: `Kẻ $c \\parallel a \\parallel b$ qua $M$. $\\widehat{AMc} = \\widehat{MAa}$ (so le trong), $\\widehat{BMc} = \\widehat{MBb}$ (so le trong).\n$\\widehat{AMB} = \\widehat{AMc} + \\widehat{BMc} = \\widehat{MAa} + \\widehat{MBb}$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: '448a98a5-de09-4071-8cf0-490f344416b9', p: 'T7-C4B13', t: 'tam_giac', q: [
    { c: `Phát biểu trường hợp bằng nhau cạnh-cạnh-cạnh (c.c.c) của tam giác.`, a: `Hai tam giác có ba cạnh tương ứng bằng nhau thì bằng nhau.`, s: `Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác bằng nhau (c.c.c).`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$ và $\\triangle DEF$ có $AB = DE = 5$, $BC = EF = 7$, $AC = DF = 8$. Hai tam giác có bằng nhau không?`, a: `Có, $\\triangle ABC = \\triangle DEF$ (c.c.c).`, s: `Ba cạnh tương ứng bằng nhau: $AB=DE$, $BC=EF$, $AC=DF$ → $\\triangle ABC = \\triangle DEF$ (c.c.c).`, d: 'nhan_biet' },
    { c: `Khi $\\triangle ABC = \\triangle MNP$, suy ra những cặp góc bằng nhau nào?`, a: `$\\widehat{A}=\\widehat{M}$, $\\widehat{B}=\\widehat{N}$, $\\widehat{C}=\\widehat{P}$.`, s: `Hai tam giác bằng nhau → các góc tương ứng bằng nhau.`, d: 'nhan_biet' },
    { c: `$\\triangle ABC$, $M$ trung điểm $BC$. $AM$ là trung tuyến. Biết $AB = AC$. CMR $AM \\perp BC$.`, a: `$\\triangle ABM = \\triangle ACM$ (c.c.c).`, s: `$AB = AC$, $BM = MC$, $AM$ chung → $\\triangle ABM = \\triangle ACM$ (c.c.c).\nSuy ra $\\widehat{AMB} = \\widehat{AMC}$. Mà $\\widehat{AMB} + \\widehat{AMC} = 180°$ → $\\widehat{AMB} = 90°$ → $AM \\perp BC$. $\\blacksquare$`, d: 'thong_hieu' },
    { c: `Cho hình vuông $ABCD$. CMR $\\triangle ABD = \\triangle CBD$.`, a: `c.c.c.`, s: `$AB = CB$ (cạnh hình vuông), $AD = CD$, $BD$ chung → $\\triangle ABD = \\triangle CBD$ (c.c.c).`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $AB = 6$, $BC = 8$, $AC = 10$. Tam giác này có đặc biệt không?`, a: `Tam giác vuông tại $B$.`, s: `$6^2 + 8^2 = 36 + 64 = 100 = 10^2$. Theo Pythagore ngược → vuông tại $B$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ cân tại $A$. Kẻ $AH \\perp BC$. CMR $HB = HC$.`, a: `$\\triangle AHB = \\triangle AHC$.`, s: `$AB = AC$, $AH$ chung, $\\widehat{AHB} = \\widehat{AHC} = 90°$ → $\\triangle AHB = \\triangle AHC$ (cạnh huyền-cạnh góc vuông). Suy ra $HB = HC$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Cho tam giác $ABC$ và $DEF$ có $AB = DE$, $BC = EF$, $\\widehat{B} = \\widehat{E}$. Hai tam giác bằng nhau theo trường hợp nào?`, a: `c.g.c (cạnh-góc-cạnh).`, s: `Đây là trường hợp **cạnh-góc-cạnh** (c.g.c), không phải c.c.c.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ có $AB = AC = 5$, $BC = 6$. Tính đường cao $AH$.`, a: `$AH = 4$.`, s: `$H$ trung điểm $BC$ (tam giác cân): $BH = 3$.\n$AH = \\sqrt{AB^2 - BH^2} = \\sqrt{25 - 9} = 4$.`, d: 'van_dung_cao' },
    { c: `CMR tam giác có $3$ cạnh bằng nhau thì $3$ góc bằng $60°$.`, a: `Tam giác đều.`, s: `$AB = BC = CA$. Tam giác cân tại $A$: $\\widehat{B} = \\widehat{C}$. Cân tại $B$: $\\widehat{A} = \\widehat{C}$. Vậy $\\widehat{A} = \\widehat{B} = \\widehat{C}$. Tổng $= 180°$ → mỗi góc $= 60°$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${b.t},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
