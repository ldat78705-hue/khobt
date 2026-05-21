const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  // Lấy 15 danh mục trống đầu tiên (ưu tiên xen kẽ G4/G5)
  const cats = await sql`
    SELECT c.id, c.name, c.grade, p.name as parent_name
    FROM public.categories c
    LEFT JOIN public.categories p ON c.parent_id = p.id
    WHERE c.parent_id IS NOT NULL
      AND c.grade IN (4, 5)
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0
      AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id = c.id) = 0
    ORDER BY c.grade, c.sort_order, c.name
    LIMIT 15`;
  for (const r of cats) {
    console.log(`'${r.id}', // G${r.grade} - ${r.name}`);
  }
}
main().catch(console.error);
