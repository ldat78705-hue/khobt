import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkDatabase() {
  const sql = getDb();
  const allQuestions = await sql`SELECT id, content, question_type, options, correct_answer, category_id, status FROM public.questions`;
  
  console.log(`Total questions: ${allQuestions.length}`);
  
  let emptyContent = 0;
  let invalidMcq = 0; // trac_nghiem but missing options or correct_answer
  let possibleLatexIssues = 0; // contains x^2 or similar but no $ or $$
  
  for (const q of allQuestions) {
    if (!q.content || q.content.trim() === '') {
      emptyContent++;
    }
    
    if (q.question_type === 'trac_nghiem') {
      let hasOptions = false;
      if (q.options) {
        let opts = q.options;
        if (typeof opts === 'string') {
          try { opts = JSON.parse(opts); } catch (e) {}
        }
        if (Array.isArray(opts) && opts.length > 0) hasOptions = true;
      }
      if (!hasOptions || q.correct_answer === null || q.correct_answer === undefined) {
        invalidMcq++;
      }
    }
    
    // simple heuristic for unformatted math: has ^ or _ but no $ or \[
    if (q.content && (q.content.includes('^') || q.content.includes('_'))) {
      if (!q.content.includes('$') && !q.content.includes('\\[')) {
        possibleLatexIssues++;
      }
    }
  }
  
  console.log('--- Health Check Report ---');
  console.log(`Empty content: ${emptyContent}`);
  console.log(`Invalid Multiple Choice Questions (missing options/answers): ${invalidMcq}`);
  console.log(`Possible LaTeX formatting issues: ${possibleLatexIssues}`);
  
  process.exit(0);
}

checkDatabase().catch(console.error);
