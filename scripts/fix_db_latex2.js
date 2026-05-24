const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const questions = await sql`SELECT id, content, options, solution FROM public.questions WHERE content LIKE '%\\text{ cm}%' OR content LIKE '%\\times 100%' OR content LIKE '%\\text{ dm}%'`;

  let updateCount = 0;

  for (const q of questions) {
    let changed = false;
    let content = q.content;
    let options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    let solution = q.solution;

    const fixString = (str) => {
      if (!str) return str;
      let newStr = str;
      
      // Fix: $R = $5 \text{ cm}$ -> $R = 5 \text{ cm}$
      newStr = newStr.replace(/=\s*\$(\d+)\s*\\text\{\s*cm\}\$/g, '= $1 \\text{ cm}$');
      newStr = newStr.replace(/=\s*\$(\d+)\s*\\text\{\s*cm\}\^\d+\$/g, '= $1 \\text{ cm}$'); // if there's ^2 or ^3

      // Fix: $1 \text{ cm}$^2$ -> $1 \text{ cm}^2$
      newStr = newStr.replace(/\$(\d+)\s*\\text\{\s*cm\}\$\^(\d+)\$/g, '$$$1 \\text{ cm}^$2$$');
      
      // Fix: $AB = $6 \text{ cm}$ -> $AB = 6 \text{ cm}$
      // This is caught by the first regex if it's `= $6 \text{ cm}$`

      // Fix: $7\, $200 \text{ cm}$^2$ -> $7\, 200 \text{ cm}^2$
      newStr = newStr.replace(/\,\s*\$(\d+)\s*\\text\{\s*cm\}\$\^(\d+)\$/g, ', $1 \\text{ cm}^$2$');
      
      // Fix: R = $5 \text{ cm}$ (without starting $)
      // Actually R = $5 \text{ cm}$ is fine because it renders "R = " as text, then math "5 cm". 
      // BUT if it was $R = 5 \text{ cm}$ it's better.

      // Any remaining $...$ inside $...$ like $... $X \text{ cm}$ ...$
      // We can just strip the inner $ if it's right before a number and \text{ cm}
      newStr = newStr.replace(/\$([^$]*)=\s*\$(\d+)\s*\\text\{\s*cm\}\$/g, '$$$1= $2 \\text{ cm}$$');

      // Cleanup double $$ 
      newStr = newStr.replace(/\$\$/g, '$');
      return newStr;
    };

    const newContent = fixString(content);
    if (newContent !== content) changed = true;

    const newSolution = fixString(solution);
    if (newSolution !== solution) changed = true;

    const newOptions = options ? options.map(o => {
      const fixedValue = fixString(o.value);
      if (fixedValue !== o.value) changed = true;
      return { ...o, value: fixedValue };
    }) : options;

    if (changed) {
      await sql`
        UPDATE public.questions 
        SET content = ${newContent}, 
            solution = ${newSolution}, 
            options = ${JSON.stringify(newOptions)}::jsonb
        WHERE id = ${q.id}
      `;
      updateCount++;
    }
  }

  console.log(`Đã sửa phục hồi lỗi LaTeX cho ${updateCount} câu hỏi.`);
}

main().catch(console.error);
