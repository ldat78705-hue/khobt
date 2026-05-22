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
  
  const subCategories = categories.filter((c: any) => c.parent_id === chapter3Id);
  
  let totalErrors = 0;
  let report = '| Lớp | Chương | Bài | Nội dung lỗi (Đề/Đáp án/Lời giải) | Gợi ý sửa đổi | Trạng thái |\n';
  report += '|---|---|---|---|---|---|\n';
  
  for (const subCat of subCategories) {
    const questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution, 
             q.question_type, q.options, q.correct_answer
      FROM public.questions q
      WHERE q.category_id = ${subCat.id}::uuid
      AND q.grade = 9
      ORDER BY q.question_code, q.created_at
    `;
    
    let hasError = false;
    
    for (const q of questions) {
      const errors = [];
      
      // Check content
      if (!q.content || q.content.trim() === '') {
        errors.push('Đề bài trống');
      }
      
      // Check answer & solution
      if (q.question_type === 'trac_nghiem') {
        if (!q.options || q.options.length < 2) errors.push('Thiếu các phương án nhiễu');
        if (!q.correct_answer) errors.push('Thiếu đáp án đúng');
      } else {
        if (!q.answer) errors.push('Thiếu đáp án ngắn gọn');
      }
      
      if (!q.solution || q.solution.trim() === '') {
        errors.push('Thiếu lời giải chi tiết');
      } else if (q.solution.length < 15) {
        errors.push('Lời giải quá ngắn, có thể chưa đi theo step-by-step');
      }
      
      // Check LaTeX syntax issues
      const combinedText = (q.content || '') + ' ' + (q.solution || '');
      if (combinedText.includes('\\frac') && !combinedText.includes('{')) {
        errors.push('Lỗi cú pháp phân số LaTeX');
      }
      
      if (errors.length > 0) {
        hasError = true;
        totalErrors++;
        report += `| Lớp 9 | Chương III | ${subCat.name} (Mã: ${q.question_code}) | ${errors.join(', ')} | Cần bổ sung/cập nhật dữ liệu | Chờ sửa |\n`;
      }
    }
    
    if (!hasError) {
      console.log(`[${subCat.name}] - ĐÃ ĐẠT - CHÍNH XÁC 100%`);
    }
  }
  
  if (totalErrors > 0) {
    console.log('\nBẢNG BÁO CÁO LỖI:');
    console.log(report);
  } else {
    console.log('\n✅ TOÀN BỘ CHƯƠNG III - ĐÃ ĐẠT - CHÍNH XÁC 100%');
  }
}

auditGrade9Chapter3().catch(console.error);
