const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 9, T = 'hinh_hoc';
const B = [
  { id: 'de6eff7c-5049-442b-a019-ccda3152b146', p: 'T9-C9B27', q: [
    { c: `Góc nội tiếp là gì?`, a: `Góc có đỉnh trên đường tròn, hai cạnh chứa hai dây.`, s: `Góc nội tiếp có đỉnh nằm trên đường tròn, hai cạnh là hai dây cung.`, d: 'nhan_biet' },
    { c: `Số đo góc nội tiếp bằng bao nhiêu phần cung bị chắn?`, a: `Bằng nửa cung bị chắn.`, s: `$\\widehat{BAC} = \\frac{1}{2}\\stackrel{\\frown}{BC}$.`, d: 'nhan_biet' },
    { c: `Góc nội tiếp chắn nửa đường tròn bằng bao nhiêu?`, a: `$90°$.`, s: `Cung $= 180°$. Góc $= \\frac{180°}{2} = 90°$.`, d: 'nhan_biet' },
    { c: `Cung $\\stackrel{\\frown}{BC} = 100°$. Góc nội tiếp chắn cung đó bằng?`, a: `$50°$.`, s: `$\\widehat{BAC} = \\frac{100°}{2} = 50°$.`, d: 'thong_hieu' },
    { c: `Hai góc nội tiếp cùng chắn một cung thì sao?`, a: `Bằng nhau.`, s: `Cùng $= \\frac{1}{2}$ cung bị chắn → bằng nhau.`, d: 'thong_hieu' },
    { c: `Góc nội tiếp chắn cung $60°$. Góc ở tâm cùng chắn cung đó bằng?`, a: `$60°$.`, s: `Góc ở tâm $=$ cung $= 60°$. Góc nội tiếp $= 30°$. Góc ở tâm gấp đôi góc nội tiếp cùng chắn một cung.`, d: 'thong_hieu' },
    { c: `$(O; R)$, $AB$ là đường kính, $C$ trên đường tròn. CMR $\\widehat{ACB} = 90°$.`, a: `Góc nội tiếp chắn nửa đường tròn.`, s: `$\\stackrel{\\frown}{AB} = 180°$. $\\widehat{ACB} = \\frac{180°}{2} = 90°$. $\\blacksquare$`, d: 'van_dung' },
    { c: `$\\triangle ABC$ nội tiếp $(O)$. $\\widehat{A} = 40°$. Tính $\\stackrel{\\frown}{BC}$ (cung nhỏ).`, a: `$80°$.`, s: `$\\stackrel{\\frown}{BC} = 2\\widehat{A} = 80°$.`, d: 'van_dung' },
    { c: `Tứ giác $ABCD$ nội tiếp. CMR $\\widehat{A} + \\widehat{C} = 180°$.`, a: `Dùng cung bù nhau.`, s: `$\\widehat{A} = \\frac{1}{2}\\stackrel{\\frown}{BCD}$, $\\widehat{C} = \\frac{1}{2}\\stackrel{\\frown}{BAD}$. $\\stackrel{\\frown}{BCD}+\\stackrel{\\frown}{BAD}=360°$. $\\widehat{A}+\\widehat{C}=180°$. $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$(O; R)$, $A, B, C$ trên đường tròn, $\\widehat{ABC} = 30°$, $AC = R$. Tính $\\stackrel{\\frown}{AC}$.`, a: `$60°$.`, s: `$\\widehat{ABC} = 30° = \\frac{1}{2}\\stackrel{\\frown}{AC}$. $\\stackrel{\\frown}{AC} = 60°$.`, d: 'van_dung_cao' },
  ]},
  { id: '3af258b0-0c69-4f69-bcdb-061db0be4cb7', p: 'T9-C9B28', q: [
    { c: `Đường tròn ngoại tiếp tam giác là gì?`, a: `Đường tròn đi qua $3$ đỉnh.`, s: `Tâm là giao $3$ đường trung trực, bán kính $R$ (bán kính ngoại tiếp).`, d: 'nhan_biet' },
    { c: `Đường tròn nội tiếp tam giác là gì?`, a: `Đường tròn tiếp xúc $3$ cạnh.`, s: `Tâm là giao $3$ đường phân giác, bán kính $r$ (bán kính nội tiếp).`, d: 'nhan_biet' },
    { c: `Tam giác đều cạnh $a$. $R = ?$`, a: `$R = \\frac{a\\sqrt{3}}{3}$.`, s: `$R = \\frac{a}{\\sqrt{3}} = \\frac{a\\sqrt{3}}{3}$.`, d: 'nhan_biet' },
    { c: `$\\triangle$ vuông cạnh huyền $c$. $R = ?$`, a: `$R = \\frac{c}{2}$.`, s: `Tâm đường tròn ngoại tiếp là trung điểm cạnh huyền. $R = \\frac{c}{2}$.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$ vuông tại $A$, $BC = 10$ cm. Tính $R$.`, a: `$R = 5$ cm.`, s: `$R = \\frac{BC}{2} = 5$ cm.`, d: 'thong_hieu' },
    { c: `$\\triangle$ đều cạnh $6$ cm. Tính $r$.`, a: `$r = \\sqrt{3}$ cm.`, s: `$r = \\frac{a}{2\\sqrt{3}} = \\frac{6}{2\\sqrt{3}} = \\sqrt{3}$ cm.`, d: 'thong_hieu' },
    { c: `$\\triangle ABC$, $AB=5$ cm, $BC=12$ cm, $CA=13$ cm. Tính $R$.`, a: `$R = 6{,}5$ cm.`, s: `$13^2 = 169 = 25+144$. Vuông tại $B$. $R = \\frac{13}{2} = 6{,}5$ cm.`, d: 'van_dung' },
    { c: `CT: $S = pr$ ($p$: nửa chu vi, $r$: bán kính nội tiếp). $\\triangle$ có $S = 24$ cm², $p = 12$ cm. Tính $r$.`, a: `$r = 2$ cm.`, s: `$r = \\frac{S}{p} = \\frac{24}{12} = 2$ cm.`, d: 'van_dung' },
    { c: `$\\triangle$ đều cạnh $a$. Tính tỉ số $\\frac{R}{r}$.`, a: `$\\frac{R}{r} = 2$.`, s: `$R = \\frac{a\\sqrt{3}}{3}$, $r = \\frac{a\\sqrt{3}}{6}$. $\\frac{R}{r} = 2$.`, d: 'van_dung_cao' },
    { c: `$\\triangle ABC$ vuông tại $A$, $AB = 6$ cm, $AC = 8$ cm. Tính $r$.`, a: `$r = 2$ cm.`, s: `$BC = 10$. $p = \\frac{6+8+10}{2} = 12$. $S = \\frac{6 \\times 8}{2} = 24$. $r = \\frac{24}{12} = 2$ cm.`, d: 'van_dung_cao' },
  ]},
  { id: 'abd93d32-a146-4ff6-b0d4-dbca1a853684', p: 'T9-C9B29', q: [
    { c: `Tứ giác nội tiếp là gì?`, a: `Tứ giác có $4$ đỉnh nằm trên $1$ đường tròn.`, s: `$4$ đỉnh cùng thuộc một đường tròn.`, d: 'nhan_biet' },
    { c: `Tính chất tứ giác nội tiếp?`, a: `Tổng $2$ góc đối $= 180°$.`, s: `$\\widehat{A} + \\widehat{C} = 180°$ và $\\widehat{B} + \\widehat{D} = 180°$.`, d: 'nhan_biet' },
    { c: `Tứ giác $ABCD$, $\\widehat{A} = 80°, \\widehat{C} = 100°$. Nội tiếp được không?`, a: `Có.`, s: `$80° + 100° = 180°$. Thoả tính chất → nội tiếp.`, d: 'nhan_biet' },
    { c: `Tứ giác $ABCD$, $\\widehat{A} = 70°, \\widehat{C} = 120°$. Nội tiếp?`, a: `Không.`, s: `$70° + 120° = 190° \\neq 180°$. Không nội tiếp.`, d: 'thong_hieu' },
    { c: `HCN luôn nội tiếp đường tròn. Đúng hay sai?`, a: `Đúng.`, s: `HCN có $4$ góc vuông: $\\widehat{A}+\\widehat{C} = 180°$. Luôn nội tiếp.`, d: 'thong_hieu' },
    { c: `Hình bình hành nội tiếp được khi nào?`, a: `Khi nó là HCN.`, s: `$\\widehat{A}+\\widehat{C}=180°$ và $\\widehat{A}=\\widehat{C}$ (HBH) → $\\widehat{A}=90°$ → HCN.`, d: 'thong_hieu' },
    { c: `Tứ giác $ABCD$ nội tiếp, $\\widehat{A}=75°, \\widehat{B}=80°$. Tính $\\widehat{C}, \\widehat{D}$.`, a: `$\\widehat{C}=105°, \\widehat{D}=100°$.`, s: `$\\widehat{C}=180°-75°=105°$. $\\widehat{D}=180°-80°=100°$.`, d: 'van_dung' },
    { c: `Hình thang cân nội tiếp được không?`, a: `Có.`, s: `Hình thang cân: $\\widehat{A}+\\widehat{D}=180°$ (cùng phía đáy) → nội tiếp. Hoặc: $4$ đỉnh cùng cách đều trung điểm đoạn nối tâm.`, d: 'van_dung' },
    { c: `CMR: Nếu tứ giác có $2$ góc đối bù nhau thì nội tiếp.`, a: `Đây là ĐK đủ.`, s: `$\\widehat{A}+\\widehat{C}=180°$ → tồn tại đường tròn qua $A,B,C$ → $D$ cũng thuộc (duy nhất). $\\blacksquare$`, d: 'van_dung_cao' },
    { c: `$ABCD$ nội tiếp $(O; R)$, $AC$ đường kính, $\\widehat{ADB}=40°$. Tính $\\widehat{ACB}$.`, a: `$40°$.`, s: `$\\widehat{ADB}$ và $\\widehat{ACB}$ cùng chắn $\\stackrel{\\frown}{AB}$ → bằng nhau $= 40°$.`, d: 'van_dung_cao' },
  ]},
  { id: 'ba7b12c2-6720-42dd-b587-75aa04738833', p: 'T9-C9B30', q: [
    { c: `Đa giác đều là gì?`, a: `Đa giác có tất cả cạnh bằng nhau, tất cả góc bằng nhau.`, s: `Đa giác đều $n$ cạnh: $n$ cạnh bằng nhau, $n$ góc bằng nhau.`, d: 'nhan_biet' },
    { c: `Mỗi góc của đa giác đều $n$ cạnh bằng bao nhiêu?`, a: `$\\frac{(n-2) \\cdot 180°}{n}$.`, s: `Tổng góc $= (n-2) \\times 180°$. Mỗi góc $= \\frac{(n-2) \\times 180°}{n}$.`, d: 'nhan_biet' },
    { c: `Mỗi góc lục giác đều bằng?`, a: `$120°$.`, s: `$\\frac{4 \\times 180°}{6} = 120°$.`, d: 'nhan_biet' },
    { c: `Đa giác đều $n$ cạnh luôn nội tiếp được đường tròn. Đúng không?`, a: `Đúng.`, s: `Đúng. Luôn tồn tại đường tròn ngoại tiếp và nội tiếp đa giác đều.`, d: 'thong_hieu' },
    { c: `Lục giác đều cạnh $a$. Tính $R$.`, a: `$R = a$.`, s: `Lục giác đều gồm $6$ tam giác đều cạnh $a$. $R = a$.`, d: 'thong_hieu' },
    { c: `Tam giác đều cạnh $4$ cm. Tính diện tích.`, a: `$4\\sqrt{3}$ cm².`, s: `$S = \\frac{\\sqrt{3}}{4} \\times 16 = 4\\sqrt{3} \\approx 6{,}93$ cm².`, d: 'thong_hieu' },
    { c: `Hình vuông nội tiếp $(O; 5)$ cm. Tính cạnh.`, a: `$5\\sqrt{2}$ cm.`, s: `Đường chéo $= 2R = 10$ cm. Cạnh $= \\frac{10}{\\sqrt{2}} = 5\\sqrt{2}$ cm.`, d: 'van_dung' },
    { c: `Lục giác đều cạnh $6$ cm. Tính diện tích.`, a: `$54\\sqrt{3}$ cm².`, s: `$S = 6 \\times \\frac{\\sqrt{3}}{4} \\times 36 = 54\\sqrt{3} \\approx 93{,}5$ cm².`, d: 'van_dung' },
    { c: `Ngũ giác đều. Tính mỗi góc.`, a: `$108°$.`, s: `$\\frac{3 \\times 180°}{5} = 108°$.`, d: 'van_dung_cao' },
    { c: `Bát giác đều cạnh $a$. Tính diện tích theo $a$.`, a: `$S = 2(1+\\sqrt{2})a^2$.`, s: `$S = 2(1+\\sqrt{2})a^2$. Mỗi góc $= 135°$.`, d: 'van_dung_cao' },
  ]},
  { id: 'c39528fe-863b-4e0b-8fa1-7c5dfef8bccf', p: 'T9-C9BTC', q: [
    { c: `Góc nội tiếp chắn cung $140°$ bằng?`, a: `$70°$.`, s: `$\\frac{140°}{2} = 70°$.`, d: 'nhan_biet' },
    { c: `$\\triangle$ vuông cạnh huyền $12$ cm. $R = ?$`, a: `$6$ cm.`, s: `$R = \\frac{12}{2} = 6$ cm.`, d: 'nhan_biet' },
    { c: `Tứ giác nội tiếp, $\\widehat{A}=110°$. $\\widehat{C}=?$`, a: `$70°$.`, s: `$\\widehat{C} = 180° - 110° = 70°$.`, d: 'thong_hieu' },
    { c: `Mỗi góc của ngũ giác đều?`, a: `$108°$.`, s: `$\\frac{3 \\times 180°}{5} = 108°$.`, d: 'thong_hieu' },
    { c: `$\\triangle$ đều cạnh $10$ cm. Tính $R$ và $r$.`, a: `$R = \\frac{10\\sqrt{3}}{3}$ cm, $r = \\frac{5\\sqrt{3}}{3}$ cm.`, s: `$R = \\frac{10}{\\sqrt{3}} = \\frac{10\\sqrt{3}}{3}$ cm. $r = \\frac{R}{2} = \\frac{5\\sqrt{3}}{3}$ cm.`, d: 'thong_hieu' },
    { c: `Hình vuông cạnh $8$ cm. Tính $R$ đường tròn ngoại tiếp.`, a: `$4\\sqrt{2}$ cm.`, s: `Đường chéo $= 8\\sqrt{2}$. $R = \\frac{8\\sqrt{2}}{2} = 4\\sqrt{2}$ cm.`, d: 'van_dung' },
    { c: `Lục giác đều nội tiếp $(O; 4)$ cm. Tính chu vi.`, a: `$24$ cm.`, s: `Cạnh $= R = 4$ cm. Chu vi $= 6 \\times 4 = 24$ cm.`, d: 'van_dung' },
    { c: `$ABCD$ nội tiếp, $\\widehat{ABD}=35°$, $\\widehat{ACD}=35°$. Nhận xét.`, a: `Cùng chắn $\\stackrel{\\frown}{AD}$ → bằng nhau.`, s: `$\\widehat{ABD}$ và $\\widehat{ACD}$ cùng chắn $\\stackrel{\\frown}{AD}$ → bằng nhau. Phù hợp.`, d: 'van_dung' },
    { c: `$\\triangle ABC$ nội tiếp $(O; R)$, $\\widehat{A}=60°$. Tính $\\stackrel{\\frown}{BC}$ (nhỏ).`, a: `$120°$.`, s: `$\\stackrel{\\frown}{BC} = 2\\widehat{A} = 120°$.`, d: 'van_dung_cao' },
    { c: `CMR hình thang cân luôn nội tiếp được đường tròn.`, a: `Hai góc đối bù nhau.`, s: `Hình thang cân $ABCD$ ($AB \\parallel CD$): $\\widehat{A}=\\widehat{B}$, $\\widehat{C}=\\widehat{D}$. $\\widehat{A}+\\widehat{D}=180°$ (cùng phía). → nội tiếp. $\\blacksquare$`, d: 'van_dung_cao' },
  ]},
];
async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${T},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total: '+total);
}
main().catch(console.error);
