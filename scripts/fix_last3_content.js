const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // Q93515: $4$1$ → $45 \text{ m}^2$
  await sql`UPDATE public.questions SET 
    content = REPLACE(content, '$4$1$', '$45 \\text{ m}^2$')
    WHERE question_code = 'Q93515'`;
  console.log('✅ Q93515: $4$1$ → $45 m²');
  
  // T5-B48-009: So sánh $4{,}5 \text{ dm}^3$ và $4\,500 \text{ cm}^3$
  await sql`UPDATE public.questions SET 
    content = ${'So sánh: $4{,}5 \\text{ dm}^3$ và $4\\,500 \\text{ cm}^3$.'},
    answer = ${'$4{,}5 \\text{ dm}^3 = 4\\,500 \\text{ cm}^3$, hai giá trị bằng nhau.'},
    solution = ${'$4{,}5 \\text{ dm}^3 = 4{,}5 \\times 1\\,000 = 4\\,500 \\text{ cm}^3$.\n\nVậy $4{,}5 \\text{ dm}^3 = 4\\,500 \\text{ cm}^3$, hai giá trị bằng nhau.'}
    WHERE question_code = 'T5-B48-009'`;
  console.log('✅ T5-B48-009: viết lại hoàn toàn');
  
  // T5-B16-NEW2: Viết lại hoàn toàn  
  // Original intent: sắp xếp các số đo diện tích giảm dần
  await sql`UPDATE public.questions SET 
    content = ${'Sắp xếp các số đo diện tích sau theo thứ tự từ lớn đến bé: $0{,}4 \\text{ m}^2$; $41 \\text{ dm}^2$; $4\\,100 \\text{ cm}^2$; $0{,}04 \\text{ m}^2$.'},
    answer = ${'$41 \\text{ dm}^2 = 4\\,100 \\text{ cm}^2 > 0{,}4 \\text{ m}^2 > 0{,}04 \\text{ m}^2$.'},
    solution = ${'Đổi tất cả về $\\text{cm}^2$:\n- $0{,}4 \\text{ m}^2 = 4\\,000 \\text{ cm}^2$.\n- $41 \\text{ dm}^2 = 4\\,100 \\text{ cm}^2$.\n- $4\\,100 \\text{ cm}^2 = 4\\,100 \\text{ cm}^2$.\n- $0{,}04 \\text{ m}^2 = 400 \\text{ cm}^2$.\n\nSắp xếp: $41 \\text{ dm}^2 = 4\\,100 \\text{ cm}^2 > 0{,}4 \\text{ m}^2 > 0{,}04 \\text{ m}^2$.'}
    WHERE question_code = 'T5-B16-NEW2'`;
  console.log('✅ T5-B16-NEW2: viết lại hoàn toàn');
  
  // Verify
  const r = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE content ~ '\\$[0-9]+\\$1\\$'`;
  console.log(`\nCòn corrupt: ${r[0].cnt}`);
}
main();
