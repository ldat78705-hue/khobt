const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`SELECT id, name, parent_id, sort_order FROM public.categories WHERE grade = 9`;
  // Build tree
  const parents = cats.filter(c => !c.parent_id).sort((a,b) => a.sort_order - b.sort_order);
  const children = cats.filter(c => c.parent_id);
  
  for (const p of parents) {
    console.log(`\n[${p.id}] ${p.name}`);
    const pChildren = children.filter(c => c.parent_id === p.id).sort((a,b) => a.sort_order - b.sort_order);
    for (const c of pChildren) {
      console.log(`   - [${c.id}] ${c.name}`);
    }
  }
}
main().catch(console.error);
