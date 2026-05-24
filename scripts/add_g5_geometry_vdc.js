const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`SELECT id, name, grade FROM public.categories WHERE grade = 5`;
  
  const getCatId = (keyword) => {
    const matched = cats.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()));
    return matched.length > 0 ? matched[0].id : cats[0].id;
  };

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // 1. Hình tam giác - Tỉ số diện tích (10 câu)
  const idTamGiac = getCatId('tam giác') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idTamGiac, code: `G5-GEO-TG-${i}`,
      content: `Cho tam giác $ABC$ có diện tích là ${100 + i * 10} \\text{ cm}^2$. Trên cạnh $BC$ lấy điểm $M$ sao cho $BM = \\dfrac{1}{3} BC$. Trên cạnh $AC$ lấy điểm $N$ sao cho $AN = \\dfrac{1}{4} AC$. Nối $M$ với $N$. Tính diện tích tam giác $MNC$.`,
      answer: `$${((100 + i * 10) * (2/3) * (3/4)).toFixed(0)} \\text{ cm}^2$.`,
      solution: `Vì $BM = \\dfrac{1}{3} BC$ nên $MC = \\dfrac{2}{3} BC$. Hai tam giác $AMC$ và $ABC$ có chung chiều cao hạ từ $A$ xuống $BC$, nên $S_{AMC} = \\dfrac{2}{3} S_{ABC} = \\dfrac{2}{3} \\times ${100 + i * 10} = ${(100 + i * 10) * 2 / 3} \\text{ cm}^2$.\nVì $AN = \\dfrac{1}{4} AC$ nên $NC = \\dfrac{3}{4} AC$. Hai tam giác $MNC$ và $AMC$ có chung chiều cao hạ từ $M$ xuống $AC$, nên $S_{MNC} = \\dfrac{3}{4} S_{AMC} = \\dfrac{3}{4} \\times ${(100 + i * 10) * 2 / 3} = ${((100 + i * 10) * (2/3) * (3/4)).toFixed(0)} \\text{ cm}^2$.`
    });
  }

  // 2. Hình thang (10 câu)
  const idHinhThang = getCatId('hình thang') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idHinhThang, code: `G5-GEO-HT-${i}`,
      content: `Một thửa ruộng hình thang có đáy lớn ${50 + i * 2} \\text{ m}, đáy bé bằng $\\dfrac{3}{5}$ đáy lớn. Chiều cao kém đáy bé ${5 + i} \\text{ m}. Người ta trồng lúa trên thửa ruộng đó, trung bình cứ $100 \\text{ m}^2$ thu được $65 \\text{ kg}$ thóc. Hỏi cả thửa ruộng thu hoạch được bao nhiêu tạ thóc?`,
      answer: `Xem lời giải chi tiết.`,
      solution: `Đáy bé thửa ruộng là: ${50 + i * 2} \\times \\dfrac{3}{5} = ${(50 + i * 2) * 3 / 5} \\text{ m}.\nChiều cao thửa ruộng là: ${(50 + i * 2) * 3 / 5} - ${5 + i} = ${((50 + i * 2) * 3 / 5) - (5 + i)} \\text{ m}.\nDiện tích thửa ruộng là: $(${50 + i * 2} + ${(50 + i * 2) * 3 / 5}) \\times ${((50 + i * 2) * 3 / 5) - (5 + i)} : 2 = ${( ((50 + i * 2) + ((50 + i * 2) * 3 / 5)) * (((50 + i * 2) * 3 / 5) - (5 + i)) / 2 ).toFixed(2)} \\text{ m}^2$.\nSố kg thóc thu hoạch được là: Diện tích $: 100 \\times 65$.\nĐổi từ kg sang tạ (chia cho 100) để ra đáp số cuối cùng.`
    });
  }

  // 3. Hình tròn (10 câu)
  const idHinhTron = getCatId('hình tròn') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idHinhTron, code: `G5-GEO-HTR-${i}`,
      content: `Bán kính của một hình tròn tăng thêm $20\\%$. Hỏi diện tích của hình tròn đó tăng thêm bao nhiêu phần trăm? (Biết bán kính ban đầu là $R = ${i} \\text{ cm}$).`,
      answer: `$44\\%$.`,
      solution: `Bán kính sau khi tăng là $R' = R + 20\\% R = 1,2 R$.\nDiện tích ban đầu: $S = R \\times R \\times 3,14$.\nDiện tích lúc sau: $S' = (1,2 R) \\times (1,2 R) \\times 3,14 = 1,44 \\times R \\times R \\times 3,14 = 1,44 S$.\nVậy diện tích lúc sau bằng $144\\%$ diện tích ban đầu.\nDiện tích hình tròn đã tăng thêm: $144\\% - 100\\% = 44\\%$.`
    });
  }

  // 4. Hình hộp chữ nhật - Đổ nước (10 câu)
  const idHinhHop = getCatId('hộp') || getCatId('thể tích') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idHinhHop, code: `G5-GEO-HH-${i}`,
      content: `Một bể kính nuôi cá dạng hình hộp chữ nhật có chiều dài ${80 + i * 5} \\text{ cm}, chiều rộng ${50 + i * 2} \\text{ cm}, chiều cao ${60 + i} \\text{ cm}. Lúc đầu mực nước trong bể cao ${40 + i} \\text{ cm}. Người ta thả vào bể một hòn đá làm mức nước dâng lên thêm $5 \\text{ cm}$. Tính thể tích của hòn đá đó.`,
      answer: `$${(80 + i * 5) * (50 + i * 2) * 5} \\text{ cm}^3$.`,
      solution: `Phần thể tích nước dâng lên chính là thể tích của hòn đá được thả vào.\nPhần nước dâng lên có dạng hình hộp chữ nhật với chiều dài và chiều rộng bằng kích thước của đáy bể cá, và chiều cao bằng $5 \\text{ cm}$.\nThể tích hòn đá là: ${80 + i * 5} \\times ${50 + i * 2} \\times 5 = ${(80 + i * 5) * (50 + i * 2) * 5} \\text{ cm}^3$.`
    });
  }

  // 5. Hình lập phương - Sơn màu (10 câu)
  const idLapPhuong = getCatId('lập phương') || getCatId('thể tích') || cats[0].id;
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idLapPhuong, code: `G5-GEO-LP-${i}`,
      content: `Người ta xếp các khối lập phương nhỏ cạnh $1 \\text{ cm}$ thành một khối lập phương lớn có cạnh dài ${i + 5} \\text{ cm}. Sau đó người ta sơn toàn bộ 6 mặt của khối lập phương lớn. Hỏi có bao nhiêu khối lập phương nhỏ không được sơn mặt nào?`,
      answer: `$${(i + 5 - 2)**3}$ khối.`,
      solution: `Các khối lập phương nhỏ không được sơn mặt nào nằm hoàn toàn ở phần lõi bên trong khối lập phương lớn.\nPhần lõi này cũng tạo thành một khối lập phương có cạnh giảm đi 2 (mỗi bên bị che đi 1 khối).\nĐộ dài cạnh của phần lõi: ${i + 5} - 2 = ${i + 3} \\text{ cm}.\nSố khối lập phương nhỏ không sơn mặt nào là: ${i + 3} \\times ${i + 3} \\times ${i + 3} = ${(i + 3)**3}$ (khối).`
    });
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi Hình Học Nâng Cao Lớp 5...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', 5, 'hinh_hoc', 'tu_luan', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp 50 câu Hình Học Lớp 5.');
}

main().catch(console.error);
