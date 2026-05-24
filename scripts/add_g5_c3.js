const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 5 AND (name LIKE '%Bài 15%' OR name LIKE '%Bài 16%')
  `;
  
  const id15 = cats.find(c => c.name.includes('Bài 15'))?.id;
  const id16 = cats.find(c => c.name.includes('Bài 16'))?.id;

  if (!id15 || !id16) {
    console.log('Categories not found!');
    return;
  }

  const grade = 5;
  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // Bài 15: Ki-lô-mét vuông. Héc-ta
  allQS.push(
    { cat: id15, code: 'T5-B15-NEW1', content: 'Một khu rừng hình chữ nhật có chiều dài $3$ km và chiều rộng $2$ km. Tính diện tích khu rừng đó bằng héc-ta.', answer: '$600$ ha.', solution: '**Bước 1:** Tính diện tích khu rừng theo đơn vị ki-lô-mét vuông.\n$3 \\times 2 = 6$ ($\\text{km}^2$)\n\n**Bước 2:** Đổi từ ki-lô-mét vuông sang héc-ta.\nTa biết $1\\text{ km}^2 = 100$ ha.\nNên $6\\text{ km}^2 = 6 \\times 100 = 600$ ha.\n\n**Kết luận:** Diện tích khu rừng là $600$ ha.' },
    { cat: id15, code: 'T5-B15-NEW2', content: 'Đổi các số đo sau sang đơn vị mét vuông: $4$ ha; $\\dfrac{1}{2}$ ha; $0,05\\text{ km}^2$.', answer: '$40\\,000\\text{ m}^2$; $5\\,000\\text{ m}^2$; $50\\,000\\text{ m}^2$.', solution: 'Ta sử dụng bảng đơn vị đo diện tích:\n- $1$ ha $= 10\\,000\\text{ m}^2$, do đó $4$ ha $= 4 \\times 10\\,000 = 40\\,000\\text{ m}^2$.\n- $\\dfrac{1}{2}$ ha $= \\dfrac{1}{2} \\times 10\\,000 = 5\\,000\\text{ m}^2$.\n- $1\\text{ km}^2 = 1\\,000\\,000\\text{ m}^2$, do đó $0,05\\text{ km}^2 = 0,05 \\times 1\\,000\\,000 = 50\\,000\\text{ m}^2$.' },
    { cat: id15, code: 'T5-B15-NEW3', content: 'Khu dân cư A có diện tích $150$ ha, khu dân cư B có diện tích $1,2\\text{ km}^2$. Hỏi khu dân cư nào có diện tích lớn hơn và lớn hơn bao nhiêu héc-ta?', answer: 'Khu A lớn hơn khu B $30$ ha.', solution: '**Bước 1:** Quy đổi cùng đơn vị đo để dễ so sánh. Ta đổi diện tích khu B sang ha.\n$1,2\\text{ km}^2 = 1,2 \\times 100 = 120$ ha.\n\n**Bước 2:** So sánh hai diện tích.\nVì $150$ ha $> 120$ ha nên khu dân cư A có diện tích lớn hơn khu B.\n\n**Bước 3:** Tính phần diện tích lớn hơn.\n$150 - 120 = 30$ (ha)\n\n**Kết luận:** Khu dân cư A lớn hơn khu B là $30$ ha.' },
    { cat: id15, code: 'T5-B15-NEW4', content: 'Một trang trại có diện tích $2$ ha. Người ta dành $\\dfrac{1}{5}$ diện tích để làm ao cá, phần còn lại trồng cây ăn quả. Tính diện tích phần đất trồng cây ăn quả bằng mét vuông.', answer: '$16\\,000\\text{ m}^2$.', solution: '**Bước 1:** Đổi diện tích trang trại ra mét vuông.\n$2$ ha $= 20\\,000\\text{ m}^2$.\n\n**Bước 2:** Tính diện tích ao cá.\n$20\\,000 \\times \\dfrac{1}{5} = 4\\,000$ ($\\text{m}^2$)\n\n**Bước 3:** Tính diện tích đất trồng cây ăn quả.\n$20\\,000 - 4\\,000 = 16\\,000$ ($\\text{m}^2$)\n*(Hoặc: $20\\,000 \\times \\dfrac{4}{5} = 16\\,000 \\text{ m}^2$)*\n\n**Kết luận:** Diện tích trồng cây ăn quả là $16\\,000\\text{ m}^2$.' },
    { cat: id15, code: 'T5-B15-NEW5', content: 'Hồ nước nhân tạo có diện tích $3,5\\text{ km}^2$. Nếu mở rộng thêm diện tích $250$ ha thì tổng diện tích hồ sẽ là bao nhiêu ki-lô-mét vuông?', answer: '$6\\text{ km}^2$.', solution: '**Bước 1:** Đổi diện tích mở rộng từ ha sang ki-lô-mét vuông.\nVì $100$ ha $= 1\\text{ km}^2$, nên $250$ ha $= 250 : 100 = 2,5\\text{ km}^2$.\n\n**Bước 2:** Tính tổng diện tích của hồ nước sau khi mở rộng.\n$3,5 + 2,5 = 6$ ($\\text{km}^2$)\n\n**Kết luận:** Tổng diện tích của hồ là $6\\text{ km}^2$.' }
  );

  // Bài 16: Các đơn vị đo diện tích
  allQS.push(
    { cat: id16, code: 'T5-B16-NEW1', content: 'Viết số thập phân thích hợp vào chỗ chấm: $5\\text{ m}^2 12\\text{ dm}^2 = ... \\text{m}^2$; $8\\text{ cm}^2 4\\text{ mm}^2 = ... \\text{cm}^2$.', answer: '$5,12\\text{ m}^2$; $8,04\\text{ cm}^2$.', solution: '- Đối với $5\\text{ m}^2 12\\text{ dm}^2$:\nTa biết $1\\text{ dm}^2 = \\dfrac{1}{100}\\text{ m}^2$. Do đó $12\\text{ dm}^2 = \\dfrac{12}{100}\\text{ m}^2 = 0,12\\text{ m}^2$.\nVậy $5\\text{ m}^2 12\\text{ dm}^2 = 5 + 0,12 = 5,12\\text{ m}^2$.\n\n- Đối với $8\\text{ cm}^2 4\\text{ mm}^2$:\nTa biết $1\\text{ mm}^2 = \\dfrac{1}{100}\\text{ cm}^2$. Do đó $4\\text{ mm}^2 = \\dfrac{4}{100}\\text{ cm}^2 = 0,04\\text{ cm}^2$.\nVậy $8\\text{ cm}^2 4\\text{ mm}^2 = 8 + 0,04 = 8,04\\text{ cm}^2$.' },
    { cat: id16, code: 'T5-B16-NEW2', content: 'Sắp xếp các số đo diện tích sau theo thứ tự từ lớn đến bé: $0,4\\text{ m}^2$; $45\\text{ dm}^2$; $4000\\text{ cm}^2$; $0,05\\text{ m}^2$.', answer: '$45\\text{ dm}^2 > 0,4\\text{ m}^2 = 4000\\text{ cm}^2 > 0,05\\text{ m}^2$.', solution: 'Để dễ so sánh, ta đổi tất cả về cùng một đơn vị, ví dụ là $\\text{dm}^2$:\n- $0,4\\text{ m}^2 = 0,4 \\times 100 = 40\\text{ dm}^2$.\n- $45\\text{ dm}^2$ giữ nguyên.\n- $4000\\text{ cm}^2 = 4000 : 100 = 40\\text{ dm}^2$.\n- $0,05\\text{ m}^2 = 0,05 \\times 100 = 5\\text{ dm}^2$.\n\nSo sánh các giá trị đã quy đổi: $45 > 40 = 40 > 5$.\nVậy thứ tự từ lớn đến bé là: $45\\text{ dm}^2 > 0,4\\text{ m}^2 = 4000\\text{ cm}^2 > 0,05\\text{ m}^2$.' },
    { cat: id16, code: 'T5-B16-NEW3', content: 'Một tấm bìa hình vuông có cạnh $15$ cm. Tính diện tích tấm bìa đó bằng đề-xi-mét vuông.', answer: '$2,25\\text{ dm}^2$.', solution: '**Bước 1:** Tính diện tích tấm bìa bằng xăng-ti-mét vuông.\n$15 \\times 15 = 225$ ($\\text{cm}^2$)\n\n**Bước 2:** Đổi từ $\\text{cm}^2$ sang $\\text{dm}^2$.\nVì $100\\text{ cm}^2 = 1\\text{ dm}^2$, nên $225\\text{ cm}^2 = 225 : 100 = 2,25\\text{ dm}^2$.\n\n**Kết luận:** Diện tích tấm bìa là $2,25\\text{ dm}^2$.' },
    { cat: id16, code: 'T5-B16-NEW4', content: 'Người ta lát sàn một căn phòng hình chữ nhật có chiều dài $8$ m, chiều rộng $6$ m bằng các viên gạch hình vuông cạnh $40$ cm. Tính số viên gạch cần dùng (coi phần mạch vữa là không đáng kể).', answer: '$300$ viên gạch.', solution: '**Bước 1:** Tính diện tích căn phòng.\n$8 \\times 6 = 48$ ($\\text{m}^2$)\n\n**Bước 2:** Tính diện tích của một viên gạch.\nCạnh viên gạch là $40$ cm $= 0,4$ m.\nDiện tích một viên gạch: $0,4 \\times 0,4 = 0,16$ ($\\text{m}^2$)\n\n**Bước 3:** Tính số viên gạch cần dùng.\nLấy diện tích căn phòng chia cho diện tích một viên gạch:\n$48 : 0,16 = 300$ (viên)\n\n**Kết luận:** Cần dùng $300$ viên gạch để lát sàn căn phòng.' },
    { cat: id16, code: 'T5-B16-NEW5', content: 'Một thửa ruộng hình thang có diện tích là $30$ a. Người nông dân dùng $20\\%$ diện tích để đào mương dẫn nước. Hỏi phần diện tích còn lại dùng để cấy lúa là bao nhiêu mét vuông?', answer: '$2400\\text{ m}^2$.', solution: 'Chú ý: $1$ a (a-rơ) $= 100\\text{ m}^2$. Do đó $30$ a $= 3000\\text{ m}^2$.\n\n**Bước 1:** Đổi tổng diện tích thửa ruộng ra mét vuông.\nDiện tích thửa ruộng: $3000\\text{ m}^2$.\n\n**Bước 2:** Tính diện tích đào mương.\n$3000 \\times 20 : 100 = 600$ ($\\text{m}^2$)\n\n**Bước 3:** Tính diện tích còn lại để cấy lúa.\n$3000 - 600 = 2400$ ($\\text{m}^2$)\n\n**Kết luận:** Phần diện tích cấy lúa là $2400\\text{ m}^2$.' }
  );

  console.log(`Inserting ${allQS.length} new questions for Chapter 3...`);

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
