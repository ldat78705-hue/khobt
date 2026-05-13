import type { Exam, ExamQuestion, Question } from "@/types";

/**
 * Copy exam content to clipboard in HTML format
 * so it can be pasted into Microsoft Word with formatting preserved
 */
export async function copyToClipboard(
  exam: Exam,
  questions: (ExamQuestion & { question: Question })[],
  options: { showAnswer?: boolean; showSolution?: boolean } = {}
) {
  const settings = exam.settings || {};

  let html = `<div style="font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5;">`;

  // Header
  if (settings.school_name) {
    html += `<p style="text-align: center; font-weight: bold; font-size: 13pt;">${settings.school_name.toUpperCase()}</p>`;
  }
  if (settings.exam_type) {
    html += `<p style="text-align: center; font-weight: bold; font-size: 16pt;">ĐỀ ${settings.exam_type.toUpperCase()}</p>`;
  }
  html += `<p style="text-align: center; font-weight: bold; font-size: 14pt;">Môn: ${settings.subject || "TOÁN"}</p>`;
  if (settings.school_year) {
    html += `<p style="text-align: center; font-style: italic;">Năm học: ${settings.school_year}</p>`;
  }
  if (exam.duration) {
    html += `<p style="text-align: center; font-style: italic;">Thời gian: ${exam.duration} phút (không kể thời gian phát đề)</p>`;
  }
  html += `<hr style="border: 1px solid #000; margin: 16px 0;" />`;

  // Questions
  questions.forEach((eq, index) => {
    const q = eq.question;
    html += `<p><strong>Câu ${index + 1}</strong> <em>(${eq.points} điểm)</em>. ${q.content}</p>`;

    if (q.question_type === "trac_nghiem" && q.options) {
      q.options.forEach((opt) => {
        html += `<p style="margin-left: 40px;"><strong>${opt.key}.</strong> ${opt.value}</p>`;
      });
    }

    if (options.showAnswer && q.answer) {
      html += `<p style="margin-left: 20px; color: blue;"><strong>Đáp án:</strong> ${q.answer}</p>`;
    }

    if (options.showSolution && q.solution) {
      html += `<p style="margin-left: 20px; color: green;"><strong>Lời giải:</strong> ${q.solution}</p>`;
    }
  });

  html += `<p style="text-align: center; font-weight: bold; margin-top: 24px;">--- HẾT ---</p>`;
  html += `</div>`;

  // Use Clipboard API with HTML format
  try {
    const blob = new Blob([html], { type: "text/html" });
    const plainText = html.replace(/<[^>]*>/g, "");
    const plainBlob = new Blob([plainText], { type: "text/plain" });

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": blob,
        "text/plain": plainBlob,
      }),
    ]);

    return true;
  } catch (err) {
    console.error("Copy failed:", err);
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = html.replace(/<[^>]*>/g, "");
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  }
}
