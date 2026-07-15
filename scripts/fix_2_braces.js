const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  for (const code of ['G9-AUTO-0044', 'G9-AUTO-0166']) {
    const rows = await sql`SELECT solution FROM public.questions WHERE question_code = ${code}`;
    if (rows.length > 0) {
      let sol = rows[0].solution;
      // Find first unmatched }
      let depth = 0;
      let fixedSol = '';
      for (const ch of sol) {
        if (ch === '{') depth++;
        if (ch === '}') {
          if (depth <= 0) continue; // skip unmatched }
          depth--;
        }
        fixedSol += ch;
      }
      // Add missing closing braces
      fixedSol += '}'.repeat(depth);
      
      if (fixedSol !== sol) {
        await sql`UPDATE public.questions SET solution = ${fixedSol}, updated_at = NOW() WHERE question_code = ${code}`;
        console.log(`✅ ${code}: Đã sửa {} không cân`);
      } else {
        console.log(`ℹ️ ${code}: Không cần sửa`);
      }
    }
  }
}
main().catch(console.error);
