const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 6 AND (name ILIKE '%Bài 18%' OR name ILIKE '%Bài 20%')
    LIMIT 2
  `;
  
  if (cats.length < 2) {
    console.log('Categories not found!');
    return;
  }
  
  const id1 = cats.find(c => c.name.includes('Bài 18'))?.id;
  const id2 = cats.find(c => c.name.includes('Bài 20'))?.id;
  console.log('Cat 1:', cats[0].name);
  console.log('Cat 2:', cats[1].name);

  const grade = 6;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Grade 6: Tam giác đều, Hình vuông, Lục giác đều
  allQS.push(
    { cat: id1, code: 'T6-H1-NEW1', content: 'Nêu các tính chất về cạnh và góc của tam giác đều $ABC$.', answer: '$3$ cạnh bằng nhau, $3$ góc bằng nhau và bằng $60^\\circ$.', solution: 'Tam giác đều $ABC$ có các tính chất cơ bản sau:\n- Ba cạnh bằng nhau: $AB = BC = CA$.\n- Ba góc bằng nhau: $\\widehat{A} = \\widehat{B} = \\widehat{C} = 60^\\circ$.' },
    { cat: id1, code: 'T6-H1-NEW2', content: 'Một mảnh vườn hình vuông có chu vi là $24$ m. Tính diện tích của mảnh vườn đó.', answer: '$36\\text{ m}^2$.', solution: '**Bước 1: Tính độ dài cạnh hình vuông**\nChu vi hình vuông bằng cạnh nhân $4$.\nĐộ dài cạnh là: $24 : 4 = 6$ (m).\n\n**Bước 2: Tính diện tích**\nDiện tích hình vuông bằng cạnh nhân cạnh.\nDiện tích: $6 \\times 6 = 36$ ($\\text{m}^2$).\n\n**Kết luận:** Diện tích mảnh vườn là $36\\text{ m}^2$.' },
    { cat: id1, code: 'T6-H1-NEW3', content: 'Cho hình lục giác đều $ABCDEF$ có độ dài cạnh bằng $5$ cm. Nêu các tính chất về cạnh, góc và ba đường chéo chính của hình lục giác đều này.', answer: 'Cạnh $5$ cm, góc $120^\\circ$, $3$ đường chéo chính bằng nhau.', solution: 'Trong hình lục giác đều $ABCDEF$:\n- **Về cạnh:** Sáu cạnh có độ dài bằng nhau và bằng $5$ cm ($AB = BC = CD = DE = EF = FA = 5$ cm).\n- **Về góc:** Sáu góc ở các đỉnh $A, B, C, D, E, F$ đều bằng nhau và mỗi góc bằng $120^\\circ$.\n- **Về đường chéo chính:** Ba đường chéo chính $AD, BE, CF$ cắt nhau tại một điểm và có độ dài bằng nhau.' },
    { cat: id1, code: 'T6-H1-NEW4', content: 'Bác nông dân rào xung quanh một khu đất hình vuông có cạnh $15$ m bằng lưới thép. Tính chiều dài lưới thép cần dùng, biết bác để lại một khoảng $2$ m làm cổng.', answer: '$58$ m.', solution: '**Bước 1: Tính chu vi khu đất hình vuông**\nChu vi của khu đất là: $15 \\times 4 = 60$ (m).\n\n**Bước 2: Tính chiều dài lưới thép**\nVì bác để lại $2$ m để làm cổng (không rào), nên chiều dài lưới thép cần dùng là:\n$60 - 2 = 58$ (m).\n\n**Kết luận:** Chiều dài lưới thép cần dùng là $58$ m.' },
    { cat: id1, code: 'T6-H1-NEW5', content: 'Hãy kể tên các đồ vật trong thực tế có bề mặt là hình vuông, tam giác đều và hình lục giác đều (mỗi hình kể $2$ đồ vật).', answer: 'Xem lời giải chi tiết.', solution: '- **Hình vuông:** Bề mặt của một số loại gạch lát nền nhà, mặt khối rubik, bàn cờ vua.\n- **Tam giác đều:** Biển báo giao thông nguy hiểm (ví dụ: biển báo giao nhau với đường sắt), khung giá đỡ eke, mặt viên gạch lát nền hình tam giác.\n- **Lục giác đều:** Hộp bánh kẹo mứt Tết (hình lục giác), tổ ong, đầu con ốc lục giác (đai ốc).' }
  );

  // Grade 6: Hình chữ nhật, hình thoi, hình bình hành, hình thang cân
  allQS.push(
    { cat: id2, code: 'T6-H2-NEW1', content: 'Một thửa ruộng hình chữ nhật có chiều dài $120$ m, chiều rộng bằng nửa chiều dài. Tính chu vi và diện tích thửa ruộng.', answer: 'Chu vi $360$ m; Diện tích $7200\\text{ m}^2$.', solution: '**Bước 1: Tính chiều rộng**\nChiều rộng thửa ruộng là: $120 : 2 = 60$ (m).\n\n**Bước 2: Tính chu vi**\nChu vi thửa ruộng là: $(120 + 60) \\times 2 = 360$ (m).\n\n**Bước 3: Tính diện tích**\nDiện tích thửa ruộng là: $120 \\times 60 = 7200$ ($\\text{m}^2$).' },
    { cat: id2, code: 'T6-H2-NEW2', content: 'Tính diện tích hình thoi có độ dài hai đường chéo lần lượt là $8$ cm và $10$ cm.', answer: '$40\\text{ cm}^2$.', solution: 'Công thức tính diện tích hình thoi bằng nửa tích độ dài hai đường chéo:\n$S = \\dfrac{1}{2} \\times d_1 \\times d_2$\nÁp dụng vào bài toán:\n$S = \\dfrac{1}{2} \\times 8 \\times 10 = \\dfrac{80}{2} = 40$ ($\\text{cm}^2$).\n\n**Kết luận:** Diện tích hình thoi là $40\\text{ cm}^2$.' },
    { cat: id2, code: 'T6-H2-NEW3', content: 'Cửa sổ hình bình hành có độ dài đáy là $80$ cm và chiều cao tương ứng là $60$ cm. Tính diện tích kính cần dùng để lắp vào cửa sổ đó.', answer: '$4800\\text{ cm}^2$.', solution: 'Công thức tính diện tích hình bình hành bằng độ dài đáy nhân với chiều cao tương ứng.\nDiện tích tấm kính cần dùng là:\n$S = 80 \\times 60 = 4800$ ($\\text{cm}^2$).\n\n*(Có thể đổi sang mét vuông: $4800\\text{ cm}^2 = 0,48\\text{ m}^2$).*' },
    { cat: id2, code: 'T6-H2-NEW4', content: 'Nêu các tính chất về cạnh, góc và đường chéo của hình thang cân.', answer: 'Xem lời giải chi tiết.', solution: 'Hình thang cân có các tính chất sau:\n- **Về cạnh:** Hai cạnh bên bằng nhau.\n- **Về góc:** Hai góc kề một đáy bằng nhau.\n- **Về đường chéo:** Hai đường chéo bằng nhau.\n*(Lưu ý: Hình thang cân có hai cạnh đáy song song với nhau như hình thang thông thường).*' },
    { cat: id2, code: 'T6-H2-NEW5', content: 'Một mảnh vườn hình chữ nhật có chu vi $80$ m. Chiều dài hơn chiều rộng $10$ m. Tính diện tích mảnh vườn.', answer: '$375\\text{ m}^2$.', solution: '**Bước 1: Tính nửa chu vi (Tổng của chiều dài và chiều rộng)**\n$80 : 2 = 40$ (m)\n\n**Bước 2: Tìm chiều dài và chiều rộng (Dạng toán Tổng - Hiệu)**\n- Chiều dài mảnh vườn là: $(40 + 10) : 2 = 25$ (m).\n- Chiều rộng mảnh vườn là: $25 - 10 = 15$ (m).\n\n**Bước 3: Tính diện tích**\nDiện tích mảnh vườn là: $25 \\times 15 = 375$ ($\\text{m}^2$).\n\n**Kết luận:** Diện tích mảnh vườn là $375\\text{ m}^2$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Grade 6 (Geometry)...`);

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
