import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  // Get all categories across all grades
  const result = await sql`
    SELECT c.id, c.name, c.parent_id, c.grade, COUNT(q.id) as question_count
    FROM categories c
    LEFT JOIN questions q ON c.id = q.category_id
    GROUP BY c.id, c.name, c.parent_id, c.grade
  `;
  
  const parents = result.filter(r => !r.parent_id);
  const toDelete = [];

  for (const p of parents) {
    const children = result.filter(r => r.parent_id === p.id);
    const totalQuestions = Number(p.question_count) + children.reduce((sum, c) => sum + Number(c.question_count), 0);
    
    // Check if there is another parent in the same grade with the exact same name (case-insensitive)
    const duplicates = parents.filter(op => 
      op.id !== p.id && 
      op.grade === p.grade && 
      op.name.toLowerCase().trim() === p.name.toLowerCase().trim()
    );

    if (duplicates.length > 0) {
      if (totalQuestions === 0) {
        console.log(`Deleting empty duplicate parent: ${p.name} (Grade ${p.grade})`);
        toDelete.push(p.id);
        children.forEach(c => toDelete.push(c.id));
      }
    }
  }

  if (toDelete.length > 0) {
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
  } else {
    console.log("No empty duplicate categories found in any grade.");
  }
}

run();
