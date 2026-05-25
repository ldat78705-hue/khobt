const { neon } = require('@neondatabase/serverless');
const crypto = require('crypto');
const fs = require('fs');

const lines = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/);
let u = '';
for (const l of lines) {
  if (l.startsWith('DATABASE_URL=')) {
    let v = l.substring(13).trim();
    if (v[0] === '"') v = v.slice(1, -1);
    u = v;
  }
}
const sql = neon(u);

async function main() {
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  const addMCQ = (catId, content, optionA, optionB, optionC, optionD, correctKey, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G6-BATCH3-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
      content,
      options: [
        { key: 'A', value: optionA },
        { key: 'B', value: optionB },
        { key: 'C', value: optionC },
        { key: 'D', value: optionD }
      ],
      correct_answer: correctKey,
      solution,
      type: 'trac_nghiem'
    });
  };

  const addTF = (catId, content, isTrue, solution, topic) => {
    allQS.push({
      cat: catId,
      code: `G6-BATCH3TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 6, topic,
      content,
      options: [
        { key: 'Đúng', value: 'Khẳng định trên là Đúng.' },
        { key: 'Sai', value: 'Khẳng định trên là Sai.' }
      ],
      correct_answer: isTrue ? 'Đúng' : 'Sai',
      solution,
      type: 'dung_sai'
    });
  };

  // Bài 21. Hình có trục đối xứng
  const c21 = 'c7bfe0a1-9a55-4666-91da-1fa4238290a4';

  addMCQ(c21, 'Đường thẳng $d$ được gọi là trục đối xứng của hình $H$ nếu:', 'Khi gấp hình $H$ theo đường thẳng $d$ thì hai nửa của hình trùng khít vào nhau.', 'Đường thẳng $d$ chia hình $H$ thành hai phần bằng nhau.', 'Đường thẳng $d$ đi qua tâm của hình $H$.', 'Khi quay hình $H$ quanh đường thẳng $d$, ta được hình $H$.', 'A', 'Theo định nghĩa, nếu gấp một hình theo đường thẳng $d$ mà hai nửa của nó chồng khít lên nhau thì $d$ được gọi là trục đối xứng của hình đó.', 'hinh_hoc');
  addMCQ(c21, 'Hình nào sau đây KHÔNG CÓ trục đối xứng?', 'Hình vuông', 'Hình bình hành', 'Hình chữ nhật', 'Hình thoi', 'B', 'Hình bình hành (không phải là hình chữ nhật hay hình thoi) khi gấp theo bất kỳ đường thẳng nào cũng không tạo ra hai nửa chồng khít lên nhau. Do đó nó không có trục đối xứng.', 'hinh_hoc');
  addMCQ(c21, 'Hình thang cân có bao nhiêu trục đối xứng?', '1 trục', '2 trục', '3 trục', 'Không có', 'A', 'Hình thang cân có duy nhất 1 trục đối xứng, đó là đường thẳng đi qua trung điểm của hai đáy.', 'hinh_hoc');
  addMCQ(c21, 'Hình tam giác đều có bao nhiêu trục đối xứng?', '1 trục', '2 trục', '3 trục', 'Vô số trục', 'C', 'Hình tam giác đều có 3 trục đối xứng, đó chính là 3 đường trung trực (cũng là 3 đường cao, phân giác, trung tuyến) của tam giác.', 'hinh_hoc');
  addMCQ(c21, 'Hình chữ nhật có bao nhiêu trục đối xứng?', '1 trục', '2 trục', '4 trục', 'Vô số trục', 'B', 'Hình chữ nhật có 2 trục đối xứng, đó là hai đường thẳng đi qua trung điểm của các cặp cạnh đối diện.', 'hinh_hoc');
  addMCQ(c21, 'Hình vuông có bao nhiêu trục đối xứng?', '2 trục', '4 trục', '8 trục', 'Vô số trục', 'B', 'Hình vuông có 4 trục đối xứng: 2 đường chéo và 2 đường thẳng đi qua trung điểm các cặp cạnh đối.', 'hinh_hoc');
  addMCQ(c21, 'Đường tròn có bao nhiêu trục đối xứng?', '1 trục', '2 trục', '4 trục', 'Vô số trục', 'D', 'Mọi đường thẳng đi qua tâm của đường tròn đều là trục đối xứng của nó, nên đường tròn có vô số trục đối xứng.', 'hinh_hoc');
  addMCQ(c21, 'Trong các biển báo giao thông sau, biển báo nào có trục đối xứng?', 'Biển cấm đi ngược chiều (hình tròn đỏ, gạch ngang trắng)', 'Biển báo nguy hiểm chỗ ngoặt', 'Biển báo đường ưu tiên', 'Biển báo cấm rẽ phải', 'A', 'Biển cấm đi ngược chiều (hình tròn có một dải ngang ở giữa) có trục đối xứng dọc và ngang.', 'hinh_hoc');
  addMCQ(c21, 'Chữ cái in hoa nào sau đây có trục đối xứng dọc?', 'Chữ $N$', 'Chữ $S$', 'Chữ $M$', 'Chữ $P$', 'C', 'Chữ $M$ khi gấp đôi theo chiều dọc thì hai nửa hoàn toàn trùng khít lên nhau.', 'hinh_hoc');
  addMCQ(c21, 'Chữ cái in hoa nào sau đây có trục đối xứng ngang?', 'Chữ $E$', 'Chữ $A$', 'Chữ $T$', 'Chữ $L$', 'A', 'Chữ $E$ khi gấp đôi theo chiều ngang thì nửa trên và nửa dưới chồng khít lên nhau.', 'hinh_hoc');

  addTF(c21, 'Một hình có thể có nhiều hơn 1 trục đối xứng.', true, 'Đúng. Ví dụ hình vuông có 4 trục, hình tròn có vô số trục đối xứng.', 'hinh_hoc');
  addTF(c21, 'Đường chéo của hình chữ nhật là trục đối xứng của hình chữ nhật đó.', false, 'Sai. Gấp hình chữ nhật theo đường chéo thì hai nửa hình KHÔNG chồng khít lên nhau (chỉ trừ trường hợp nó là hình vuông).', 'hinh_hoc');
  addTF(c21, 'Đường chéo của hình thoi là trục đối xứng của hình thoi đó.', true, 'Đúng. Hai đường chéo của hình thoi vuông góc với nhau và là hai trục đối xứng của nó.', 'hinh_hoc');
  addTF(c21, 'Chữ cái $O$ có vô số trục đối xứng.', true, 'Đúng. Nếu coi chữ $O$ in hoa có dạng là một hình tròn thì nó có vô số trục đối xứng (những đường đi qua tâm).', 'hinh_hoc');
  addTF(c21, 'Đường trung trực của một đoạn thẳng là trục đối xứng của đoạn thẳng đó.', true, 'Đúng. Khi gấp theo đường trung trực, hai đầu mút của đoạn thẳng sẽ trùng khít lên nhau.', 'hinh_hoc');


  // Bài 22. Hình có tâm đối xứng
  const c22 = '2a3c4ae3-2153-40c3-9cb8-47b4395f4991';

  addMCQ(c22, 'Điểm $O$ được gọi là tâm đối xứng của hình $H$ nếu:', 'Quay hình $H$ quanh điểm $O$ một góc $180^\\circ$ thì hình $H$ trùng khít với chính nó ban đầu.', 'Gấp hình $H$ qua điểm $O$ thì hai nửa chồng khít lên nhau.', 'Điểm $O$ nằm ở giữa hình $H$.', 'Đường thẳng đi qua $O$ chia hình $H$ thành 2 nửa bằng nhau.', 'A', 'Theo định nghĩa, nếu quay một hình nửa vòng ($180^\\circ$) quanh điểm $O$ mà hình thu được chồng khít với hình ban đầu thì $O$ là tâm đối xứng.', 'hinh_hoc');
  addMCQ(c22, 'Hình nào sau đây KHÔNG CÓ tâm đối xứng?', 'Hình bình hành', 'Hình thoi', 'Hình tam giác đều', 'Hình lục giác đều', 'C', 'Hình tam giác đều khi quay $180^\\circ$ quanh trọng tâm của nó sẽ ra một hình tam giác có đỉnh lộn ngược xuống dưới, không trùng khít với hình ban đầu. Nó chỉ có trục đối xứng, không có tâm đối xứng.', 'hinh_hoc');
  addMCQ(c22, 'Tâm đối xứng của hình bình hành là điểm nào?', 'Giao điểm của hai đường chéo.', 'Trung điểm của một cạnh.', 'Một đỉnh của hình bình hành.', 'Hình bình hành không có tâm đối xứng.', 'A', 'Tâm đối xứng của hình bình hành (cũng như hình thoi, hình chữ nhật, hình vuông) chính là giao điểm của hai đường chéo.', 'hinh_hoc');
  addMCQ(c22, 'Hình vuông có tâm đối xứng không?', 'Không có', 'Có, là trung điểm của cạnh', 'Có, là giao điểm của hai đường chéo', 'Có, là giao điểm của hai trục đối xứng', 'C', 'Hình vuông vừa có 4 trục đối xứng, vừa có tâm đối xứng. Tâm đối xứng chính là giao điểm của hai đường chéo.', 'hinh_hoc');
  addMCQ(c22, 'Tâm đối xứng của một đường tròn là:', 'Một điểm bất kỳ trên đường tròn.', 'Không có.', 'Tâm của đường tròn.', 'Giao điểm của đường tròn và đường kính.', 'C', 'Khi quay đường tròn $180^\\circ$ quanh tâm của nó, đường tròn vẫn hoàn toàn giữ nguyên vị trí, do đó tâm đường tròn cũng là tâm đối xứng.', 'hinh_hoc');
  addMCQ(c22, 'Chữ cái in hoa nào sau đây có tâm đối xứng?', 'Chữ $A$', 'Chữ $N$', 'Chữ $M$', 'Chữ $T$', 'B', 'Chữ $N$ khi xoay ngược (quay $180^\\circ$) vẫn là chữ $N$. Do đó nó có tâm đối xứng.', 'hinh_hoc');
  addMCQ(c22, 'Chữ cái in hoa nào sau đây VỪA có trục đối xứng, VỪA có tâm đối xứng?', 'Chữ $S$', 'Chữ $X$', 'Chữ $A$', 'Chữ $K$', 'B', 'Chữ $X$ có 2 trục đối xứng dọc và ngang, đồng thời khi xoay ngược $180^\\circ$ vẫn là chữ $X$ (có tâm đối xứng là điểm giao cắt ở giữa).', 'hinh_hoc');
  addMCQ(c22, 'Hình lục giác đều có tâm đối xứng không?', 'Có, là giao điểm của các đường chéo chính.', 'Có, là trung điểm của một cạnh.', 'Không có.', 'Có vô số tâm đối xứng.', 'A', 'Lục giác đều có tâm đối xứng chính là giao điểm của 3 đường chéo chính.', 'hinh_hoc');
  addMCQ(c22, 'Đoạn thẳng có tâm đối xứng không?', 'Không có.', 'Có, là trung điểm của đoạn thẳng đó.', 'Có, là một đầu mút của đoạn thẳng.', 'Có, là bất kỳ điểm nào trên đoạn thẳng.', 'B', 'Khi quay một đoạn thẳng $180^\\circ$ quanh trung điểm của nó, hai đầu mút sẽ đổi chỗ cho nhau và đoạn thẳng trùng khít với chính nó.', 'hinh_hoc');
  addMCQ(c22, 'Khẳng định nào sau đây là ĐÚNG?', 'Mọi hình có trục đối xứng thì luôn có tâm đối xứng.', 'Mọi hình có tâm đối xứng thì luôn có trục đối xứng.', 'Có những hình vừa có tâm đối xứng vừa có trục đối xứng.', 'Đường tròn chỉ có tâm đối xứng, không có trục đối xứng.', 'C', 'Có rất nhiều hình vừa có tâm đối xứng vừa có trục đối xứng, ví dụ: hình vuông, hình chữ nhật, hình tròn, chữ H, chữ X...', 'hinh_hoc');

  addTF(c22, 'Một hình có thể có nhiều hơn một tâm đối xứng.', false, 'Sai. Trong hình học phẳng sơ cấp, một hình hữu hạn giới hạn trong một khu vực (như đa giác, hình tròn, chữ cái) nếu có tâm đối xứng thì chỉ có DUY NHẤT một tâm đối xứng.', 'hinh_hoc');
  addTF(c22, 'Chữ $Z$ in hoa có tâm đối xứng.', true, 'Đúng. Khi xoay ngược chữ $Z$ một góc $180^\\circ$, ta vẫn thu được chữ $Z$ y hệt ban đầu.', 'hinh_hoc');
  addTF(c22, 'Chữ $Z$ in hoa có trục đối xứng.', false, 'Sai. Gấp chữ $Z$ theo bất cứ đường thẳng nào (dọc, ngang, chéo) thì 2 nửa của nó cũng không chồng khít lên nhau.', 'hinh_hoc');
  addTF(c22, 'Hình thoi vừa có trục đối xứng, vừa có tâm đối xứng.', true, 'Đúng. Hai đường chéo là hai trục đối xứng. Giao điểm của hai đường chéo là tâm đối xứng.', 'hinh_hoc');
  addTF(c22, 'Một chiếc chong chóng 3 cánh (xoay $120^\\circ$ thì trùng khít) có tâm đối xứng.', false, 'Sai. Để có tâm đối xứng, hình phải xoay đúng $180^\\circ$ (nửa vòng) trùng khít. Chong chóng 3 cánh xoay $180^\\circ$ sẽ bị lộn ngược, không trùng khít.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G6 BATCH 3...`);

  let count = 0;
  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, options, correct_answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${JSON.stringify(q.options)}::jsonb, ${q.correct_answer}, ${q.solution}, 'thong_hieu', ${q.grade}, ${q.topic}, ${q.type}, ${user_id}, 'approved', true)
    `;
    count++;
  }

  console.log(`Thành công! Đã nạp ${count} câu hỏi chất lượng cao.`);
}

main().catch(console.error);
