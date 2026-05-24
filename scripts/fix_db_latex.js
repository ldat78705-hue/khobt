const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const questions = await sql`SELECT id, content, options, solution FROM public.questions WHERE content LIKE '%\\text{ cm}%' OR content LIKE '%\\times 100 là%' OR content LIKE '%\\dfrac{%'`;

  let updateCount = 0;

  for (const q of questions) {
    let changed = false;
    let content = q.content;
    let options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
    let solution = q.solution;

    // Fix \text{ cm} -> $\text{ cm}$ if not already wrapped
    const fixString = (str) => {
      if (!str) return str;
      let newStr = str;
      // Fix \text{ cm} pattern
      newStr = newStr.replace(/(\d+)\s*\\text\{\s*cm\}/g, '$$$1 \\text{ cm}$$');
      newStr = newStr.replace(/(\d+)\s*\\text\{\s*cm\}\^3/g, '$$$1 \\text{ cm}^3$$');
      
      // Fix \times 100
      newStr = newStr.replace(/(\d+)\s*\\times\s*100\s*là/g, '$$$1 \\times 100$$ là');
      
      // Fix orphaned \dfrac without $
      // Only wrap if it's not inside $ already
      if (newStr.includes('\\dfrac') && !newStr.includes('$')) {
        newStr = newStr.replace(/\\dfrac\{([^}]+)\}\{([^}]+)\}/g, '$$\\dfrac{$1}{$2}$$');
      }

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

  console.log(`Đã sửa lỗi hiển thị LaTeX cho ${updateCount} câu hỏi.`);
}

main().catch(console.error);
