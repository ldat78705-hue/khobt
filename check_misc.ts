import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkMisc() {
  const sql = getDb();
  const drafts = await sql`SELECT id, grade, content, solution, status FROM public.questions WHERE status = 'draft'`;
  console.log("Draft:", JSON.stringify(drafts, null, 2));

  const g4 = await sql`SELECT id, grade, content, solution, status FROM public.questions WHERE grade = 4 LIMIT 2`;
  console.log("Grade 4 sample:", JSON.stringify(g4, null, 2));

  const g5 = await sql`SELECT id, grade, content, solution, status FROM public.questions WHERE grade = 5 LIMIT 2`;
  console.log("Grade 5 sample:", JSON.stringify(g5, null, 2));
}

checkMisc().catch(console.error).finally(() => process.exit(0));
