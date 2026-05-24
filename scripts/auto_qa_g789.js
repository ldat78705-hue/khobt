const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function normalizeLatexAndText(text) {
  if (!text) return text;
  let newText = text;
  // Change \frac to \dfrac for better readability in math
  newText = newText.replace(/\\frac{/g, '\\dfrac{');
  
  // Fix unit spacing (e.g., 5cm -> 5 cm, 10kg -> 10 kg)
  newText = newText.replace(/(\d)(cm|m|dm|mm|kg|g|l|ml)\b/g, '$1 $2');
  newText = newText.replace(/(\d)(cm2|m2|dm2|mm2)\b/g, '$1 $2');

  // Expand short solutions (only if it's really short and just contains an equation)
  if (newText.length < 50 && newText.includes('=')) {
    newText = 'Thực hiện phép tính theo yêu cầu bài toán:\n' + newText + '\n\nNhư vậy, kết quả chính xác của phép tính là đáp án đã cho.';
  }

  return newText;
}

async function main() {
  console.log('Fetching questions for Grades 7, 8, 9...');
  const questions = await sql`SELECT id, content, answer, solution FROM public.questions WHERE grade IN (7, 8, 9)`;
  console.log(`Found ${questions.length} questions. Starting QA process...`);

  let updatedCount = 0;

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    
    const newContent = normalizeLatexAndText(q.content);
    const newAnswer = normalizeLatexAndText(q.answer);
    const newSolution = normalizeLatexAndText(q.solution);

    if (newContent !== q.content || newAnswer !== q.answer || newSolution !== q.solution) {
      await sql`
        UPDATE public.questions 
        SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution}, updated_at = NOW()
        WHERE id = ${q.id}
      `;
      updatedCount++;
      if (updatedCount % 100 === 0) {
        console.log(`Updated ${updatedCount} questions...`);
      }
    }
  }

  console.log(`QA completed for G7,8,9! Total questions updated: ${updatedCount} / ${questions.length}`);
}

main().catch(console.error);
