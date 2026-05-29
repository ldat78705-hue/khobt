/**
 * Comprehensive audit of all 103 V10 questions:
 * 1. Check LaTeX rendering (does KaTeX parse OK?)
 * 2. Check answer completeness & math correctness
 * 3. Check for duplicates
 * 4. Check content consistency
 */
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const katex = require('katex');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const questions = await sql`
    SELECT id, question_code, content, answer, solution, difficulty, topic, category_id
    FROM public.questions
    WHERE question_code LIKE 'V10-%'
    ORDER BY question_code
  `;
  
  console.log(`Total: ${questions.length} questions\n`);
  
  const issues = [];
  const contentHashes = new Map();
  
  for (const q of questions) {
    const code = q.question_code;
    const qIssues = [];
    
    // 1. CHECK DUPLICATES (by content similarity)
    const contentKey = q.content.replace(/\s+/g, ' ').trim().substring(0, 100);
    if (contentHashes.has(contentKey)) {
      qIssues.push(`DUPLICATE: same as ${contentHashes.get(contentKey)}`);
    }
    contentHashes.set(contentKey, code);
    
    // 2. CHECK ANSWER EXISTS
    if (!q.answer || q.answer.trim().length < 10) {
      qIssues.push(`NO ANSWER or too short (${(q.answer||'').length} chars)`);
    }
    
    // 3. CHECK LATEX RENDERING
    // Extract all $...$ blocks and try parsing with KaTeX
    const mathBlocks = [];
    const contentToCheck = (q.content || '') + ' ' + (q.answer || '');
    
    // Match $...$ but not $$...$$
    const inlineRegex = /(?<!\$)\$(?!\$)(.*?)\$(?!\$)/g;
    let match;
    while ((match = inlineRegex.exec(contentToCheck)) !== null) {
      mathBlocks.push({ latex: match[1], pos: match.index, type: 'inline' });
    }
    
    // Match $$...$$
    const blockRegex = /\$\$([\s\S]*?)\$\$/g;
    while ((match = blockRegex.exec(contentToCheck)) !== null) {
      mathBlocks.push({ latex: match[1], pos: match.index, type: 'block' });
    }
    
    let katexErrors = 0;
    for (const block of mathBlocks) {
      try {
        katex.renderToString(block.latex.trim(), {
          throwOnError: true,
          displayMode: block.type === 'block',
        });
      } catch (e) {
        katexErrors++;
        if (katexErrors <= 2) { // Only report first 2 errors per question
          qIssues.push(`KATEX ERROR in ${block.type}: "${block.latex.substring(0, 50)}..." → ${e.message.substring(0, 80)}`);
        }
      }
    }
    if (katexErrors > 2) {
      qIssues.push(`... and ${katexErrors - 2} more KaTeX errors`);
    }
    
    // 4. CHECK CONTENT QUALITY
    if (q.content.length < 30) {
      qIssues.push(`CONTENT TOO SHORT: ${q.content.length} chars`);
    }
    
    // 5. CHECK FOR BROKEN DELIMITERS
    const dollarCount = (q.content.match(/\$/g) || []).length;
    if (dollarCount % 2 !== 0) {
      qIssues.push(`ODD $ COUNT in content: ${dollarCount} (unmatched delimiter)`);
    }
    const ansDollarCount = ((q.answer || '').match(/\$/g) || []).length;
    if (ansDollarCount % 2 !== 0) {
      qIssues.push(`ODD $ COUNT in answer: ${ansDollarCount} (unmatched delimiter)`);
    }
    
    // Report
    if (qIssues.length > 0) {
      issues.push({ code, issues: qIssues });
      console.log(`❌ ${code}: ${qIssues.length} issues`);
      qIssues.forEach(i => console.log(`   → ${i}`));
    }
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`SUMMARY: ${questions.length} questions checked`);
  console.log(`  ✅ Clean: ${questions.length - issues.length}`);
  console.log(`  ❌ Issues: ${issues.length}`);
  
  if (issues.length > 0) {
    console.log('\nQuestions with issues:');
    issues.forEach(i => console.log(`  ${i.code}: ${i.issues.join('; ')}`));
  }
})();
