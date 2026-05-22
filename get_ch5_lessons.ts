import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getCh5Lessons() {
  const chapters = await sql`
    SELECT id, name FROM public.categories 
    WHERE grade = 9 AND parent_id IS NULL
    ORDER BY sort_order
  `;
  
  if (chapters.length > 4) {
    const chapter5 = chapters[4];
    console.log("CHƯƠNG 5:", chapter5);

    const lessons = await sql`
      SELECT id, name FROM public.categories 
      WHERE parent_id = ${chapter5.id}
      ORDER BY sort_order
    `;
    console.log("CÁC BÀI HỌC:", lessons);
  } else {
      console.log("Không tìm thấy chương 5", chapters);
  }
}

getCh5Lessons().catch(console.error);
