import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  const result = await sql`
    SELECT c.id, c.name, c.parent_id, COUNT(q.id) as question_count
    FROM categories c
    LEFT JOIN questions q ON c.id = q.category_id
    WHERE c.grade = 7
    GROUP BY c.id, c.name, c.parent_id
  `;
  
  // Find parents
  const parents = result.filter(r => !r.parent_id);
  const toDelete = [];

  for (const p of parents) {
    const children = result.filter(r => r.parent_id === p.id);
    const totalQuestions = Number(p.question_count) + children.reduce((sum, c) => sum + Number(c.question_count), 0);
    
    if (totalQuestions === 0) {
      console.log(`Deleting empty parent: ${p.name}`);
      toDelete.push(p.id);
      children.forEach(c => toDelete.push(c.id));
    } else {
      console.log(`Keeping parent: ${p.name} (questions: ${totalQuestions})`);
    }
  }

  if (toDelete.length > 0) {
    // delete children first
    const childrenToDelete = result.filter(r => r.parent_id && toDelete.includes(r.parent_id));
    for (const c of childrenToDelete) {
      await sql`DELETE FROM categories WHERE id = ${c.id}`;
      console.log(`Deleted child: ${c.name}`);
    }
    const parentsToDelete = parents.filter(p => toDelete.includes(p.id));
    for (const p of parentsToDelete) {
      await sql`DELETE FROM categories WHERE id = ${p.id}`;
      console.log(`Deleted parent: ${p.name}`);
    }
  }
}

run();
