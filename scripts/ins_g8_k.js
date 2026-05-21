const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8;
const B = [
  { id: '6c66a73a-5aed-46cd-8c70-241ef532c429', p: 'T8-C8B30', t: 'xac_suat', q: [
    { c: `Kết quả có thể là gì?`, a: `Các kết quả có thể xảy ra khi thực hiện phép thử.`, s: `Kết quả có thể là tất cả các kết quả mà phép thử ngẫu nhiên có thể cho ra.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc $1$ lần. Liệt kê các kết quả có thể.`, a: `$\\{1,2,3,4,5,6\\}$.`, s: `$6$ kết quả: $1, 2, 3, 4, 5, 6$.`, d: 'nhan_biet' },
    { c: `Tung đồng xu $1$ lần. Có bao nhiêu kết quả có thể?`, a: `$2$: sấp, ngửa.`, s: `$2$ kết quả: sấp (S) và ngửa (N).`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. Biến cố "ra mặt chẵn". Liệt kê kết quả thuận lợi.`, a: `$\\{2, 4, 6\\}$.`, s: `Mặt chẵn: $2, 4, 6$. Có $3$ kết quả thuận lợi.`, d: 'thong_hieu' },
    { c: `Tung $2$ đồng xu. Liệt kê không gian mẫu.`, a: `$\\{SS, SN, NS, NN\\}$.`, s: `$4$ kết quả: $SS, SN, NS, NN$.`, d: 'thong_hieu' },
    { c: `Rút $1$ thẻ từ $10$ thẻ ($1$-$10$). Kết quả thuận lợi cho biến cố "rút số nguyên tố"?`, a: `$\\{2,3,5,7\\}$.`, s: `Số nguyên tố từ $1$-$10$: $2, 3, 5, 7$. Có $4$ kết quả thuận lợi.`, d: 'thong_hieu' },
    { c: `Gieo $2$ xúc xắc. Tính số kết quả có thể.`, a: `$36$.`, s: `$6 \\times 6 = 36$ kết quả.`, d: 'van_dung' },
    { c: `Gieo $2$ xúc xắc. Liệt kê kết quả thuận lợi cho "tổng bằng $7$".`, a: `$(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$.`, s: `$6$ cặp: $(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$.`, d: 'van_dung' },
    { c: `Chọn ngẫu nhiên $2$ HS từ nhóm $3$ nam, $2$ nữ. Liệt kê các cách chọn.`, a: `$C_5^2 = 10$ cách.`, s: `$5$ HS: $N_1,N_2,N_3,G_1,G_2$. Chọn $2$: $C_5^2 = 10$ cách.`, d: 'van_dung_cao' },
    { c: `Xếp $3$ HS vào hàng ngang. Bao nhiêu cách xếp?`, a: `$6$.`, s: `$3! = 6$ cách xếp.`, d: 'van_dung_cao' },
  ]},
  { id: '90a988ed-5a5b-4a9e-ac09-76746c5958d3', p: 'T8-C8B31', t: 'xac_suat', q: [
    { c: `Công thức tính xác suất cổ điển?`, a: `$P(A) = \\frac{m}{n}$.`, s: `$P(A) = \\frac{\\text{số kết quả thuận lợi}}{\\text{tổng số kết quả}}= \\frac{m}{n}$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. Tính $P$(ra mặt $6$).`, a: `$\\frac{1}{6}$.`, s: `$P = \\frac{1}{6}$.`, d: 'nhan_biet' },
    { c: `Tung đồng xu. $P$(ngửa) $= ?$`, a: `$\\frac{1}{2}$.`, s: `$P = \\frac{1}{2}$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc. Tính $P$(mặt chẵn).`, a: `$\\frac{1}{2}$.`, s: `$3$ mặt chẵn trong $6$. $P = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Rút $1$ thẻ từ $10$ thẻ ($1$-$10$). $P$(số chia hết cho $3$)?`, a: `$\\frac{3}{10}$.`, s: `Chia hết cho $3$: $3,6,9$. $P = \\frac{3}{10}$.`, d: 'thong_hieu' },
    { c: `Hộp có $4$ bi đỏ, $6$ bi xanh. Rút $1$ bi. $P$(đỏ)?`, a: `$\\frac{2}{5}$.`, s: `$P = \\frac{4}{10} = \\frac{2}{5}$.`, d: 'thong_hieu' },
    { c: `Gieo $2$ xúc xắc. $P$(tổng $=7$)?`, a: `$\\frac{1}{6}$.`, s: `$6$ kết quả thuận lợi / $36$ tổng $= \\frac{6}{36} = \\frac{1}{6}$.`, d: 'van_dung' },
    { c: `Tung $3$ đồng xu. $P$(cả $3$ ngửa)?`, a: `$\\frac{1}{8}$.`, s: `Tổng $= 2^3 = 8$. Thuận lợi: $1$. $P = \\frac{1}{8}$.`, d: 'van_dung' },
    { c: `Lớp có $20$ nam, $15$ nữ. Chọn ngẫu nhiên $1$ HS. $P$(nữ)?`, a: `$\\frac{3}{7}$.`, s: `$P = \\frac{15}{35} = \\frac{3}{7}$.`, d: 'van_dung_cao' },
    { c: `Gieo xúc xắc $2$ lần. $P$(lần $1$ > lần $2$)?`, a: `$\\frac{5}{12}$.`, s: `Tổng $36$. Thuận lợi (lần 1 > lần 2): $0+1+2+3+4+5=15$. $P=\\frac{15}{36}=\\frac{5}{12}$.`, d: 'van_dung_cao' },
  ]},
  { id: 'acd867ef-30b0-4676-8a14-7e28ecfd9314', p: 'T8-C8B32', t: 'xac_suat', q: [
    { c: `Xác suất thực nghiệm là gì?`, a: `Tỉ số giữa số lần biến cố xảy ra và tổng số lần thử.`, s: `$P_{TN}(A) = \\frac{\\text{số lần A xảy ra}}{\\text{tổng số lần thử}}$.`, d: 'nhan_biet' },
    { c: `Gieo đồng xu $100$ lần, ngửa $48$ lần. XS thực nghiệm ngửa?`, a: `$0{,}48$.`, s: `$P_{TN} = \\frac{48}{100} = 0{,}48$.`, d: 'nhan_biet' },
    { c: `Mối liên hệ giữa XS thực nghiệm và XS lý thuyết?`, a: `Khi số lần thử lớn, XS thực nghiệm tiến gần XS lý thuyết.`, s: `Theo quy luật số lớn, khi $n \\to \\infty$, $P_{TN} \\to P$.`, d: 'nhan_biet' },
    { c: `Gieo xúc xắc $600$ lần, mặt $1$ xuất hiện $95$ lần. So sánh với XS lý thuyết.`, a: `$P_{TN} \\approx 0{,}158$, $P_{LT} \\approx 0{,}167$.`, s: `$P_{TN} = \\frac{95}{600} \\approx 0{,}158$. $P_{LT} = \\frac{1}{6} \\approx 0{,}167$. Gần nhau.`, d: 'thong_hieu' },
    { c: `Sản xuất $1000$ sản phẩm, $15$ lỗi. XS thực nghiệm lỗi?`, a: `$0{,}015$.`, s: `$P_{TN} = \\frac{15}{1000} = 0{,}015 = 1{,}5\\%$.`, d: 'thong_hieu' },
    { c: `Bắn $50$ phát, trúng $42$. Ước tính XS trúng phát tiếp theo.`, a: `$\\approx 0{,}84$.`, s: `$P \\approx \\frac{42}{50} = 0{,}84$. Ước tính XS trúng $\\approx 84\\%$.`, d: 'thong_hieu' },
    { c: `Tung đồng xu $200$ lần: S($105$), N($95$). XS thực nghiệm gần giá trị nào?`, a: `$0{,}5$.`, s: `$P_{TN}(S) = 0{,}525$, $P_{TN}(N) = 0{,}475$. Cả hai gần $0{,}5$.`, d: 'van_dung' },
    { c: `Kiểm tra $500$ bóng đèn: $12$ hỏng. Lô $10000$ bóng, ước tính số hỏng.`, a: `$240$.`, s: `$P_{TN} = \\frac{12}{500} = 0{,}024$. Ước tính: $10000 \\times 0{,}024 = 240$.`, d: 'van_dung' },
    { c: `Tung đồng xu $10$, $100$, $1000$ lần. So sánh XS thực nghiệm ở mỗi trường hợp.`, a: `Càng nhiều lần, càng gần $0{,}5$.`, s: `$10$ lần: sai lệch lớn (có thể $0{,}3$-$0{,}7$). $100$ lần: $\\approx 0{,}45$-$0{,}55$. $1000$ lần: $\\approx 0{,}49$-$0{,}51$. Quy luật số lớn.`, d: 'van_dung_cao' },
    { c: `Trường khảo sát $500$ HS: $350$ thích Toán. Ước tính XS một HS bất kỳ thích Toán. Hạn chế?`, a: `$0{,}7$. Hạn chế: mẫu có thể thiên lệch.`, s: `$P \\approx \\frac{350}{500} = 0{,}7$. Hạn chế: kết quả phụ thuộc vào mẫu, có thể thiên lệch nếu khảo sát không ngẫu nhiên.`, d: 'van_dung_cao' },
  ]},
  { id: '4fc86063-8d87-45f2-81ac-17e8ee07047a', p: 'T8-C8BTC', t: 'xac_suat', q: [
    { c: `Gieo xúc xắc. Liệt kê biến cố "ra mặt lẻ".`, a: `$\\{1,3,5\\}$.`, s: `$3$ kết quả: $1, 3, 5$.`, d: 'nhan_biet' },
    { c: `$P$(ra mặt lẻ) khi gieo xúc xắc?`, a: `$\\frac{1}{2}$.`, s: `$P = \\frac{3}{6} = \\frac{1}{2}$.`, d: 'nhan_biet' },
    { c: `Hộp $3$ bi đỏ, $5$ bi trắng, $2$ bi xanh. $P$(bi trắng)?`, a: `$\\frac{1}{2}$.`, s: `$P = \\frac{5}{10} = \\frac{1}{2}$.`, d: 'thong_hieu' },
    { c: `Tung $2$ đồng xu. $P$(ít nhất $1$ ngửa)?`, a: `$\\frac{3}{4}$.`, s: `Tổng $4$. "Ít nhất $1$ ngửa" = $1-P$(cả $2$ sấp) $= 1-\\frac{1}{4}=\\frac{3}{4}$.`, d: 'thong_hieu' },
    { c: `Gieo $200$ lần, mặt $6$ ra $30$ lần. $P_{TN}$(mặt $6$)?`, a: `$0{,}15$.`, s: `$P_{TN} = \\frac{30}{200} = 0{,}15$.`, d: 'thong_hieu' },
    { c: `Rút $2$ thẻ từ $5$ thẻ ($1$-$5$). $P$(tổng chẵn)?`, a: `$\\frac{2}{5}$.`, s: `$C_5^2=10$ cách. Tổng chẵn: cả hai cùng chẵn hoặc cùng lẻ. Cùng chẵn: $C_2^2=1$. Cùng lẻ: $C_3^2=3$. $P=\\frac{4}{10}=\\frac{2}{5}$.`, d: 'van_dung' },
    { c: `Chọn $1$ số từ $1$-$20$. $P$(số chia hết cho cả $2$ và $3$)?`, a: `$\\frac{3}{20}$.`, s: `Chia hết cho $6$: $6,12,18$. $P=\\frac{3}{20}$.`, d: 'van_dung' },
    { c: `Tung đồng xu $500$ lần: $S=260$, $N=240$. Nhận xét.`, a: `Gần cân bằng.`, s: `$P_{TN}(S)=0{,}52$, $P_{TN}(N)=0{,}48$. Gần giá trị lý thuyết $0{,}5$. Sai số nhỏ do tính ngẫu nhiên.`, d: 'van_dung' },
    { c: `Gieo $3$ xúc xắc. $P$(tổng $\\leq 4$)?`, a: `$\\frac{4}{216}=\\frac{1}{54}$.`, s: `Tổng $3$: $(1,1,1)$. Tổng $4$: $(1,1,2)$ và hoán vị $=3$. Tổng: $4$ kết quả. $P=\\frac{4}{216}=\\frac{1}{54}$.`, d: 'van_dung_cao' },
    { c: `Nhà máy sản xuất $2000$ sp, kiểm tra $200$ sp thấy $6$ lỗi. Ước tính tổng sp lỗi và XS mua phải sp lỗi.`, a: `$60$ sp; $P=0{,}03$.`, s: `$P_{TN}=\\frac{6}{200}=0{,}03$. Ước tính: $2000 \\times 0{,}03=60$ sp lỗi. $P \\approx 3\\%$.`, d: 'van_dung_cao' },
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
