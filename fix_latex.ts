import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function fixLatexErrors() {
  const sql = getDb();
  
  // Fetch all questions
  const questions = await sql`SELECT id, content, solution, answer FROM public.questions`;
  
  let updatedCount = 0;
  
  for (const q of questions) {
    let changed = false;
    
    let content = q.content || '';
    let solution = q.solution || '';
    let answer = q.answer || '';
    
    // Regex to fix \begin{array}{*{35}{l}} or similar
    const arrayRegex = /\\begin\{array\}\{\*\{\d+\}\{([lcr])\}\}/g;
    
    if (arrayRegex.test(content)) {
      content = content.replace(arrayRegex, '\\begin{array}{$1}');
      changed = true;
    }
    
    if (arrayRegex.test(solution)) {
      solution = solution.replace(arrayRegex, '\\begin{array}{$1}');
      changed = true;
    }
    
    if (arrayRegex.test(answer)) {
      answer = answer.replace(arrayRegex, '\\begin{array}{$1}');
      changed = true;
    }
    
    // Also sometimes it's just \left\{ \begin{array}{l} ... \end{array} \right.
    // That's valid KaTeX. The issue is strictly the *{35}{l} syntax which MathType exports.
    
    if (changed) {
      await sql`
        UPDATE public.questions 
        SET content = ${content}, solution = ${solution}, answer = ${answer}
        WHERE id = ${q.id}
      `;
      updatedCount++;
    }
  }
  
  console.log(`Fixed LaTeX errors in ${updatedCount} questions.`);
  process.exit(0);
}

fixLatexErrors().catch(console.error);
