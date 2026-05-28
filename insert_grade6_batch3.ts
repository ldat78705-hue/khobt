import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade6Batch3() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 32. Điểm và đường thẳng',
      questions: [
        { q: 'T6-C8B32-001', c: 'Qua hai điểm phân biệt, ta có thể vẽ được bao nhiêu đường thẳng?', a: 'Chỉ $1$ đường thẳng', s: 'Tính chất cơ bản: Qua hai điểm phân biệt luôn vẽ được một và chỉ một đường thẳng.', d: 'nhan_biet', o: ['Không có đường thẳng nào', 'Chỉ $1$ đường thẳng', '$2$ đường thẳng', 'Vô số đường thẳng'] },
        { q: 'T6-C8B32-002', c: 'Điểm $A$ thuộc đường thẳng $d$ được kí hiệu là:', a: '$A \\in d$', s: 'Kí hiệu thuộc là $\\in$. Do đó điểm $A$ thuộc $d$ kí hiệu $A \\in d$.', d: 'nhan_biet', o: ['$A \\in d$', '$A \\notin d$', '$d \\in A$', '$A \\subset d$'] },
        { q: 'T6-C8B32-003', c: 'Hai đường thẳng phân biệt có thể có bao nhiêu điểm chung?', a: 'Không có điểm chung nào hoặc có duy nhất $1$ điểm chung', s: 'Hai đường thẳng phân biệt thì hoặc song song (không có điểm chung) hoặc cắt nhau (có 1 điểm chung).', d: 'thong_hieu', o: ['Chỉ có $1$ điểm chung', 'Không có điểm chung nào', 'Không có điểm chung nào hoặc có duy nhất $1$ điểm chung', 'Có vô số điểm chung'] },
        { q: 'T6-C8B32-004', c: 'Cho ba điểm không thẳng hàng, vẽ các đường thẳng đi qua các cặp điểm. Số đường thẳng vẽ được là:', a: '$3$', s: 'Qua 3 điểm không thẳng hàng, ta vẽ được 3 đường thẳng tạo thành một tam giác.', d: 'thong_hieu', o: ['$1$', '$2$', '$3$', '$4$'] },
        { q: 'T6-C8B32-005', c: 'Cho $4$ điểm trong đó không có $3$ điểm nào thẳng hàng. Số đường thẳng đi qua $2$ trong $4$ điểm đó là:', a: '$6$', s: 'Số đường thẳng là $\\frac{4 \\times 3}{2} = 6$.', d: 'van_dung', o: ['$4$', '$5$', '$6$', '$8$'] }
      ]
    },
    {
      name: 'Bài 33. Điểm nằm giữa hai điểm. Tia',
      questions: [
        { q: 'T6-C8B33-001', c: 'Tia $Ox$ là hình gồm:', a: 'Điểm $O$ và một phần đường thẳng bị chia ra bởi điểm $O$', s: 'Định nghĩa: Hình gồm điểm $O$ và một phần đường thẳng bị chia ra bởi điểm $O$ gọi là một tia gốc $O$.', d: 'nhan_biet', o: ['Hai điểm $O, x$', 'Một phần đường thẳng', 'Đoạn thẳng $Ox$', 'Điểm $O$ và một phần đường thẳng bị chia ra bởi điểm $O$'] },
        { q: 'T6-C8B33-002', c: 'Hai tia đối nhau là hai tia:', a: 'Chung gốc và tạo thành một đường thẳng', s: 'Hai tia chung gốc và cùng nằm trên một đường thẳng, hướng về hai phía ngược nhau gọi là hai tia đối nhau.', d: 'nhan_biet', o: ['Cùng nằm trên một đường thẳng', 'Chung gốc', 'Chung gốc và tạo thành một đường thẳng', 'Không có điểm chung'] },
        { q: 'T6-C8B33-003', c: 'Nếu điểm $M$ nằm giữa hai điểm $A$ và $B$ thì:', a: '$AM + MB = AB$', s: 'Khi $M$ nằm giữa $A$ và $B$ thì tổng độ dài hai đoạn thẳng $AM, MB$ bằng độ dài đoạn thẳng $AB$.', d: 'thong_hieu', o: ['$AM = MB$', '$AM + MB = AB$', '$AM + AB = MB$', '$MB + AB = AM$'] },
        { q: 'T6-C8B33-004', c: 'Cho hai tia đối nhau $Ox$ và $Oy$. Lấy điểm $A \\in Ox, B \\in Oy$ (khác $O$). Điểm nào nằm giữa hai điểm còn lại?', a: 'Điểm $O$', s: 'Vì $A$ và $B$ nằm trên hai tia đối nhau gốc $O$ nên $O$ nằm giữa $A$ và $B$.', d: 'thong_hieu', o: ['Điểm $A$', 'Điểm $B$', 'Điểm $O$', 'Không có điểm nào nằm giữa'] },
        { q: 'T6-C8B33-005', c: 'Cho $M, N$ thuộc tia $Ox$ sao cho $OM = 2$cm, $ON = 5$cm. Khẳng định nào ĐÚNG?', a: 'Điểm $M$ nằm giữa $O$ và $N$', s: 'Trên cùng một tia $Ox$, vì $OM < ON$ ($2 < 5$) nên điểm $M$ nằm giữa $O$ và $N$.', d: 'van_dung', o: ['Điểm $N$ nằm giữa $O$ và $M$', 'Điểm $M$ nằm giữa $O$ và $N$', 'Điểm $O$ nằm giữa $M$ và $N$', 'Ba điểm không thẳng hàng'] }
      ]
    },
    {
      name: 'Bài 34. Đoạn thẳng. Độ dài đoạn thẳng',
      questions: [
        { q: 'T6-C8B34-001', c: 'Đoạn thẳng $AB$ là hình gồm:', a: 'Điểm $A$, điểm $B$ và tất cả các điểm nằm giữa $A$ và $B$', s: 'Định nghĩa: Đoạn thẳng $AB$ là hình gồm điểm $A$, điểm $B$ và tất cả các điểm nằm giữa $A$ và $B$.', d: 'nhan_biet', o: ['Hai điểm $A$ và $B$', 'Điểm $A$, điểm $B$ và tất cả các điểm nằm giữa $A$ và $B$', 'Đường thẳng đi qua $A$ và $B$', 'Khoảng cách từ $A$ đến $B$'] },
        { q: 'T6-C8B34-002', c: 'Độ dài đoạn thẳng $AB$ là:', a: 'Khoảng cách giữa hai điểm $A$ và $B$', s: 'Số đo chiều dài của đoạn thẳng $AB$ gọi là độ dài đoạn thẳng $AB$, cũng chính là khoảng cách giữa $A$ và $B$.', d: 'nhan_biet', o: ['Trung điểm của $AB$', 'Khoảng cách giữa hai điểm $A$ và $B$', 'Đường thẳng $AB$', 'Một số âm'] },
        { q: 'T6-C8B34-003', c: 'Nếu điểm $M$ nằm giữa $A$ và $B$, biết $AM = 3$cm, $MB = 4$cm thì độ dài $AB$ là:', a: '$7$cm', s: 'Vì $M$ nằm giữa $A$ và $B$ nên $AB = AM + MB = 3 + 4 = 7$ (cm).', d: 'thong_hieu', o: ['$1$cm', '$7$cm', '$12$cm', '$5$cm'] },
        { q: 'T6-C8B34-004', c: 'Cho $A, B, C$ thẳng hàng. Nếu $AB = 5$cm, $BC = 3$cm và $B$ nằm giữa $A, C$ thì $AC$ bằng:', a: '$8$cm', s: '$B$ nằm giữa $A, C \\Rightarrow AC = AB + BC = 5 + 3 = 8$ (cm).', d: 'thong_hieu', o: ['$2$cm', '$8$cm', '$4$cm', '$15$cm'] },
        { q: 'T6-C8B34-005', c: 'Trên tia $Ox$ lấy hai điểm $A, B$ sao cho $OA = 3$cm, $OB = 7$cm. Tính độ dài đoạn thẳng $AB$.', a: '$4$cm', s: 'Vì $OA < OB$ nên $A$ nằm giữa $O$ và $B \\Rightarrow OA + AB = OB \\Rightarrow 3 + AB = 7 \\Rightarrow AB = 4$ (cm).', d: 'van_dung', o: ['$10$cm', '$4$cm', '$5$cm', '$21$cm'] }
      ]
    },
    {
      name: 'Bài 35. Trung điểm của đoạn thẳng',
      questions: [
        { q: 'T6-C8B35-001', c: 'Trung điểm của đoạn thẳng $AB$ là điểm $M$ thỏa mãn:', a: '$M$ nằm giữa $A, B$ và $MA = MB$', s: 'Điểm $M$ gọi là trung điểm của $AB$ khi $M$ nằm giữa $A, B$ và cách đều $A, B$ ($MA = MB$).', d: 'nhan_biet', o: ['$MA = MB$', '$M$ nằm giữa $A, B$', '$M$ nằm giữa $A, B$ và $MA = MB$', '$MA + MB = AB$'] },
        { q: 'T6-C8B35-002', c: 'Mỗi đoạn thẳng có bao nhiêu trung điểm?', a: 'Chỉ $1$ trung điểm', s: 'Mỗi đoạn thẳng chỉ có duy nhất một trung điểm.', d: 'nhan_biet', o: ['Không có trung điểm nào', 'Chỉ $1$ trung điểm', '$2$ trung điểm', 'Vô số trung điểm'] },
        { q: 'T6-C8B35-003', c: 'Nếu $M$ là trung điểm của đoạn thẳng $AB$ dài $10$cm thì độ dài $MA$ bằng:', a: '$5$cm', s: '$M$ là trung điểm $AB$ nên $MA = \\frac{AB}{2} = 5$ (cm).', d: 'thong_hieu', o: ['$10$cm', '$20$cm', '$5$cm', '$4$cm'] },
        { q: 'T6-C8B35-004', c: 'Điểm $I$ là trung điểm của đoạn thẳng $MN$ khi:', a: '$IM = IN = \\frac{MN}{2}$', s: 'Điều kiện tương đương để $I$ là trung điểm $MN$ là $IM = IN = \\frac{MN}{2}$.', d: 'thong_hieu', o: ['$IM = IN$', '$IM + IN = MN$', '$IM = IN = \\frac{MN}{2}$', '$IM \\neq IN$'] },
        { q: 'T6-C8B35-005', c: 'Trên tia $Ox$, lấy điểm $A$ sao cho $OA = 4$cm. Gọi $M$ là trung điểm của $OA$. Độ dài đoạn thẳng $OM$ là:', a: '$2$cm', s: '$M$ là trung điểm $OA$ nên $OM = \\frac{OA}{2} = 2$ (cm).', d: 'van_dung', o: ['$4$cm', '$2$cm', '$8$cm', '$6$cm'] }
      ]
    },
    {
      name: 'Bài 36. Góc',
      questions: [
        { q: 'T6-C8B36-001', c: 'Góc là hình gồm:', a: 'Hai tia chung gốc', s: 'Định nghĩa: Góc là hình gồm hai tia chung gốc.', d: 'nhan_biet', o: ['Hai đường thẳng cắt nhau', 'Hai tia cắt nhau', 'Hai tia chung gốc', 'Một đường thẳng và một tia'] },
        { q: 'T6-C8B36-002', c: 'Góc bẹt là góc có hai cạnh là:', a: 'Hai tia đối nhau', s: 'Góc bẹt là góc có hai cạnh là hai tia đối nhau.', d: 'nhan_biet', o: ['Hai tia trùng nhau', 'Hai tia đối nhau', 'Hai tia song song', 'Hai tia vuông góc'] },
        { q: 'T6-C8B36-003', c: 'Góc $\\widehat{xOy}$ có đỉnh là điểm nào?', a: 'Điểm $O$', s: 'Trong kí hiệu góc $\\widehat{xOy}$, chữ cái ở giữa chỉ đỉnh của góc. Vậy đỉnh là $O$.', d: 'thong_hieu', o: ['Điểm $x$', 'Điểm $y$', 'Điểm $O$', 'Không có đỉnh'] },
        { q: 'T6-C8B36-004', c: 'Hình gồm hai tia $Ox$ và $Oy$ chung gốc $O$ tạo thành góc nào?', a: 'Góc $xOy$', s: 'Hai tia $Ox, Oy$ tạo thành góc $\\widehat{xOy}$ (hoặc $\\widehat{yOx}$).', d: 'thong_hieu', o: ['Góc $Oxy$', 'Góc $xOy$', 'Góc $yxO$', 'Đoạn thẳng $xy$'] },
        { q: 'T6-C8B36-005', c: 'Lúc 6 giờ đúng, kim giờ và kim phút của đồng hồ tạo thành góc gì?', a: 'Góc bẹt', s: 'Lúc 6 giờ, kim giờ chỉ số 6, kim phút chỉ số 12. Hai kim tạo thành hai tia đối nhau, tức là góc bẹt.', d: 'van_dung', o: ['Góc vuông', 'Góc nhọn', 'Góc tù', 'Góc bẹt'] }
      ]
    },
    {
      name: 'Bài 37. Số đo góc',
      questions: [
        { q: 'T6-C8B37-001', c: 'Đơn vị đo góc thường dùng là:', a: 'Độ ($^\\circ$)', s: 'Người ta thường dùng độ (kí hiệu $^\\circ$) làm đơn vị đo góc.', d: 'nhan_biet', o: ['Milimet (mm)', 'Gam (g)', 'Độ ($^\\circ$)', 'Lít (l)'] },
        { q: 'T6-C8B37-002', c: 'Dụng cụ để đo số đo của một góc là:', a: 'Thước đo góc', s: 'Để đo góc, ta dùng thước đo góc (thước chữ D).', d: 'nhan_biet', o: ['Ê-ke', 'Thước thẳng', 'Com-pa', 'Thước đo góc'] },
        { q: 'T6-C8B37-003', c: 'Góc nhọn là góc có số đo:', a: 'Lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$', s: 'Góc có số đo lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$ gọi là góc nhọn.', d: 'thong_hieu', o: ['Bằng $90^\\circ$', 'Lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$', 'Lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$', 'Bằng $180^\\circ$'] },
        { q: 'T6-C8B37-004', c: 'Góc tù là góc có số đo:', a: 'Lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$', s: 'Góc có số đo lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$ gọi là góc tù.', d: 'thong_hieu', o: ['Bằng $90^\\circ$', 'Lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$', 'Lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$', 'Bằng $180^\\circ$'] },
        { q: 'T6-C8B37-005', c: 'Góc bẹt có số đo bằng bao nhiêu?', a: '$180^\\circ$', s: 'Góc bẹt là góc tạo bởi hai tia đối nhau, số đo bằng $180^\\circ$.', d: 'van_dung', o: ['$90^\\circ$', '$180^\\circ$', '$360^\\circ$', '$0^\\circ$'] }
      ]
    },
    {
      name: 'Ôn tập chương VIII',
      questions: [
        { q: 'T6-C8OT-001', c: 'Trong các góc sau, góc nào có số đo lớn nhất?', a: 'Góc bẹt', s: 'Góc nhọn $< 90^\\circ$, góc vuông $= 90^\\circ$, góc tù $< 180^\\circ$, góc bẹt $= 180^\\circ$. Nên góc bẹt lớn nhất.', d: 'nhan_biet', o: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'] },
        { q: 'T6-C8OT-002', c: 'Cho đoạn thẳng $AB = 8$cm, $M$ là trung điểm của $AB$. Gọi $N$ là trung điểm của $AM$. Độ dài đoạn thẳng $AN$ là:', a: '$2$cm', s: '$MA = \\frac{AB}{2} = 4$cm. $N$ là trung điểm $AM \\Rightarrow AN = \\frac{MA}{2} = 2$cm.', d: 'thong_hieu', o: ['$4$cm', '$2$cm', '$6$cm', '$1$cm'] },
        { q: 'T6-C8OT-003', c: 'Có bao nhiêu góc được tạo thành từ $3$ tia chung gốc phân biệt?', a: '$3$ góc', s: 'Từ $n$ tia chung gốc tạo ra $\\frac{n(n-1)}{2}$ góc. Với $n=3$ ta có $\\frac{3 \\times 2}{2} = 3$ góc.', d: 'thong_hieu', o: ['$2$ góc', '$3$ góc', '$4$ góc', '$6$ góc'] },
        { q: 'T6-C8OT-004', c: 'Khẳng định nào sau đây ĐÚNG?', a: 'Góc vuông nhỏ hơn góc tù', s: 'Góc vuông ($90^\\circ$) luôn nhỏ hơn góc tù ($>90^\\circ$).', d: 'thong_hieu', o: ['Góc nhọn lớn hơn góc vuông', 'Góc bẹt nhỏ hơn góc tù', 'Góc vuông nhỏ hơn góc tù', 'Góc tù lớn hơn góc bẹt'] },
        { q: 'T6-C8OT-005', c: 'Cho $5$ tia chung gốc phân biệt. Số góc tạo thành là:', a: '$10$ góc', s: 'Số góc tạo thành là $\\frac{5 \\times 4}{2} = 10$ góc.', d: 'van_dung', o: ['$5$ góc', '$10$ góc', '$15$ góc', '$20$ góc'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 6 LIMIT 1`;
    if (cats.length === 0) {
      console.log(`Bỏ qua: Không tìm thấy ${topic.name}`);
      continue;
    }
    const catId = cats[0].id;
    console.log(`\nĐang bơm cho ${topic.name}...`);
    
    for (const q of topic.questions) {
      const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${q.q}`;
      if (existing.length === 0) {
        await sql`
          INSERT INTO public.questions (
            category_id, question_code, content, answer, solution, 
            difficulty, question_type, options, correct_answer, status, grade, topic, user_id
          ) VALUES (
            ${catId}, ${q.q}, ${q.c}, ${q.a}, ${q.s},
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 6, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 3 Lớp 6');
}

insertGrade6Batch3().catch(console.error);
