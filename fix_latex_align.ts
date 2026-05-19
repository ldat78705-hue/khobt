import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function fixLatexAlign() {
  const sql = getDb();
  
  const questions = await sql`SELECT id, content, solution, answer FROM public.questions`;
  
  let updatedCount = 0;
  
  for (const q of questions) {
    let changed = false;
    
    let content = q.content || '';
    let solution = q.solution || '';
    let answer = q.answer || '';
    
    const fixAlign = (text: string) => {
      // Replace align with aligned, but only if they are not already aligned
      // e.g., \begin{align} -> \begin{aligned}
      return text.replace(/\\begin\{align\}/g, '\\begin{aligned}')
                 .replace(/\\end\{align\}/g, '\\end{aligned}');
    };
    
    const newContent = fixAlign(content);
    if (newContent !== content) { content = newContent; changed = true; }
    
    const newSolution = fixAlign(solution);
    if (newSolution !== solution) { solution = newSolution; changed = true; }
    
    const newAnswer = fixAlign(answer);
    if (newAnswer !== answer) { answer = newAnswer; changed = true; }
    
    if (changed) {
      await sql`
        UPDATE public.questions 
        SET content = ${content}, solution = ${solution}, answer = ${answer}
        WHERE id = ${q.id}
      `;
      updatedCount++;
    }
  }
  
  console.log(`Fixed LaTeX align errors in ${updatedCount} questions.`);
  process.exit(0);
}

fixLatexAlign().catch(console.error);
