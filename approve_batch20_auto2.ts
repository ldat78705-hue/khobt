import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";

async function approveBatch20Auto2() {
  const sql = getDb();
  
  const data = JSON.parse(fs.readFileSync("pending_batch20_dump.json", "utf8"));
  
  for (const item of data) {
    await sql`
      UPDATE public.questions 
      SET status = 'approved', updated_at = NOW() 
      WHERE id = ${item.id};
    `;
    console.log(`Approved ID: ${item.id}`);
  }
}

approveBatch20Auto2().catch(console.error).finally(() => process.exit(0));
