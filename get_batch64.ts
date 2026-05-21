import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";

async function getBatch64() {
  const sql = getDb();
  
  const questions = await sql`
    SELECT id, content, solution 
    FROM public.questions 
    WHERE grade = 7 
      AND solution LIKE '%Phương pháp giải cơ bản:%'
    ORDER BY id ASC
    LIMIT 10;
  `;
  
  fs.writeFileSync("grade7_batch64_dump.json", JSON.stringify(questions, null, 2));
  console.log(`Dumped ${questions.length} questions to grade7_batch64_dump.json`);
}

getBatch64().catch(console.error).finally(() => process.exit(0));
