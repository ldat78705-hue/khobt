import { NextRequest, NextResponse } from 'next/server';
import { extractDocxContent } from '@/lib/omml-to-latex';
import mammoth from 'mammoth';
import AdmZip from 'adm-zip';

/**
 * POST /api/import-word
 * Upload a .docx file, parse its content:
 * - OMML equations → LaTeX $...$
 * - MathType OLE → preserved as inline images
 * - Plain text preserved
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Chưa chọn file' }, { status: 400 });
    }

    if (!file.name.endsWith('.docx')) {
      return NextResponse.json({ error: 'Chỉ hỗ trợ file .docx' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Detect what math format the file uses
    const zip = new AdmZip(buffer);
    const documentXml = zip.readAsText('word/document.xml');
    const hasOmml = documentXml.includes('<m:oMath');
    const hasOle = documentXml.includes('w:object');

    let rawText: string;

    if (hasOmml && !hasOle) {
      // Pure OMML → use our XML parser for accurate LaTeX
      rawText = extractDocxContent(documentXml);
    } else if (hasOmml && hasOle) {
      // Mixed: try OMML parser first, fall back to mammoth if too short
      const ommlText = extractDocxContent(documentXml);
      const mammothResult = await mammoth.extractRawText({ buffer: buffer as any });
      rawText = ommlText.length >= mammothResult.value.length * 0.7 
        ? ommlText 
        : mammothResult.value;
    } else {
      // OLE-only or no math → use mammoth HTML
      // MathType equations are stored as WMF/EMF images which browsers can't render
      // We extract them as placeholders so users can see where equations belong
      const htmlResult = await (mammoth as any).convertToHtml({ buffer });
      
      // Convert HTML to text, marking equation positions
      rawText = htmlToTextWithMathImages(htmlResult.value);
    }

    // Clean up scattered $ signs from MathType conversion fragments
    rawText = rawText.replace(/\$\s*\$/g, ' ');

    // Chuẩn hóa các ký tự đặc biệt hay gặp từ Word có thể làm KaTeX lỗi
    rawText = rawText.replace(/–/g, '-').replace(/—/g, '-');
    rawText = rawText.replace(/\u00A0/g, ' ');
    rawText = rawText.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

    // Parse the text into questions
    const questions = parseQuestionsFromText(rawText);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      rawText: rawText.substring(0, 500),
      totalChars: rawText.length,
      questions,
      mathFormat: hasOmml ? (hasOle ? 'omml+ole' : 'omml') : (hasOle ? 'ole' : 'none'),
      parseMessages: [],
    });
  } catch (err: any) {
    console.error('Import Word error:', err);
    return NextResponse.json({ error: err.message || 'Lỗi xử lý file' }, { status: 500 });
  }
}

/**
 * Convert mammoth HTML output to plain text while marking
 * MathType equation positions with placeholders.
 * WMF/EMF images can't be displayed in browsers, so we mark them.
 */
function htmlToTextWithMathImages(html: string): string {
  let result = html;
  
  // Remove MathType anchor tags
  result = result.replace(/<a[^>]*id="MTBlankEqn"[^>]*>\s*<\/a>/g, '');
  
  // Handle images: WMF/EMF → placeholder, PNG/JPG → keep
  result = result.replace(/<img\s+src="(data:image\/([^;]+);[^"]+)"[^>]*\/?>/g, (_, src, type) => {
    if (type === 'x-wmf' || type === 'x-emf' || type === 'wmf' || type === 'emf') {
      // MathType equation → placeholder
      return '📐';
    }
    // Normal image → inline markdown
    return `![hình](${src})`;
  });
  
  // Convert HTML tables to text
  result = result.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (_, tableContent) => {
    const rows: string[][] = [];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    let rowMatch;
    while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
      const cells: string[] = [];
      const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g;
      let cellMatch;
      while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
        cells.push(stripHtml(cellMatch[1]).trim());
      }
      rows.push(cells);
    }
    
    if (rows.length === 0) return '';
    
    // Convert to markdown table format: | cell | cell |
    const maxCols = Math.max(...rows.map(r => r.length));
    const mdRows = rows.map(r => {
      while (r.length < maxCols) r.push(''); // pad missing cells
      return '| ' + r.join(' | ') + ' |';
    });
    
    // Add header separator line (e.g. |---|---|)
    const sepRow = '|' + Array(maxCols).fill('---').join('|') + '|';
    // Insert after first row
    mdRows.splice(1, 0, sepRow);
    
    // Add newlines around the table so it is parsed as a distinct block
    return '\n\n' + mdRows.join('\n') + '\n\n';
  });
  
  // Convert paragraphs to newlines
  result = result.replace(/<\/p>/g, '\n');
  result = result.replace(/<p[^>]*>/g, '');
  
  // Convert line breaks
  result = result.replace(/<br\s*\/?>/g, '\n');
  
  // Remove remaining HTML tags (but preserve content)
  result = stripHtml(result);
  
  // Clean up excessive whitespace
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.trim();
  
  return result;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

/**
 * Parse raw text into structured questions.
 */
function parseQuestionsFromText(text: string): ParsedQuestion[] {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  const questionPattern = /^(Câu|Bài|Câu hỏi|Question)\s*(\d+)\s*[.:)]\s*(.*)/i;
  const numberedPattern = /^(\d+)\s*[.):\s]\s*(.*)/;
  
  const questions: ParsedQuestion[] = [];
  let currentQuestion: ParsedQuestion | null = null;
  let headerInfo = '';
  let collectingHeader = true;
  
  for (const line of lines) {
    const matchQ = questionPattern.exec(line);
    const matchN = !matchQ ? numberedPattern.exec(line) : null;
    
    if (matchQ) {
      if (currentQuestion && currentQuestion.content.trim()) {
        questions.push(finalizeQuestion(currentQuestion));
      }
      
      collectingHeader = false;
      const num = parseInt(matchQ[2]);
      const rest = matchQ[3]?.trim() || '';
      
      const pointsMatch = rest.match(/\((\d+(?:[.,]\d+)?)\s*(?:điểm|đ|điểm\))/i);
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
        difficulty: 'van_dung',
        topic: 'khac',
        question_type: 'tu_luan',
      };
    } else if (matchN && !currentQuestion && !collectingHeader) {
      // skip
    } else if (matchN && questions.length === 0 && !currentQuestion) {
      collectingHeader = false;
      const num = parseInt(matchN[1]);
      if (num === 1) {
        currentQuestion = {
          number: num,
          content: matchN[2]?.trim() || '',
          answer: '',
          solution: '',
          points: 1,
          difficulty: 'van_dung',
          topic: 'khac',
          question_type: 'tu_luan',
        };
      } else {
        headerInfo += line + '\n';
      }
    } else if (matchN && currentQuestion && parseInt(matchN[1]) === currentQuestion.number + 1) {
      if (currentQuestion.content.trim()) {
        questions.push(finalizeQuestion(currentQuestion));
      }
      const num = parseInt(matchN[1]);
      currentQuestion = {
        number: num,
        content: matchN[2]?.trim() || '',
        answer: '',
        solution: '',
        points: 1,
        difficulty: 'van_dung',
        topic: 'khac',
        question_type: 'tu_luan',
      };
    } else if (currentQuestion) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.startsWith('đáp án:') || lowerLine.startsWith('đáp án ') || lowerLine === 'đáp án') {
        currentQuestion.answer += line.replace(/^đáp án[:\s]*/i, '').trim() + '\n';
      } else if (lowerLine.startsWith('lời giải:') || lowerLine.startsWith('lời giải ') || lowerLine === 'lời giải' ||
                 lowerLine.startsWith('hướng dẫn:') || lowerLine.startsWith('giải:') || lowerLine === 'giải') {
        currentQuestion.solution += line.replace(/^(lời giải|hướng dẫn|giải)[:\s]*/i, '').trim() + '\n';
      } else {
        if (currentQuestion.solution) {
          currentQuestion.solution += line + '\n';
        } else if (currentQuestion.answer && !currentQuestion.content.includes(line)) {
          currentQuestion.answer += line + '\n';
        } else {
          currentQuestion.content += '\n' + line;
        }
      }
    } else {
      headerInfo += line + '\n';
    }
  }
  
  if (currentQuestion && currentQuestion.content.trim()) {
    questions.push(finalizeQuestion(currentQuestion));
  }
  
  if (questions.length === 0 && text.trim().length > 10) {
    questions.push({
      number: 1,
      content: text.trim(),
      answer: '',
      solution: '',
      points: 1,
      difficulty: 'van_dung',
      topic: 'khac',
      question_type: 'tu_luan',
    });
  }
  
  return questions;
}

function finalizeQuestion(q: ParsedQuestion): ParsedQuestion {
  return {
    ...q,
    content: q.content.trim(),
    answer: q.answer.trim(),
    solution: q.solution.trim(),
    question_type: detectQuestionType(q.content),
  };
}

function detectQuestionType(content: string): string {
  const mcqLines = content.split('\n').filter(line => /^\s*[A-D]\s*[.)]\s+\S/.test(line));
  if (mcqLines.length >= 3) return 'trac_nghiem';
  const lower = content.toLowerCase();
  if (lower.includes('đúng hay sai') || lower.includes('đúng/sai') || lower.includes('đúng sai')) return 'dung_sai';
  return 'tu_luan';
}

interface ParsedQuestion {
  number: number;
  content: string;
  answer: string;
  solution: string;
  points: number;
  difficulty: string;
  topic: string;
  question_type: string;
}
