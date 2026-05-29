const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  for (const g of [9, 8, 7, 6, 5, 4]) {
    const r = await sql`
      SELECT question_type, COUNT(*) as c,
        SUM(CASE WHEN answer IS NULL OR answer = '' THEN 1 ELSE 0 END) as no_ans
      FROM public.questions WHERE grade = ${g}
      GROUP BY question_type ORDER BY question_type
    `;
    console.log(`Lớp ${g}:`);
    r.forEach(x => console.log(`  ${x.question_type}: ${x.c} total, ${x.no_ans} no answer`));
  }
  
  // Check: for MCQ with no answer, do they have correct_answer field?
  const cols = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'questions' AND table_schema = 'public'
    ORDER BY ordinal_position
  `;
  console.log('\nQuestion table columns:', cols.map(c => c.column_name).join(', '));
  
  // Sample a MCQ without answer to see full structure
  const sample = await sql`
    SELECT * FROM public.questions 
    WHERE grade = 8 AND (answer IS NULL OR answer = '')
    LIMIT 1
  `;
  if (sample.length > 0) {
    console.log('\nSample MCQ without answer:');
    const s = sample[0];
    Object.entries(s).forEach(([k, v]) => {
      if (v !== null && v !== '') {
        const val = typeof v === 'string' ? v.substring(0, 100) : v;
        console.log(`  ${k}: ${val}`);
      }
    });
  }
})();
