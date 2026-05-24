const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function get() { 
  const cats = await sql`SELECT id, name FROM public.categories WHERE grade = 6 AND name LIKE 'Bài %' ORDER BY length(name), name`; 
  cats.forEach(c => {
    const match = c.name.match(/Bài (\d+)/);
    if(match) {
      console.log(`const b${match[1]} = '${c.id}'; // ${c.name}`);
    }
  }); 
} 
get().catch(console.error);
