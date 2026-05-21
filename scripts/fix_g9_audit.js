const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// Rà soát và fix các bài toán sai trong G9
async function main() {
  const fixes = [];

  // 1. T9-C2B4-005: PT vô nghiệm nhưng đáp án ghi x=1/2
  fixes.push({
    code: 'T9-C2B4-005',
    content: `Giải PT: $\\frac{x+1}{x-2}+\\frac{x-1}{x+2}=\\frac{2x}{x^2-4}$.`,
    answer: `Vô nghiệm.`,
    solution: `ĐKXĐ: $x \\neq \\pm 2$. Quy đồng mẫu $x^2-4$: $(x+1)(x+2)+(x-1)(x-2)=2x$. $x^2+3x+2+x^2-3x+2=2x$. $2x^2+4-2x=0$. $x^2-x+2=0$. $\\Delta=1-8=-7<0$. Vô nghiệm.`
  });

  // 2. T9-C2B4-007: Tính sai, đáp án ghi x=4, thực ra x=6
  fixes.push({
    code: 'T9-C2B4-007',
    answer: `$x=6$.`,
    solution: `ĐKXĐ: $x \\neq \\pm 1$. Quy đồng: $2(x-1)-(x+1)=3$. $2x-2-x-1=3$. $x=6$. Kiểm tra ĐKXĐ: $6 \\neq \\pm 1$ ✓.`
  });

  // 3. T9-C2B4-008: Đáp án ghi x=0 loại x=3, thực ra x=-12 nhận
  fixes.push({
    code: 'T9-C2B4-008',
    answer: `$x=-12$.`,
    solution: `ĐKXĐ: $x \\neq \\pm 3$. Quy đồng: $x(x+3)+6(x-3)=18$. $x^2+3x+6x-18=18$. $x^2+9x-36=0$. $(x+12)(x-3)=0$. $x=-12$ (nhận) hoặc $x=3$ (loại do ĐKXĐ).`
  });

  // 4. T9-C2BTC-007: Đáp án ghi x=2/5, thực ra x=6/5
  fixes.push({
    code: 'T9-C2BTC-007',
    answer: `$x=\\frac{6}{5}$.`,
    solution: `ĐKXĐ: $x \\neq \\pm 2$. Quy đồng: $3(x+2)+2(x-2)=8$. $3x+6+2x-4=8$. $5x+2=8$. $x=\\frac{6}{5}$. Thoả ĐKXĐ ✓.`
  });

  // 5. T9-C2BTC-010: Đáp án ghi x>13, thực ra x>17
  fixes.push({
    code: 'T9-C2BTC-010',
    answer: `$x > 17$.`,
    solution: `$\\frac{2(2x-1)-3(x+3)}{6} > 1$. $\\frac{4x-2-3x-9}{6} > 1$. $\\frac{x-11}{6} > 1$. $x-11 > 6$. $x > 17$.`
  });

  // 6. T9-C3B8-010: CMR sai hướng, cần sửa đề
  fixes.push({
    code: 'T9-C3B8-010',
    content: `CMR $\\sqrt{2} + \\sqrt{6} > 2\\sqrt{3}$.`,
    answer: `Bình phương hai vế.`,
    solution: `VT²$=(\\sqrt{2}+\\sqrt{6})^2=8+2\\sqrt{12}=8+4\\sqrt{3}$. VP²$=(2\\sqrt{3})^2=12$. $8+4\\sqrt{3} > 12 \\Leftrightarrow 4\\sqrt{3}>4 \\Leftrightarrow \\sqrt{3}>1$ (đúng). $\\blacksquare$`
  });

  // 7. T9-C5B14-010: Bài quá mơ hồ, sửa lại rõ ràng
  fixes.push({
    code: 'T9-C5B14-010',
    content: `$(O; 10)$ cm. Hai dây $AB=16$ cm và $CD=12$ cm. Tính khoảng cách từ tâm $O$ đến mỗi dây.`,
    answer: `$d(O, AB)=6$ cm, $d(O, CD)=8$ cm.`,
    solution: `$d(O,AB)=\\sqrt{10^2-8^2}=\\sqrt{36}=6$ cm. $d(O,CD)=\\sqrt{10^2-6^2}=\\sqrt{64}=8$ cm.`
  });

  // 8. T9-C5B16-009: CT sai (dùng R thay vì r nội tiếp)
  fixes.push({
    code: 'T9-C5B16-009',
    content: `$(O; R)$ nội tiếp $\\triangle ABC$. CMR $S_{\\triangle ABC} = \\frac{1}{2}(AB+BC+CA) \\cdot r$ ($r$: bán kính nội tiếp).`,
    answer: `$S = pr$ ($p$: nửa chu vi).`,
    solution: `Nối $O$ với $A, B, C$. $S_{\\triangle OAB}=\\frac{1}{2} \\cdot AB \\cdot r$. Tương tự: $S_{\\triangle OBC}=\\frac{1}{2} \\cdot BC \\cdot r$, $S_{\\triangle OCA}=\\frac{1}{2} \\cdot CA \\cdot r$. $S = \\frac{1}{2}(AB+BC+CA) \\cdot r = pr$. $\\blacksquare$`
  });

  // 9. T9-C6B21-006: Bài toán đề phức tạp sửa nhiều lần, sửa lại sạch
  fixes.push({
    code: 'T9-C6B21-006',
    content: `Chia $120$ phần thưởng cho HS một lớp. Nếu lớp thêm $4$ HS thì mỗi em ít hơn $1$ phần. Tìm số HS ban đầu.`,
    answer: `$20$ HS.`,
    solution: `Gọi $x$ là số HS ban đầu ($x>0$, nguyên). $\\frac{120}{x}-\\frac{120}{x+4}=1$. $120(x+4)-120x=x(x+4)$. $480=x^2+4x$. $x^2+4x-480=0$. $\\Delta=16+1920=1936$. $\\sqrt{\\Delta}=44$. $x=\\frac{-4+44}{2}=20$ (nhận). Vậy $20$ HS.`
  });

  // 10. T9-C6B21-008: Sửa lại bài ô tô cho gọn
  fixes.push({
    code: 'T9-C6B21-008',
    content: `Ô tô đi $120$ km. Nếu tăng vận tốc $10$ km/h thì thời gian giảm $1$ giờ. Tìm vận tốc ban đầu.`,
    answer: `$30$ km/h.`,
    solution: `Gọi $v$ là vận tốc ban đầu ($v>0$). $\\frac{120}{v}-\\frac{120}{v+10}=1$. $\\frac{1200}{v(v+10)}=1$. $v^2+10v-1200=0$. $\\Delta=100+4800=4900$. $v=\\frac{-10+70}{2}=30$ (nhận). Vận tốc $30$ km/h.`
  });

  console.log(`Fixing ${fixes.length} questions...`);
  for (const f of fixes) {
    const sets = [];
    const vals = {};
    if (f.content) {
      await sql`UPDATE public.questions SET content=${f.content}, answer=${f.answer}, solution=${f.solution}, updated_at=NOW() WHERE question_code=${f.code}`;
    } else {
      await sql`UPDATE public.questions SET answer=${f.answer}, solution=${f.solution}, updated_at=NOW() WHERE question_code=${f.code}`;
    }
    console.log(`OK: ${f.code}`);
  }
  console.log('Done!');
}
main().catch(console.error);
