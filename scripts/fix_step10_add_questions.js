/**
 * BƯỚC 10: THÊM BÀI TẬP CHO 3 CHỦ ĐỀ CÒN THIẾU
 * 
 * 1. Bài 30 - Thực hành vẽ hai đường thẳng song song (5 câu)
 * 2. Bài 51 - Biểu đồ tranh (5 câu)
 * 3. Bài 16 - Luyện tập chung Số có sáu chữ số (1 câu)
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 10: THÊM BÀI TẬP ===\n');

  // Tìm category IDs
  const cats = await sql`SELECT id, name, grade FROM public.categories 
    WHERE grade = 4 AND (
      name LIKE '%Bài 30%' OR 
      name LIKE '%Bài 51%' OR 
      name LIKE '%Bài 16%Luyện%'
    )`;

  console.log('Categories tìm được:');
  for (const c of cats) console.log(`  [${c.id}] ${c.name}`);

  const catMap = {};
  for (const c of cats) {
    if (c.name.includes('Bài 30')) catMap['b30'] = c.id;
    if (c.name.includes('Bài 51')) catMap['b51'] = c.id;
    if (c.name.includes('Bài 16') && c.name.includes('Luyện')) catMap['b16'] = c.id;
  }

  // =============================================
  // BÀI 30: Thực hành vẽ hai đường thẳng song song
  // =============================================
  const b30Questions = [
    {
      question_code: 'T4-B30-001',
      content: 'Vẽ đường thẳng $d$ đi qua điểm $A$ và song song với đường thẳng $m$ cho trước. Em cần dùng dụng cụ gì?',
      answer: 'Em cần dùng **thước thẳng** và **ê ke** (hoặc thước kẻ có các đường kẻ song song).\n\nCách vẽ: Đặt một cạnh góc vuông của ê ke trùng với đường thẳng $m$, trượt ê ke dọc theo thước thẳng đến khi cạnh góc vuông còn lại đi qua điểm $A$, kẻ đường thẳng $d$ theo cạnh đó.',
      solution: '**Cách vẽ:**\n1. Đặt cạnh ê ke trùng với đường thẳng $m$.\n2. Đặt thước thẳng áp vào cạnh còn lại của ê ke.\n3. Trượt ê ke dọc theo thước cho đến khi cạnh ê ke đi qua điểm $A$.\n4. Kẻ đường thẳng $d$ dọc theo cạnh ê ke.\n\nKhi đó $d \\parallel m$.',
      difficulty: 'nhan_biet',
    },
    {
      question_code: 'T4-B30-002',
      content: 'Cho đoạn thẳng $AB = 5$ cm. Vẽ đường thẳng $d_1$ đi qua $A$ và đường thẳng $d_2$ đi qua $B$ sao cho $d_1 \\parallel d_2$. Hai đường thẳng $d_1$ và $d_2$ có cắt nhau không?',
      answer: 'Hai đường thẳng $d_1 \\parallel d_2$ **không bao giờ cắt nhau**, dù có kéo dài về hai phía.\n\nĐây chính là tính chất của hai đường thẳng song song.',
      solution: 'Theo định nghĩa, hai đường thẳng song song là hai đường thẳng **không có điểm chung** (không cắt nhau).\n\nDù kéo dài $d_1$ và $d_2$ về hai phía, chúng vẫn luôn cách đều nhau và không giao nhau.',
      difficulty: 'nhan_biet',
    },
    {
      question_code: 'T4-B30-003',
      content: 'Vẽ hình chữ nhật $ABCD$ có $AB = 6$ cm, $BC = 4$ cm. Nêu tên các cặp cạnh song song trong hình chữ nhật đó.',
      answer: 'Hình chữ nhật $ABCD$ có **hai cặp cạnh song song**:\n- $AB \\parallel DC$\n- $AD \\parallel BC$',
      solution: 'Trong hình chữ nhật $ABCD$:\n- Cạnh $AB$ song song với cạnh $DC$ (hai cạnh đối).\n- Cạnh $AD$ song song với cạnh $BC$ (hai cạnh đối).\n\nHình chữ nhật luôn có 2 cặp cạnh đối song song.',
      difficulty: 'thong_hieu',
    },
    {
      question_code: 'T4-B30-004',
      content: 'Trên giấy kẻ ô vuông, vẽ ba đường thẳng $a$, $b$, $c$ sao cho $a \\parallel b$ và $b \\parallel c$. Hỏi $a$ và $c$ có song song với nhau không?',
      answer: '**Có**, $a \\parallel c$.\n\nNếu đường thẳng $a$ song song với đường thẳng $b$, và đường thẳng $b$ song song với đường thẳng $c$, thì $a$ cũng song song với $c$.',
      solution: 'Khi $a \\parallel b$ và $b \\parallel c$, ta có $a \\parallel c$.\n\nĐây là tính chất bắc cầu của quan hệ song song: hai đường thẳng cùng song song với một đường thẳng thứ ba thì song song với nhau.',
      difficulty: 'thong_hieu',
    },
    {
      question_code: 'T4-B30-005',
      content: 'Trong hình vẽ, cho đường thẳng $m$ và điểm $P$ nằm ngoài đường thẳng $m$. Bạn An vẽ được hai đường thẳng khác nhau đi qua $P$ và song song với $m$. Theo em, bạn An vẽ đúng hay sai? Vì sao?',
      answer: 'Bạn An vẽ **sai**.\n\nQua một điểm nằm ngoài một đường thẳng, ta chỉ vẽ được **đúng một** đường thẳng song song với đường thẳng đã cho.',
      solution: 'Theo tiên đề Euclid: qua một điểm nằm ngoài một đường thẳng, có **một và chỉ một** đường thẳng song song với đường thẳng đó.\n\nDo đó bạn An không thể vẽ được hai đường thẳng khác nhau cùng đi qua $P$ và cùng song song với $m$.',
      difficulty: 'van_dung',
    },
  ];

  // =============================================
  // BÀI 51: Biểu đồ tranh
  // =============================================
  const b51Questions = [
    {
      question_code: 'T4-B51-001',
      content: 'Biểu đồ tranh dưới đây cho biết số cây xanh các lớp đã trồng:\n- Lớp 4A: 🌳🌳🌳\n- Lớp 4B: 🌳🌳🌳🌳\n- Lớp 4C: 🌳🌳\nBiết mỗi 🌳 biểu diễn $10$ cây. Hỏi lớp 4B trồng được bao nhiêu cây?',
      answer: 'Lớp 4B có $4$ biểu tượng 🌳.\n\nSố cây lớp 4B trồng được: $4 \\times 10 = 40$ (cây).\n\n**Đáp số:** $40$ cây.',
      solution: 'Mỗi biểu tượng 🌳 biểu diễn $10$ cây.\n\nLớp 4B có $4$ biểu tượng nên số cây là:\n$4 \\times 10 = 40$ (cây).',
      difficulty: 'nhan_biet',
    },
    {
      question_code: 'T4-B51-002',
      content: 'Biểu đồ tranh cho biết số quyển sách trong thư viện lớp:\n- Truyện cổ tích: 📚📚📚📚📚\n- Truyện thiếu nhi: 📚📚📚\n- Sách khoa học: 📚📚📚📚\nMỗi 📚 biểu diễn $5$ quyển. Loại sách nào có nhiều quyển nhất? Nhiều hơn sách khoa học bao nhiêu quyển?',
      answer: 'Truyện cổ tích: $5 \\times 5 = 25$ quyển.\nTruyện thiếu nhi: $3 \\times 5 = 15$ quyển.\nSách khoa học: $4 \\times 5 = 20$ quyển.\n\n**Truyện cổ tích** nhiều nhất ($25$ quyển).\nNhiều hơn sách khoa học: $25 - 20 = 5$ (quyển).\n\n**Đáp số:** Truyện cổ tích nhiều nhất, nhiều hơn sách khoa học $5$ quyển.',
      solution: '- Truyện cổ tích: $5 \\times 5 = 25$ quyển.\n- Truyện thiếu nhi: $3 \\times 5 = 15$ quyển.\n- Sách khoa học: $4 \\times 5 = 20$ quyển.\n\nSo sánh: $25 > 20 > 15$ nên truyện cổ tích nhiều nhất.\nChênh lệch: $25 - 20 = 5$ (quyển).',
      difficulty: 'thong_hieu',
    },
    {
      question_code: 'T4-B51-003',
      content: 'Bảng sau cho biết số học sinh giỏi các lớp:\n\n| Lớp | Số học sinh giỏi |\n|------|---|\n| 4A | $12$ |\n| 4B | $8$ |\n| 4C | $16$ |\n\nEm hãy vẽ biểu đồ tranh biểu diễn bảng số liệu trên, biết mỗi biểu tượng ⭐ biểu diễn $4$ học sinh giỏi.',
      answer: 'Biểu đồ tranh:\n- Lớp 4A: ⭐⭐⭐ ($12 \\div 4 = 3$ biểu tượng)\n- Lớp 4B: ⭐⭐ ($8 \\div 4 = 2$ biểu tượng)\n- Lớp 4C: ⭐⭐⭐⭐ ($16 \\div 4 = 4$ biểu tượng)',
      solution: 'Lấy số học sinh giỏi mỗi lớp chia cho $4$:\n- Lớp 4A: $12 \\div 4 = 3$ ⭐\n- Lớp 4B: $8 \\div 4 = 2$ ⭐\n- Lớp 4C: $16 \\div 4 = 4$ ⭐',
      difficulty: 'van_dung',
    },
    {
      question_code: 'T4-B51-004',
      content: 'Biểu đồ tranh cho biết số huy chương các đội thể thao giành được:\n- Đội bóng đá: 🏅🏅🏅🏅🏅🏅\n- Đội bơi lội: 🏅🏅🏅🏅\n- Đội điền kinh: 🏅🏅🏅🏅🏅\nMỗi 🏅 biểu diễn $2$ huy chương. Tổng số huy chương cả ba đội là bao nhiêu?',
      answer: 'Đội bóng đá: $6 \\times 2 = 12$ huy chương.\nĐội bơi lội: $4 \\times 2 = 8$ huy chương.\nĐội điền kinh: $5 \\times 2 = 10$ huy chương.\n\nTổng: $12 + 8 + 10 = 30$ (huy chương).\n\n**Đáp số:** $30$ huy chương.',
      solution: 'Tính số huy chương mỗi đội:\n- Bóng đá: $6 \\times 2 = 12$\n- Bơi lội: $4 \\times 2 = 8$\n- Điền kinh: $5 \\times 2 = 10$\n\nTổng: $12 + 8 + 10 = 30$ (huy chương).',
      difficulty: 'thong_hieu',
    },
    {
      question_code: 'T4-B51-005',
      content: 'Biểu đồ tranh cho biết số lít sữa thu được trong tuần:\n- Thứ Hai: 🥛🥛🥛\n- Thứ Ba: 🥛🥛🥛🥛🥛\n- Thứ Tư: 🥛🥛🥛🥛\nMỗi 🥛 biểu diễn $20$ lít. Ngày thứ Ba thu được nhiều hơn ngày thứ Hai bao nhiêu lít sữa?',
      answer: 'Thứ Hai: $3 \\times 20 = 60$ lít.\nThứ Ba: $5 \\times 20 = 100$ lít.\n\nThứ Ba nhiều hơn thứ Hai: $100 - 60 = 40$ (lít).\n\n**Đáp số:** Thứ Ba nhiều hơn $40$ lít sữa.',
      solution: 'Thứ Hai: $3 \\times 20 = 60$ lít.\nThứ Ba: $5 \\times 20 = 100$ lít.\n\nChênh lệch: $100 - 60 = 40$ (lít).',
      difficulty: 'thong_hieu',
    },
  ];

  // =============================================
  // BÀI 16: Luyện tập chung (Số có sáu chữ số) — 1 câu
  // =============================================
  const b16Questions = [
    {
      question_code: 'T4-B16-005',
      content: 'Viết số La Mã tương ứng với các số sau: $14$, $29$.',
      answer: '$14 = \\text{XIV}$\n\n$29 = \\text{XXIX}$',
      solution: '**Số $14$:**\n$14 = 10 + 4 = \\text{X} + \\text{IV} = \\text{XIV}$\n\n**Số $29$:**\n$29 = 20 + 9 = \\text{XX} + \\text{IX} = \\text{XXIX}$\n\nLưu ý: $4 = \\text{IV}$ (không viết IIII), $9 = \\text{IX}$ (không viết VIIII).',
      difficulty: 'thong_hieu',
    },
  ];

  // INSERT VÀO DB
  let inserted = 0;

  const allQuestions = [
    ...b30Questions.map(q => ({ ...q, catId: catMap['b30'] })),
    ...b51Questions.map(q => ({ ...q, catId: catMap['b51'] })),
    ...b16Questions.map(q => ({ ...q, catId: catMap['b16'] })),
  ];

  for (const q of allQuestions) {
    if (!q.catId) {
      console.log(`⚠️ Không tìm được category cho [${q.question_code}]`);
      continue;
    }

    // Kiểm tra trùng mã
    const exists = await sql`SELECT id FROM public.questions WHERE question_code = ${q.question_code} LIMIT 1`;
    if (exists.length > 0) {
      console.log(`⏭️ [${q.question_code}] đã tồn tại, bỏ qua`);
      continue;
    }

    await sql`INSERT INTO public.questions (
      question_code, content, answer, solution, grade, difficulty, 
      question_type, category_id, status, topic, created_at, updated_at
    ) VALUES (
      ${q.question_code}, ${q.content}, ${q.answer}, ${q.solution}, 
      4, ${q.difficulty}, 'tu_luan', ${q.catId}, 'approved', 'so_hoc', NOW(), NOW()
    )`;
    inserted++;
    console.log(`✅ [${q.question_code}] Đã thêm`);
  }

  console.log(`\n📊 Tổng đã thêm: ${inserted} câu`);
  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`📊 Tổng câu trong DB: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
