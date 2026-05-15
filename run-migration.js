const fs = require('fs');
const { neon } = require('@neondatabase/serverless');
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

async function migrate() {
  // 1. Add exam_status column
  await sql`ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS exam_status TEXT DEFAULT 'shared'`;
  console.log('✅ Added exam_status column');
  
  // 2. Add review columns
  await sql`ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.users(id)`;
  await sql`ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ`;
  await sql`ALTER TABLE public.exams ADD COLUMN IF NOT EXISTS review_note TEXT`;
  console.log('✅ Added review columns');
  
  // 3. Set all existing exams to 'shared' (they're imported public exams)
  await sql`UPDATE public.exams SET exam_status = 'shared' WHERE exam_status IS NULL`;
  console.log('✅ Updated existing exams to shared status');
  
  // Verify
  const cols = await sql`
    SELECT column_name FROM information_schema.columns 
    WHERE table_name = 'exams' 
    ORDER BY ordinal_position
  `;
  console.log('Exams columns:', cols.map(c => c.column_name).join(', '));
  
  // Test query
  const exams = await sql`SELECT COUNT(*) as c FROM public.exams WHERE exam_status = 'shared'`;
  console.log('Shared exams:', exams[0].c);
}
migrate().catch(console.error);
