const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 4;

const B = [
  { id: 'b16656cd-0214-4a0b-9d48-d83500e1d96f', p: 'T4-B04', t: 'dai_so', q: [
    { c: `Tính giá trị biểu thức: $12 + 8 \\times 5$.`, a: `$52$.`, s: `$12 + 40 = 52$.`, d: 'nhan_biet' },
    { c: `Tính giá trị biểu thức: $45 : 9 + 15$.`, a: `$20$.`, s: `$5 + 15 = 20$.`, d: 'nhan_biet' },
    { c: `Tính giá trị biểu thức: $(25 + 15) \\times 3$.`, a: `$120$.`, s: `$40 \\times 3 = 120$.`, d: 'thong_hieu' },
    { c: `Tính: $100 - (30 + 20) : 2$.`, a: `$75$.`, s: `$100 - 50 : 2 = 100 - 25 = 75$.`, d: 'thong_hieu' },
    { c: `Biểu thức nào có giá trị lớn hơn: $A = 10 \\times 5 + 5$ hay $B = 10 \\times (5 + 5)$?`, a: `Biểu thức $B$ lớn hơn.`, s: `$A = 55$, $B = 100$. Vậy $B > A$.`, d: 'van_dung' }
  ]},
  { id: '4ebcf362-ae30-4f54-849c-1afbb2e19db5', p: 'T4-B05', t: 'dai_so', q: [
    { c: `Có 3 sọt cam, mỗi sọt $15$ kg. Bán đi $20$ kg. Còn lại bao nhiêu kg?`, a: `$25$ kg.`, s: `Tổng số cam: $15 \\times 3 = 45$ (kg). Còn lại: $45 - 20 = 25$ (kg).`, d: 'van_dung' },
    { c: `Mua 4 quyển vở giá $5\\,000$ đồng/quyển và 2 cây bút giá $3\\,000$ đồng/cây. Phải trả bao nhiêu tiền?`, a: `$26\\,000$ đồng.`, s: `Vở: $4 \\times 5\\,000 = 20\\,000$. Bút: $2 \\times 3\\,000 = 6\\,000$. Tổng: $26\\,000$ đồng.`, d: 'van_dung' },
    { c: `Lớp có 4 tổ, mỗi tổ 8 học sinh. Lớp đó đi tham quan, thuê 2 xe ô tô. Hỏi mỗi xe chở bao nhiêu học sinh (chia đều)?`, a: `$16$ học sinh.`, s: `Tổng số học sinh: $4 \\times 8 = 32$. Mỗi xe chở: $32 : 2 = 16$ học sinh.`, d: 'van_dung_cao' },
    { c: `Cửa hàng có 100 kg gạo, bán buổi sáng được 30 kg, buổi chiều bán gấp đôi buổi sáng. Cửa hàng còn lại bao nhiêu kg?`, a: `$10$ kg.`, s: `Chiều bán: $30 \\times 2 = 60$ kg. Đã bán: $30 + 60 = 90$ kg. Còn lại: $100 - 90 = 10$ kg.`, d: 'van_dung_cao' },
    { c: `Một vườn cây có 5 hàng bưởi, mỗi hàng 12 cây và 3 hàng cam, mỗi hàng 10 cây. Vườn có tất cả bao nhiêu cây?`, a: `$90$ cây.`, s: `Bưởi: $5 \\times 12 = 60$. Cam: $3 \\times 10 = 30$. Tổng: $60 + 30 = 90$ cây.`, d: 'van_dung_cao' }
  ]},
  { id: 'b1fd95ef-be48-46ae-b350-c86bb12a119d', p: 'T4-B06', t: 'dai_so', q: [
    { c: `Tính: $250 + 150 \\times 2$.`, a: `$550$.`, s: `$250 + 300 = 550$.`, d: 'nhan_biet' },
    { c: `Một người mua 3 bó rau, mỗi bó $5\\,000$ đ, đưa $50\\,000$ đ. Nhận lại tiền thừa bao nhiêu?`, a: `$35\\,000$ đ.`, s: `Mua rau hết $15\\,000$ đ. Thừa $50\\,000 - 15\\,000 = 35\\,000$ đ.`, d: 'thong_hieu' },
    { c: `Tính: $(1\\,000 - 400) : 3$.`, a: `$200$.`, s: `$600 : 3 = 200$.`, d: 'nhan_biet' },
    { c: `Có $45$ viên bi chia đều vào 5 hộp. 2 hộp có bao nhiêu viên bi?`, a: `$18$ viên.`, s: `Mỗi hộp: $45 : 5 = 9$. Hai hộp: $9 \\times 2 = 18$.`, d: 'thong_hieu' },
    { c: `HCN dài $8$ cm, rộng $5$ cm. Chu vi?`, a: `$26$ cm.`, s: `$(8+5)\\times 2 = 26$.`, d: 'van_dung' }
  ]},
  { id: '56267402-4ae6-4d3c-a4c4-de776fa4460c', p: 'T4-B08', t: 'hinh_hoc', q: [
    { c: `Góc nhọn lớn hơn hay nhỏ hơn góc vuông?`, a: `Nhỏ hơn.`, s: `Góc nhọn có số đo nhỏ hơn $90^\\circ$.`, d: 'nhan_biet' },
    { c: `Góc tù lớn hơn hay nhỏ hơn góc vuông?`, a: `Lớn hơn.`, s: `Góc tù lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$.`, d: 'nhan_biet' },
    { c: `Góc bẹt bằng mấy lần góc vuông?`, a: `$2$ lần.`, s: `Góc bẹt bằng $180^\\circ$, gấp 2 lần $90^\\circ$.`, d: 'thong_hieu' },
    { c: `Đồng hồ chỉ 3 giờ thì kim giờ và kim phút tạo thành góc gì?`, a: `Góc vuông.`, s: `Lúc 3 giờ, hai kim vuông góc nhau ($90^\\circ$).`, d: 'thong_hieu' },
    { c: `Đồng hồ chỉ 6 giờ thì kim giờ và kim phút tạo thành góc gì?`, a: `Góc bẹt.`, s: `Lúc 6 giờ, hai kim nằm trên một đường thẳng ($180^\\circ$).`, d: 'van_dung' }
  ]},
  { id: '3e024f7c-a3a1-496c-adcf-c86350aab347', p: 'T4-B09', t: 'hinh_hoc', q: [
    { c: `Góc vuông là góc có số đo bằng bao nhiêu độ? (Tuy không học độ nhưng biết là góc vuông)`, a: `Góc vuông.`, s: `Góc bằng $90^\\circ$.`, d: 'nhan_biet' },
    { c: `Đồng hồ chỉ 2 giờ thì hai kim tạo thành góc nhọn, vuông hay tù?`, a: `Góc nhọn.`, s: `Góc nhỏ hơn góc vuông.`, d: 'thong_hieu' },
    { c: `Đồng hồ chỉ 5 giờ thì hai kim tạo thành góc nhọn, vuông hay tù?`, a: `Góc tù.`, s: `Góc lớn hơn góc vuông và nhỏ hơn góc bẹt.`, d: 'thong_hieu' },
    { c: `Đồng hồ chỉ 9 giờ thì hai kim tạo thành góc gì?`, a: `Góc vuông.`, s: `Lúc 9 giờ, hai kim vuông góc nhau.`, d: 'van_dung' },
    { c: `Góc lớn hơn góc nhọn và nhỏ hơn góc bẹt, không phải góc vuông, là góc gì?`, a: `Góc tù.`, s: `Góc tù lớn hơn góc vuông, nhỏ hơn góc bẹt.`, d: 'van_dung' }
  ]},
  { id: 'ae1e61f2-dc98-4b2b-8a39-d5360dcc4541', p: 'T4-B11', t: 'dai_so', q: [
    { c: `Lớp nghìn gồm những hàng nào?`, a: `Hàng nghìn, hàng chục nghìn, hàng trăm nghìn.`, s: `Các hàng của lớp nghìn.`, d: 'nhan_biet' },
    { c: `Lớp đơn vị gồm những hàng nào?`, a: `Hàng đơn vị, hàng chục, hàng trăm.`, s: `Các hàng của lớp đơn vị.`, d: 'nhan_biet' },
    { c: `Trong số $456\\,789$, chữ số $5$ thuộc hàng nào, lớp nào?`, a: `Hàng chục nghìn, lớp nghìn.`, s: `Chữ số 5 nằm ở vị trí thứ hai từ phải sang của lớp nghìn.`, d: 'thong_hieu' },
    { c: `Chữ số $7$ trong số $307\\,125$ có giá trị là bao nhiêu?`, a: `$7\\,000$.`, s: `Chữ số 7 ở hàng nghìn.`, d: 'thong_hieu' },
    { c: `Lớp triệu gồm những hàng nào?`, a: `Hàng triệu, hàng chục triệu, hàng trăm triệu.`, s: `Các hàng của lớp triệu.`, d: 'van_dung' }
  ]},
  { id: '5b4052fc-5c07-4642-a955-6a217fd53416', p: 'T4-B12', t: 'dai_so', q: [
    { c: `Đọc số: $100\\,000$.`, a: `Một trăm nghìn.`, s: `Một trăm nghìn.`, d: 'nhan_biet' },
    { c: `Đọc số: $543\\,210$.`, a: `Năm trăm bốn mươi ba nghìn hai trăm mười.`, s: `Đọc theo lớp nghìn và lớp đơn vị.`, d: 'thong_hieu' },
    { c: `Viết số: Chín trăm mười hai nghìn không trăm ba mươi.`, a: `$912\\,030$.`, s: `$912$ ở lớp nghìn, $030$ ở lớp đơn vị.`, d: 'thong_hieu' },
    { c: `Số liền sau của $999\\,999$ là số nào?`, a: `$1\\,000\\,000$.`, s: `$999\\,999 + 1 = 1\\,000\\,000$.`, d: 'van_dung' },
    { c: `Số nhỏ nhất có $6$ chữ số là?`, a: `$100\\,000$.`, s: `Số $100\\,000$.`, d: 'van_dung' }
  ]},
  { id: 'cba060ca-3d3a-4adf-a67c-2943be5181cc', p: 'T4-B13', t: 'dai_so', q: [
    { c: `So sánh: $156\\,789$ và $156\\,879$.`, a: `$156\\,789 < 156\\,879$.`, s: `Hàng trăm: $7 < 8$.`, d: 'nhan_biet' },
    { c: `So sánh: $99\\,999$ và $100\\,000$.`, a: `$99\\,999 < 100\\,000$.`, s: `Số có 5 chữ số luôn bé hơn số có 6 chữ số.`, d: 'nhan_biet' },
    { c: `Tìm số lớn nhất trong các số: $45\\,678; 45\\,768; 45\\,876; 45\\,687$.`, a: `$45\\,876$.`, s: `Hàng trăm lớn nhất là 8.`, d: 'thong_hieu' },
    { c: `Sắp xếp các số $102\\,345; 102\\,435; 102\\,534$ theo thứ tự tăng dần.`, a: `$102\\,345 < 102\\,435 < 102\\,534$.`, s: `So sánh hàng trăm.`, d: 'van_dung' },
    { c: `Số liền trước của $500\\,000$ là?`, a: `$499\\,999$.`, s: `$500\\,000 - 1 = 499\\,999$.`, d: 'van_dung' }
  ]},
  { id: '4a10079f-f553-42af-8132-60420ad0ae7c', p: 'T4-B14', t: 'dai_so', q: [
    { c: `Làm tròn số $43\\,256$ đến hàng chục nghìn.`, a: `$40\\,000$.`, s: `Chữ số hàng nghìn là 3 < 5 nên làm tròn xuống.`, d: 'thong_hieu' },
    { c: `Làm tròn số $87\\,500$ đến hàng chục nghìn.`, a: `$90\\,000$.`, s: `Chữ số hàng nghìn là 7 >= 5 nên làm tròn lên.`, d: 'thong_hieu' },
    { c: `Làm tròn số $195\\,000$ đến hàng chục nghìn.`, a: `$200\\,000$.`, s: `Hàng nghìn là 5 nên cộng thêm 1 vào hàng chục nghìn: $19 + 1 = 20$.`, d: 'van_dung' },
    { c: `Làm tròn số $42\\,999$ đến hàng chục nghìn.`, a: `$40\\,000$.`, s: `Hàng nghìn là 2 < 5.`, d: 'nhan_biet' },
    { c: `Số nào sau đây khi làm tròn đến hàng chục nghìn được $50\\,000$: $44\\,999$ hay $45\\,001$?`, a: `$45\\,001$.`, s: `$45\\,001$ làm tròn thành $50\\,000$, còn $44\\,999$ thành $40\\,000$.`, d: 'van_dung_cao' }
  ]},
  { id: '6819ecb7-e33c-4a4b-8ebd-e4b416e18d29', p: 'T4-B15', t: 'dai_so', q: [
    { c: `Chữ số La Mã $V$ có giá trị bằng bao nhiêu?`, a: `$5$.`, s: `$V = 5$.`, d: 'nhan_biet' },
    { c: `Chữ số La Mã $X$ có giá trị bằng bao nhiêu?`, a: `$10$.`, s: `$X = 10$.`, d: 'nhan_biet' },
    { c: `Số $12$ viết bằng chữ số La Mã là?`, a: `$XII$.`, s: `$10 + 2 = XII$.`, d: 'thong_hieu' },
    { c: `Số $9$ viết bằng chữ số La Mã là?`, a: `$IX$.`, s: `$10 - 1 = IX$.`, d: 'thong_hieu' },
    { c: `Đọc số La Mã $XIV$.`, a: `$14$.`, s: `$10 + 4 = 14$.`, d: 'van_dung' }
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
