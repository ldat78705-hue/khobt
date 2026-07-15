const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const fixes = [
  // T5-B51-007: Stp=216 → cạnh=6, Stp="$216$" 
  { code:'T5-B51-007', from:'$2$1$', to:'$216 \\text{ cm}^2$' },
  // T5-B51-008: rubik Stp=54, "$5$1$" → "$54 \\text{ cm}^2$"
  { code:'T5-B51-008', from:'$5$1$', to:'$54 \\text{ cm}^2$' },
  // T5-B52-005: V=120, "$1$1$" → "$120 \\text{ cm}^3$"
  { code:'T5-B52-005', from:'$1$1$', to:'$120 \\text{ cm}^3$' },
  // T5-B52-007: V=1200, "$1\\,$2$1$" → "$1\\,200 \\text{ cm}^3$"
  { code:'T5-B52-007', from:'$1\\,$2$1$', to:'$1\\,200 \\text{ cm}^3$' },
  // T5-B55-005: V=240, "$2$1$" → "$240 \\text{ dm}^3$"
  { code:'T5-B55-005', from:'$2$1$', to:'$240 \\text{ dm}^3$' },
  // T5-B46-005: 3000 cm³, "$3\\,$0$1$" → "$3\\,000 \\text{ cm}^3$"
  { code:'T5-B46-005', from:'$3\\,$0$1$', to:'$3\\,000 \\text{ cm}^3$' },
  // T5-B46-008: "$3$1$" → "$300 \\text{ cm}^3$"
  { code:'T5-B46-008', from:'$3$1$', to:'$300 \\text{ cm}^3$' },
  // T5-B46-010: "$7$1$" → "$750 \\text{ cm}^3$"
  { code:'T5-B46-010', from:'$7$1$', to:'$750 \\text{ cm}^3$' },
  // T5-B47-009: "$5$1$" → "$500 \\text{ dm}^3$"
  { code:'T5-B47-009', from:'$5$1$', to:'$500 \\text{ dm}^3$' },
  // T5-B48-002: "$4\\,$5$1$" → "$4\\,500 \\text{ cm}^3$"
  { code:'T5-B48-002', from:'$4\\,$5$1$', to:'$4\\,500 \\text{ cm}^3$' },
  // T5-B48-009: "$4,$1$" → "$4{,}5 \\text{ dm}^3$" and "$4$1$" → "$4\\,500 \\text{ cm}^3$"
  // Complex - skip for now  
  // T5-B48-010: "$2\\,$0$1$" → "$2\\,000 \\text{ cm}^3$" and "$2$1" → need context
  { code:'T5-B48-010', from:'$2\\,$0$1$', to:'$2\\,000 \\text{ cm}^3$' },
  // T5-B72-003: "$5$1$" → "$500 \\text{ cm}^2$"
  { code:'T5-B72-003', from:'$5$1$', to:'$500 \\text{ cm}^2$' },
  // T5-B72-007: "$45\\,$0$1$" → "$45\\,000 \\text{ cm}^3$"
  { code:'T5-B72-007', from:'$45\\,$0$1$', to:'$45\\,000 \\text{ cm}^3$' },
  // Q81728: "DT đáy $2$1$" → "$20 \\text{ cm}^2$"
  { code:'Q81728', from:'$2$1$', to:'$20 \\text{ cm}^2$' },
  // Q93515: "DT tăng $4$1$" → "$40 \\text{ m}^2$" (nope, need context, let's check sol)
  // Sol: tăng dài 3m, tăng rộng 2m, DT tăng = 3y + 2x + 6 - wait, complex
  // T9-LPT-04: "DT $2$1$" → "$240 \\text{ m}^2$" (sol says 240/x)
  { code:'T9-LPT-04', from:'$2$1$', to:'$240 \\text{ m}^2$' },
  // T9-TTC-08: "V $3$1$" → "$32 \\text{ m}^3$" (sol: x²h = 32)
  { code:'T9-TTC-08', from:'$3$1$', to:'$32 \\text{ m}^3$' },
];

async function main(){
  let fixed = 0;
  for(const f of fixes){
    const rows = await sql`SELECT id, content FROM public.questions WHERE question_code = ${f.code}`;
    if(!rows.length){ console.log(`⚠️ ${f.code}: not found`); continue; }
    let c = rows[0].content;
    if(c.includes(f.from)){
      c = c.replace(f.from, f.to);
      await sql`UPDATE public.questions SET content = ${c}, updated_at = NOW() WHERE id = ${rows[0].id}`;
      fixed++;
      console.log(`✅ ${f.code}: "${f.from}" → "${f.to}"`);
    } else {
      console.log(`ℹ️ ${f.code}: pattern not found`);
    }
  }
  
  console.log(`\nĐã sửa: ${fixed}`);
  const r = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE content ~ '\\$[0-9]+\\$1\\$'`;
  console.log(`Còn corrupt: ${r[0].cnt}`);
}
main().catch(console.error);
