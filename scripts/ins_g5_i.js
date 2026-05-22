const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 5, T = 'toan_chuyen_dong';

const B = [
  { id: '4c96cec4-d385-4ed1-954d-34d52bd6c867', p: 'T5-B56', t: 'dai_so', q: [
    { c: `$1$ năm có bao nhiêu tháng?`, a: `$12$ tháng.`, s: `Một năm có 12 tháng.`, d: 'nhan_biet' },
    { c: `$1$ năm nhuận có bao nhiêu ngày?`, a: `$366$ ngày.`, s: `Năm bình thường $365$ ngày, năm nhuận $366$ ngày.`, d: 'nhan_biet' },
    { c: `$2$ năm $6$ tháng bằng bao nhiêu tháng?`, a: `$30$ tháng.`, s: `$2 \\times 12 + 6 = 30$ tháng.`, d: 'thong_hieu' },
    { c: `$48$ tháng bằng bao nhiêu năm?`, a: `$4$ năm.`, s: `$48 : 12 = 4$ năm.`, d: 'thong_hieu' },
    { c: `$1$ ngày có bao nhiêu giờ?`, a: `$24$ giờ.`, s: `Một ngày đêm có $24$ giờ.`, d: 'nhan_biet' },
    { c: `$3$ ngày $12$ giờ bằng bao nhiêu giờ?`, a: `$84$ giờ.`, s: `$3 \\times 24 + 12 = 84$ giờ.`, d: 'thong_hieu' },
    { c: `$1$ giờ $15$ phút bằng bao nhiêu phút?`, a: `$75$ phút.`, s: `$1 \\times 60 + 15 = 75$ phút.`, d: 'thong_hieu' },
    { c: `$\\dfrac{1}{4}$ giờ bằng bao nhiêu phút?`, a: `$15$ phút.`, s: `$\\dfrac{1}{4} \\times 60 = 15$ phút.`, d: 'van_dung' },
    { c: `$1$ tuần có bao nhiêu giờ?`, a: `$168$ giờ.`, s: `$7 \\times 24 = 168$ giờ.`, d: 'van_dung' },
    { c: `Đổi $1,5$ giờ ra phút.`, a: `$90$ phút.`, s: `$1,5 \\times 60 = 90$ phút.`, d: 'van_dung' },
  ]},
  { id: '5ef8a638-6638-44ea-bd5e-137fddff7132', p: 'T5-B57', t: 'dai_so', q: [
    { c: `$3$ giờ $15$ phút + $2$ giờ $30$ phút = ?`, a: `$5$ giờ $45$ phút.`, s: `Cộng giờ với giờ: $5$ giờ. Cộng phút với phút: $45$ phút.`, d: 'nhan_biet' },
    { c: `$4$ năm $8$ tháng + $2$ năm $6$ tháng = ?`, a: `$7$ năm $2$ tháng.`, s: `$6$ năm $14$ tháng $= 7$ năm $2$ tháng.`, d: 'thong_hieu' },
    { c: `$5$ giờ $45$ phút + $1$ giờ $20$ phút = ?`, a: `$7$ giờ $5$ phút.`, s: `$6$ giờ $65$ phút $= 7$ giờ $5$ phút.`, d: 'thong_hieu' },
    { c: `$6$ ngày $15$ giờ - $2$ ngày $5$ giờ = ?`, a: `$4$ ngày $10$ giờ.`, s: `$6-2 = 4$ ngày, $15-5 = 10$ giờ.`, d: 'nhan_biet' },
    { c: `$4$ giờ $20$ phút - $1$ giờ $45$ phút = ?`, a: `$2$ giờ $35$ phút.`, s: `Đổi thành $3$ giờ $80$ phút - $1$ giờ $45$ phút = $2$ giờ $35$ phút.`, d: 'van_dung' },
    { c: `$8$ năm $5$ tháng - $3$ năm $9$ tháng = ?`, a: `$4$ năm $8$ tháng.`, s: `Đổi thành $7$ năm $17$ tháng - $3$ năm $9$ tháng = $4$ năm $8$ tháng.`, d: 'van_dung' },
    { c: `Một người làm việc từ $7$ giờ $30$ phút đến $11$ giờ $15$ phút. Thời gian làm việc là bao nhiêu?`, a: `$3$ giờ $45$ phút.`, s: `$11$ giờ $15$ phút - $7$ giờ $30$ phút = $3$ giờ $45$ phút.`, d: 'van_dung' },
    { c: `Xe xuất phát lúc $8$ giờ, đi hết $2$ giờ $45$ phút. Xe đến nơi lúc mấy giờ?`, a: `$10$ giờ $45$ phút.`, s: `$8$ giờ + $2$ giờ $45$ phút = $10$ giờ $45$ phút.`, d: 'thong_hieu' },
    { c: `Máy A chạy $1$ giờ $50$ phút, máy B chạy nhiều hơn máy A $40$ phút. Máy B chạy bao lâu?`, a: `$2$ giờ $30$ phút.`, s: `$1$ giờ $50$ phút + $40$ phút = $1$ giờ $90$ phút = $2$ giờ $30$ phút.`, d: 'van_dung' },
    { c: `$3,5$ giờ + $1,25$ giờ = ?`, a: `$4,75$ giờ.`, s: `$3,5 + 1,25 = 4,75$ giờ (tương đương $4$ giờ $45$ phút).`, d: 'van_dung_cao' },
  ]},
  { id: 'c8a69f52-68bf-409c-b6b2-08380fed275a', p: 'T5-B58', t: 'dai_so', q: [
    { c: `($2$ giờ $15$ phút) $\\times 3 = ?$`, a: `$6$ giờ $45$ phút.`, s: `$2 \\times 3 = 6$ giờ; $15 \\times 3 = 45$ phút.`, d: 'nhan_biet' },
    { c: `($1$ năm $5$ tháng) $\\times 4 = ?$`, a: `$5$ năm $8$ tháng.`, s: `$4$ năm $20$ tháng $= 5$ năm $8$ tháng.`, d: 'thong_hieu' },
    { c: `Một công nhân làm 1 sản phẩm hết $1$ giờ $20$ phút. Làm 5 sản phẩm hết bao lâu?`, a: `$6$ giờ $40$ phút.`, s: `$1$ giờ $20$ phút $\\times 5 = 5$ giờ $100$ phút $= 6$ giờ $40$ phút.`, d: 'van_dung' },
    { c: `$8$ giờ $40$ phút $\\div 4 = ?$`, a: `$2$ giờ $10$ phút.`, s: `$8 : 4 = 2$ giờ; $40 : 4 = 10$ phút.`, d: 'nhan_biet' },
    { c: `$7$ giờ $15$ phút $\\div 3 = ?$`, a: `$2$ giờ $25$ phút.`, s: `$7$ giờ $= 6$ giờ + $60$ phút. $6:3 = 2$ giờ; $75:3 = 25$ phút.`, d: 'van_dung' },
    { c: `Làm 4 bài toán hết $1$ giờ $12$ phút. Trung bình 1 bài hết bao lâu?`, a: `$18$ phút.`, s: `$1$ giờ $12$ phút $= 72$ phút. $72 : 4 = 18$ phút.`, d: 'van_dung' },
    { c: `($3$ ngày $8$ giờ) $\\times 2 = ?$`, a: `$6$ ngày $16$ giờ.`, s: `$3 \\times 2 = 6$ ngày; $8 \\times 2 = 16$ giờ.`, d: 'thong_hieu' },
    { c: `$14$ phút $30$ giây $\\div 5 = ?$`, a: `$2$ phút $54$ giây.`, s: `$14$ phút $= 10$ phút + $240$ giây. $10:5=2$ phút; $270:5 = 54$ giây.`, d: 'van_dung_cao' },
    { c: `Một người làm 3 ca, mỗi ca $2$ giờ $45$ phút. Tổng thời gian làm việc?`, a: `$8$ giờ $15$ phút.`, s: `$2$ giờ $45$ phút $\\times 3 = 6$ giờ $135$ phút $= 8$ giờ $15$ phút.`, d: 'van_dung' },
    { c: `Một vòi nước chảy vào bể trong 3 lần, mỗi lần $1$ giờ $20$ phút thì đầy. Bể đầy sau bao lâu?`, a: `$4$ giờ.`, s: `$1$ giờ $20$ phút $\\times 3 = 3$ giờ $60$ phút $= 4$ giờ.`, d: 'thong_hieu' },
  ]},
  { id: '2cb8fd6e-3356-4a3e-8f3f-378b17380b0b', p: 'T5-B59', t: 'toan_chuyen_dong', q: [
    { c: `Công thức tính vận tốc?`, a: `$v = s : t$.`, s: `Vận tốc bằng quãng đường chia cho thời gian.`, d: 'nhan_biet' },
    { c: `Ô tô đi $120$ km trong $2$ giờ. Vận tốc là bao nhiêu?`, a: `$60$ km/h.`, s: `$120 : 2 = 60$ km/h.`, d: 'nhan_biet' },
    { c: `Người chạy bộ $15$ km trong $3$ giờ. Vận tốc là?`, a: `$5$ km/h.`, s: `$15 : 3 = 5$ km/h.`, d: 'thong_hieu' },
    { c: `Xe máy đi $45$ km hết $1$ giờ $30$ phút. Vận tốc xe máy?`, a: `$30$ km/h.`, s: `$1$ giờ $30$ phút $= 1,5$ giờ. $v = 45 : 1,5 = 30$ km/h.`, d: 'van_dung' },
    { c: `Một con báo chạy $180$ m trong $6$ giây. Vận tốc con báo là?`, a: `$30$ m/giây.`, s: `$180 : 6 = 30$ m/giây.`, d: 'thong_hieu' },
    { c: `Vận tốc $36$ km/h đổi ra m/giây bằng bao nhiêu?`, a: `$10$ m/giây.`, s: `$36\\,000\\text{ m} : 3\\,600\\text{ s} = 10$ m/s.`, d: 'van_dung_cao' },
    { c: `Vận tốc $15$ m/giây đổi ra km/h bằng bao nhiêu?`, a: `$54$ km/h.`, s: `$15 \\times 3,6 = 54$ km/h.`, d: 'van_dung_cao' },
    { c: `Quãng đường AB dài $150$ km. Xe khởi hành lúc $7$ giờ, đến nơi lúc $9$ giờ $30$ phút. Tính vận tốc.`, a: `$60$ km/h.`, s: `$t = 2,5$ giờ. $v = 150 : 2,5 = 60$ km/h.`, d: 'van_dung' },
    { c: `Ca nô đi $24$ km trong $45$ phút. Vận tốc ca nô là bao nhiêu km/h?`, a: `$32$ km/h.`, s: `$45$ phút $= 0,75$ giờ. $v = 24 : 0,75 = 32$ km/h.`, d: 'van_dung' },
    { c: `Tàu hoả đi được $18$ km trong $15$ phút. Tính vận tốc km/h.`, a: `$72$ km/h.`, s: `$15$ phút $= 1/4$ giờ. $v = 18 \\times 4 = 72$ km/h.`, d: 'van_dung_cao' },
  ]},
  { id: 'd5cfc8eb-7237-4054-93d3-3576d2dac0e6', p: 'T5-B60', t: 'toan_chuyen_dong', q: [
    { c: `Công thức tính quãng đường?`, a: `$s = v \\times t$.`, s: `Quãng đường bằng vận tốc nhân thời gian.`, d: 'nhan_biet' },
    { c: `Công thức tính thời gian?`, a: `$t = s : v$.`, s: `Thời gian bằng quãng đường chia vận tốc.`, d: 'nhan_biet' },
    { c: `Xe máy đi với vận tốc $40$ km/h trong $2$ giờ. Tính quãng đường.`, a: `$80$ km.`, s: `$40 \\times 2 = 80$ km.`, d: 'thong_hieu' },
    { c: `Ô tô đi với vận tốc $50$ km/h. Hỏi đi $150$ km hết bao lâu?`, a: `$3$ giờ.`, s: `$150 : 50 = 3$ giờ.`, d: 'thong_hieu' },
    { c: `Xe đạp đi $12$ km/h trong $1$ giờ $15$ phút. Quãng đường dài bao nhiêu?`, a: `$15$ km.`, s: `$1$ giờ $15$ phút $= 1,25$ giờ. $s = 12 \\times 1,25 = 15$ km.`, d: 'van_dung' },
    { c: `Tàu hoả đi được $180$ km với vận tốc $60$ km/h. Tàu xuất phát lúc $6$ giờ thì đến nơi lúc mấy giờ?`, a: `$9$ giờ.`, s: `Thời gian đi: $180 : 60 = 3$ giờ. $6 + 3 = 9$ giờ.`, d: 'van_dung' },
    { c: `Vận tốc âm thanh là $340$ m/s. Một người nghe thấy tiếng sét sau $5$ giây kể từ lúc chớp. Khoảng cách?`, a: `$1\\,700$ m.`, s: `$340 \\times 5 = 1\\,700$ m.`, d: 'van_dung_cao' },
    { c: `Người đi bộ $5$ km/h trên quãng đường $12,5$ km. Thời gian đi?`, a: `$2$ giờ $30$ phút.`, s: `$12,5 : 5 = 2,5$ giờ $= 2$ giờ $30$ phút.`, d: 'thong_hieu' },
    { c: `Ca nô đi ngược dòng $15$ km/h trong $2$ giờ $20$ phút. Tính quãng đường.`, a: `$35$ km.`, s: `$2$ giờ $20$ phút $= 7/3$ giờ. $s = 15 \\times (7/3) = 35$ km.`, d: 'van_dung_cao' },
    { c: `Quãng đường $90$ km. Nửa đường đầu đi $45$ km/h, nửa sau đi $30$ km/h. Tổng thời gian?`, a: `$2,5$ giờ.`, s: `$45$ km đầu: $1$ giờ. $45$ km sau: $1,5$ giờ. Tổng $2,5$ giờ.`, d: 'van_dung_cao' },
  ]},
  { id: '00f6253a-49a8-498a-985c-d27dd8ae033f', p: 'T5-B61', t: 'toan_chuyen_dong', q: [
    { c: `Hai xe xuất phát cùng lúc ngược chiều nhau, quãng đường $s$, vận tốc $v_1, v_2$. Thời gian gặp nhau?`, a: `$t = s : (v_1 + v_2)$.`, s: `Thời gian gặp bằng khoảng cách ban đầu chia tổng vận tốc.`, d: 'nhan_biet' },
    { c: `Hai xe cách nhau $100$ km đi ngược chiều. $v_1 = 40$ km/h, $v_2 = 60$ km/h. Bao lâu gặp nhau?`, a: `$1$ giờ.`, s: `$100 : (40 + 60) = 1$ giờ.`, d: 'thong_hieu' },
    { c: `Hai xe cùng chiều, cách nhau $s$, $v_1 > v_2$. Thời gian đuổi kịp?`, a: `$t = s : (v_1 - v_2)$.`, s: `Thời gian đuổi kịp bằng khoảng cách chia hiệu vận tốc.`, d: 'nhan_biet' },
    { c: `Xe máy đi trước ô tô $20$ km. Xe máy $40$ km/h, ô tô $50$ km/h. Bao lâu ô tô đuổi kịp?`, a: `$2$ giờ.`, s: `$20 : (50 - 40) = 2$ giờ.`, d: 'thong_hieu' },
    { c: `Quãng đường $120$ km. Xe A đi $50$ km/h, xe B ngược chiều $30$ km/h cùng lúc. Thời gian gặp?`, a: `$1,5$ giờ.`, s: `$120 : (50 + 30) = 1,5$ giờ.`, d: 'van_dung' },
    { c: `Hai xe khởi hành lúc $7$ giờ ngược chiều cách nhau $140$ km. Vận tốc $30$ km/h và $40$ km/h. Mấy giờ gặp nhau?`, a: `$9$ giờ.`, s: `Thời gian đi: $140 : 70 = 2$ giờ. $7+2 = 9$ giờ.`, d: 'van_dung' },
    { c: `Chó đuổi thỏ cách $50$ m. Chó chạy $10$ m/s, thỏ $8$ m/s. Bao lâu bắt được?`, a: `$25$ giây.`, s: `$50 : (10 - 8) = 25$ giây.`, d: 'van_dung' },
    { c: `Ca nô xuôi dòng $v_{\\text{thực}} = 20$ km/h, $v_{\\text{nước}} = 5$ km/h. Vận tốc xuôi dòng?`, a: `$25$ km/h.`, s: `$v_{\\text{xuôi}} = v_{\\text{thực}} + v_{\\text{nước}} = 20 + 5 = 25$.`, d: 'thong_hieu' },
    { c: `Ca nô ngược dòng $v_{\\text{thực}} = 20$ km/h, $v_{\\text{nước}} = 5$ km/h. Vận tốc ngược dòng?`, a: `$15$ km/h.`, s: `$v_{\\text{ngược}} = 20 - 5 = 15$.`, d: 'thong_hieu' },
    { c: `Một tàu đi qua cầu dài $450$ m hết $45$ giây. Tàu dài $150$ m. Vận tốc tàu?`, a: `$48$ km/h.`, s: `Quãng đường $= 450 + 150 = 600$ m. Vận tốc $= 600 / 45 = 40/3$ m/s $= 48$ km/h.`, d: 'van_dung_cao' },
  ]},
  { id: '1dd1c8ab-663f-4d0f-8232-1c13d381736b', p: 'T5-B62', t: 'toan_chuyen_dong', q: [
    { c: `Một người đi bộ $1$ giờ $15$ phút được $6$ km. Tính vận tốc người đó.`, a: `$4,8$ km/h.`, s: `$1,25$ giờ. $v = 6 : 1,25 = 4,8$ km/h.`, d: 'thong_hieu' },
    { c: `Quãng đường $25$ km. Vận tốc $10$ km/h. Đi lúc $6$ giờ $30$ phút thì đến lúc mấy giờ?`, a: `$9$ giờ.`, s: `$t = 25 : 10 = 2,5$ giờ $= 2$ giờ $30$ phút. $6\\text{h}30 + 2\\text{h}30 = 9\\text{h}$.`, d: 'van_dung' },
    { c: `Hai xe ngược chiều $40$ km/h và $50$ km/h, gặp nhau sau $2$ giờ. Quãng đường dài?`, a: `$180$ km.`, s: `$s = (40 + 50) \\times 2 = 180$ km.`, d: 'van_dung' },
    { c: `Người đi xe đạp trước $2$ giờ với $15$ km/h. Ô tô đuổi theo $45$ km/h. Bao lâu đuổi kịp?`, a: `$1$ giờ.`, s: `Khoảng cách: $15 \\times 2 = 30$ km. $t = 30 : (45 - 15) = 1$ giờ.`, d: 'van_dung_cao' },
    { c: `Lúc $7$ giờ, A đi về B $40$ km/h. Lúc $7$ giờ $30$ phút, B đi về A $50$ km/h. AB dài $110$ km. Mấy giờ gặp?`, a: `$8$ giờ $30$ phút.`, s: `A đi trước $0,5$ giờ được $20$ km. Còn lại $90$ km. $90 : 90 = 1$ giờ. $7\\text{h}30 + 1\\text{h} = 8\\text{h}30$.`, d: 'van_dung_cao' },
    { c: `Ca nô xuôi $30$ km/h, ngược $20$ km/h. Tính $v_{\\text{nước}}$.`, a: `$5$ km/h.`, s: `$v_{\\text{nước}} = (30 - 20) : 2 = 5$ km/h.`, d: 'van_dung_cao' },
    { c: `Vận tốc $12$ km/h đi $s$ mất $3$ giờ. Nếu đi $18$ km/h mất mấy giờ?`, a: `$2$ giờ.`, s: `$s = 12 \\times 3 = 36$ km. $t = 36 : 18 = 2$ giờ.`, d: 'van_dung' },
    { c: `Một con chim bay $15$ m/s trong $2$ phút. Quãng đường?`, a: `$1\\,800$ m.`, s: `$2$ phút $= 120$ giây. $s = 15 \\times 120 = 1\\,800$ m.`, d: 'thong_hieu' },
    { c: `Quãng đường $AB$ dài $120$ km. Lúc $6$ giờ một người đi từ A đến B với vận tốc $40$ km/h. Đến B nghỉ $30$ phút rồi quay về A với $50$ km/h. Về A lúc mấy giờ?`, a: `$11$ giờ $54$ phút.`, s: `Đi: $3$ h. Nghỉ $0,5$ h. Về: $2,4$ h. Tổng: $5,9$ h $= 5$ giờ $54$ phút. Về đến nơi: $11$ giờ $54$ phút.`, d: 'van_dung_cao' },
    { c: `Hai người đi xe đạp ngược chiều cách nhau $60$ km, cùng xuất phát. Sau $2$ giờ gặp nhau. Vận tốc người A là $14$ km/h, vận tốc B là?`, a: `$16$ km/h.`, s: `Tổng vận tốc $= 60 : 2 = 30$ km/h. $v_B = 30 - 14 = 16$ km/h.`, d: 'van_dung' },
  ]}
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
