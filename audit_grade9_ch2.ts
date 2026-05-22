import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function auditGrade9Chapter2() {
  const chapter2Id = 'a0ee615e-9f9c-4fb6-b83d-8438a6c48251';
  
  const categories = await sql`
    SELECT id, name, parent_id, sort_order
    FROM public.categories
    WHERE (parent_id = ${chapter2Id} OR id = ${chapter2Id})
    AND grade = 9
    ORDER BY sort_order
  `;
  
  console.log('=== LỚP 9 - CHƯƠNG II: PHƯƠNG TRÌNH VÀ BẤT PHƯƠNG TRÌNH BẬC NHẤT MỘT ẨN ===');
  console.log(`Tìm thấy ${categories.length} danh mục:\n`);
  
  for (const cat of categories) {
    console.log(`  [${cat.id}] ${cat.name} (parent: ${cat.parent_id})`);
  }
  
  const subCategories = categories.filter((c: any) => c.parent_id === chapter2Id);
  
  for (const subCat of subCategories) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📘 ${subCat.name}`);
    console.log(`${'='.repeat(80)}`);
    
    const questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution, 
             q.difficulty, q.question_type, q.options, q.correct_answer,
             q.status, q.grade, q.category_id
      FROM public.questions q
      WHERE q.category_id = ${subCat.id}::uuid
      AND q.grade = 9
      ORDER BY q.question_code, q.created_at
    `;
    
    console.log(`📊 Tổng số câu hỏi: ${questions.length}\n`);
    
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`--- Câu ${i + 1} [${q.question_code}] | Mức: ${q.difficulty} | Loại: ${q.question_type} | Status: ${q.status} ---`);
      console.log(`📝 ĐỀ BÀI:`);
      console.log(q.content);
      
      if (q.question_type === 'trac_nghiem' && q.options) {
        console.log(`\n🔘 CÁC PHƯƠNG ÁN:`);
        const opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
        if (Array.isArray(opts)) {
          opts.forEach((opt: any, idx: number) => {
            const label = String.fromCharCode(65 + idx);
            console.log(`  ${label}. ${opt}`);
          });
        }
        console.log(`\n✅ ĐÁP ÁN ĐÚNG: ${q.correct_answer}`);
      } else {
        console.log(`\n📋 ĐÁP ÁN: ${q.answer || '(không có)'}`);
      }
      
      console.log(`\n📖 LỜI GIẢI:`);
      console.log(q.solution || '(không có lời giải)');
      console.log('');
    }
  }
}

auditGrade9Chapter2().catch(console.error);
