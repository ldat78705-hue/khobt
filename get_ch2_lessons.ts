import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getCh2Lessons() {
  const chapters = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 9 AND parent_id IS NULL
    ORDER BY sort_order
  `;
  
  if (chapters.length > 1) {
    const chapter2 = chapters[1];
    console.log("CHƯƠNG 2:", chapter2);

    const lessons = await sql`
      SELECT id, name FROM public.categories 
      WHERE parent_id = ${chapter2.id}
      ORDER BY sort_order
    `;
    console.log("CÁC BÀI HỌC:", lessons);
  }
}

getCh2Lessons().catch(console.error);
