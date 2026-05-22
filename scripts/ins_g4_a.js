const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 4, T = 'dai_so';

const B = [
  { id: '274b89f2-9c18-4aef-b27b-fa0f88ff6735', p: 'T4-B02', t: 'dai_so', q: [
    { c: `Tính: $15\\,420 + 23\\,150$.`, a: `$38\\,570$.`, s: `$15\\,420 + 23\\,150 = 38\\,570$.`, d: 'nhan_biet' },
    { c: `Tính: $85\\,700 - 42\\,300$.`, a: `$43\\,400$.`, s: `$85\\,700 - 42\\,300 = 43\\,400$.`, d: 'nhan_biet' },
    { c: `Tính: $12\\,500 \\times 4$.`, a: `$50\\,000$.`, s: `$12\\,500 \\times 4 = 50\\,000$.`, d: 'thong_hieu' },
    { c: `Tính: $75\\,000 : 3$.`, a: `$25\\,000$.`, s: `$75\\,000 : 3 = 25\\,000$.`, d: 'thong_hieu' },
    { c: `Tìm $x$: $x + 12\\,000 = 45\\,000$.`, a: `$x = 33\\,000$.`, s: `$x = 45\\,000 - 12\\,000 = 33\\,000$.`, d: 'thong_hieu' }
  ]},
  { id: '1778c63d-d6fd-4625-a0cf-8b8a70dfc885', p: 'T4-B03', t: 'dai_so', q: [
    { c: `Số $2\\,468$ là số chẵn hay số lẻ?`, a: `Số chẵn.`, s: `Chữ số tận cùng là $8$ nên là số chẵn.`, d: 'nhan_biet' },
    { c: `Số $1\\,357$ là số chẵn hay số lẻ?`, a: `Số lẻ.`, s: `Chữ số tận cùng là $7$ nên là số lẻ.`, d: 'nhan_biet' },
    { c: `Tổng của hai số lẻ là một số chẵn hay số lẻ?`, a: `Số chẵn.`, s: `Lẻ + Lẻ = Chẵn.`, d: 'thong_hieu' },
    { c: `Tích của một số chẵn và một số lẻ là số chẵn hay số lẻ?`, a: `Số chẵn.`, s: `Chẵn $\\times$ Lẻ = Chẵn.`, d: 'thong_hieu' },
    { c: `Tìm số chẵn lớn nhất có $4$ chữ số khác nhau.`, a: `$9\\,876$.`, s: `Chữ số hàng nghìn lớn nhất là $9$, tiếp theo là $8, 7, 6$. $6$ là số chẵn nên thoả mãn.`, d: 'van_dung' }
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
