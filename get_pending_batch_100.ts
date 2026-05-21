import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";

async function getPending100() {
  const sql = getDb();
  
  const pending = await sql`
    SELECT id, grade, content, solution, status
    FROM public.questions 
    WHERE status = 'pending'
    ORDER BY id ASC
    LIMIT 100;
  `;
  console.log("Pending count fetched:", pending.length);
  
  fs.writeFileSync("pending_batch100_dump.json", JSON.stringify(pending, null, 2));
}

getPending100().catch(console.error).finally(() => process.exit(0));
