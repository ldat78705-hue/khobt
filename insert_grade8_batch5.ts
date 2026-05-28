import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function insertGrade8Batch5() {
  console.log('Khởi tạo kết nối CSDL...');
  
  const users = await sql`SELECT user_id FROM public.questions WHERE user_id IS NOT NULL LIMIT 1`;
  const defaultUserId = users.length > 0 ? users[0].user_id : '00000000-0000-0000-0000-000000000000';

  const topics = [
    {
      name: 'Bài 34. Ba trường hợp đồng dạng của hai tam giác.',
      questions: [
        { q: 'T8-C9B34-001', c: 'Hai tam giác đồng dạng (trường hợp c.c.c) nếu ba cạnh của tam giác này như thế nào với ba cạnh của tam giác kia?', a: 'Tỉ lệ với nhau', s: 'Định lí đồng dạng trường hợp cạnh-cạnh-cạnh.', d: 'nhan_biet', o: ['Bằng nhau', 'Tỉ lệ với nhau', 'Song song với nhau', 'Vuông góc với nhau'] },
        { q: 'T8-C9B34-002', c: 'Nếu $\\Delta ABC \\sim \\Delta A\'B\'C\'$ với tỉ số đồng dạng $k$ thì $\\Delta A\'B\'C\' \\sim \\Delta ABC$ với tỉ số đồng dạng nào?', a: '$\\frac{1}{k}$', s: 'Theo tính chất đối xứng của hai tam giác đồng dạng.', d: 'nhan_biet', o: ['$k$', '$-k$', '$\\frac{1}{k}$', '$1-k$'] },
        { q: 'T8-C9B34-003', c: 'Cho $\\Delta ABC \\sim \\Delta MNP$. Biết $\\widehat{A} = 60^\\circ, \\widehat{B} = 70^\\circ$. Số đo $\\widehat{P}$ là:', a: '$50^\\circ$', s: 'Trong $\\Delta ABC$, $\\widehat{C} = 180^\\circ - 60^\\circ - 70^\\circ = 50^\\circ$. Do hai tam giác đồng dạng, $\\widehat{P} = \\widehat{C} = 50^\\circ$.', d: 'thong_hieu', o: ['$60^\\circ$', '$70^\\circ$', '$50^\\circ$', '$130^\\circ$'] },
        { q: 'T8-C9B34-004', c: 'Cho $\\Delta ABC \\sim \\Delta DEF$ với tỉ số đồng dạng $k=2$. Tỉ số chu vi của $\\Delta ABC$ và $\\Delta DEF$ là:', a: '$2$', s: 'Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng.', d: 'thong_hieu', o: ['$2$', '$\\frac{1}{2}$', '$4$', '$\\frac{1}{4}$'] },
        { q: 'T8-C9B34-005', c: 'Hai tam giác $\\Delta ABC \\sim \\Delta MNP$ với tỉ số đồng dạng $k$. Nếu diện tích $\\Delta ABC$ là $10$, $k=2$, thì diện tích $\\Delta MNP$ là:', a: '$2,5$', s: 'Tỉ số diện tích bằng $k^2 = 4$. Vậy $S_{ABC} = 4 S_{MNP} \\Rightarrow S_{MNP} = 10/4 = 2,5$.', d: 'van_dung', o: ['$5$', '$20$', '$40$', '$2,5$'] }
      ]
    },
    {
      name: 'Bài 35. Định lí Pythagore và ứng dụng.',
      questions: [
        { q: 'T8-C9B35-001', c: 'Định lí Pythagore được áp dụng cho loại tam giác nào?', a: 'Tam giác vuông', s: 'Định lí Pythagore chỉ đúng với tam giác vuông.', d: 'nhan_biet', o: ['Tam giác cân', 'Tam giác đều', 'Tam giác nhọn', 'Tam giác vuông'] },
        { q: 'T8-C9B35-002', c: 'Nếu tam giác $ABC$ vuông tại $A$ thì hệ thức nào sau đây ĐÚNG?', a: '$BC^2 = AB^2 + AC^2$', s: 'Bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.', d: 'nhan_biet', o: ['$AB^2 = AC^2 + BC^2$', '$BC^2 = AB^2 + AC^2$', '$AC^2 = AB^2 + BC^2$', '$BC = AB + AC$'] },
        { q: 'T8-C9B35-003', c: 'Tam giác có độ dài $3$ cạnh là $3$cm, $4$cm, $5$cm có phải là tam giác vuông không?', a: 'Có', s: 'Vì $3^2 + 4^2 = 9 + 16 = 25 = 5^2$. Theo định lí Pythagore đảo, đây là tam giác vuông.', d: 'thong_hieu', o: ['Có', 'Không', 'Chỉ khi nó là tam giác cân', 'Không thể xác định'] },
        { q: 'T8-C9B35-004', c: 'Tam giác $ABC$ vuông tại $A$, biết $AB = 6$cm, $AC = 8$cm. Độ dài cạnh $BC$ bằng:', a: '$10$cm', s: '$BC = \\sqrt{6^2 + 8^2} = \\sqrt{36+64} = \\sqrt{100} = 10$cm.', d: 'thong_hieu', o: ['$14$cm', '$10$cm', '$100$cm', '$2$cm'] },
        { q: 'T8-C9B35-005', c: 'Một hình chữ nhật có hai cạnh là $5$cm và $12$cm. Độ dài đường chéo của hình chữ nhật đó là:', a: '$13$cm', s: 'Đường chéo chia hình chữ nhật thành hai tam giác vuông. $d = \\sqrt{5^2 + 12^2} = 13$cm.', d: 'van_dung', o: ['$13$cm', '$17$cm', '$7$cm', '$60$cm'] }
      ]
    },
    {
      name: 'Bài 36. Các trường hợp đồng dạng của hai tam giác vuông.',
      questions: [
        { q: 'T8-C9B36-001', c: 'Hai tam giác vuông đồng dạng với nhau nếu có thêm điều kiện gì?', a: 'Một góc nhọn của tam giác này bằng một góc nhọn của tam giác kia', s: 'Trường hợp đồng dạng góc-góc của tam giác vuông.', d: 'nhan_biet', o: ['Cạnh huyền bằng nhau', 'Một góc nhọn của tam giác này bằng một góc nhọn của tam giác kia', 'Hai cạnh góc vuông bằng nhau', 'Diện tích bằng nhau'] },
        { q: 'T8-C9B36-002', c: 'Nếu cạnh huyền và một cạnh góc vuông của tam giác vuông này tỉ lệ với cạnh huyền và một cạnh góc vuông của tam giác vuông kia thì:', a: 'Hai tam giác vuông đó đồng dạng', s: 'Trường hợp đồng dạng cạnh-huyền cạnh-góc-vuông.', d: 'nhan_biet', o: ['Hai tam giác vuông đó bằng nhau', 'Hai tam giác vuông đó đồng dạng', 'Hai tam giác có cùng diện tích', 'Hai tam giác có chung đỉnh'] },
        { q: 'T8-C9B36-003', c: 'Tỉ số độ dài hai đường cao tương ứng của hai tam giác đồng dạng bằng đại lượng nào?', a: 'Tỉ số đồng dạng', s: 'Tỉ số đường cao, đường trung tuyến, phân giác đều bằng tỉ số đồng dạng.', d: 'thong_hieu', o: ['Bình phương tỉ số đồng dạng', 'Tỉ số đồng dạng', 'Một nửa tỉ số đồng dạng', 'Chu vi của tam giác'] },
        { q: 'T8-C9B36-004', c: 'Tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$. Nếu $\\frac{AB}{DE} = \\frac{BC}{EF}$ thì hai tam giác này có đồng dạng không?', a: 'Có', s: 'Theo trường hợp đồng dạng của tam giác vuông (cạnh huyền - cạnh góc vuông).', d: 'thong_hieu', o: ['Có', 'Không', 'Chưa đủ điều kiện', 'Chỉ đồng dạng nếu $\\frac{AB}{DE} = 1$'] },
        { q: 'T8-C9B36-005', c: 'Một cột cờ thẳng đứng cao $h$ có bóng trên mặt đất dài $6$m. Cùng lúc đó, một cái cọc cao $2$m có bóng dài $1,5$m. Chiều cao $h$ của cột cờ là:', a: '$8$m', s: 'Dùng tam giác đồng dạng: $\\frac{h}{2} = \\frac{6}{1,5} \\Rightarrow h = 8$m.', d: 'van_dung', o: ['$4$m', '$6$m', '$8$m', '$12$m'] }
      ]
    },
    {
      name: 'Bài 37. Hình đồng dạng.',
      questions: [
        { q: 'T8-C9B37-001', c: 'Hai hình được gọi là đồng dạng với nhau nếu:', a: 'Hình này bằng một hình đồng dạng phối cảnh với hình kia', s: 'Khái niệm mở rộng về hai hình đồng dạng.', d: 'nhan_biet', o: ['Chúng có cùng diện tích', 'Chúng có cùng chu vi', 'Hình này bằng một hình đồng dạng phối cảnh với hình kia', 'Chúng là hai đa giác đều'] },
        { q: 'T8-C9B37-002', c: 'Phép vị tự tỉ số $k$ biến đoạn thẳng $AB$ thành đoạn thẳng $A\'B\'$. Hệ thức nào ĐÚNG?', a: '$A\'B\' = |k| \\cdot AB$', s: 'Độ dài đoạn thẳng biến đổi qua phép vị tự bằng trị tuyệt đối của tỉ số $k$ nhân với độ dài ban đầu.', d: 'nhan_biet', o: ['$A\'B\' = k \\cdot AB$', '$A\'B\' = |k| \\cdot AB$', '$A\'B\' = \\frac{AB}{|k|}$', '$A\'B\' = AB + k$'] },
        { q: 'T8-C9B37-003', c: 'Hai đường tròn bất kì có đồng dạng với nhau không?', a: 'Có', s: 'Hai đường tròn bất kì luôn đồng dạng với nhau với tỉ số $R\'/R$.', d: 'thong_hieu', o: ['Có', 'Không', 'Chỉ khi cùng bán kính', 'Chỉ khi cùng tâm'] },
        { q: 'T8-C9B37-004', c: 'Hình chữ nhật có kích thước $2$cm $\\times$ $3$cm đồng dạng với hình chữ nhật nào sau đây?', a: 'Kích thước $4$cm $\\times$ $6$cm', s: 'Tỉ số $2/4 = 3/6 = 1/2$. Các cạnh tỉ lệ.', d: 'thong_hieu', o: ['Kích thước $3$cm $\\times$ $4$cm', 'Kích thước $4$cm $\\times$ $6$cm', 'Kích thước $2$cm $\\times$ $5$cm', 'Kích thước $1$cm $\\times$ $3$cm'] },
        { q: 'T8-C9B37-005', c: 'Diện tích của hai đa giác đồng dạng tỉ lệ với:', a: 'Bình phương tỉ số đồng dạng', s: 'Tỉ số diện tích bằng bình phương tỉ số đồng dạng.', d: 'van_dung', o: ['Tỉ số đồng dạng', 'Bình phương tỉ số đồng dạng', 'Lập phương tỉ số đồng dạng', 'Chu vi của chúng'] }
      ]
    },
    {
      name: 'Bài tập cuối chương IX.',
      questions: [
        { q: 'T8-C9OT-001', c: 'Cho $\\Delta ABC \\sim \\Delta DEF$. Khẳng định nào sau đây là SAI?', a: '$\\widehat{A} = \\widehat{E}$', s: 'Đúng là $\\widehat{A} = \\widehat{D}$, $\\widehat{B} = \\widehat{E}$. Do đó $\\widehat{A} = \\widehat{E}$ là sai.', d: 'nhan_biet', o: ['$\\frac{AB}{DE} = \\frac{BC}{EF}$', '$\\widehat{A} = \\widehat{E}$', '$\\widehat{C} = \\widehat{F}$', '$\\frac{AC}{DF} = \\frac{AB}{DE}$'] },
        { q: 'T8-C9OT-002', c: 'Cho $\\Delta ABC \\sim \\Delta A\'B\'C\'$ theo tỉ số đồng dạng $\\frac{1}{3}$. Biết $AB = 2$cm. Cạnh $A\'B\'$ bằng:', a: '$6$cm', s: '$\\frac{AB}{A\'B\'} = \\frac{1}{3} \\Rightarrow A\'B\' = 3 \\cdot AB = 6$cm.', d: 'thong_hieu', o: ['$\\frac{2}{3}$cm', '$6$cm', '$5$cm', '$\\frac{3}{2}$cm'] },
        { q: 'T8-C9OT-003', c: 'Một tam giác có ba cạnh $6$cm, $8$cm, $10$cm. Diện tích tam giác đó là:', a: '$24$cm$^2$', s: 'Tam giác vuông vì $6^2+8^2=10^2$. Diện tích $= \\frac{1}{2} \\cdot 6 \\cdot 8 = 24$.', d: 'thong_hieu', o: ['$48$cm$^2$', '$24$cm$^2$', '$20$cm$^2$', '$40$cm$^2$'] },
        { q: 'T8-C9OT-004', c: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$. Khẳng định nào sau đây là đúng?', a: '$\\Delta HBA \\sim \\Delta ABC$', s: 'Do có góc $B$ chung và $\\widehat{AHB} = \\widehat{CAB} = 90^\\circ$.', d: 'thong_hieu', o: ['$\\Delta HAB \\sim \\Delta HAC$', '$\\Delta HBA \\sim \\Delta ABC$', '$\\Delta HCA \\sim \\Delta ABC$', 'Cả ba tam giác đó đều bằng nhau'] },
        { q: 'T8-C9OT-005', c: 'Bóng của một cái tháp trên mặt đất dài $20$m. Cùng lúc đó, tia nắng tạo với mặt đất một góc $45^\\circ$. Chiều cao của tháp là:', a: '$20$m', s: 'Tam giác tạo bởi tháp, bóng tháp và tia nắng là tam giác vuông cân tại đỉnh góc vuông. Chiều cao = chiều dài bóng = 20m.', d: 'van_dung', o: ['$10$m', '$20$m', '$40$m', '$20\\sqrt{2}$m'] }
      ]
    },
    {
      name: 'Bài 38. Hình chóp tam giác đều.',
      questions: [
        { q: 'T8-C10B38-001', c: 'Hình chóp tam giác đều có mặt đáy là hình gì?', a: 'Tam giác đều', s: 'Tên "chóp tam giác đều" chỉ ra đáy là tam giác đều.', d: 'nhan_biet', o: ['Hình vuông', 'Hình chữ nhật', 'Tam giác vuông', 'Tam giác đều'] },
        { q: 'T8-C10B38-002', c: 'Các mặt bên của hình chóp tam giác đều là những hình gì?', a: 'Các tam giác cân bằng nhau', s: 'Tính chất hình chóp đều.', d: 'nhan_biet', o: ['Các tam giác vuông', 'Các tam giác cân bằng nhau', 'Các hình chữ nhật', 'Các tam giác nhọn bất kì'] },
        { q: 'T8-C10B38-003', c: 'Hình chóp tam giác đều có tất cả bao nhiêu mặt?', a: '$4$ mặt', s: 'Gồm $1$ mặt đáy và $3$ mặt bên, tổng cộng $4$ mặt.', d: 'thong_hieu', o: ['$3$ mặt', '$4$ mặt', '$5$ mặt', '$6$ mặt'] },
        { q: 'T8-C10B38-004', c: 'Diện tích xung quanh của hình chóp tam giác đều bằng:', a: 'Nửa chu vi đáy nhân với trung đoạn', s: 'Công thức $S_{xq} = p \\cdot d$.', d: 'thong_hieu', o: ['Chu vi đáy nhân với chiều cao', 'Nửa chu vi đáy nhân với trung đoạn', 'Diện tích đáy nhân với chiều cao', 'Diện tích $1$ mặt bên nhân $4$'] },
        { q: 'T8-C10B38-005', c: 'Một hình chóp tam giác đều có chu vi đáy là $12$cm, trung đoạn là $5$cm. Diện tích xung quanh của hình chóp là:', a: '$30$cm$^2$', s: '$S_{xq} = \\frac{1}{2} \\cdot 12 \\cdot 5 = 30$cm$^2$.', d: 'van_dung', o: ['$60$cm$^2$', '$30$cm$^2$', '$17$cm$^2$', '$120$cm$^2$'] }
      ]
    },
    {
      name: 'Bài 39. Hình chóp tứ giác đều.',
      questions: [
        { q: 'T8-C10B39-001', c: 'Hình chóp tứ giác đều có mặt đáy là hình gì?', a: 'Hình vuông', s: 'Đáy của chóp tứ giác đều là đa giác đều $4$ cạnh, tức là hình vuông.', d: 'nhan_biet', o: ['Hình chữ nhật', 'Hình bình hành', 'Hình thoi', 'Hình vuông'] },
        { q: 'T8-C10B39-002', c: 'Hình chóp tứ giác đều có tất cả bao nhiêu đỉnh?', a: '$5$ đỉnh', s: 'Gồm $4$ đỉnh ở đáy và $1$ đỉnh chóp.', d: 'nhan_biet', o: ['$4$ đỉnh', '$5$ đỉnh', '$6$ đỉnh', '$8$ đỉnh'] },
        { q: 'T8-C10B39-003', c: 'Thể tích của hình chóp tứ giác đều được tính bằng công thức nào?', a: '$V = \\frac{1}{3} S_{day} \\cdot h$', s: 'Thể tích chóp = $1/3$ diện tích đáy nhân chiều cao.', d: 'thong_hieu', o: ['$V = S_{day} \\cdot h$', '$V = \\frac{1}{3} S_{day} \\cdot h$', '$V = \\frac{1}{2} S_{day} \\cdot h$', '$V = 3 S_{day} \\cdot h$'] },
        { q: 'T8-C10B39-004', c: 'Diện tích xung quanh của hình chóp tứ giác đều có cạnh đáy $a$, trung đoạn $d$ là:', a: '$2ad$', s: '$S_{xq} = \\frac{1}{2} (4a) d = 2ad$.', d: 'thong_hieu', o: ['$4ad$', '$ad$', '$2ad$', '$\\frac{1}{2} ad$'] },
        { q: 'T8-C10B39-005', c: 'Hình chóp tứ giác đều có đáy là hình vuông cạnh $3$cm, chiều cao $4$cm. Thể tích của hình chóp là:', a: '$12$cm$^3$', s: '$V = \\frac{1}{3} \\cdot 3^2 \\cdot 4 = 12$cm$^3$.', d: 'van_dung', o: ['$36$cm$^3$', '$12$cm$^3$', '$16$cm$^3$', '$9$cm$^3$'] }
      ]
    },
    {
      name: 'Bài tập cuối chương X.',
      questions: [
        { q: 'T8-C10OT-001', c: 'Trung đoạn của hình chóp đều là đoạn thẳng nào sau đây?', a: 'Đường cao kẻ từ đỉnh xuống cạnh đáy của mặt bên', s: 'Định nghĩa trung đoạn.', d: 'nhan_biet', o: ['Đường cao của hình chóp', 'Cạnh bên của hình chóp', 'Đường cao kẻ từ đỉnh xuống cạnh đáy của mặt bên', 'Đường chéo của đáy'] },
        { q: 'T8-C10OT-002', c: 'Hình chóp tam giác đều có bao nhiêu cạnh?', a: '$6$ cạnh', s: '$3$ cạnh đáy và $3$ cạnh bên.', d: 'thong_hieu', o: ['$4$ cạnh', '$5$ cạnh', '$6$ cạnh', '$8$ cạnh'] },
        { q: 'T8-C10OT-003', c: 'Hình chóp tứ giác đều có bao nhiêu mặt?', a: '$5$ mặt', s: '$1$ đáy và $4$ mặt bên.', d: 'thong_hieu', o: ['$4$ mặt', '$5$ mặt', '$6$ mặt', '$8$ mặt'] },
        { q: 'T8-C10OT-004', c: 'Nếu tăng cạnh đáy của một hình chóp tứ giác đều lên $2$ lần và giữ nguyên chiều cao thì thể tích của nó tăng lên mấy lần?', a: '$4$ lần', s: 'Đáy là hình vuông, diện tích tỉ lệ thuận với bình phương cạnh đáy. $2^2 = 4$.', d: 'thong_hieu', o: ['$2$ lần', '$4$ lần', '$8$ lần', 'Không đổi'] },
        { q: 'T8-C10OT-005', c: 'Một hình chóp tứ giác đều có thể tích $100$cm$^3$, chiều cao $12$cm. Độ dài cạnh đáy của hình chóp bằng:', a: '$5$cm', s: '$\\frac{1}{3} a^2 \\cdot 12 = 100 \\Rightarrow 4a^2 = 100 \\Rightarrow a^2 = 25 \\Rightarrow a=5$.', d: 'van_dung', o: ['$5$cm', '$10$cm', '$25$cm', '$4$cm'] }
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
  
  console.log('\n✅ Hoàn thành Batch 5 Lớp 8');
}

insertGrade8Batch5().catch(console.error);
