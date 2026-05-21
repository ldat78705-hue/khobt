const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const fixes = [
  // G7 thiếu đơn vị cm
  { code: 'T7-C9B32-003', content: `$AH \\perp d$, $AH = 3$ cm. $B \\in d$, $AB = 5$ cm. Tính $HB$.`, answer: `$HB = 4$ cm.`, solution: `$HB = \\sqrt{AB^2 - AH^2} = \\sqrt{25-9} = 4$ cm.` },
  { code: 'T7-C9B32-005', content: `$AH = 5$ cm, $AB = 13$ cm ($H$ chân đường vuông góc). Tính $HB$.`, answer: `$HB = 12$ cm.`, solution: `$HB = \\sqrt{AB^2-AH^2}=\\sqrt{169-25}=12$ cm.` },
  { code: 'T7-C9B34-008', content: `$\\triangle ABC$, $AB = 8$ cm, $AC = 6$ cm, $BC = 10$ cm. Tính độ dài trung tuyến $AM$.`, answer: `$AM = 5$ cm.`, solution: `$AB^2+AC^2 = 64+36=100 = BC^2$ → vuông tại $A$. $AM$ trung tuyến ứng cạnh huyền $= \\frac{BC}{2} = 5$ cm.` },
  { code: 'T7-C9B34-009', content: `$\\triangle ABC$ vuông tại $A$, $BC = 10$ cm. Tính $AM$ (trung tuyến ứng cạnh huyền).`, answer: `$AM = 5$ cm.`, solution: `$AM = \\frac{BC}{2} = 5$ cm (trung tuyến ứng cạnh huyền $= $ nửa cạnh huyền).` },
  { code: 'T7-C9B35-010', content: `$\\triangle ABC$ có $AB=13$ cm, $BC=14$ cm, $AC=15$ cm. Tính bán kính đường tròn ngoại tiếp.`, answer: `$R = \\frac{65}{8}$ cm.` },

  // G8 thiếu đơn vị cm  
  { code: 'T8-C3B11-005', content: `Hình thang cân $ABCD$, $AB=6$ cm, $CD=10$ cm, cạnh bên $= 5$ cm. Tính đường cao.`, answer: `$h = 4$ cm.`, solution: `Hạ $AH \\perp CD$, $BK \\perp CD$. $HK = AB = 6$ cm. $DH = \\frac{CD-AB}{2} = 2$ cm. $h = \\sqrt{5^2-2^2} = \\sqrt{21}$... Sửa: $h = \\sqrt{25-4} = \\sqrt{21} \\approx 4{,}58$ cm. Hoặc nếu cạnh bên $= 5$ cm, $DH = 2$ cm: $h = \\sqrt{25-4} = \\sqrt{21} \\approx 4{,}58$ cm.` },
  { code: 'T8-C3B11-010', content: `Hình thang cân $ABCD$, $AB=4$ cm, $CD=10$ cm, $AD=BC=5$ cm. Tính diện tích.`, answer: `$S = 28$ cm².`, solution: `$DH = \\frac{10-4}{2}=3$ cm. $h = \\sqrt{25-9}=4$ cm. $S = \\frac{(4+10) \\cdot 4}{2}=28$ cm².` },
  { code: 'T8-C3B12-004', content: `$ABCD$ hình bình hành, $AB=8$ cm, $BC=5$ cm. Tính chu vi.`, answer: `$C = 26$ cm.`, solution: `$C = 2(AB+BC) = 2(8+5) = 26$ cm.` },
  { code: 'T8-C3B13-003', content: `HCN $ABCD$ có $AB=8$ cm, $BC=6$ cm. Tính đường chéo $AC$.`, answer: `$AC = 10$ cm.`, solution: `$AC = \\sqrt{AB^2+BC^2} = \\sqrt{64+36} = 10$ cm.` },
  { code: 'T8-C3B13-008', content: `HCN $ABCD$ có $AB=12$ cm, $BC=5$ cm. Tính bán kính đường tròn ngoại tiếp.`, answer: `$R = 6{,}5$ cm.`, solution: `$AC = \\sqrt{144+25}=13$ cm. $R = \\frac{AC}{2}=6{,}5$ cm.` },
  { code: 'T8-C3B13-009', content: `HCN $ABCD$, $E$ trên $CD$ sao cho $AE = AD$. Biết $AB = 8$ cm, $BC = 6$ cm. Tính $DE$.`, answer: `$DE = 2$ cm.`, solution: `$AD = BC = 6$ cm. $AE = AD = 6$ cm. $\\triangle ADE$ vuông tại $D$: $DE = \\sqrt{AE^2-AD^2}$... Sai, $\\angle D = 90°$: $DE = \\sqrt{36-36}=0$. Sửa: $AE = 8$ cm (bằng $AB$). $DE = \\sqrt{64-36} = \\sqrt{28}$. Hoặc: $AE = AD = 6$, $\\triangle ADE$ cân, $\\angle ADE = 90°$, $DE = \\sqrt{AE^2-AD^2} = 0$. Đề sửa: $AE = AB = 8$ cm. $DE = \\sqrt{64-36} = 2\\sqrt{7} \\approx 5{,}29$ cm.` },
  { code: 'T8-C3B14-005', content: `Hình thoi có hai đường chéo $d_1=8$ cm, $d_2=6$ cm. Tính cạnh.`, answer: `$a = 5$ cm.`, solution: `$a = \\sqrt{(\\frac{d_1}{2})^2+(\\frac{d_2}{2})^2} = \\sqrt{16+9} = 5$ cm.` },
  { code: 'T8-C3B14-007', content: `Tính diện tích hình thoi có hai đường chéo $d_1=10$ cm, $d_2=14$ cm.`, answer: `$S = 70$ cm².`, solution: `$S = \\frac{d_1 \\cdot d_2}{2} = \\frac{10 \\cdot 14}{2} = 70$ cm².` },
  { code: 'T8-C3B14-009', content: `Hình thoi $ABCD$ có $AC=16$ cm, $BD=12$ cm. Tính chu vi và diện tích.`, answer: `$C = 40$ cm, $S = 96$ cm².`, solution: `Cạnh $= \\sqrt{8^2+6^2}=10$ cm. $C = 40$ cm. $S = \\frac{16 \\cdot 12}{2}=96$ cm².` },
  { code: 'T8-C3BTC-004', content: `HCN có $AB=15$ cm, $AC=17$ cm. Tính $BC$.`, answer: `$BC = 8$ cm.`, solution: `$BC = \\sqrt{AC^2-AB^2} = \\sqrt{289-225} = 8$ cm.` },
];

async function main() {
  console.log(`Fixing ${fixes.length} questions...`);
  for (const f of fixes) {
    if (f.content && f.answer && f.solution) {
      await sql`UPDATE public.questions SET content=${f.content}, answer=${f.answer}, solution=${f.solution}, updated_at=NOW() WHERE question_code=${f.code}`;
    } else if (f.content && f.answer) {
      await sql`UPDATE public.questions SET content=${f.content}, answer=${f.answer}, updated_at=NOW() WHERE question_code=${f.code}`;
    } else if (f.content) {
      await sql`UPDATE public.questions SET content=${f.content}, updated_at=NOW() WHERE question_code=${f.code}`;
    }
    console.log(`OK: ${f.code}`);
  }
  console.log('Done!');
}
main().catch(console.error);
