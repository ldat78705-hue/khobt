import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

/**
 * POST /api/import-word
 * Upload a .docx file, parse its content preserving LaTeX $...$,
 * and split into individual questions.
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

    // Use mammoth to extract raw text (preserving $...$ LaTeX)
    const result = await mammoth.extractRawText({ buffer });
    const rawText = result.value;

    // Also get messages for debugging
    const messages = result.messages.map((m: any) => m.message);

    // Parse the text into questions
    const questions = parseQuestionsFromText(rawText);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      rawText: rawText.substring(0, 500), // preview first 500 chars
      totalChars: rawText.length,
      questions,
      parseMessages: messages.slice(0, 5),
    });
  } catch (err: any) {
    console.error('Import Word error:', err);
    return NextResponse.json({ error: err.message || 'Lỗi xử lý file' }, { status: 500 });
  }
}

/**
 * Parse raw text into structured questions.
 * Detects patterns like:
 * - "Câu 1.", "Câu 1:", "Câu 1 (2 điểm)"
 * - "Bài 1.", "Bài 1:", "Bài 1 (2 điểm)"
 * 
 * Preserves LaTeX $...$ notation.
 */
function parseQuestionsFromText(text: string): ParsedQuestion[] {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Pattern to detect question headers
  // Matches: Câu 1., Câu 1:, Câu 1 (2đ), Bài 1., Bài 1:, etc.
  const questionPattern = /^(Câu|Bài|Câu hỏi|Question)\s*(\d+)\s*[.:)]\s*(.*)/i;
  // Also match: "1.", "1)", "1:" at the start (numbered list)
  const numberedPattern = /^(\d+)\s*[.):\s]\s*(.*)/;
  
  const questions: ParsedQuestion[] = [];
  let currentQuestion: ParsedQuestion | null = null;
  let headerInfo = '';
  let collectingHeader = true;
  
  for (const line of lines) {
    const matchQ = questionPattern.exec(line);
    const matchN = !matchQ ? numberedPattern.exec(line) : null;
    
    if (matchQ) {
      // Save previous question
      if (currentQuestion && currentQuestion.content.trim()) {
        questions.push(finalizeQuestion(currentQuestion));
      }
      
      collectingHeader = false;
      const num = parseInt(matchQ[2]);
      const rest = matchQ[3]?.trim() || '';
      
      // Extract points if present: (2 điểm), (2đ), (2.0 điểm)
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
      // Numbered pattern only valid after we've seen at least one proper question header
      // or if this looks like a numbered question list
    } else if (matchN && questions.length === 0 && !currentQuestion) {
      // First numbered item - could be a question list starting with "1."
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
      // Next numbered question
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
      // Check for answer/solution markers
      const lowerLine = line.toLowerCase();
      if (lowerLine.startsWith('đáp án:') || lowerLine.startsWith('đáp án ') || lowerLine === 'đáp án') {
        currentQuestion.answer += line.replace(/^đáp án[:\s]*/i, '').trim() + '\n';
      } else if (lowerLine.startsWith('lời giải:') || lowerLine.startsWith('lời giải ') || lowerLine === 'lời giải' ||
                 lowerLine.startsWith('hướng dẫn:') || lowerLine.startsWith('giải:') || lowerLine === 'giải') {
        currentQuestion.solution += line.replace(/^(lời giải|hướng dẫn|giải)[:\s]*/i, '').trim() + '\n';
      } else {
        // Append to content (or solution if we already started collecting solution)
        if (currentQuestion.solution) {
          currentQuestion.solution += line + '\n';
        } else if (currentQuestion.answer && !currentQuestion.content.includes(line)) {
          currentQuestion.answer += line + '\n';
        } else {
          currentQuestion.content += '\n' + line;
        }
      }
    } else {
      // Header area (before first question)
      headerInfo += line + '\n';
    }
  }
  
  // Push last question
  if (currentQuestion && currentQuestion.content.trim()) {
    questions.push(finalizeQuestion(currentQuestion));
  }
  
  // If no structured questions found, treat the whole text as one question
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
    // Auto-detect question type
    question_type: detectQuestionType(q.content),
  };
}

function detectQuestionType(content: string): string {
  const lower = content.toLowerCase();
  // Check for MCQ patterns: Must have at least 3 of A. B. C. D. on separate lines (uppercase only)
  // This avoids false positives from sub-question labels like a), b), c)
  const mcqLines = content.split('\n').filter(line => /^\s*[A-D]\s*[.)]\s+\S/.test(line));
  if (mcqLines.length >= 3) {
    return 'trac_nghiem';
  }
  // Check for True/False
  if (lower.includes('đúng hay sai') || lower.includes('đúng/sai') || lower.includes('đúng sai')) {
    return 'dung_sai';
  }
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
