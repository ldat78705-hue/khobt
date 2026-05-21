import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkSchema() {
  const sql = getDb();
  
  const cols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'questions'
  `;
  console.log("Columns:", cols);

  const unfixed = await sql`
    SELECT id, grade, content, solution 
    FROM public.questions 
    WHERE solution LIKE '%Phương pháp giải cơ bản:%'
  `;
  console.log("Unfixed count:", unfixed.length);
  if (unfixed.length > 0) {
    console.log("Sample:", unfixed[0]);
  }
}

checkSchema().catch(console.error).finally(() => process.exit(0));
