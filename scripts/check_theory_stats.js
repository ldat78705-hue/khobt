const { neon } = require('@neondatabase/serverless');
const fs = require('fs');

const lines = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/);
let u = '';
for (const l of lines) {
  if (l.startsWith('DATABASE_URL=')) {
    let v = l.substring(13).trim();
    if (v[0] === '"') v = v.slice(1, -1);
    u = v;
  }
}
const sql = neon(u);

async function checkQuestions() {
  // Check duplicates by content
  const dups = await sql`
    SELECT content, COUNT(*) as count 
    FROM public.questions 
    WHERE question_type IN ('trac_nghiem', 'dung_sai')
    GROUP BY content 
    HAVING COUNT(*) > 1
  `;
  
  if (dups.length > 0) {
    console.log(`Found ${dups.length} duplicated questions (by exact content match):`);
    for (const d of dups) {
      console.log(`- "${d.content.substring(0, 50)}..." (Count: ${d.count})`);
      // Delete duplicates keeping one
      await sql`
        DELETE FROM public.questions
        WHERE id IN (
          SELECT id FROM (
            SELECT id, ROW_NUMBER() OVER (partition BY content ORDER BY created_at) AS rnum
            FROM public.questions
            WHERE content = ${d.content} AND question_type IN ('trac_nghiem', 'dung_sai')
          ) t
          WHERE t.rnum > 1
        )
      `;
    }
    console.log('Duplicates removed.');
  } else {
    console.log('No exact duplicate theory questions found.');
  }

  // Count theory questions per leaf category
  const stats = await sql`
    SELECT c.id, c.name, c.grade, COUNT(q.id) as q_count
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id AND q.question_type IN ('trac_nghiem', 'dung_sai')
    WHERE c.parent_id IS NOT NULL 
    AND NOT EXISTS (SELECT 1 FROM public.categories sub WHERE sub.parent_id = c.id)
    GROUP BY c.id, c.name, c.grade
    ORDER BY q_count DESC, c.grade
  `;

  let needMore = 0;
  console.log('\n--- Category Stats (Theory Questions) ---');
  for (const s of stats) {
    if (s.q_count < 15) {
      needMore++;
    }
    // console.log(`[Grade ${s.grade}] ${s.name}: ${s.q_count} questions`);
  }
  
  console.log(`\nThere are ${needMore} leaf categories out of ${stats.length} that have LESS than 15 theory questions.`);
  
}

checkQuestions().catch(console.error);
