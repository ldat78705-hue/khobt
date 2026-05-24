const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  await sql`UPDATE public.questions SET solution = 'Để biết hai bạn An và Bình đã ăn tổng cộng bao nhiêu phần của cái bánh, ta cần thực hiện phép cộng hai phân số chỉ số phần bánh mà mỗi bạn đã ăn.\nSố phần bánh cả hai bạn đã ăn là:\n$\\dfrac{1}{4} + \\dfrac{1}{3}$ (cái bánh)\n\n**Bước 1:** Quy đồng mẫu số hai phân số. Ta chọn mẫu số chung nhỏ nhất là $12$.\n- $\\dfrac{1}{4} = \\dfrac{1 \\times 3}{4 \\times 3} = \\dfrac{3}{12}$\n- $\\dfrac{1}{3} = \\dfrac{1 \\times 4}{3 \\times 4} = \\dfrac{4}{12}$\n\n**Bước 2:** Thực hiện phép cộng:\n$\\dfrac{3}{12} + \\dfrac{4}{12} = \\dfrac{3 + 4}{12} = \\dfrac{7}{12}$ (cái bánh)\n\n**Đáp số:** $\\dfrac{7}{12}$ cái bánh.' WHERE id = '01726714-9cea-4a2d-a9d2-3aa78fc3270e'`;

  await sql`UPDATE public.questions SET solution = 'Để so sánh hai hỗn số $1\\dfrac{1}{2}$ và $1\\dfrac{2}{3}$, ta xét phần nguyên và phần phân số của chúng.\n\n**Bước 1:** So sánh phần nguyên. \nCả hai hỗn số đều có phần nguyên bằng $1$. Do đó, ta tiếp tục so sánh phần phân số.\n\n**Bước 2:** So sánh phần phân số là $\\dfrac{1}{2}$ và $\\dfrac{2}{3}$.\nTa quy đồng mẫu số hai phân số này với mẫu số chung nhỏ nhất là $6$:\n- $\\dfrac{1}{2} = \\dfrac{1 \\times 3}{2 \\times 3} = \\dfrac{3}{6}$\n- $\\dfrac{2}{3} = \\dfrac{2 \\times 2}{3 \\times 2} = \\dfrac{4}{6}$\n\nVì $3 < 4$ nên $\\dfrac{3}{6} < \\dfrac{4}{6}$, suy ra $\\dfrac{1}{2} < \\dfrac{2}{3}$.\n\n**Kết luận:** Vì phần nguyên bằng nhau và phần phân số nhỏ hơn nên $1\\dfrac{1}{2} < 1\\dfrac{2}{3}$.' WHERE id = '04439ef0-0e11-4515-b6ae-d03121426202'`;

  await sql`UPDATE public.questions SET solution = 'Để chuyển hỗn số $3\\dfrac{2}{5}$ thành phân số, ta áp dụng quy tắc:\n"Phân số mới có tử số bằng phần nguyên nhân với mẫu số rồi cộng với tử số ở phần phân số, mẫu số được giữ nguyên".\n\nThực hiện các bước như sau:\n- **Tử số mới:** $3 \\times 5 + 2 = 15 + 2 = 17$.\n- **Mẫu số:** giữ nguyên là $5$.\n\nVậy: $3\\dfrac{2}{5} = \\dfrac{3 \\times 5 + 2}{5} = \\dfrac{17}{5}$.' WHERE id = '045649ab-b462-4995-bc4f-bd861f63f9a5'`;

  console.log('Fixed 3 sample questions successfully.');
}

main().catch(console.error);
