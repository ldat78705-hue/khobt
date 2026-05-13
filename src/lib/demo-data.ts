/**
 * Demo Data Provider
 * Cho phép ứng dụng chạy đầy đủ chức năng khi chưa cấu hình Database.
 * Dữ liệu lưu trong localStorage.
 * Hỗ trợ: Neon / Supabase / Demo
 */

import type { Question, Profile, Exam, ExamQuestion, Folder, Category, FavoriteQuestion, SavedExam, Notification, QuestionReport } from '@/types';

const STORAGE_KEY = 'khodetoan_demo';

function isDatabaseConfigured(): boolean {
  // Check Neon
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.includes('neon.tech') || dbUrl.includes('neon.')) return true;
  // Check Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (supabaseUrl.length > 10 && supabaseUrl.startsWith('http')) return true;
  return false;
}

export const isDemoMode = !isDatabaseConfigured();

// Demo user
export const DEMO_USER: Profile = {
  id: 'demo-user-001',
  full_name: 'Giáo viên Demo',
  email: 'demo@khodetoan.vn',
  role: 'admin',
  is_active: true,
  permissions: { can_create_questions: true, can_review_questions: true, can_manage_categories: true },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Sample questions with LaTeX
const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1', question_code: 'BT001', content: 'Rút gọn biểu thức $P = \\frac{\\sqrt{x}+1}{\\sqrt{x}-2} + \\frac{2\\sqrt{x}}{\\sqrt{x}+2} + \\frac{2+5\\sqrt{x}}{4-x}$ với $x \\geq 0, x \\neq 4$.\n\na) Rút gọn $P$.\nb) Tính giá trị của $P$ khi $x = 9$.\nc) Tìm $x$ để $P = 2$.',
    answer: '$P = \\frac{3\\sqrt{x}}{\\sqrt{x}+2}$', solution: 'a) $P = \\frac{(\\sqrt{x}+1)(\\sqrt{x}+2) + 2\\sqrt{x}(\\sqrt{x}-2) - (2+5\\sqrt{x})}{(\\sqrt{x}-2)(\\sqrt{x}+2)}$\n\n$= \\frac{x+3\\sqrt{x}+2+2x-4\\sqrt{x}-2-5\\sqrt{x}}{x-4}$\n\n$= \\frac{3x-6\\sqrt{x}}{x-4} = \\frac{3\\sqrt{x}(\\sqrt{x}-2)}{(\\sqrt{x}-2)(\\sqrt{x}+2)} = \\frac{3\\sqrt{x}}{\\sqrt{x}+2}$',
    grade: 9, topic: 'can_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['rút gọn', 'căn thức'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-01T08:00:00Z', updated_at: '2024-10-01T08:00:00Z',
  },
  {
    id: 'q2', question_code: 'BT002', content: 'Giải hệ phương trình: $$\\begin{cases} 2x + y = 5 \\\\ x - 3y = -1 \\end{cases}$$',
    answer: '$x = 2, y = 1$', solution: 'Từ PT(1): $y = 5 - 2x$\nThay vào PT(2): $x - 3(5-2x) = -1$\n$\\Rightarrow x - 15 + 6x = -1$\n$\\Rightarrow 7x = 14 \\Rightarrow x = 2$\n$\\Rightarrow y = 5 - 4 = 1$',
    grade: 9, topic: 'he_phuong_trinh', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['hệ phương trình', 'bậc nhất'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-02T08:00:00Z', updated_at: '2024-10-02T08:00:00Z',
  },
  {
    id: 'q3', question_code: 'BT003', content: 'Cho đường tròn $(O; R)$ và điểm $A$ nằm ngoài đường tròn. Từ $A$ kẻ hai tiếp tuyến $AB, AC$ với đường tròn ($B, C$ là tiếp điểm). Gọi $H$ là giao điểm của $OA$ và $BC$.\n\na) Chứng minh tứ giác $ABOC$ nội tiếp.\nb) Chứng minh $AH \\cdot AO = AB^2$.\nc) Cho $OA = 2R$. Tính diện tích $\\triangle ABC$ theo $R$.',
    answer: 'c) $S_{\\triangle ABC} = \\frac{3R^2\\sqrt{3}}{4}$', solution: 'a) Vì $AB, AC$ là tiếp tuyến nên $\\angle ABO = \\angle ACO = 90°$\n$\\Rightarrow$ Tứ giác $ABOC$ nội tiếp đường tròn đường kính $AO$.\n\nb) $\\triangle ABH \\sim \\triangle AOB$ (g.g)\n$\\Rightarrow \\frac{AH}{AB} = \\frac{AB}{AO} \\Rightarrow AH \\cdot AO = AB^2$',
    grade: 9, topic: 'duong_tron', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['đường tròn', 'tiếp tuyến'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-03T08:00:00Z', updated_at: '2024-10-03T08:00:00Z',
  },
  {
    id: 'q4', question_code: 'BT004', content: 'Phương trình $x^2 - 5x + 6 = 0$ có hai nghiệm là:',
    options: [{key:'A',value:'$x=2$ và $x=3$'},{key:'B',value:'$x=-2$ và $x=-3$'},{key:'C',value:'$x=1$ và $x=6$'},{key:'D',value:'$x=-1$ và $x=-6$'}],
    correct_answer: 'A', answer: 'A', grade: 9, topic: 'phuong_trinh', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['phương trình bậc hai'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-04T08:00:00Z', updated_at: '2024-10-04T08:00:00Z',
  },
  {
    id: 'q5', question_code: 'BT005', content: 'Bảng sau ghi lại số điểm kiểm tra Toán của 30 học sinh lớp 9A:\n\n| Điểm | 5 | 6 | 7 | 8 | 9 | 10 |\n|------|---|---|---|---|---|----|\n| Số HS | 3 | 5 | 8 | 7 | 5 | 2 |\n\na) Tính số trung bình cộng.\nb) Tìm mốt của dấu hiệu.\nc) Vẽ biểu đồ hình cột.',
    answer: 'a) $\\bar{x} = 7,17$; b) $M_o = 7$', grade: 9, topic: 'thong_ke', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['thống kê', 'trung bình cộng'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-05T08:00:00Z', updated_at: '2024-10-05T08:00:00Z',
  },
  {
    id: 'q6', question_code: 'BT006', content: 'Một hộp có 3 quả bóng đỏ, 2 quả bóng xanh. Lấy ngẫu nhiên 2 quả bóng. Tính xác suất để 2 quả bóng lấy ra cùng màu.',
    answer: '$P = \\frac{2}{5}$', solution: 'Tổng cách chọn 2 từ 5: $C^2_5 = 10$\nCùng đỏ: $C^2_3 = 3$\nCùng xanh: $C^2_2 = 1$\n$P = \\frac{3+1}{10} = \\frac{4}{10} = \\frac{2}{5}$',
    grade: 9, topic: 'xac_suat', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['xác suất', 'tổ hợp'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-06T08:00:00Z', updated_at: '2024-10-06T08:00:00Z',
  },
  // === LỚP 6 ===
  {
    id: 'q7', question_code: 'BT007', content: 'Tìm ƯCLN và BCNN của $24$ và $36$.',
    answer: '$\\text{ƯCLN}(24,36)=12$, $\\text{BCNN}(24,36)=72$',
    solution: '$24 = 2^3 \\cdot 3$; $36 = 2^2 \\cdot 3^2$\n$\\text{ƯCLN} = 2^2 \\cdot 3 = 12$\n$\\text{BCNN} = 2^3 \\cdot 3^2 = 72$',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['ƯCLN', 'BCNN'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-07T08:00:00Z', updated_at: '2024-10-07T08:00:00Z',
  },
  {
    id: 'q8', question_code: 'BT008', content: 'Tính: $\\frac{3}{4} + \\frac{5}{6} - \\frac{1}{3}$',
    answer: '$\\frac{5}{4}$',
    solution: 'Mẫu chung: $12$\n$= \\frac{9}{12} + \\frac{10}{12} - \\frac{4}{12} = \\frac{15}{12} = \\frac{5}{4}$',
    grade: 6, topic: 'phan_so', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['phân số', 'cộng trừ'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-08T08:00:00Z', updated_at: '2024-10-08T08:00:00Z',
  },
  {
    id: 'q9', question_code: 'BT009', content: 'Kết quả của phép tính $(-3)^2 + 2 \\cdot (-5) + 1$ là:',
    options: [{key:'A',value:'$0$'},{key:'B',value:'$20$'},{key:'C',value:'$-20$'},{key:'D',value:'$10$'}],
    correct_answer: 'A', answer: 'A', grade: 6, topic: 'so_hoc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['lũy thừa', 'số nguyên'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-09T08:00:00Z', updated_at: '2024-10-09T08:00:00Z',
  },
  // --- Toán 6: Số học mở rộng ---
  {
    id: 'q6-01', question_code: 'BT019', content: 'Phân tích các số sau ra thừa số nguyên tố:\n\na) $120$\nb) $300$\nc) $2024$',
    answer: 'a) $120 = 2^3 \\cdot 3 \\cdot 5$\nb) $300 = 2^2 \\cdot 3 \\cdot 5^2$\nc) $2024 = 2^3 \\cdot 11 \\cdot 23$',
    solution: 'a) $120 = 2 \\times 60 = 2 \\times 2 \\times 30 = 2^3 \\times 15 = 2^3 \\times 3 \\times 5$\nb) $300 = 4 \\times 75 = 2^2 \\times 3 \\times 25 = 2^2 \\times 3 \\times 5^2$\nc) $2024 = 8 \\times 253 = 2^3 \\times 11 \\times 23$',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['phân tích thừa số nguyên tố', 'số nguyên tố'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-11-01T08:00:00Z', updated_at: '2024-11-01T08:00:00Z',
  },
  {
    id: 'q6-02', question_code: 'BT020', content: 'Số nào sau đây là số nguyên tố?',
    options: [{key:'A',value:'$91$'},{key:'B',value:'$67$'},{key:'C',value:'$51$'},{key:'D',value:'$87$'}],
    correct_answer: 'B', answer: 'B', grade: 6, topic: 'so_hoc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['số nguyên tố'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-11-02T08:00:00Z', updated_at: '2024-11-02T08:00:00Z',
  },
  {
    id: 'q6-03', question_code: 'BT021', content: 'Tìm số tự nhiên $x$, biết:\n\na) $x \\vdots 12$, $x \\vdots 18$ và $100 < x < 200$\nb) $x$ là ước chung của $36$ và $60$, đồng thời $x > 5$.',
    answer: 'a) $x \\in \\{108, 144, 180\\}$\nb) $x \\in \\{6, 12\\}$',
    solution: 'a) $\\text{BCNN}(12,18) = 36$. Các bội của 36 trong $(100;200)$: $108, 144, 180$.\nb) $\\text{ƯCLN}(36,60) = 12$. Ước của 12 lớn hơn 5: $6, 12$.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['ƯCLN', 'BCNN', 'chia hết'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-11-03T08:00:00Z', updated_at: '2024-11-03T08:00:00Z',
  },
  {
    id: 'q6-04', question_code: 'BT022', content: 'Xét các phát biểu sau đúng hay sai:\n\na) Số $0$ là số tự nhiên nhỏ nhất.\nb) Tổng hai số nguyên tố bất kỳ luôn là số chẵn.\nc) Số $1$ không phải là số nguyên tố cũng không phải là hợp số.\nd) Mọi số chẵn lớn hơn $2$ đều là hợp số.',
    answer: 'a) Đúng; b) Sai; c) Đúng; d) Đúng',
    solution: 'b) Sai vì $2 + 3 = 5$ là số lẻ ($2$ là số nguyên tố chẵn duy nhất).',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'dung_sai',
    tags: ['số nguyên tố', 'hợp số'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-11-04T08:00:00Z', updated_at: '2024-11-04T08:00:00Z',
  },
  // --- Toán 6: Số nguyên ---
  {
    id: 'q6-05', question_code: 'BT023', content: 'Thực hiện phép tính:\n\na) $(-15) + 8 + (-3) + 12$\nb) $(-4) \\cdot 7 \\cdot (-25)$\nc) $|{-13}| - |{7}| + |{-6}|$',
    answer: 'a) $2$\nb) $700$\nc) $12$',
    solution: 'a) $= (-15 + (-3)) + (8 + 12) = -18 + 20 = 2$\nb) $= ((-4) \\cdot (-25)) \\cdot 7 = 100 \\cdot 7 = 700$\nc) $= 13 - 7 + 6 = 12$',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['số nguyên', 'giá trị tuyệt đối'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-11-05T08:00:00Z', updated_at: '2024-11-05T08:00:00Z',
  },
  {
    id: 'q6-06', question_code: 'BT024', content: 'Tìm số nguyên $x$, biết: $|x - 3| = 5$',
    answer: '$x = 8$ hoặc $x = -2$',
    solution: 'TH1: $x - 3 = 5 \\Rightarrow x = 8$\nTH2: $x - 3 = -5 \\Rightarrow x = -2$',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['giá trị tuyệt đối', 'tìm x'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-11-06T08:00:00Z', updated_at: '2024-11-06T08:00:00Z',
  },
  // --- Toán 6: Phân số ---
  {
    id: 'q6-07', question_code: 'BT025', content: 'Thực hiện phép tính (tính hợp lý nếu có thể):\n\na) $\\frac{5}{7} + \\frac{-3}{11} + \\frac{2}{7} + \\frac{3}{11}$\nb) $\\frac{3}{5} \\cdot \\frac{7}{9} + \\frac{3}{5} \\cdot \\frac{2}{9}$',
    answer: 'a) $1$\nb) $\\frac{1}{3}$',
    solution: 'a) $= \\left(\\frac{5}{7} + \\frac{2}{7}\\right) + \\left(\\frac{-3}{11} + \\frac{3}{11}\\right) = 1 + 0 = 1$\nb) $= \\frac{3}{5} \\cdot \\left(\\frac{7}{9} + \\frac{2}{9}\\right) = \\frac{3}{5} \\cdot 1 = \\frac{3}{5}$\n\n(Sửa: $\\frac{3}{5} \\cdot \\frac{9}{9} = \\frac{3}{5} \\cdot 1 = \\frac{3}{5}$. Tính lại: $\\frac{3}{5} \\cdot \\frac{7+2}{9} = \\frac{3}{5} \\cdot 1 = \\frac{3}{5}$)\n\nĐáp án đúng: b) $\\frac{3}{5}$',
    grade: 6, topic: 'phan_so', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['phân số', 'tính hợp lý'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-2',
    created_at: '2024-11-07T08:00:00Z', updated_at: '2024-11-07T08:00:00Z',
  },
  {
    id: 'q6-08', question_code: 'BT026', content: 'Phân số nào sau đây bằng $\\frac{-3}{5}$?',
    options: [{key:'A',value:'$\\frac{3}{5}$'},{key:'B',value:'$\\frac{-3}{-5}$'},{key:'C',value:'$\\frac{9}{-15}$'},{key:'D',value:'$\\frac{-9}{-15}$'}],
    correct_answer: 'C', answer: 'C', grade: 6, topic: 'phan_so', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['phân số bằng nhau'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-2',
    created_at: '2024-11-08T08:00:00Z', updated_at: '2024-11-08T08:00:00Z',
  },
  // --- Toán 6: Số thập phân ---
  {
    id: 'q6-09', question_code: 'BT027', content: 'Tính:\n\na) $3,75 + 2,4 - 1,15$\nb) $0,25 \\times 4,8 \\div 0,6$\nc) Viết các phân số sau dưới dạng số thập phân: $\\frac{3}{8}$; $\\frac{7}{20}$',
    answer: 'a) $5$\nb) $2$\nc) $0,375$; $0,35$',
    solution: 'a) $3,75 + 2,4 - 1,15 = 6,15 - 1,15 = 5$\nb) $0,25 \\times 4,8 = 1,2$; rồi $1,2 \\div 0,6 = 2$\nc) $\\frac{3}{8} = 3 \\div 8 = 0,375$; $\\frac{7}{20} = \\frac{35}{100} = 0,35$',
    grade: 6, topic: 'so_thap_phan', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['số thập phân', 'phép tính'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-5',
    created_at: '2024-11-09T08:00:00Z', updated_at: '2024-11-09T08:00:00Z',
  },
  // --- Toán 6: Biểu thức ---
  {
    id: 'q6-10', question_code: 'BT028', content: 'Tính giá trị biểu thức:\n\na) $5 \\cdot 3^2 - 18 : 3 + 1$\nb) $2 \\cdot (5 + 3^2) - 4 \\cdot 3$',
    answer: 'a) $40$\nb) $16$',
    solution: 'a) $= 5 \\cdot 9 - 6 + 1 = 45 - 6 + 1 = 40$\nb) $= 2 \\cdot (5 + 9) - 12 = 2 \\cdot 14 - 12 = 28 - 12 = 16$',
    grade: 6, topic: 'bieu_thuc', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['biểu thức', 'thứ tự phép tính'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-6',
    created_at: '2024-11-10T08:00:00Z', updated_at: '2024-11-10T08:00:00Z',
  },
  {
    id: 'q6-11', question_code: 'BT029', content: 'Kết quả của biểu thức $2^3 \\cdot 5 - 4^2 + 10$ bằng:',
    options: [{key:'A',value:'$24$'},{key:'B',value:'$34$'},{key:'C',value:'$30$'},{key:'D',value:'$44$'}],
    correct_answer: 'B', answer: 'B', grade: 6, topic: 'bieu_thuc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['lũy thừa', 'biểu thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-6',
    created_at: '2024-11-11T08:00:00Z', updated_at: '2024-11-11T08:00:00Z',
  },
  // --- Toán 6: Hình học ---
  {
    id: 'q6-12', question_code: 'BT030', content: 'Cho đoạn thẳng $AB = 8$ cm. Điểm $M$ nằm giữa $A$ và $B$ sao cho $AM = 3$ cm.\n\na) Tính $MB$.\nb) Gọi $N$ là trung điểm của $MB$. Tính $AN$.',
    answer: 'a) $MB = 5$ cm\nb) $AN = 5{,}5$ cm',
    solution: 'a) $M$ nằm giữa $A, B$ nên $AM + MB = AB \\Rightarrow MB = 8 - 3 = 5$ cm.\nb) $N$ là trung điểm $MB \\Rightarrow MN = \\frac{MB}{2} = 2,5$ cm.\n$AN = AM + MN = 3 + 2,5 = 5,5$ cm.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['đoạn thẳng', 'trung điểm'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-11-12T08:00:00Z', updated_at: '2024-11-12T08:00:00Z',
  },
  {
    id: 'q6-13', question_code: 'BT031', content: 'Cho góc $\\widehat{xOy} = 120°$. Tia $Oz$ nằm giữa hai tia $Ox$ và $Oy$ sao cho $\\widehat{xOz} = 40°$.\n\na) Tính $\\widehat{zOy}$.\nb) Tia $Oz$ có phải là tia phân giác của góc $\\widehat{xOy}$ không? Vì sao?',
    answer: 'a) $\\widehat{zOy} = 80°$\nb) Không, vì $\\widehat{xOz} \\neq \\widehat{zOy}$',
    solution: 'a) Vì $Oz$ nằm giữa $Ox, Oy$: $\\widehat{xOz} + \\widehat{zOy} = \\widehat{xOy}$\n$\\Rightarrow \\widehat{zOy} = 120° - 40° = 80°$.\nb) Tia phân giác phải chia góc thành hai phần bằng nhau. $40° \\neq 80°$ nên $Oz$ không phải tia phân giác.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['góc', 'tia phân giác'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-11-13T08:00:00Z', updated_at: '2024-11-13T08:00:00Z',
  },
  {
    id: 'q6-14', question_code: 'BT032', content: 'Điền số thích hợp: Diện tích hình chữ nhật có chiều dài $12$ cm, chiều rộng $7{,}5$ cm bằng ______ cm².',
    answer: '$90$',
    grade: 6, topic: 'hinh_hoc', difficulty: 'nhan_biet', question_type: 'dien_dap_an',
    tags: ['diện tích', 'hình chữ nhật'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-11-14T08:00:00Z', updated_at: '2024-11-14T08:00:00Z',
  },
  // --- Toán 6: Thống kê ---
  {
    id: 'q6-15', question_code: 'BT033', content: 'Điểm kiểm tra 15 phút môn Toán của 20 học sinh lớp 6A được ghi lại:\n\n$7, 8, 6, 9, 7, 5, 8, 10, 7, 6, 8, 7, 9, 5, 7, 8, 6, 7, 9, 8$\n\na) Lập bảng tần số.\nb) Tính số trung bình cộng.\nc) Tìm mốt.',
    answer: 'b) $\\bar{x} = 7{,}25$\nc) $M_o = 7$ (xuất hiện 6 lần)',
    solution: 'a) Bảng tần số:\n| Điểm | 5 | 6 | 7 | 8 | 9 | 10 |\n|------|---|---|---|---|---|----|\n| Tần số | 2 | 3 | 6 | 5 | 3 | 1 |\n\nb) $\\bar{x} = \\frac{2 \\cdot 5 + 3 \\cdot 6 + 6 \\cdot 7 + 5 \\cdot 8 + 3 \\cdot 9 + 1 \\cdot 10}{20} = \\frac{145}{20} = 7,25$\nc) Mốt = 7 (tần số lớn nhất: 6)',
    grade: 6, topic: 'thong_ke', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['bảng tần số', 'trung bình cộng', 'mốt'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-7',
    created_at: '2024-11-15T08:00:00Z', updated_at: '2024-11-15T08:00:00Z',
  },
  // --- Toán 6: Xác suất ---
  {
    id: 'q6-16', question_code: 'BT034', content: 'Một hộp có $4$ viên bi đỏ và $6$ viên bi xanh. Lấy ngẫu nhiên một viên bi. Tính xác suất lấy được:\n\na) Viên bi đỏ.\nb) Viên bi xanh.',
    answer: 'a) $P(\\text{đỏ}) = \\frac{2}{5}$\nb) $P(\\text{xanh}) = \\frac{3}{5}$',
    solution: 'Tổng: $4 + 6 = 10$ viên.\na) $P = \\frac{4}{10} = \\frac{2}{5}$\nb) $P = \\frac{6}{10} = \\frac{3}{5}$',
    grade: 6, topic: 'xac_suat', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['xác suất', 'xác suất thực nghiệm'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-7',
    created_at: '2024-11-16T08:00:00Z', updated_at: '2024-11-16T08:00:00Z',
  },
  // --- Toán 6: Bài nâng cao ---
  {
    id: 'q6-17', question_code: 'BT035', content: 'Ba bạn An, Bình, Chi đi mua vở. An mua được số vở bằng $\\frac{1}{3}$ tổng số vở của ba bạn. Bình mua được nhiều hơn An $4$ quyển. Chi mua được $12$ quyển. Hỏi mỗi bạn mua được bao nhiêu quyển vở?',
    answer: 'An: $8$ quyển, Bình: $12$ quyển, Chi: $12$ quyển.',
    solution: 'Gọi tổng số vở là $S$.\nAn = $\\frac{S}{3}$, Bình = $\\frac{S}{3} + 4$, Chi = 12.\n$\\frac{S}{3} + \\frac{S}{3} + 4 + 12 = S$\n$\\frac{2S}{3} + 16 = S \\Rightarrow S - \\frac{2S}{3} = 16 \\Rightarrow \\frac{S}{3} = 16$... \n\nSửa lại: $\\frac{S}{3} = 8 \\Rightarrow S = 24$. An = 8, Bình = 12, Chi = ... Kiểm tra: cần $S = 8 + 12 + \\text{Chi}$. Nếu Chi = 12 thì $S = 32$, nhưng $S/3 \\approx 10,67$. \n\nĐặt lại: $\\frac{S}{3} + (\\frac{S}{3}+4) + 12 = S \\Rightarrow \\frac{2S}{3}+16 = S \\Rightarrow 16 = \\frac{S}{3} \\Rightarrow S = 48$.\nAn = 16, Bình = 20, Chi = 12.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['giải toán bằng phân số', 'toán có lời văn'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-2',
    created_at: '2024-11-17T08:00:00Z', updated_at: '2024-11-17T08:00:00Z',
  },
  {
    id: 'q6-18', question_code: 'BT036', content: 'Xét các phát biểu sau đúng hay sai:\n\na) Hai góc kề bù có tổng bằng $180°$.\nb) Hai góc đối đỉnh thì bằng nhau.\nc) Đường thẳng đi qua trung điểm của đoạn thẳng là đường trung trực.\nd) Nếu $M$ là trung điểm của $AB$ thì $MA = MB = \\frac{AB}{2}$.',
    answer: 'a) Đúng; b) Đúng; c) Sai; d) Đúng',
    solution: 'c) Sai vì đường trung trực phải vuông góc với đoạn thẳng tại trung điểm, không chỉ đi qua trung điểm.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'dung_sai',
    tags: ['góc', 'đường trung trực'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-11-18T08:00:00Z', updated_at: '2024-11-18T08:00:00Z',
  },
  // === LỚP 7 ===
  {
    id: 'q10', question_code: 'BT010', content: 'Cho $\\triangle ABC$ có $AB = 5$cm, $AC = 12$cm, $BC = 13$cm. Chứng minh $\\triangle ABC$ vuông.',
    answer: 'Vuông tại $A$',
    solution: '$AB^2 + AC^2 = 25 + 144 = 169 = 13^2 = BC^2$\nTheo định lý Pytago đảo, $\\triangle ABC$ vuông tại $A$.',
    grade: 7, topic: 'tam_giac', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['Pytago', 'tam giác vuông'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-10T08:00:00Z', updated_at: '2024-10-10T08:00:00Z',
  },
  {
    id: 'q11', question_code: 'BT011', content: 'Tìm $x$ biết: $|2x - 3| = 5$',
    answer: '$x = 4$ hoặc $x = -1$',
    solution: 'TH1: $2x - 3 = 5 \\Rightarrow x = 4$\nTH2: $2x - 3 = -5 \\Rightarrow x = -1$',
    grade: 7, topic: 'bieu_thuc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['giá trị tuyệt đối'], user_id: 'demo-user-001', is_public: true, status: 'pending',
    created_at: '2024-10-11T08:00:00Z', updated_at: '2024-10-11T08:00:00Z',
  },
  {
    id: 'q12', question_code: 'BT012', content: 'Đại lượng $y$ tỉ lệ thuận với $x$ theo hệ số $k = 3$. Khi $x = 5$ thì $y$ bằng:',
    options: [{key:'A',value:'$8$'},{key:'B',value:'$15$'},{key:'C',value:'$2$'},{key:'D',value:'$\\frac{5}{3}$'}],
    correct_answer: 'B', answer: 'B', grade: 7, topic: 'ham_so', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['tỉ lệ thuận'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-12T08:00:00Z', updated_at: '2024-10-12T08:00:00Z',
  },
  // === LỚP 8 ===
  {
    id: 'q13', question_code: 'BT013', content: 'Phân tích đa thức thành nhân tử:\n\na) $x^2 - 4x + 4$\nb) $x^3 - 8$\nc) $x^2 + 2xy + y^2 - 9$',
    answer: 'a) $(x-2)^2$\nb) $(x-2)(x^2+2x+4)$\nc) $(x+y-3)(x+y+3)$',
    solution: 'a) $= (x-2)^2$ (HĐT)\nb) $= (x-2)(x^2+2x+4)$ (HĐT hiệu hai lập phương)\nc) $= (x+y)^2 - 3^2 = (x+y-3)(x+y+3)$',
    grade: 8, topic: 'da_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['phân tích nhân tử', 'hằng đẳng thức'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-13T08:00:00Z', updated_at: '2024-10-13T08:00:00Z',
  },
  {
    id: 'q14', question_code: 'BT014', content: 'Giải phương trình: $\\frac{x+1}{x-2} + \\frac{x-1}{x+2} = \\frac{2(x^2+2)}{x^2-4}$',
    answer: 'Phương trình vô nghiệm',
    solution: 'ĐKXĐ: $x \\neq \\pm 2$\nQuy đồng: $(x+1)(x+2) + (x-1)(x-2) = 2(x^2+2)$\n$x^2+3x+2 + x^2-3x+2 = 2x^2+4$\n$2x^2+4 = 2x^2+4$ (đúng $\\forall x$)\nKết hợp ĐKXĐ: PT vô nghiệm (thực ra đúng $\\forall x \\neq \\pm 2$)',
    grade: 8, topic: 'phuong_trinh', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['phương trình chứa ẩn ở mẫu'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-14T08:00:00Z', updated_at: '2024-10-14T08:00:00Z',
  },
  {
    id: 'q15', question_code: 'BT015', content: 'Cho hình thang cân $ABCD$ ($AB \\parallel CD$) có $AB = 8$cm, $CD = 14$cm, cạnh bên $AD = 5$cm. Tính diện tích hình thang.',
    answer: '$S = 33$ cm²',
    solution: 'Kẻ $AH \\perp CD$. $DH = \\frac{CD-AB}{2} = 3$cm.\n$AH = \\sqrt{AD^2 - DH^2} = \\sqrt{25-9} = 4$cm.\n$S = \\frac{(AB+CD) \\cdot AH}{2} = \\frac{(8+14) \\cdot 4}{2} = 44$ cm².',
    grade: 8, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hình thang cân', 'diện tích'], user_id: 'demo-user-001', is_public: true, status: 'pending',
    created_at: '2024-10-15T08:00:00Z', updated_at: '2024-10-15T08:00:00Z',
  },
  {
    id: 'q16', question_code: 'BT016', content: 'Khẳng định nào sau đây là đúng?',
    options: [{key:'A',value:'Hình bình hành có hai đường chéo bằng nhau là hình chữ nhật'},{key:'B',value:'Hình thoi có một góc vuông là hình vuông'},{key:'C',value:'Tứ giác có hai đường chéo vuông góc là hình thoi'},{key:'D',value:'Cả A và B'}],
    correct_answer: 'D', answer: 'D', grade: 8, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'trac_nghiem',
    tags: ['tứ giác đặc biệt'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-16T08:00:00Z', updated_at: '2024-10-16T08:00:00Z',
  },
  // Thêm 1 bài draft
  {
    id: 'q17', question_code: 'BT017', content: 'Cho hàm số $y = ax^2$ ($a \\neq 0$) đi qua điểm $M(2; 8)$.\n\na) Tìm $a$.\nb) Vẽ đồ thị hàm số.',
    answer: 'a) $a = 2$', grade: 9, topic: 'ham_so', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['hàm số bậc hai'], user_id: 'demo-user-001', is_public: false, status: 'draft',
    created_at: '2024-10-17T08:00:00Z', updated_at: '2024-10-17T08:00:00Z',
  },
  {
    id: 'q18', question_code: 'BT018', content: 'Giải bất phương trình: $3x - 2 > 2x + 5$',
    answer: '$x > 7$', solution: '$3x - 2x > 5 + 2$\n$x > 7$',
    grade: 8, topic: 'bat_phuong_trinh', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['bất phương trình bậc nhất'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-18T08:00:00Z', updated_at: '2024-10-18T08:00:00Z',
  },
];

// Sample exams
const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'exam1', title: 'Đề kiểm tra giữa kỳ I - Toán 9', description: 'Đề kiểm tra 90 phút, đầy đủ tự luận và trắc nghiệm',
    grade: 9, duration: 90, user_id: 'demo-user-001', is_template: true, question_count: 4,
    settings: { school_name: 'THCS Nguyễn Du', exam_type: 'Kiểm tra giữa kỳ', school_year: '2024-2025', subject: 'Toán 9' },
    tags: ['giữa kỳ', 'toán 9'], created_at: '2024-10-20T08:00:00Z', updated_at: '2024-10-20T08:00:00Z',
  },
  {
    id: 'exam2', title: 'Đề ôn tập cuối kỳ - Toán 8', description: 'Đề ôn tập tổng hợp kiến thức kỳ I',
    grade: 8, duration: 60, user_id: 'demo-user-001', is_template: true, question_count: 3,
    settings: { school_name: 'THCS Lê Hồng Phong', exam_type: 'Ôn tập cuối kỳ', school_year: '2024-2025' },
    tags: ['cuối kỳ', 'toán 8'], created_at: '2024-10-21T08:00:00Z', updated_at: '2024-10-21T08:00:00Z',
  },
  {
    id: 'exam3', title: 'Bộ đề thi vào lớp 10 - Đề 1', description: 'Đề thi thử vào 10 theo cấu trúc mới',
    grade: 9, duration: 120, user_id: 'demo-user-001', is_template: true, question_count: 5,
    settings: { school_name: 'Sở GD&ĐT Hà Nội', exam_type: 'Thi vào 10', school_year: '2024-2025', subject: 'Toán' },
    tags: ['thi vào 10', 'đề thi thử'], created_at: '2024-10-22T08:00:00Z', updated_at: '2024-10-22T08:00:00Z',
  },
];

const SAMPLE_EXAM_QUESTIONS: ExamQuestion[] = [
  { id: 'eq1', exam_id: 'exam1', question_id: 'q1', sort_order: 1, points: 3, created_at: '2024-10-20T08:00:00Z' },
  { id: 'eq2', exam_id: 'exam1', question_id: 'q4', sort_order: 2, points: 1, created_at: '2024-10-20T08:00:00Z' },
  { id: 'eq3', exam_id: 'exam1', question_id: 'q2', sort_order: 3, points: 3, created_at: '2024-10-20T08:00:00Z' },
  { id: 'eq4', exam_id: 'exam1', question_id: 'q3', sort_order: 4, points: 3, created_at: '2024-10-20T08:00:00Z' },
  { id: 'eq5', exam_id: 'exam2', question_id: 'q13', sort_order: 1, points: 3, created_at: '2024-10-21T08:00:00Z' },
  { id: 'eq6', exam_id: 'exam2', question_id: 'q14', sort_order: 2, points: 4, created_at: '2024-10-21T08:00:00Z' },
  { id: 'eq7', exam_id: 'exam2', question_id: 'q16', sort_order: 3, points: 1, created_at: '2024-10-21T08:00:00Z' },
  { id: 'eq8', exam_id: 'exam3', question_id: 'q1', sort_order: 1, points: 2, created_at: '2024-10-22T08:00:00Z' },
  { id: 'eq9', exam_id: 'exam3', question_id: 'q2', sort_order: 2, points: 2, created_at: '2024-10-22T08:00:00Z' },
  { id: 'eq10', exam_id: 'exam3', question_id: 'q3', sort_order: 3, points: 3, created_at: '2024-10-22T08:00:00Z' },
  { id: 'eq11', exam_id: 'exam3', question_id: 'q5', sort_order: 4, points: 1.5, created_at: '2024-10-22T08:00:00Z' },
  { id: 'eq12', exam_id: 'exam3', question_id: 'q6', sort_order: 5, points: 1.5, created_at: '2024-10-22T08:00:00Z' },
];

const SAMPLE_FOLDERS: Folder[] = [
  { id: 'f1', name: 'Đề thi giữa kỳ', parent_id: null, user_id: 'demo-user-001', color: '#3B82F6', icon: 'folder', sort_order: 1, created_at: '2024-10-01T00:00:00Z', updated_at: '2024-10-01T00:00:00Z' },
  { id: 'f2', name: 'Đề thi cuối kỳ', parent_id: null, user_id: 'demo-user-001', color: '#8B5CF6', icon: 'folder', sort_order: 2, created_at: '2024-10-01T00:00:00Z', updated_at: '2024-10-01T00:00:00Z' },
  { id: 'f3', name: 'Đề thi vào 10', parent_id: null, user_id: 'demo-user-001', color: '#EF4444', icon: 'folder', sort_order: 3, created_at: '2024-10-01T00:00:00Z', updated_at: '2024-10-01T00:00:00Z' },
];

const SAMPLE_CATEGORIES: Category[] = [
  // === Lớp 9 (parent + children) ===
  { id: 'cat-9', name: 'Toán lớp 9', slug: 'toan-9', description: 'Chuyên đề toán lớp 9', parent_id: null, grade: 9, icon: 'folder', color: '#3B82F6', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-9-1', name: 'Căn thức', slug: 'can-thuc-9', description: 'Căn bậc hai, rút gọn biểu thức', parent_id: 'cat-9', grade: 9, icon: 'folder', color: '#8B5CF6', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-9-2', name: 'Hệ phương trình', slug: 'he-pt-9', description: 'Hệ PT bậc nhất hai ẩn', parent_id: 'cat-9', grade: 9, icon: 'folder', color: '#EC4899', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-9-3', name: 'Hàm số bậc hai', slug: 'ham-so-9', description: 'Hàm số y = ax², parabol', parent_id: 'cat-9', grade: 9, icon: 'folder', color: '#F59E0B', sort_order: 3, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-9-4', name: 'Đường tròn', slug: 'duong-tron-9', description: 'Tiếp tuyến, cung, góc nội tiếp', parent_id: 'cat-9', grade: 9, icon: 'folder', color: '#22C55E', sort_order: 4, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-9-5', name: 'Thống kê & Xác suất', slug: 'thong-ke-9', description: 'Bảng tần số, xác suất', parent_id: 'cat-9', grade: 9, icon: 'folder', color: '#06B6D4', sort_order: 5, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },

  // === Lớp 8 ===
  { id: 'cat-8', name: 'Toán lớp 8', slug: 'toan-8', description: 'Chuyên đề toán lớp 8', parent_id: null, grade: 8, icon: 'folder', color: '#8B5CF6', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-8-1', name: 'Đa thức', slug: 'da-thuc-8', description: 'Phân tích đa thức, hằng đẳng thức', parent_id: 'cat-8', grade: 8, icon: 'folder', color: '#14B8A6', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-8-2', name: 'Phương trình bậc nhất', slug: 'pt-bac-nhat-8', description: 'Giải phương trình bậc nhất', parent_id: 'cat-8', grade: 8, icon: 'folder', color: '#EC4899', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-8-3', name: 'Tam giác đồng dạng', slug: 'tam-giac-8', description: 'Các trường hợp đồng dạng', parent_id: 'cat-8', grade: 8, icon: 'folder', color: '#22C55E', sort_order: 3, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },

  // === Lớp 7 ===
  { id: 'cat-7', name: 'Toán lớp 7', slug: 'toan-7', description: 'Chuyên đề toán lớp 7', parent_id: null, grade: 7, icon: 'folder', color: '#22C55E', sort_order: 3, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-7-1', name: 'Tỉ lệ thức', slug: 'ti-le-thuc-7', description: 'Tỉ lệ thức, dãy tỉ số bằng nhau', parent_id: 'cat-7', grade: 7, icon: 'folder', color: '#3B82F6', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-7-2', name: 'Tam giác', slug: 'tam-giac-7', description: 'Tam giác bằng nhau, tam giác cân', parent_id: 'cat-7', grade: 7, icon: 'folder', color: '#F59E0B', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },

  // === Lớp 6 ===
  { id: 'cat-6', name: 'Toán lớp 6', slug: 'toan-6', description: 'Chuyên đề toán lớp 6', parent_id: null, grade: 6, icon: 'folder', color: '#F59E0B', sort_order: 4, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-1', name: 'Số tự nhiên', slug: 'so-tu-nhien-6', description: 'Tập hợp, phép tính số tự nhiên', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#3B82F6', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-2', name: 'Phân số', slug: 'phan-so-6', description: 'Phân số, số thập phân', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#8B5CF6', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-3', name: 'Số nguyên', slug: 'so-nguyen-6', description: 'Số nguyên, phép tính số nguyên', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#EF4444', sort_order: 3, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-4', name: 'Hình học 6', slug: 'hinh-hoc-6', description: 'Đoạn thẳng, góc, tam giác', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#22C55E', sort_order: 4, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-5', name: 'Số thập phân', slug: 'so-thap-phan-6', description: 'Phép tính số thập phân', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#F97316', sort_order: 5, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-6', name: 'Biểu thức & Tính giá trị', slug: 'bieu-thuc-6', description: 'Biểu thức có chứa chữ, tính giá trị', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#06B6D4', sort_order: 6, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-6-7', name: 'Thống kê & Xác suất 6', slug: 'thong-ke-xac-suat-6', description: 'Thu thập dữ liệu, xác suất thực nghiệm', parent_id: 'cat-6', grade: 6, icon: 'folder', color: '#EC4899', sort_order: 7, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },

  // === Lớp 5 ===
  { id: 'cat-5', name: 'Toán lớp 5', slug: 'toan-5', description: 'Chuyên đề toán lớp 5', parent_id: null, grade: 5, icon: 'folder', color: '#EF4444', sort_order: 5, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-5-1', name: 'Số thập phân', slug: 'so-thap-phan-5', description: 'Phép tính số thập phân', parent_id: 'cat-5', grade: 5, icon: 'folder', color: '#F97316', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-5-2', name: 'Hình học 5', slug: 'hinh-hoc-5', description: 'Diện tích, chu vi', parent_id: 'cat-5', grade: 5, icon: 'folder', color: '#22C55E', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },

  // === Lớp 4 ===
  { id: 'cat-4', name: 'Toán lớp 4', slug: 'toan-4', description: 'Chuyên đề toán lớp 4', parent_id: null, grade: 4, icon: 'folder', color: '#6366F1', sort_order: 6, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-4-1', name: 'Phân số cơ bản', slug: 'phan-so-4', description: 'Khái niệm và phép tính phân số', parent_id: 'cat-4', grade: 4, icon: 'folder', color: '#3B82F6', sort_order: 1, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
  { id: 'cat-4-2', name: 'Đo lường', slug: 'do-luong-4', description: 'Đơn vị đo, quy đổi', parent_id: 'cat-4', grade: 4, icon: 'folder', color: '#F59E0B', sort_order: 2, is_active: true, created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
];

interface DemoData {
  questions: Question[];
  exams: Exam[];
  examQuestions: ExamQuestion[];
  folders: Folder[];
  categories: Category[];
  favorites: FavoriteQuestion[];
  savedExams: SavedExam[];
  likes: { user_id: string; question_id: string }[];
  reports: QuestionReport[];
  notifications: Notification[];
}

function getDefaultData(): DemoData {
  return {
    questions: SAMPLE_QUESTIONS,
    exams: SAMPLE_EXAMS,
    examQuestions: SAMPLE_EXAM_QUESTIONS,
    folders: SAMPLE_FOLDERS,
    categories: SAMPLE_CATEGORIES,
    favorites: [
      { id: 'fav1', user_id: 'demo-user-001', question_id: 'q1', created_at: '2024-10-20T00:00:00Z' },
      { id: 'fav2', user_id: 'demo-user-001', question_id: 'q3', created_at: '2024-10-20T00:00:00Z' },
    ],
    savedExams: [
      { id: 'se1', user_id: 'demo-user-001', exam_id: 'exam1', created_at: '2024-10-20T00:00:00Z' },
    ],
    likes: [
      { user_id: 'demo-user-001', question_id: 'q1' },
      { user_id: 'demo-user-001', question_id: 'q6' },
    ],
    reports: [],
    notifications: [
      { id: 'notif-1', user_id: 'demo-user-001', type: 'system', title: '🎉 Chào mừng!', message: 'Chào mừng bạn đến với KhoDeToán. Bắt đầu tạo bài tập và đề thi ngay!', is_read: false, created_at: new Date().toISOString() },
      { id: 'notif-2', user_id: 'demo-user-001', type: 'system', title: '💡 Mẹo', message: 'Nhấn Ctrl+K để tìm kiếm nhanh bài tập, đề thi và trang quản trị.', is_read: false, created_at: new Date().toISOString() },
      { id: 'notif-3', user_id: 'demo-user-001', type: 'system', title: '📝 2 bài chờ duyệt', message: 'Có 2 bài tập mới cần bạn duyệt.', link: '/admin/review', is_read: false, created_at: new Date().toISOString() },
    ],
  };
}

function loadData(): DemoData {
  if (typeof window === 'undefined') return getDefaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const defaults = getDefaultData();
      // Merge: saved data takes priority, but ensure all fields exist
      return {
        questions: saved.questions || defaults.questions,
        exams: saved.exams || defaults.exams,
        examQuestions: saved.examQuestions || defaults.examQuestions,
        folders: saved.folders || defaults.folders,
        categories: saved.categories || defaults.categories,
        favorites: saved.favorites || defaults.favorites,
        savedExams: saved.savedExams || defaults.savedExams,
        likes: saved.likes || defaults.likes,
        reports: saved.reports || defaults.reports,
        notifications: saved.notifications || defaults.notifications,
      };
    }
  } catch { /* ignore */ }
  const data = getDefaultData();
  saveData(data);
  return data;
}

function saveData(data: DemoData) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

function genId(): string {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

// ===== PUBLIC API =====

export const demoDb = {
  // --- Questions ---
  getQuestions(filter?: { grade?: number; topic?: string; difficulty?: string; question_type?: string; search?: string; status?: string }): Question[] {
    let data = loadData().questions;
    if (filter?.grade) data = data.filter(q => q.grade === filter.grade);
    if (filter?.topic) data = data.filter(q => q.topic === filter.topic);
    if (filter?.difficulty) data = data.filter(q => q.difficulty === filter.difficulty);
    if (filter?.question_type) data = data.filter(q => q.question_type === filter.question_type);
    if (filter?.status) data = data.filter(q => q.status === filter.status);
    if (filter?.search) {
      const s = filter.search.toLowerCase();
      data = data.filter(q => q.content.toLowerCase().includes(s));
    }
    return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getQuestion(id: string): Question | null {
    return loadData().questions.find(q => q.id === id) || null;
  },

  createQuestion(q: Omit<Question, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Question {
    const store = loadData();
    // Auto-generate question_code: BT001, BT002...
    const existingCodes = store.questions.map(q => q.question_code).filter(Boolean);
    const maxNum = existingCodes.reduce((max, code) => {
      const m = code?.match(/BT(\d+)/);
      return m ? Math.max(max, parseInt(m[1])) : max;
    }, 0);
    const questionCode = `BT${String(maxNum + 1).padStart(3, '0')}`;
    const newQ: Question = {
      ...q, id: genId(), question_code: questionCode, user_id: DEMO_USER.id,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    } as Question;
    store.questions.unshift(newQ);
    saveData(store);
    return newQ;
  },

  updateQuestion(id: string, updates: Partial<Question>, editorRole?: string): Question | null {
    const store = loadData();
    const idx = store.questions.findIndex(q => q.id === id);
    if (idx === -1) return null;
    const oldQuestion = store.questions[idx];
    // Non-admin editing approved question → reset to pending for re-review
    const needsReReview = editorRole !== 'admin' && oldQuestion.status === 'approved' && !updates.status;
    store.questions[idx] = { 
      ...oldQuestion, 
      ...updates, 
      ...(needsReReview ? { status: 'pending' as const, reviewed_at: undefined, reviewed_by: undefined, review_note: undefined } : {}),
      updated_at: new Date().toISOString() 
    };
    // Notify admin if re-review needed
    if (needsReReview) {
      const notif: Notification = {
        id: genId(), user_id: 'demo-user-001', type: 'system',
        title: '🔄 Bài tập cần duyệt lại',
        message: `Bài tập "${(oldQuestion.content || '').slice(0, 50)}..." đã được sửa và cần duyệt lại.`,
        link: `/questions/${id}`,
        is_read: false, created_at: new Date().toISOString(),
      };
      store.notifications.push(notif);
    }
    saveData(store);
    return store.questions[idx];
  },

  deleteQuestion(id: string): boolean {
    const store = loadData();
    const before = store.questions.length;
    store.questions = store.questions.filter(q => q.id !== id);
    saveData(store);
    return store.questions.length < before;
  },

  // --- Exams ---
  getExams(): Exam[] {
    return loadData().exams.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getExam(id: string): Exam | null {
    return loadData().exams.find(e => e.id === id) || null;
  },

  createExam(e: Partial<Exam>): Exam {
    const store = loadData();
    const newE: Exam = {
      id: genId(), title: e.title || 'Đề thi mới', description: e.description, grade: e.grade || 9,
      duration: e.duration || 90, user_id: DEMO_USER.id, settings: e.settings || {},
      is_template: false, tags: e.tags || [],
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    store.exams.unshift(newE);
    saveData(store);
    return newE;
  },

  deleteExam(id: string): boolean {
    const store = loadData();
    store.exams = store.exams.filter(e => e.id !== id);
    store.examQuestions = store.examQuestions.filter(eq => eq.exam_id !== id);
    saveData(store);
    return true;
  },

  // --- ExamQuestions ---
  getExamQuestions(examId: string): (ExamQuestion & { question: Question })[] {
    const store = loadData();
    return store.examQuestions
      .filter(eq => eq.exam_id === examId)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(eq => ({ ...eq, question: store.questions.find(q => q.id === eq.question_id)! }))
      .filter(eq => eq.question);
  },

  addExamQuestion(examId: string, questionId: string): ExamQuestion {
    const store = loadData();
    const eq: ExamQuestion = {
      id: genId(), exam_id: examId, question_id: questionId,
      sort_order: store.examQuestions.filter(e => e.exam_id === examId).length,
      points: 1.0, created_at: new Date().toISOString(),
    };
    store.examQuestions.push(eq);
    saveData(store);
    return eq;
  },

  removeExamQuestion(eqId: string) {
    const store = loadData();
    store.examQuestions = store.examQuestions.filter(eq => eq.id !== eqId);
    saveData(store);
  },

  updateExamQuestionPoints(eqId: string, points: number) {
    const store = loadData();
    const eq = store.examQuestions.find(e => e.id === eqId);
    if (eq) eq.points = points;
    saveData(store);
  },

  // --- Folders ---
  getFolders(): Folder[] { return loadData().folders; },

  createFolder(f: Partial<Folder>): Folder {
    const store = loadData();
    const newF: Folder = {
      id: genId(), name: f.name || 'Thư mục mới', parent_id: null,
      user_id: DEMO_USER.id, color: f.color || '#3B82F6', icon: 'folder',
      sort_order: store.folders.length,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    store.folders.push(newF);
    saveData(store);
    return newF;
  },

  deleteFolder(id: string) {
    const store = loadData();
    store.folders = store.folders.filter(f => f.id !== id);
    saveData(store);
  },

  // --- Categories ---
  getCategories(): Category[] {
    return loadData().categories.sort((a, b) => a.sort_order - b.sort_order);
  },

  createCategory(c: Partial<Category>): Category {
    const store = loadData();
    const slug = (c.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newC: Category = {
      id: genId(), name: c.name || '', slug, description: c.description,
      parent_id: c.parent_id || null, grade: c.grade || null, icon: 'folder', color: c.color || '#3B82F6',
      sort_order: store.categories.length, is_active: true,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    store.categories.push(newC);
    saveData(store);
    return newC;
  },

  deleteCategory(id: string) {
    const store = loadData();
    store.categories = store.categories.filter(c => c.id !== id);
    saveData(store);
  },

  updateCategory(id: string, updates: Partial<Category>) {
    const store = loadData();
    const idx = store.categories.findIndex(c => c.id === id);
    if (idx !== -1) store.categories[idx] = { ...store.categories[idx], ...updates };
    saveData(store);
  },

  // --- Favorites ---
  getFavorites(userId: string): FavoriteQuestion[] {
    return loadData().favorites.filter(f => f.user_id === userId);
  },

  isFavorite(userId: string, questionId: string): boolean {
    return loadData().favorites.some(f => f.user_id === userId && f.question_id === questionId);
  },

  toggleFavorite(userId: string, questionId: string): boolean {
    const store = loadData();
    const idx = store.favorites.findIndex(f => f.user_id === userId && f.question_id === questionId);
    if (idx !== -1) {
      store.favorites.splice(idx, 1);
      saveData(store);
      return false; // removed
    } else {
      store.favorites.push({ id: genId(), user_id: userId, question_id: questionId, created_at: new Date().toISOString() });
      saveData(store);
      return true; // added
    }
  },

  getFavoriteQuestions(userId: string): Question[] {
    const store = loadData();
    const favIds = store.favorites.filter(f => f.user_id === userId).map(f => f.question_id);
    return store.questions.filter(q => favIds.includes(q.id));
  },

  // --- Saved Exams ---
  getSavedExams(userId: string): SavedExam[] {
    return loadData().savedExams.filter(s => s.user_id === userId);
  },

  isExamSaved(userId: string, examId: string): boolean {
    return loadData().savedExams.some(s => s.user_id === userId && s.exam_id === examId);
  },

  toggleSavedExam(userId: string, examId: string): boolean {
    const store = loadData();
    const idx = store.savedExams.findIndex(s => s.user_id === userId && s.exam_id === examId);
    if (idx !== -1) {
      store.savedExams.splice(idx, 1);
      saveData(store);
      return false;
    } else {
      store.savedExams.push({ id: genId(), user_id: userId, exam_id: examId, created_at: new Date().toISOString() });
      saveData(store);
      return true;
    }
  },

  getSavedExamList(userId: string): Exam[] {
    const store = loadData();
    const savedIds = store.savedExams.filter(s => s.user_id === userId).map(s => s.exam_id);
    return store.exams.filter(e => savedIds.includes(e.id));
  },

  // --- Permission helpers ---
  canEditQuestion(userId: string, userRole: string, question: Question): boolean {
    if (userRole === 'admin') return true;
    if (question.user_id !== userId) return false;
    return question.status !== 'approved';
  },

  canDeleteQuestion(userId: string, userRole: string, question: Question): boolean {
    if (userRole === 'admin') return true;
    if (question.user_id !== userId) return false;
    return question.status !== 'approved';
  },

  // --- Likes ---
  getLikeCount(questionId: string): number {
    return loadData().likes.filter(l => l.question_id === questionId).length;
  },

  isLiked(userId: string, questionId: string): boolean {
    return loadData().likes.some(l => l.user_id === userId && l.question_id === questionId);
  },

  toggleLike(userId: string, questionId: string): { liked: boolean; count: number } {
    const store = loadData();
    const idx = store.likes.findIndex(l => l.user_id === userId && l.question_id === questionId);
    if (idx !== -1) {
      store.likes.splice(idx, 1);
    } else {
      store.likes.push({ user_id: userId, question_id: questionId });
    }
    saveData(store);
    return {
      liked: idx === -1,
      count: store.likes.filter(l => l.question_id === questionId).length,
    };
  },

  // --- Reports (Báo cáo) ---
  reportQuestion(userId: string, questionId: string, reason: string): QuestionReport {
    const store = loadData();
    const report: QuestionReport = {
      id: genId(), question_id: questionId, user_id: userId,
      reason, status: 'pending', created_at: new Date().toISOString(),
    };
    store.reports.push(report);
    const q = store.questions.find(q => q.id === questionId);
    const contentPreview = `"${(q?.content || '').slice(0, 50)}..."`;    
    // Notify question AUTHOR (to fix)
    if (q?.user_id) {
      store.notifications.push({
        id: genId(), user_id: q.user_id, type: 'report_question',
        title: '⚠️ Bài tập bị báo cáo',
        message: `Bài tập ${contentPreview} bị báo cáo: ${reason}. Vui lòng kiểm tra và sửa nếu cần.`,
        link: `/questions/${questionId}/edit`,
        is_read: false, created_at: new Date().toISOString(),
      });
    }
    // Also notify admin
    store.notifications.push({
      id: genId(), user_id: 'demo-user-001', type: 'report_question',
      title: '⚠️ Báo cáo bài tập',
      message: `Bài tập ${contentPreview} được báo cáo: ${reason}`,
      link: `/questions/${questionId}`,
      is_read: false, created_at: new Date().toISOString(),
    });
    saveData(store);
    return report;
  },

  getReports(): QuestionReport[] {
    return loadData().reports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  // --- Notifications ---
  getNotifications(userId: string): Notification[] {
    return loadData().notifications
      .filter(n => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getUnreadCount(userId: string): number {
    return loadData().notifications.filter(n => n.user_id === userId && !n.is_read).length;
  },

  markNotificationRead(notifId: string) {
    const store = loadData();
    const n = store.notifications.find(n => n.id === notifId);
    if (n) n.is_read = true;
    saveData(store);
  },

  markAllRead(userId: string) {
    const store = loadData();
    store.notifications.filter(n => n.user_id === userId).forEach(n => n.is_read = true);
    saveData(store);
  },

  addNotification(userId: string, type: Notification['type'], title: string, message: string, link?: string) {
    const store = loadData();
    store.notifications.push({
      id: genId(), user_id: userId, type, title, message,
      link, is_read: false, created_at: new Date().toISOString(),
    });
    saveData(store);
  },
};
