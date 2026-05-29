const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const r = await sql`SELECT id, content FROM public.questions WHERE question_code = 'T6-OTC1-003'`;
  if (r.length) {
    let c = r[0].content;
    console.log('BEFORE:', c.substring(0, 200));
    c = c.replace(/Thực hiện phép tính[^:]*:/i, '').trim();
    const idx = c.indexOf('Như vậy');
    if (idx > 0) c = c.substring(0, idx).trim();
    await sql`UPDATE public.questions SET content = ${c} WHERE id = ${r[0].id}`;
    console.log('AFTER:', c.substring(0, 200));
  }
})();
