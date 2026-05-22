import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getChapters() {
  const chapters = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 9 AND parent_id IS NULL
    ORDER BY sort_order
  `;
  
  if (chapters.length > 0) {
    const chapter1 = chapters[0];
    console.log("CHƯƠNG 1:", chapter1);

    const lessons = await sql`
      SELECT id, name FROM public.categories 
      WHERE parent_id = ${chapter1.id}
      ORDER BY sort_order
    `;
    console.log("CÁC BÀI HỌC:", lessons);
  }
}

getChapters().catch(console.error);
