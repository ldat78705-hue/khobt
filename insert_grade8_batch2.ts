import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade8Batch2() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 11. Hình thang cân.',
      questions: [
        { q: 'T8-C3B11-001', c: 'Hình thang cân là hình thang có:', a: 'Hai góc kề một đáy bằng nhau', s: 'Định nghĩa: Hình thang cân là hình thang có hai góc kề một đáy bằng nhau.', d: 'nhan_biet', o: ['Hai cạnh bên bằng nhau', 'Hai góc kề một đáy bằng nhau', 'Hai đường chéo vuông góc', 'Hai cạnh đáy bằng nhau'] },
        { q: 'T8-C3B11-002', c: 'Trong hình thang cân, hai đường chéo có tính chất gì?', a: 'Bằng nhau', s: 'Tính chất của hình thang cân: Hai đường chéo bằng nhau.', d: 'nhan_biet', o: ['Vuông góc với nhau', 'Cắt nhau tại trung điểm', 'Bằng nhau', 'Là phân giác của các góc'] },
        { q: 'T8-C3B11-003', c: 'Cho hình thang $ABCD$ ($AB \\parallel CD$). Nếu $AC = BD$ thì $ABCD$ là hình gì?', a: 'Hình thang cân', s: 'Dấu hiệu nhận biết: Hình thang có hai đường chéo bằng nhau là hình thang cân.', d: 'thong_hieu', o: ['Hình bình hành', 'Hình thang cân', 'Hình chữ nhật', 'Hình thoi'] },
        { q: 'T8-C3B11-004', c: 'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} = 60^\\circ$. Số đo $\\widehat{D}$ là:', a: '$120^\\circ$', s: 'Hai góc kề một cạnh bên của hình thang bù nhau: $\\widehat{A} + \\widehat{D} = 180^\\circ \\Rightarrow \\widehat{D} = 180^\\circ - 60^\\circ = 120^\\circ$.', d: 'thong_hieu', o: ['$60^\\circ$', '$90^\\circ$', '$120^\\circ$', '$180^\\circ$'] },
        { q: 'T8-C3B11-005', c: 'Hình thang cân $ABCD$ ($AB \\parallel CD$) có đáy nhỏ $AB = 3$cm, đáy lớn $CD = 7$cm. Chu vi là $20$cm. Độ dài cạnh bên là:', a: '$5$cm', s: 'Tổng hai cạnh bên $= 20 - (3+7) = 10$. Vì hình thang cân nên hai cạnh bên bằng nhau $= 5$cm.', d: 'van_dung', o: ['$10$cm', '$5$cm', '$4$cm', '$6$cm'] }
      ]
    },
    {
      name: 'Bài 12. Hình bình hành.',
      questions: [
        { q: 'T8-C3B12-001', c: 'Hình bình hành là tứ giác có:', a: 'Các cạnh đối song song', s: 'Định nghĩa: Tứ giác có các cạnh đối song song là hình bình hành.', d: 'nhan_biet', o: ['Bốn góc bằng nhau', 'Bốn cạnh bằng nhau', 'Các cạnh đối song song', 'Hai cạnh đối song song'] },
        { q: 'T8-C3B12-002', c: 'Trong hình bình hành, hai đường chéo có tính chất gì?', a: 'Cắt nhau tại trung điểm của mỗi đường', s: 'Tính chất hình bình hành: hai đường chéo cắt nhau tại trung điểm mỗi đường.', d: 'nhan_biet', o: ['Bằng nhau', 'Vuông góc với nhau', 'Cắt nhau tại trung điểm của mỗi đường', 'Là đường phân giác của các góc'] },
        { q: 'T8-C3B12-003', c: 'Cho hình bình hành $ABCD$ có $\\widehat{A} = 50^\\circ$. Số đo $\\widehat{C}$ là:', a: '$50^\\circ$', s: 'Trong hình bình hành, các góc đối bằng nhau. Nên $\\widehat{C} = \\widehat{A} = 50^\\circ$.', d: 'thong_hieu', o: ['$130^\\circ$', '$50^\\circ$', '$40^\\circ$', '$90^\\circ$'] },
        { q: 'T8-C3B12-004', c: 'Tứ giác $ABCD$ có $AB \\parallel CD$ và $AB = CD$. Tứ giác đó là hình gì?', a: 'Hình bình hành', s: 'Dấu hiệu nhận biết: Tứ giác có 2 cạnh đối vừa song song vừa bằng nhau là hình bình hành.', d: 'thong_hieu', o: ['Hình thang cân', 'Hình chữ nhật', 'Hình bình hành', 'Hình thoi'] },
        { q: 'T8-C3B12-005', c: 'Chu vi hình bình hành $ABCD$ là $20$cm, biết $AB = 6$cm. Tính độ dài cạnh $BC$:', a: '$4$cm', s: 'Chu vi $= 2(AB+BC) = 20 \\Rightarrow AB+BC = 10 \\Rightarrow BC = 10 - 6 = 4$cm.', d: 'van_dung', o: ['$14$cm', '$4$cm', '$7$cm', '$8$cm'] }
      ]
    },
    {
      name: 'Bài 13. Hình chữ nhật.',
      questions: [
        { q: 'T8-C3B13-001', c: 'Hình chữ nhật là tứ giác có:', a: 'Bốn góc vuông', s: 'Định nghĩa: Hình chữ nhật là tứ giác có bốn góc vuông.', d: 'nhan_biet', o: ['Hai góc vuông', 'Ba góc vuông', 'Bốn góc vuông', 'Bốn cạnh bằng nhau'] },
        { q: 'T8-C3B13-002', c: 'Trong hình chữ nhật, hai đường chéo có tính chất gì?', a: 'Bằng nhau và cắt nhau tại trung điểm mỗi đường', s: 'Hình chữ nhật là hình bình hành nên hai đường chéo cắt nhau tại trung điểm, ngoài ra chúng còn bằng nhau.', d: 'nhan_biet', o: ['Vuông góc với nhau', 'Bằng nhau và cắt nhau tại trung điểm mỗi đường', 'Vuông góc và bằng nhau', 'Là các đường phân giác'] },
        { q: 'T8-C3B13-003', c: 'Hình bình hành có một góc vuông là hình gì?', a: 'Hình chữ nhật', s: 'Dấu hiệu nhận biết hình chữ nhật.', d: 'thong_hieu', o: ['Hình chữ nhật', 'Hình thoi', 'Hình vuông', 'Hình thang vuông'] },
        { q: 'T8-C3B13-004', c: 'Hình chữ nhật $ABCD$ có hai đường chéo $AC$ và $BD$ cắt nhau tại $O$. Nếu $AC = 10$cm thì $OA$ bằng:', a: '$5$cm', s: '$O$ là trung điểm của $AC$ nên $OA = AC / 2 = 10 / 2 = 5$cm.', d: 'thong_hieu', o: ['$10$cm', '$5$cm', '$20$cm', '$2,5$cm'] },
        { q: 'T8-C3B13-005', c: 'Một hình chữ nhật có chu vi $28$cm, chiều dài hơn chiều rộng $2$cm. Diện tích hình chữ nhật là:', a: '$48$cm$^2$', s: 'Nửa chu vi $= 14$. $a+b = 14, a-b = 2 \\Rightarrow a = 8, b = 6$. Diện tích $= 8 \\times 6 = 48$.', d: 'van_dung', o: ['$48$cm$^2$', '$24$cm$^2$', '$56$cm$^2$', '$96$cm$^2$'] }
      ]
    },
    {
      name: 'Bài 14. Hình thoi và hình vuông.',
      questions: [
        { q: 'T8-C3B14-001', c: 'Hình thoi là tứ giác có:', a: 'Bốn cạnh bằng nhau', s: 'Định nghĩa: Hình thoi là tứ giác có bốn cạnh bằng nhau.', d: 'nhan_biet', o: ['Bốn góc vuông', 'Bốn cạnh bằng nhau', 'Các cạnh đối bằng nhau', 'Hai đường chéo bằng nhau'] },
        { q: 'T8-C3B14-002', c: 'Hình vuông là tứ giác có:', a: 'Bốn góc vuông và bốn cạnh bằng nhau', s: 'Định nghĩa: Hình vuông vừa là hình chữ nhật vừa là hình thoi.', d: 'nhan_biet', o: ['Bốn góc bằng nhau', 'Bốn góc vuông và bốn cạnh bằng nhau', 'Bốn cạnh bằng nhau', 'Hai đường chéo vuông góc'] },
        { q: 'T8-C3B14-003', c: 'Hình bình hành có hai đường chéo vuông góc với nhau là hình gì?', a: 'Hình thoi', s: 'Dấu hiệu nhận biết hình thoi.', d: 'thong_hieu', o: ['Hình chữ nhật', 'Hình vuông', 'Hình thoi', 'Hình thang cân'] },
        { q: 'T8-C3B14-004', c: 'Hình chữ nhật có hai đường chéo vuông góc với nhau là hình gì?', a: 'Hình vuông', s: 'Dấu hiệu nhận biết hình vuông (Hình chữ nhật có 2 đường chéo vuông góc là hình vuông).', d: 'thong_hieu', o: ['Hình vuông', 'Hình thoi', 'Hình bình hành', 'Hình thang vuông'] },
        { q: 'T8-C3B14-005', c: 'Một hình thoi có độ dài hai đường chéo lần lượt là $6$cm và $8$cm. Cạnh hình thoi là:', a: '$5$cm', s: 'Hai đường chéo cắt nhau tại trung điểm và vuông góc, tạo thành 4 tam giác vuông. Cạnh hình thoi là cạnh huyền: $\\sqrt{3^2 + 4^2} = 5$cm.', d: 'van_dung', o: ['$10$cm', '$7$cm', '$5$cm', '$14$cm'] }
      ]
    },
    {
      name: 'Bài tập cuối chương III.',
      questions: [
        { q: 'T8-C3OT-001', c: 'Tổng các góc của một tứ giác lồi bằng bao nhiêu?', a: '$360^\\circ$', s: 'Tổng $4$ góc của một tứ giác luôn bằng $360^\\circ$.', d: 'nhan_biet', o: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$540^\\circ$'] },
        { q: 'T8-C3OT-002', c: 'Tứ giác có $3$ góc vuông là hình gì?', a: 'Hình chữ nhật', s: 'Tứ giác có $3$ góc vuông thì góc thứ tư cũng bằng $90^\\circ$, do đó là hình chữ nhật.', d: 'thong_hieu', o: ['Hình vuông', 'Hình thoi', 'Hình bình hành', 'Hình chữ nhật'] },
        { q: 'T8-C3OT-003', c: 'Hình bình hành có hai đường chéo bằng nhau là hình gì?', a: 'Hình chữ nhật', s: 'Dấu hiệu nhận biết hình chữ nhật.', d: 'thong_hieu', o: ['Hình thoi', 'Hình vuông', 'Hình chữ nhật', 'Hình thang cân'] },
        { q: 'T8-C3OT-004', c: 'Hình thoi có một góc vuông là hình gì?', a: 'Hình vuông', s: 'Hình thoi có một góc vuông thì các góc còn lại đều vuông $\\Rightarrow$ Hình vuông.', d: 'thong_hieu', o: ['Hình chữ nhật', 'Hình bình hành', 'Hình vuông', 'Không xác định được'] },
        { q: 'T8-C3OT-005', c: 'Một hình vuông có chu vi là $20$cm. Độ dài đường chéo của hình vuông đó là:', a: '$5\\sqrt{2}$ cm', s: 'Cạnh $= 20/4 = 5$cm. Đường chéo $= a\\sqrt{2} = 5\\sqrt{2}$ cm.', d: 'van_dung', o: ['$5$ cm', '$10$ cm', '$5\\sqrt{2}$ cm', '$25$ cm'] }
      ]
    },
    {
      name: 'Bài 16. Đường trung bình của tam giác.',
      questions: [
        { q: 'T8-C4B16-001', c: 'Đường trung bình của tam giác là đoạn thẳng nối:', a: 'Trung điểm hai cạnh của tam giác', s: 'Định nghĩa đường trung bình của tam giác.', d: 'nhan_biet', o: ['Hai đỉnh của tam giác', 'Đỉnh và trung điểm của cạnh đối diện', 'Trung điểm hai cạnh của tam giác', 'Một đỉnh và điểm trên cạnh đối diện vuông góc'] },
        { q: 'T8-C4B16-002', c: 'Tính chất đường trung bình của tam giác là:', a: 'Song song với cạnh thứ ba và bằng nửa cạnh ấy', s: 'Định lí đường trung bình của tam giác.', d: 'nhan_biet', o: ['Vuông góc với cạnh thứ ba', 'Song song với cạnh thứ ba và bằng nửa cạnh ấy', 'Cắt cạnh thứ ba tại trung điểm', 'Bằng cạnh thứ ba'] },
        { q: 'T8-C4B16-003', c: 'Tam giác $ABC$ có $M, N$ lần lượt là trung điểm của $AB, AC$. Nếu $BC = 10$cm thì $MN$ bằng:', a: '$5$cm', s: '$MN$ là đường trung bình $\\Rightarrow MN = \\frac{BC}{2} = 5$cm.', d: 'thong_hieu', o: ['$20$cm', '$10$cm', '$5$cm', '$2,5$cm'] },
        { q: 'T8-C4B16-004', c: 'Tam giác $DEF$ có trung bình tuyến $MN = 4$cm ($M \\in DE, N \\in DF$). Cạnh $EF$ bằng:', a: '$8$cm', s: '$MN = \\frac{EF}{2} \\Rightarrow EF = 2 \\times MN = 8$cm.', d: 'thong_hieu', o: ['$2$cm', '$4$cm', '$8$cm', '$16$cm'] },
        { q: 'T8-C4B16-005', c: 'Chu vi tam giác $ABC$ là $24$cm. Gọi $D, E, F$ lần lượt là trung điểm của ba cạnh. Chu vi tam giác $DEF$ là:', a: '$12$cm', s: 'Tam giác $DEF$ có ba cạnh bằng một nửa ba cạnh tam giác $ABC$, nên chu vi cũng bằng một nửa: $24/2 = 12$cm.', d: 'van_dung', o: ['$12$cm', '$24$cm', '$48$cm', '$6$cm'] }
      ]
    },
    {
      name: 'Bài 17. Tính chất đường phân giác của tam giác.',
      questions: [
        { q: 'T8-C4B17-001', c: 'Đường phân giác của một góc trong tam giác chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với:', a: 'Hai cạnh kề hai đoạn ấy', s: 'Tính chất đường phân giác của tam giác.', d: 'nhan_biet', o: ['Hai đường cao tương ứng', 'Hai đường trung tuyến tương ứng', 'Hai cạnh kề hai đoạn ấy', 'Nhau (chúng bằng nhau)'] },
        { q: 'T8-C4B17-002', c: 'Tam giác $ABC$ có đường phân giác $AD$ ($D \\in BC$). Hệ thức nào sau đây ĐÚNG?', a: '$\\frac{DB}{DC} = \\frac{AB}{AC}$', s: 'Theo tính chất đường phân giác.', d: 'nhan_biet', o: ['$\\frac{DB}{DC} = \\frac{AC}{AB}$', '$\\frac{DB}{AB} = \\frac{AC}{DC}$', '$\\frac{DB}{DC} = \\frac{AB}{AC}$', '$\\frac{AB}{BD} = \\frac{DC}{AC}$'] },
        { q: 'T8-C4B17-003', c: 'Tam giác $ABC$ có $AB=6$cm, $AC=8$cm, phân giác $AD$. Tỉ số $\\frac{DB}{DC}$ là:', a: '$\\frac{3}{4}$', s: '$\\frac{DB}{DC} = \\frac{AB}{AC} = \\frac{6}{8} = \\frac{3}{4}$.', d: 'thong_hieu', o: ['$\\frac{3}{4}$', '$\\frac{4}{3}$', '$\\frac{1}{2}$', '$\\frac{3}{7}$'] },
        { q: 'T8-C4B17-004', c: 'Cho $\\Delta ABC$, phân giác $AD$. Biết $AB=4$cm, $AC=6$cm, $BC=5$cm. Độ dài $DB$ là:', a: '$2$cm', s: '$\\frac{DB}{DC} = \\frac{4}{6} = \\frac{2}{3} \\Rightarrow DB = \\frac{2}{5} BC = \\frac{2}{5} \\times 5 = 2$cm.', d: 'thong_hieu', o: ['$3$cm', '$2$cm', '$2,5$cm', '$1$cm'] },
        { q: 'T8-C4B17-005', c: 'Cho $\\Delta MNP$ có $MN=3$cm, $MP=5$cm. Phân giác góc $M$ cắt $NP$ tại $Q$. Nếu $NQ = 1,5$cm thì $PQ$ bằng:', a: '$2,5$cm', s: '$\\frac{NQ}{PQ} = \\frac{MN}{MP} \\Rightarrow \\frac{1,5}{PQ} = \\frac{3}{5} \\Rightarrow PQ = \\frac{1,5 \\times 5}{3} = 2,5$cm.', d: 'van_dung', o: ['$2$cm', '$2,5$cm', '$3$cm', '$4,5$cm'] }
      ]
    },
    {
      name: 'Bài tập cuối chương IV.',
      questions: [
        { q: 'T8-C4OT-001', c: 'Định lí Thalès: Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó:', a: 'Những đoạn thẳng tương ứng tỉ lệ', s: 'Nội dung định lí Thalès.', d: 'nhan_biet', o: ['Những đoạn thẳng bằng nhau', 'Những đoạn thẳng tương ứng tỉ lệ', 'Những đoạn thẳng vuông góc', 'Những đoạn thẳng song song'] },
        { q: 'T8-C4OT-002', c: 'Cho $\\Delta ABC$, đường thẳng $MN \\parallel BC$ ($M \\in AB, N \\in AC$). Nếu $AM=2$cm, $MB=3$cm, $AN=4$cm thì $NC$ bằng:', a: '$6$cm', s: 'Theo định lí Thalès: $\\frac{AM}{MB} = \\frac{AN}{NC} \\Rightarrow \\frac{2}{3} = \\frac{4}{NC} \\Rightarrow NC = 6$cm.', d: 'thong_hieu', o: ['$5$cm', '$6$cm', '$8$cm', '$12$cm'] },
        { q: 'T8-C4OT-003', c: 'Trong $\\Delta ABC$, một đường thẳng đi qua trung điểm của $AB$ và song song với $BC$ thì nó sẽ:', a: 'Đi qua trung điểm của $AC$', s: 'Đây là định lí về đường trung bình của tam giác.', d: 'thong_hieu', o: ['Vuông góc với $AC$', 'Đi qua trung điểm của $AC$', 'Cắt $AC$ theo tỉ lệ $1:3$', 'Song song với $AC$'] },
        { q: 'T8-C4OT-004', c: 'Đường phân giác góc ngoài tại một đỉnh của tam giác chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với:', a: 'Hai cạnh kề của tam giác', s: 'Tính chất đường phân giác ngoài cũng tương tự đường phân giác trong.', d: 'thong_hieu', o: ['Hai đường cao', 'Hai đường trung tuyến', 'Hai cạnh kề của tam giác', 'Nhau'] },
        { q: 'T8-C4OT-005', c: 'Cho hình thang $ABCD$ ($AB \\parallel CD$). Gọi $M, N$ lần lượt là trung điểm của hai cạnh bên $AD$ và $BC$. Nếu $AB=4$cm, $CD=8$cm thì độ dài đường trung bình $MN$ bằng:', a: '$6$cm', s: '$MN = \\frac{AB+CD}{2} = \\frac{4+8}{2} = 6$cm.', d: 'van_dung', o: ['$4$cm', '$8$cm', '$12$cm', '$6$cm'] }
      ]
    }
  ];

  for (const topic of topics) {
    const cats = await sql`SELECT id, name FROM public.categories WHERE name ILIKE ${'%' + topic.name + '%'} AND grade = 8 LIMIT 1`;
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
            ${q.d}, 'trac_nghiem', ${JSON.stringify(q.o)}::jsonb, ${q.a}, 'approved', 8, ${cats[0].name}, ${defaultUserId}
          )
        `;
        console.log(`Đã chèn: ${q.q}`);
      } else {
        console.log(`Bỏ qua: ${q.q}`);
      }
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log('\n✅ Hoàn thành Batch 2 Lớp 8');
}

insertGrade8Batch2().catch(console.error);
