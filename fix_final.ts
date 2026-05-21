import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function fixFinal() {
  const sql = getDb();

  const fixes = [
    {
      id: "3b5d761d-86d1-4240-9393-f36087519412",
      solution: "Ta có: $1$ km $= 1000$ m. Do đó $5$ km $= 5000$ m.\n$5$ km $300$ m $= 5000$ m $+ 300$ m $= 5300$ m.\nVậy số thích hợp điền vào chỗ trống là $5300$."
    },
    {
      id: "9be9eea9-7016-4e85-8544-dcb89d64351f",
      solution: "Ta thực hiện phép tính nhân:\n$125 \\times 8 = 1000$.\nKết quả là $1000$."
    },
    {
      id: "02a5d040-2a92-4049-9007-daa74e797200",
      solution: "Để tính $75\\%$ của $240$, ta lấy $240$ nhân với $75$ rồi chia cho $100$ (hoặc lấy $240$ nhân với $\\frac{75}{100}$):\n$240 \\times \\frac{75}{100} = 240 \\times \\frac{3}{4} = 180$.\nVậy $75\\%$ của $240$ là $180$."
    },
    {
      id: "3bd22f8f-c060-458b-a3be-551b8780d398",
      solution: "Ta thực hiện phép tính nhân số thập phân:\n$2,5 \\times 0,4 = 1,00 = 1$.\nKết quả là $1$."
    }
  ];

  for (const item of fixes) {
    await sql`
      UPDATE public.questions 
      SET solution = ${item.solution}, status = 'approved', updated_at = NOW() 
      WHERE id = ${item.id};
    `;
    console.log(`Fixed G4/5 ID: ${item.id}`);
  }

  // And approve the draft
  await sql`
    UPDATE public.questions 
    SET status = 'approved', updated_at = NOW() 
    WHERE id = '92d57671-2460-4447-af43-d2a3bccf533e';
  `;
  console.log("Approved draft ID: 92d57671-2460-4447-af43-d2a3bccf533e");
}

fixFinal().catch(console.error).finally(() => process.exit(0));
