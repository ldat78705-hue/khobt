import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getGrade6Errors() {
  const questions = await sql`
    SELECT id, question_code, content, answer, solution, question_type
    FROM public.questions
    WHERE grade = 6
      AND length(trim(solution)) < 15
    ORDER BY question_code
  `;
  
  console.log(JSON.stringify(questions, null, 2));
}

getGrade6Errors().catch(console.error);
