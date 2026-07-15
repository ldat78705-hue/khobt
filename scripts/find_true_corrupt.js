const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // Find TRUE corrupted content: "$2$1$", "$4$1$" etc (digit followed by $1$)
  const qs = await sql`
    SELECT id, question_code, content, answer, solution, grade FROM public.questions
    WHERE content ~ '\\$[0-9]+\\$1\\$'
    ORDER BY grade, question_code
  `;
  
  console.log(`Content truly corrupted ($X$1$): ${qs.length}\n`);
  
  for(const q of qs){
    const c = q.content||'';
    // Find the corruption pattern and context
    const match = c.match(/\$(\d+)\$1\$/);
    if(match){
      const idx = c.indexOf(match[0]);
      const ctx = c.substring(Math.max(0,idx-20), Math.min(c.length,idx+30));
      console.log(`[${q.question_code}] L${q.grade}: ...${ctx}...`);
    }
  }
  
  // Also check "$X,$1$" pattern
  const qs2 = await sql`
    SELECT id, question_code, content FROM public.questions
    WHERE content ~ '\\$[0-9]+,\\$1\\$' OR content ~ '\\$[0-9]+\\\\,\\$1\\$'
    ORDER BY grade
  `;
  console.log(`\nContent "$X,$1$" corrupted: ${qs2.length}`);
  for(const q of qs2){
    const c = q.content||'';
    const match = c.match(/\$(\d+)[,\\,]+\$1\$/);
    if(match){
      const idx = c.indexOf(match[0]);
      const ctx = c.substring(Math.max(0,idx-20), Math.min(c.length,idx+30));
      console.log(`[${q.question_code}] L${q.grade}: ...${ctx}...`);
    }
  }
}
main().catch(console.error);
