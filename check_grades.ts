import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function check() {
  const sql = getDb();
  const res = await sql`
    SELECT grade, count(*) 
    FROM public.questions 
    WHERE solution LIKE '%Phương pháp giải cơ bản:%'
    GROUP BY grade;
  `;
  console.log("Unfixed questions by grade:");
  console.log(res);

  const res2 = await sql`
    SELECT grade, count(*) 
    FROM public.questions 
    GROUP BY grade;
  `;
  console.log("Total questions by grade:");
  console.log(res2);
}

check().catch(console.error).finally(() => process.exit(0));
