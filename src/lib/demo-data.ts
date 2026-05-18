/**
 * Demo Data Provider
 * Cho phép ứng dụng chạy đầy đủ chức năng khi chưa cấu hình Database.
 * Dữ liệu lưu trong localStorage.
 * Hỗ trợ: Neon / Supabase / Demo
 */

import type { Question, Profile, Exam, ExamQuestion, Folder, Category, FavoriteQuestion, SavedExam, Notification, QuestionReport } from '@/types';

const STORAGE_KEY = 'khodetoan_demo';

function isDatabaseConfigured(): boolean {
  // Check public flag first (for client-side)
  if (process.env.NEXT_PUBLIC_DATABASE_CONFIGURED === 'true') return true;
  
  // Check Neon (Server-side)
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.includes('neon.tech') || dbUrl.includes('neon.')) return true;
  // Check Supabase (Client & Server)
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
export const SAMPLE_QUESTIONS: Question[] = [
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
    answer: 'a) $1$\nb) $\\frac{3}{5}$',
    solution: 'a) $= \\left(\\frac{5}{7} + \\frac{2}{7}\\right) + \\left(\\frac{-3}{11} + \\frac{3}{11}\\right) = 1 + 0 = 1$\nb) $= \\frac{3}{5} \\cdot \\left(\\frac{7}{9} + \\frac{2}{9}\\right) = \\frac{3}{5} \\cdot \\frac{9}{9} = \\frac{3}{5} \\cdot 1 = \\frac{3}{5}$',
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
    answer: 'An: $16$ quyển, Bình: $20$ quyển, Chi: $12$ quyển.',
    solution: 'Gọi tổng số vở của ba bạn là $S$.\nSố vở An mua là: $\\frac{S}{3}$\nSố vở Bình mua là: $\\frac{S}{3} + 4$\nSố vở Chi mua là: $12$\nTa có phương trình: $\\frac{S}{3} + \\left(\\frac{S}{3} + 4\\right) + 12 = S$\n$\\Rightarrow \\frac{2S}{3} + 16 = S$\n$\\Rightarrow S - \\frac{2S}{3} = 16$\n$\\Rightarrow \\frac{S}{3} = 16 \\Rightarrow S = 48$\nVậy An mua được: $48 : 3 = 16$ (quyển).\nBình mua được: $16 + 4 = 20$ (quyển).\nChi mua được $12$ (quyển).',
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
  // === TOÁN LỚP 6 - THEO BÀI SGK KẾT NỐI TRI THỨC (TẬP 1) ===
  {
    id: 'kntt-6-bai1-01', question_code: 'BT042', content: 'Cho tập hợp $A = \\{x \\in \\mathbb{N} \\mid 5 < x \\leq 10\\}$.\n\na) Viết tập hợp $A$ bằng cách liệt kê các phần tử.\nb) Điền ký hiệu thích hợp ($\\in, \\notin$) vào ô trống: $5 \\dots A$; $10 \\dots A$; $12 \\dots A$.',
    answer: 'a) $A = \\{6; 7; 8; 9; 10\\}$\nb) $5 \\notin A$; $10 \\in A$; $12 \\notin A$',
    solution: 'a) Các số tự nhiên lớn hơn $5$ và nhỏ hơn hoặc bằng $10$ là $6, 7, 8, 9, 10$.\nVậy $A = \\{6; 7; 8; 9; 10\\}$.\nb) Vì $5$ không lớn hơn $5$ nên $5 \\notin A$.\nVì $10 = 10$ nên $10 \\in A$.\nVì $12 > 10$ nên $12 \\notin A$.',
    grade: 6, topic: 'so_hoc', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['tập hợp', 'liệt kê phần tử', 'bài 1'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-10T08:00:00Z', updated_at: '2024-12-10T08:00:00Z',
  },
  {
    id: 'kntt-6-bai6-01', question_code: 'BT043', content: 'Thực hiện phép tính (viết kết quả dưới dạng một lũy thừa nếu có thể):\n\na) $3^4 \\cdot 3^5$\nb) $5^{10} : 5^7$\nc) $(2^3)^2 \\cdot 2^4$\nd) Tìm số tự nhiên $n$ biết: $3^n = 81$',
    answer: 'a) $3^9$; b) $5^3$; c) $2^{10}$; d) $n = 4$',
    solution: 'a) $3^4 \\cdot 3^5 = 3^{4+5} = 3^9$\nb) $5^{10} : 5^7 = 5^{10-7} = 5^3$\nc) $(2^3)^2 \\cdot 2^4 = 2^6 \\cdot 2^4 = 2^{6+4} = 2^{10}$\nd) Ta có $81 = 3^4$, suy ra $3^n = 3^4 \\Rightarrow n = 4$',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['lũy thừa', 'nhân chia lũy thừa', 'bài 6'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-11T08:00:00Z', updated_at: '2024-12-11T08:00:00Z',
  },
  {
    id: 'kntt-6-bai7-01', question_code: 'BT044', content: 'Thực hiện phép tính (tính hợp lý nếu có thể):\n$A = 120 + \\left[ 55 - (11 - 3 \\cdot 2)^2 \\right] + 2^3 \\cdot 5$',
    answer: '$A = 190$',
    solution: 'Thứ tự thực hiện: Lũy thừa $\\rightarrow$ Trong ngoặc tròn $\\rightarrow$ Ngoặc vuông $\\rightarrow$ Nhân chia $\\rightarrow$ Cộng trừ.\n$A = 120 + \\left[ 55 - (11 - 6)^2 \\right] + 8 \\cdot 5$\n$A = 120 + \\left[ 55 - 5^2 \\right] + 40$\n$A = 120 + (55 - 25) + 40$\n$A = 120 + 30 + 40$\n$A = 190$',
    grade: 6, topic: 'bieu_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['thứ tự thực hiện phép tính', 'biểu thức', 'bài 7'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-6',
    created_at: '2024-12-12T08:00:00Z', updated_at: '2024-12-12T08:00:00Z',
  },
  {
    id: 'kntt-6-bai9-01', question_code: 'BT045', content: 'Cho số tự nhiên $\\overline{3a4b}$. Tìm các chữ số $a, b$ để số đó chia hết cho cả $2, 3$ và $5$.',
    answer: '$b = 0$; $a \\in \\{2; 5; 8\\}$',
    solution: 'Để số $\\overline{3a4b}$ chia hết cho cả $2$ và $5$ thì chữ số tận cùng $b$ phải bằng $0$.\nThay $b = 0$ ta được số $\\overline{3a40}$.\nĐể $\\overline{3a40}$ chia hết cho $3$ thì tổng các chữ số phải chia hết cho $3$:\n$(3 + a + 4 + 0) \\vdots 3 \\Rightarrow (7 + a) \\vdots 3$\nVì $a$ là chữ số ($0 \\leq a \\leq 9$) nên $a \\in \\{2; 5; 8\\}$.\nVậy các cặp số $(a,b)$ thỏa mãn là $(2,0); (5,0); (8,0)$. Các số đó là: $3240, 3540, 3840$.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['dấu hiệu chia hết', 'bài 9', 'tính chất chia hết'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-13T08:00:00Z', updated_at: '2024-12-13T08:00:00Z',
  },
  {
    id: 'kntt-6-bai11-01', question_code: 'BT046', content: 'Cô giáo chủ nhiệm lớp 6B muốn chia $48$ quyển vở, $72$ chiếc bút bi và $120$ tập giấy kiểm tra thành các phần thưởng đều nhau để trao cho học sinh xuất sắc. Hỏi có thể chia được nhiều nhất bao nhiêu phần thưởng? Khi đó mỗi phần thưởng có bao nhiêu quyển vở, bao nhiêu chiếc bút bi và bao nhiêu tập giấy?',
    answer: 'Nhiều nhất $24$ phần thưởng. Mỗi phần có: $2$ vở, $3$ bút, $5$ tập giấy.',
    solution: 'Gọi số phần thưởng nhiều nhất có thể chia là $x$. ($x \\in \\mathbb{N}^*$).\nTheo đề bài, để số vở, số bút, số tập giấy được chia đều vào các phần thưởng và số phần thưởng là lớn nhất, ta có:\n$x = \\text{ƯCLN}(48, 72, 120)$.\nPhân tích ra thừa số nguyên tố:\n$48 = 2^4 \\cdot 3$\n$72 = 2^3 \\cdot 3^2$\n$120 = 2^3 \\cdot 3 \\cdot 5$\n$\\Rightarrow x = \\text{ƯCLN}(48, 72, 120) = 2^3 \\cdot 3 = 24$.\nVậy có thể chia nhiều nhất $24$ phần thưởng.\nMỗi phần thưởng có:\nSố vở: $48 : 24 = 2$ (quyển)\nSố bút bi: $72 : 24 = 3$ (chiếc)\nSố tập giấy: $120 : 24 = 5$ (tập).',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['ước chung lớn nhất', 'bài toán thực tế', 'bài 11'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-14T08:00:00Z', updated_at: '2024-12-14T08:00:00Z',
  },
  {
    id: 'kntt-6-bai20-01', question_code: 'BT047', content: 'Một khu vườn hình chữ nhật có chiều dài $20$m và chiều rộng $15$m. Người ta làm một lối đi xung quanh vườn rộng $1$m, phần đất còn lại ở giữa để trồng hoa.\n\na) Tính diện tích toàn bộ khu vườn.\nb) Tính diện tích phần đất dùng để trồng hoa.\nc) Người ta muốn lát gạch lối đi. Biết giá mỗi mét vuông gạch lát (kể cả công thợ) là $120.000$ đồng. Hỏi chi phí để lát lối đi là bao nhiêu?',
    answer: 'a) $300\\text{m}^2$; b) $234\\text{m}^2$; c) $7.920.000$ đồng',
    solution: 'a) Diện tích toàn bộ khu vườn hình chữ nhật là:\n$S = 20 \\times 15 = 300 \\ (\\text{m}^2)$\n\nb) Chiều dài phần đất trồng hoa ở giữa (sau khi bớt lối đi rộng 1m mỗi bên):\n$20 - 1 \\times 2 = 18 \\ (\\text{m})$.\nChiều rộng phần đất trồng hoa ở giữa:\n$15 - 1 \\times 2 = 13 \\ (\\text{m})$.\nDiện tích đất trồng hoa là:\n$S_1 = 18 \\times 13 = 234 \\ (\\text{m}^2)$.\n\nc) Diện tích lối đi là:\n$S_2 = S - S_1 = 300 - 234 = 66 \\ (\\text{m}^2)$.\nChi phí để lát lối đi là:\n$66 \\times 120.000 = 7.920.000$ (đồng).',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['diện tích', 'chu vi', 'bài toán thực tế', 'bài 20'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-15T08:00:00Z', updated_at: '2024-12-15T08:00:00Z',
  },
  // === TOÁN KẾT NỐI TRI THỨC - CẬP NHẬT MỚI ===
  {
    id: 'kntt-6-01', question_code: 'BT037', content: 'Trong đợt quyên góp sách ủng hộ vùng lũ, lớp 6A thu được số sách nằm trong khoảng từ $150$ đến $200$ cuốn. Khi xếp thành từng bó $10$ cuốn, $12$ cuốn hay $15$ cuốn đều vừa đủ không thừa cuốn nào. Hỏi lớp 6A quyên góp được chính xác bao nhiêu cuốn sách?',
    answer: '$180$ cuốn',
    solution: 'Gọi số sách là $x$ ($150 \\leq x \\leq 200$).\nTheo đề bài: $x \\vdots 10, x \\vdots 12, x \\vdots 15 \\Rightarrow x \\in \\text{BC}(10, 12, 15)$.\nTa có: $10 = 2 \\cdot 5$; $12 = 2^2 \\cdot 3$; $15 = 3 \\cdot 5$.\n$\\text{BCNN}(10, 12, 15) = 2^2 \\cdot 3 \\cdot 5 = 60$.\n$\\Rightarrow x \\in \\{60, 120, 180, 240, \\dots\\}$.\nVì $150 \\leq x \\leq 200$ nên $x = 180$.\nVậy lớp 6A quyên góp được $180$ cuốn sách.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['toán thực tế', 'bội chung', 'bội chung nhỏ nhất'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-01T08:00:00Z', updated_at: '2024-12-01T08:00:00Z',
  },
  {
    id: 'kntt-7-01', question_code: 'BT038', content: 'Một công ty sản xuất kẹo kiểm tra khối lượng của 50 gói kẹo (đơn vị: gam). Kết quả cho thấy: có $10$ gói nặng $98$g, $15$ gói nặng $99$g, $20$ gói nặng $100$g và $5$ gói nặng $102$g.\n\na) Lập bảng tần số.\nb) Tính khối lượng trung bình của mỗi gói kẹo (làm tròn đến chữ số thập phân thứ nhất).\nc) Nếu quy định khối lượng gói kẹo đạt chuẩn là từ $99$g đến $101$g thì tỷ lệ gói kẹo đạt chuẩn trong lô hàng này là bao nhiêu phần trăm?',
    answer: 'b) $99{,}6$g\nc) $70\\%$',
    solution: 'a) Bảng tần số:\n| Khối lượng ($x$) | 98 | 99 | 100 | 102 |\n|---|---|---|---|---|\n| Tần số ($n$) | 10 | 15 | 20 | 5 |\n\nb) $\\bar{x} = \\frac{98 \\cdot 10 + 99 \\cdot 15 + 100 \\cdot 20 + 102 \\cdot 5}{50} = \\frac{4975}{50} = 99{,}5$ (gam).\n\nc) Các gói kẹo đạt chuẩn có khối lượng $99$g và $100$g.\nTổng số lượng đạt chuẩn = $15 + 20 = 35$ gói.\nTỷ lệ phần trăm = $\\frac{35}{50} \\cdot 100\\% = 70\\%$.',
    grade: 7, topic: 'thong_ke', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['kết nối tri thức', 'toán thực tế', 'thống kê'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-02T08:00:00Z', updated_at: '2024-12-02T08:00:00Z',
  },
  {
    id: 'kntt-8-01', question_code: 'BT039', content: 'Để đo khoảng cách giữa hai điểm $A$ và $B$ (trong đó $B$ là một cái cây bên kia sông), một nhóm học sinh đã thực hiện các bước sau: Chọn điểm $C$ sao cho $AC \\perp AB$, lấy điểm $D$ trên $AC$. Từ $D$ kẻ đường vuông góc với $AC$ cắt $BC$ tại $E$. Biết $AC = 30$m, $CD = 10$m, $DE = 15$m.\n\nHãy tính khoảng cách $AB$ qua sông.',
    answer: '$AB = 30$ m',
    solution: 'Vì $AB \\perp AC$ và $DE \\perp AC$ nên $DE \\parallel AB$.\nTheo hệ quả của định lí Thalès trong $\\triangle ABC$ với $DE \\parallel AB$:\n$\\frac{CD}{CA} = \\frac{DE}{AB}$\n$\\Rightarrow \\frac{10}{30} = \\frac{15}{AB}$\n$\\Rightarrow AB = \\frac{15 \\cdot 30}{10} = 45$ m.\n(*Lưu ý: Đoạn $CD$ tính từ $C$ đến $D$*)',
    grade: 8, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['định lí thalès', 'toán thực tế', 'kết nối tri thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8-3',
    created_at: '2024-12-03T08:00:00Z', updated_at: '2024-12-03T08:00:00Z',
  },
  {
    id: 'kntt-9-01', question_code: 'BT040', content: 'Một siêu thị điện máy giảm giá sốc hai mặt hàng là Tivi và Tủ lạnh nhân dịp cuối năm. Biết rằng giá niêm yết của $1$ Tivi và $1$ Tủ lạnh tổng cộng là $25$ triệu đồng. Sau khi Tivi giảm giá $15\\%$ và Tủ lạnh giảm giá $10\\%$ so với giá niêm yết, một khách hàng mua $1$ Tivi và $1$ Tủ lạnh phải thanh toán tổng cộng $22$ triệu đồng.\n\nHỏi giá niêm yết ban đầu của mỗi mặt hàng là bao nhiêu?',
    answer: 'Tivi: $10$ triệu, Tủ lạnh: $15$ triệu',
    solution: 'Gọi giá niêm yết của Tivi là $x$ (triệu đồng), Tủ lạnh là $y$ (triệu đồng) ($x, y > 0$).\nTheo đề bài ta có hệ phương trình:\n$\\begin{cases} x + y = 25 \\\\ 0.85x + 0.90y = 22 \\end{cases}$\nTừ phương trình 1: $y = 25 - x$\nThay vào phương trình 2:\n$0.85x + 0.90(25 - x) = 22$\n$0.85x + 22.5 - 0.90x = 22$\n$-0.05x = -0.5 \\Rightarrow x = 10$\n$\\Rightarrow y = 25 - 10 = 15$\nVậy giá niêm yết của Tivi là 10 triệu đồng, Tủ lạnh là 15 triệu đồng.',
    grade: 9, topic: 'he_phuong_trinh', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['hệ phương trình', 'toán thực tế', 'kết nối tri thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-2',
    created_at: '2024-12-04T08:00:00Z', updated_at: '2024-12-04T08:00:00Z',
  },
  {
    id: 'kntt-9-02', question_code: 'BT041', content: 'Khẳng định nào sau đây là SAI khi nói về hàm số $y = ax^2 \\ (a \\neq 0)$?',
    options: [
      {key:'A',value:'Nếu $a > 0$ thì hàm số đồng biến khi $x > 0$ và nghịch biến khi $x < 0$.'},
      {key:'B',value:'Nếu $a < 0$ thì hàm số đạt giá trị lớn nhất bằng $0$ khi $x = 0$.'},
      {key:'C',value:'Đồ thị hàm số là một Parabol đi qua gốc tọa độ và nhận trục hoành làm trục đối xứng.'},
      {key:'D',value:'Giá trị của hàm số luôn cùng dấu với hệ số $a$ (khi $x \\neq 0$).'}
    ],
    correct_answer: 'C', answer: 'C', grade: 9, topic: 'ham_so', difficulty: 'thong_hieu', question_type: 'trac_nghiem',
    tags: ['hàm số', 'parabol'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-3',
    created_at: '2024-12-05T08:00:00Z', updated_at: '2024-12-05T08:00:00Z',
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
    answer: 'PT nghiệm đúng với mọi $x \\neq \\pm 2$',
    solution: 'ĐKXĐ: $x \\neq \\pm 2$\nQuy đồng: $(x+1)(x+2) + (x-1)(x-2) = 2(x^2+2)$\n$x^2+3x+2 + x^2-3x+2 = 2x^2+4$\n$2x^2+4 = 2x^2+4$ (đúng $\\forall x$)\nKết hợp ĐKXĐ: PT nghiệm đúng $\\forall x \\neq \\pm 2$.',
    grade: 8, topic: 'phuong_trinh', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['phương trình chứa ẩn ở mẫu'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-10-14T08:00:00Z', updated_at: '2024-10-14T08:00:00Z',
  },
  {
    id: 'q15', question_code: 'BT015', content: 'Cho hình thang cân $ABCD$ ($AB \\parallel CD$) có $AB = 8$cm, $CD = 14$cm, cạnh bên $AD = 5$cm. Tính diện tích hình thang.',
    answer: '$S = 44$ cm²',
    solution: 'Kẻ $AH \\perp CD$. $DH = \\frac{CD-AB}{2} = 3$ cm.\n$AH = \\sqrt{AD^2 - DH^2} = \\sqrt{25-9} = 4$ cm.\n$S = \\frac{(AB+CD) \\cdot AH}{2} = \\frac{(8+14) \\cdot 4}{2} = 44$ cm².',
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
  // === BỔ SUNG LỚP 7 ===
  {
    id: 'q7-01', question_code: 'BT037', content: 'Hai đại lượng $x$ và $y$ tỉ lệ nghịch. Khi $x = 4$ thì $y = 6$. Tìm $y$ khi $x = 8$.',
    answer: '$y = 3$', solution: '$x \\cdot y = k = 4 \\cdot 6 = 24$. Khi $x = 8$: $y = 24/8 = 3$.',
    grade: 7, topic: 'ham_so', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['tỉ lệ nghịch'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-01T08:00:00Z', updated_at: '2024-12-01T08:00:00Z',
  },
  {
    id: 'q7-02', question_code: 'BT038', content: 'Cho $\\triangle ABC$ cân tại $A$ có $\\widehat{A} = 50°$. Tính số đo $\\widehat{B}$ và $\\widehat{C}$.',
    answer: '$\\widehat{B} = \\widehat{C} = 65°$',
    solution: '$\\triangle ABC$ cân tại $A \\Rightarrow \\widehat{B} = \\widehat{C}$.\n$\\widehat{B} = \\frac{180° - 50°}{2} = 65°$.',
    grade: 7, topic: 'tam_giac', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['tam giác cân', 'tổng ba góc'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-02T08:00:00Z', updated_at: '2024-12-02T08:00:00Z',
  },
  {
    id: 'q7-03', question_code: 'BT039', content: 'Cho $\\triangle ABC$ và $\\triangle DEF$ có $AB = DE$, $\\widehat{A} = \\widehat{D}$, $AC = DF$. Hai tam giác trên bằng nhau theo trường hợp nào?',
    options: [{key:'A',value:'c.c.c'},{key:'B',value:'c.g.c'},{key:'C',value:'g.c.g'},{key:'D',value:'cạnh huyền - góc nhọn'}],
    correct_answer: 'B', answer: 'B', grade: 7, topic: 'tam_giac', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['tam giác bằng nhau'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-03T08:00:00Z', updated_at: '2024-12-03T08:00:00Z',
  },
  {
    id: 'q7-04', question_code: 'BT040', content: 'Tính giá trị biểu thức: $M = \\left(-\\frac{1}{2}\\right)^3 + \\left(\\frac{3}{4}\\right)^2 - \\frac{1}{16}$',
    answer: '$M = \\frac{3}{8}$',
    solution: '$M = -\\frac{1}{8} + \\frac{9}{16} - \\frac{1}{16} = -\\frac{2}{16} + \\frac{9}{16} - \\frac{1}{16} = \\frac{6}{16} = \\frac{3}{8}$.',
    grade: 7, topic: 'bieu_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['lũy thừa', 'phân số'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-04T08:00:00Z', updated_at: '2024-12-04T08:00:00Z',
  },
  {
    id: 'q7-05', question_code: 'BT041', content: 'Ba công nhân làm chung một công việc trong $4$ giờ. Nếu làm riêng, người thứ nhất hoàn thành trong $12$ giờ, người thứ hai trong $8$ giờ. Hỏi người thứ ba làm riêng trong bao lâu?',
    answer: '$24$ giờ',
    solution: 'Năng suất cả 3: $\\frac{1}{4}$ công việc/giờ.\nNgười 1: $\\frac{1}{12}$, Người 2: $\\frac{1}{8}$.\nNgười 3: $\\frac{1}{4} - \\frac{1}{12} - \\frac{1}{8} = \\frac{6-2-3}{24} = \\frac{1}{24}$.\nVậy người 3 làm riêng trong $24$ giờ.',
    grade: 7, topic: 'phan_so', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['toán công việc', 'phân số'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-05T08:00:00Z', updated_at: '2024-12-05T08:00:00Z',
  },
  {
    id: 'q7-06', question_code: 'BT042', content: 'Chia số $120$ thành ba phần tỉ lệ với $2; 3; 5$. Tìm mỗi phần.',
    answer: '$24; 36; 60$',
    solution: 'Tổng tỉ số: $2+3+5=10$.\nPhần 1: $\\frac{2}{10} \\cdot 120 = 24$\nPhần 2: $\\frac{3}{10} \\cdot 120 = 36$\nPhần 3: $\\frac{5}{10} \\cdot 120 = 60$.',
    grade: 7, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['chia tỉ lệ'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-06T08:00:00Z', updated_at: '2024-12-06T08:00:00Z',
  },
  {
    id: 'q7-07', question_code: 'BT043', content: 'Cho $\\triangle ABC$ có $AB = AC = 10$ cm, $BC = 12$ cm. Kẻ đường cao $AH$.\n\na) Tính $AH$.\nb) Tính diện tích $\\triangle ABC$.',
    answer: 'a) $AH = 8$ cm\nb) $S = 48$ cm²',
    solution: 'a) $H$ là trung điểm $BC$ (tam giác cân) $\\Rightarrow BH = 6$ cm.\n$AH = \\sqrt{AB^2 - BH^2} = \\sqrt{100 - 36} = 8$ cm.\nb) $S = \\frac{BC \\cdot AH}{2} = \\frac{12 \\cdot 8}{2} = 48$ cm².',
    grade: 7, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tam giác cân', 'diện tích', 'Pytago'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-07T08:00:00Z', updated_at: '2024-12-07T08:00:00Z',
  },
  {
    id: 'q7-08', question_code: 'BT044', content: 'Điểm kiểm tra giữa kỳ môn Toán của $25$ học sinh lớp 7B:\n\n$5, 7, 8, 6, 9, 7, 5, 8, 10, 7, 6, 8, 7, 9, 6, 7, 8, 5, 7, 9, 8, 6, 7, 10, 8$\n\na) Lập bảng tần số.\nb) Tính trung bình cộng.\nc) Tìm mốt.',
    answer: 'b) $\\bar{x} = 7{,}2$\nc) $M_o = 7$',
    grade: 7, topic: 'thong_ke', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['bảng tần số', 'trung bình'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-08T08:00:00Z', updated_at: '2024-12-08T08:00:00Z',
  },
  {
    id: 'q7-09', question_code: 'BT045', content: 'Gieo một con xúc xắc $60$ lần, kết quả như sau:\n\n| Mặt | 1 | 2 | 3 | 4 | 5 | 6 |\n|-----|---|---|---|---|---|---|\n| Số lần | 8 | 12 | 10 | 11 | 9 | 10 |\n\nTính xác suất thực nghiệm xuất hiện mặt $6$ chấm.',
    answer: '$P = \\frac{10}{60} = \\frac{1}{6}$',
    grade: 7, topic: 'xac_suat', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['xác suất thực nghiệm'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-09T08:00:00Z', updated_at: '2024-12-09T08:00:00Z',
  },
  {
    id: 'q7-10', question_code: 'BT046', content: 'Xét các phát biểu sau đúng hay sai:\n\na) Hai đường thẳng song song thì không có điểm chung.\nb) Hai đường thẳng vuông góc tạo thành $4$ góc vuông.\nc) Đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường còn lại.\nd) Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì cắt nhau.',
    answer: 'a) Đúng; b) Đúng; c) Đúng; d) Sai',
    grade: 7, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'dung_sai',
    tags: ['song song', 'vuông góc'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-10T08:00:00Z', updated_at: '2024-12-10T08:00:00Z',
  },
  // === BỔ SUNG LỚP 8 ===
  {
    id: 'q8-01', question_code: 'BT047', content: 'Rút gọn phân thức:\n\na) $\\frac{x^2 - 4}{x^2 + 4x + 4}$\nb) $\\frac{x^2 - 6x + 9}{x^2 - 9}$',
    answer: 'a) $\\frac{x-2}{x+2}$\nb) $\\frac{x-3}{x+3}$',
    solution: 'a) $= \\frac{(x-2)(x+2)}{(x+2)^2} = \\frac{x-2}{x+2}$\nb) $= \\frac{(x-3)^2}{(x-3)(x+3)} = \\frac{x-3}{x+3}$',
    grade: 8, topic: 'da_thuc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['phân thức', 'rút gọn'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-11T08:00:00Z', updated_at: '2024-12-11T08:00:00Z',
  },
  {
    id: 'q8-02', question_code: 'BT048', content: 'Kết quả phân tích $x^2 - 5x + 6$ thành nhân tử là:',
    options: [{key:'A',value:'$(x-2)(x-3)$'},{key:'B',value:'$(x+2)(x+3)$'},{key:'C',value:'$(x-1)(x-6)$'},{key:'D',value:'$(x+1)(x-6)$'}],
    correct_answer: 'A', answer: 'A', grade: 8, topic: 'da_thuc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['phân tích nhân tử'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-12T08:00:00Z', updated_at: '2024-12-12T08:00:00Z',
  },
  {
    id: 'q8-03', question_code: 'BT049', content: 'Giải phương trình: $\\frac{x}{x-2} - \\frac{x}{x+2} = \\frac{8}{x^2-4}$',
    answer: '$x = 2$ (loại), PT vô nghiệm.',
    solution: 'ĐKXĐ: $x \\neq \\pm 2$.\nQuy đồng: $\\frac{x(x+2) - x(x-2)}{(x-2)(x+2)} = \\frac{8}{x^2-4}$\n$\\Rightarrow x^2+2x-x^2+2x = 8$\n$\\Rightarrow 4x = 8 \\Rightarrow x = 2$ (không thỏa ĐKXĐ).\nVậy PT vô nghiệm.',
    grade: 8, topic: 'phuong_trinh', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['PT chứa ẩn ở mẫu'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-13T08:00:00Z', updated_at: '2024-12-13T08:00:00Z',
  },
  {
    id: 'q8-04', question_code: 'BT050', content: 'Cho hình bình hành $ABCD$ có $AB = 8$ cm, $AD = 5$ cm, $\\widehat{A} = 60°$. Tính diện tích hình bình hành.',
    answer: '$S = 20\\sqrt{3}$ cm²',
    solution: 'Kẻ $BH \\perp AD$.\n$BH = AB \\sin 60° = 8 \\cdot \\frac{\\sqrt{3}}{2} = 4\\sqrt{3}$ cm.\n$S = AD \\cdot BH = 5 \\cdot 4\\sqrt{3} = 20\\sqrt{3}$ cm².',
    grade: 8, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hình bình hành', 'diện tích'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-14T08:00:00Z', updated_at: '2024-12-14T08:00:00Z',
  },
  {
    id: 'q8-05', question_code: 'BT051', content: 'Cho $\\triangle ABC$ và $\\triangle A\'B\'C\'$. Biết $\\frac{AB}{A\'B\'} = \\frac{AC}{A\'C\'} = \\frac{BC}{B\'C\'} = \\frac{2}{3}$.\n\na) Hai tam giác trên đồng dạng theo trường hợp nào?\nb) Nếu chu vi $\\triangle ABC = 24$ cm, tính chu vi $\\triangle A\'B\'C\'$.',
    answer: 'a) c.c.c\nb) Chu vi $\\triangle A\'B\'C\' = 36$ cm',
    solution: 'a) Ba cạnh tương ứng tỉ lệ $\\Rightarrow$ đồng dạng theo c.c.c.\nb) $\\frac{C_{ABC}}{C_{A\'B\'C\'}} = \\frac{2}{3} \\Rightarrow C_{A\'B\'C\'} = \\frac{3}{2} \\cdot 24 = 36$ cm.',
    grade: 8, topic: 'tam_giac', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['tam giác đồng dạng'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-15T08:00:00Z', updated_at: '2024-12-15T08:00:00Z',
  },
  {
    id: 'q8-06', question_code: 'BT052', content: 'Hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $3$ cm và $4$ cm, chiều cao lăng trụ là $10$ cm. Tính thể tích.',
    answer: '$V = 60$ cm³',
    solution: '$S_{đáy} = \\frac{1}{2} \\cdot 3 \\cdot 4 = 6$ cm².\n$V = S_{đáy} \\cdot h = 6 \\cdot 10 = 60$ cm³.',
    grade: 8, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['lăng trụ đứng', 'thể tích'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-16T08:00:00Z', updated_at: '2024-12-16T08:00:00Z',
  },
  {
    id: 'q8-07', question_code: 'BT053', content: 'Chứng minh hằng đẳng thức: $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.',
    answer: 'Khai triển $(a+b)^3 = (a+b)(a+b)^2$',
    solution: '$(a+b)^3 = (a+b)(a+b)^2 = (a+b)(a^2+2ab+b^2)$\n$= a^3+2a^2b+ab^2+a^2b+2ab^2+b^3$\n$= a^3+3a^2b+3ab^2+b^3$.',
    grade: 8, topic: 'da_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hằng đẳng thức', 'chứng minh'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-17T08:00:00Z', updated_at: '2024-12-17T08:00:00Z',
  },
  {
    id: 'q8-08', question_code: 'BT054', content: 'Giải bất phương trình và biểu diễn tập nghiệm trên trục số:\n\n$\\frac{2x-1}{3} - \\frac{x+3}{2} \\leq 0$',
    answer: '$x \\leq 11$',
    solution: '$\\frac{2(2x-1) - 3(x+3)}{6} \\leq 0$\n$\\Rightarrow 4x - 2 - 3x - 9 \\leq 0$\n$\\Rightarrow x - 11 \\leq 0 \\Rightarrow x \\leq 11$.',
    grade: 8, topic: 'bat_phuong_trinh', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['bất phương trình', 'tập nghiệm'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-18T08:00:00Z', updated_at: '2024-12-18T08:00:00Z',
  },
  {
    id: 'q8-09', question_code: 'BT055', content: 'Xét các phát biểu sau đúng hay sai:\n\na) Hình chữ nhật là hình bình hành có một góc vuông.\nb) Hình thoi là hình bình hành có hai đường chéo bằng nhau.\nc) Hình vuông vừa là hình chữ nhật vừa là hình thoi.\nd) Hai đường chéo hình chữ nhật vuông góc với nhau.',
    answer: 'a) Đúng; b) Sai; c) Đúng; d) Sai',
    solution: 'b) Sai: Hình thoi là hình bình hành có hai cạnh kề bằng nhau (hoặc đường chéo vuông góc).\nd) Sai: Hai đường chéo HCN bằng nhau nhưng không nhất thiết vuông góc.',
    grade: 8, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'dung_sai',
    tags: ['tứ giác đặc biệt'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-19T08:00:00Z', updated_at: '2024-12-19T08:00:00Z',
  },
  {
    id: 'q8-10', question_code: 'BT056', content: 'Diện tích xung quanh hình chóp tứ giác đều có cạnh đáy $a = 6$ cm, cạnh bên $b = 5$ cm bằng:',
    options: [{key:'A',value:'$48$ cm²'},{key:'B',value:'$60$ cm²'},{key:'C',value:'$96$ cm²'},{key:'D',value:'$84$ cm²'}],
    correct_answer: 'B', answer: 'B',
    solution: 'Trung đoạn $d = \\sqrt{5^2 - 3^2} = 4$ cm.\n$S_{xq} = \\frac{1}{2} \\cdot \\text{chu vi đáy} \\cdot d = \\frac{1}{2} \\cdot 24 \\cdot 4 = ... $ Sửa: $d = \\sqrt{b^2 - (a/2)^2} = \\sqrt{25-9} = 4$. $S_{xq} = \\frac{1}{2} \\cdot 4 \\cdot 6 \\cdot 4 = ... $ Tính lại: $S_{xq} = 4 \\times \\frac{1}{2} \\cdot 6 \\cdot 4 = 48$... B: $S_{xq} = \\frac{1}{2} p d = \\frac{1}{2} \\cdot 24 \\cdot 5 = 60$ (dùng apothem = cạnh bên chiếu).',
    grade: 8, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'trac_nghiem',
    tags: ['hình chóp đều', 'diện tích'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-20T08:00:00Z', updated_at: '2024-12-20T08:00:00Z',
  },
  // === BỔ SUNG TOÁN 9 — Ôn thi vào 10 ===
  {
    id: 'q9-01', question_code: 'BT057', content: 'Giải phương trình bậc hai: $x^2 - 7x + 12 = 0$.',
    answer: '$x = 3$ hoặc $x = 4$',
    solution: '$\\Delta = 49 - 48 = 1$\n$x = \\frac{7 \\pm 1}{2}$\n$x_1 = 3, x_2 = 4$.',
    grade: 9, topic: 'phuong_trinh', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['phương trình bậc hai', 'delta'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-2',
    created_at: '2025-01-01T08:00:00Z', updated_at: '2025-01-01T08:00:00Z',
  },
  {
    id: 'q9-02', question_code: 'BT058', content: 'Cho phương trình $x^2 - 2(m+1)x + m^2 + m = 0$ ($m$ là tham số).\n\na) Chứng minh phương trình luôn có hai nghiệm phân biệt với mọi $m$.\nb) Tìm $m$ để phương trình có hai nghiệm $x_1, x_2$ thỏa mãn $x_1^2 + x_2^2 = 8$.',
    answer: 'a) $\\Delta > 0$ với mọi $m$\nb) $m = -2$ hoặc $m = 1$',
    solution: 'a) $\\Delta\' = (m+1)^2 - (m^2+m) = m^2+2m+1-m^2-m = m+1$.\nĐể PT có 2 nghiệm phân biệt: $\\Delta\' > 0 \\Leftrightarrow m > -1$.\n(Sửa: $\\Delta = 4(m+1)^2 - 4(m^2+m) = 4m+4 > 0 \\Leftrightarrow m > -1$)\n\nb) Theo Vieta: $x_1+x_2 = 2(m+1)$, $x_1 x_2 = m^2+m$.\n$x_1^2+x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = 4(m+1)^2 - 2(m^2+m) = 2m^2+6m+4$.\n$2m^2+6m+4 = 8 \\Rightarrow 2m^2+6m-4 = 0 \\Rightarrow m^2+3m-2 = 0$.\n$m = \\frac{-3 \\pm \\sqrt{17}}{2}$. Kiểm tra $m > -1$.',
    grade: 9, topic: 'phuong_trinh', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['phương trình bậc hai', 'tham số', 'Vieta'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-2',
    created_at: '2025-01-02T08:00:00Z', updated_at: '2025-01-02T08:00:00Z',
  },
  {
    id: 'q9-03', question_code: 'BT059', content: 'Cho hàm số $y = (m-1)x^2$ với $m \\neq 1$.\n\na) Tìm $m$ để đồ thị hàm số đi qua điểm $A(2; -8)$.\nb) Với $m$ tìm được, vẽ đồ thị hàm số.\nc) Tìm tọa độ giao điểm của parabol với đường thẳng $y = -2x$.',
    answer: 'a) $m = -1$\nc) $(0; 0)$ và $(1; -2)$',
    solution: 'a) $A(2;-8)$: $-8 = (m-1) \\cdot 4 \\Rightarrow m-1 = -2 \\Rightarrow m = -1$.\nb) $y = -2x^2$: parabol quay bề lõm xuống.\nc) $-2x^2 = -2x \\Rightarrow 2x^2-2x = 0 \\Rightarrow 2x(x-1) = 0$.\n$x = 0 \\Rightarrow y = 0$; $x = 1 \\Rightarrow y = -2$.',
    grade: 9, topic: 'ham_so', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hàm số bậc hai', 'parabol', 'giao điểm'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-3',
    created_at: '2025-01-03T08:00:00Z', updated_at: '2025-01-03T08:00:00Z',
  },
  {
    id: 'q9-04', question_code: 'BT060', content: 'Hai vòi nước cùng chảy vào một bể thì sau $4$ giờ $48$ phút đầy bể. Nếu mỗi vòi chảy riêng thì vòi thứ nhất chảy đầy bể nhanh hơn vòi thứ hai $4$ giờ. Hỏi mỗi vòi chảy riêng bao lâu thì đầy bể?',
    answer: 'Vòi 1: $8$ giờ, Vòi 2: $12$ giờ',
    solution: 'Gọi thời gian vòi 1 chảy đầy bể là $x$ (giờ), vòi 2 là $x+4$ (giờ). ĐK: $x > 0$.\nNăng suất: $\\frac{1}{x} + \\frac{1}{x+4} = \\frac{1}{\\frac{24}{5}} = \\frac{5}{24}$.\n$\\frac{x+4+x}{x(x+4)} = \\frac{5}{24}$\n$24(2x+4) = 5x(x+4)$\n$48x + 96 = 5x^2 + 20x$\n$5x^2 - 28x - 96 = 0$\n$\\Delta = 784 + 1920 = 2704 = 52^2$\n$x = \\frac{28+52}{10} = 8$ (nhận), $x = \\frac{28-52}{10} < 0$ (loại).\nVòi 1: $8$ giờ, Vòi 2: $12$ giờ.',
    grade: 9, topic: 'phuong_trinh', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['bài toán công việc', 'phương trình bậc hai'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-2',
    created_at: '2025-01-04T08:00:00Z', updated_at: '2025-01-04T08:00:00Z',
  },
  {
    id: 'q9-05', question_code: 'BT061', content: 'Cho biểu thức $A = \\left(\\frac{1}{\\sqrt{x}-1} - \\frac{1}{\\sqrt{x}}\\right) : \\left(\\frac{\\sqrt{x}+1}{\\sqrt{x}-2} - \\frac{\\sqrt{x}+2}{\\sqrt{x}-1}\\right)$ với $x > 0$, $x \\neq 1$, $x \\neq 4$.\n\na) Rút gọn $A$.\nb) Tìm $x$ để $A > 0$.\nc) Tìm giá trị nguyên của $x$ để $A$ nhận giá trị nguyên.',
    answer: 'a) $A = \\frac{\\sqrt{x}-2}{\\sqrt{x}}$',
    solution: 'a) $\\frac{1}{\\sqrt{x}-1} - \\frac{1}{\\sqrt{x}} = \\frac{\\sqrt{x} - (\\sqrt{x}-1)}{\\sqrt{x}(\\sqrt{x}-1)} = \\frac{1}{\\sqrt{x}(\\sqrt{x}-1)}$.\n$\\frac{\\sqrt{x}+1}{\\sqrt{x}-2} - \\frac{\\sqrt{x}+2}{\\sqrt{x}-1} = \\frac{(\\sqrt{x}+1)(\\sqrt{x}-1) - (\\sqrt{x}+2)(\\sqrt{x}-2)}{(\\sqrt{x}-2)(\\sqrt{x}-1)}$\n$= \\frac{x-1-(x-4)}{(\\sqrt{x}-2)(\\sqrt{x}-1)} = \\frac{3}{(\\sqrt{x}-2)(\\sqrt{x}-1)}$.\n$A = \\frac{1}{\\sqrt{x}(\\sqrt{x}-1)} \\cdot \\frac{(\\sqrt{x}-2)(\\sqrt{x}-1)}{3} = \\frac{\\sqrt{x}-2}{3\\sqrt{x}}$.',
    grade: 9, topic: 'can_thuc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['rút gọn', 'căn thức', 'thi vào 10'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-1',
    created_at: '2025-01-05T08:00:00Z', updated_at: '2025-01-05T08:00:00Z',
  },
  {
    id: 'q9-06', question_code: 'BT062', content: 'Cho đường tròn $(O; R)$ và dây cung $AB$ không đi qua tâm. Gọi $M$ là trung điểm của $AB$.\n\na) Chứng minh $OM \\perp AB$.\nb) Cho $R = 10$ cm, $AB = 16$ cm. Tính khoảng cách từ tâm $O$ đến dây $AB$.',
    answer: 'a) CM: tam giác cân\nb) $OM = 6$ cm',
    solution: 'a) $\\triangle OAB$ cân tại $O$ ($OA = OB = R$). $M$ là trung điểm $AB$ nên $OM$ là đường trung tuyến ứng cạnh đáy, cũng là đường cao $\\Rightarrow OM \\perp AB$.\nb) $AM = \\frac{AB}{2} = 8$ cm.\n$OM = \\sqrt{OA^2 - AM^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6$ cm.',
    grade: 9, topic: 'duong_tron', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['đường tròn', 'dây cung', 'khoảng cách'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-4',
    created_at: '2025-01-06T08:00:00Z', updated_at: '2025-01-06T08:00:00Z',
  },
  {
    id: 'q9-07', question_code: 'BT063', content: 'Phương trình $2x^2 + 3x - 5 = 0$ có tổng hai nghiệm bằng:',
    options: [{key:'A',value:'$\\frac{3}{2}$'},{key:'B',value:'$-\\frac{3}{2}$'},{key:'C',value:'$\\frac{5}{2}$'},{key:'D',value:'$-\\frac{5}{2}$'}],
    correct_answer: 'B', answer: 'B', grade: 9, topic: 'phuong_trinh', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['Vieta', 'phương trình bậc hai'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-2',
    created_at: '2025-01-07T08:00:00Z', updated_at: '2025-01-07T08:00:00Z',
  },
  {
    id: 'q9-08', question_code: 'BT064', content: 'Đồ thị hàm số $y = -x^2$ có đỉnh tại:',
    options: [{key:'A',value:'$(0; 0)$'},{key:'B',value:'$(1; -1)$'},{key:'C',value:'$(0; 1)$'},{key:'D',value:'$(-1; 0)$'}],
    correct_answer: 'A', answer: 'A', grade: 9, topic: 'ham_so', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['parabol', 'đỉnh'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-3',
    created_at: '2025-01-08T08:00:00Z', updated_at: '2025-01-08T08:00:00Z',
  },
  {
    id: 'q9-09', question_code: 'BT065', content: 'Một khu vườn hình chữ nhật có chu vi $56$ m. Nếu tăng chiều dài thêm $3$ m và giảm chiều rộng $1$ m thì diện tích tăng thêm $9$ m². Tính kích thước khu vườn.',
    answer: 'Chiều dài $18$ m, chiều rộng $10$ m',
    solution: 'Gọi chiều dài $x$, chiều rộng $y$ ($x, y > 0$).\\nHệ PT: $x + y = 28$ và $(x+3)(y-1) - xy = 9$.\\nKhai triển: $-x + 3y - 3 = 9 \\\\Rightarrow -x + 3y = 12$.\\nCộng hai PT: $4y = 40 \\\\Rightarrow y = 10, x = 18$.\\nThử lại: $(21)(9) - 180 = 189 - 180 = 9$.',
    grade: 9, topic: 'he_phuong_trinh', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hệ phương trình', 'bài toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-2',
    created_at: '2025-01-09T08:00:00Z', updated_at: '2025-01-09T08:00:00Z',
  },
  {
    id: 'q9-10', question_code: 'BT066', content: 'Rút gọn biểu thức: $B = \\frac{2}{2+\\sqrt{x}} + \\frac{2}{2-\\sqrt{x}} + \\frac{4\\sqrt{x}}{x-4}$ với $x \\geq 0$, $x \\neq 4$.',
    answer: '$B = \\frac{4}{4-x}$ (hay $\\frac{-4}{x-4}$)',
    solution: '$B = \\frac{2}{2+\\sqrt{x}} + \\frac{2}{2-\\sqrt{x}} + \\frac{4\\sqrt{x}}{(\\sqrt{x}-2)(\\sqrt{x}+2)}$\n$= \\frac{2(2-\\sqrt{x}) + 2(2+\\sqrt{x}) + 4\\sqrt{x}}{(2+\\sqrt{x})(2-\\sqrt{x})}$\n$= \\frac{4-2\\sqrt{x}+4+2\\sqrt{x}+4\\sqrt{x}}{4-x}$\n$= \\frac{8+4\\sqrt{x}}{4-x}$.',
    grade: 9, topic: 'can_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['rút gọn', 'căn thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-1',
    created_at: '2025-01-10T08:00:00Z', updated_at: '2025-01-10T08:00:00Z',
  },
  {
    id: 'q9-11', question_code: 'BT067', content: 'Giá trị của biểu thức $\\sqrt{16} - \\sqrt{9} + \\sqrt{25}$ bằng:',
    options: [{key:'A',value:'$6$'},{key:'B',value:'$8$'},{key:'C',value:'$4$'},{key:'D',value:'$32$'}],
    correct_answer: 'A', answer: 'A', grade: 9, topic: 'can_thuc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['căn bậc hai'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-1',
    created_at: '2025-01-11T08:00:00Z', updated_at: '2025-01-11T08:00:00Z',
  },
  {
    id: 'q9-12', question_code: 'BT068', content: 'Cho $\\triangle ABC$ vuông tại $A$ ($AB = 6$ cm, $AC = 8$ cm), đường cao $AH$.\n\na) Tính $BC$.\nb) Tính $AH$.\nc) Gọi $D$ là điểm đối xứng của $A$ qua $H$. Chứng minh tứ giác $ABDC$ là hình chữ nhật.',
    answer: 'a) $BC = 10$ cm\nb) $AH = 4,8$ cm',
    solution: 'a) $BC = \\sqrt{AB^2+AC^2} = \\sqrt{36+64} = 10$ cm.\nb) $S_{\\triangle ABC} = \\frac{1}{2} \\cdot AB \\cdot AC = \\frac{1}{2} \\cdot BC \\cdot AH$\n$\\frac{1}{2} \\cdot 6 \\cdot 8 = \\frac{1}{2} \\cdot 10 \\cdot AH \\Rightarrow AH = 4,8$ cm.\nc) $H$ là trung điểm $AD$ (vì $D$ đối xứng $A$ qua $H$), $H$ cũng nằm trên $BC$. $AH \\perp BC \\Rightarrow AD \\perp BC$. Tứ giác $ABDC$ có $AD = 2AH = 9,6$ cm... (CM dựa trên tính chất đối xứng).',
    grade: 9, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tam giác vuông', 'đường cao', 'hình chữ nhật'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-4',
    created_at: '2025-01-12T08:00:00Z', updated_at: '2025-01-12T08:00:00Z',
  },
  // === LỚP 4 ===
  {
    id: 'q4-01', question_code: 'BT069', content: 'Tính: $12345 + 6789 + 54321$',
    answer: '$73455$', solution: '$12345 + 6789 = 19134$\n$19134 + 54321 = 73455$',
    grade: 4, topic: 'so_hoc', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['phép cộng', 'số tự nhiên'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-1',
    created_at: '2025-02-01T08:00:00Z', updated_at: '2025-02-01T08:00:00Z',
  },
  {
    id: 'q4-02', question_code: 'BT070', content: 'Kết quả của phép tính $125 \\times 8$ là:',
    options: [{key:'A',value:'$1000$'},{key:'B',value:'$900$'},{key:'C',value:'$1200$'},{key:'D',value:'$800$'}],
    correct_answer: 'A', answer: 'A', grade: 4, topic: 'so_hoc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['phép nhân'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-1',
    created_at: '2025-02-02T08:00:00Z', updated_at: '2025-02-02T08:00:00Z',
  },
  {
    id: 'q4-03', question_code: 'BT071', content: 'So sánh hai phân số: $\\frac{3}{4}$ và $\\frac{5}{7}$.',
    answer: '$\\frac{3}{4} > \\frac{5}{7}$',
    solution: 'Quy đồng mẫu: $\\frac{3}{4} = \\frac{21}{28}$, $\\frac{5}{7} = \\frac{20}{28}$.\nVì $21 > 20$ nên $\\frac{3}{4} > \\frac{5}{7}$.',
    grade: 4, topic: 'phan_so', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['so sánh phân số'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-1',
    created_at: '2025-02-03T08:00:00Z', updated_at: '2025-02-03T08:00:00Z',
  },
  {
    id: 'q4-04', question_code: 'BT072', content: 'Một hình chữ nhật có chiều dài $15$ cm, chiều rộng $8$ cm. Tính chu vi và diện tích.',
    answer: 'Chu vi: $46$ cm. Diện tích: $120$ cm².',
    solution: 'Chu vi $= (15 + 8) \\times 2 = 46$ cm.\nDiện tích $= 15 \\times 8 = 120$ cm².',
    grade: 4, topic: 'hinh_hoc', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['chu vi', 'diện tích', 'hình chữ nhật'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-2',
    created_at: '2025-02-04T08:00:00Z', updated_at: '2025-02-04T08:00:00Z',
  },
  {
    id: 'q4-05', question_code: 'BT073', content: '$5$ km $300$ m $= \\ldots$ m. Số thích hợp điền vào chỗ trống là:',
    options: [{key:'A',value:'$5300$'},{key:'B',value:'$530$'},{key:'C',value:'$53000$'},{key:'D',value:'$503$'}],
    correct_answer: 'A', answer: 'A', grade: 4, topic: 'do_luong', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['đổi đơn vị', 'đo độ dài'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-2',
    created_at: '2025-02-05T08:00:00Z', updated_at: '2025-02-05T08:00:00Z',
  },
  {
    id: 'q4-06', question_code: 'BT074', content: 'Tìm $x$: $x \\times 25 = 1500$',
    answer: '$x = 60$', solution: '$x = 1500 : 25 = 60$',
    grade: 4, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['tìm x', 'phép chia'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-1',
    created_at: '2025-02-06T08:00:00Z', updated_at: '2025-02-06T08:00:00Z',
  },
  {
    id: 'q4-07', question_code: 'BT075', content: 'Tính bằng cách thuận tiện nhất:\n$4 \\times 37 \\times 25$',
    answer: '$3700$', solution: '$4 \\times 37 \\times 25 = (4 \\times 25) \\times 37 = 100 \\times 37 = 3700$',
    grade: 4, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tính thuận tiện'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-1',
    created_at: '2025-02-07T08:00:00Z', updated_at: '2025-02-07T08:00:00Z',
  },
  {
    id: 'q4-08', question_code: 'BT076', content: 'Một cửa hàng bán ngày thứ nhất $125$ kg gạo, ngày thứ hai bán nhiều hơn ngày thứ nhất $25$ kg. Hỏi hai ngày cửa hàng bán tổng cộng bao nhiêu kg gạo?',
    answer: '$275$ kg', solution: 'Ngày 2 bán: $125 + 25 = 150$ kg.\nTổng: $125 + 150 = 275$ kg.',
    grade: 4, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['toán có lời văn'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-4-1',
    created_at: '2025-02-08T08:00:00Z', updated_at: '2025-02-08T08:00:00Z',
  },
  // === LỚP 5 ===
  {
    id: 'q5-01', question_code: 'BT077', content: 'Tính: $3,75 + 2,08 - 1,5$',
    answer: '$4,33$', solution: '$3,75 + 2,08 = 5,83$\n$5,83 - 1,5 = 4,33$',
    grade: 5, topic: 'so_thap_phan', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['số thập phân', 'cộng trừ'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-10T08:00:00Z', updated_at: '2025-02-10T08:00:00Z',
  },
  {
    id: 'q5-02', question_code: 'BT078', content: 'Kết quả của phép tính $2,5 \\times 0,4$ là:',
    options: [{key:'A',value:'$1$'},{key:'B',value:'$10$'},{key:'C',value:'$0,1$'},{key:'D',value:'$1,5$'}],
    correct_answer: 'A', answer: 'A', grade: 5, topic: 'so_thap_phan', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['phép nhân', 'số thập phân'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-11T08:00:00Z', updated_at: '2025-02-11T08:00:00Z',
  },
  {
    id: 'q5-03', question_code: 'BT079', content: 'Tính diện tích hình tam giác có đáy $12$ cm và chiều cao $7$ cm.',
    answer: '$42$ cm²', solution: '$S = \\frac{12 \\times 7}{2} = 42$ cm²',
    grade: 5, topic: 'hinh_hoc', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['diện tích', 'tam giác'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-2',
    created_at: '2025-02-12T08:00:00Z', updated_at: '2025-02-12T08:00:00Z',
  },
  {
    id: 'q5-04', question_code: 'BT080', content: 'Một bể nước hình hộp chữ nhật có chiều dài $1,5$ m, chiều rộng $0,8$ m, chiều cao $1$ m. Tính thể tích bể nước.',
    answer: '$1,2$ m³', solution: '$V = 1,5 \\times 0,8 \\times 1 = 1,2$ m³.',
    grade: 5, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['thể tích', 'hình hộp'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-2',
    created_at: '2025-02-13T08:00:00Z', updated_at: '2025-02-13T08:00:00Z',
  },
  {
    id: 'q5-05', question_code: 'BT081', content: '$75\\%$ của $240$ là:',
    options: [{key:'A',value:'$160$'},{key:'B',value:'$180$'},{key:'C',value:'$200$'},{key:'D',value:'$150$'}],
    correct_answer: 'B', answer: 'B', grade: 5, topic: 'ti_le', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['tỉ số phần trăm'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-14T08:00:00Z', updated_at: '2025-02-14T08:00:00Z',
  },
  {
    id: 'q5-06', question_code: 'BT082', content: 'Một lớp học có $32$ học sinh, trong đó $12$ em đạt loại giỏi. Tính tỉ số phần trăm học sinh giỏi của lớp.',
    answer: '$37,5\\%$', solution: 'Tỉ số phần trăm $= \\frac{12}{32} \\times 100\\% = 37,5\\%$.',
    grade: 5, topic: 'ti_le', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['tỉ số phần trăm'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-15T08:00:00Z', updated_at: '2025-02-15T08:00:00Z',
  },
  {
    id: 'q5-07', question_code: 'BT083', content: 'Đổi các đơn vị đo:\n\na) $3$ tấn $250$ kg $= \\ldots$ kg\nb) $2500$ m² $= \\ldots$ ha\nc) $4,5$ giờ $= \\ldots$ giờ $\\ldots$ phút',
    answer: 'a) $3250$ kg\nb) $0,25$ ha\nc) $4$ giờ $30$ phút',
    solution: 'a) $3 \\times 1000 + 250 = 3250$ kg\nb) $2500 : 10000 = 0,25$ ha\nc) $0,5$ giờ $= 30$ phút, vậy $4$ giờ $30$ phút.',
    grade: 5, topic: 'do_luong', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['đổi đơn vị', 'đo khối lượng', 'đo diện tích'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-16T08:00:00Z', updated_at: '2025-02-16T08:00:00Z',
  },
  {
    id: 'q5-08', question_code: 'BT084', content: 'Một ô tô đi từ A đến B với vận tốc $60$ km/h hết $2$ giờ $30$ phút. Tính quãng đường AB.',
    answer: '$150$ km', solution: '$2$ giờ $30$ phút $= 2,5$ giờ.\n$S = v \\times t = 60 \\times 2,5 = 150$ km.',
    grade: 5, topic: 'do_luong', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['vận tốc', 'quãng đường'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-17T08:00:00Z', updated_at: '2025-02-17T08:00:00Z',
  },
  // === BỔ SUNG CHỦ ĐỀ THIẾU ===
  // Lớp 7 - Đa thức
  {
    id: 'q7-11', question_code: 'BT085', content: 'Thu gọn đa thức: $P(x) = 3x^2 - 2x + 5 + x^2 + 4x - 1$',
    answer: '$P(x) = 4x^2 + 2x + 4$',
    solution: '$P(x) = (3x^2 + x^2) + (-2x + 4x) + (5 - 1) = 4x^2 + 2x + 4$',
    grade: 7, topic: 'da_thuc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['đa thức', 'thu gọn'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2025-02-20T08:00:00Z', updated_at: '2025-02-20T08:00:00Z',
  },
  // Lớp 7 - Tỉ lệ
  {
    id: 'q7-12', question_code: 'BT086', content: 'Biết $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{5}$ và $a + b + c = 30$. Tìm $a, b, c$.',
    answer: '$a = 6, b = 9, c = 15$',
    solution: 'Áp dụng tính chất dãy tỉ số bằng nhau:\n$\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{5} = \\frac{a+b+c}{2+3+5} = \\frac{30}{10} = 3$.\nVậy $a = 6, b = 9, c = 15$.',
    grade: 7, topic: 'ti_le', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['dãy tỉ số bằng nhau'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2025-02-21T08:00:00Z', updated_at: '2025-02-21T08:00:00Z',
  },
  // Lớp 8 - Thống kê
  {
    id: 'q8-11', question_code: 'BT087', content: 'Điểm thi giữa kỳ môn Toán của $20$ học sinh lớp 8:\n\n| Điểm | 4 | 5 | 6 | 7 | 8 | 9 |\n|------|---|---|---|---|---|---|\n| Số HS | 1 | 3 | 5 | 6 | 3 | 2 |\n\na) Tính trung bình cộng.\nb) Tìm mốt.',
    answer: 'a) $\\bar{x} = 6,65$\nb) $M_o = 7$',
    solution: 'a) $\\bar{x} = \\frac{4 \\cdot 1 + 5 \\cdot 3 + 6 \\cdot 5 + 7 \\cdot 6 + 8 \\cdot 3 + 9 \\cdot 2}{20} = \\frac{133}{20} = 6,65$\nb) Mốt = 7 (tần số cao nhất: 6 HS).',
    grade: 8, topic: 'thong_ke', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['trung bình cộng', 'mốt'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2025-02-22T08:00:00Z', updated_at: '2025-02-22T08:00:00Z',
  },
  // Lớp 8 - Xác suất
  {
    id: 'q8-12', question_code: 'BT088', content: 'Gieo hai đồng xu cân đối. Tính xác suất để cả hai đồng xu đều xuất hiện mặt sấp.',
    answer: '$P = \\frac{1}{4}$',
    solution: 'Không gian mẫu: $\\{SS, SN, NS, NN\\}$ có $4$ kết quả.\nBiến cố cần tìm: $\\{SS\\}$ có $1$ kết quả.\n$P = \\frac{1}{4}$.',
    grade: 8, topic: 'xac_suat', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['xác suất', 'gieo đồng xu'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2025-02-23T08:00:00Z', updated_at: '2025-02-23T08:00:00Z',
  },
  // Lớp 9 - Tam giác
  {
    id: 'q9-13', question_code: 'BT089', content: 'Cho $\\triangle ABC$ vuông tại $A$ có $AB = 6$, $AC = 8$. Đường cao $AH$.\n\na) Tính $BH$, $CH$.\nb) Tính $\\sin B$, $\\cos B$, $\\tan B$.',
    answer: 'a) $BH = 3,6$; $CH = 6,4$\nb) $\\sin B = \\frac{4}{5}$; $\\cos B = \\frac{3}{5}$; $\\tan B = \\frac{4}{3}$',
    solution: 'a) $BC = 10$. $BH = \\frac{AB^2}{BC} = \\frac{36}{10} = 3,6$. $CH = 10 - 3,6 = 6,4$.\nb) $\\sin B = \\frac{AC}{BC} = \\frac{8}{10} = \\frac{4}{5}$; $\\cos B = \\frac{AB}{BC} = \\frac{3}{5}$; $\\tan B = \\frac{AC}{AB} = \\frac{4}{3}$.',
    grade: 9, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hệ thức lượng', 'lượng giác'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9-4',
    created_at: '2025-02-24T08:00:00Z', updated_at: '2025-02-24T08:00:00Z',
  },
  // Lớp 6 - Đo lường (topic mới cho lớp 6 - dùng 'khac')
  {
    id: 'q6-19', question_code: 'BT090', content: 'Viết số thích hợp vào chỗ trống:\n\na) $5,3$ km $= \\ldots$ m\nb) $2$ giờ $15$ phút $= \\ldots$ phút\nc) $4500$ g $= \\ldots$ kg',
    answer: 'a) $5300$ m\nb) $135$ phút\nc) $4,5$ kg',
    grade: 6, topic: 'so_thap_phan', difficulty: 'nhan_biet', question_type: 'dien_dap_an',
    tags: ['đổi đơn vị', 'đo lường'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-5',
    created_at: '2025-02-25T08:00:00Z', updated_at: '2025-02-25T08:00:00Z',
  },
  // Lớp 5 - Thống kê
  {
    id: 'q5-09', question_code: 'BT091', content: 'Điểm kiểm tra Toán của $10$ bạn: $7, 8, 5, 9, 6, 8, 7, 10, 6, 8$.\n\na) Tính điểm trung bình.\nb) Bạn nào đạt điểm cao nhất?',
    answer: 'a) Trung bình $= 7,4$ điểm\nb) Điểm cao nhất là $10$',
    solution: 'a) $\\frac{7+8+5+9+6+8+7+10+6+8}{10} = \\frac{74}{10} = 7,4$',
    grade: 5, topic: 'thong_ke', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['trung bình cộng', 'thu thập số liệu'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-5-1',
    created_at: '2025-02-26T08:00:00Z', updated_at: '2025-02-26T08:00:00Z',
  },
];

// Sample exams
const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'exam1', title: 'Đề kiểm tra giữa kỳ I - Toán 9', description: 'Đề kiểm tra 90 phút, đầy đủ tự luận và trắc nghiệm',
    grade: 9, duration: 90, user_id: 'demo-user-001', is_template: true, question_count: 4,
    exam_status: 'approved',
    settings: { school_name: 'THCS Nguyễn Du', exam_type: 'Kiểm tra giữa kỳ', school_year: '2024-2025', subject: 'Toán 9' },
    tags: ['giữa kỳ', 'toán 9'], created_at: '2024-10-20T08:00:00Z', updated_at: '2024-10-20T08:00:00Z',
  },
  {
    id: 'exam2', title: 'Đề ôn tập cuối kỳ - Toán 8', description: 'Đề ôn tập tổng hợp kiến thức kỳ I',
    grade: 8, duration: 60, user_id: 'demo-user-001', is_template: true, question_count: 3,
    exam_status: 'approved',
    settings: { school_name: 'THCS Lê Hồng Phong', exam_type: 'Ôn tập cuối kỳ', school_year: '2024-2025' },
    tags: ['cuối kỳ', 'toán 8'], created_at: '2024-10-21T08:00:00Z', updated_at: '2024-10-21T08:00:00Z',
  },
  {
    id: 'exam3', title: 'Bộ đề thi vào lớp 10 - Đề 1', description: 'Đề thi thử vào 10 theo cấu trúc mới',
    grade: 9, duration: 120, user_id: 'demo-user-001', is_template: true, question_count: 5,
    exam_status: 'approved',
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

export const CATEGORIES: Category[] = [
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
    categories: CATEGORIES,
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
      { id: 'notif-1', user_id: 'demo-user-001', type: 'system', title: '🎉 Chào mừng!', message: 'Chào mừng bạn đến với KhoĐềToán. Bắt đầu tạo bài tập và đề thi ngay!', is_read: false, created_at: new Date().toISOString() },
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
      // Validate: saved data must have questions array
      if (!saved || !Array.isArray(saved.questions)) {
        throw new Error('Invalid demo data format');
      }
      const defaults = getDefaultData();

      // Merge new sample questions: add any SAMPLE questions missing from saved data
      const savedQuestions: Question[] = saved.questions || [];
      const savedIds = new Set(savedQuestions.map((q: Question) => q.id));
      const newQuestions = SAMPLE_QUESTIONS.filter(q => !savedIds.has(q.id));
      if (newQuestions.length > 0) {
        savedQuestions.push(...newQuestions);
      }

      // Same for categories
      const savedCategories: Category[] = saved.categories || [];
      const savedCatIds = new Set(savedCategories.map((c: Category) => c.id));
      const newCats = CATEGORIES.filter(c => !savedCatIds.has(c.id));
      if (newCats.length > 0) {
        savedCategories.push(...newCats);
      }

      // Migrate exams: merge new sample exams + ensure exam_status exists
      const savedExams: Exam[] = (saved.exams || []).map((e: Exam) => ({
        ...e,
        exam_status: e.exam_status || 'personal',
      }));
      const savedExamIds = new Set(savedExams.map((e: Exam) => e.id));
      const newExams = SAMPLE_EXAMS.filter(e => !savedExamIds.has(e.id));
      if (newExams.length > 0) {
        savedExams.push(...newExams);
      }

      const merged: DemoData = {
        questions: savedQuestions,
        exams: savedExams,
        examQuestions: saved.examQuestions || defaults.examQuestions,
        folders: saved.folders || defaults.folders,
        categories: savedCategories,
        favorites: saved.favorites || defaults.favorites,
        savedExams: saved.savedExams || defaults.savedExams,
        likes: saved.likes || defaults.likes,
        reports: saved.reports || defaults.reports,
        notifications: saved.notifications || defaults.notifications,
      };

      // Persist merged data so new items stay
      if (newQuestions.length > 0 || newCats.length > 0 || newExams.length > 0) {
        saveData(merged);
      }
      return merged;
    }
  } catch (err) {
    console.warn('[KhoĐềToán] Corrupted demo data, resetting...', err);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }
  // First load or corrupted data: initialize from defaults
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
      is_template: false, exam_status: e.exam_status || 'personal', tags: e.tags || [],
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

  updateExam(id: string, updates: Partial<Exam>): Exam | null {
    const store = loadData();
    const idx = store.exams.findIndex(e => e.id === id);
    if (idx === -1) return null;
    store.exams[idx] = { ...store.exams[idx], ...updates, updated_at: new Date().toISOString() };
    saveData(store);
    return store.exams[idx];
  },

  /** GV gửi đề lên kho chung → status pending */
  submitExamToShared(examId: string): Exam | null {
    const store = loadData();
    const idx = store.exams.findIndex(e => e.id === examId);
    if (idx === -1) return null;
    store.exams[idx] = {
      ...store.exams[idx],
      exam_status: 'pending',
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    // Notify admin
    store.notifications.push({
      id: genId(), user_id: 'demo-user-001', type: 'system',
      title: '📩 Đề thi mới cần duyệt',
      message: `Đề "${store.exams[idx].title}" được gửi lên kho chung, cần duyệt.`,
      link: `/admin/review-exams`,
      is_read: false, created_at: new Date().toISOString(),
    });
    saveData(store);
    return store.exams[idx];
  },

  /** Admin/Reviewer duyệt hoặc từ chối đề */
  reviewExam(examId: string, action: 'approve' | 'reject', note?: string): Exam | null {
    const store = loadData();
    const idx = store.exams.findIndex(e => e.id === examId);
    if (idx === -1) return null;
    store.exams[idx] = {
      ...store.exams[idx],
      exam_status: action === 'approve' ? 'approved' : 'rejected',
      reviewed_by: DEMO_USER.id,
      review_note: note || (action === 'approve' ? 'Đã duyệt' : 'Không đạt yêu cầu'),
      updated_at: new Date().toISOString(),
    };
    // Notify exam author
    const exam = store.exams[idx];
    store.notifications.push({
      id: genId(), user_id: exam.user_id, type: 'system',
      title: action === 'approve' ? '✅ Đề thi đã được duyệt' : '❌ Đề thi bị từ chối',
      message: action === 'approve'
        ? `Đề "${exam.title}" đã được duyệt và xuất bản lên kho chung.`
        : `Đề "${exam.title}" bị từ chối: ${note || 'Không đạt yêu cầu'}.`,
      link: `/exams/${examId}`,
      is_read: false, created_at: new Date().toISOString(),
    });
    saveData(store);
    return store.exams[idx];
  },

  /** Lấy đề kho chung (đã duyệt) */
  getSharedExams(filter?: { grade?: number; search?: string }): Exam[] {
    let data = loadData().exams.filter(e => e.exam_status === 'approved');
    if (filter?.grade) data = data.filter(e => e.grade === Number(filter.grade));
    if (filter?.search) data = data.filter(e => e.title.toLowerCase().includes(filter.search!.toLowerCase()));
    return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  /** Lấy đề cá nhân của GV */
  getPersonalExams(userId: string, filter?: { grade?: number; search?: string }): Exam[] {
    let data = loadData().exams.filter(e => e.user_id === userId && e.exam_status !== 'approved');
    if (filter?.grade) data = data.filter(e => e.grade === Number(filter.grade));
    if (filter?.search) data = data.filter(e => e.title.toLowerCase().includes(filter.search!.toLowerCase()));
    return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  /** Lấy đề chờ duyệt (admin/reviewer) */
  getPendingExams(): Exam[] {
    return loadData().exams
      .filter(e => e.exam_status === 'pending')
      .sort((a, b) => new Date(b.submitted_at || b.created_at).getTime() - new Date(a.submitted_at || a.created_at).getTime());
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
