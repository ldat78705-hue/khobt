const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const filters = {
    topic: 'so_hoc',
    category_id: 'c7854e13-38e0-4426-9b37-81d97ca07f62'
  };
  
  const result = await sql`
    SELECT COUNT(*) as count
    FROM public.questions q
    WHERE
      (${filters.topic ?? null}::text IS NULL OR q.topic = ${filters.topic ?? null})
      AND (${filters.category_id ?? null}::uuid IS NULL OR q.category_id = ${filters.category_id ?? null}::uuid)
  `;
  console.log("Count:", result[0].count);
})();
