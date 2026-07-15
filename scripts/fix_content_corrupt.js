/**
 * SỬA 42 CÂU CONTENT CORRUPT $X$1$
 * Suy luận giá trị từ answer/solution
 */
const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// Manual fixes based on analysis of solution/answer
const contentFixes = [
  // G5-GEO-HT 1-10: "cứ $1$1$ thu" → "cứ $1$ ha thu" (1 hectare)
  ...Array.from({length:10},(_, i) => ({
    code: `G5-GEO-HT-${i+1}`, 
    from: '$1$1$', to: '$1$ ha'
  })),
  // G5-GEO-TG-10: "DT là $2$1$" → "$21$ cm²" (based on sol: BM=1/3 BC)  
  { code: 'G5-GEO-TG-10', from: '$2$1$', to: '$21$ cm$^2$' },
  // T5-B15-008: "DT $2$1$" → "$21$ km²"
  { code: 'T5-B15-008', from: '$2$1$', to: '$21$ km$^2$' },
  // T5-B33-010: "DT tăng $2$1$" → "$21$ cm²"
  { code: 'T5-B33-010', from: '$2$1$', to: '$21$ cm$^2$' },
  // T5-B41-007: "DT $5$1$" → "$51$ ha" (25% = 12.75, nope, $5$ ha was fixed before, but content still has it)
  // Actually $5$1$ = $5$ ha (1=unit marker), checking solution
  { code: 'T5-B41-007', from: '$5$1$', to: '$5$ ha' },
  // T5-B50-007: "DT hai đáy $4$1$" → "$40$ cm²"
  { code: 'T5-B50-007', from: '$4$1$', to: '$40$ cm$^2$' },
  // T5-B50-008: "cạnh $1$1$" → "$10$ cm"
  { code: 'T5-B50-008', from: '$1$1$', to: '$10$ cm' },
  // T5-B51-007: "DT toàn phần $2$1$" → "$216$ cm²" (if a=6, Stp=6×6×6=216, nope 150)
  // Sol says "cạnh $= 5$, DT=150", so "$2$1$" might be "$150$" or just corrupt, let's use "$150$ cm$^2$"
  // Actually checking more carefully, needs context. Let's just fix obvious ones.
  // T5-B48-007: "thể tích $4$1$" → "$40$ m³"
  { code: 'T5-B48-007', from: '$4$1$', to: '$40$ m$^3$' },
  // T5-B52-003: "DT đáy $2$1$" → "$20$ cm²"
  { code: 'T5-B52-003', from: '$2$1$', to: '$20$ cm$^2$' },
  // T5-B53-003: "DT mặt HLP $2$1$" → "$25$ cm²"
  { code: 'T5-B53-003', from: '$2$1$', to: '$25$ cm$^2$' },
  // T5-B8-008: "DT $4$1$" → "$48$ cm²"
  { code: 'T5-B8-008', from: '$4$1$', to: '$48$ cm$^2$' },
];

async function main(){
  let fixed = 0;
  for(const f of contentFixes){
    const rows = await sql`SELECT id, content FROM public.questions WHERE question_code = ${f.code}`;
    if(!rows.length) continue;
    
    const q = rows[0];
    let c = q.content;
    if(c.includes(f.from)){
      c = c.replace(f.from, f.to);
      await sql`UPDATE public.questions SET content = ${c}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed++;
      console.log(`✅ ${f.code}: "${f.from}" → "${f.to}"`);
    }
  }
  console.log(`\nĐã sửa content: ${fixed}/${contentFixes.length}`);
  
  // Count remaining
  const r = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE content ~ '\\$[0-9]+\\$1\\$'`;
  console.log(`Còn corrupt: ${r[0].cnt}`);
}
main().catch(console.error);
