const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G6-FIN-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
      content,
      options: JSON.stringify([
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ]),
      correct_answer: correctKey,
      solution,
      type: 'trac_nghiem'
    });
  };

  const catsData = await sql`SELECT id, name FROM public.categories WHERE grade = 6`;
  const lessons = [];
  catsData.forEach(c => {
    const m = c.name.match(/Bài (\d+)/);
    if(m) lessons.push({ id: c.id, num: parseInt(m[1]), name: c.name });
  });

  for (const les of lessons) {
    const n = les.num;
    let topic = 'so_hoc';
    if (n >= 18 && n <= 22) topic = 'hinh_hoc';
    if (n >= 32 && n <= 37) topic = 'hinh_hoc';
    if (n >= 38) topic = 'thong_ke';

    for (let i = 1; i <= 10; i++) {
      let q = ""; let a = ""; let b = ""; let c = ""; let d = ""; let ans = "A"; let sol = "";
      
      // Tập hợp, phần tử
      if (n === 1 || n === 2) {
        q = `Tập hợp $A = \\{x \\in \\mathbb{N} \\mid x < ${i + 5}\\}$ có bao nhiêu phần tử?`;
        a = `$${i + 5}$ phần tử.`; b = `$${i + 4}$ phần tử.`; c = `$${i + 6}$ phần tử.`; d = `Vô số phần tử.`;
        sol = `Các phần tử là $0, 1, 2, ..., ${i+4}$. Số phần tử là ${i+5}.`;
      }
      // Các phép tính
      else if (n >= 3 && n <= 7) {
        q = `Kết quả của phép tính $2^3 \\cdot 2^${i}$ dưới dạng một luỹ thừa là:`;
        a = `$2^{${i+3}}$`; b = `$4^{${i+3}}$`; c = `$2^{${3*i}}$`; d = `$4^{${3*i}}$`;
        sol = `Nhân hai luỹ thừa cùng cơ số: $a^m \\cdot a^n = a^{m+n}$. Vậy $2^3 \\cdot 2^${i} = 2^{3+${i}} = 2^{${i+3}}$.`;
      }
      // Tính chia hết
      else if (n >= 8 && n <= 12) {
        q = `Số nào sau đây chia hết cho cả 2 và 5 (với $k = ${i}$)?`;
        a = `$${i*10}$`; b = `$${i*10 + 2}$`; c = `$${i*10 + 5}$`; d = `$${i*10 + 3}$`;
        sol = `Dấu hiệu chia hết cho cả 2 và 5 là số có chữ số tận cùng là 0. Suy ra đáp án là ${i*10}.`;
      }
      // Số nguyên
      else if (n >= 13 && n <= 17) {
        q = `Tập hợp các số nguyên $\\mathbb{Z}$ bao gồm:`;
        a = `Số nguyên âm, số 0 và số nguyên dương.`; b = `Chỉ số nguyên dương.`; c = `Số nguyên âm và số nguyên dương.`; d = `Số tự nhiên và số nguyên âm (không kể 0).`;
        sol = `Tập hợp số nguyên kí hiệu là $\\mathbb{Z}$ gồm các số nguyên âm, số 0 và các số nguyên dương.`;
      }
      // Hình học
      else if (n >= 18 && n <= 22) {
        q = `Hình vuông có độ dài cạnh là $a = ${i+2}$ cm. Chu vi của hình vuông đó là:`;
        a = `$${(i+2)*4}$ cm`; b = `$${(i+2)*(i+2)}$ cm`; c = `$${(i+2)*2}$ cm`; d = `$${(i+2)*4}$ cm$^2$`;
        sol = `Chu vi hình vuông là $C = 4a = 4 \\cdot ${i+2} = ${(i+2)*4}$ cm.`;
      }
      // Phân số
      else if (n >= 23 && n <= 27) {
        q = `Phân số đối của phân số $\\dfrac{${i}}{${i+1}}$ là:`;
        a = `$\\dfrac{-${i}}{${i+1}}$`; b = `$\\dfrac{${i+1}}{${i}}$`; c = `$\\dfrac{-${i+1}}{${i}}$`; d = `$\\dfrac{${i}}{-${i+1}-1}$`;
        sol = `Phân số đối của $\\dfrac{a}{b}$ là $-\\dfrac{a}{b} = \\dfrac{-a}{b}$.`;
      }
      // Số thập phân
      else if (n >= 28 && n <= 31) {
        q = `Làm tròn số thập phân $${i+12},345$ đến hàng phần mười ta được kết quả là:`;
        a = `$${i+12},3$`; b = `$${i+12},4$`; c = `$${i+12},35$`; d = `$${i+13},0$`;
        sol = `Chữ số hàng phần trăm là 4 < 5 nên ta giữ nguyên chữ số hàng phần mười. Kết quả: $${i+12},3$.`;
      }
      // Hình học trực quan (điểm, đoạn thẳng, tia, góc)
      else if (n >= 32 && n <= 37) {
        q = `Cho đoạn thẳng AB dài ${2*i} cm. Gọi I là trung điểm của AB. Độ dài đoạn IA là:`;
        a = `$${i}$ cm`; b = `$${2*i}$ cm`; c = `$${i/2}$ cm`; d = `$${i+1}$ cm`;
        sol = `I là trung điểm của AB nên $IA = IB = \\dfrac{AB}{2} = \\dfrac{${2*i}}{2} = ${i}$ cm.`;
      }
      // Thống kê, xác suất
      else {
        q = `Khi tung một đồng xu đồng chất ${i+5} lần. Khả năng xuất hiện mặt Sấp và mặt Ngửa là:`;
        a = `Đồng khả năng.`; b = `Mặt Sấp nhiều hơn.`; c = `Mặt Ngửa nhiều hơn.`; d = `Không thể xuất hiện mặt Ngửa.`;
        sol = `Tung một đồng xu đồng chất thì hai mặt Sấp và Ngửa có khả năng xuất hiện như nhau (đồng khả năng).`;
      }

      addMCQ(les.id, q, a, b, c, d, 'A', sol, topic);
    }
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu MCQs cho Lớp 6...`);

  const batchSize = 50;
  for (let i=0; i<allQS.length; i+=batchSize) {
    const batch = allQS.slice(i, i+batchSize);
    for (const q of batch) {
      const qid = crypto.randomUUID();
      await sql`
        INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
        VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.options}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
      `;
    }
    console.log(`Đã nạp ${i+batch.length}/${allQS.length}`);
  }

  console.log('Thành công! Đã phủ kín trắc nghiệm Lý thuyết Lớp 6.');
}

main().catch(console.error);
