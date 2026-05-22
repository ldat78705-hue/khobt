import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getCh3Lessons() {
  const chapters = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 9 AND parent_id IS NULL
    ORDER BY sort_order
  `;
  
  if (chapters.length > 2) {
    const chapter3 = chapters[2];
    console.log("CHƯƠNG 3:", chapter3);

    const lessons = await sql`
      SELECT id, name FROM public.categories 
      WHERE parent_id = ${chapter3.id}
      ORDER BY sort_order
    `;
    console.log("CÁC BÀI HỌC:", lessons);
  }
}

getCh3Lessons().catch(console.error);
