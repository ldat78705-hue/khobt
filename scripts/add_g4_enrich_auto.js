const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(catName, idx) {
  const lower = catName.toLowerCase();
  
  if (lower.includes('phân số')) {
    let a = rand(1, 9), b = rand(2, 9), c = rand(1, 9), d = rand(2, 9);
    return {
      content: `Tính và rút gọn nếu có thể: $\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}}$. (Bài toán số ${idx})`,
      answer: `Học sinh tự tính.`,
      solution: `Quy đồng mẫu số chung là ${b*d}:\n$\\dfrac{${a}}{${b}} + \\dfrac{${c}}{${d}} = \\dfrac{${a*d}}{${b*d}} + \\dfrac{${c*b}}{${b*d}} = \\dfrac{${a*d + c*b}}{${b*d}}$.\nRút gọn phân số nếu có thể.`
    };
  }
  else if (lower.includes('góc') || lower.includes('đường thẳng')) {
    return {
      content: `Cho một hình chữ nhật ABCD. Kẻ đường chéo AC. Hãy chỉ ra các góc vuông, góc nhọn trong hình. (Bài toán số ${idx})`,
      answer: `Góc vuông tại A, B, C, D. Các góc nhọn tạo bởi đường chéo.`,
      solution: `Hình chữ nhật có 4 góc vuông. Khi kẻ đường chéo AC, góc A bị chia làm 2 góc nhọn, góc C bị chia làm 2 góc nhọn.`
    };
  }
  else if (lower.includes('nhân') || lower.includes('chia')) {
    let a = rand(1000, 9999), b = rand(10, 99);
    return {
      content: `Đặt tính rồi tính: $${a} \\times ${b}$. (Bài ${idx})`,
      answer: `$${a * b}$.`,
      solution: `Học sinh đặt tính nhân theo cột dọc.\nKết quả là $${a * b}$.`
    };
  }
  else if (lower.includes('biểu đồ') || lower.includes('thống kê')) {
    return {
      content: `Quan sát biểu đồ cột về số sách bán được trong 4 tuần. Tuần 1: 150, Tuần 2: 200, Tuần 3: 180, Tuần 4: ${200 + idx*10}. Hỏi trung bình mỗi tuần bán được bao nhiêu quyển?`,
      answer: `Học sinh tự tính trung bình cộng.`,
      solution: `Tổng số sách: $150 + 200 + 180 + ${200 + idx*10}$.\nTrung bình = Tổng : 4.`
    };
  }
  else {
    // Default: Phép cộng trừ số lớn hoặc word problem
    let a = rand(10000, 90000), b = rand(10000, 90000);
    return {
      content: `Một nhà máy tháng trước sản xuất được $${a}$ sản phẩm. Tháng này sản xuất được nhiều hơn tháng trước $${b}$ sản phẩm. Hỏi cả hai tháng nhà máy sản xuất được bao nhiêu sản phẩm? (Mẫu ${idx})`,
      answer: `$${a + a + b}$ sản phẩm.`,
      solution: `Tháng này sản xuất được: $${a} + ${b} = ${a + b}$ (sản phẩm).\nCả hai tháng sản xuất được: $${a} + ${a + b} = ${a + a + b}$ (sản phẩm).`
    };
  }
}

async function main() {
  const cats = await sql`
    SELECT c.id, c.name, c.grade
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id
    WHERE c.grade = 4 AND c.parent_id IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 FROM public.categories sub WHERE sub.parent_id = c.id
    )
    GROUP BY c.id, c.name, c.grade
    HAVING COUNT(q.id) < 10
  `;

  console.log(`Found ${cats.length} categories to enrich in Grade 4.`);

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let totalInserted = 0;

  for (const cat of cats) {
    for (let i = 1; i <= 5; i++) {
      const qData = generateQuestion(cat.name, i);
      const qid = crypto.randomUUID();
      const topic = 'so_hoc';
      
      await sql`
        INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
        VALUES (${qid}, ${cat.id}, ${'G4-ENR-' + crypto.randomBytes(2).toString('hex').toUpperCase()}, ${qData.content}, ${qData.answer}, ${qData.solution}, 'van_dung_cao', 4, ${topic}, 'tu_luan', ${user_id}, 'approved', true)
      `;
      totalInserted++;
    }
  }

  console.log(`Successfully inserted ${totalInserted} enrichment questions for Grade 4!`);
}

main().catch(console.error);
