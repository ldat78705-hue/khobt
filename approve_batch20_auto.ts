import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";

async function approveBatch20Auto() {
  const sql = getDb();
  
  const data = JSON.parse(fs.readFileSync("pending_batch20_dump.json", "utf8"));
  
  for (const item of data) {
    let sol = item.solution;
    
    // Fix the scratchpad text in ID 1a294347-9569-4607-9dec-37334c6bebfb
    if (item.id === "1a294347-9569-4607-9dec-37334c6bebfb") {
      sol = `**Phương pháp giải:**\n` +
`Đặt ẩn phụ để đưa về phương trình bậc hai đơn giản hơn.\n\n` +
`**Cách giải:**\n` +
`Ta có phương trình: $x(4x - 1)^2(2x - 1) = 9$.\n` +
`Nhân hai vế với $8$, ta được:\n` +
`$8x(4x - 1)^2(2x - 1) = 72$\n` +
`$\\Leftrightarrow 4x(2x - 1)(4x - 1)^2 = 72$\n` +
`$\\Leftrightarrow (8x^2 - 4x)(16x^2 - 8x + 1) = 72$\n\n` +
`Đặt $y = 8x^2 - 4x$. Khi đó $16x^2 - 8x + 1 = 2(8x^2 - 4x) + 1 = 2y + 1$.\n` +
`Phương trình trở thành:\n` +
`$y(2y + 1) = 72$\n` +
`$\\Leftrightarrow 2y^2 + y - 72 = 0$\n` +
`Dùng công thức nghiệm hoặc phân tích thành nhân tử (không dễ nhẩm nên ta dùng cách đặt ẩn phụ khác tối ưu hơn).\n\n` +
`**Cách đặt ẩn phụ tối ưu:**\n` +
`Đặt $y = 2x^2 - x \\Rightarrow x(2x - 1) = y$.\n` +
`Khi đó $(4x - 1)^2 = 16x^2 - 8x + 1 = 8(2x^2 - x) + 1 = 8y + 1$.\n` +
`Phương trình trở thành: $y(8y + 1) = 9$\n` +
`$\\Leftrightarrow 8y^2 + y - 9 = 0 \\Leftrightarrow (y - 1)(8y + 9) = 0$\n` +
`$\\Rightarrow y = 1$ hoặc $y = -\\frac{9}{8}$.\n\n` +
`**Trường hợp 1:** $y = 1 \\Rightarrow 2x^2 - x - 1 = 0$\n` +
`$\\Leftrightarrow (2x + 1)(x - 1) = 0 \\Rightarrow x = 1$ hoặc $x = -\\frac{1}{2}$.\n\n` +
`**Trường hợp 2:** $y = -\\frac{9}{8} \\Rightarrow 2x^2 - x + \\frac{9}{8} = 0$\n` +
`$\\Leftrightarrow 16x^2 - 8x + 9 = 0 \\Leftrightarrow (4x - 1)^2 + 8 = 0$ (Vô nghiệm vì biểu thức luôn $\\ge 8 > 0$).\n\n` +
`**Kết luận:** Tập nghiệm của phương trình là $S = \\left\\{ 1; -\\frac{1}{2} \\right\\}$.`;
    }
    
    await sql`
      UPDATE public.questions 
      SET solution = ${sol}, status = 'approved', updated_at = NOW() 
      WHERE id = ${item.id};
    `;
    console.log(`Approved ID: ${item.id}`);
  }
}

approveBatch20Auto().catch(console.error).finally(() => process.exit(0));
