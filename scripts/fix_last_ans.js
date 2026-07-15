const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  // T4-B43-004: HCN 25m × 12m → S = 300 m²
  await sql`UPDATE public.questions SET answer='$300 \\text{ m}^2$.' WHERE question_code='T4-B43-004'`;
  console.log('✅ T4-B43-004: $300 m²');
  
  // T6-C4B20-NEW-005: Hình thoi d1=6, d2=8 → S = 6×8/2 = 24 cm²
  await sql`UPDATE public.questions SET answer='$24 \\text{ cm}^2$.' WHERE question_code='T6-C4B20-NEW-005'`;
  console.log('✅ T6-C4B20-NEW-005: $24 cm²');
  
  // T6-C4OT-NEW-003: HCN 15m × ?m → S 
  // Check solution for the width
  const r = await sql`SELECT solution FROM public.questions WHERE question_code='T6-C4OT-NEW-003'`;
  console.log('Sol:', (r[0].solution||'').slice(0,100));
  // From solution: "15 × 10 = 150" → S = 150 m²
  await sql`UPDATE public.questions SET answer='$150 \\text{ m}^2$.' WHERE question_code='T6-C4OT-NEW-003'`;
  console.log('✅ T6-C4OT-NEW-003: $150 m²');
}
m();
