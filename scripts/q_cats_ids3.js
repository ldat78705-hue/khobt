const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function get() { 
  const cats = await sql`SELECT id, name FROM public.categories WHERE grade = 8 AND name LIKE 'Bài 1%' OR name LIKE 'Bài 2%'`; 
  cats.forEach(c => {
    console.log(`[${c.id}] ${c.name}`);
  }); 
} 
get().catch(console.error);
