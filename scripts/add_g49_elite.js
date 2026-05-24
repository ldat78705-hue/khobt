const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const crypto = require('crypto');

async function main() {
  const cats = await sql`SELECT id, name, grade FROM public.categories WHERE grade IN (4, 9)`;
  
  const getCatId = (grade, keyword) => {
    const matched = cats.filter(c => c.grade === grade && c.name.toLowerCase().includes(keyword.toLowerCase()));
    if (matched.length > 0) return matched[0].id;
    const fallback = cats.find(c => c.grade === grade && c.parent_id !== null);
    return fallback ? fallback.id : cats.find(c => c.grade === grade).id;
  };

  const user_id = '8316c34e-765d-4b8c-9364-b683a17e33f8';
  let allQS = [];

  // ================= LỚP 4: Dãy số quy luật & Tư duy (25 câu) =================
  const idG4 = getCatId(4, 'số tự nhiên') || getCatId(4, 'phép tính');
  for (let i = 1; i <= 15; i++) {
    allQS.push({
      cat: idG4, code: `G4-ELITE-SEQ-${i}`, grade: 4, topic: 'so_hoc',
      content: `Cho dãy số: ${i}, ${i+3}, ${i+6}, ${i+9},... Tìm số hạng thứ 100 của dãy số và tính tổng của 100 số hạng đầu tiên.`,
      answer: `Số hạng thứ 100 là ${i + 99 * 3}. Tổng là ${(i + i + 99 * 3) * 100 / 2}.`,
      solution: `Khoảng cách giữa hai số liên tiếp là 3 đơn vị.\nSố hạng thứ 100 của dãy là: ${i} + (100 - 1) \\times 3 = ${i + 297} = ${i + 297}.\nTổng của 100 số hạng đầu tiên là: (Số đầu + Số cuối) \\times Số số hạng : 2.\nTổng = (${i} + ${i + 297}) \\times 100 : 2 = ${(i + i + 297) * 100 / 2}.`
    });
  }
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idG4, code: `G4-ELITE-LOGIC-${i}`, grade: 4, topic: 'so_hoc',
      content: `Trong một buổi giao lưu toán học có ${20 + i} học sinh. Nếu mỗi học sinh đều bắt tay với tất cả các bạn còn lại đúng một lần thì có tổng cộng bao nhiêu cái bắt tay?`,
      answer: `$${(20+i)*(19+i)/2}` + ` cái bắt tay.`,
      solution: `Mỗi học sinh sẽ bắt tay với ${20 + i - 1} = ${19 + i} bạn khác.\nCó ${20 + i} học sinh nên số lượt bắt tay là ${20 + i} \\times ${19 + i}.\nTuy nhiên, mỗi cái bắt tay được tính 2 lần (A bắt tay B và B bắt tay A).\nSố cái bắt tay thực tế là: ${20 + i} \\times ${19 + i} : 2 = ${(20+i)*(19+i)/2} (cái bắt tay).`
    });
  }

  // ================= LỚP 9: Phương trình vô tỉ & Hệ phương trình khó (25 câu) =================
  const idG9 = getCatId(9, 'phương trình') || getCatId(9, 'căn thức');
  for (let i = 1; i <= 15; i++) {
    allQS.push({
      cat: idG9, code: `G9-ELITE-VOTI-${i}`, grade: 9, topic: 'dai_so',
      content: `Giải phương trình vô tỉ: $\\sqrt{x + ${i}} + \\sqrt{x + ${i+5}} = 5$.`,
      answer: `$x = ${4 - i}$.`,
      solution: `Điều kiện: $x \\ge -${i}$.\nTa có $\\sqrt{x + ${i}} + \\sqrt{x + ${i+5}} = 5$.\nNhân liên hợp: $(\\sqrt{x+${i+5}} - \\sqrt{x+${i}})(\\sqrt{x+${i+5}} + \\sqrt{x+${i}}) = (x+${i+5}) - (x+${i}) = 5$.\nSuy ra $5(\\sqrt{x+${i+5}} - \\sqrt{x+${i}}) = 5 \\Rightarrow \\sqrt{x+${i+5}} - \\sqrt{x+${i}} = 1$.\nTa có hệ:\n$\\begin{cases} \\sqrt{x+${i+5}} + \\sqrt{x+${i}} = 5 \\\\ \\sqrt{x+${i+5}} - \\sqrt{x+${i}} = 1 \\end{cases}$\nCộng hai vế ta được $2\\sqrt{x+${i+5}} = 6 \\Rightarrow \\sqrt{x+${i+5}} = 3 \\Rightarrow x+${i+5} = 9 \\Rightarrow x = ${4 - i}$.\nThử lại $x = ${4-i}$ thỏa mãn phương trình. Vậy nghiệm là $x = ${4-i}$.`
    });
  }
  for (let i = 1; i <= 10; i++) {
    allQS.push({
      cat: idG9, code: `G9-ELITE-HPT-${i}`, grade: 9, topic: 'dai_so',
      content: `Giải hệ phương trình sau: $\\begin{cases} x^2 + y^2 + x + y = ${18 + i*2} \\\\ xy(x+1)(y+1) = ${72 + i*8} \\end{cases}$.`,
      answer: `Xem chi tiết lời giải.`,
      solution: `Hệ phương trình tương đương: $\\begin{cases} (x^2 + x) + (y^2 + y) = ${18 + i*2} \\\\ (x^2 + x)(y^2 + y) = ${72 + i*8} \\end{cases}$.\nĐặt $u = x^2 + x$ và $v = y^2 + y$, ta có hệ mới:\n$\\begin{cases} u + v = ${18 + i*2} \\\\ u \\times v = ${72 + i*8} \\end{cases}$.\nTheo định lý Vi-ét đảo, $u, v$ là nghiệm của phương trình $T^2 - ${18 + i*2}T + ${72 + i*8} = 0$.\nGiải phương trình này tìm được $u, v$.\nTừ đó trả lại ẩn $x, y$ để tìm nghiệm của hệ ban đầu.`
    });
  }

  console.log(`Bắt đầu nạp ${allQS.length} câu hỏi siêu nâng cao cho Lớp 4 và Lớp 9...`);

  for (const q of allQS) {
    const qid = crypto.randomUUID();
    await sql`
      INSERT INTO public.questions (id, category_id, question_code, content, answer, solution, difficulty, grade, topic, question_type, user_id, status, is_public)
      VALUES (${qid}, ${q.cat}, ${q.code}, ${q.content}, ${q.answer}, ${q.solution}, 'van_dung_cao', ${q.grade}, ${q.topic}, 'tu_luan', ${user_id}, 'approved', true)
    `;
  }

  console.log('Thành công! Đã nạp 50 câu Elite.');
}

main().catch(console.error);
