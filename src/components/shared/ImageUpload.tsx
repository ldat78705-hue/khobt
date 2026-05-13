"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ZoomIn, Clipboard, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

/**
 * Upload ảnh với 3 chiến lược:
 * 1. Server API (/api/upload) → Cloudinary signed/unsigned
 * 2. Direct client → Cloudinary unsigned upload  
 * 3. Base64 fallback (khi không có Cloudinary)
 */
async function uploadFile(file: File): Promise<{ url: string; fallback?: boolean }> {
  // --- Strategy 1: Upload via server API ---
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const data = await res.json();
      if (!data.fallback) {
        return { url: data.url }; // Cloudinary success via server
      }
      // Server returned fallback, try client-side upload
    }
  } catch {
    // Server upload failed, try client-side
  }

  // --- Strategy 2: Direct client-side upload to Cloudinary ---
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName) {
    // Try multiple presets
    const presets = ['khodetoan_unsigned', 'ml_default', 'khodetoan'];
    
    for (const preset of presets) {
      try {
        const cloudForm = new FormData();
        cloudForm.append('file', file);
        cloudForm.append('upload_preset', preset);
        cloudForm.append('folder', 'khodetoan');

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: cloudForm }
        );

        if (res.ok) {
          const data = await res.json();
          return { url: data.secure_url };
        }
      } catch {
        continue; // Try next preset
      }
    }
  }

  // --- Strategy 3: Base64 fallback ---
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        const maxWidth = 1200;
        if (w > maxWidth) { h = (h * maxWidth) / w; w = maxWidth; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve({ url: canvas.toDataURL('image/jpeg', 0.8), fallback: true });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'cloudinary' | 'fallback'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    if (images.length + fileArr.length > maxImages) {
      toast.error(`Tối đa ${maxImages} ảnh`);
      return;
    }

    setIsUploading(true);
    const newImages: string[] = [];
    let usedFallback = false;

    for (const file of fileArr) {
      if (!file.type.startsWith('image/')) { toast.error('Chỉ chấp nhận file ảnh'); continue; }
      if (file.size > 10 * 1024 * 1024) { toast.error('File quá lớn (max 10MB)'); continue; }

      try {
        const result = await uploadFile(file);
        newImages.push(result.url);
        if (result.fallback) usedFallback = true;
      } catch {
        toast.error(`Không thể upload ${file.name}`);
      }
    }

    onChange([...images, ...newImages]);
    setIsUploading(false);
    
    if (newImages.length > 0) {
      if (usedFallback) {
        setUploadStatus('fallback');
        toast.warning('Ảnh lưu tạm dạng base64 (Cloudinary chưa cấu hình). Ảnh sẽ mất khi xóa dữ liệu trình duyệt.');
      } else {
        setUploadStatus('cloudinary');
        toast.success(`Đã upload ${newImages.length} ảnh lên Cloudinary!`);
      }
    }
  }, [images, maxImages, onChange]);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) processFiles(e.dataTransfer.files);
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      const files: File[] = [];
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            files.push(new File([blob], `paste-${Date.now()}.png`, { type }));
          }
        }
      }
      if (files.length > 0) {
        processFiles(files);
      } else {
        toast.error("Không có ảnh trong clipboard");
      }
    } catch {
      toast.error("Không thể đọc clipboard. Hãy thử Ctrl+V.");
    }
  };

  return (
    <div>
      <div
        className={`flex flex-wrap gap-3 p-3 rounded-xl border-2 border-dashed transition-colors ${
          isDragging ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-slate-50/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {images.map((img, i) => (
          <div key={i} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <img src={img} alt={`Ảnh ${i + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
              <button type="button" onClick={() => setPreviewImg(img)} className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                <ZoomIn className="w-3.5 h-3.5 text-slate-700" />
              </button>
              <button type="button" onClick={() => removeImage(i)} className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            {/* Cloudinary indicator */}
            {img.startsWith('https://res.cloudinary.com') && (
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center" title="Đã lưu trên Cloudinary">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
            {img.startsWith('data:') && (
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center" title="Lưu tạm base64">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
        {images.length < maxImages && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors disabled:opacity-50 bg-white"
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Thêm ảnh</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handlePaste}
              className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-green-500 hover:border-green-300 transition-colors bg-white"
              title="Dán ảnh từ clipboard"
            >
              <Clipboard className="w-5 h-5" />
              <span className="text-[10px] font-medium">Dán ảnh</span>
            </button>
          </div>
        )}
      </div>
      {images.length < maxImages && (
        <p className="text-[10px] text-slate-400 mt-1.5">Kéo thả ảnh vào đây, hoặc nhấn nút để chọn file. Tối đa {maxImages} ảnh, mỗi ảnh ≤ 10MB.</p>
      )}
      {uploadStatus === 'fallback' && (
        <p className="text-[10px] text-amber-500 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Ảnh lưu tạm base64. Cấu hình Cloudinary tại Admin → Cài đặt để lưu vĩnh viễn.
        </p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />

      {/* Preview modal */}
      {previewImg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8" onClick={() => setPreviewImg(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={previewImg} alt="Preview" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            <button
              onClick={() => setPreviewImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-50"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
