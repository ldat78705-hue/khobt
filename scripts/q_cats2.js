const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function get() { 
  const cats = await sql`SELECT id, name FROM public.categories WHERE grade = 9 AND name LIKE 'Bài 2%' ORDER BY sort_order`; 
  cats.forEach(c => console.log(`[${c.id}] ${c.name}`)); 
  
  const cats2 = await sql`SELECT id, name FROM public.categories WHERE grade = 9 AND name LIKE 'Bài 3%' ORDER BY sort_order`; 
  cats2.forEach(c => console.log(`[${c.id}] ${c.name}`)); 
} 
get().catch(console.error);
