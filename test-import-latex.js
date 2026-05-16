/**
 * Test script: Tạo 1 file .docx đơn giản chứa LaTeX rồi parse bằng mammoth
 * để kiểm tra LaTeX có bị hỏng hay không.
 */
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Tạo 1 file docx đơn giản bằng cách sử dụng docx library nếu có,
// hoặc test trực tiếp với mammoth nếu có file .docx mẫu

async function testMammothLatex() {
  // Test 1: Kiểm tra mammoth raw text extraction behavior
  console.log('=== TEST MAMMOTH LATEX PRESERVATION ===\n');
  
  // Simulate what happens with LaTeX text
  const testLatex = [
    '$x^2 + y^2 = r^2$',
    '$\\frac{1}{2}$',
    '$\\sqrt{3}$',
    '$\\overrightarrow{AB}$',
    '$\\triangle ABC$',
    '$\\sin\\alpha + \\cos\\beta$',
    '$\\left(\\frac{a}{b}\\right)$',
    'Cho $\\triangle ABC$ vuông tại $A$, $AH \\perp BC$.',
    '$a^2 + b^2 = c^2$',
    '$\\int_{0}^{1} x^2 dx$',
  ];
  
  console.log('Test LaTeX strings (these would be in the .docx as plain text after MathType→LaTeX conversion):');
  testLatex.forEach((latex, i) => {
    console.log(`  ${i+1}. ${latex}`);
  });
  
  console.log('\n=== PARSE QUESTION SPLITTING TEST ===\n');
  
  // Test question parsing
  const sampleText = `TRƯỜNG THCS LIÊN CHÂU
ĐỀ KIỂM TRA GIỮA KỲ 1
Môn: Toán 9 — Thời gian: 90 phút

Câu 1. (2 điểm) Cho $\\triangle ABC$ vuông tại $A$, đường cao $AH$. Biết $AB = 6$, $AC = 8$.
a) Tính $BC$ và $AH$.
b) Chứng minh $AB^2 = BH \\cdot BC$.

Câu 2. (2 điểm) Rút gọn biểu thức $P = \\frac{\\sqrt{x} + 1}{\\sqrt{x} - 1} + \\frac{\\sqrt{x} - 1}{\\sqrt{x} + 1} - \\frac{3\\sqrt{x} + 1}{x - 1}$ với $x > 0$, $x \\neq 1$.

Câu 3. (1 điểm) Giải phương trình: $x^2 - 5x + 6 = 0$
Đáp án: $x = 2$ hoặc $x = 3$.
Lời giải: Ta có $\\Delta = 25 - 24 = 1 > 0$, nên phương trình có 2 nghiệm phân biệt.

Câu 4. (3 điểm) Cho đường tròn $(O; R)$ và dây $AB$. Gọi $M$ là trung điểm của $AB$.
a) Chứng minh $OM \\perp AB$.
b) Tính $OM$ biết $AB = 8$ cm, $R = 5$ cm.

Câu 5. (2 điểm) Cho hệ phương trình: $\\begin{cases} 2x + y = 5 \\\\ x - 3y = -1 \\end{cases}$
Giải hệ phương trình trên.`;

  const questions = parseQuestions(sampleText);
  
  console.log(`Found ${questions.length} questions:\n`);
  questions.forEach((q, i) => {
    console.log(`--- Question ${q.number} ---`);
    console.log(`Content: ${q.content.substring(0, 120)}${q.content.length > 120 ? '...' : ''}`);
    console.log(`Answer: ${q.answer || '(none)'}`);
    console.log(`Solution: ${q.solution || '(none)'}`);
    console.log(`Points: ${q.points}`);
    console.log(`Type: ${q.question_type}`);
    
    // Kiểm tra LaTeX integrity
    const latexPatterns = q.content.match(/\$[^$]+\$/g) || [];
    console.log(`LaTeX blocks found: ${latexPatterns.length}`);
    latexPatterns.forEach(l => console.log(`  → ${l}`));
    console.log('');
  });
  
  // Kiểm tra LaTeX không bị hỏng
  console.log('=== LATEX INTEGRITY CHECK ===\n');
  const allContent = questions.map(q => q.content + ' ' + q.answer + ' ' + q.solution).join('\n');
  const allLatex = allContent.match(/\$[^$]+\$/g) || [];
  
  let errors = 0;
  allLatex.forEach(latex => {
    const inner = latex.slice(1, -1);
    // Check for broken LaTeX patterns
    if (inner.includes('\\\\') && !inner.includes('\\\\\\\\') && !inner.includes('\\begin')) {
      // Double backslash outside of environments is suspicious
    }
    // Check balanced braces
    let braceCount = 0;
    for (const ch of inner) {
      if (ch === '{') braceCount++;
      if (ch === '}') braceCount--;
      if (braceCount < 0) {
        console.log(`❌ Unbalanced braces in: ${latex}`);
        errors++;
        break;
      }
    }
    if (braceCount !== 0) {
      console.log(`❌ Unclosed braces (${braceCount}) in: ${latex}`);
      errors++;
    }
  });
  
  if (errors === 0) {
    console.log(`✅ All ${allLatex.length} LaTeX blocks passed integrity check!`);
  } else {
    console.log(`\n⚠️ ${errors} LaTeX blocks have issues.`);
  }
}

function parseQuestions(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const questionPattern = /^(Câu|Bài|Câu hỏi|Question)\s*(\d+)\s*[.:)]\s*(.*)/i;
  
  const questions = [];
  let currentQuestion = null;
  
  for (const line of lines) {
    const matchQ = questionPattern.exec(line);
    
    if (matchQ) {
      if (currentQuestion && currentQuestion.content.trim()) {
        questions.push(finalize(currentQuestion));
      }
      
      const num = parseInt(matchQ[2]);
      const rest = matchQ[3]?.trim() || '';
      
      const pointsMatch = rest.match(/\((\d+(?:[.,]\d+)?)\s*(?:điểm|đ)\)/i);
      const points = pointsMatch ? parseFloat(pointsMatch[1].replace(',', '.')) : 1;
      const contentAfterPoints = pointsMatch 
        ? rest.replace(pointsMatch[0], '').trim() 
        : rest;
      
      currentQuestion = {
        number: num,
        content: contentAfterPoints,
        answer: '',
        solution: '',
        points,
        question_type: 'tu_luan',
      };
    } else if (currentQuestion) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.startsWith('đáp án:') || lowerLine.startsWith('đáp án ')) {
        currentQuestion.answer += line.replace(/^đáp án[:\s]*/i, '').trim() + '\n';
      } else if (lowerLine.startsWith('lời giải:') || lowerLine.startsWith('hướng dẫn:') || lowerLine.startsWith('giải:')) {
        currentQuestion.solution += line.replace(/^(lời giải|hướng dẫn|giải)[:\s]*/i, '').trim() + '\n';
      } else {
        if (currentQuestion.solution) {
          currentQuestion.solution += line + '\n';
        } else if (currentQuestion.answer) {
          currentQuestion.answer += line + '\n';
        } else {
          currentQuestion.content += '\n' + line;
        }
      }
    }
  }
  
  if (currentQuestion && currentQuestion.content.trim()) {
    questions.push(finalize(currentQuestion));
  }
  
  return questions;
}

function finalize(q) {
  return {
    ...q,
    content: q.content.trim(),
    answer: q.answer.trim(),
    solution: q.solution.trim(),
    question_type: detectType(q.content),
  };
}

function detectType(content) {
  if (/\n\s*[A-D]\s*[.)]\s*/i.test(content)) return 'trac_nghiem';
  if (content.toLowerCase().includes('đúng/sai') || content.toLowerCase().includes('đúng sai')) return 'dung_sai';
  return 'tu_luan';
}

testMammothLatex();
