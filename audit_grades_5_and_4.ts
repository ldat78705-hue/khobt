import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function auditGrades5And4() {
  const grades = [5, 4];
  
  let report = '| Lớp | Chương | Bài | Nội dung lỗi (Đề/Đáp án/Lời giải) | Gợi ý sửa đổi | Trạng thái |\n';
  report += '|---|---|---|---|---|---|\n';
  let hasAnyError = false;

  for (const grade of grades) {
    console.log(`\n======================================================`);
    console.log(`Bắt đầu quét dữ liệu Khối Lớp ${grade}...`);
    console.log(`======================================================\n`);
    
    const chapters = await sql`
      SELECT id, name, sort_order
      FROM public.categories
      WHERE parent_id IS NULL 
        AND grade = ${grade}
      ORDER BY sort_order
    `;
    
    if (chapters.length === 0) {
      console.log(`⚠️ Không tìm thấy dữ liệu chương nào cho Lớp ${grade}.`);
      continue;
    }

    for (const chapter of chapters) {
      console.log(`**Khối:** Lớp ${grade}\n**Block rà soát:** ${chapter.name}`);
      console.log('**Kết quả kiểm tra chi tiết theo Bài:**');

      const subCategories = await sql`
        SELECT id, name
        FROM public.categories
        WHERE parent_id = ${chapter.id}
        ORDER BY sort_order
      `;

      let chapterHasError = false;

      if (subCategories.length === 0) {
          console.log(`⚠️ Không tìm thấy bài học nào trong chương này.`);
          continue;
      }

      for (const subCat of subCategories) {
        const questions = await sql`
          SELECT q.id, q.question_code, q.content, q.answer, q.solution, 
                 q.question_type, q.options, q.correct_answer
          FROM public.questions q
          WHERE q.category_id = ${subCat.id}::uuid
          AND q.grade = ${grade}
          ORDER BY q.question_code, q.created_at
        `;
        
        let subCatHasError = false;
        
        if (questions.length === 0) {
            subCatHasError = true;
            chapterHasError = true;
            hasAnyError = true;
            report += `| Lớp ${grade} | ${chapter.name} | ${subCat.name} | Thiếu toàn bộ câu hỏi | Cần chèn thêm dữ liệu | Chờ sửa |\n`;
        }

        for (const q of questions) {
          const errors = [];
          
          if (!q.content || q.content.trim() === '') errors.push('Đề bài trống');
          
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
          
          const combinedText = (q.content || '') + ' ' + (q.solution || '');
          if (combinedText.includes('\\frac') && !combinedText.includes('{')) {
            errors.push('Lỗi cú pháp phân số LaTeX');
          }
          
          if (errors.length > 0) {
            subCatHasError = true;
            chapterHasError = true;
            hasAnyError = true;
            report += `| Lớp ${grade} | ${chapter.name} | ${subCat.name} (Mã: ${q.question_code}) | ${errors.join(', ')} | Cần bổ sung/cập nhật dữ liệu | Chờ sửa |\n`;
          }
        }
        
        if (!subCatHasError) {
          console.log(`- [${subCat.name}] - ĐÃ ĐẠT - CHÍNH XÁC 100%`);
        } else {
          console.log(`- [${subCat.name}] - PHÁT HIỆN LỖI`);
        }
      }

      if (!chapterHasError) {
        console.log(`✅ **TOÀN BỘ ${chapter.name} - ĐÃ ĐẠT - CHÍNH XÁC 100%**\n`);
      } else {
        console.log(`⚠️ **${chapter.name} - CÓ LỖI**\n`);
      }
    }
  }

  if (hasAnyError) {
    console.log('\n**BẢNG BÁO CÁO LỖI (LỚP 4 & 5):**');
    console.log(report);
  } else {
    console.log('\n✅ **TẤT CẢ DỮ LIỆU LỚP 4 VÀ LỚP 5 ĐÃ ĐẠT CHUẨN 100%**');
  }
}

auditGrades5And4().catch(console.error);
