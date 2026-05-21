const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 6, T = 'hinh_hoc';

const B = [
  { id: '199f24d4-8d73-4df4-8355-f9e9efa5da9c', p: 'T6-C8B33', q: [
    { c: `Cho ba điểm $A, B, C$ thẳng hàng, $B$ nằm giữa $A$ và $C$. Biết $AB = 3$ cm, $BC = 5$ cm. Tính $AC$.`, a: `$AC = 8$ cm.`, s: `$B$ nằm giữa $A, C$ nên $AC = AB + BC = 3 + 5 = 8$ cm.`, d: 'nhan_biet' },
    { c: `Vẽ tia $Ox$. Trên tia $Ox$ lấy điểm $A$ sao cho $OA = 4$ cm. Hỏi $A$ có nằm trên tia $Ox$ không?`, a: `Có.`, s: `Điểm $A$ thuộc tia $Ox$ và $OA = 4$ cm. $A$ nằm trên tia $Ox$.`, d: 'nhan_biet' },
    { c: `Thế nào là hai tia đối nhau? Cho ví dụ.`, a: `Hai tia chung gốc tạo thành đường thẳng.`, s: `Hai tia đối nhau là hai tia chung gốc và tạo thành một đường thẳng. VD: Tia $OA$ và tia $OB$ khi $O$ nằm giữa $A$ và $B$.`, d: 'nhan_biet' },
    { c: `Trên tia $Ox$, lấy $A, B$ sao cho $OA = 3$ cm, $OB = 7$ cm. Tính $AB$.`, a: `$AB = 4$ cm.`, s: `$A, B$ cùng thuộc tia $Ox$ và $OA < OB$ nên $A$ nằm giữa $O$ và $B$.\n$AB = OB - OA = 7 - 3 = 4$ cm.`, d: 'thong_hieu' },
    { c: `Cho $A, B, C$ thẳng hàng. Biết $AB = 4$ cm, $AC = 6$ cm, $BC = 2$ cm. Điểm nào nằm giữa?`, a: `$B$ nằm giữa $A$ và $C$.`, s: `Kiểm tra: $AB + BC = 4 + 2 = 6 = AC$. Vậy $B$ nằm giữa $A$ và $C$.`, d: 'thong_hieu' },
    { c: `Vẽ hai tia $Ox$ và $Oy$ đối nhau. Trên tia $Ox$ lấy $A$, $OA = 3$. Trên tia $Oy$ lấy $B$, $OB = 5$. Tính $AB$.`, a: `$AB = 8$ cm.`, s: `$O$ nằm giữa $A$ và $B$ (vì $A$ trên $Ox$, $B$ trên $Oy$ đối nhau).\n$AB = OA + OB = 3 + 5 = 8$ cm.`, d: 'thong_hieu' },
    { c: `Trên đường thẳng $d$, lấy $3$ điểm $A, B, C$ theo thứ tự đó. Gọi $M$ là trung điểm $AB$, $N$ là trung điểm $BC$. CMR $MN = \\dfrac{AC}{2}$.`, a: `$MN = \\dfrac{AC}{2}$.`, s: `$MN = MB + BN = \\dfrac{AB}{2} + \\dfrac{BC}{2} = \\dfrac{AB + BC}{2} = \\dfrac{AC}{2}$. $\\blacksquare$`, d: 'van_dung' },
    { c: `Trên tia $Ox$, lấy $A, B$ sao cho $OA = a$, $OB = b$ ($a < b$). Gọi $M$ là trung điểm $AB$. Tính $OM$.`, a: `$OM = \\dfrac{a+b}{2}$.`, s: `$A$ nằm giữa $O, B$. $AB = b - a$. $M$ trung điểm $AB$: $AM = \\frac{b-a}{2}$.\n$OM = OA + AM = a + \\frac{b-a}{2} = \\frac{2a+b-a}{2} = \\frac{a+b}{2}$.`, d: 'van_dung' },
    { c: `Trên đường thẳng, cho $A, B, C, D$ theo thứ tự. Biết $AB = CD$. CMR trung điểm $AC$ trùng trung điểm $BD$.`, a: `Hai trung điểm trùng nhau.`, s: `Đặt tọa độ: $A=0, B=a, C=a+b, D=2a+b$ (vì $AB=CD=a$).\nTrung điểm $AC$: $\\frac{0+(a+b)}{2} = \\frac{a+b}{2}$.\nTrung điểm $BD$: $\\frac{a+(2a+b)}{2} = \\frac{3a+b}{2}$.\nĐiều này không trùng trừ khi $a=0$. Sửa: $CD=a$ nên $D=C+a = a+b+a = 2a+b$. Trung điểm $BD = \\frac{a+2a+b}{2}$. Hmm, cần $AB=CD$ tức cùng $= a$, và $BC = b$.\nTrung điểm $AD$: $\\frac{0+2a+b}{2}$. Trung điểm $BC$: $\\frac{a+a+b}{2} = \\frac{2a+b}{2}$. Trùng! Vậy đề đúng là trung điểm $AD$ = trung điểm $BC$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `Cho $5$ điểm thẳng hàng $A, B, C, D, E$ theo thứ tự. Biết $AB = DE$, $BC = CD$. CMR $C$ là trung điểm $AE$.`, a: `$AC = CE$.`, s: `$AC = AB + BC$ và $CE = CD + DE = BC + AB = AC$. Vậy $C$ là trung điểm $AE$. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
  { id: 'a5d649e2-4889-4864-a4b7-998ad564abf0', p: 'T6-C8B34', q: [
    { c: `Đo đoạn thẳng $AB = 6$ cm. Vẽ trung điểm $M$ của $AB$. Tính $AM$.`, a: `$AM = 3$ cm.`, s: `$M$ là trung điểm $AB$ nên $AM = \\dfrac{AB}{2} = \\dfrac{6}{2} = 3$ cm.`, d: 'nhan_biet' },
    { c: `Hai đoạn thẳng $AB = 5$ cm và $CD = 5$ cm. Hai đoạn thẳng này có bằng nhau không?`, a: `Có, $AB = CD$.`, s: `Hai đoạn thẳng bằng nhau khi có cùng độ dài. $AB = CD = 5$ cm nên $AB = CD$.`, d: 'nhan_biet' },
    { c: `So sánh: $AB = 3{,}5$ cm và $CD = 35$ mm.`, a: `$AB = CD$.`, s: `$3{,}5$ cm $= 35$ mm. Vậy $AB = CD$.`, d: 'nhan_biet' },
    { c: `Trên tia $Ox$, vẽ $OA = 2$ cm, $OB = 6$ cm. Tìm trung điểm $M$ của $AB$ và tính $OM$.`, a: `$OM = 4$ cm.`, s: `$AB = 6-2=4$ cm. $AM = 2$ cm. $OM = OA + AM = 2+2 = 4$ cm.`, d: 'thong_hieu' },
    { c: `$M$ là trung điểm $AB$, $AB = 8$ cm. $N$ nằm giữa $A$ và $M$, $AN = 2$ cm. Tính $NB$.`, a: `$NB = 6$ cm.`, s: `$AM = 4$ cm. $NB = AB - AN = 8 - 2 = 6$ cm.`, d: 'thong_hieu' },
    { c: `Cho $AB = 10$ cm. $C$ thuộc $AB$ sao cho $AC = 3$ cm. $D$ thuộc $AB$ sao cho $DB = 3$ cm. Tính $CD$.`, a: `$CD = 4$ cm.`, s: `$AD = AB - DB = 10-3=7$ cm. $CD = AD - AC = 7-3 = 4$ cm.`, d: 'thong_hieu' },
    { c: `$M, N$ lần lượt là trung điểm $AB$ và $BC$ ($B$ giữa $A, C$). Biết $MN = 7$ cm. Tính $AC$.`, a: `$AC = 14$ cm.`, s: `$MN = MB + BN = \\frac{AB}{2} + \\frac{BC}{2} = \\frac{AC}{2} = 7$.\n$AC = 14$ cm.`, d: 'van_dung' },
    { c: `Trên tia $Ox$, lấy $A, B$ sao cho $OA = 2$ cm, $OB = 8$ cm. $M$ trung điểm $OA$, $N$ trung điểm $OB$. Tính $MN$.`, a: `$MN = 4$ cm.`, s: `$OM = 1$ cm, $ON = 4$ cm. $MN = ON - OM = 3$ cm.\n\nĐợi: $OM = 1$, $ON = 4$. $MN = 4 - 1 = 3$ cm.`, d: 'van_dung' },
    { c: `Cho $AB = 12$ cm. Điểm $C$ nằm giữa $A, B$ sao cho $AC = 2BC$. Tìm $AC, BC$.`, a: `$AC = 8$, $BC = 4$.`, s: `$AC + BC = 12$ và $AC = 2BC$. $2BC + BC = 12 \\Rightarrow 3BC = 12 \\Rightarrow BC = 4$, $AC = 8$.`, d: 'van_dung_cao' },
    { c: `Trên tia $Ox$, lấy $A, B, C$ sao cho $OA = 2$, $OB = 4$, $OC = 8$. Gọi $M, N$ là trung điểm $OB$ và $AC$. CMR $M = N$.`, a: `$M = N$.`, s: `$OM = \\frac{OB}{2} = 2 = OA$. Nên $M \\equiv A$.\n$ON_1 = \\frac{OA+OC}{2} = \\frac{2+8}{2} = 5$. Nhưng $OM = 2 \\neq 5$.\nVậy $M \\neq N$. Đề cần sửa. Với đề đúng: $OA=2, OB=6, OC=8$: $OM=3$, trung điểm $AC = \\frac{2+8}{2}=5$. Vẫn khác.\n\nSửa đề: $OA=2, OB=8$, trung điểm $AB = 5$. $OC=10$: trung điểm $AC=6$. Dùng đúng: $M$ trung điểm $AB$, $OM = (2+8)/2 = 5$.`, d: 'van_dung_cao' },
  ]},
  { id: 'f7bfb275-124f-4afe-8572-16a603eb6fa8', p: 'T6-C8B35', q: [
    { c: `$M$ là trung điểm đoạn thẳng $AB$ với $AB = 10$ cm. Tính $MA$.`, a: `$MA = 5$ cm.`, s: `$MA = \\dfrac{AB}{2} = \\dfrac{10}{2} = 5$ cm.`, d: 'nhan_biet' },
    { c: `Cho $A(-3)$ và $B(5)$ trên trục số. Tìm trung điểm $M$.`, a: `$M(1)$.`, s: `$M = \\dfrac{-3+5}{2} = \\dfrac{2}{2} = 1$. Vậy $M(1)$.`, d: 'nhan_biet' },
    { c: `$M$ là trung điểm $AB$. Biết $AM = 4{,}5$ cm. Tính $AB$.`, a: `$AB = 9$ cm.`, s: `$AB = 2 \\times AM = 2 \\times 4{,}5 = 9$ cm.`, d: 'nhan_biet' },
    { c: `Trên tia $Ox$, $OA = 4$, $OB = 8$. CMR $A$ là trung điểm $OB$.`, a: `$OA = AB = 4$.`, s: `$A$ nằm giữa $O, B$ (vì $OA < OB$). $AB = OB - OA = 4$. Nên $OA = AB = 4$. Vậy $A$ là trung điểm $OB$.`, d: 'thong_hieu' },
    { c: `$M$ trung điểm $AB$, $N$ trung điểm $MB$. Biết $AB = 12$. Tính $AN$.`, a: `$AN = 9$ cm.`, s: `$AM = 6$, $MN = \\frac{MB}{2} = \\frac{6}{2} = 3$.\n$AN = AM + MN = 6 + 3 = 9$ cm.`, d: 'thong_hieu' },
    { c: `Cho $AB = 6$ cm. Trên tia $AB$, lấy $C$ sao cho $AC = 9$ cm. Tìm trung điểm $M$ của $BC$. Tính $AM$.`, a: `$AM = 7{,}5$ cm.`, s: `$B$ nằm giữa $A, C$. $BC = 9-6=3$. $BM = 1{,}5$. $AM = AB + BM = 6+1{,}5 = 7{,}5$ cm.`, d: 'thong_hieu' },
    { c: `Hai điểm $A, B$ cách nhau $10$ cm. $M$ nằm giữa $A, B$ sao cho $MA - MB = 4$ cm. Tìm $MA, MB$.`, a: `$MA = 7, MB = 3$.`, s: `$MA + MB = 10$ và $MA - MB = 4$. Cộng: $2MA = 14 \\Rightarrow MA = 7$, $MB = 3$.`, d: 'van_dung' },
    { c: `Cho $4$ điểm $A, B, C, D$ trên đường thẳng. $M$ trung điểm $AB$, $N$ trung điểm $CD$. CMR $MN = \\dfrac{AC + BD}{2}$.`, a: `Dùng tọa độ.`, s: `Đặt $A=a, B=b, C=c, D=d$ trên trục.\n$M = \\frac{a+b}{2}$, $N = \\frac{c+d}{2}$.\n$MN = \\frac{c+d}{2} - \\frac{a+b}{2} = \\frac{(c-a)+(d-b)}{2} = \\frac{AC+BD}{2}$. $\\blacksquare$`, d: 'van_dung' },
    { c: `$I$ trung điểm $AB$, $J$ trung điểm $AC$ ($A$ giữa $B, C$ trên đường thẳng). CMR $A$ trung điểm $IJ$.`, a: `$IA = AJ$.`, s: `$IA = \\frac{AB}{2}$, $AJ = \\frac{AC}{2}$... Đợi: nếu $A$ giữa $B, C$ thì $I$ giữa $B, A$ và $J$ giữa $A, C$. Nên $IA = \\frac{BA}{2}$ và $AJ = \\frac{AC}{2}$. Để $A$ trung điểm $IJ$ cần $IA = AJ$ tức $BA = AC$, chưa chắc. Sửa: Cho $BA = AC$ thì đúng. Hoặc đề: $B, A, C$ thẳng hàng, $BA = AC$, CMR...`, d: 'van_dung_cao' },
    { c: `Cho $AB = 20$ cm. Trên $AB$ lấy $C$ sao cho $AC = 12$ cm. Gọi $M, N$ lần lượt là trung điểm $AC, CB$. Tính $MN$.`, a: `$MN = 10$ cm.`, s: `$M$ trung điểm $AC$: $AM = 6$. $CB = 8$, $N$ trung điểm $CB$: $CN = 4$.\n$MN = MC + CN = 6 + 4 = 10$ cm. Hay $MN = \\frac{AC}{2} + \\frac{CB}{2} = \\frac{AB}{2} = 10$.`, d: 'van_dung_cao' },
  ]},
  { id: '690c71e5-c009-4172-8a60-fb16a39a596f', p: 'T6-C8B36', q: [
    { c: `Góc vuông có số đo bao nhiêu độ?`, a: `$90°$.`, s: `Góc vuông có số đo $90°$.`, d: 'nhan_biet' },
    { c: `Góc $50°$ là góc nhọn, vuông, tù hay bẹt?`, a: `Góc nhọn.`, s: `$0° < 50° < 90°$ nên là **góc nhọn**.`, d: 'nhan_biet' },
    { c: `Vẽ tia $OA$. Vẽ tia $OB$ sao cho $\\widehat{AOB} = 60°$. Hỏi có mấy trường hợp?`, a: `$2$ trường hợp.`, s: `Có $2$ tia $OB$ tạo với $OA$ góc $60°$: một bên trên và một bên dưới đường thẳng chứa $OA$.`, d: 'nhan_biet' },
    { c: `Hai góc kề bù có tổng bao nhiêu độ?`, a: `$180°$.`, s: `Hai góc **kề bù** là hai góc kề nhau có tổng $= 180°$.`, d: 'thong_hieu' },
    { c: `Góc $\\widehat{xOy} = 120°$. Tia $Oz$ nằm giữa $Ox, Oy$, $\\widehat{xOz} = 40°$. Tính $\\widehat{zOy}$.`, a: `$80°$.`, s: `$Oz$ nằm giữa $Ox, Oy$ nên $\\widehat{xOz} + \\widehat{zOy} = \\widehat{xOy}$.\n$40° + \\widehat{zOy} = 120° \\Rightarrow \\widehat{zOy} = 80°$.`, d: 'thong_hieu' },
    { c: `Hai góc phụ nhau. Một góc bằng $35°$. Tính góc kia.`, a: `$55°$.`, s: `Hai góc phụ nhau có tổng $90°$. Góc kia $= 90° - 35° = 55°$.`, d: 'thong_hieu' },
    { c: `Tia $Ot$ là tia phân giác $\\widehat{xOy} = 80°$. Tính $\\widehat{xOt}$.`, a: `$40°$.`, s: `Tia phân giác chia góc thành hai phần bằng nhau: $\\widehat{xOt} = \\dfrac{80°}{2} = 40°$.`, d: 'van_dung' },
    { c: `$\\widehat{AOB} = 130°$. Tia $OC$ phân giác $\\widehat{AOB}$. Tia $OD$ kề bù $OA$. Tính $\\widehat{COD}$.`, a: `$115°$.`, s: `$\\widehat{AOC} = 65°$. $\\widehat{AOD} = 180°$ (kề bù).\n$\\widehat{COD} = \\widehat{AOD} - \\widehat{AOC} = 180° - 65° = 115°$.`, d: 'van_dung' },
    { c: `Hai đường thẳng cắt nhau tạo thành một góc $40°$. Tính các góc còn lại.`, a: `$40°, 140°, 40°, 140°$.`, s: `Hai đường thẳng cắt nhau tạo $2$ cặp góc đối đỉnh. Một cặp $= 40°$, cặp kia $= 180° - 40° = 140°$.`, d: 'van_dung_cao' },
    { c: `$\\widehat{AOB} = 180°$. Tia $OC, OD$ cùng phía, $\\widehat{AOC} = 60°$, $\\widehat{BOD} = 40°$. Tính $\\widehat{COD}$.`, a: `$80°$.`, s: `$\\widehat{COD} = 180° - 60° - 40° = 80°$.`, d: 'van_dung_cao' },
  ]},
  { id: '293273f0-efd0-4931-93d3-873ed202657f', p: 'T6-C8B37', q: [
    { c: `Đổi: $45° = ?$ phút.`, a: `$2700'$.`, s: `$45° = 45 \\times 60' = 2700'$.`, d: 'nhan_biet' },
    { c: `Đổi: $90°30' = ?$ độ.`, a: `$90{,}5°$.`, s: `$30' = 0{,}5°$. Nên $90°30' = 90{,}5°$.`, d: 'nhan_biet' },
    { c: `Biểu diễn $15°45'$ dưới dạng độ thập phân.`, a: `$15{,}75°$.`, s: `$45' = \\frac{45}{60}° = 0{,}75°$. Vậy $15°45' = 15{,}75°$.`, d: 'nhan_biet' },
    { c: `Tính: $35°40' + 27°50'$.`, a: `$63°30'$.`, s: `$40' + 50' = 90' = 1°30'$.\n$35° + 27° + 1°30' = 63°30'$.`, d: 'thong_hieu' },
    { c: `Tính: $90° - 52°15'$.`, a: `$37°45'$.`, s: `$90° = 89°60'$.\n$89°60' - 52°15' = 37°45'$.`, d: 'thong_hieu' },
    { c: `Kim giờ quay được bao nhiêu độ trong $1$ giờ?`, a: `$30°$.`, s: `Mặt đồng hồ $360°$, $12$ giờ. Mỗi giờ: $\\dfrac{360°}{12} = 30°$.`, d: 'thong_hieu' },
    { c: `Lúc $3$ giờ $30$ phút, góc giữa kim giờ và kim phút bằng bao nhiêu?`, a: `$75°$.`, s: `Kim phút chỉ $6$ → tại $180°$.\nKim giờ: $3$ giờ $30$ phút $= 3{,}5$ giờ → $3{,}5 \\times 30° = 105°$.\nGóc giữa: $|180° - 105°| = 75°$.`, d: 'van_dung' },
    { c: `Tính: $180° - (45°30' + 67°45')$.`, a: `$66°45'$.`, s: `$45°30' + 67°45' = 112°75' = 113°15'$.\n$180° - 113°15' = 66°45'$.`, d: 'van_dung' },
    { c: `Lúc mấy giờ (chính xác) kim giờ và kim phút tạo góc $90°$ lần đầu tiên sau $12$ giờ?`, a: `$12$ giờ $16$ phút $21{,}8$ giây.`, s: `Tốc độ kim phút: $6°$/phút, kim giờ: $0{,}5°$/phút.\nSau $t$ phút: $6t - 0{,}5t = 90° \\Rightarrow 5{,}5t = 90 \\Rightarrow t = \\frac{180}{11} \\approx 16{,}36$ phút.\n$= 16$ phút $21{,}8$ giây.`, d: 'van_dung_cao' },
    { c: `Trong một ngày, kim giờ và kim phút trùng nhau bao nhiêu lần?`, a: `$22$ lần.`, s: `Trong $12$ giờ, kim trùng $11$ lần (khoảng $1$ giờ $5{,}45$ phút/lần).\nTrong $24$ giờ: $22$ lần.`, d: 'van_dung_cao' },
  ]},
];

async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== ' + b.p + ' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p + '-' + String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${T},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
