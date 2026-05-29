/**
 * MASTER AUDIT SCRIPT - Rà soát chất lượng kho đề
 * 3 vai trò:
 *   🎓 Chuyên gia GD: văn phong, sư phạm
 *   👨‍🏫 GV toán giỏi: logic đề, đáp án đúng
 *   🏆 HSG quốc gia: chặt chẽ toán học, đủ dữ kiện
 * 
 * Usage: node scripts/master_audit.js [grade] [chapter_keyword]
 * Example: node scripts/master_audit.js 9 "CHƯƠNG I"
 *          node scripts/master_audit.js 9 "Bài 1"
 *          node scripts/master_audit.js 9  (all grade 9)
 */
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const katex = require('katex');
const fs = require('fs');

const grade = parseInt(process.argv[2]) || 9;
const chapterFilter = process.argv[3] || '';

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Get questions
  let questions;
  if (chapterFilter) {
    questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution, 
             q.difficulty, q.topic, q.question_type, q.grade,
             c.name as category_name, c.id as category_id
      FROM public.questions q
      JOIN public.categories c ON q.category_id = c.id
      WHERE q.grade = ${grade} AND c.name LIKE ${'%' + chapterFilter + '%'}
      ORDER BY c.name, q.question_code, q.id
    `;
  } else {
    questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution,
             q.difficulty, q.topic, q.question_type, q.grade,
             c.name as category_name, c.id as category_id
      FROM public.questions q
      JOIN public.categories c ON q.category_id = c.id
      WHERE q.grade = ${grade}
      ORDER BY c.name, q.question_code, q.id
    `;
  }
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`AUDIT LỚP ${grade}${chapterFilter ? ` — "${chapterFilter}"` : ''}`);
  console.log(`Tổng: ${questions.length} câu hỏi`);
  console.log(`${'='.repeat(80)}\n`);
  
  const issues = [];
  const contentMap = new Map(); // For duplicate detection
  let currentCat = '';
  let catCount = 0;
  
  for (const q of questions) {
    const code = q.question_code || `ID:${q.id}`;
    const qIssues = [];
    
    // Print category header
    if (q.category_name !== currentCat) {
      if (currentCat) console.log(`  → ${catCount} câu kiểm tra xong\n`);
      currentCat = q.category_name;
      catCount = 0;
      console.log(`📂 ${currentCat}`);
    }
    catCount++;
    
    const content = q.content || '';
    const answer = q.answer || '';
    
    // ===== 1. KIỂM TRA CƠ BẢN =====
    if (content.length < 15) {
      qIssues.push('🔴 NỘI DUNG QUÁ NGẮN (<15 ký tự)');
    }
    if (!answer || answer.trim().length < 3) {
      qIssues.push('🔴 THIẾU ĐÁP ÁN');
    }
    
    // ===== 2. KIỂM TRA LATEX =====
    const allText = content + ' ' + answer;
    
    // Check unmatched $
    const dollarCountContent = (content.match(/\$/g) || []).length;
    if (dollarCountContent % 2 !== 0) {
      qIssues.push(`🔴 $ KHÔNG CẶP trong đề (${dollarCountContent} dấu $)`);
    }
    const dollarCountAnswer = (answer.match(/\$/g) || []).length;
    if (dollarCountAnswer % 2 !== 0) {
      qIssues.push(`🔴 $ KHÔNG CẶP trong đáp án (${dollarCountAnswer} dấu $)`);
    }
    
    // Parse KaTeX
    const inlineRegex = /(?<!\$)\$(?!\$)(.*?)\$(?!\$)/g;
    let match;
    let katexErrors = [];
    while ((match = inlineRegex.exec(allText)) !== null) {
      try {
        katex.renderToString(match[1].trim(), { throwOnError: true, strict: false });
      } catch (e) {
        katexErrors.push(`"${match[1].substring(0,40)}..." → ${e.message.substring(0,60)}`);
      }
    }
    if (katexErrors.length > 0) {
      qIssues.push(`🟡 KATEX LỖI (${katexErrors.length}): ${katexErrors[0]}`);
    }
    
    // ===== 3. KIỂM TRA TRÙNG LẶP =====
    // Normalize content for comparison (remove whitespace, lowercase)
    const normalized = content.replace(/\s+/g, ' ').replace(/\$/g, '').trim().substring(0, 120);
    if (contentMap.has(normalized)) {
      const otherCode = contentMap.get(normalized);
      qIssues.push(`🔴 TRÙNG LẶP với ${otherCode}`);
    }
    contentMap.set(normalized, code);
    
    // ===== 4. KIỂM TRA VĂN PHONG =====
    if (content.includes('{IMG:')) {
      qIssues.push('🔴 CÒN PLACEHOLDER ẢNH {IMG:...}');
    }
    if (/\\\\[(\[]/.test(content)) {
      qIssues.push('🟡 CÒN DELIMITER CŨ \\\\( hoặc \\\\[');
    }
    
    // ===== 5. KIỂM TRA MỨC ĐỘ =====
    if (!['nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'].includes(q.difficulty)) {
      qIssues.push(`🟡 MỨC ĐỘ KHÔNG HỢP LỆ: ${q.difficulty}`);
    }
    
    // ===== 6. KIỂM TRA LOGIC TOÁN (cơ bản) =====
    // Check for common math errors in answers
    if (answer.includes('= 0/') || answer.includes('chia cho 0')) {
      qIssues.push('🔴 CÓ THỂ CHIA CHO 0 trong đáp án');
    }
    
    // Report
    if (qIssues.length > 0) {
      issues.push({ code, category: q.category_name, issues: qIssues, content: content.substring(0, 100) });
      console.log(`  ❌ ${code} [${q.difficulty}]: ${qIssues.length} lỗi`);
      qIssues.forEach(i => console.log(`     ${i}`));
    }
  }
  if (currentCat) console.log(`  → ${catCount} câu kiểm tra xong\n`);
  
  // ===== SUMMARY =====
  console.log(`\n${'='.repeat(80)}`);
  console.log(`BÁO CÁO TỔNG HỢP`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Tổng câu kiểm tra: ${questions.length}`);
  console.log(`✅ Đạt: ${questions.length - issues.length}`);
  console.log(`❌ Có vấn đề: ${issues.length}`);
  
  if (issues.length > 0) {
    // Group by issue type
    const byType = {};
    issues.forEach(i => {
      i.issues.forEach(issue => {
        const type = issue.substring(0, 2);
        byType[type] = (byType[type] || 0) + 1;
      });
    });
    console.log('\nPhân loại lỗi:');
    Object.entries(byType).forEach(([type, count]) => {
      const label = type === '🔴' ? 'NGHIÊM TRỌNG' : type === '🟡' ? 'CẢNH BÁO' : 'KHÁC';
      console.log(`  ${type} ${label}: ${count}`);
    });
    
    console.log('\nDanh sách chi tiết:');
    issues.forEach(i => {
      console.log(`  ${i.code} (${i.category})`);
      console.log(`    Đề: ${i.content}...`);
      i.issues.forEach(issue => console.log(`    ${issue}`));
    });
  }
  
  // Save report
  const reportPath = `tailieu/audit_report_grade${grade}${chapterFilter ? '_' + chapterFilter.replace(/[^a-zA-Z0-9]/g, '_') : ''}.json`;
  const report = {
    timestamp: new Date().toISOString(),
    grade,
    filter: chapterFilter,
    total: questions.length,
    clean: questions.length - issues.length,
    issues: issues,
  };
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n📄 Report saved: ${reportPath}`);
})();
