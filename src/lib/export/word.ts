import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, Math as DocxMath, MathRun,
  MathFraction, MathSuperScript, MathSubScript, MathRadical,
  ImageRun, Table, TableRow, TableCell, WidthType,
} from "docx";
// Download .docx file with correct filename
// Uses File System Access API (Save As dialog) — guaranteed correct filename
export async function downloadDocx(blob: Blob, fileName: string) {
  const name = fileName.endsWith('.docx') ? fileName : `${fileName}.docx`;
  const docxBlob = new Blob([blob], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  });

  // Method 1: File System Access API (Chrome 86+, Edge 86+)
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: name,
        types: [{
          description: 'Word Document',
          accept: { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(docxBlob);
      await writable.close();
      return;
    } catch (err: any) {
      // User cancelled the dialog — not an error
      if (err?.name === 'AbortError') return;
      // Fall through to fallback
    }
  }

  // Method 2: Fallback — anchor element with blob URL
  const url = URL.createObjectURL(docxBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}
import type { Exam, ExamQuestion, Question, ExamSettings } from "@/types";

/**
 * Parse content and convert to docx paragraph children.
 * LaTeX formulas ($...$) are kept as-is in the text so teachers
 * can use MathType plugin in Word to batch-convert them.
 * LaTeX text is styled in italic to distinguish from regular text.
 */
function parseContentToDocxChildren(text: string, fontSize = 26, isBold = false): TextRun[] {
  if (!text) return [];
  
  const children: TextRun[] = [];
  
  // Split by LaTeX delimiters: $$...$$ (block) and $...$ (inline)
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
  
  for (const part of parts) {
    if (!part) continue;
    
    if ((part.startsWith('$$') && part.endsWith('$$') && part.length > 4) ||
        (part.startsWith('$') && part.endsWith('$') && part.length > 2)) {
      // LaTeX formula — keep as-is with $ delimiters, style italic
      children.push(
        new TextRun({
          text: part,
          size: fontSize,
          font: "Times New Roman",
          italics: true,
          bold: isBold,
        })
      );
    } else {
      // Regular text
      const cleanText = part.trim();
      if (cleanText) {
        children.push(
          new TextRun({
            text: cleanText + ' ',
            size: fontSize,
            font: "Times New Roman",
            bold: isBold,
          })
        );
      }
    }
  }
  
  return children;
}

/**
 * Check if a text block contains a markdown table.
 */
function isMarkdownTable(text: string): boolean {
  const lines = text.trim().split('\n');
  return lines.length >= 2 && lines[0].includes('|') && lines[1].includes('---');
}

/**
 * Convert a markdown table to a Word Table object.
 */
function markdownTableToDocxTable(text: string): Table {
  const lines = text.trim().split('\n').filter(l => l.trim().startsWith('|'));
  const parseRow = (line: string) =>
    line.split('|').map(c => c.trim()).filter(c => c.length > 0 && !c.match(/^[-:]+$/));
  
  // Filter out the separator row (contains only |, -, :, spaces)
  const dataLines = lines.filter(l => {
    const cells = l.split('|').map(c => c.trim()).filter(c => c.length > 0);
    return !cells.every(c => /^[-:]+$/.test(c));
  });
  const rows = dataLines.map(parseRow).filter(r => r.length > 0);
  if (rows.length === 0) return new Table({ rows: [] });

  const colCount = Math.max(...rows.map(r => r.length));

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map((cells, rowIdx) => new TableRow({
      children: Array.from({ length: colCount }, (_, i) => {
        const cellText = cells[i] || '';
        const cellChildren = parseContentToDocxChildren(cellText, 22);
        return new TableCell({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: rowIdx === 0
              ? parseContentToDocxChildren(cellText, 22, true)
              : cellChildren.length > 0 ? cellChildren : [new TextRun({ text: cellText, size: 22, font: 'Times New Roman' })],
          })],
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
            right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
          },
        });
      }),
    })),
  });
}

/**
 * Parse multi-line content into an array of Paragraph (and Table).
 * Each \n creates a new paragraph. Markdown tables become Word tables.
 */
export function parseContentToDocxParagraphs(text: string, fontSize = 26): (Paragraph | Table)[] {
  if (!text) return [];
  const results: (Paragraph | Table)[] = [];
  
  // Split by double newline to find table blocks vs text blocks
  const blocks = text.split(/\n\n/);
  
  for (const block of blocks) {
    if (isMarkdownTable(block)) {
      results.push(markdownTableToDocxTable(block));
    } else {
      // Split single block by \n for sub-lines (a), b), c) etc.)
      const lines = block.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        const children = parseContentToDocxChildren(line);
        if (children.length > 0) {
          results.push(new Paragraph({
            spacing: { before: 40, after: 20 },
            children,
          }));
        }
      }
    }
  }
  return results;
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

  const questionParagraphs: (Paragraph | Table)[] = [];
  const label = options.isWorksheet ? 'Bài' : 'Câu';

  for (const [index, eq] of questions.entries()) {
    const q = eq.question;

    // Split content into first line (with question number) + rest
    const contentLines = (q.content || '').split('\n');
    const firstLine = contentLines[0] || '';
    const restContent = contentLines.slice(1).join('\n');

    // Question header: "Câu X (Y điểm). <first line>"
    const firstLineChildren = parseContentToDocxChildren(firstLine);
    const headerChildren: (TextRun | DocxMath)[] = [
      new TextRun({ text: `${label} ${index + 1}`, bold: true, size: 26, font: "Times New Roman" }),
    ];
    if (!options.isWorksheet && eq.points) {
      headerChildren.push(new TextRun({ text: ` (${eq.points} điểm)`, size: 22, font: "Times New Roman", italics: true }));
    }
    headerChildren.push(new TextRun({ text: `. `, size: 26, font: "Times New Roman" }));
    headerChildren.push(...firstLineChildren);
    questionParagraphs.push(
      new Paragraph({
        spacing: { before: options.isWorksheet ? 120 : 200, after: 40 },
        children: headerChildren,
      })
    );

    // Remaining content lines (sub-questions, tables, etc.)
    if (restContent.trim()) {
      const extraParagraphs = parseContentToDocxParagraphs(restContent);
      questionParagraphs.push(...extraParagraphs);
    }

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
  
  // Sanitize filename: remove special chars, ensure .docx extension
  const safeName = exam.title
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename chars
    .replace(/\s+/g, ' ')         // Normalize spaces
    .trim() || 'DeThi';
  
  await downloadDocx(blob, safeName);
}
