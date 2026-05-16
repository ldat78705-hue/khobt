"use client";

import { useState, useRef, useCallback } from "react";
import { Bold, Italic, List, Image as ImageIcon, Eye, EyeOff, X, Loader2, ZoomIn, Maximize2 } from "lucide-react";
import { MathRenderer, CloudinaryImage } from "./MathRenderer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const IMAGE_SIZES = [
  { key: 'small', label: 'Nhỏ', width: '200px', desc: '200px' },
  { key: 'medium', label: 'Vừa', width: '350px', desc: '350px' },
  { key: 'large', label: 'Lớn', width: '500px', desc: '500px' },
  { key: 'full', label: 'Full', width: '100%', desc: '100%' },
];

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  images?: string[];
  onImagesChange?: (images: string[]) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  previewLabel?: string;
  previewBgClass?: string;
  maxImages?: number;
}

interface LatexItem {
  label: string;
  latex?: string;
  template?: string;
  placeholders?: string[];
  desc?: string;
}

/** Tabs for LaTeX toolbar */
const LATEX_TABS = [
  {
    key: 'basic', label: 'Cơ bản', items: [
      { label: 'a/b', template: '\frac{@1}{@2}', placeholders: ['Tử số', 'Mẫu số'], desc: 'Phân số' },
      { label: '√', template: '\sqrt{@1}', placeholders: ['Biểu thức trong căn'], desc: 'Căn bậc 2' },
      { label: 'ⁿ√', template: '\sqrt[@1]{@2}', placeholders: ['Bậc (n)', 'Biểu thức trong căn'], desc: 'Căn bậc n' },
      { label: 'x²', template: '{@1}^{@2}', placeholders: ['Cơ số', 'Số mũ'], desc: 'Lũy thừa' },
      { label: 'xₙ', template: '{@1}_{@2}', placeholders: ['Biến', 'Chỉ số'], desc: 'Chỉ số dưới' },
      { label: '±', latex: '\pm' },
      { label: '×', latex: '\times' },
      { label: '÷', latex: '\div' },
    ] as LatexItem[]
  },
  {
    key: 'compare', label: 'Ký hiệu', items: [
      { label: '≤', latex: '\leq' },
      { label: '≥', latex: '\geq' },
      { label: '≠', latex: '\neq' },
      { label: '≈', latex: '\approx' },
      { label: '∞', latex: '\infty' },
      { label: '∈', latex: '\in' },
      { label: '∀', latex: '\forall' },
      { label: '∃', latex: '\exists' },
      { label: '→', latex: '\Rightarrow' },
      { label: '↔', latex: '\Leftrightarrow' },
    ] as LatexItem[]
  },
  {
    key: 'geo', label: 'Hình học', items: [
      { label: '∠', latex: '\angle' },
      { label: '△', latex: '\triangle' },
      { label: '⊥', latex: '\perp' },
      { label: '∥', latex: '\parallel' },
      { label: '⃗', template: '\overrightarrow{@1}', placeholders: ['Tên vector (VD: AB)'], desc: 'Vector' },
      { label: '○', latex: '(O;R)' },
      { label: '≅', latex: '\cong' },
      { label: '∼', latex: '\sim' },
    ] as LatexItem[]
  },
  {
    key: 'struct', label: 'Cấu trúc', items: [
      { label: 'Hệ PT', template: '\begin{cases} @1 \\ @2 \end{cases}', placeholders: ['Phương trình 1', 'Phương trình 2'], desc: 'Hệ phương trình' },
      { label: 'Tổng', template: '\sum_{@1}^{@2}', placeholders: ['Bắt đầu (VD: i=1)', 'Kết thúc (VD: n)'], desc: 'Tổng sigma' },
      { label: 'Tích phân', template: '\int_{@1}^{@2}', placeholders: ['Cận dưới', 'Cận trên'], desc: 'Tích phân' },
      { label: 'Giới hạn', template: '\lim_{@1}', placeholders: ['Điều kiện (VD: x \to \infty)'], desc: 'Giới hạn' },
      { label: 'Ma trận', template: '\begin{pmatrix} @1 & @2 \\ @3 & @4 \end{pmatrix}', placeholders: ['a', 'b', 'c', 'd'], desc: 'Ma trận 2×2' },
    ] as LatexItem[]
  },
];

/**
 * Rich Editor component with:
 * - LaTeX toolbar (tabs: Cơ bản, Ký hiệu, Hình học, Cấu trúc)
 * - Inline image upload → inserts ![hình](url) at cursor position
 * - Side-by-side live preview (renders inline images)
 * - Supports drag & drop, paste images
 */
export default function RichEditor({
  value, onChange, images = [], onImagesChange,
  placeholder = "Nhập nội dung...", label, rows = 6,
  previewLabel = "Xem trước", previewBgClass = "",
  maxImages = 5,
}: RichEditorProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState('medium');
  const [popupItem, setPopupItem] = useState<LatexItem | null>(null);
  const [popupInputs, setPopupInputs] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Build LaTeX from template + inputs */
  const buildLatex = (item: LatexItem, inputs: string[]): string => {
    if (!item.template) return item.latex || '';
    let result = item.template;
    inputs.forEach((val, i) => {
      result = result.replace(`@${i + 1}`, val || '?');
    });
    return result;
  };

  /** Handle clicking a LaTeX toolbar button */
  const handleLatexClick = (item: LatexItem) => {
    if (item.template && item.placeholders) {
      // Complex item: open popup
      setPopupItem(item);
      setPopupInputs(item.placeholders.map(() => ''));
    } else if (item.latex) {
      // Simple item: insert directly
      insertAtCursor(item.latex);
    }
  };

  const handlePopupInsert = () => {
    if (!popupItem) return;
    const latex = buildLatex(popupItem, popupInputs);
    insertAtCursor(latex);
    setPopupItem(null);
    setPopupInputs([]);
  };

  /** Insert text at cursor position in textarea */
  const insertAtCursorRaw = useCallback((text: string) => {
    const ta = textareaRef.current;
    if (!ta) { onChange(value + text); return; }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = value.substring(0, start);
    const after = value.substring(end);
    onChange(before + text + after);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + text.length, start + text.length); }, 0);
  }, [value, onChange]);

  const insertAtCursor = useCallback((text: string) => {
    insertAtCursorRaw('$' + text + '$');
  }, [insertAtCursorRaw]);

  const insertText = useCallback((prefix: string, suffix: string = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.substring(start, end);
    const before = value.substring(0, start);
    const after = value.substring(end);
    const inserted = prefix + (selected || 'text') + suffix;
    onChange(before + inserted + after);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + prefix.length, start + prefix.length + (selected || 'text').length); }, 0);
  }, [value, onChange]);

  /** Upload images and INSERT inline ![hình](url) at cursor position */
  const handleUploadImage = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    if (images.length + fileArr.length > maxImages) {
      toast.error(`Tối đa ${maxImages} ảnh`);
      return;
    }
    setIsUploading(true);
    const newImages: string[] = [];
    for (const file of fileArr) {
      if (!file.type.startsWith('image/')) { toast.error('Chỉ chấp nhận file ảnh'); continue; }
      if (file.size > 10 * 1024 * 1024) { toast.error('File quá lớn (max 10MB)'); continue; }
      
      let uploadedUrl: string | null = null;
      let isFallback = false;

      // Strategy 1: Server API upload
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          if (!data.fallback) {
            uploadedUrl = data.url;
          }
        }
      } catch { /* try next strategy */ }

      // Strategy 2: Client-side direct Cloudinary upload
      if (!uploadedUrl) {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (cloudName) {
          const presets = ['khodetoan_unsigned', 'ml_default', 'khodetoan'];
          for (const preset of presets) {
            try {
              const cloudForm = new FormData();
              cloudForm.append('file', file);
              cloudForm.append('upload_preset', preset);
              cloudForm.append('folder', 'khodetoan');
              const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: 'POST', body: cloudForm });
              if (res.ok) {
                const data = await res.json();
                uploadedUrl = data.secure_url;
                break;
              }
            } catch { continue; }
          }
        }
      }

      // Strategy 3: Compressed base64 fallback
      if (!uploadedUrl) {
        isFallback = true;
        uploadedUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let w = img.width, h = img.height;
              const maxW = 1200;
              if (w > maxW) { h = (h * maxW) / w; w = maxW; }
              canvas.width = w; canvas.height = h;
              canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.src = reader.result as string;
          };
          reader.readAsDataURL(file);
        });
      }

      if (uploadedUrl) {
        newImages.push(uploadedUrl);
        if (isFallback) toast.warning('Ảnh lưu tạm base64 (Cloudinary chưa cấu hình)');
      }
    }
    if (newImages.length > 0) {
      // Add to images array for persistence
      if (onImagesChange) onImagesChange([...images, ...newImages]);
      // Insert inline markdown at cursor
      const markdownImages = newImages.map((url) => `![hình:${imageSize}](${url})`).join('\n');
      insertAtCursorRaw('\n' + markdownImages + '\n');
      toast.success(`Đã chèn ${newImages.length} ảnh vào nội dung`);
    }
    setIsUploading(false);
  }, [images, maxImages, onImagesChange, insertAtCursorRaw, imageSize]);

  const removeImage = (index: number) => {
    const imgUrl = images[index];
    if (onImagesChange) onImagesChange(images.filter((_, i) => i !== index));
    // Also remove from content if present
    const pattern = new RegExp(`!\\[.*?\\]\\(${imgUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)\\n?`, 'g');
    onChange(value.replace(pattern, ''));
  };

  // Drag and drop handlers
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) handleUploadImage(e.dataTransfer.files);
  }, [handleUploadImage]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageItems = items.filter(item => item.type.startsWith('image/'));
    if (imageItems.length > 0) {
      e.preventDefault();
      const files = imageItems.map(item => item.getAsFile()).filter(Boolean) as File[];
      handleUploadImage(files);
    }
  }, [handleUploadImage]);

  const activeTabItems = LATEX_TABS.find(t => t.key === activeTab)?.items || [];

  /** Parse content: render inline images from ![alt](url) markdown */
  const renderPreview = () => {
    if (!value.trim()) return <p className="text-sm text-slate-400 italic">Nội dung sẽ hiển thị ở đây...</p>;

    // Split content by image markers
    const parts = value.split(/(!\[.*?\]\(.*?\))/g);
    return (
      <div className="text-sm text-slate-800 leading-relaxed space-y-2">
        {parts.map((part, i) => {
          const imgMatch = part.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            const [, alt, src] = imgMatch;
            // Parse size from alt text like "hình:medium" or "hình:small"
            const sizeMatch = alt.match(/:(small|medium|large|full)$/);
            const sizeKey = sizeMatch ? sizeMatch[1] : 'medium';
            const sizeConfig = IMAGE_SIZES.find(s => s.key === sizeKey) || IMAGE_SIZES[1];
            return (
              <div key={i} className="my-2">
                <CloudinaryImage src={src} alt={alt || 'Hình minh họa'} className="border border-slate-200 shadow-sm rounded-lg cursor-pointer" style={{ maxWidth: sizeConfig.width }} />
              </div>
            );
          }
          if (part.trim()) {
            return <MathRenderer key={i} content={part} className="leading-relaxed" />;
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>}
      <p className="text-xs text-slate-400">Hỗ trợ LaTeX: dùng $...$ cho inline và $$...$$ cho block</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: Editor */}
        <div className="space-y-0">
          {/* Toolbar */}
          <div className="border border-slate-200 rounded-t-xl bg-white overflow-hidden">
            {/* Format buttons + Image */}
            <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50/50">
              <button type="button" onClick={() => insertText('**', '**')} className="p-1.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700" title="Bold">
                <Bold className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => insertText('*', '*')} className="p-1.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700" title="Italic">
                <Italic className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor('\\sum')} className="p-1.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 font-serif text-sm" title="Sigma">
                Σ
              </button>
              <button type="button" onClick={() => insertText('\n- ', '')} className="p-1.5 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700" title="List">
                <List className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-slate-200 mx-1" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-blue-50 text-slate-500 hover:text-blue-600 text-xs font-medium border border-transparent hover:border-blue-200 transition-all"
                title="Chèn ảnh tại vị trí con trỏ"
              >
                {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                Chèn ảnh
              </button>
              <select
                value={imageSize}
                onChange={e => setImageSize(e.target.value)}
                className="px-1.5 py-1 text-[10px] border border-slate-200 rounded-md bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
                title="Kích thước ảnh"
              >
                {IMAGE_SIZES.map(s => (
                  <option key={s.key} value={s.key}>{s.label} ({s.desc})</option>
                ))}
              </select>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => { if (e.target.files) handleUploadImage(e.target.files); e.target.value = ''; }}
              />
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 text-xs lg:hidden"
              >
                {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPreview ? 'Ẩn' : 'Xem'}
              </button>
            </div>

            {/* LaTeX tabs */}
            <div className="flex items-center gap-0 border-b border-slate-100">
              {LATEX_TABS.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium transition-colors border-b-2",
                    activeTab === tab.key ? "border-blue-500 text-blue-600 bg-blue-50/50" : "border-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* LaTeX buttons */}
            <div className="flex items-center gap-1 px-2 py-1.5 flex-wrap">
              {activeTabItems.map((item: LatexItem, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleLatexClick(item)}
                  className={cn(
                    "px-2.5 py-1 text-xs font-mono border rounded-md transition-colors",
                    item.template
                      ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                      : "bg-slate-50 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                  )}
                  title={item.desc || item.latex || item.label}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onPaste={handlePaste}
            className="w-full px-4 py-3 border border-slate-200 border-t-0 rounded-b-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y font-mono leading-relaxed"
          />

          {/* Inline image thumbnails */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, i) => (
                <div key={i} className="relative group w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                  <img src={img.startsWith('data:') || img.startsWith('http') ? img : `https://res.cloudinary.com/dkpwpfqzi/image/upload/${img}`} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1">
                    <button type="button" onClick={() => setZoomImage(img)} className="hidden group-hover:flex p-1 rounded-full bg-white/80 text-slate-600 hover:bg-white">
                      <ZoomIn className="w-3 h-3" />
                    </button>
                    <button type="button" onClick={() => removeImage(i)} className="hidden group-hover:flex p-1 rounded-full bg-white/80 text-red-500 hover:bg-white">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {onImagesChange && (
            <p className="text-[10px] text-slate-400 mt-1">Kéo thả ảnh vào đây, hoặc dán (Ctrl+V). Ảnh sẽ chèn tại vị trí con trỏ. Tối đa {maxImages} ảnh.</p>
          )}
        </div>

        {/* RIGHT: Preview */}
        <div className={cn("border border-slate-200 rounded-xl overflow-hidden", showPreview ? '' : 'hidden lg:block')}>
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> {previewLabel}
            </span>
          </div>
          <div className={cn("p-4 min-h-[160px] max-h-[400px] overflow-y-auto", previewBgClass)}>
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* LaTeX input popup */}
      {popupItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setPopupItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[420px] overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h3 className="text-sm font-bold text-slate-800">{popupItem.desc || popupItem.label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Nhập biểu thức rồi nhấn &quot;Chèn&quot;</p>
            </div>
            <div className="p-5 space-y-3">
              {popupItem.placeholders?.map((ph, i) => (
                <div key={i}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{ph}</label>
                  <input
                    type="text"
                    value={popupInputs[i] || ''}
                    onChange={e => {
                      const next = [...popupInputs];
                      next[i] = e.target.value;
                      setPopupInputs(next);
                    }}
                    onKeyDown={e => { if (e.key === 'Enter') handlePopupInsert(); }}
                    placeholder={ph}
                    autoFocus={i === 0}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              ))}

              {/* Live preview */}
              <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 min-h-[48px] flex items-center justify-center">
                <MathRenderer
                  content={`$${buildLatex(popupItem, popupInputs)}$`}
                  className="text-lg"
                />
              </div>

              {/* Code preview */}
              <div className="text-[11px] font-mono text-slate-400 bg-slate-50 px-3 py-1.5 rounded border border-slate-100 break-all">
                ${buildLatex(popupItem, popupInputs)}$
              </div>
            </div>
            <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2 justify-end bg-slate-50/50">
              <button
                type="button"
                onClick={() => setPopupItem(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handlePopupInsert}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
              >
                Chèn công thức
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image zoom modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setZoomImage(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <button onClick={() => setZoomImage(null)} className="absolute -top-3 -right-3 p-1.5 rounded-full bg-white shadow-lg text-slate-600 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>
            <img src={zoomImage.startsWith('data:') || zoomImage.startsWith('http') ? zoomImage : `https://res.cloudinary.com/dkpwpfqzi/image/upload/${zoomImage}`} alt="Phóng to" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
