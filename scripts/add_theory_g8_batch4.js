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
      code: `G8-BATCH4-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
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
      code: `G8-BATCH4TF-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      grade: 8, topic,
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

  // Bài 15. Định lí Thalès trong tam giác
  const c15 = 'b13e67c9-7224-47f3-b473-913eb1cfe1a6';

  addMCQ(c15, 'Tỉ số của hai đoạn thẳng là:', 'Tỉ số độ dài của chúng theo cùng một đơn vị đo.', 'Hiệu độ dài của chúng theo cùng một đơn vị đo.', 'Tích độ dài của chúng.', 'Thương của hai đoạn thẳng bất kỳ.', 'A', 'Tỉ số của hai đoạn thẳng là tỉ số độ dài của chúng theo cùng một đơn vị đo.', 'hinh_hoc');
  addMCQ(c15, 'Nếu đoạn thẳng $AB = 3\\text{ cm}$ và đoạn thẳng $CD = 5\\text{ cm}$ thì tỉ số $\\dfrac{AB}{CD}$ bằng:', '$\\dfrac{5}{3}$', '$\\dfrac{3}{5}$', '$3\\text{ cm}$', '$15$', 'B', 'Tỉ số của hai đoạn thẳng là $\\dfrac{AB}{CD} = \\dfrac{3}{5}$.', 'hinh_hoc');
  addMCQ(c15, 'Hai đoạn thẳng $AB$ và $CD$ được gọi là tỉ lệ với hai đoạn thẳng $A\'B\'$ và $C\'D\'$ nếu có tỉ lệ thức:', '$\\dfrac{AB}{CD} = \\dfrac{A\'B\'}{C\'D\'}$', '$\\dfrac{AB}{A\'B\'} = \\dfrac{CD}{C\'D\'}$', 'Cả hai đáp án đều đúng.', 'Cả hai đáp án đều sai.', 'C', 'Theo định nghĩa, hai đoạn thẳng $AB$ và $CD$ tỉ lệ với $A\'B\'$ và $C\'D\'$ nếu $\\dfrac{AB}{A\'B\'} = \\dfrac{CD}{C\'D\'}$ hoặc $\\dfrac{AB}{CD} = \\dfrac{A\'B\'}{C\'D\'}$.', 'hinh_hoc');
  addMCQ(c15, 'Định lí Thalès trong tam giác phát biểu rằng:', 'Nếu một đường thẳng cắt hai cạnh của một tam giác và song song với cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.', 'Nếu một đường thẳng cắt hai cạnh của một tam giác thì nó song song với cạnh còn lại.', 'Đường trung bình của tam giác thì song song với cạnh đáy và bằng nửa cạnh đáy.', 'Trong một tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.', 'A', 'Nội dung định lí Thalès: Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.', 'hinh_hoc');
  addMCQ(c15, 'Cho $\\Delta ABC$, đường thẳng $d \\parallel BC$, $d$ cắt $AB$ tại $D$ và $AC$ tại $E$. Tỉ lệ thức nào sau đây là SAI?', '$\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$', '$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$', '$\\dfrac{DB}{AB} = \\dfrac{EC}{AC}$', '$\\dfrac{AD}{AB} = \\dfrac{EC}{AC}$', 'D', 'Theo định lí Thalès, các đoạn thẳng phải TƯƠNG ỨNG tỉ lệ. Đoạn $AD$ (nửa trên) tương ứng với $AE$ (nửa trên), $AB$ (toàn phần) tương ứng với $AC$ (toàn phần). Tỉ lệ thức D ghép sai các phần tương ứng.', 'hinh_hoc');
  addMCQ(c15, 'Định lí Thalès đảo được sử dụng để chứng minh điều gì?', 'Chứng minh hai đoạn thẳng bằng nhau.', 'Chứng minh hai tam giác đồng dạng.', 'Chứng minh hai đường thẳng song song.', 'Chứng minh một điểm là trung điểm.', 'C', 'Định lí Thalès đảo: Nếu một đường thẳng cắt hai cạnh của một tam giác và định ra trên hai cạnh này những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó SONG SONG với cạnh còn lại.', 'hinh_hoc');
  addMCQ(c15, 'Hệ quả của định lí Thalès khẳng định rằng: Nếu đường thẳng $d \\parallel BC$ cắt $AB$ và $AC$ tại $D$ và $E$ thì tam giác $ADE$ có 3 cạnh tương ứng tỉ lệ với 3 cạnh của tam giác nào?', 'Tam giác $DBE$', 'Tam giác $EDC$', 'Tam giác $ABC$', 'Tam giác $BDE$', 'C', 'Hệ quả định lí Thalès: Đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó tạo thành một tam giác mới có ba cạnh tương ứng tỉ lệ với ba cạnh của tam giác đã cho ($ABC$).', 'hinh_hoc');
  addMCQ(c15, 'Cho $\\Delta ABC$ có $AB=6\\text{ cm}, AC=9\\text{ cm}$. Trên $AB, AC$ lấy $D, E$ sao cho $AD=2\\text{ cm}, AE=3\\text{ cm}$. Khẳng định nào sau đây đúng?', '$DE \\perp BC$', '$DE \\parallel BC$', '$DE$ cắt $BC$', '$D$ là trung điểm $AB$', 'B', 'Ta xét tỉ số $\\dfrac{AD}{AB} = \\dfrac{2}{6} = \\dfrac{1}{3}$ và $\\dfrac{AE}{AC} = \\dfrac{3}{9} = \\dfrac{1}{3}$. Vì $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$, theo định lí Thalès đảo, ta có $DE \\parallel BC$.', 'hinh_hoc');
  addMCQ(c15, 'Đường trung bình của tam giác là trường hợp đặc biệt của định lí Thalès khi tỉ số tỉ lệ bằng bao nhiêu?', '$\\dfrac{1}{3}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$', '$1$', 'C', 'Khi đường thẳng đi qua trung điểm của một cạnh và song song với cạnh thứ hai (đường trung bình), tỉ số tương ứng định ra trên các cạnh là $1:2$ (hoặc $1:1$ đối với các đoạn nhỏ).', 'hinh_hoc');
  addMCQ(c15, 'Cho đoạn thẳng $AB = 10\\text{ dm}$ và $CD = 2\\text{ m}$. Tỉ số $\\dfrac{AB}{CD}$ bằng bao nhiêu?', '$5$', '$\\dfrac{1}{2}$', '$\\dfrac{10}{2}$', '$\\dfrac{1}{20}$', 'B', 'Phải đưa về CÙNG một đơn vị đo. $2\\text{ m} = 20\\text{ dm}$. Vậy tỉ số là $\\dfrac{10}{20} = \\dfrac{1}{2}$.', 'hinh_hoc');

  addTF(c15, 'Tỉ số của hai đoạn thẳng phụ thuộc vào đơn vị đo được chọn.', false, 'Sai. Tỉ số của hai đoạn thẳng KHÔNG phụ thuộc vào đơn vị đo, miễn là hai đoạn thẳng đó được đo bằng CÙNG một đơn vị.', 'hinh_hoc');
  addTF(c15, 'Nếu $\\dfrac{AB}{CD} = \\dfrac{A\'B\'}{C\'D\'}$ thì $AB \\cdot C\'D\' = CD \\cdot A\'B\'$.', true, 'Đúng. Đây là tính chất cơ bản của tỉ lệ thức (nhân chéo).', 'hinh_hoc');
  addTF(c15, 'Hệ quả của định lí Thalès vẫn đúng ngay cả khi đường thẳng song song cắt phần kéo dài của hai cạnh tam giác.', true, 'Đúng. Chú ý trong SGK có nêu: Hệ quả định lí Thalès vẫn đúng cho trường hợp đường thẳng song song với một cạnh và cắt PHẦN KÉO DÀI của hai cạnh còn lại.', 'hinh_hoc');
  addTF(c15, 'Mọi đường thẳng cắt hai cạnh của tam giác đều tạo ra các đoạn thẳng tỉ lệ.', false, 'Sai. Chỉ khi đường thẳng đó SONG SONG với cạnh thứ ba thì nó mới định ra trên hai cạnh kia các đoạn thẳng tương ứng tỉ lệ (theo định lí Thalès).', 'hinh_hoc');
  addTF(c15, 'Theo hệ quả Thalès, tỉ số $\\dfrac{AD}{AB}$ không những bằng $\\dfrac{AE}{AC}$ mà còn bằng $\\dfrac{DE}{BC}$.', true, 'Đúng. Hệ quả Thalès khẳng định 3 cạnh của tam giác mới tương ứng tỉ lệ với 3 cạnh của tam giác ban đầu.', 'hinh_hoc');


  // Bài 33. Hai tam giác đồng dạng
  const c33 = '5de34a26-19d4-4f96-89ab-705cd64af7d2';

  addMCQ(c33, 'Hai tam giác được gọi là đồng dạng với nhau nếu:', 'Chúng có các cạnh tương ứng bằng nhau và các góc tương ứng tỉ lệ.', 'Chúng có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.', 'Chúng có cùng diện tích.', 'Chúng có cùng chu vi.', 'B', 'Định nghĩa: Hai tam giác đồng dạng là hai tam giác có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.', 'hinh_hoc');
  addMCQ(c33, 'Kí hiệu hai tam giác $ABC$ và $A\'B\'C\'$ đồng dạng được viết là:', '$\\Delta ABC = \\Delta A\'B\'C\'$', '$\\Delta ABC \\parallel \\Delta A\'B\'C\'$', '$\\Delta ABC \\sim \\Delta A\'B\'C\'$', '$\\Delta ABC \\cong \\Delta A\'B\'C\'$', 'C', 'Kí hiệu $\\sim$ được dùng để chỉ sự đồng dạng của hai tam giác.', 'hinh_hoc');
  addMCQ(c33, 'Nếu $\\Delta A\'B\'C\' \\sim \\Delta ABC$ với tỉ số đồng dạng $k$ thì $\\Delta ABC \\sim \\Delta A\'B\'C\'$ với tỉ số đồng dạng là:', '$k$', '$-k$', '$\\dfrac{1}{k}$', '$1 - k$', 'C', 'Nếu tam giác thứ nhất đồng dạng với tam giác thứ hai theo tỉ số $k$, thì tam giác thứ hai đồng dạng với tam giác thứ nhất theo tỉ số nghịch đảo $\\dfrac{1}{k}$.', 'hinh_hoc');
  addMCQ(c33, 'Khẳng định nào sau đây là SAI về tính chất của hai tam giác đồng dạng?', 'Mỗi tam giác đồng dạng với chính nó.', 'Nếu $\\Delta 1 \\sim \\Delta 2$ thì $\\Delta 2 \\sim \\Delta 1$.', 'Nếu $\\Delta 1 \\sim \\Delta 2$ và $\\Delta 2 \\sim \\Delta 3$ thì $\\Delta 1 \\sim \\Delta 3$.', 'Hai tam giác đồng dạng thì bằng nhau.', 'D', 'Hai tam giác bằng nhau thì chắc chắn đồng dạng (tỉ số $k=1$), nhưng hai tam giác đồng dạng thì CHƯA CHẮC bằng nhau (chúng có thể là bản thu nhỏ/phóng to của nhau).', 'hinh_hoc');
  addMCQ(c33, 'Tỉ số chu vi của hai tam giác đồng dạng bằng:', 'Tỉ số đồng dạng $k$.', 'Bình phương tỉ số đồng dạng $k^2$.', 'Lập phương tỉ số đồng dạng $k^3$.', 'Căn bậc hai của tỉ số đồng dạng.', 'A', 'Định lí: Tỉ số chu vi của hai tam giác đồng dạng bằng đúng tỉ số đồng dạng $k$.', 'hinh_hoc');
  addMCQ(c33, 'Tỉ số diện tích của hai tam giác đồng dạng bằng:', 'Tỉ số đồng dạng $k$.', 'Bình phương tỉ số đồng dạng $k^2$.', 'Lập phương tỉ số đồng dạng $k^3$.', 'Hai lần tỉ số đồng dạng $2k$.', 'B', 'Định lí: Tỉ số diện tích của hai tam giác đồng dạng bằng BÌNH PHƯƠNG tỉ số đồng dạng ($k^2$).', 'hinh_hoc');
  addMCQ(c33, 'Định lí cơ bản về hai tam giác đồng dạng phát biểu rằng: Một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại sẽ tạo thành một tam giác mới...', 'bằng tam giác đã cho.', 'đồng dạng với tam giác đã cho.', 'có diện tích bằng nửa tam giác đã cho.', 'là tam giác cân.', 'B', 'Định lí: Một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại thì tạo thành một tam giác mới ĐỒNG DẠNG với tam giác đã cho.', 'hinh_hoc');
  addMCQ(c33, 'Nếu $\\Delta MNP \\sim \\Delta DEF$ thì góc $M$ bằng góc nào?', 'Góc $D$', 'Góc $E$', 'Góc $F$', 'Góc $N$', 'A', 'Khi viết kí hiệu đồng dạng, thứ tự các đỉnh phải tương ứng. Đỉnh $M$ tương ứng với đỉnh $D$, nên $\\widehat{M} = \\widehat{D}$.', 'hinh_hoc');
  addMCQ(c33, 'Nếu $\\Delta ABC \\sim \\Delta A\'B\'C\'$ theo tỉ số $k = \\dfrac{1}{2}$, điều đó có nghĩa là:', 'Các cạnh của $\\Delta ABC$ dài gấp đôi các cạnh của $\\Delta A\'B\'C\'$.', 'Các cạnh của $\\Delta ABC$ bằng một nửa các cạnh của $\\Delta A\'B\'C\'$.', 'Diện tích của $\\Delta ABC$ bằng một nửa diện tích $\\Delta A\'B\'C\'$.', 'Hai tam giác này bằng nhau.', 'B', 'Tỉ số đồng dạng $k = \\dfrac{AB}{A\'B\'} = \\dfrac{1}{2}$, nghĩa là cạnh của tam giác thứ nhất bằng một nửa cạnh tương ứng của tam giác thứ hai.', 'hinh_hoc');
  addMCQ(c33, 'Hai tam giác đều bất kỳ có đồng dạng với nhau không?', 'Có, luôn đồng dạng.', 'Chỉ khi chúng có cùng chu vi.', 'Chỉ khi chúng có cùng diện tích.', 'Không bao giờ đồng dạng.', 'A', 'Hai tam giác đều luôn có 3 góc bằng nhau và bằng $60^\\circ$. Do đó chúng luôn đồng dạng với nhau.', 'hinh_hoc');

  addTF(c33, 'Hai tam giác bằng nhau thì đồng dạng với nhau theo tỉ số $k = 1$.', true, 'Đúng. Hai tam giác bằng nhau có các góc bằng nhau và các cạnh tương ứng bằng nhau (tỉ số = 1), nên chúng đồng dạng.', 'hinh_hoc');
  addTF(c33, 'Hai tam giác vuông bất kỳ thì luôn đồng dạng với nhau.', false, 'Sai. Hai tam giác vuông chỉ chắc chắn có 1 góc vuông bằng nhau, các góc nhọn còn lại chưa chắc bằng nhau, nên không thể kết luận chúng luôn đồng dạng.', 'hinh_hoc');
  addTF(c33, 'Tỉ số hai đường cao tương ứng của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng.', false, 'Sai. Tỉ số hai đường cao tương ứng bằng ĐÚNG tỉ số đồng dạng $k$. (Chỉ có tỉ số DIỆN TÍCH mới bằng $k^2$).', 'hinh_hoc');
  addTF(c33, 'Nếu tam giác $ABC$ đồng dạng với tam giác $DEF$ thì $\\dfrac{AB}{DE} = \\dfrac{BC}{EF} = \\dfrac{AC}{DF}$.', true, 'Đúng. Theo định nghĩa hai tam giác đồng dạng, các cạnh tương ứng phải tỉ lệ với nhau.', 'hinh_hoc');
  addTF(c33, 'Hai tam giác cân có góc ở đỉnh bằng nhau thì đồng dạng với nhau.', true, 'Đúng. Nếu góc ở đỉnh bằng nhau, hai góc ở đáy của chúng cũng sẽ bằng nhau (vì bằng $(180^\\circ - \\text{góc đỉnh}) / 2$). Có 3 cặp góc bằng nhau nên chúng đồng dạng.', 'hinh_hoc');

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi lý thuyết G8 BATCH 4...`);

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
