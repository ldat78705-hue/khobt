const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const idThales = 'b13e67c9-7224-47f3-b473-913eb1cfe1a6'; // Bài 15. Thalès
  const idDongDang = '981f5327-f5fe-4bc3-8643-5e08713bdc79'; // Bài 34. Ba trường hợp đồng dạng
  const idPythagore = '314a5710-b105-4d0b-91a3-38804b557f65'; // Bài 35. Pythagore
  const idChopTuGiac = '5305246b-cac2-4adb-842e-e044acaaa878'; // Bài 39. Hình chóp tứ giác đều

  const grade = 8;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Định lí Thalès
  allQS.push(
    { cat: idThales, code: 'T8-GEO-NEW1', content: 'Cho tam giác $ABC$, đường thẳng song song với $BC$ cắt $AB$ tại $D$ và $AC$ tại $E$. Biết $AD = 3$ cm, $DB = 2$ cm, $AE = 6$ cm. Tính độ dài $EC$.', answer: '$EC = 4$ cm.', solution: 'Vì $DE \\parallel BC$, áp dụng định lí Thalès trong tam giác $ABC$, ta có tỉ lệ thức:\n$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$\nThay số: $\\dfrac{3}{2} = \\dfrac{6}{EC}$\nSuy ra: $EC = \\dfrac{6 \\times 2}{3} = 4$ (cm).\nVậy $EC = 4$ cm.' },
    { cat: idThales, code: 'T8-GEO-NEW2', content: 'Cho đoạn thẳng $AB = 10$ cm. Gọi $M$ là điểm nằm giữa $A$ và $B$ sao cho chia $AB$ theo tỉ số $\\dfrac{2}{3}$. Tính độ dài $AM$ và $MB$.', answer: '$AM = 4$ cm; $MB = 6$ cm.', solution: 'Theo đề bài, tỉ số $\\dfrac{AM}{MB} = \\dfrac{2}{3}$.\nTa có $AM = \\dfrac{2}{5} AB$ và $MB = \\dfrac{3}{5} AB$.\nĐộ dài $AM = \\dfrac{2}{5} \\times 10 = 4$ (cm).\nĐộ dài $MB = \\dfrac{3}{5} \\times 10 = 6$ (cm).' },
    { cat: idThales, code: 'T8-GEO-NEW3', content: 'Trong tam giác $DEF$, vẽ $MN \\parallel EF$ ($M \\in DE, N \\in DF$). Biết $\\dfrac{DM}{ME} = \\dfrac{3}{4}$ và $DF = 14$ cm. Tính độ dài $DN$.', answer: '$DN = 6$ cm.', solution: 'Vì $MN \\parallel EF$, áp dụng định lí Thalès ta có:\n$\\dfrac{DM}{DE} = \\dfrac{DN}{DF}$\nVì $\\dfrac{DM}{ME} = \\dfrac{3}{4}$ nên $\\dfrac{DM}{DE} = \\dfrac{3}{3+4} = \\dfrac{3}{7}$.\nSuy ra: $\\dfrac{DN}{14} = \\dfrac{3}{7} \\Rightarrow DN = \\dfrac{14 \\times 3}{7} = 6$ (cm).' },
    { cat: idThales, code: 'T8-GEO-NEW4', content: 'Cho góc $xOy$. Trên tia $Ox$ lấy hai điểm $A, B$ sao cho $OA = 2$ cm, $OB = 5$ cm. Trên tia $Oy$ lấy $C, D$ sao cho $OC = 3$ cm, $OD = 7,5$ cm. Chứng minh $AC \\parallel BD$.', answer: 'Xem lời giải.', solution: 'Xét các tỉ số trên hai tia $Ox, Oy$:\n$\\dfrac{OA}{OB} = \\dfrac{2}{5}$\n$\\dfrac{OC}{OD} = \\dfrac{3}{7,5} = \\dfrac{30}{75} = \\dfrac{2}{5}$\nVì $\\dfrac{OA}{OB} = \\dfrac{OC}{OD}$, áp dụng định lí Thalès đảo trong tam giác $OBD$, ta có $AC \\parallel BD$.' },
    { cat: idThales, code: 'T8-GEO-NEW5', content: 'Cho tam giác $ABC$, tia phân giác của góc $A$ cắt cạnh $BC$ tại $D$. Biết $AB = 6$ cm, $AC = 8$ cm, $BD = 3$ cm. Tính độ dài $CD$.', answer: '$CD = 4$ cm.', solution: 'Theo tính chất đường phân giác trong tam giác, ta có:\n$\\dfrac{BD}{CD} = \\dfrac{AB}{AC}$\nThay số vào tỉ lệ thức:\n$\\dfrac{3}{CD} = \\dfrac{6}{8} = \\dfrac{3}{4}$\nSuy ra: $CD = \\dfrac{3 \\times 4}{3} = 4$ (cm).' }
  );

  // Tam giác đồng dạng
  allQS.push(
    { cat: idDongDang, code: 'T8-GEO-NEW6', content: 'Hai tam giác $ABC$ và $DEF$ có $\\widehat{A} = \\widehat{D} = 60^\\circ$, $\\dfrac{AB}{DE} = \\dfrac{AC}{DF} = \\dfrac{1}{2}$. Kết luận gì về hai tam giác này? Giải thích.', answer: '$\\Delta ABC \\sim \\Delta DEF$ theo trường hợp (c.g.c).', solution: 'Xét $\\Delta ABC$ và $\\Delta DEF$ có:\n- Góc xen giữa bằng nhau: $\\widehat{A} = \\widehat{D} = 60^\\circ$.\n- Hai cạnh kề tỉ lệ với nhau: $\\dfrac{AB}{DE} = \\dfrac{AC}{DF} = \\dfrac{1}{2}$.\nVậy $\\Delta ABC \\sim \\Delta DEF$ (cạnh - góc - cạnh).' },
    { cat: idDongDang, code: 'T8-GEO-NEW7', content: 'Bóng của một cái cây trên mặt đất dài $8$ m. Cùng lúc đó, bóng của một cái cọc thẳng đứng cao $2$ m dài $1,6$ m. Tính chiều cao của cây.', answer: '$10$ m.', solution: 'Tại cùng một thời điểm, các tia sáng mặt trời chiếu song song nên tạo ra hai tam giác vuông đồng dạng (Cây - Bóng cây và Cọc - Bóng cọc).\nGọi chiều cao của cây là $x$ (m).\nTa có tỉ lệ: $\\dfrac{\\text{Chiều cao cây}}{\\text{Chiều cao cọc}} = \\dfrac{\\text{Bóng cây}}{\\text{Bóng cọc}}$\n$\\dfrac{x}{2} = \\dfrac{8}{1,6}$\n$x = \\dfrac{2 \\times 8}{1,6} = \\dfrac{16}{1,6} = 10$ (m).\n**Kết luận:** Chiều cao của cây là $10$ m.' },
    { cat: idDongDang, code: 'T8-GEO-NEW8', content: 'Cho $\\Delta ABC \\sim \\Delta A\'B\'C\'$ với tỉ số đồng dạng $k = 3$. Tính tỉ số chu vi và tỉ số diện tích của hai tam giác đó.', answer: 'Tỉ số chu vi là $3$, tỉ số diện tích là $9$.', solution: '- Nếu hai tam giác đồng dạng với tỉ số $k$, thì tỉ số chu vi của chúng cũng bằng $k$. Vậy tỉ số chu vi là $3$.\n- Tỉ số diện tích của hai tam giác đồng dạng bằng bình phương tỉ số đồng dạng. Vậy tỉ số diện tích bằng $k^2 = 3^2 = 9$.' },
    { cat: idDongDang, code: 'T8-GEO-NEW9', content: 'Cho tam giác $ABC$ vuông tại $A$, đường cao $AH$. Chứng minh $\\Delta HBA \\sim \\Delta ABC$ và suy ra $AB^2 = BH \\cdot BC$.', answer: 'Xem lời giải.', solution: 'Xét $\\Delta HBA$ (vuông tại $H$) và $\\Delta ABC$ (vuông tại $A$):\nCó góc $\\widehat{B}$ là góc chung.\nVậy $\\Delta HBA \\sim \\Delta ABC$ (g.g).\nTừ sự đồng dạng, ta suy ra tỉ số các cạnh tương ứng:\n$\\dfrac{HB}{AB} = \\dfrac{AB}{BC}$\nNhân chéo ta được: $AB^2 = BH \\cdot BC$.' },
    { cat: idDongDang, code: 'T8-GEO-NEW10', content: 'Tam giác $ABC$ có $AB = 4$ cm, $AC = 6$ cm, $BC = 8$ cm. Tam giác $DEF$ có $DE = 2$ cm, $DF = 3$ cm, $EF = 4$ cm. Chứng minh hai tam giác đồng dạng và tìm tỉ số đồng dạng.', answer: '$\\Delta DEF \\sim \\Delta ABC$ với tỉ số $k = \\dfrac{1}{2}$.', solution: 'Ta lập tỉ số độ dài các cạnh tương ứng của hai tam giác:\n$\\dfrac{DE}{AB} = \\dfrac{2}{4} = \\dfrac{1}{2}$\n$\\dfrac{DF}{AC} = \\dfrac{3}{6} = \\dfrac{1}{2}$\n$\\dfrac{EF}{BC} = \\dfrac{4}{8} = \\dfrac{1}{2}$\nVì $\\dfrac{DE}{AB} = \\dfrac{DF}{AC} = \\dfrac{EF}{BC}$, suy ra $\\Delta DEF \\sim \\Delta ABC$ theo trường hợp cạnh - cạnh - cạnh (c.c.c).\nTỉ số đồng dạng là $k = \\dfrac{1}{2}$.' }
  );

  // Định lí Pythagore
  allQS.push(
    { cat: idPythagore, code: 'T8-GEO-NEW11', content: 'Cho tam giác $ABC$ vuông tại $A$. Biết $AB = 5$ cm, $AC = 12$ cm. Tính độ dài cạnh huyền $BC$.', answer: '$BC = 13$ cm.', solution: 'Áp dụng định lí Pythagore trong tam giác vuông $ABC$:\n$BC^2 = AB^2 + AC^2$\n$BC^2 = 5^2 + 12^2 = 25 + 144 = 169$\nSuy ra: $BC = \\sqrt{169} = 13$ (cm).' },
    { cat: idPythagore, code: 'T8-GEO-NEW12', content: 'Một chiếc thang dài $5$ m dựa vào tường. Chân thang cách chân tường $3$ m. Hỏi đỉnh thang chạm tường ở độ cao bao nhiêu mét?', answer: '$4$ m.', solution: 'Gọi độ cao đỉnh thang chạm tường là $x$ (m).\nTa có tam giác vuông được tạo bởi tường, mặt đất và chiếc thang. Thang là cạnh huyền.\nTheo định lí Pythagore:\n$x^2 + 3^2 = 5^2$\n$x^2 + 9 = 25$\n$x^2 = 16 \\Rightarrow x = 4$ (m).\n**Kết luận:** Đỉnh thang ở độ cao $4$ m.' },
    { cat: idPythagore, code: 'T8-GEO-NEW13', content: 'Kiểm tra xem tam giác có độ dài ba cạnh $7$ cm, $24$ cm, $25$ cm có phải là tam giác vuông không? Vì sao?', answer: 'Là tam giác vuông.', solution: 'Ta chọn cạnh dài nhất là $25$ cm để kiểm tra:\nBình phương cạnh lớn nhất: $25^2 = 625$.\nTổng bình phương hai cạnh kia: $7^2 + 24^2 = 49 + 576 = 625$.\nVì $25^2 = 7^2 + 24^2$, theo định lí Pythagore đảo, đây là tam giác vuông.' },
    { cat: idPythagore, code: 'T8-GEO-NEW14', content: 'Một người đi từ $A$ đến $B$ theo hướng Tây $4$ km, rồi đi tiếp đến $C$ theo hướng Nam $3$ km. Tính khoảng cách đường chim bay từ $A$ đến $C$.', answer: '$5$ km.', solution: 'Đường đi hướng Tây và hướng Nam vuông góc với nhau, tạo thành tam giác vuông.\nKhoảng cách từ $A$ đến $C$ là cạnh huyền của tam giác vuông này.\nÁp dụng định lí Pythagore:\n$AC = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$ (km).' },
    { cat: idPythagore, code: 'T8-GEO-NEW15', content: 'Tính đường chéo của một màn hình tivi hình chữ nhật có chiều dài $80$ cm và chiều rộng $60$ cm. (Kết quả tính bằng inch, biết 1 inch $\\approx 2,54$ cm, làm tròn đến hàng đơn vị).', answer: 'Khoảng $39$ inch.', solution: 'Đường chéo màn hình là cạnh huyền của tam giác vuông có hai cạnh góc vuông là chiều dài và chiều rộng.\nĐộ dài đường chéo là: $d = \\sqrt{80^2 + 60^2} = \\sqrt{6400 + 3600} = \\sqrt{10000} = 100$ (cm).\nĐổi sang inch:\n$100 : 2,54 \\approx 39,37$ (inch).\nLàm tròn đến hàng đơn vị, tivi này là loại $39$ inch.' }
  );

  // Hình chóp đều
  allQS.push(
    { cat: idChopTuGiac, code: 'T8-GEO-NEW16', content: 'Một hình chóp tứ giác đều có cạnh đáy là $6$ cm, chiều cao hình chóp là $4$ cm. Tính thể tích hình chóp đó.', answer: '$48 \\text{ cm}^3$.', solution: 'Đáy của hình chóp tứ giác đều là hình vuông.\nDiện tích đáy: $S_{\\text{đáy}} = 6^2 = 36$ ($\\text{cm}^2$).\nThể tích hình chóp:\n$V = \\dfrac{1}{3} S_{\\text{đáy}} \\cdot h = \\dfrac{1}{3} \\times 36 \\times 4 = 12 \\times 4 = 48$ ($\\text{cm}^3$).' },
    { cat: idChopTuGiac, code: 'T8-GEO-NEW17', content: 'Một lều bạt có dạng hình chóp tứ giác đều với cạnh đáy là $2$ m và chiều cao lều là $1,5$ m. Tính thể tích không khí bên trong lều.', answer: '$2 \\text{ m}^3$.', solution: 'Diện tích đáy (hình vuông) của lều là: $S = 2 \\times 2 = 4$ ($\\text{m}^2$).\nThể tích không khí bên trong lều chính là thể tích hình chóp:\n$V = \\dfrac{1}{3} S \\cdot h = \\dfrac{1}{3} \\times 4 \\times 1,5 = \\dfrac{6}{3} = 2$ ($\\text{m}^3$).' },
    { cat: idChopTuGiac, code: 'T8-GEO-NEW18', content: 'Hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $5$ cm, trung đoạn (đường cao của mặt bên) là $6$ cm. Tính diện tích xung quanh của hình chóp.', answer: '$60 \\text{ cm}^2$.', solution: 'Chu vi đáy của hình chóp tứ giác đều là:\n$C = 4 \\times 5 = 20$ (cm).\nNửa chu vi đáy là $p = 10$ (cm).\nDiện tích xung quanh của hình chóp:\n$S_{xq} = p \\cdot d = 10 \\times 6 = 60$ ($\\text{cm}^2$).\n*(Hoặc tính diện tích 1 mặt bên: $\\dfrac{1}{2} \\times 5 \\times 6 = 15$, có 4 mặt nên nhân 4 là $60$).*' },
    { cat: idChopTuGiac, code: 'T8-GEO-NEW19', content: 'Tính diện tích toàn phần của một hình chóp tứ giác đều biết cạnh đáy bằng $4$ cm và chiều cao mặt bên (trung đoạn) bằng $5$ cm.', answer: '$56 \\text{ cm}^2$.', solution: '**Bước 1: Tính diện tích xung quanh**\nChu vi đáy $C = 4 \\times 4 = 16$ cm $\\Rightarrow$ nửa chu vi $p = 8$ cm.\n$S_{xq} = p \\cdot d = 8 \\times 5 = 40$ ($\\text{cm}^2$).\n**Bước 2: Tính diện tích đáy**\n$S_{\\text{đáy}} = 4^2 = 16$ ($\\text{cm}^2$).\n**Bước 3: Tính diện tích toàn phần**\n$S_{tp} = S_{xq} + S_{\\text{đáy}} = 40 + 16 = 56$ ($\\text{cm}^2$).' },
    { cat: idChopTuGiac, code: 'T8-GEO-NEW20', content: 'Một kim tự tháp ở Ai Cập có hình dạng là hình chóp tứ giác đều. Biết chu vi đáy của kim tự tháp là $920$ m, chiều cao của các mặt bên xuất phát từ đỉnh kim tự tháp là $186$ m. Hãy tính diện tích xung quanh của kim tự tháp.', answer: '$85\\,560 \\text{ m}^2$.', solution: 'Chu vi đáy là $C = 920$ m.\nNửa chu vi đáy: $p = 920 : 2 = 460$ (m).\nTrung đoạn (chiều cao mặt bên) là $d = 186$ m.\nDiện tích xung quanh của kim tự tháp là:\n$S_{xq} = p \\cdot d = 460 \\times 186 = 85\\,560$ ($\\text{m}^2$).' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 8 Geometry...`);

  for (const q of allQS) {
    if (!q.cat) continue;
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
