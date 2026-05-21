import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function getGrade7Count() {
  const sql = getDb();
  const countResult = await sql`
    SELECT COUNT(*) FROM public.questions WHERE grade = 7;
  `;
  console.log(`Total Grade 7 questions: ${countResult[0].count}`);
}

getGrade7Count().catch(console.error).finally(() => process.exit(0));
