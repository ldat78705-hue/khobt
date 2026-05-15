import { NextResponse } from 'next/server';
import { SAMPLE_QUESTIONS, CATEGORIES } from '@/lib/demo-data';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 });
    }

    const sql = neon(databaseUrl);
    console.log('Seed process started...');

    // 1. Get the admin user ID
    const users = await sql`SELECT id FROM users WHERE role = 'admin' LIMIT 1`;
    const adminId = users.length > 0 ? users[0].id : null;
    if (!adminId) {
      return NextResponse.json({ error: 'Admin user not found. Create admin first.' }, { status: 400 });
    }

    // 2. Insert Categories and create a mapping [demo_id -> db_uuid]
    console.log('Seeding categories...');
    const catMapping: Record<string, string> = {};
    
    // Sort categories so parents are inserted before children
    const sortedCats = [...CATEGORIES].sort((a, b) => {
      if (!a.parent_id && b.parent_id) return -1;
      if (a.parent_id && !b.parent_id) return 1;
      return 0;
    });

    for (const cat of sortedCats) {
      // Find parent_id UUID if it exists
      const parentUuid = cat.parent_id ? catMapping[cat.parent_id] : null;
      
      const res = await sql`
        INSERT INTO categories (name, slug, description, grade, parent_id, icon, color, sort_order)
        VALUES (${cat.name}, ${cat.slug}, ${cat.description}, ${cat.grade}, ${parentUuid}, ${cat.icon}, ${cat.color}, ${cat.sort_order})
        ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
        RETURNING id
      `;
      catMapping[cat.id] = res[0].id;
    }

    // 3. Insert Questions
    console.log('Seeding questions...');
    let count = 0;
    for (const q of SAMPLE_QUESTIONS) {
      try {
        const existingQ = await sql`SELECT id FROM questions WHERE question_code = ${q.question_code}`;
        if (existingQ.length === 0) {
          const dbCatId = q.category_id ? catMapping[q.category_id] : null;
          
          await sql`
            INSERT INTO questions (
              content, answer, solution, grade, topic, difficulty, question_type,
              options, correct_answer, tags, user_id, category_id,
              is_public, status, question_code, created_at
            ) VALUES (
              ${q.content || ''}, ${q.answer || null}, ${q.solution || null},
              ${q.grade || 9}, ${q.topic || ''}, ${q.difficulty || 'thong_hieu'},
              ${q.question_type || 'tu_luan'}, ${q.options ? JSON.stringify(q.options) : null},
              ${q.correct_answer || null}, ${q.tags || []},
              ${adminId}, ${dbCatId},
              ${q.is_public ?? true}, ${q.status || 'approved'},
              ${q.question_code || null}, NOW()
            )
          `;
          count++;
        }
      } catch (err: any) {
        console.error(`Failed question ${q.question_code}:`, err.message);
      }
    }

    console.log(`Successfully seeded ${count} questions.`);
    return NextResponse.json({ success: true, count });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
