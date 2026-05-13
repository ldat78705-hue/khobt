"use client";

import { useState } from "react";

interface LatexToolbarProps {
  onInsert: (latex: string, cursorOffset?: number) => void;
}

const LATEX_GROUPS = [
  {
    label: "Cơ bản",
    items: [
      { label: "a/b", latex: "\\frac{}{}", offset: 6, tip: "Phân số" },
      { label: "√", latex: "\\sqrt{}", offset: 6, tip: "Căn bậc hai" },
      { label: "ⁿ√", latex: "\\sqrt[]{}", offset: 6, tip: "Căn bậc n" },
      { label: "xⁿ", latex: "^{}", offset: 2, tip: "Lũy thừa" },
      { label: "x₀", latex: "_{}", offset: 2, tip: "Chỉ số dưới" },
      { label: "±", latex: "\\pm ", offset: 4, tip: "Cộng trừ" },
      { label: "×", latex: "\\times ", offset: 7, tip: "Nhân" },
      { label: "÷", latex: "\\div ", offset: 5, tip: "Chia" },
    ],
  },
  {
    label: "Ký hiệu",
    items: [
      { label: "≤", latex: "\\leq ", offset: 5, tip: "Nhỏ hơn hoặc bằng" },
      { label: "≥", latex: "\\geq ", offset: 5, tip: "Lớn hơn hoặc bằng" },
      { label: "≠", latex: "\\neq ", offset: 5, tip: "Khác" },
      { label: "∈", latex: "\\in ", offset: 4, tip: "Thuộc" },
      { label: "⇒", latex: "\\Rightarrow ", offset: 12, tip: "Suy ra" },
      { label: "⇔", latex: "\\Leftrightarrow ", offset: 16, tip: "Tương đương" },
      { label: "∞", latex: "\\infty ", offset: 7, tip: "Vô cực" },
      { label: "∀", latex: "\\forall ", offset: 8, tip: "Với mọi" },
    ],
  },
  {
    label: "Hình học",
    items: [
      { label: "△", latex: "\\triangle ", offset: 10, tip: "Tam giác" },
      { label: "∠", latex: "\\angle ", offset: 7, tip: "Góc" },
      { label: "⊥", latex: "\\perp ", offset: 6, tip: "Vuông góc" },
      { label: "∥", latex: "\\parallel ", offset: 10, tip: "Song song" },
      { label: "°", latex: "°", offset: 1, tip: "Độ" },
      { label: "⊙", latex: "(O; R)", offset: 6, tip: "Đường tròn" },
    ],
  },
  {
    label: "Cấu trúc",
    items: [
      { label: "{ }", latex: "\\begin{cases}  \\\\  \\end{cases}", offset: 16, tip: "Hệ phương trình" },
      { label: "lim", latex: "\\lim_{x \\to }", offset: 12, tip: "Giới hạn" },
      { label: "Σ", latex: "\\sum_{i=1}^{n}", offset: 14, tip: "Tổng" },
      { label: "∫", latex: "\\int_{a}^{b}", offset: 12, tip: "Tích phân" },
      { label: "|x|", latex: "|{}|", offset: 2, tip: "Giá trị tuyệt đối" },
      { label: "x̄", latex: "\\bar{x}", offset: 7, tip: "Trung bình" },
      { label: "C", latex: "C^{k}_{n}", offset: 9, tip: "Tổ hợp" },
    ],
  },
];

export function LatexToolbar({ onInsert }: LatexToolbarProps) {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      {/* Group tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50">
        {LATEX_GROUPS.map((group, i) => (
          <button
            key={group.label}
            type="button"
            onClick={() => setActiveGroup(i)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              activeGroup === i
                ? "text-blue-600 bg-white border-b-2 border-blue-500"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex flex-wrap gap-1 p-2">
        {LATEX_GROUPS[activeGroup].items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onInsert(item.latex, item.offset)}
            title={item.tip}
            className="px-2.5 py-1.5 text-sm font-mono bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-lg transition-colors min-w-[36px] text-center"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
