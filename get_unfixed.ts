import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function getUnfixed() {
  const sql = getDb();
  
  const unfixed = await sql`
    SELECT id, grade, content, solution, status
    FROM public.questions 
    WHERE solution LIKE '%Phương pháp giải cơ bản%'
    ORDER BY grade ASC, id ASC;
  `;
  
  console.log("Unfixed count:", unfixed.length);
  const fs = require('fs');
  fs.writeFileSync("unfixed_g45.json", JSON.stringify(unfixed, null, 2));
}

getUnfixed().catch(console.error).finally(() => process.exit(0));
