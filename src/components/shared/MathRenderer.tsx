"use client";

import { useEffect, useRef, memo } from "react";
import katex from "katex";

interface MathRendererProps {
  /** Nội dung chứa LaTeX ($...$ inline, $$...$$ block) */
  content: string;
  /** CSS class bổ sung */
  className?: string;
}

/**
 * Render nội dung text + LaTeX thành HTML với KaTeX.
 * - Inline math: $...$
 * - Block math: $$...$$
 * - Hỗ trợ tất cả LaTeX commands phổ biến trong toán THCS
 */
function MathRendererInner({ content, className }: MathRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !content) return;

    // Parse content: split by $$...$$ and $...$
    const html = renderMathContent(content);
    ref.current.innerHTML = html;
  }, [content]);

  return (
    <div
      ref={ref}
      className={`math-content ${className || ''}`}
    />
  );
}

export const MathRenderer = memo(MathRendererInner);

/**
 * Render LaTeX content to HTML string (for use in clipboard, etc.)
 */
export function renderMathContent(text: string): string {
  if (!text) return '';

  // First handle block math ($$...$$) - these become centered blocks
  let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, latex) => {
    try {
      return `<div class="katex-block">${katex.renderToString(latex.trim(), {
        displayMode: true,
        throwOnError: false,
        trust: true,
        strict: false,
      })}</div>`;
    } catch {
      return `<div class="katex-error">${latex}</div>`;
    }
  });

  // Then handle inline math ($...$)
  result = result.replace(/\$([^$]+?)\$/g, (_, latex) => {
    try {
      return katex.renderToString(latex.trim(), {
        displayMode: false,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return `<span class="katex-error">${latex}</span>`;
    }
  });

  // Handle markdown tables: detect lines starting with |
  result = renderMarkdownTables(result);

  // Convert newlines to <br> (preserve line breaks in content)
  result = result.replace(/\n/g, '<br/>');

  return result;
}

/**
 * Parse markdown-style tables into HTML tables
 * Detects consecutive lines starting with | and converts them
 */
function renderMarkdownTables(text: string): string {
  const lines = text.split('\n');
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    // Check if this line starts a table (starts with |)
    if (lines[i].trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        output.push(buildHtmlTable(tableLines));
      } else {
        output.push(...tableLines);
      }
    } else {
      output.push(lines[i]);
      i++;
    }
  }

  return output.join('\n');
}

function buildHtmlTable(lines: string[]): string {
  const parseRow = (line: string): string[] => {
    return line
      .replace(/^\|/, '').replace(/\|$/, '') // strip leading/trailing |
      .split('|')
      .map(cell => cell.trim());
  };

  // Check if second line is separator (|---|---|)
  const isSeparator = (line: string): boolean => {
    return /^\|[\s\-:|]+\|$/.test(line.trim()) || 
           /^[\s\-:|]+$/.test(line.replace(/\|/g, '').trim());
  };

  let headerCells: string[] | null = null;
  const bodyRows: string[][] = [];

  let startIdx = 0;
  if (lines.length >= 2 && isSeparator(lines[1])) {
    headerCells = parseRow(lines[0]);
    startIdx = 2;
  }

  for (let j = startIdx; j < lines.length; j++) {
    if (!isSeparator(lines[j])) {
      bodyRows.push(parseRow(lines[j]));
    }
  }

  let html = '<table class="md-table">';
  if (headerCells) {
    html += '<thead><tr>';
    headerCells.forEach(cell => { html += `<th>${cell}</th>`; });
    html += '</tr></thead>';
  }
  html += '<tbody>';
  bodyRows.forEach(row => {
    html += '<tr>';
    row.forEach(cell => { html += `<td>${cell}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table>';

  return html;
}

/**
 * Component hiển thị ảnh từ Cloudinary với lazy loading
 */
export function CloudinaryImage({ src, alt, className, style }: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Xử lý URL - hỗ trợ base64, http, và Cloudinary public_id
  const imageUrl = src.startsWith('http') || src.startsWith('data:')
    ? src
    : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkpwpfqzi'}/image/upload/q_auto,f_auto/${src}`;

  return (
    <img
      src={imageUrl}
      alt={alt || 'Hình minh họa'}
      className={`rounded-lg max-w-full h-auto ${className || ''}`}
      style={style}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

/**
 * Component hiển thị đầy đủ nội dung bài tập: text + LaTeX + hình ảnh inline
 * Hỗ trợ markdown ảnh: ![hình:small](url), ![hình:medium](url), ![hình:large](url), ![hình:full](url)
 */
export function QuestionContent({ content, images, className }: {
  content: string;
  images?: string[];
  className?: string;
}) {
  const IMAGE_SIZES: Record<string, string> = { small: '200px', medium: '350px', large: '500px', full: '100%' };

  // Split content by inline image markdown
  const parts = content.split(/(!\[.*?\]\(.*?\))/g);
  const hasInlineImages = parts.some(p => /^!\[.*?\]\(.*?\)$/.test(p));

  return (
    <div className={className}>
      {hasInlineImages ? (
        <div className="space-y-2">
          {parts.map((part, i) => {
            const imgMatch = part.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imgMatch) {
              const [, alt, src] = imgMatch;
              const sizeMatch = alt.match(/:(small|medium|large|full)$/);
              const sizeKey = sizeMatch ? sizeMatch[1] : 'medium';
              const maxWidth = IMAGE_SIZES[sizeKey] || '350px';
              return (
                <div key={i} className="my-2">
                  <CloudinaryImage src={src} alt={alt || 'Hình minh họa'} className="border border-slate-200 shadow-sm rounded-lg" style={{ maxWidth }} />
                </div>
              );
            }
            if (part.trim()) {
              return <MathRenderer key={i} content={part} className="question-content leading-relaxed" />;
            }
            return null;
          })}
        </div>
      ) : (
        <>
          <MathRenderer content={content} className="question-content leading-relaxed" />
          {images && images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {images.map((img, i) => (
                <CloudinaryImage
                  key={i}
                  src={img}
                  alt={`Hình ${i + 1}`}
                  className="max-w-xs border border-slate-200 shadow-sm"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
