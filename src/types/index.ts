// ==========================================
// KhoDeToán - Type Definitions
// ==========================================

// User / Profile types
export type UserRole = 'admin' | 'teacher' | 'reviewer';

export interface UserPermissions {
  can_create_questions: boolean;
  can_review_questions: boolean;
  can_manage_categories: boolean;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  avatar_url?: string;
  permissions: UserPermissions;
  created_at: string;
  updated_at: string;
}

// Category types (admin-managed)
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id: string | null;
  grade?: number | null; // Lớp áp dụng, null = tất cả các lớp
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  children?: Category[];
}

// Loại đề thi (admin-managed)
export interface ExamType {
  id: string;
  name: string; // VD: "Đề kiểm tra 15 phút", "Đề thi giữa kỳ"
  slug: string;
  description?: string;
  duration_minutes?: number; // Thời gian mặc định (phút)
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Cấu hình lớp (admin-managed)
export interface GradeConfig {
  id: string;
  grade: number;
  name: string; // "Lớp 4", "Lớp 9"
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Folder types
export interface Folder {
  id: string;
  name: string;
  parent_id: string | null;
  user_id: string;
  color: string;
  icon: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  children?: Folder[];
  exam_count?: number;
}

// Question types
export type Grade = 4 | 5 | 6 | 7 | 8 | 9;

export type Topic =
  | 'so_hoc'
  | 'phan_so'
  | 'so_thap_phan'
  | 'do_luong'
  | 'ti_le'
  | 'hinh_hoc'
  | 'bieu_thuc'
  | 'phuong_trinh'
  | 'ham_so'
  | 'tam_giac'
  | 'duong_tron'
  | 'thong_ke'
  | 'xac_suat'
  | 'he_phuong_trinh'
  | 'bat_phuong_trinh'
  | 'can_thuc'
  | 'da_thuc'
  | 'khac';

export type Difficulty = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';

export type QuestionType = 'trac_nghiem' | 'tu_luan' | 'dung_sai' | 'dien_dap_an';

export interface QuestionOption {
  key: string; // A, B, C, D
  value: string; // Nội dung (có thể chứa LaTeX)
}

export type QuestionStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface Question {
  id: string;
  question_code?: string; // Mã bài tập: BT001, BT002...
  content: string;
  answer?: string;
  solution?: string;
  grade: Grade;
  topic: Topic;
  difficulty: Difficulty;
  question_type: QuestionType;
  options?: QuestionOption[];
  correct_answer?: string;
  images?: string[];
  answer_images?: string[];
  solution_images?: string[];
  tags?: string[];
  user_id: string;
  is_public: boolean;
  status: QuestionStatus;
  category_id?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  review_note?: string;
  created_at: string;
  updated_at: string;
  // Joined
  reviewer?: Profile;
  author?: Profile;
  category?: Category;
  // Favorites
  favorite_count?: number;
}

// Favorite / Saved items
export interface FavoriteQuestion {
  id: string;
  user_id: string;
  question_id: string;
  created_at: string;
}

export interface SavedExam {
  id: string;
  user_id: string;
  exam_id: string;
  created_at: string;
}

// Notifications
export type NotificationType = 'report_question' | 'question_approved' | 'question_rejected' | 'system';

export interface Notification {
  id: string;
  user_id: string; // recipient
  type: NotificationType;
  title: string;
  message: string;
  link?: string; // e.g. /questions/abc
  is_read: boolean;
  created_at: string;
}

// Question reports (báo sai)
export interface QuestionReport {
  id: string;
  question_id: string;
  user_id: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
}

// Exam types
export type ExamStatus = 'personal' | 'pending' | 'shared' | 'rejected';

export interface Exam {
  id: string;
  title: string;
  description?: string;
  grade: Grade;
  duration?: number;
  folder_id?: string;
  user_id: string;
  tags?: string[];
  settings: ExamSettings;
  is_template: boolean;
  exam_status: ExamStatus; // personal = chỉ GV thấy, pending = chờ duyệt, shared = kho chung
  submitted_at?: string; // Thời điểm gửi lên kho
  reviewed_by?: string;
  review_note?: string;
  created_at: string;
  updated_at: string;
  questions?: ExamQuestion[];
  question_count?: number;
  author?: Profile; // Joined
}

export interface ExamSettings {
  show_answer?: boolean;
  show_solution?: boolean;
  shuffle_questions?: boolean;
  shuffle_options?: boolean;
  school_name?: string;
  exam_type?: string; // Kiểm tra giữa kỳ, cuối kỳ...
  school_year?: string;
  subject?: string;
  // CamelCase aliases (used in print preview / new exam form)
  schoolName?: string;
  examType?: string;
  schoolYear?: string;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_id: string;
  sort_order: number;
  points: number;
  section?: string;
  created_at: string;
  question?: Question;
}

export interface ExamVariant {
  id: string;
  exam_id: string;
  variant_code: string;
  question_order: number[];
  option_orders: Record<string, string[]>;
  created_at: string;
}

// Filter / Search types
export interface QuestionFilter {
  grade?: Grade;
  topic?: Topic;
  difficulty?: Difficulty;
  question_type?: QuestionType;
  search?: string;
  tags?: string[];
  user_id?: string;
  is_public?: boolean;
  status?: QuestionStatus;
  category_id?: string;
}

export interface ExamFilter {
  grade?: Grade;
  folder_id?: string;
  search?: string;
  tags?: string[];
}

// Question status constants
export const QUESTION_STATUSES: { value: QuestionStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Nháp', color: 'bg-gray-100 text-gray-600 border-gray-200' },
  { value: 'pending', label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'approved', label: 'Đã duyệt', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'rejected', label: 'Từ chối', color: 'bg-red-100 text-red-700 border-red-200' },
];

export const USER_ROLES: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'teacher', label: 'Giáo viên' },
  { value: 'reviewer', label: 'Giáo viên duyệt bài' },
];

// Constants
export const GRADES: { value: Grade; label: string }[] = [
  { value: 4, label: 'Toán 4' },
  { value: 5, label: 'Toán 5' },
  { value: 6, label: 'Toán 6' },
  { value: 7, label: 'Toán 7' },
  { value: 8, label: 'Toán 8' },
  { value: 9, label: 'Toán 9' },
];

export const TOPICS: { value: Topic; label: string }[] = [
  { value: 'so_hoc', label: 'Số học' },
  { value: 'phan_so', label: 'Phân số' },
  { value: 'so_thap_phan', label: 'Số thập phân' },
  { value: 'do_luong', label: 'Đo lường' },
  { value: 'ti_le', label: 'Tỉ lệ' },
  { value: 'hinh_hoc', label: 'Hình học' },
  { value: 'bieu_thuc', label: 'Biểu thức' },
  { value: 'phuong_trinh', label: 'Phương trình' },
  { value: 'ham_so', label: 'Hàm số' },
  { value: 'tam_giac', label: 'Tam giác' },
  { value: 'duong_tron', label: 'Đường tròn' },
  { value: 'thong_ke', label: 'Thống kê' },
  { value: 'xac_suat', label: 'Xác suất' },
  { value: 'he_phuong_trinh', label: 'Hệ phương trình' },
  { value: 'bat_phuong_trinh', label: 'Bất phương trình' },
  { value: 'can_thuc', label: 'Căn thức' },
  { value: 'da_thuc', label: 'Đa thức' },
  { value: 'khac', label: 'Khác' },
];

/** Chuyên đề theo từng lớp */
export const TOPICS_BY_GRADE: Record<Grade, Topic[]> = {
  4: ['so_hoc', 'phan_so', 'so_thap_phan', 'do_luong', 'hinh_hoc', 'thong_ke', 'khac'],
  5: ['so_hoc', 'phan_so', 'so_thap_phan', 'do_luong', 'ti_le', 'hinh_hoc', 'thong_ke', 'khac'],
  6: ['so_hoc', 'phan_so', 'so_thap_phan', 'hinh_hoc', 'bieu_thuc', 'thong_ke', 'xac_suat', 'khac'],
  7: ['so_hoc', 'ti_le', 'bieu_thuc', 'da_thuc', 'tam_giac', 'hinh_hoc', 'thong_ke', 'xac_suat', 'khac'],
  8: ['da_thuc', 'phuong_trinh', 'bieu_thuc', 'bat_phuong_trinh', 'tam_giac', 'hinh_hoc', 'thong_ke', 'xac_suat', 'khac'],
  9: ['can_thuc', 'phuong_trinh', 'he_phuong_trinh', 'bat_phuong_trinh', 'ham_so', 'tam_giac', 'duong_tron', 'hinh_hoc', 'thong_ke', 'xac_suat', 'khac'],
};

/** Lấy danh sách topic phù hợp cho một lớp cụ thể */
export function getTopicsForGrade(grade: Grade): { value: Topic; label: string }[] {
  const allowed = TOPICS_BY_GRADE[grade] || TOPICS.map(t => t.value);
  return TOPICS.filter(t => allowed.includes(t.value));
}

export const DIFFICULTIES: { value: Difficulty; label: string; color: string }[] = [
  { value: 'nhan_biet', label: 'Nhận biết', color: '#22c55e' },
  { value: 'thong_hieu', label: 'Thông hiểu', color: '#3b82f6' },
  { value: 'van_dung', label: 'Vận dụng', color: '#f59e0b' },
  { value: 'van_dung_cao', label: 'Vận dụng cao', color: '#ef4444' },
];

export const QUESTION_TYPES: { value: QuestionType; label: string; icon: string }[] = [
  { value: 'trac_nghiem', label: 'Trắc nghiệm', icon: 'circle-dot' },
  { value: 'tu_luan', label: 'Tự luận', icon: 'file-text' },
  { value: 'dung_sai', label: 'Đúng/Sai', icon: 'check-circle' },
  { value: 'dien_dap_an', label: 'Điền đáp án', icon: 'text-cursor' },
];
