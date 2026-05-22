import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getCh4Lessons() {
  const chapters = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 9 AND parent_id IS NULL
    ORDER BY sort_order
  `;
  
  if (chapters.length > 3) {
    const chapter4 = chapters[3];
    console.log("CHƯƠNG 4:", chapter4);

    const lessons = await sql`
      SELECT id, name FROM public.categories 
      WHERE parent_id = ${chapter4.id}
      ORDER BY sort_order
    `;
    console.log("CÁC BÀI HỌC:", lessons);
  }
}

getCh4Lessons().catch(console.error);
