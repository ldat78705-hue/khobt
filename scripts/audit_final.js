const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const katex = require('katex');
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const grades = [9, 8, 7, 6, 5, 4];
  const fullReport = {};
  const allIssuesList = [];
  
  for (const grade of grades) {
    const questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution,
             q.correct_answer, q.options, q.difficulty, q.topic, 
             q.question_type, c.name as category_name
      FROM public.questions q
      JOIN public.categories c ON q.category_id = c.id
      WHERE q.grade = ${grade}
      ORDER BY c.name, q.question_code
    `;
    
    const issues = [];
    const contentMap = new Map();
    
    for (const q of questions) {
      const code = q.question_code || `ID:${q.id}`;
      const qIssues = [];
      const content = q.content || '';
      const answer = q.answer || '';
      const correctAnswer = q.correct_answer || '';
      
      // 1. Content quality
      if (content.length < 15) qIssues.push('🔴 NỘI DUNG QUÁ NGẮN');
      
      // 2. Answer check (smart: check answer OR correct_answer OR options)
      const hasAnswer = (answer && answer.trim().length >= 2) || 
                        (correctAnswer && correctAnswer.trim().length >= 1) ||
                        (q.options && q.options.length > 0);
      if (!hasAnswer) qIssues.push('🔴 THIẾU ĐÁP ÁN');
      
      // 3. LaTeX paired check
      const dollarC = (content.match(/\$/g) || []).length;
      if (dollarC % 2 !== 0) qIssues.push('🟡 $ KHÔNG CẶP (đề)');
      const dollarA = (answer.match(/\$/g) || []).length;
      if (dollarA % 2 !== 0) qIssues.push('🟡 $ KHÔNG CẶP (đáp án)');
      
      // 4. KaTeX rendering
      const allText = content + ' ' + answer;
      let katexErr = 0;
      const re = /(?<!\$)\$(?!\$)(.*?)\$(?!\$)/g;
      let m;
      while ((m = re.exec(allText)) !== null) {
        try { katex.renderToString(m[1].trim(), { throwOnError: true, strict: false }); }
        catch { katexErr++; }
      }
      if (katexErr > 0) qIssues.push(`🟡 KATEX LỖI (${katexErr})`);
      
      // 5. Duplicate check
      const norm = content.replace(/\s+/g, ' ').replace(/\$/g, '').trim().substring(0, 120);
      if (contentMap.has(norm)) {
        qIssues.push(`🔴 TRÙNG: ${contentMap.get(norm)}`);
      }
      contentMap.set(norm, code);
      
      // 6. Leftover artifacts
      if (content.includes('{IMG:')) qIssues.push('🔴 CÒN {IMG:}');
      if (content.includes('Như vậy, kết quả')) qIssues.push('🔴 CÒN FORMAT RÁC');
      if (/\\appro[^x]/.test(allText)) qIssues.push('🔴 CÒN \\appro');
      
      if (qIssues.length > 0) {
        issues.push({ code, grade, cat: q.category_name, issues: qIssues, 
                      content: content.substring(0, 80) });
      }
    }
    
    const red = issues.filter(i => i.issues.some(x => x.includes('🔴'))).length;
    const yellow = issues.filter(i => !i.issues.some(x => x.includes('🔴'))).length;
    
    fullReport[grade] = { total: questions.length, clean: questions.length - issues.length,
                          issues: issues.length, red, yellow };
    allIssuesList.push(...issues);
    
    console.log(`Lớp ${grade}: ${questions.length} câu | ✅ ${questions.length - issues.length} | ❌ ${issues.length} (🔴${red} 🟡${yellow})`);
  }
  
  // Save detailed report
  fs.writeFileSync('tailieu/audit_final_report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: fullReport,
    issues: allIssuesList,
  }, null, 2), 'utf-8');
  
  console.log('\n=== TỔNG KẾT ===');
  let tQ = 0, tC = 0, tI = 0;
  for (const r of Object.values(fullReport)) { tQ += r.total; tC += r.clean; tI += r.issues; }
  console.log(`Tổng: ${tQ} câu | ✅ ${tC} (${(tC/tQ*100).toFixed(1)}%) | ❌ ${tI}`);
  
  // Print all red issues for fixing
  const redIssues = allIssuesList.filter(i => i.issues.some(x => x.includes('🔴')));
  if (redIssues.length > 0) {
    console.log(`\n🔴 LỖI NGHIÊM TRỌNG CẦN FIX (${redIssues.length}):`);
    redIssues.forEach(i => {
      console.log(`  ${i.code} [L${i.grade}] ${i.cat}: ${i.issues.filter(x=>x.includes('🔴')).join('; ')}`);
    });
  }
})();
