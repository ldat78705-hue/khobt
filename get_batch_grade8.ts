import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";

async function getBatchGrade8() {
  const sql = getDb();
  
  const questions = await sql`
    SELECT id, content, solution 
    FROM public.questions 
    WHERE grade = 8 
      AND solution LIKE '%Phương pháp giải cơ bản:%'
    ORDER BY id ASC
    LIMIT 10;
  `;
  
  fs.writeFileSync("grade8_batch1_dump.json", JSON.stringify(questions, null, 2));
  console.log(`Dumped ${questions.length} questions to grade8_batch1_dump.json`);
}

getBatchGrade8().catch(console.error).finally(() => process.exit(0));
