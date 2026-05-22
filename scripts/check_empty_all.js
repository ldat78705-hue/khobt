import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function getEmptyCategoriesAllGrades() {
  const categories = await sql`
    SELECT c.grade, COUNT(c.id) as empty_count
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id
    WHERE c.parent_id IS NOT NULL AND q.id IS NULL
    GROUP BY c.grade
    ORDER BY c.grade;
  `;
  console.log('Empty categories by grade:', categories);
}

getEmptyCategoriesAllGrades().catch(console.error);
