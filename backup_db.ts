import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";

async function backupDb() {
  const sql = getDb();
  
  console.log("Starting backup of public.questions...");
  const questions = await sql`SELECT * FROM public.questions ORDER BY grade ASC, id ASC`;
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `backup_questions_full_${questions.length}_${timestamp}.json`;
  const filepath = path.join(__dirname, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(questions, null, 2));
  console.log(`Successfully backed up ${questions.length} questions to ${filename}`);
}

backupDb().catch(console.error).finally(() => process.exit(0));
