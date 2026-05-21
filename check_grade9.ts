import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkGrade9() {
  const sql = getDb();
  const q9 = await sql`SELECT id, content, solution, status FROM public.questions WHERE grade = 9 LIMIT 5`;
  console.log("Sample Grade 9:", JSON.stringify(q9, null, 2));
}

checkGrade9().catch(console.error).finally(() => process.exit(0));
