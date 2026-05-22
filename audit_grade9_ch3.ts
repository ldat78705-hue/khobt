import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function auditGrade9Chapter3() {
  const chapter3Id = '95d1abec-cfa9-4249-8444-487fb4cd05b5';
  
  const categories = await sql`
    SELECT id, name, parent_id, sort_order
    FROM public.categories
    WHERE (parent_id = ${chapter3Id} OR id = ${chapter3Id})
    AND grade = 9
    ORDER BY sort_order
  `;
  
  console.log('=== LỚP 9 - CHƯƠNG III: CĂN BẬC HAI VÀ CĂN BẬC BA ===');
  console.log(`Tìm thấy ${categories.length} danh mục:\n`);
  
  for (const cat of categories) {
    console.log(`  [${cat.id}] ${cat.name} (parent: ${cat.parent_id})`);
  }
  
  const subCategories = categories.filter((c: any) => c.parent_id === chapter3Id);
  
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

auditGrade9Chapter3().catch(console.error);
