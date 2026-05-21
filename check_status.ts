import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkStatus() {
  const sql = getDb();
  const statuses = await sql`SELECT status, COUNT(*) FROM public.questions GROUP BY status`;
  console.log(statuses);
}

checkStatus().catch(console.error).finally(() => process.exit(0));
