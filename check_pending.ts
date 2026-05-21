import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";

async function checkPending() {
  const sql = getDb();
  
  const pending = await sql`
    SELECT id, grade, content, solution, status
    FROM public.questions 
    WHERE status = 'pending'
    LIMIT 20;
  `;
  console.log("Pending count:", pending.length);
  
  fs.writeFileSync("pending_dump.json", JSON.stringify(pending, null, 2));
}

checkPending().catch(console.error).finally(() => process.exit(0));
