import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 4;

function generateQuestions(categoryName) {
  const name = categoryName.toLowerCase();
  let questions = [];
  
  if (name.includes('phân số')) {
    questions = [
      { c: `Phân số chỉ một nửa là phân số nào?`, a: `$\\dfrac{1}{2}$.`, s: `Một nửa tương ứng với $1/2$.`, d: 'nhan_biet' },
      { c: `Rút gọn phân số $\\dfrac{4}{8}$.`, a: `$\\dfrac{1}{2}$.`, s: `Chia cả tử và mẫu cho $4$.`, d: 'thong_hieu' },
      { c: `So sánh $\\dfrac{1}{3}$ và $\\dfrac{2}{3}$.`, a: `$\\dfrac{1}{3} < \\dfrac{2}{3}$.`, s: `Cùng mẫu số, tử số nhỏ hơn thì phân số nhỏ hơn.`, d: 'nhan_biet' },
      { c: `Tính $\\dfrac{1}{4} + \\dfrac{2}{4}$.`, a: `$\\dfrac{3}{4}$.`, s: `Cộng tử số giữ nguyên mẫu số.`, d: 'thong_hieu' },
      { c: `Tìm $\\dfrac{1}{2}$ của $20$.`, a: `$10$.`, s: `$20 \\times \\dfrac{1}{2} = 10$.`, d: 'van_dung' }
    ];
  } else if (name.includes('hình') || name.includes('góc') || name.includes('song song') || name.includes('vuông góc')) {
    questions = [
      { c: `Hình vuông có bao nhiêu góc vuông?`, a: `$4$ góc.`, s: `Tính chất hình vuông có 4 góc vuông.`, d: 'nhan_biet' },
      { c: `Diện tích hình chữ nhật có chiều dài $5$ cm, rộng $3$ cm?`, a: `$15\\text{ cm}^2$.`, s: `$5 \\times 3 = 15$.`, d: 'thong_hieu' },
      { c: `Chu vi hình vuông cạnh $4$ cm là?`, a: `$16$ cm.`, s: `$4 \\times 4 = 16$.`, d: 'thong_hieu' },
      { c: `Hai đường thẳng song song có cắt nhau không?`, a: `Không.`, s: `Chúng không bao giờ cắt nhau.`, d: 'nhan_biet' },
      { c: `Hình bình hành có mấy cặp cạnh song song?`, a: `$2$ cặp.`, s: `Tính chất hình bình hành.`, d: 'van_dung' }
    ];
  } else if (name.includes('đo lường') || name.includes('mét') || name.includes('giây') || name.includes('thế kỉ') || name.includes('trung bình')) {
    questions = [
      { c: `$1$ mét bằng bao nhiêu xăng-ti-mét?`, a: `$100$ cm.`, s: `$1\\text{ m} = 100\\text{ cm}$.`, d: 'nhan_biet' },
      { c: `$1$ phút bằng bao nhiêu giây?`, a: `$60$ giây.`, s: `Quy ước thời gian.`, d: 'nhan_biet' },
      { c: `Đổi $2\\text{ m}^2$ sang $\\text{dm}^2$.`, a: `$200\\text{ dm}^2$.`, s: `$2 \\times 100 = 200$.`, d: 'thong_hieu' },
      { c: `Trung bình cộng của $10$ và $20$ là?`, a: `$15$.`, s: `$(10 + 20) : 2 = 15$.`, d: 'van_dung' },
      { c: `$1$ thế kỉ bằng bao nhiêu năm?`, a: `$100$ năm.`, s: `Quy ước thời gian.`, d: 'nhan_biet' }
    ];
  } else if (name.includes('biểu đồ') || name.includes('thống kê') || name.includes('số liệu')) {
    questions = [
      { c: `Biểu đồ cột dùng để làm gì?`, a: `Thể hiện số lượng trực quan.`, s: `Biểu diễn dữ liệu bằng các cột.`, d: 'nhan_biet' },
      { c: `Nếu một cột cao $5$ đơn vị biểu diễn số học sinh, 2 cột như vậy biểu diễn bao nhiêu?`, a: `$10$ học sinh.`, s: `$5 \\times 2 = 10$.`, d: 'thong_hieu' },
      { c: `Số liệu: $5, 7, 5, 8$. Số nào xuất hiện nhiều nhất?`, a: `$5$.`, s: `Số $5$ xuất hiện 2 lần.`, d: 'van_dung' },
      { c: `Trung bình của dãy $2, 4, 6$ là?`, a: `$4$.`, s: `$(2+4+6):3 = 4$.`, d: 'thong_hieu' },
      { c: `Cột cao nhất trên biểu đồ thể hiện điều gì?`, a: `Giá trị lớn nhất.`, s: `Cột càng cao số lượng càng nhiều.`, d: 'nhan_biet' }
    ];
  } else {
    // Arithmetic & others
    questions = [
      { c: `Tính $15 + 25$.`, a: `$40$.`, s: `$15 + 25 = 40$.`, d: 'nhan_biet' },
      { c: `Tính $100 - 45$.`, a: `$55$.`, s: `$100 - 45 = 55$.`, d: 'nhan_biet' },
      { c: `Tính $12 \\times 5$.`, a: `$60$.`, s: `$12 \\times 5 = 60$.`, d: 'thong_hieu' },
      { c: `Tính $75 : 3$.`, a: `$25$.`, s: `$75 : 3 = 25$.`, d: 'thong_hieu' },
      { c: `Tìm $x$ biết $x + 10 = 50$.`, a: `$x = 40$.`, s: `$50 - 10 = 40$.`, d: 'van_dung' }
    ];
  }
  return questions;
}

function determineTopic(name) {
  name = name.toLowerCase();
  if (name.includes('hình') || name.includes('góc')) return 'hinh_hoc';
  if (name.includes('đo lường') || name.includes('mét')) return 'dai_so';
  if (name.includes('biểu đồ') || name.includes('thống kê')) return 'thong_ke_xac_suat';
  return 'dai_so';
}

async function main() {
  console.log('Fetching empty Grade 4 categories...');
  const categories = await sql`
    SELECT c.id, c.name
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id AND q.grade = 4
    WHERE c.grade = 4 AND c.parent_id IS NOT NULL AND q.id IS NULL
    ORDER BY c.sort_order;
  `;

  console.log('Found ' + categories.length + ' empty categories. Generating questions...');

  let total = 0;
  for (const cat of categories) {
    console.log('=== ' + cat.name + ' ===');
    const questions = generateQuestions(cat.name);
    const topic = determineTopic(cat.name);
    
    let c = 0;
    for (const q of questions) {
      const code = 'T4-AUTO-' + cat.id.split('-')[0] + '-' + c;
      await sql`INSERT INTO public.questions (content,answer,solution,grade,topic,difficulty,question_type,category_id,status,is_public,question_code,user_id) VALUES (${q.c},${q.a},${q.s},${G},${topic},${q.d},'tu_luan',${cat.id},'approved',true,${code},${U})`;
      c++;
    }
    total += c;
    console.log('Inserted 5 questions for', cat.name);
  }
  
  console.log('Total inserted:', total);
}

main().catch(console.error);
