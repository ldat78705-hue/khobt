const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const katex = require('katex');
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const grades = [9, 8, 7, 6, 5, 4];
  const fullReport = {};
  
  for (const grade of grades) {
    const questions = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution,
             q.difficulty, q.topic, q.question_type,
             c.name as category_name
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
      
      // 1. Basic checks
      if (content.length < 15) qIssues.push('NỘI DUNG QUÁ NGẮN');
      if (!answer || answer.trim().length < 2) qIssues.push('THIẾU ĐÁP ÁN');
      
      // 2. LaTeX checks
      const dollarC = (content.match(/\$/g) || []).length;
      if (dollarC % 2 !== 0) qIssues.push('$ KHÔNG CẶP (đề)');
      const dollarA = (answer.match(/\$/g) || []).length;
      if (dollarA % 2 !== 0) qIssues.push('$ KHÔNG CẶP (đáp án)');
      
      // KaTeX parse check
      const allText = content + ' ' + answer;
      let katexErr = 0;
      const re = /(?<!\$)\$(?!\$)(.*?)\$(?!\$)/g;
      let m;
      while ((m = re.exec(allText)) !== null) {
        try { katex.renderToString(m[1].trim(), { throwOnError: true, strict: false }); }
        catch { katexErr++; }
      }
      if (katexErr > 0) qIssues.push(`KATEX LỖI (${katexErr})`);
      
      // 3. Duplicate check
      const norm = content.replace(/\s+/g, ' ').replace(/\$/g, '').trim().substring(0, 120);
      if (contentMap.has(norm)) qIssues.push(`TRÙNG: ${contentMap.get(norm)}`);
      contentMap.set(norm, code);
      
      // 4. Leftover issues
      if (content.includes('{IMG:')) qIssues.push('CÒN {IMG:}');
      if (content.includes('Như vậy, kết quả')) qIssues.push('CÒN FORMAT RÁC');
      if (/\\appro/.test(allText)) qIssues.push('CÒN \\appro');
      
      if (qIssues.length > 0) {
        issues.push({ code, cat: q.category_name, issues: qIssues });
      }
    }
    
    const red = issues.filter(i => i.issues.some(x => 
      x.includes('THIẾU') || x.includes('TRÙNG') || x.includes('QUÁ NGẮN') || x.includes('{IMG:}')
    )).length;
    const yellow = issues.length - red;
    
    fullReport[grade] = {
      total: questions.length,
      clean: questions.length - issues.length,
      issues: issues.length,
      red, yellow,
    };
    
    console.log(`Lớp ${grade}: ${questions.length} câu | ✅ ${questions.length - issues.length} | ❌ ${issues.length} (🔴${red} 🟡${yellow})`);
  }
  
  // Save full report
  fs.writeFileSync('tailieu/audit_full_report.json', JSON.stringify(fullReport, null, 2));
  
  console.log('\n=== TỔNG KẾT TOÀN BỘ ===');
  let totalQ = 0, totalClean = 0, totalIssues = 0;
  for (const [g, r] of Object.entries(fullReport)) {
    totalQ += r.total; totalClean += r.clean; totalIssues += r.issues;
  }
  console.log(`Tổng: ${totalQ} câu | ✅ ${totalClean} (${(totalClean/totalQ*100).toFixed(1)}%) | ❌ ${totalIssues}`);
})();
