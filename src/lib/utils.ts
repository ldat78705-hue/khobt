import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/** Strip LaTeX markup to readable text for search results / tooltips */
export function stripLatex(text: string): string {
  return text
    .replace(/\$\$(.*?)\$\$/g, ' $1 ')     // display math
    .replace(/\$(.*?)\$/g, '$1')             // inline math
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
    .replace(/\\sqrt\{([^}]*)\}/g, '√($1)')
    .replace(/\\(?:left|right|Big|big)[()[\]{}|.]/g, '')
    .replace(/\\(?:text|mathrm|mathbf)\{([^}]*)\}/g, '$1')
    .replace(/\\(?:cdot|times)/g, '×')
    .replace(/\\(?:pm)/g, '±')
    .replace(/\\(?:leq|le)/g, '≤')
    .replace(/\\(?:geq|ge)/g, '≥')
    .replace(/\\(?:neq|ne)/g, '≠')
    .replace(/\\(?:infty)/g, '∞')
    .replace(/\\(?:pi)/g, 'π')
    .replace(/\\(?:alpha)/g, 'α')
    .replace(/\\(?:beta)/g, 'β')
    .replace(/\\(?:Delta)/g, 'Δ')
    .replace(/\^{([^}]*)}/g, '^$1')
    .replace(/_{([^}]*)}/g, '_$1')
    .replace(/\\\\/g, ' ')
    .replace(/\\[a-zA-Z]+/g, '')             // remaining commands
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateVariantCode(index: number): string {
  return String(index + 1).padStart(3, '0');
}

// Shuffle array using Fisher-Yates algorithm
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    nhan_biet: 'bg-green-100 text-green-700 border-green-200',
    thong_hieu: 'bg-blue-100 text-blue-700 border-blue-200',
    van_dung: 'bg-amber-100 text-amber-700 border-amber-200',
    van_dung_cao: 'bg-red-100 text-red-700 border-red-200',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    nhan_biet: 'Nhận biết',
    thong_hieu: 'Thông hiểu',
    van_dung: 'Vận dụng',
    van_dung_cao: 'Vận dụng cao',
  };
  return labels[difficulty] || difficulty;
}

export function getTopicLabel(topic: string): string {
  const labels: Record<string, string> = {
    so_hoc: 'Số học',
    phan_so: 'Phân số',
    hinh_hoc: 'Hình học',
    bieu_thuc: 'Biểu thức',
    phuong_trinh: 'Phương trình',
    ham_so: 'Hàm số',
    tam_giac: 'Tam giác',
    duong_tron: 'Đường tròn',
    thong_ke: 'Thống kê',
    xac_suat: 'Xác suất',
    he_phuong_trinh: 'Hệ phương trình',
    bat_phuong_trinh: 'Bất phương trình',
    can_thuc: 'Căn thức',
    da_thuc: 'Đa thức',
    khac: 'Khác',
  };
  return labels[topic] || topic;
}

export function getQuestionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    trac_nghiem: 'Trắc nghiệm',
    tu_luan: 'Tự luận',
    dung_sai: 'Đúng/Sai',
    dien_dap_an: 'Điền đáp án',
  };
  return labels[type] || type;
}
