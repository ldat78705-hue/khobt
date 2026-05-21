import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function getBatch63() {
  const sql = getDb();
  
  const questions = await sql`
    SELECT id, content 
    FROM public.questions 
    WHERE grade = 7 
      AND solution LIKE '%Phương pháp giải cơ bản:%'
    ORDER BY id ASC
    LIMIT 10;
  `;
  
  console.log(JSON.stringify(questions, null, 2));
}

getBatch63().catch(console.error).finally(() => process.exit(0));
