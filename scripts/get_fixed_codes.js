const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const fs = require('fs');

async function main() {
  const fixed = await sql`
    SELECT question_code, grade 
    FROM public.questions 
    WHERE content LIKE '%\\dfrac%' 
       OR answer LIKE '%\\dfrac%' 
       OR solution LIKE '%\\dfrac%'
       OR content LIKE '%\\text{ %'
       OR answer LIKE '%\\text{ %'
       OR solution LIKE '%\\text{ %'
    LIMIT 100
  `;
  
  const codes = fixed.map(q => q.question_code).join(', ');
  console.log(`Examples of fixed codes: ${codes}`);
}
main();
