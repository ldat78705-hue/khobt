import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Math as DocxMath, MathRun,
  MathFraction, MathSuperScript, MathSubScript, MathRadical,
  ImageRun,
} from "docx";
import { saveAs } from "file-saver";
import type { Exam, ExamQuestion, Question, ExamSettings } from "@/types";

/**
 * Parse LaTeX content and convert to docx paragraph children.
 * Supports inline $...$ and block $$...$$ LaTeX.
 * LaTeX is exported as OMML (Office Math Markup Language) which
 * Microsoft Word renders natively as editable math equations.
 */
function parseContentToDocxChildren(text: string): (TextRun | DocxMath)[] {
  if (!text) return [];
  
  const children: (TextRun | DocxMath)[] = [];
  
  // Split by LaTeX delimiters: $$...$$ (block) and $...$ (inline)
  // Process block math first ($$...$$), then inline ($...$)
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$]*?\$)/g);
  
  for (const part of parts) {
    if (!part) continue;
    
    if (part.startsWith('$$') && part.endsWith('$$')) {
      // Block LaTeX -> OMML Math
      const latex = part.slice(2, -2).trim();
      children.push(createOmmlFromLatex(latex));
    } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      // Inline LaTeX -> OMML Math  
      const latex = part.slice(1, -1).trim();
      children.push(createOmmlFromLatex(latex));
    } else {
      // Regular text
      if (part.trim()) {
        children.push(
          new TextRun({
            text: part,
            size: 26, // 13pt
            font: "Times New Roman",
          })
        );
      }
    }
  }
  
  return children;
}

/**
 * Convert LaTeX string to docx Math object (OMML).
 * This creates editable math in Word using Office Math Markup Language.
 * 
 * Strategy: Use MathRun with the LaTeX text. Word will display it
 * using Cambria Math font which supports most math symbols.
 * For proper rendering, we convert common LaTeX commands to Unicode math.
 */
function createOmmlFromLatex(latex: string): DocxMath {
  // Convert LaTeX to Unicode math symbols for OMML compatibility
  const mathText = latexToUnicodeMath(latex);
  
  return new DocxMath({
    children: [
      new MathRun(mathText),
    ],
  });
}

/**
 * Convert LaTeX to Unicode math representation.
 * Word's OMML engine can interpret these Unicode math characters.
 */
function latexToUnicodeMath(latex: string): string {
  let result = latex;
  
  // Fractions: \frac{a}{b} -> a/b  (Word OMML will render properly)
  result = result.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)');
  
  // Square root: \sqrt{x} -> √(x)
  result = result.replace(/\\sqrt\[(\d+)\]\{([^{}]*)\}/g, '∜($2)'); // nth root
  result = result.replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
  
  // Greek letters
  const greekMap: Record<string, string> = {
    '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ',
    '\\epsilon': 'ε', '\\zeta': 'ζ', '\\eta': 'η', '\\theta': 'θ',
    '\\iota': 'ι', '\\kappa': 'κ', '\\lambda': 'λ', '\\mu': 'μ',
    '\\nu': 'ν', '\\xi': 'ξ', '\\pi': 'π', '\\rho': 'ρ',
    '\\sigma': 'σ', '\\tau': 'τ', '\\upsilon': 'υ', '\\phi': 'φ',
    '\\chi': 'χ', '\\psi': 'ψ', '\\omega': 'ω',
    '\\Alpha': 'Α', '\\Beta': 'Β', '\\Gamma': 'Γ', '\\Delta': 'Δ',
    '\\Theta': 'Θ', '\\Lambda': 'Λ', '\\Pi': 'Π', '\\Sigma': 'Σ',
    '\\Phi': 'Φ', '\\Psi': 'Ψ', '\\Omega': 'Ω',
  };
  for (const [key, val] of Object.entries(greekMap)) {
    result = result.replaceAll(key, val);
  }
  
  // Operators and symbols
  const symbolMap: Record<string, string> = {
    '\\cdot': '·', '\\times': '×', '\\div': '÷',
    '\\pm': '±', '\\mp': '∓', '\\leq': '≤', '\\geq': '≥',
    '\\neq': '≠', '\\approx': '≈', '\\equiv': '≡',
    '\\infty': '∞', '\\partial': '∂', '\\nabla': '∇',
    '\\forall': '∀', '\\exists': '∃', '\\in': '∈',
    '\\notin': '∉', '\\subset': '⊂', '\\supset': '⊃',
    '\\cup': '∪', '\\cap': '∩', '\\emptyset': '∅',
    '\\rightarrow': '→', '\\leftarrow': '←', '\\Rightarrow': '⇒',
    '\\Leftarrow': '⇐', '\\leftrightarrow': '↔',
    '\\angle': '∠', '\\triangle': '△', '\\perp': '⊥',
    '\\parallel': '∥', '\\sim': '∼', '\\cong': '≅',
    '\\propto': '∝', '\\therefore': '∴', '\\because': '∵',
    '\\ldots': '…', '\\cdots': '⋯', '\\vdots': '⋮',
    '\\sum': '∑', '\\prod': '∏', '\\int': '∫',
    '\\lim': 'lim', '\\sin': 'sin', '\\cos': 'cos',
    '\\tan': 'tan', '\\log': 'log', '\\ln': 'ln',
    '\\max': 'max', '\\min': 'min',
  };
  for (const [key, val] of Object.entries(symbolMap)) {
    result = result.replaceAll(key, val);
  }
  
  // Superscript/subscript
  result = result.replace(/\^{([^{}]*)}/g, '^($1)');
  result = result.replace(/_{([^{}]*)}/g, '_($1)');
  result = result.replace(/\^([a-zA-Z0-9])/g, '^$1');
  result = result.replace(/_([a-zA-Z0-9])/g, '_$1');
  
  // Vectors and accents
  result = result.replace(/\\overrightarrow\{([^{}]*)\}/g, '$1⃗');
  result = result.replace(/\\vec\{([^{}]*)\}/g, '$1⃗');
  result = result.replace(/\\bar\{([^{}]*)\}/g, '$1̄');
  result = result.replace(/\\hat\{([^{}]*)\}/g, '$1̂');
  result = result.replace(/\\tilde\{([^{}]*)\}/g, '$1̃');
  
  // Text in math
  result = result.replace(/\\text\{([^{}]*)\}/g, '$1');
  result = result.replace(/\\mathrm\{([^{}]*)\}/g, '$1');
  
  // Brackets
  result = result.replace(/\\left/g, '');
  result = result.replace(/\\right/g, '');
  result = result.replace(/\\{/g, '{');
  result = result.replace(/\\}/g, '}');
  
  // Systems of equations (cases)
  result = result.replace(/\\begin\{cases\}/g, '{');
  result = result.replace(/\\end\{cases\}/g, '');
  result = result.replace(/\\\\/g, '; ');
  
  // Cleanup
  result = result.replace(/\\,/g, ' ');
  result = result.replace(/\\;/g, ' ');
  result = result.replace(/\\quad/g, '  ');
  result = result.replace(/\\qquad/g, '    ');
  result = result.replace(/\\!/g, '');
  
  return result.trim();
}

function getSettingValue(settings: ExamSettings, ...keys: string[]): string {
  for (const key of keys) {
    const val = (settings as Record<string, unknown>)[key];
    if (val && typeof val === 'string') return val;
  }
  return '';
}

function createExamHeader(settings: ExamSettings, title: string, duration?: number, grade?: number): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const schoolName = getSettingValue(settings, 'schoolName', 'school_name');
  const examType = getSettingValue(settings, 'examType', 'exam_type');
  const schoolYear = getSettingValue(settings, 'schoolYear', 'school_year');
  const subject = getSettingValue(settings, 'subject') || (grade ? `Toán ${grade}` : 'TOÁN');

  // Row 1: School name
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: (schoolName || 'TRƯỜNG THCS ...').toUpperCase(), bold: true, size: 24, font: "Times New Roman" })],
    })
  );

  // Row 2: Exam type
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200 },
      children: [new TextRun({ text: `ĐỀ ${(examType || 'KIỂM TRA').toUpperCase()}`, bold: true, size: 30, font: "Times New Roman" })],
    })
  );

  // Row 3: Subject + Time
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 100 },
      children: [
        new TextRun({ text: `Môn: ${subject}`, bold: true, size: 26, font: "Times New Roman" }),
        new TextRun({ text: ` — Thời gian: ${duration || 90} phút`, size: 24, font: "Times New Roman", italics: true }),
      ],
    })
  );

  // Row 4: School year
  if (schoolYear) {
    paragraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `Năm học: ${schoolYear}`, size: 22, font: "Times New Roman", italics: true })],
      })
    );
  }

  // Student info line
  paragraphs.push(
    new Paragraph({
      spacing: { before: 200, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" } },
      children: [],
    }),
    new Paragraph({
      spacing: { before: 100 },
      children: [
        new TextRun({ text: 'Họ và tên: ....................................................', size: 22, font: "Times New Roman" }),
        new TextRun({ text: '     Lớp: ............', size: 22, font: "Times New Roman" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" } },
      children: [],
    })
  );

  return paragraphs;
}

function createWorksheetHeader(settings: ExamSettings, title: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const centerName = getSettingValue(settings, 'schoolName', 'school_name');
  const teacherName = getSettingValue(settings, 'teacherName', 'teacher_name');

  // Center name + teacher on same line
  if (centerName || teacherName) {
    const lineChildren: TextRun[] = [];
    if (centerName) {
      lineChildren.push(new TextRun({ text: centerName.toUpperCase(), bold: true, size: 22, font: "Times New Roman" }));
    }
    if (centerName && teacherName) {
      lineChildren.push(new TextRun({ text: '                              ', size: 22, font: "Times New Roman" }));
    }
    if (teacherName) {
      lineChildren.push(new TextRun({ text: `GV: ${teacherName}`, size: 22, font: "Times New Roman", italics: true }));
    }
    paragraphs.push(new Paragraph({
      children: lineChildren,
      ...(centerName && teacherName ? {} : { alignment: centerName ? AlignmentType.LEFT : AlignmentType.RIGHT }),
    }));
  }

  // Title
  paragraphs.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120 },
      children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 28, font: "Times New Roman" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" } },
      children: [],
    })
  );

  // Student info
  paragraphs.push(
    new Paragraph({
      spacing: { before: 80, after: 60 },
      children: [
        new TextRun({ text: 'Họ và tên: ....................................................', size: 22, font: "Times New Roman" }),
        new TextRun({ text: '          Lớp: ............', size: 22, font: "Times New Roman" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 100 },
      border: { bottom: { style: BorderStyle.DASHED, size: 1, color: "999999" } },
      children: [],
    })
  );

  return paragraphs;
}

/**
 * Fetch image from URL and return as Uint8Array for embedding in Word doc.
 * Works in browser (no Node.js Buffer needed).
 */
async function fetchImageAsUint8Array(url: string): Promise<{ data: Uint8Array; width: number; height: number } | null> {
  try {
    if (url.startsWith('data:')) {
      // Handle base64 data URLs
      const base64 = url.split(',')[1];
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return { data: bytes, width: 400, height: 300 };
    }
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return {
      data: new Uint8Array(arrayBuffer),
      width: 400,
      height: 300,
    };
  } catch {
    return null;
  }
}

export async function exportToWord(
  exam: Exam,
  questions: (ExamQuestion & { question: Question })[],
  options: { showAnswer?: boolean; showSolution?: boolean; isWorksheet?: boolean } = {}
) {
  const headerParagraphs = options.isWorksheet
    ? createWorksheetHeader(exam.settings || {}, exam.title)
    : createExamHeader(exam.settings || {}, exam.title, exam.duration, exam.grade);

  const questionParagraphs: Paragraph[] = [];
  const label = options.isWorksheet ? 'Bài' : 'Câu';

  for (const [index, eq] of questions.entries()) {
    const q = eq.question;

    // Question number + content with LaTeX as OMML
    const contentChildren = parseContentToDocxChildren(q.content);
    const children: (TextRun | DocxMath)[] = [
      new TextRun({ text: `${label} ${index + 1}`, bold: true, size: 26, font: "Times New Roman" }),
    ];
    if (!options.isWorksheet && eq.points) {
      children.push(new TextRun({ text: ` (${eq.points} điểm)`, size: 22, font: "Times New Roman", italics: true }));
    }
    children.push(new TextRun({ text: `. `, size: 26, font: "Times New Roman" }));
    children.push(...contentChildren);
    questionParagraphs.push(
      new Paragraph({
        spacing: { before: options.isWorksheet ? 120 : 200, after: options.isWorksheet ? 40 : 100 },
        children,
      })
    );

    // Images (from Cloudinary or inline)
    if (q.images && q.images.length > 0) {
      for (const imgUrl of q.images) {
        const imgData = await fetchImageAsUint8Array(imgUrl);
        if (imgData) {
          questionParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 100, after: 100 },
              children: [
                new ImageRun({
                  data: imgData.data,
                  transformation: {
                    width: imgData.width,
                    height: imgData.height,
                  },
                  type: 'png',
                }),
              ],
            })
          );
        }
      }
    }

    // MCQ Options with LaTeX
    if (q.question_type === "trac_nghiem" && q.options) {
      for (const opt of q.options) {
        const optChildren = parseContentToDocxChildren(opt.value);
        questionParagraphs.push(
          new Paragraph({
            indent: { left: 720 },
            spacing: { before: 60 },
            children: [
              new TextRun({ text: `${opt.key}. `, bold: true, size: 26, font: "Times New Roman" }),
              ...optChildren,
            ],
          })
        );
      }
    }

    // Answer with LaTeX
    if (options.showAnswer && q.answer) {
      const answerChildren = parseContentToDocxChildren(q.answer);
      questionParagraphs.push(
        new Paragraph({
          spacing: { before: 100 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: "Đáp án: ", bold: true, size: 22, font: "Times New Roman", color: "0000FF" }),
            ...answerChildren,
          ],
        })
      );
    }

    // Solution with LaTeX
    if (options.showSolution && q.solution) {
      const solutionChildren = parseContentToDocxChildren(q.solution);
      questionParagraphs.push(
        new Paragraph({
          spacing: { before: 100 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: "Lời giải: ", bold: true, size: 22, font: "Times New Roman", color: "008000" }),
            ...solutionChildren,
          ],
        })
      );
    }
  }

  const footerParagraph = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
    children: [new TextRun({ text: "— HẾT —", bold: true, size: 24, font: "Times New Roman" })],
  });

  // Build answer key section if showAnswer
  const answerKeyParagraphs: Paragraph[] = [];
  if (options.showAnswer) {
    answerKeyParagraphs.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: 'ĐÁP ÁN VÀ BIỂU ĐIỂM', bold: true, size: 28, font: "Times New Roman" })],
      }),
      new Paragraph({
        spacing: { after: 100 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" } },
        children: [],
      })
    );
    for (const [index, eq] of questions.entries()) {
      const q = eq.question;
      const parts: (TextRun | DocxMath)[] = [
        new TextRun({ text: `Câu ${index + 1} (${eq.points}đ): `, bold: true, size: 24, font: "Times New Roman" }),
      ];
      if (q.answer) {
        parts.push(...parseContentToDocxChildren(q.answer));
      } else if (q.correct_answer) {
        parts.push(new TextRun({ text: q.correct_answer, bold: true, size: 24, font: "Times New Roman", color: "0000FF" }));
      }
      answerKeyParagraphs.push(new Paragraph({ spacing: { before: 80 }, children: parts }));

      if (options.showSolution && q.solution) {
        answerKeyParagraphs.push(new Paragraph({
          spacing: { before: 40 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: 'Lời giải: ', bold: true, size: 22, font: "Times New Roman", italics: true, color: "008000" }),
            ...parseContentToDocxChildren(q.solution),
          ],
        }));
      }
    }
  }

  const sections = [{
    properties: {
      page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } },
    },
    children: [...headerParagraphs, ...questionParagraphs, footerParagraph],
  }];

  // Add answer key as a separate page
  if (answerKeyParagraphs.length > 0) {
    sections.push({
      properties: {
        page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } },
      },
      children: answerKeyParagraphs,
    });
  }

  const doc = new Document({ sections });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${exam.title}.docx`);
}
