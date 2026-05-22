import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function getGrade8Errors() {
  const questions = await sql`
    SELECT id, question_code, content, answer, solution, question_type
    FROM public.questions
    WHERE grade = 8
      AND length(trim(solution)) < 15
    ORDER BY question_code
  `;
  
  console.log(JSON.stringify(questions, null, 2));
}

getGrade8Errors().catch(console.error);
