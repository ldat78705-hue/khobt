import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkGrade7Count() {
  const sql = getDb();
  
  const count = await sql`
    SELECT count(*) 
    FROM public.questions 
    WHERE grade = 7 
      AND solution LIKE '%Phương pháp giải cơ bản:%';
  `;
  
  console.log(`Remaining Grade 7 questions with placeholder: ${count[0].count}`);
}

checkGrade7Count().catch(console.error).finally(() => process.exit(0));
