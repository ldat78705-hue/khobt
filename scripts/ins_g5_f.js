const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'dai_so';

const B = [
  { id: '1bf1a265-2e08-4668-a940-f9b6549ac207', p: 'T5-B34', q: [
    { c: `$3$ km $200$ m $= ?$ km.`, a: `$3,2$ km.`, s: `$200$ m $= 0,2$ km.`, d: 'nhan_biet' },
    { c: `$4,5$ tấn $= ?$ kg.`, a: `$4\\,500$ kg.`, s: `$4,5 \\times 1\\,000 = 4\\,500$ kg.`, d: 'nhan_biet' },
    { c: `$2$ giờ $30$ phút $= ?$ giờ.`, a: `$2,5$ giờ.`, s: `$30$ phút $= 0,5$ giờ.`, d: 'thong_hieu' },
    { c: `$7\\,500$ g $= ?$ kg.`, a: `$7,5$ kg.`, s: `$7\\,500 : 1\\,000 = 7,5$ kg.`, d: 'thong_hieu' },
    { c: `$3$ m $15$ cm $= ?$ m.`, a: `$3,15$ m.`, s: `$15$ cm $= 0,15$ m.`, d: 'thong_hieu' },
    { c: `So sánh: $2,5$ kg và $2\\,450$ g.`, a: `$2,5$ kg $> 2\\,450$ g.`, s: `$2,5$ kg $= 2\\,500$ g $> 2\\,450$ g.`, d: 'van_dung' },
    { c: `$5,025$ km $= ?$ m.`, a: `$5\\,025$ m.`, s: `$5,025 \\times 1\\,000 = 5\\,025$.`, d: 'van_dung' },
    { c: `$3$ giờ $45$ phút $= ?$ giờ.`, a: `$3,75$ giờ.`, s: `$45$ phút $= \\dfrac{45}{60} = 0,75$ giờ.`, d: 'van_dung' },
    { c: `$0,75$ ngày $= ?$ giờ.`, a: `$18$ giờ.`, s: `$0,75 \\times 24 = 18$ giờ.`, d: 'van_dung_cao' },
    { c: `$1$ phút $15$ giây $= ?$ phút (STP).`, a: `$1,25$ phút.`, s: `$15$ giây $= \\dfrac{15}{60} = 0,25$ phút.`, d: 'van_dung_cao' },
  ]},
  { id: 'ec1ab088-d5d1-4717-a508-e7ffa598dbb2', p: 'T5-B35', q: [
    { c: `Tính: $5,7 + 3,45$.`, a: `$9,15$.`, s: `$5,70 + 3,45 = 9,15$.`, d: 'nhan_biet' },
    { c: `Tính: $12 - 7,6$.`, a: `$4,4$.`, s: `$12,0 - 7,6 = 4,4$.`, d: 'nhan_biet' },
    { c: `$\\dfrac{5}{8}$ viết thành STP?`, a: `$0,625$.`, s: `$\\dfrac{5}{8} = \\dfrac{625}{1000} = 0,625$.`, d: 'thong_hieu' },
    { c: `Sắp xếp giảm dần: $3,5$; $3,05$; $3,55$.`, a: `$3,55 > 3,5 > 3,05$.`, s: `$3,55 > 3,50 > 3,05$.`, d: 'thong_hieu' },
    { c: `Tính: $0,8 \\times 0,25$.`, a: `$0,2$.`, s: `$8 \\times 25 = 200$. $3$ chữ số TP → $0,200 = 0,2$.`, d: 'thong_hieu' },
    { c: `Tính: $4,5 \\times 2 + 3,5 \\times 2$.`, a: `$16$.`, s: `$(4,5 + 3,5) \\times 2 = 8 \\times 2 = 16$.`, d: 'van_dung' },
    { c: `HCN dài $6,5$ cm, rộng $4$ cm. Tính $C$ và $S$.`, a: `$C = 21$ cm, $S = 26\\text{ cm}^2$.`, s: `$C = (6,5+4) \\times 2 = 21$. $S = 6,5 \\times 4 = 26$.`, d: 'van_dung' },
    { c: `Mua $2,4$ kg đường giá $18\\,500$ đ/kg. Trả bao nhiêu?`, a: `$44\\,400$ đồng.`, s: `$18\\,500 \\times 2,4 = 44\\,400$ đồng.`, d: 'van_dung' },
    { c: `Tìm $x$: $x \\times 1,5 + x \\times 3,5 = 20$.`, a: `$x = 4$.`, s: `$x \\times (1,5 + 3,5) = 20$. $5x = 20$. $x = 4$.`, d: 'van_dung_cao' },
    { c: `HT có $S = 36\\text{ cm}^2$, cao $4,5$ cm. Tổng $2$ đáy?`, a: `$16$ cm.`, s: `$a + b = 2S : h = 72 : 4,5 = 16$ cm.`, d: 'van_dung_cao' },
  ]},
  // ======== CĐ7 - Bài 36-44 ========
  { id: 'ef00c7a5-5b97-4fda-a1b5-99c50de2e131', p: 'T5-B36', q: [
    { c: `Tỉ số của $3$ và $5$ là bao nhiêu?`, a: `$\\dfrac{3}{5}$.`, s: `Tỉ số $= 3 : 5 = \\dfrac{3}{5}$.`, d: 'nhan_biet' },
    { c: `$25\\%$ viết thành phân số?`, a: `$\\dfrac{25}{100} = \\dfrac{1}{4}$.`, s: `$25\\% = \\dfrac{25}{100} = \\dfrac{1}{4}$.`, d: 'nhan_biet' },
    { c: `$\\dfrac{3}{4}$ viết thành tỉ số phần trăm?`, a: `$75\\%$.`, s: `$\\dfrac{3}{4} = \\dfrac{75}{100} = 75\\%$.`, d: 'thong_hieu' },
    { c: `$0,6$ viết thành tỉ số phần trăm?`, a: `$60\\%$.`, s: `$0,6 = \\dfrac{60}{100} = 60\\%$.`, d: 'thong_hieu' },
    { c: `$150\\%$ viết thành STP?`, a: `$1,5$.`, s: `$150\\% = \\dfrac{150}{100} = 1,5$.`, d: 'thong_hieu' },
    { c: `Lớp $40$ HS, $15$ HS nữ. Tỉ số HS nữ so với cả lớp?`, a: `$\\dfrac{15}{40} = \\dfrac{3}{8} = 37,5\\%$.`, s: `$\\dfrac{15}{40} = 37,5\\%$.`, d: 'van_dung' },
    { c: `$20\\%$ của $150$ là bao nhiêu?`, a: `$30$.`, s: `$150 \\times \\dfrac{20}{100} = 30$.`, d: 'van_dung' },
    { c: `Giá gốc $200\\,000$ đ, giảm $15\\%$. Giá bán?`, a: `$170\\,000$ đồng.`, s: `Giảm: $200\\,000 \\times 0,15 = 30\\,000$. Giá bán: $170\\,000$ đ.`, d: 'van_dung_cao' },
    { c: `$45$ là bao nhiêu $\\%$ của $60$?`, a: `$75\\%$.`, s: `$\\dfrac{45}{60} = 0,75 = 75\\%$.`, d: 'van_dung_cao' },
    { c: `Số HS giỏi $= 30\\%$ của $40$ HS. Có bao nhiêu HS không giỏi?`, a: `$28$ HS.`, s: `Giỏi: $12$ HS. Không giỏi: $40 - 12 = 28$.`, d: 'van_dung' },
  ]},
  { id: '7fc5e87a-018b-4903-8bd9-390cf4d4f31c', p: 'T5-B37', q: [
    { c: `Tỉ lệ bản đồ $1 : 1\\,000$ nghĩa là gì?`, a: `$1$ cm trên bản đồ $= 1\\,000$ cm ($= 10$ m) thực tế.`, s: `Mỗi cm trên bản đồ tương ứng $1\\,000$ cm ngoài thực tế.`, d: 'nhan_biet' },
    { c: `Bản đồ tỉ lệ $1:10\\,000$. Đoạn $5$ cm trên bản đồ $= ?$ m thực tế.`, a: `$500$ m.`, s: `$5 \\times 10\\,000 = 50\\,000$ cm $= 500$ m.`, d: 'nhan_biet' },
    { c: `Quãng đường thực tế $3$ km. Tỉ lệ $1:100\\,000$. Trên BĐ bao nhiêu cm?`, a: `$3$ cm.`, s: `$3$ km $= 300\\,000$ cm. $300\\,000 : 100\\,000 = 3$ cm.`, d: 'thong_hieu' },
    { c: `Sân trường dài $60$ m, rộng $40$ m. Vẽ tỉ lệ $1:1\\,000$. Kích thước?`, a: `$6$ cm $\\times$ $4$ cm.`, s: `$60\\,00 : 1\\,000 = 6$ cm. $40\\,00 : 1\\,000 = 4$ cm.`, d: 'thong_hieu' },
    { c: `BĐ $1:500$. Phòng HCN $3$ cm $\\times$ $2$ cm trên BĐ. Kích thước thực?`, a: `$15$ m $\\times$ $10$ m.`, s: `$3 \\times 500 = 1\\,500$ cm $= 15$ m. $2 \\times 500 = 1\\,000$ cm $= 10$ m.`, d: 'thong_hieu' },
    { c: `Đoạn đường $8$ km. BĐ tỉ lệ $1:200\\,000$. Trên BĐ bao nhiêu cm?`, a: `$4$ cm.`, s: `$8$ km $= 800\\,000$ cm. $800\\,000 : 200\\,000 = 4$ cm.`, d: 'van_dung' },
    { c: `BĐ $1:5\\,000$. Mảnh đất HV cạnh $2$ cm trên BĐ. DT thực?`, a: `$10\\,000\\text{ m}^2 = 1$ ha.`, s: `Cạnh thực $= 2 \\times 5\\,000 = 10\\,000$ cm $= 100$ m. $S = 100 \\times 100 = 10\\,000\\text{ m}^2$.`, d: 'van_dung' },
    { c: `Hai thành phố cách $240$ km. BĐ $1:4\\,000\\,000$. Khoảng cách trên BĐ?`, a: `$6$ cm.`, s: `$240$ km $= 24\\,000\\,000$ cm. $24\\,000\\,000 : 4\\,000\\,000 = 6$ cm.`, d: 'van_dung_cao' },
    { c: `BĐ $1:25\\,000$. Đoạn $7,2$ cm trên BĐ $= ?$ km thực.`, a: `$1,8$ km.`, s: `$7,2 \\times 25\\,000 = 180\\,000$ cm $= 1\\,800$ m $= 1,8$ km.`, d: 'van_dung_cao' },
    { c: `Đoạn đường $15$ km vẽ trên BĐ dài $3$ cm. Tỉ lệ BĐ?`, a: `$1:500\\,000$.`, s: `$15$ km $= 1\\,500\\,000$ cm. $1\\,500\\,000 : 3 = 500\\,000$.`, d: 'van_dung_cao' },
  ]},
  { id: '1425a4ee-d5eb-4b6a-8865-83c0d2ad25ab', p: 'T5-B38', q: [
    { c: `Tổng $2$ số $= 72$, tỉ số $= \\dfrac{1}{3}$. Tìm $2$ số.`, a: `$18$ và $54$.`, s: `Số bé: $72 : (1+3) = 18$. Số lớn: $54$.`, d: 'nhan_biet' },
    { c: `Tổng $= 100$, tỉ $= \\dfrac{2}{3}$. Tìm $2$ số.`, a: `$40$ và $60$.`, s: `Số bé: $100 : (2+3) \\times 2 = 40$. Số lớn: $60$.`, d: 'thong_hieu' },
    { c: `Tổng $= 45$, tỉ $= \\dfrac{4}{5}$. Tìm $2$ số.`, a: `$20$ và $25$.`, s: `Số bé: $45 : 9 \\times 4 = 20$. Số lớn: $25$.`, d: 'thong_hieu' },
    { c: `Hai lớp có $84$ HS, tỉ số $= \\dfrac{3}{4}$. Mỗi lớp bao nhiêu?`, a: `$36$ và $48$ HS.`, s: `Lớp A: $84 : 7 \\times 3 = 36$. Lớp B: $48$.`, d: 'van_dung' },
    { c: `Tổng $2$ số $= 156$, tỉ số $= \\dfrac{5}{7}$. Tìm.`, a: `$65$ và $91$.`, s: `$156 : 12 = 13$. Số bé: $65$. Số lớn: $91$.`, d: 'van_dung' },
    { c: `HCN chu vi $36$ cm, tỉ dài:rộng $= 5:4$. Kích thước?`, a: `Dài $10$ cm, rộng $8$ cm.`, s: `Nửa CV $= 18$. Dài: $18 : 9 \\times 5 = 10$. Rộng: $8$.`, d: 'van_dung_cao' },
    { c: `Tổng $= 200$, gấp $3$ lần. Tìm $2$ số.`, a: `$50$ và $150$.`, s: `Tỉ $= \\dfrac{1}{3}$. Số bé: $200 : 4 = 50$. Lớn: $150$.`, d: 'thong_hieu' },
    { c: `$3$ số có tổng $120$, tỉ $= 2:3:5$. Tìm $3$ số.`, a: `$24$; $36$; $60$.`, s: `$120 : 10 = 12$. $24$; $36$; $60$.`, d: 'van_dung_cao' },
    { c: `Tổng $= 63$, tỉ $= \\dfrac{2}{5}$. Tìm.`, a: `$18$ và $45$.`, s: `$63 : 7 = 9$. $18$ và $45$.`, d: 'nhan_biet' },
    { c: `Tổng tuổi cha con $= 50$, tỉ $= \\dfrac{1}{4}$. Tuổi mỗi người?`, a: `Con $10$, cha $40$.`, s: `Con: $50 : 5 = 10$. Cha: $40$.`, d: 'van_dung' },
  ]},
  { id: '5b0e0123-27a5-4f10-a4eb-0ae189d072b2', p: 'T5-B39', q: [
    { c: `Hiệu $2$ số $= 24$, tỉ $= \\dfrac{1}{3}$. Tìm.`, a: `$12$ và $36$.`, s: `Số bé: $24 : (3-1) = 12$. Lớn: $36$.`, d: 'nhan_biet' },
    { c: `Hiệu $= 30$, tỉ $= \\dfrac{2}{5}$. Tìm.`, a: `$20$ và $50$.`, s: `$30 : (5-2) \\times 2 = 20$. Lớn: $50$.`, d: 'thong_hieu' },
    { c: `Hiệu $= 45$, gấp $4$ lần. Tìm.`, a: `$15$ và $60$.`, s: `Tỉ $\\dfrac{1}{4}$. Bé: $45 : 3 = 15$. Lớn: $60$.`, d: 'thong_hieu' },
    { c: `Hiệu $= 18$, tỉ $= \\dfrac{3}{5}$. Tìm.`, a: `$27$ và $45$.`, s: `$18 : 2 = 9$. $27$ và $45$.`, d: 'thong_hieu' },
    { c: `Cha hơn con $30$ tuổi, tỉ $= \\dfrac{1}{4}$. Tuổi?`, a: `Con $10$, cha $40$.`, s: `Con: $30 : 3 = 10$. Cha: $40$.`, d: 'van_dung' },
    { c: `Hiệu $= 125$, tỉ $= \\dfrac{3}{8}$. Tìm.`, a: `$75$ và $200$.`, s: `$125 : 5 = 25$. Bé: $75$. Lớn: $200$.`, d: 'van_dung' },
    { c: `HCN dài hơn rộng $6$ cm, tỉ $= 2:5$. Kích thước?`, a: `Rộng $4$ cm, dài $10$ cm.`, s: `$6 : 3 = 2$. Rộng: $4$. Dài: $10$.`, d: 'van_dung_cao' },
    { c: `Hiệu $= 36$, tỉ $= \\dfrac{2}{5}$. Tìm.`, a: `$24$ và $60$.`, s: `$36 : 3 = 12$. $24$ và $60$.`, d: 'nhan_biet' },
    { c: `Hiệu $= 42$, gấp $7$ lần. Tìm.`, a: `$7$ và $49$.`, s: `Bé: $42 : 6 = 7$. Lớn: $49$.`, d: 'van_dung' },
    { c: `$3$ số tỉ $1:2:3$, số lớn nhất hơn nhỏ nhất $= 40$. Tìm.`, a: `$20$; $40$; $60$.`, s: `Hiệu lớn-nhỏ: $3-1 = 2$ phần. $40 : 2 = 20$. $20$; $40$; $60$.`, d: 'van_dung_cao' },
  ]},
];

async function main() {
  let total = 0;
  for (const b of B) {
    console.log('=== '+b.p+' ===');
    let c = 0;
    const topic = b.t || T;
    for (const q of b.q) {
      const code = b.p+'-'+String(c+1).padStart(3,'0');
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${topic},${q.d},'tu_luan',${b.id},'approved',true,${code},${U})`;
      c++; console.log('OK: '+code);
    }
    total += c;
  }
  console.log('Total inserted: '+total);
}
main().catch(console.error);
