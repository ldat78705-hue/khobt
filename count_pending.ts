import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkPending() {
  const sql = getDb();
  
  const pending = await sql`
    SELECT COUNT(*) as total
    FROM public.questions 
    WHERE status = 'pending'
  `;
  console.log("Pending count:", pending[0]);
}

checkPending().catch(console.error).finally(() => process.exit(0));
