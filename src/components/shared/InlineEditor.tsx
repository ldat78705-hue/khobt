"use client";

import { useState } from "react";
import { MathRenderer } from "./MathRenderer";
import { cn } from "@/lib/utils";

export function InlineEditor({ value, onChange, className, placeholder }: { value: string, onChange: (val: string) => void, className?: string, placeholder?: string }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Phân tích văn bản thành các token: text, inline-math, block-math, image
  const tokens = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$]+?\$|!\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', content: value.substring(lastIndex, match.index) });
    }
    const val = match[0];
    if (val.startsWith('$$')) tokens.push({ type: 'block-math', content: val.substring(2, val.length - 2) });
    else if (val.startsWith('$')) tokens.push({ type: 'inline-math', content: val.substring(1, val.length - 1) });
    else tokens.push({ type: 'image', content: val });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < value.length) {
    tokens.push({ type: 'text', content: value.substring(lastIndex) });
  }

  // Nếu không có token nào, tạo 1 text token trống
  if (tokens.length === 0) {
    tokens.push({ type: 'text', content: '' });
  }

  const updateToken = (idx: number, newContent: string) => {
    const newTokens = [...tokens];
    newTokens[idx].content = newContent;
    const newValue = newTokens.map(t => {
      if (t.type === 'text') return t.content;
      if (t.type === 'block-math') return `$$${t.content}$$`;
      if (t.type === 'inline-math') return `$${t.content}$`;
      return t.content;
    }).join('');
    onChange(newValue);
  };

  return (
    <div className={cn("inline-editor leading-relaxed text-slate-800 text-sm", className)}>
      {tokens.map((t, i) => {
        const isEditing = editingIndex === i;

        if (t.type === 'text') {
          if (isEditing) {
            return (
              <textarea
                key={i}
                autoFocus
                defaultValue={t.content}
                onBlur={(e) => { updateToken(i, e.target.value); setEditingIndex(null); }}
                className="w-full bg-yellow-50 border border-yellow-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[80px] resize-y my-1"
                placeholder={placeholder || "Nhập văn bản..."}
              />
            );
          }
          return (
            <span
              key={i}
              onClick={() => setEditingIndex(i)}
              className="cursor-pointer hover:bg-yellow-100/60 transition-colors rounded outline-none whitespace-pre-wrap"
              title="Nhấn để sửa văn bản"
            >
              {t.content || (tokens.length === 1 && !t.content ? <span className="text-slate-400 italic">{placeholder || "Nhập văn bản..."}</span> : ' ')}
            </span>
          );
        }

        if (t.type === 'inline-math' || t.type === 'block-math') {
          const isBlock = t.type === 'block-math';
          if (isEditing) {
            return (
              <span key={i} className={cn("relative z-10", isBlock ? "block my-2" : "inline-block align-middle mx-1")}>
                <span className="absolute -top-5 left-0 text-[10px] text-blue-600 font-semibold bg-blue-100 px-1.5 py-0.5 rounded-t border border-blue-300 border-b-0">
                  LaTeX {isBlock ? '(Block)' : '(Inline)'}
                </span>
                <input
                  autoFocus
                  defaultValue={t.content}
                  onBlur={(e) => { updateToken(i, e.target.value); setEditingIndex(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { updateToken(i, e.currentTarget.value); setEditingIndex(null); } }}
                  className={cn(
                    "bg-blue-50 border border-blue-300 text-blue-800 rounded-b rounded-tr px-2 py-1 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm",
                    isBlock ? "w-full max-w-lg" : "min-w-[120px]"
                  )}
                  style={!isBlock ? { width: `${Math.max(120, t.content.length * 8)}px` } : {}}
                />
              </span>
            );
          }
          return (
            <span
              key={i}
              onClick={() => setEditingIndex(i)}
              className={cn(
                "cursor-pointer hover:bg-blue-50 hover:ring-2 hover:ring-blue-300 transition-all rounded",
                isBlock ? "block text-center my-2 py-2" : "inline-block px-1"
              )}
              title="Nhấn để sửa công thức LaTeX"
            >
              <MathRenderer content={isBlock ? `$$${t.content}$$` : `$${t.content}$`} />
            </span>
          );
        }

        if (t.type === 'image') {
          return <span key={i}>{t.content}</span>;
        }

        return null;
      })}
    </div>
  );
}
