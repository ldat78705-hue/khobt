import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getLesson2() {
  const chapter1 = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 9 AND parent_id IS NULL AND name ILIKE '%phương trình%' 
    ORDER BY sort_order LIMIT 1
  `;
  
  if (chapter1.length > 0) {
    const lessons = await sql`
      SELECT id, name FROM public.categories 
      WHERE parent_id = ${chapter1[0].id}
      ORDER BY sort_order
    `;
    console.log(lessons);
  }
}

getLesson2().catch(console.error);
