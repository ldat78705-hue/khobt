const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND (name ILIKE '%trục đối xứng%' OR name ILIKE '%tâm đối xứng%')
    LIMIT 2
  `;
  
  if (cats.length < 2) {
    console.log('Categories not found!');
    return;
  }
  
  const id1 = cats.find(c => c.name.includes('trục đối xứng'))?.id;
  const id2 = cats.find(c => c.name.includes('tâm đối xứng'))?.id;
  console.log('Cat 1:', id1);
  console.log('Cat 2:', id2);

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6: Hình có trục đối xứng
  allQS.push(
    { cat: id1, code: 'T6-H3-NEW1', content: 'Thế nào là trục đối xứng của một hình? Hãy kể tên $3$ chữ cái in hoa có trục đối xứng.', answer: 'Chữ cái in hoa có trục đối xứng: A, H, M, O, T, U, V, X, Y.', solution: '- Đường thẳng $d$ được gọi là trục đối xứng của một hình nếu ta gấp hình đó theo đường thẳng $d$ thì hai nửa của hình chồng khít lên nhau.\n- Một số chữ cái in hoa có trục đối xứng là: A, H, M (hoặc O, T, U, V, X, Y).\n*(Ví dụ: Chữ A có trục đối xứng dọc, chữ B có trục đối xứng ngang).*' },
    { cat: id1, code: 'T6-H3-NEW2', content: 'Hình tam giác đều và hình vuông lần lượt có bao nhiêu trục đối xứng?', answer: 'Tam giác đều có 3 trục. Hình vuông có 4 trục.', solution: '- **Hình tam giác đều:** Có $3$ trục đối xứng. Mỗi trục đối xứng là đường thẳng đi qua một đỉnh và trung điểm của cạnh đối diện.\n- **Hình vuông:** Có $4$ trục đối xứng. Gồm $2$ đường thẳng đi qua trung điểm hai cặp cạnh đối diện và $2$ đường thẳng đi qua hai cặp đỉnh đối diện (hai đường chéo).' },
    { cat: id1, code: 'T6-H3-NEW3', content: 'Hình tròn có bao nhiêu trục đối xứng? Nêu cách xác định trục đối xứng của hình tròn.', answer: 'Hình tròn có vô số trục đối xứng.', solution: '- Hình tròn có **vô số** trục đối xứng.\n- Trục đối xứng của hình tròn là bất kì đường thẳng nào đi qua tâm của nó. Nói cách khác, mọi đường kính của hình tròn đều là một trục đối xứng.' },
    { cat: id1, code: 'T6-H3-NEW4', content: 'Trong tự nhiên và cuộc sống, hãy tìm $2$ ví dụ về hình ảnh có trục đối xứng.', answer: 'Con bướm, chiếc lá, mặt người, tháp Eiffel...', solution: 'Xung quanh chúng ta có rất nhiều sự vật có cấu trúc đối xứng trục. Một số ví dụ:\n- Con bướm (trục đối xứng chia dọc thân thân bướm làm $2$ cánh giống hệt nhau).\n- Chiếc lá (trục đối xứng thường là gân lá chính giữa).\n- Biển báo giao thông hình tam giác đều.' },
    { cat: id1, code: 'T6-H3-NEW5', content: 'Trục đối xứng của một đoạn thẳng là đường thẳng nào? Nêu cách vẽ trục đối xứng của đoạn thẳng $AB$ dài $4$ cm.', answer: 'Là đường trung trực của đoạn thẳng đó.', solution: 'Trục đối xứng của một đoạn thẳng là **đường trung trực** của đoạn thẳng đó.\n**Cách vẽ:**\n- Bước 1: Vẽ đoạn thẳng $AB$ dài $4$ cm.\n- Bước 2: Xác định trung điểm $I$ của $AB$ (cách $A$ và $B$ một khoảng $2$ cm).\n- Bước 3: Qua $I$, vẽ đường thẳng $d$ vuông góc với đoạn thẳng $AB$.\nĐường thẳng $d$ chính là đường trung trực, cũng là trục đối xứng của đoạn thẳng $AB$.' }
  );

  // Grade 6: Hình có tâm đối xứng
  allQS.push(
    { cat: id2, code: 'T6-H4-NEW1', content: 'Hãy kể tên $3$ chữ cái in hoa chỉ có tâm đối xứng mà KHÔNG CÓ trục đối xứng.', answer: 'N, S, Z.', solution: '- Điểm $O$ gọi là tâm đối xứng của một hình nếu khi quay hình đó nửa vòng quay quanh điểm $O$, hình thu được chồng khít lên hình ban đầu.\n- Các chữ cái in hoa có tâm đối xứng nhưng không có trục đối xứng là: **N, S, Z**.\n*(Ghi chú: Chữ H, I, O, X có cả tâm đối xứng và trục đối xứng).*' },
    { cat: id2, code: 'T6-H4-NEW2', content: 'Trong các hình sau: Hình bình hành, hình thoi, hình chữ nhật và hình thang cân. Hình nào có tâm đối xứng? Tâm đối xứng của chúng nằm ở đâu?', answer: 'Hình bình hành, hình thoi, hình chữ nhật có tâm đối xứng.', solution: '- **Hình bình hành:** Có tâm đối xứng. Tâm đối xứng là giao điểm của hai đường chéo.\n- **Hình thoi:** Có tâm đối xứng. Tâm đối xứng là giao điểm của hai đường chéo.\n- **Hình chữ nhật:** Có tâm đối xứng. Tâm đối xứng là giao điểm của hai đường chéo.\n- **Hình thang cân:** KHÔNG có tâm đối xứng (chỉ có trục đối xứng).' },
    { cat: id2, code: 'T6-H4-NEW3', content: 'Hình vuông có tâm đối xứng không? Nếu có, điểm đó là giao điểm của các đường nào?', answer: 'Có tâm đối xứng. Là giao điểm của hai đường chéo.', solution: 'Hình vuông là một hình tứ giác đều, vừa có trục đối xứng vừa có tâm đối xứng.\n- Hình vuông **có** tâm đối xứng.\n- Tâm đối xứng của hình vuông chính là giao điểm của hai đường chéo của nó.' },
    { cat: id2, code: 'T6-H4-NEW4', content: 'Trình bày cách tìm tâm đối xứng của đoạn thẳng $MN$ dài $6$ cm.', answer: 'Tâm đối xứng là trung điểm của đoạn thẳng.', solution: 'Tâm đối xứng của một đoạn thẳng chính là **trung điểm** của đoạn thẳng đó.\n**Cách tìm:**\n- Bước 1: Lấy thước thẳng đo độ dài đoạn $MN$ là $6$ cm.\n- Bước 2: Chia đôi độ dài đoạn thẳng: $6 : 2 = 3$ (cm).\n- Bước 3: Chấm một điểm $I$ nằm trên đoạn $MN$ sao cho khoảng cách từ $I$ đến $M$ bằng $3$ cm (khi đó $IM = IN = 3$ cm).\nĐiểm $I$ chính là trung điểm và là tâm đối xứng của đoạn thẳng $MN$.' },
    { cat: id2, code: 'T6-H4-NEW5', content: 'Em hãy tìm $2$ ví dụ về các biển báo giao thông hoặc hình ảnh logo có tâm đối xứng.', answer: 'Biển báo cấm đi ngược chiều, logo hình tròn trung tâm...', solution: 'Một số ví dụ về biển báo/hình ảnh có tâm đối xứng:\n- Biển báo "Cấm đi ngược chiều" (Hình tròn đỏ có một thanh ngang chữ nhật màu trắng ở giữa).\n- Mặt đĩa CD, bông hoa có $4$ hoặc $6$ cánh đối xứng đều, bàn cờ vua.\n- Một số logo của các thương hiệu có dạng vòng tròn đồng tâm hoặc đối xứng tâm chéo.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (Doi xung)...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung', ${grade}, 'hinh_hoc', 'tu_luan', ${user_id}, 'approved', true)
    `;
    console.log(`Inserted ${q.code}`);
  }

  console.log('Done!');
}

main().catch(console.error);
