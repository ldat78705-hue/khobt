const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  for (const code of ['G9-AUTO-0017', 'G9-AUTO-0175']) {
    const rows = await sql`SELECT id, solution, content, answer FROM public.questions WHERE question_code = ${code}`;
    if (rows.length === 0) continue;
    const q = rows[0];
    
    // Check solution for $ balance
    let sol = q.solution || '';
    const solCount = (sol.match(/(?<!\\)\$/g) || []).length;
    if (solCount % 2 !== 0) {
      sol += '$';
      await sql`UPDATE public.questions SET solution = ${sol}, updated_at = NOW() WHERE id = ${q.id}`;
      console.log(`✅ ${code}: Sửa $ lẻ trong solution (${solCount} → ${solCount+1})`);
    }
    
    // Check content
    let cont = q.content || '';
    const contCount = (cont.match(/(?<!\\)\$/g) || []).length;
    if (contCount % 2 !== 0) {
      cont += '$';
      await sql`UPDATE public.questions SET content = ${cont}, updated_at = NOW() WHERE id = ${q.id}`;
      console.log(`✅ ${code}: Sửa $ lẻ trong content (${contCount} → ${contCount+1})`);
    }
    
    // Check answer
    let ans = q.answer || '';
    const ansCount = (ans.match(/(?<!\\)\$/g) || []).length;
    if (ansCount % 2 !== 0) {
      ans += '$';
      await sql`UPDATE public.questions SET answer = ${ans}, updated_at = NOW() WHERE id = ${q.id}`;
      console.log(`✅ ${code}: Sửa $ lẻ trong answer (${ansCount} → ${ansCount+1})`);
    }
  }
}
main().catch(console.error);
