const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const qs = await sql`SELECT id, options FROM public.questions WHERE options::text LIKE '%\\sqrt%' OR options::text LIKE '%\\dfrac%'`;
  let updated = 0;
  for (const q of qs) {
    let changed = false;
    let ops = q.options;
    if (typeof ops === 'string') {
      try { ops = JSON.parse(ops); } catch(e){}
    }
    
    if (Array.isArray(ops)) {
      for (let o of ops) {
        if (o && o.value && typeof o.value === 'string') {
          if ((o.value.includes('\\sqrt') || o.value.includes('\\dfrac')) && !o.value.includes('$')) {
            o.value = `$${o.value}$`;
            changed = true;
          }
        }
      }
    }
    
    if (changed) {
      await sql`UPDATE public.questions SET options = ${JSON.stringify(ops)}::jsonb WHERE id = ${q.id}`;
      updated++;
    }
  }
  console.log(`Đã sửa lỗi LaTeX cho ${updated} câu hỏi.`);
}

main().catch(console.error);
