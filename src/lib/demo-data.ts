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
  // === TOÁN LỚP 6 - CÁC DẠNG BÀI BỔ SUNG (TẬP 1 & TẬP 2 SGK KNTT) ===
  {
    id: 'kntt-6-bai10-01', question_code: 'BT048', content: 'Tổng (hiệu) sau là số nguyên tố hay hợp số? Giải thích.\na) $A = 3 \\cdot 5 \\cdot 7 \\cdot 9 - 20$\nb) $B = 11 \\cdot 13 \\cdot 17 + 253$',
    answer: 'a) Hợp số; b) Hợp số',
    solution: 'a) Xét $A = 3 \\cdot 5 \\cdot 7 \\cdot 9 - 20$.\nTa thấy: Tích $3 \\cdot 5 \\cdot 7 \\cdot 9$ có chứa thừa số $5$ nên chia hết cho $5$.\nSố $20$ cũng chia hết cho $5$.\nVậy $A \\vdots 5$. Hơn nữa, rõ ràng $A > 5$ nên $A$ có ít nhất 3 ước là $1, 5, A$. Vậy $A$ là hợp số.\n\nb) Xét $B = 11 \\cdot 13 \\cdot 17 + 253$.\nTa thấy $11 \\cdot 13 \\cdot 17 \\vdots 11$ và $253 = 11 \\cdot 23 \\vdots 11$.\nVậy $B \\vdots 11$. Vì $B > 11$ nên $B$ là hợp số.',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['số nguyên tố', 'hợp số', 'bài 10'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-16T08:00:00Z', updated_at: '2024-12-16T08:00:00Z',
  },
  {
    id: 'kntt-6-bai15-01', question_code: 'BT049', content: 'Tính hợp lý biểu thức sau bằng cách áp dụng quy tắc dấu ngoặc:\n$C = (2024 - 15) - (2024 + 85)$',
    answer: '$-100$',
    solution: 'Áp dụng quy tắc bỏ dấu ngoặc có dấu "-" đằng trước:\n$C = 2024 - 15 - 2024 - 85$\nSử dụng tính chất giao hoán và kết hợp:\n$C = (2024 - 2024) - (15 + 85)$\n$C = 0 - 100 = -100$',
    grade: 6, topic: 'so_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['quy tắc dấu ngoặc', 'số nguyên âm', 'bài 15'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-12-17T08:00:00Z', updated_at: '2024-12-17T08:00:00Z',
  },
  {
    id: 'kntt-6-bai18-01', question_code: 'BT050', content: 'Trong hình lục giác đều $ABCDEF$, khẳng định nào sau đây là ĐÚNG?',
    options: [
      {key:'A',value:'Sáu đường chéo chính bằng nhau.'},
      {key:'B',value:'Ba đường chéo chính cắt nhau tại một điểm và điểm đó cách đều sáu đỉnh.'},
      {key:'C',value:'Sáu góc ở sáu đỉnh không bằng nhau.'},
      {key:'D',value:'Chỉ có ba cạnh bằng nhau.'}
    ],
    correct_answer: 'B', answer: 'B', grade: 6, topic: 'hinh_hoc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['lục giác đều', 'bài 18'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-18T08:00:00Z', updated_at: '2024-12-18T08:00:00Z',
  },
  {
    id: 'kntt-6-bai27-01', question_code: 'BT051', content: 'Một siêu thị tổ chức khuyến mãi bán gạo. Buổi sáng bán được $\\frac{2}{5}$ số gạo trong kho. Buổi chiều bán được $\\frac{1}{3}$ số gạo trong kho. Cuối ngày kiểm tra lại thì trong kho còn $160$ kg gạo. Hỏi lúc đầu siêu thị có bao nhiêu ki-lô-gam gạo?',
    answer: '$600$ kg',
    solution: 'Tổng số phần gạo đã bán trong cả ngày là:\n$\\frac{2}{5} + \\frac{1}{3} = \\frac{11}{15}$ (số gạo trong kho)\n\nPhần gạo còn lại tương ứng với phân số:\n$1 - \\frac{11}{15} = \\frac{4}{15}$ (số gạo trong kho)\n\nBiết $\\frac{4}{15}$ số gạo trong kho là $160$ kg. Số gạo ban đầu là:\n$160 : \\frac{4}{15} = 160 \\cdot \\frac{15}{4} = 600$ (kg).\nVậy lúc đầu siêu thị có $600$ kg gạo.',
    grade: 6, topic: 'phan_so', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['hai bài toán về phân số', 'tìm một số biết giá trị phân số', 'bài 27'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-2',
    created_at: '2024-12-19T08:00:00Z', updated_at: '2024-12-19T08:00:00Z',
  },
  {
    id: 'kntt-6-bai31-01', question_code: 'BT052', content: 'Nhân dịp khai trương, một cửa hàng quần áo giảm giá $20\\%$ cho tất cả các mặt hàng. Bạn An mua một chiếc áo sơ mi và phải trả $240.000$ đồng. Hỏi giá niêm yết ban đầu của chiếc áo đó là bao nhiêu?',
    answer: '$300.000$ đồng',
    solution: 'Vì cửa hàng giảm giá $20\\%$ nên số tiền bạn An phải trả chiếm:\n$100\\% - 20\\% = 80\\%$ (giá niêm yết ban đầu)\n\nBiết $80\\%$ giá niêm yết là $240.000$ đồng. Giá niêm yết ban đầu của chiếc áo là:\n$240.000 : 80\\% = 240.000 : \\frac{80}{100} = 300.000$ (đồng).\nVậy giá ban đầu là $300.000$ đồng.',
    grade: 6, topic: 'so_thap_phan', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tỉ số phần trăm', 'toán thực tế giảm giá', 'bài 31'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-5',
    created_at: '2024-12-20T08:00:00Z', updated_at: '2024-12-20T08:00:00Z',
  },
  {
    id: 'kntt-6-bai35-01', question_code: 'BT053', content: 'Cho đoạn thẳng $AB = 10$ cm. Gọi $M$ là trung điểm của $AB$, và $N$ là trung điểm của $AM$. Tính độ dài đoạn thẳng $NB$.',
    answer: '$NB = 7{,}5$ cm',
    solution: 'Vì $M$ là trung điểm của $AB$ nên:\n$AM = MB = \\frac{AB}{2} = \\frac{10}{2} = 5$ cm.\nVì $N$ là trung điểm của $AM$ nên:\n$AN = NM = \\frac{AM}{2} = \\frac{5}{2} = 2,5$ cm.\nĐiểm $M$ nằm giữa $N$ và $B$ nên độ dài đoạn $NB$ là:\n$NB = NM + MB = 2,5 + 5 = 7,5$ cm.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['trung điểm', 'đoạn thẳng', 'bài 35'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-21T08:00:00Z', updated_at: '2024-12-21T08:00:00Z',
  },
  {
    id: 'kntt-6-bai37-01', question_code: 'BT054', content: 'Lúc 3 giờ đúng, góc tạo bởi kim giờ và kim phút trên mặt đồng hồ là bao nhiêu độ?',
    options: [{key:'A',value:'$30°$'},{key:'B',value:'$60°$'},{key:'C',value:'$90°$'},{key:'D',value:'$180°$'}],
    correct_answer: 'C', answer: 'C', grade: 6, topic: 'hinh_hoc', difficulty: 'nhan_biet', question_type: 'trac_nghiem',
    tags: ['số đo góc', 'đồng hồ', 'bài 37'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-22T08:00:00Z', updated_at: '2024-12-22T08:00:00Z',
  },
  {
    id: 'kntt-6-bai43-01', question_code: 'BT055', content: 'Bạn Bình gieo một con xúc xắc $50$ lần và ghi lại kết quả số chấm xuất hiện. Kết quả bạn thu được như sau:\n\n| Số chấm | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Số lần xuất hiện | 8 | 9 | 7 | 10 | 11 | 5 |\n\nTính xác suất thực nghiệm của sự kiện "Gieo được mặt có số chấm chẵn".',
    answer: '$\\frac{12}{25}$ hoặc $0{,}48$',
    solution: 'Các mặt có số chấm chẵn là: $2, 4, 6$.\nTổng số lần xuất hiện mặt chẵn trong $50$ lần gieo là:\n$n = 9 + 10 + 5 = 24$ (lần).\n\nXác suất thực nghiệm của sự kiện "Gieo được mặt có số chấm chẵn" là:\n$P = \\frac{24}{50} = \\frac{12}{25} = 0,48 = 48\\%$.',
    grade: 6, topic: 'xac_suat', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['xác suất thực nghiệm', 'gieo xúc xắc', 'bài 43'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-7',
    created_at: '2024-12-23T08:00:00Z', updated_at: '2024-12-23T08:00:00Z',
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
  // === BỔ SUNG CÁC BÀI TOÁN TỪ FILE TÀI LIỆU ƯC-BC CỦA GV ===
  {
    id: 'kntt-6-ucln-01', question_code: 'BT064', content: 'Bệnh viện A đã huy động $45$ bác sĩ và $105$ y tá để chia thành các tổ y tế dự phòng phòng chống dịch. Việc chia tổ cần đảm bảo sao cho số bác sĩ được chia đều vào các tổ và số y tá cũng được chia đều. Hỏi có thể chia số bác sĩ và y tá đó nhiều nhất thành mấy tổ công tác? Khi đó, mỗi tổ công tác có bao nhiêu bác sĩ và bao nhiêu y tá?',
    answer: 'Chia nhiều nhất $15$ tổ. Mỗi tổ $3$ bác sĩ, $7$ y tá.',
    solution: 'Gọi số tổ chia được nhiều nhất là $x$ ($x \\in \\mathbb{N}^*$).\nĐể chia đều bác sĩ và y tá vào số tổ nhiều nhất thì $x$ chính là Ước chung lớn nhất của $45$ và $105$.\nPhân tích ra thừa số nguyên tố:\n$45 = 3^2 \\cdot 5$\n$105 = 3 \\cdot 5 \\cdot 7$\n$\\Rightarrow x = \\text{ƯCLN}(45, 105) = 3 \\cdot 5 = 15$.\nVậy có thể chia nhiều nhất $15$ tổ công tác.\nMỗi tổ có:\nSố bác sĩ: $45 : 15 = 3$ (người)\nSố y tá: $105 : 15 = 7$ (người).',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['ước chung lớn nhất', 'bài toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T08:30:00Z', updated_at: '2024-12-31T08:30:00Z',
  },
  {
    id: 'kntt-6-ucnc-02', question_code: 'BT065', content: 'Chứng minh rằng với mọi số tự nhiên $n \\in \\mathbb{N}$, hai số $n$ và $n+1$ là hai số nguyên tố cùng nhau.',
    answer: 'Chứng minh bằng phản chứng hoặc dùng tính chất Ước chung',
    solution: 'Gọi $d$ là Ước chung lớn nhất của $n$ và $n+1$, ta kí hiệu $d = \\text{ƯCLN}(n, n+1)$ ($d \\in \\mathbb{N}^*$).\nKhi đó ta có: $n \\vdots d$ và $(n+1) \\vdots d$.\nTheo tính chất chia hết của một hiệu, ta suy ra:\n$[(n+1) - n] \\vdots d$\n$\\Rightarrow 1 \\vdots d$\nVì $d \\in \\mathbb{N}^*$ nên $d$ chỉ có thể bằng $1$.\nVậy $\\text{ƯCLN}(n, n+1) = 1$. Suy ra hai số tự nhiên liên tiếp $n$ và $n+1$ luôn là hai số nguyên tố cùng nhau với mọi $n$.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['số nguyên tố cùng nhau', 'chứng minh chia hết'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T08:45:00Z', updated_at: '2024-12-31T08:45:00Z',
  },
  // === BỔ SUNG CÁC BÀI TOÁN HÌNH HỌC PHẲNG (TỪ FILE TÀI LIỆU CỦA GV) ===
  {
    id: 'kntt-6-hinh-01', question_code: 'BT066', content: 'Sân nhà bạn Khôi có dạng hình chữ nhật với chiều dài $12$m, chiều rộng bằng một nửa chiều dài.\n\na) Tính diện tích sân nhà bạn Khôi.\nb) Bố Khôi mua loại gạch lát nền hình chữ nhật có chiều dài $40$cm, chiều rộng $30$cm để lát sân. Hỏi cần dùng bao nhiêu viên gạch để lát kín sân nhà Khôi? (Biết phần mạch vữa là không đáng kể).\nc) Gạch không bán lẻ mà chỉ bán nguyên thùng. Biết rằng mỗi thùng có $10$ viên gạch. Hỏi bố Khôi cần mua ít nhất bao nhiêu thùng gạch để lát đủ sân?',
    answer: 'a) $72\\text{m}^2$; b) $600$ viên gạch; c) $60$ thùng gạch',
    solution: 'a) Chiều rộng sân nhà Khôi là: $12 : 2 = 6$ (m).\nDiện tích sân nhà Khôi là: $S = 12 \\cdot 6 = 72 \\ (\\text{m}^2)$.\n\nb) Diện tích 1 viên gạch lát nền là:\n$40 \\cdot 30 = 1200 \\ (\\text{cm}^2)$.\nĐổi $72 \\text{m}^2 = 720\\,000 \\text{cm}^2$.\nSố viên gạch cần dùng để lát kín sân là:\n$720\\,000 : 1200 = 600$ (viên gạch).\n\nc) Số thùng gạch cần mua là:\n$600 : 10 = 60$ (thùng gạch).',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hình chữ nhật', 'diện tích', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-31T09:00:00Z', updated_at: '2024-12-31T09:00:00Z',
  },
  {
    id: 'kntt-6-hinh-02', question_code: 'BT067', content: '[Cần chèn hình vẽ tại đây]\n\nMột con đường hình bình hành EBGF cắt ngang qua một đám đất hình chữ nhật ABCD với các dữ liệu được cho trên hình vẽ. Biết $AB = 50$m, $BC = 30$m, chiều rộng con đường (cạnh $BG$) bằng $4$m.\n\nHãy tính diện tích phần con đường EBGF và tổng diện tích phần còn lại của đám đất.',
    answer: 'Diện tích con đường: $120\\text{m}^2$; Diện tích phần còn lại: $1380\\text{m}^2$',
    solution: 'Dựa vào hình vẽ, con đường EBGF có dạng hình bình hành với cạnh đáy $BG = 4$m và chiều cao tương ứng với cạnh đáy này chính là chiều rộng của hình chữ nhật $BC = 30$m.\nDiện tích con đường hình bình hành EBGF là:\n$S_1 = 4 \\cdot 30 = 120 \\ (\\text{m}^2)$.\n\nDiện tích toàn bộ đám đất hình chữ nhật ABCD là:\n$S = 50 \\cdot 30 = 1500 \\ (\\text{m}^2)$.\n\nDiện tích phần còn lại của đám đất là:\n$S_2 = 1500 - 120 = 1380 \\ (\\text{m}^2)$.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['hình chữ nhật', 'hình bình hành', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-31T09:15:00Z', updated_at: '2024-12-31T09:15:00Z',
  },
  {
    id: 'kntt-6-hinh-03', question_code: 'BT068', content: 'Một mảnh vườn hình thoi có tổng độ dài hai đường chéo bằng $42$m. Biết đường chéo thứ nhất dài hơn đường chéo thứ hai là $6$m.\n\na) Tìm độ dài mỗi đường chéo của mảnh vườn.\nb) Tính diện tích của mảnh vườn hình thoi đó.',
    answer: 'a) $24$m và $18$m; b) $216\\text{m}^2$',
    solution: 'a) Áp dụng bài toán tìm hai số khi biết tổng và hiệu:\nĐộ dài đường chéo thứ nhất (đường chéo lớn) là:\n$(42 + 6) : 2 = 24$ (m).\nĐộ dài đường chéo thứ hai (đường chéo nhỏ) là:\n$24 - 6 = 18$ (m).\n\nb) Diện tích mảnh vườn hình thoi là:\n$S = \\frac{1}{2} \\cdot 24 \\cdot 18 = 216 \\ (\\text{m}^2)$.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hình thoi', 'diện tích', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-31T09:30:00Z', updated_at: '2024-12-31T09:30:00Z',
  },
  // === BỔ SUNG CÁC BÀI TOÁN PHÂN SỐ VÀ THỐNG KÊ (HỌC KÌ 2 - LỚP 6) ===
  {
    id: 'kntt-6-ps-01', question_code: 'BT069', content: 'Một người mang cam đi chợ bán. Người thứ nhất mua $\\frac{1}{2}$ số cam và $1$ quả. Người thứ hai mua $\\frac{1}{2}$ số cam còn lại và $1$ quả. Người thứ ba mua $\\frac{1}{2}$ số cam còn lại và $1$ quả thì vừa hết. Tính tổng số cam người đó mang đi bán.',
    answer: '$14$ quả cam',
    solution: 'Giải bài toán bằng phương pháp tính ngược từ cuối:\n- Sau khi người thứ hai mua, số cam còn lại là số cam người thứ ba mua. Người thứ ba mua $\\frac{1}{2}$ số cam còn lại và $1$ quả thì vừa hết. Vậy $\\frac{1}{2}$ số cam còn lại là $1$ quả $\\Rightarrow$ Trước khi người thứ ba mua, có $1 \\cdot 2 = 2$ (quả).\n- Trước khi người thứ hai mua, người này mua $\\frac{1}{2}$ số cam hiện có và $1$ quả, còn lại $2$ quả. Vậy $\\frac{1}{2}$ số cam khi đó là $2 + 1 = 3$ (quả) $\\Rightarrow$ Trước khi người thứ hai mua có $3 \\cdot 2 = 6$ (quả).\n- Người thứ nhất mua $\\frac{1}{2}$ số cam ban đầu và $1$ quả, còn lại $6$ quả. Vậy $\\frac{1}{2}$ số cam ban đầu là $6 + 1 = 7$ (quả) $\\Rightarrow$ Tổng số cam mang đi bán là $7 \\cdot 2 = 14$ (quả).',
    grade: 6, topic: 'phan_so', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['phân số', 'tính ngược từ cuối', 'học sinh giỏi'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-12-31T10:00:00Z', updated_at: '2024-12-31T10:00:00Z',
  },
  {
    id: 'kntt-6-ps-02', question_code: 'BT070', content: 'Trong tháng vừa rồi, mẹ bạn Trân dự định dùng $2$ triệu đồng để chi trả các khoản tiền điện, tiền nước và truyền hình cáp. Biết tiền điện chiếm $70\\%$ tổng số tiền, tiền nước chiếm $\\frac{1}{3}$ số tiền còn lại.\n\na) Tính số tiền điện và tiền nước mẹ Trân phải trả.\nb) Với tổng số tiền dự định ban đầu, mẹ bạn Trân có đủ trả tiền truyền hình cáp là $100\\,000$ đồng không? Vì sao?',
    answer: 'a) Tiền điện: $1\\,400\\,000$đ; Tiền nước: $200\\,000$đ. b) Đủ trả, vì còn dư $400\\,000$đ.',
    solution: 'a) Số tiền điện phải trả là:\n$2\\,000\\,000 \\cdot 70\\% = 1\\,400\\,000$ (đồng).\nSố tiền còn lại sau khi trả tiền điện là:\n$2\\,000\\,000 - 1\\,400\\,000 = 600\\,000$ (đồng).\nSố tiền nước phải trả là:\n$600\\,000 \\cdot \\frac{1}{3} = 200\\,000$ (đồng).\n\nb) Tổng số tiền mẹ Trân còn lại sau khi trả tiền điện và nước là:\n$600\\,000 - 200\\,000 = 400\\,000$ (đồng).\nVì $400\\,000$ đồng $> 100\\,000$ đồng, nên mẹ bạn Trân hoàn toàn đủ tiền để trả cước truyền hình cáp.',
    grade: 6, topic: 'phan_so', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tỉ số phần trăm', 'phân số', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-12-31T10:15:00Z', updated_at: '2024-12-31T10:15:00Z',
  },
  {
    id: 'kntt-6-tk-01', question_code: 'BT071', content: '[Cần chèn hình vẽ tại đây]\n\nĐọc biểu đồ cột kép diễn tả số lượng Điện thoại và Tivi của một cửa hàng bán được trong 5 tháng đầu năm (tháng 1, 2, 3, 4, 5). Biết rằng tổng số điện thoại bán được trong 5 tháng là $450$ chiếc và tổng số tivi là $320$ chiếc.\n\nNếu trung bình mỗi chiếc điện thoại bán ra cửa hàng được lãi $1\\,500\\,000$ đồng và một chiếc tivi bán ra được lãi $2\\,000\\,000$ đồng. Hỏi sau năm tháng đầu năm, cửa hàng trên thu được tổng số tiền lãi là bao nhiêu?',
    answer: '$1\\,315\\,000\\,000$ đồng',
    solution: 'Dựa vào dữ kiện bài toán:\nTổng tiền lãi từ việc bán điện thoại là:\n$450 \\cdot 1\\,500\\,000 = 675\\,000\\,000$ (đồng).\n\nTổng tiền lãi từ việc bán Tivi là:\n$320 \\cdot 2\\,000\\,000 = 640\\,000\\,000$ (đồng).\n\nTổng số tiền lãi cửa hàng thu được sau năm tháng là:\n$675\\,000\\,000 + 640\\,000\\,000 = 1\\,315\\,000\\,000$ (đồng).',
    grade: 6, topic: 'thong_ke', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['thống kê', 'biểu đồ cột kép', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-5',
    created_at: '2024-12-31T10:30:00Z', updated_at: '2024-12-31T10:30:00Z',
  },
  {
    id: 'kntt-6-stp-01', question_code: 'BT072', content: 'Mức tiêu thụ nhiên liệu của một chiếc xe máy là $1{,}6$ lít xăng trên $100$ kilômét. Giá một lít xăng RON 95 hiện nay là $21\\,500$ đồng. Một người đi xe máy đó trên quãng đường $150$ km thì sẽ tốn hết bao nhiêu tiền xăng?',
    answer: '$51\\,600$ đồng',
    solution: 'Số lít xăng xe máy tiêu thụ để đi được quãng đường $150$ km là:\n$(150 : 100) \\cdot 1{,}6 = 1{,}5 \\cdot 1{,}6 = 2{,}4$ (lít).\nSố tiền xăng người đó phải trả là:\n$2{,}4 \\cdot 21\\,500 = 51\\,600$ (đồng).',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['số thập phân', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-12-31T10:45:00Z', updated_at: '2024-12-31T10:45:00Z',
  },
  {
    id: 'kntt-6-stp-02', question_code: 'BT073', content: 'Mỗi chai nước ngọt chứa $1{,}5$ lít và mỗi lít nước ngọt nặng $1{,}05$ kg. Biết rằng mỗi vỏ chai rỗng nặng $0{,}15$ kg. Hỏi một thùng gồm $24$ chai nước ngọt như vậy cân nặng tất cả bao nhiêu ki-lô-gam?',
    answer: '$41{,}4$ kg',
    solution: 'Cân nặng của lượng nước ngọt bên trong một chai là:\n$1{,}5 \\cdot 1{,}05 = 1{,}575$ (kg).\nCân nặng của một chai nước ngọt (gồm cả vỏ và nước) là:\n$1{,}575 + 0{,}15 = 1{,}725$ (kg).\nCân nặng của $24$ chai nước ngọt (1 thùng) là:\n$1{,}725 \\cdot 24 = 41{,}4$ (kg).',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['số thập phân', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-3',
    created_at: '2024-12-31T11:00:00Z', updated_at: '2024-12-31T11:00:00Z',
  },
  {
    id: 'kntt-6-xs-01', question_code: 'BT074', content: 'Bạn Minh gieo một con xúc xắc $100$ lần liên tiếp và ghi lại số chấm xuất hiện ở mỗi lần gieo, thu được kết quả như bảng sau:\n\n| Mặt | 1 chấm | 2 chấm | 3 chấm | 4 chấm | 5 chấm | 6 chấm |\n|---|---|---|---|---|---|---|\n| Số lần xuất hiện | 15 | 20 | 18 | 22 | 10 | 15 |\n\na) Hãy tính xác suất thực nghiệm của sự kiện "Gieo được mặt có số chấm chia hết cho 3".\nb) Hãy tính xác suất thực nghiệm của sự kiện "Gieo được mặt có số chấm chia cho 3 dư 1".',
    answer: 'a) $\\frac{33}{100}$ hay $33\\%$; b) $\\frac{37}{100}$ hay $37\\%$',
    solution: 'Tổng số lần gieo là $100$ lần.\na) Các mặt có số chấm chia hết cho $3$ là: mặt $3$ chấm và mặt $6$ chấm.\nSố lần xuất hiện mặt $3$ chấm hoặc $6$ chấm là: $18 + 15 = 33$ (lần).\nXác suất thực nghiệm của sự kiện này là: $\\frac{33}{100} = 33\\%$.\n\nb) Các mặt có số chấm chia cho $3$ dư $1$ là: mặt $1$ chấm và mặt $4$ chấm.\nSố lần xuất hiện mặt $1$ chấm hoặc $4$ chấm là: $15 + 22 = 37$ (lần).\nXác suất thực nghiệm của sự kiện này là: $\\frac{37}{100} = 37\\%$.',
    grade: 6, topic: 'thong_ke', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['xác suất thực nghiệm', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-6',
    created_at: '2024-12-31T11:15:00Z', updated_at: '2024-12-31T11:15:00Z',
  },
  // === BỔ SUNG CÁC BÀI TOÁN NÂNG CAO LUỸ THỪA VÀ ĐỐI XỨNG ===
  {
    id: 'kntt-6-lt-01', question_code: 'BT075', content: 'Tìm chữ số tận cùng của các luỹ thừa sau:\n\na) $7^{2024}$\nb) $3^{2023}$',
    answer: 'a) Chữ số tận cùng là $1$; b) Chữ số tận cùng là $7$',
    solution: 'a) Tìm chữ số tận cùng của $7^{2024}$:\nTa thấy các luỹ thừa của $7$ có chữ số tận cùng lặp lại theo chu kì $4$: $7, 9, 3, 1$.\nTa có: $2024 = 4 \\cdot 506$ (chia hết cho $4$).\nDo đó, chữ số tận cùng của $7^{2024}$ cũng giống như chữ số tận cùng của $7^4$, tức là số $1$.\n\nb) Tìm chữ số tận cùng của $3^{2023}$:\nCác luỹ thừa của $3$ có chữ số tận cùng lặp lại theo chu kì $4$: $3, 9, 7, 1$.\nTa có: $2023 = 4 \\cdot 505 + 3$ (chia cho $4$ dư $3$).\nDo đó, chữ số tận cùng của $3^{2023}$ cũng giống như chữ số tận cùng của $3^3$, tức là số $7$.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['lũy thừa', 'chữ số tận cùng', 'học sinh giỏi'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T11:30:00Z', updated_at: '2024-12-31T11:30:00Z',
  },
  {
    id: 'kntt-6-ch-01', question_code: 'BT076', content: 'Cho tổng $S = 2 + 2^2 + 2^3 + 2^4 + \\dots + 2^{60}$. Chứng tỏ rằng $S$ chia hết cho $3$, cho $7$ và cho $15$.',
    answer: 'Sử dụng phương pháp nhóm các số hạng',
    solution: '*) Chứng minh $S$ chia hết cho $3$:\nNhóm 2 số hạng liên tiếp với nhau: $S = (2 + 2^2) + (2^3 + 2^4) + \\dots + (2^{59} + 2^{60})$\n$S = 2(1 + 2) + 2^3(1 + 2) + \\dots + 2^{59}(1 + 2)$\n$S = 2 \\cdot 3 + 2^3 \\cdot 3 + \\dots + 2^{59} \\cdot 3$\n$S = 3(2 + 2^3 + \\dots + 2^{59})$ $\\vdots$ $3$.\n\n*) Chứng minh $S$ chia hết cho $7$:\nNhóm 3 số hạng liên tiếp: $S = (2 + 2^2 + 2^3) + \\dots + (2^{58} + 2^{59} + 2^{60})$\n$S = 2(1 + 2 + 4) + \\dots + 2^{58}(1 + 2 + 4)$\n$S = 2 \\cdot 7 + \\dots + 2^{58} \\cdot 7$ $\\vdots$ $7$.\n\n*) Chứng minh $S$ chia hết cho $15$:\nNhóm 4 số hạng liên tiếp: $S = (2 + 2^2 + 2^3 + 2^4) + \\dots$\n$S = 2(1 + 2 + 4 + 8) + \\dots = 2 \\cdot 15 + \\dots$ $\\vdots$ $15$.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['chia hết', 'lũy thừa', 'học sinh giỏi'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T11:45:00Z', updated_at: '2024-12-31T11:45:00Z',
  },
  {
    id: 'kntt-6-dx-01', question_code: 'BT077', content: 'Cho hình thoi $ABCD$ có cạnh bằng $5$cm và có tâm đối xứng $O$. Biết khoảng cách từ tâm $O$ đến các đỉnh $A$ và $B$ lần lượt là $OA = 3$cm, $OB = 4$cm.\n\na) Tính diện tích hình thoi $ABCD$.\nb) Dựa vào tính chất tâm đối xứng, hãy so sánh chu vi và diện tích của hai tam giác $OAB$ và tam giác $OCD$.',
    answer: 'a) $24\\text{cm}^2$; b) Chu vi và diện tích bằng nhau',
    solution: 'a) Tâm đối xứng $O$ của hình thoi chính là giao điểm của hai đường chéo $AC$ và $BD$.\nDo đó, $OA = OC = 3$cm $\\Rightarrow AC = 6$cm.\n$OB = OD = 4$cm $\\Rightarrow BD = 8$cm.\nDiện tích hình thoi $ABCD$ là: $S = \\frac{1}{2} \\cdot AC \\cdot BD = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24 \\ (\\text{cm}^2)$.\n\nb) Vì $O$ là tâm đối xứng của hình thoi $ABCD$, nên qua tâm đối xứng $O$:\nĐiểm $A$ đối xứng với điểm $C$.\nĐiểm $B$ đối xứng với điểm $D$.\nSuy ra tam giác $OCD$ chính là hình đối xứng của tam giác $OAB$ qua tâm $O$.\nDo hai hình đối xứng qua tâm luôn bằng nhau nên chu vi và diện tích của tam giác $OAB$ bằng chu vi và diện tích của tam giác $OCD$.',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tâm đối xứng', 'hình thoi', 'diện tích'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-31T12:00:00Z', updated_at: '2024-12-31T12:00:00Z',
  },
  // === BỔ SUNG BÀI TẬP RÈN LUYỆN (TỰ SINH TƯƠNG TỰ TÀI LIỆU) ===
  {
    id: 'kntt-6-dhch-01', question_code: 'BT078', content: 'Tìm các chữ số $x, y$ để số $\\overline{5x7y}$ đồng thời chia hết cho $2, 3, 5$ và $9$.',
    answer: '$x = 6; y = 0$',
    solution: 'Để số $\\overline{5x7y}$ chia hết cho cả $2$ và $5$ thì chữ số tận cùng $y$ bắt buộc phải bằng $0$.\nThay $y = 0$, ta được số $\\overline{5x70}$.\nĐể số $\\overline{5x70}$ chia hết cho $9$ (khi đó sẽ chia hết cho $3$) thì tổng các chữ số phải chia hết cho $9$.\nTa có: $(5 + x + 7 + 0)$ $\\vdots$ $9 \\Rightarrow (12 + x)$ $\\vdots$ $9$.\nVì $x$ là chữ số nên $0 \\le x \\le 9 \\Rightarrow 12 \\le 12 + x \\le 21$.\nTrong khoảng từ $12$ đến $21$, chỉ có số $18$ là chia hết cho $9$.\nSuy ra: $12 + x = 18 \\Rightarrow x = 6$.\nVậy $x = 6; y = 0$, ta được số $5670$.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['dấu hiệu chia hết', 'tìm chữ số'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T13:00:00Z', updated_at: '2024-12-31T13:00:00Z',
  },
  {
    id: 'kntt-6-hinh-04', question_code: 'BT079', content: 'Một bác nông dân có một khu vườn hình thang với đáy bé dài $20$m, đáy lớn dài gấp rưỡi đáy bé. Chiều cao của hình thang bằng độ dài đáy bé.\n\na) Tính diện tích khu vườn.\nb) Bác nông dân dự định trồng hoa hồng trên khu vườn này, biết cứ $2\\text{m}^2$ sẽ trồng được $5$ khóm hoa. Hỏi bác có thể trồng tối đa bao nhiêu khóm hoa trên khu vườn đó?',
    answer: 'a) $500\\text{m}^2$; b) $1250$ khóm hoa',
    solution: 'a) Độ dài đáy lớn của khu vườn hình thang là: $20 \\cdot 1{,}5 = 30$ (m).\nChiều cao của khu vườn hình thang là: $20$ (m).\nDiện tích khu vườn hình thang là:\n$S = \\frac{(20 + 30) \\cdot 20}{2} = \\frac{50 \\cdot 20}{2} = 500 \\ (\\text{m}^2)$.\n\nb) Số khóm hoa bác nông dân có thể trồng được là:\n$(500 : 2) \\cdot 5 = 250 \\cdot 5 = 1250$ (khóm hoa).',
    grade: 6, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hình thang', 'diện tích', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-4',
    created_at: '2024-12-31T13:15:00Z', updated_at: '2024-12-31T13:15:00Z',
  },
  {
    id: 'kntt-6-ucln-02', question_code: 'BT080', content: 'Học sinh khối 6 của một trường THCS có số lượng trong khoảng từ $300$ đến $400$ em. Trong buổi chào cờ, nếu xếp hàng $12$, hàng $15$ hoặc hàng $18$ thì đều dư $5$ em. Hỏi khối 6 của trường đó có chính xác bao nhiêu học sinh?',
    answer: '$365$ học sinh',
    solution: 'Gọi số học sinh khối 6 là $x$ ($x \\in \\mathbb{N}^*$, $300 \\le x \\le 400$).\nVì khi xếp hàng $12, 15, 18$ đều dư $5$ nên $(x - 5)$ sẽ chia hết cho cả $12, 15$ và $18$.\nSuy ra $(x - 5) \\in \\text{BC}(12, 15, 18)$.\nTa có:\n$12 = 2^2 \\cdot 3$\n$15 = 3 \\cdot 5$\n$18 = 2 \\cdot 3^2$\n$\\Rightarrow \\text{BCNN}(12, 15, 18) = 2^2 \\cdot 3^2 \\cdot 5 = 4 \\cdot 9 \\cdot 5 = 180$.\n$\\Rightarrow (x - 5) \\in \\{180; 360; 540; \\dots\\}$\n$\\Rightarrow x \\in \\{185; 365; 545; \\dots\\}$.\nVì $300 \\le x \\le 400$ nên $x = 365$.\nVậy khối 6 của trường đó có $365$ học sinh.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['bội chung nhỏ nhất', 'bài toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T13:30:00Z', updated_at: '2024-12-31T13:30:00Z',
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
  // === BỔ SUNG CÁC BÀI TOÁN TỪ FILE TÀI LIỆU LỚP 7 CỦA GV ===
  {
    id: 'kntt-7-tl-01', question_code: 'BT081', content: 'Hai lớp 7A và 7B đi lao động trồng cây. Biết rằng tỉ số giữa số cây trồng được của lớp 7A và lớp 7B là $\\frac{4}{5}$ và lớp 7B trồng nhiều hơn lớp 7A là $20$ cây. Tính số cây mỗi lớp đã trồng.',
    answer: 'Lớp 7A trồng $80$ cây, Lớp 7B trồng $100$ cây',
    solution: 'Gọi số cây lớp 7A và lớp 7B trồng được lần lượt là $x$ và $y$ ($x, y \\in \\mathbb{N}^*$).\nTheo đề bài, tỉ số số cây của lớp 7A và 7B là $\\frac{4}{5}$, ta có: $\\frac{x}{y} = \\frac{4}{5} \\Rightarrow \\frac{x}{4} = \\frac{y}{5}$.\nLớp 7B trồng nhiều hơn 7A là $20$ cây, ta có: $y - x = 20$.\nÁp dụng tính chất của dãy tỉ số bằng nhau:\n$\\frac{x}{4} = \\frac{y}{5} = \\frac{y - x}{5 - 4} = \\frac{20}{1} = 20$.\nSuy ra:\n$x = 20 \\cdot 4 = 80$ (cây)\n$y = 20 \\cdot 5 = 100$ (cây)\nVậy lớp 7A trồng được $80$ cây, lớp 7B trồng được $100$ cây.',
    grade: 7, topic: 'ti_le', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tỉ lệ thức', 'dãy tỉ số bằng nhau', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T14:00:00Z', updated_at: '2024-12-31T14:00:00Z',
  },
  {
    id: 'kntt-7-tl-02', question_code: 'BT082', content: 'Đồng bạch là một loại hợp kim gồm niken, kẽm và đồng. Khối lượng của ba chất này trong hợp kim lần lượt tỉ lệ với các số $3; 4; 13$. Hỏi cần bao nhiêu kilôgam niken, kẽm và đồng để sản xuất được $150$kg đồng bạch?',
    answer: 'Niken: $22{,}5$kg; Kẽm: $30$kg; Đồng: $97{,}5$kg',
    solution: 'Gọi khối lượng niken, kẽm, đồng cần dùng lần lượt là $x, y, z$ (kg) ($x, y, z > 0$).\nVì khối lượng của ba chất lần lượt tỉ lệ với $3; 4; 13$ nên ta có:\n$\\frac{x}{3} = \\frac{y}{4} = \\frac{z}{13}$.\nTổng khối lượng hợp kim là $150$kg, do đó $x + y + z = 150$.\nÁp dụng tính chất của dãy tỉ số bằng nhau:\n$\\frac{x}{3} = \\frac{y}{4} = \\frac{z}{13} = \\frac{x + y + z}{3 + 4 + 13} = \\frac{150}{20} = 7{,}5$.\nSuy ra:\n$x = 7{,}5 \\cdot 3 = 22{,}5$ (kg)\n$y = 7{,}5 \\cdot 4 = 30$ (kg)\n$z = 7{,}5 \\cdot 13 = 97{,}5$ (kg)\nVậy cần $22{,}5$kg niken, $30$kg kẽm và $97{,}5$kg đồng.',
    grade: 7, topic: 'ti_le', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['đại lượng tỉ lệ thuận', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T14:15:00Z', updated_at: '2024-12-31T14:15:00Z',
  },
  {
    id: 'kntt-7-tl-03', question_code: 'BT083', content: 'Cho tam giác $ABC$ có số đo các góc $\\widehat{A}, \\widehat{B}, \\widehat{C}$ lần lượt tỉ lệ với $1; 2; 3$. Tính số đo các góc của tam giác $ABC$.',
    answer: '$\\widehat{A} = 30^\\circ$, $\\widehat{B} = 60^\\circ$, $\\widehat{C} = 90^\\circ$',
    solution: 'Gọi số đo các góc $\\widehat{A}, \\widehat{B}, \\widehat{C}$ của tam giác $ABC$ lần lượt là $A, B, C$ (độ) ($A, B, C > 0$).\nVì số đo các góc tỉ lệ với $1; 2; 3$ nên ta có:\n$\\frac{A}{1} = \\frac{B}{2} = \\frac{C}{3}$.\nTheo định lý tổng ba góc của một tam giác, ta có: $A + B + C = 180^\\circ$.\nÁp dụng tính chất của dãy tỉ số bằng nhau:\n$\\frac{A}{1} = \\frac{B}{2} = \\frac{C}{3} = \\frac{A + B + C}{1 + 2 + 3} = \\frac{180^\\circ}{6} = 30^\\circ$.\nSuy ra:\n$A = 30^\\circ \\cdot 1 = 30^\\circ$\n$B = 30^\\circ \\cdot 2 = 60^\\circ$\n$C = 30^\\circ \\cdot 3 = 90^\\circ$\nVậy tam giác $ABC$ là tam giác vuông tại $C$, với các góc là $30^\\circ, 60^\\circ, 90^\\circ$.',
    grade: 7, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tỉ lệ thức', 'góc trong tam giác', 'hình học'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T14:30:00Z', updated_at: '2024-12-31T14:30:00Z',
  },
  {
    id: 'kntt-7-tln-01', question_code: 'BT084', content: 'Chia số $235$ thành $3$ phần tỉ lệ nghịch với $3; 4$ và $5$. Tìm ba phần đó.',
    answer: '$100; 75; 60$',
    solution: 'Gọi ba phần cần tìm lần lượt là $x, y, z$ ($x, y, z > 0$). Theo đề bài ta có $x + y + z = 235$.\nVì $x, y, z$ tỉ lệ nghịch với $3; 4; 5$ nên ta có:\n$3x = 4y = 5z \\Rightarrow \\frac{x}{\\frac{1}{3}} = \\frac{y}{\\frac{1}{4}} = \\frac{z}{\\frac{1}{5}}$.\nÁp dụng tính chất dãy tỉ số bằng nhau, ta có:\n$\\frac{x}{\\frac{1}{3}} = \\frac{y}{\\frac{1}{4}} = \\frac{z}{\\frac{1}{5}} = \\frac{x + y + z}{\\frac{1}{3} + \\frac{1}{4} + \\frac{1}{5}} = \\frac{235}{\\frac{47}{60}} = 235 \\cdot \\frac{60}{47} = 300$.\nSuy ra:\n$x = 300 \\cdot \\frac{1}{3} = 100$\n$y = 300 \\cdot \\frac{1}{4} = 75$\n$z = 300 \\cdot \\frac{1}{5} = 60$\nVậy ba phần cần tìm là $100, 75$ và $60$.',
    grade: 7, topic: 'ti_le', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['đại lượng tỉ lệ nghịch', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T15:00:00Z', updated_at: '2024-12-31T15:00:00Z',
  },
  {
    id: 'kntt-7-tln-02', question_code: 'BT085', content: 'Hai xe lửa đi từ $A$ đến $B$ mất lần lượt $2$ giờ $48$ phút và $4$ giờ $40$ phút. Tính khoảng cách $AB$, biết rằng vận tốc xe thứ nhất lớn hơn vận tốc xe thứ hai là $26$ km/h.',
    answer: '$182$ km',
    solution: 'Đổi $2$ giờ $48$ phút $= 2{,}8$ giờ; $4$ giờ $40$ phút $= \\frac{14}{3}$ giờ.\nGọi vận tốc của xe thứ nhất và xe thứ hai lần lượt là $v_1$ và $v_2$ (km/h) ($v_1 > v_2 > 0$).\nVì vận tốc xe thứ nhất lớn hơn xe thứ hai là $26$ km/h nên $v_1 - v_2 = 26$.\nVì khoảng cách $AB$ không đổi, nên vận tốc và thời gian là hai đại lượng tỉ lệ nghịch.\nTa có: $v_1 \\cdot 2{,}8 = v_2 \\cdot \\frac{14}{3} \\Rightarrow \\frac{v_1}{\\frac{14}{3}} = \\frac{v_2}{2{,}8}$.\nÁp dụng tính chất dãy tỉ số bằng nhau:\n$\\frac{v_1}{\\frac{14}{3}} = \\frac{v_2}{2{,}8} = \\frac{v_1 - v_2}{\\frac{14}{3} - 2{,}8} = \\frac{26}{\\frac{28}{15}} = 26 \\cdot \\frac{15}{28} = \\frac{195}{14}$.\nSuy ra: $v_1 = \\frac{195}{14} \\cdot \\frac{14}{3} = 65$ (km/h).\nKhoảng cách $AB$ là: $v_1 \\cdot t_1 = 65 \\cdot 2{,}8 = 182$ (km).',
    grade: 7, topic: 'ti_le', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['đại lượng tỉ lệ nghịch', 'toán chuyển động'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T15:15:00Z', updated_at: '2024-12-31T15:15:00Z',
  },
  {
    id: 'kntt-7-tln-03', question_code: 'BT086', content: 'Tìm độ dài ba cạnh của một tam giác biết chu vi của nó bằng $60$cm và ba chiều cao tương ứng tỉ lệ nghịch với $3; 4$ và $5$.',
    answer: '$15$cm, $20$cm và $25$cm',
    solution: 'Gọi độ dài ba cạnh của tam giác lần lượt là $a, b, c$ (cm) và chiều cao tương ứng là $h_a, h_b, h_c$ ($a, b, c, h_a, h_b, h_c > 0$).\nChu vi tam giác là $60$cm nên $a + b + c = 60$.\nDiện tích tam giác $S = \\frac{1}{2}a \\cdot h_a = \\frac{1}{2}b \\cdot h_b = \\frac{1}{2}c \\cdot h_c \\Rightarrow a \\cdot h_a = b \\cdot h_b = c \\cdot h_c$.\nBa chiều cao tỉ lệ nghịch với $3; 4; 5$ nên ta có $3 \\cdot h_a = 4 \\cdot h_b = 5 \\cdot h_c$.\nTừ đó suy ra $\\frac{a}{3} = \\frac{b}{4} = \\frac{c}{5}$.\nÁp dụng tính chất dãy tỉ số bằng nhau:\n$\\frac{a}{3} = \\frac{b}{4} = \\frac{c}{5} = \\frac{a + b + c}{3 + 4 + 5} = \\frac{60}{12} = 5$.\nSuy ra:\n$a = 5 \\cdot 3 = 15$ (cm)\n$b = 5 \\cdot 4 = 20$ (cm)\n$c = 5 \\cdot 5 = 25$ (cm)\nVậy độ dài ba cạnh của tam giác là $15$cm, $20$cm và $25$cm.',
    grade: 7, topic: 'hinh_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['đại lượng tỉ lệ nghịch', 'diện tích tam giác'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T15:30:00Z', updated_at: '2024-12-31T15:30:00Z',
  },
  // === BÀI TẬP THỐNG KÊ LỚP 7 (TỪ PHIẾU BÀI TẬP B10 & B11) ===
  {
    id: 'kntt-7-tk-01', question_code: 'BT087', content: 'Một chuyên gia đưa ra nguyên tắc chi tiêu tài chính hiệu quả trong gia đình theo quy tắc "50-30-20" được mô tả trên một biểu đồ hình quạt tròn như sau:\n- $50\\%$ cho chi tiêu thiết yếu (tiền ăn uống, thuê nhà, đi lại,...)\n- $30\\%$ cho các khoản tài chính (chi tiêu cá nhân, du lịch, mua sắm,...)\n- $20\\%$ cho tiết kiệm (quỹ dự phòng, tiết kiệm mua xe,...)\n\nGiả sử tổng thu nhập trong tháng của một gia đình là $25$ triệu đồng. Dựa vào tỉ lệ phần trăm trên, hãy tính số tiền cụ thể gia đình đó phân bổ cho từng khoản mục.',
    answer: 'Thiết yếu: $12{,}5$ triệu; Cá nhân: $7{,}5$ triệu; Tiết kiệm: $5$ triệu',
    solution: 'Số tiền gia đình chi cho nhu cầu thiết yếu là:\n$25 \\cdot 50\\% = 25 \\cdot \\frac{50}{100} = 12{,}5$ (triệu đồng).\n\nSố tiền gia đình chi cho các khoản tài chính (cá nhân) là:\n$25 \\cdot 30\\% = 25 \\cdot \\frac{30}{100} = 7{,}5$ (triệu đồng).\n\nSố tiền gia đình dành cho tiết kiệm dự phòng là:\n$25 \\cdot 20\\% = 25 \\cdot \\frac{20}{100} = 5$ (triệu đồng).\n*(Có thể tính bằng cách lấy tổng thu nhập trừ đi 2 khoản mục trên: $25 - 12{,}5 - 7{,}5 = 5$ triệu đồng).*',
    grade: 7, topic: 'thong_ke', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['thống kê', 'biểu đồ quạt tròn', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T16:00:00Z', updated_at: '2024-12-31T16:00:00Z',
  },
  {
    id: 'kntt-7-tk-02', question_code: 'BT088', content: 'Trong năm 2020, tổng lượng phát thải khí nhà kính từ các hoạt động kinh tế của một quốc gia A là $466$ triệu tấn khí Cacbonic. Một biểu đồ hình quạt tròn biểu diễn tỉ lệ phát thải ở $3$ lĩnh vực: Nông nghiệp chiếm $35\\%$, Chất thải chiếm $10\\%$, và phần còn lại thuộc về lĩnh vực Năng lượng.\n\na) Hãy tính tỉ lệ phần trăm lượng khí thải từ lĩnh vực Năng lượng.\nb) Lĩnh vực nào chiếm tỉ lệ tạo ra khí nhà kính lớn nhất? Hãy tính khối lượng khí thải thực tế của lĩnh vực đó.',
    answer: 'a) $55\\%$; b) Năng lượng lớn nhất, đạt $256{,}3$ triệu tấn',
    solution: 'a) Coi tổng lượng khí thải của cả ba lĩnh vực là $100\\%$.\nTỉ lệ phần trăm lượng phát thải của lĩnh vực Năng lượng là:\n$100\\% - (35\\% + 10\\%) = 100\\% - 45\\% = 55\\%$.\n\nb) So sánh ba tỉ lệ: $55\\% > 35\\% > 10\\%$.\nVậy lĩnh vực Năng lượng chiếm tỉ lệ tạo ra khí nhà kính lớn nhất ($55\\%$).\n\nKhối lượng khí thải thực tế sinh ra từ lĩnh vực Năng lượng là:\n$466 \\cdot 55\\% = 466 \\cdot 0{,}55 = 256{,}3$ (triệu tấn).',
    grade: 7, topic: 'thong_ke', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['thống kê', 'phân tích số liệu', 'bài toán môi trường'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T16:15:00Z', updated_at: '2024-12-31T16:15:00Z',
  },
  {
    id: 'kntt-7-tk-03', question_code: 'BT089', content: 'Kết quả xếp loại học tập cuối học kì I của $200$ học sinh khối 7 tại trường THCS X được thống kê bằng bảng sau:\n\n| Xếp loại | Tốt | Khá | Đạt | Chưa Đạt |\n|---|---|---|---|---|\n| Tỉ lệ (\\%) | 25\\% | 45\\% | 25\\% | 5\\% |\n\nBan giám hiệu nhà trường cần trao thưởng cho các học sinh đạt danh hiệu Tốt và Khá. Hỏi nhà trường cần chuẩn bị tổng cộng bao nhiêu phần quà?',
    answer: '$140$ phần quà',
    solution: 'Phương pháp 1: Tính riêng từng loại.\nSố học sinh xếp loại Tốt là: $200 \\cdot 25\\% = 50$ (học sinh).\nSố học sinh xếp loại Khá là: $200 \\cdot 45\\% = 90$ (học sinh).\nTổng số học sinh được trao thưởng (Tốt và Khá) là: $50 + 90 = 140$ (học sinh).\n\nPhương pháp 2: Tính gộp tỉ lệ.\nTổng tỉ lệ học sinh đạt loại Tốt và Khá là: $25\\% + 45\\% = 70\\%$.\nSố học sinh cần trao phần quà là: $200 \\cdot 70\\% = 140$ (học sinh).\n\nVậy nhà trường cần chuẩn bị tổng cộng $140$ phần quà.',
    grade: 7, topic: 'thong_ke', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['thống kê', 'bảng số liệu'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T16:30:00Z', updated_at: '2024-12-31T16:30:00Z',
  },
  // === BÀI TẬP HÌNH HỌC LỚP 7 (HÌNH HỘP CHỮ NHẬT VÀ TAM GIÁC) ===
  {
    id: 'kntt-7-hh-01', question_code: 'BT090', content: 'Một bể chứa nước hình hộp chữ nhật có chiều dài $2$m, chiều rộng $1{,}5$m, chiều cao $1{,}2$m. Một máy bơm bơm nước vào bể mỗi phút bơm được $20$ lít nước. Sau khi bơm được $45$ phút, người ta tắt máy. Hỏi lúc đó nước đã đầy bể hay chưa? Biết rằng lúc đầu trong bể đã có sẵn $50$ lít nước.',
    answer: 'Nước chưa đầy bể (chỉ mới có $950$ lít so với $3600$ lít)',
    solution: 'Thể tích của bể chứa nước hình hộp chữ nhật là:\n$V = 2 \\cdot 1{,}5 \\cdot 1{,}2 = 3{,}6$ ($\\text{m}^3$).\nĐổi $3{,}6\\text{m}^3 = 3600\\text{dm}^3 = 3600$ lít.\nVậy bể có khả năng chứa tối đa $3600$ lít nước.\n\nSố nước máy bơm bơm được trong $45$ phút là:\n$20 \\cdot 45 = 900$ (lít).\n\nTổng lượng nước có trong bể sau khi bơm xong là:\n$900 + 50 = 950$ (lít).\n\nVì $950$ lít $< 3600$ lít nên nước chưa đầy bể.',
    grade: 7, topic: 'hinh_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hình hộp chữ nhật', 'thể tích', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T17:00:00Z', updated_at: '2024-12-31T17:00:00Z',
  },
  {
    id: 'kntt-7-hh-02', question_code: 'BT091', content: 'Một phòng học hình hộp chữ nhật có chiều dài $8$m, chiều rộng $6$m, chiều cao $3{,}5$m. Người ta định quét sơn phía trong tường và cả trần nhà. Hỏi số tiền sơn phải trả là bao nhiêu? Biết rằng phòng học đó có hai cửa ra vào kích thước $1{,}5$m $\\times$ $2$m và bốn cửa sổ kích thước $1{,}2$m $\\times$ $1{,}5$m, giá tiền công quét sơn là $20\\,000$ đồng/m$^2$.',
    answer: '$2\\,656\\,000$ đồng',
    solution: 'Diện tích xung quanh của phòng học là:\n$S_{xq} = 2 \\cdot 3{,}5 \\cdot (8 + 6) = 7 \\cdot 14 = 98$ ($\\text{m}^2$).\nDiện tích trần nhà là:\n$S_{\\text{trần}} = 8 \\cdot 6 = 48$ ($\\text{m}^2$).\nTổng diện tích $4$ bức tường và trần nhà là:\n$98 + 48 = 146$ ($\\text{m}^2$).\n\nDiện tích của $2$ cửa ra vào là:\n$2 \\cdot (1{,}5 \\cdot 2) = 6$ ($\\text{m}^2$).\nDiện tích của $4$ cửa sổ là:\n$4 \\cdot (1{,}2 \\cdot 1{,}5) = 7{,}2$ ($\\text{m}^2$).\n\nDiện tích thực tế cần quét sơn là:\n$146 - 6 - 7{,}2 = 132{,}8$ ($\\text{m}^2$).\n\nSố tiền phải trả để quét sơn là:\n$132{,}8 \\cdot 20\\,000 = 2\\,656\\,000$ (đồng).',
    grade: 7, topic: 'hinh_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['hình hộp chữ nhật', 'diện tích xung quanh', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T17:15:00Z', updated_at: '2024-12-31T17:15:00Z',
  },
  {
    id: 'kntt-7-hh-03', question_code: 'BT092', content: 'Cho tam giác $ABC$ có độ dài ba cạnh lần lượt là $AB = 3$cm, $AC = 4$cm và $BC = 5$cm. Hãy so sánh các góc ngoài của tam giác đó.',
    answer: 'Góc ngoài tại đỉnh $A$ nhỏ nhất, lớn nhất là góc ngoài tại đỉnh $C$',
    solution: 'Trong tam giác $ABC$, ta có độ dài các cạnh: $BC = 5$cm, $AC = 4$cm, $AB = 3$cm.\nVì $BC > AC > AB$ nên theo định lý quan hệ giữa cạnh và góc đối diện trong tam giác, ta suy ra thứ tự các góc trong là:\n$\\widehat{A} > \\widehat{B} > \\widehat{C}$ (góc đối diện với cạnh lớn hơn thì lớn hơn).\n\nTa biết rằng tổng của góc trong và góc ngoài kề bù tại một đỉnh luôn bằng $180^\\circ$.\nDo đó, góc trong càng lớn thì góc ngoài tương ứng càng nhỏ.\nVì $\\widehat{A} > \\widehat{B} > \\widehat{C}$ nên ta suy ra:\nGóc ngoài tại đỉnh $A$ $<$ Góc ngoài tại đỉnh $B$ $<$ Góc ngoài tại đỉnh $C$.',
    grade: 7, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['quan hệ cạnh và góc', 'góc ngoài tam giác', 'hình học'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T17:30:00Z', updated_at: '2024-12-31T17:30:00Z',
  },
  {
    id: 'kntt-7-hh-04', question_code: 'BT093', content: 'Cho tam giác $ABC$ cân tại $A$, có $\\widehat{A} = 40^\\circ$. Tia phân giác của $\\widehat{B}$ cắt cạnh $AC$ tại $D$. Hãy tính số đo của $\\widehat{BDC}$.',
    answer: '$75^\\circ$',
    solution: 'Vì tam giác $ABC$ cân tại $A$ nên ta có:\n$\\widehat{B} = \\widehat{C} = \\frac{180^\\circ - \\widehat{A}}{2} = \\frac{180^\\circ - 40^\\circ}{2} = \\frac{140^\\circ}{2} = 70^\\circ$.\nVì $BD$ là tia phân giác của $\\widehat{B}$ nên:\n$\\widehat{ABD} = \\widehat{DBC} = \\frac{70^\\circ}{2} = 35^\\circ$.\nCách 1: Áp dụng định lý tổng ba góc trong $\\triangle BDC$:\n$\\widehat{BDC} = 180^\\circ - (\\widehat{DBC} + \\widehat{C}) = 180^\\circ - (35^\\circ + 70^\\circ) = 180^\\circ - 105^\\circ = 75^\\circ$.\nCách 2: Áp dụng tính chất góc ngoài của tam giác $\\triangle ABD$:\n$\\widehat{BDC}$ là góc ngoài tại đỉnh $D$ của $\\triangle ABD$, do đó:\n$\\widehat{BDC} = \\widehat{A} + \\widehat{ABD} = 40^\\circ + 35^\\circ = 75^\\circ$.',
    grade: 7, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tam giác cân', 'tổng ba góc', 'tia phân giác'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T18:00:00Z', updated_at: '2024-12-31T18:00:00Z',
  },
  {
    id: 'kntt-7-hh-05', question_code: 'BT094', content: 'Cho tam giác $ABC$ cân tại $A$. Các tia phân giác của $\\widehat{B}$ và $\\widehat{C}$ cắt các cạnh $AC$ và $AB$ lần lượt tại $D$ và $E$. Chứng minh rằng $DE \\parallel BC$.',
    answer: 'Sử dụng tính chất tam giác cân và góc đồng vị',
    solution: 'Vì $\\triangle ABC$ cân tại $A$ nên $AB = AC$ và $\\widehat{ABC} = \\widehat{ACB}$.\nDo $BD$ và $CE$ là các tia phân giác của $\\widehat{B}$ và $\\widehat{C}$, nên ta có:\n$\\widehat{ABD} = \\frac{1}{2}\\widehat{ABC}$ và $\\widehat{ACE} = \\frac{1}{2}\\widehat{ACB}$.\nSuy ra $\\widehat{ABD} = \\widehat{ACE}$.\nXét $\\triangle ABD$ và $\\triangle ACE$, ta có:\n$\\widehat{A}$ là góc chung\n$AB = AC$ (chứng minh trên)\n$\\widehat{ABD} = \\widehat{ACE}$ (chứng minh trên)\nDo đó, $\\triangle ABD = \\triangle ACE$ (g.c.g).\nSuy ra $AD = AE$ (hai cạnh tương ứng).\nVậy $\\triangle ADE$ cân tại $A$.\nTrong $\\triangle ADE$ cân tại $A$, ta có: $\\widehat{ADE} = \\frac{180^\\circ - \\widehat{A}}{2}$.\nTrong $\\triangle ABC$ cân tại $A$, ta cũng có: $\\widehat{ABC} = \\frac{180^\\circ - \\widehat{A}}{2}$.\nTừ đó suy ra $\\widehat{ADE} = \\widehat{ABC}$.\nMà hai góc này ở vị trí đồng vị, do đó $DE \\parallel BC$.',
    grade: 7, topic: 'tam_giac', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['tam giác cân', 'chứng minh song song', 'hai tam giác bằng nhau'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T18:15:00Z', updated_at: '2024-12-31T18:15:00Z',
  },
  {
    id: 'kntt-7-hh-06', question_code: 'BT095', content: 'Cho đoạn thẳng $AB = 8$cm. Đường trung trực $d$ của đoạn thẳng $AB$ cắt $AB$ tại điểm $M$. Trên đường thẳng $d$, lấy một điểm $C$ sao cho $MC = 3$cm. Tính độ dài các đoạn thẳng $CA$ và $CB$.',
    answer: '$CA = CB = 5$cm',
    solution: 'Vì đường thẳng $d$ là đường trung trực của đoạn thẳng $AB$ nên $d \\perp AB$ tại $M$ và $M$ là trung điểm của $AB$.\nDo $M$ là trung điểm của $AB$ nên $MA = MB = \\frac{AB}{2} = \\frac{8}{2} = 4$ (cm).\nVì điểm $C$ nằm trên đường trung trực $d$ của $AB$ nên $C$ cách đều hai đầu mút $A$ và $B$. Suy ra $CA = CB$.\nXét tam giác $CMA$ vuông tại $M$, áp dụng định lý Pythagore ta có:\n$CA^2 = CM^2 + MA^2$\n$CA^2 = 3^2 + 4^2 = 9 + 16 = 25$.\nSuy ra $CA = \\sqrt{25} = 5$ (cm).\nVậy $CA = CB = 5$cm.',
    grade: 7, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['đường trung trực', 'định lý pythagore', 'tam giác vuông'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T18:30:00Z', updated_at: '2024-12-31T18:30:00Z',
  },
  // === BÀI TẬP TOÁN LỚP 8 - HẰNG ĐẲNG THỨC & ĐA THỨC (BIÊN SOẠN CHUYÊN GIA) ===
  {
    id: 'kntt-8-hdt-01', question_code: 'BT096', content: 'Rút gọn rồi tính giá trị của biểu thức sau tại $x = 99$:\n$A = (x + 1)(x^2 - x + 1) - (x - 1)(x^2 + x + 1)$',
    answer: '$A = 2$ (Giá trị biểu thức không phụ thuộc vào $x$)',
    solution: 'Áp dụng hằng đẳng thức tổng hai lập phương và hiệu hai lập phương:\n$(x + 1)(x^2 - x + 1) = x^3 + 1^3 = x^3 + 1$\n$(x - 1)(x^2 + x + 1) = x^3 - 1^3 = x^3 - 1$\n\nThay vào biểu thức $A$, ta có:\n$A = (x^3 + 1) - (x^3 - 1)$\n$A = x^3 + 1 - x^3 + 1$\n$A = 2$\n\nVì sau khi rút gọn, $A = 2$ là một hằng số không chứa biến $x$, nên tại $x = 99$, giá trị của biểu thức $A$ vẫn bằng $2$.',
    grade: 8, topic: 'da_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hằng đẳng thức', 'rút gọn biểu thức', 'đa thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T19:00:00Z', updated_at: '2024-12-31T19:00:00Z',
  },
  {
    id: 'kntt-8-hdt-02', question_code: 'BT097', content: 'Chứng minh rằng biểu thức sau luôn nhận giá trị dương với mọi số thực $x$ và $y$:\n$B = x^2 + 4y^2 - 4xy + 2x - 4y + 3$',
    answer: 'Chứng minh $B = (x - 2y + 1)^2 + 2 > 0$',
    solution: 'Ta phân tích biểu thức $B$ thành các bình phương:\n$B = x^2 + 4y^2 - 4xy + 2x - 4y + 3$\nNhóm các hạng tử có liên quan:\n$B = (x^2 - 4xy + 4y^2) + (2x - 4y) + 3$\n$B = (x - 2y)^2 + 2(x - 2y) + 3$\nTiếp tục tách số $3$ thành $1 + 2$ để tạo hằng đẳng thức:\n$B = \\left[ (x - 2y)^2 + 2(x - 2y) \\cdot 1 + 1^2 \\right] + 2$\n$B = (x - 2y + 1)^2 + 2$\n\nTa có: $(x - 2y + 1)^2 \\ge 0$ với mọi $x, y \\in \\mathbb{R}$.\nSuy ra: $(x - 2y + 1)^2 + 2 \\ge 2 > 0$ với mọi $x, y \\in \\mathbb{R}$.\nVậy biểu thức $B$ luôn nhận giá trị dương.',
    grade: 8, topic: 'da_thuc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['hằng đẳng thức', 'chứng minh bất đẳng thức', 'đa thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T19:15:00Z', updated_at: '2024-12-31T19:15:00Z',
  },
  {
    id: 'kntt-8-pt-01', question_code: 'BT098', content: 'Cho phân thức đại số:\n$P = \\frac{x^2 - 4}{x^2 + 2x}$\n\na) Tìm điều kiện xác định của phân thức $P$.\nb) Rút gọn phân thức $P$.\nc) Tìm giá trị nguyên của $x$ để $P$ nhận giá trị nguyên.',
    answer: 'a) $x \\neq 0$ và $x \\neq -2$; b) $P = \\frac{x - 2}{x}$; c) $x \\in \\{-1; 1; 2\\}$',
    solution: 'a) Điều kiện xác định:\nMẫu thức $x^2 + 2x \\neq 0 \\Leftrightarrow x(x + 2) \\neq 0$\n$\\Leftrightarrow x \\neq 0$ và $x + 2 \\neq 0 \\Leftrightarrow x \\neq 0$ và $x \\neq -2$.\nVậy ĐKXĐ: $x \\neq 0$ và $x \\neq -2$.\n\nb) Rút gọn:\n$P = \\frac{x^2 - 4}{x^2 + 2x} = \\frac{x^2 - 2^2}{x(x + 2)} = \\frac{(x - 2)(x + 2)}{x(x + 2)} = \\frac{x - 2}{x}$.\n\nc) Tìm $x \\in \\mathbb{Z}$ để $P \\in \\mathbb{Z}$:\nTa có $P = \\frac{x - 2}{x} = \\frac{x}{x} - \\frac{2}{x} = 1 - \\frac{2}{x}$.\nĐể $P$ nhận giá trị nguyên thì $\\frac{2}{x}$ phải là số nguyên, tức là $x$ phải là ước của $2$.\nƯớc của $2$ là: $\\text{Ư}(2) = \\{-2; -1; 1; 2\\}$.\nĐối chiếu với điều kiện xác định ($x \\neq 0$ và $x \\neq -2$), ta loại giá trị $x = -2$.\nVậy $x \\in \\{-1; 1; 2\\}$ thì $P$ nhận giá trị nguyên.',
    grade: 8, topic: 'bieu_thuc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['phân thức đại số', 'rút gọn', 'giá trị nguyên'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T19:30:00Z', updated_at: '2024-12-31T19:30:00Z',
  },
  // === BÀI TẬP HÌNH HỌC LỚP 8 - TỨ GIÁC & ĐỊNH LÝ THALÈS (BIÊN SOẠN CHUYÊN GIA) ===
  {
    id: 'kntt-8-hh-01', question_code: 'BT099', content: 'Cho hình bình hành $ABCD$. Gọi $E, F$ lần lượt là trung điểm của các cạnh $AB$ và $CD$. Chứng minh rằng tứ giác $DEBF$ là hình bình hành.',
    answer: 'Chứng minh dựa vào dấu hiệu cặp cạnh đối song song và bằng nhau',
    solution: 'Vì $ABCD$ là hình bình hành nên ta có:\n$AB \\parallel CD$ và $AB = CD$.\n\nVì $E$ là trung điểm của $AB$ nên $EB = \\frac{1}{2}AB$.\nVì $F$ là trung điểm của $CD$ nên $DF = \\frac{1}{2}CD$.\nMà $AB = CD$ (chứng minh trên), suy ra $EB = DF$.\n\nMặt khác, vì $AB \\parallel CD$ (do $ABCD$ là hình bình hành) nên $EB \\parallel DF$.\n\nXét tứ giác $DEBF$, ta có:\n$EB \\parallel DF$ (chứng minh trên)\n$EB = DF$ (chứng minh trên)\nVậy tứ giác $DEBF$ là hình bình hành (theo dấu hiệu nhận biết tứ giác có một cặp cạnh đối vừa song song vừa bằng nhau).',
    grade: 8, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['hình bình hành', 'tứ giác', 'chứng minh'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T19:45:00Z', updated_at: '2024-12-31T19:45:00Z',
  },
  {
    id: 'kntt-8-hh-02', question_code: 'BT100', content: 'Cho tam giác $ABC$ có cạnh $AB = 6$cm, $AC = 9$cm. Trên cạnh $AB$ lấy điểm $M$ sao cho $AM = 2$cm, trên cạnh $AC$ lấy điểm $N$ sao cho $AN = 3$cm.\n\na) Chứng minh rằng $MN \\parallel BC$.\nb) Tính độ dài đoạn thẳng $MN$, biết $BC = 12$cm.',
    answer: 'a) Sử dụng định lý Thalès đảo; b) $MN = 4$cm',
    solution: 'a) Xét tỉ số các đoạn thẳng trên hai cạnh $AB$ và $AC$:\nTa có: $\\frac{AM}{AB} = \\frac{2}{6} = \\frac{1}{3}$.\nVà $\\frac{AN}{AC} = \\frac{3}{9} = \\frac{1}{3}$.\nSuy ra: $\\frac{AM}{AB} = \\frac{AN}{AC}$.\nTheo định lý Thalès đảo trong tam giác $ABC$, ta kết luận $MN \\parallel BC$.\n\nb) Vì $MN \\parallel BC$ nên theo hệ quả của định lý Thalès, ta có:\n$\\frac{MN}{BC} = \\frac{AM}{AB}$\n$\\Rightarrow \\frac{MN}{12} = \\frac{1}{3}$\n$\\Rightarrow MN = 12 \\cdot \\frac{1}{3} = 4$ (cm).\nVậy độ dài đoạn thẳng $MN$ là $4$cm.',
    grade: 8, topic: 'tam_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['định lý thalès', 'đoạn thẳng tỉ lệ', 'tam giác'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T20:00:00Z', updated_at: '2024-12-31T20:00:00Z',
  },
  {
    id: 'kntt-8-hh-03', question_code: 'BT101', content: 'Để đo khoảng cách từ điểm $A$ đến điểm $B$ bên kia bờ sông (không thể đo trực tiếp), người ta xác định điểm $C$ trên bờ cùng phía với $A$ sao cho $AC = 10$m. Kẻ $CH \\perp AB$ tại $H$. Người ta đo được $AH = 6$m. Biết rằng góc $\\widehat{ACB} = 90^\\circ$. Hãy tính khoảng cách $AB$ qua sông.',
    answer: 'Khoảng cách $AB$ là $\\frac{50}{3}$ m (khoảng $16{,}67$ m)',
    solution: 'Xét tam giác $AHC$ vuông tại $H$, áp dụng định lý Pythagore ta tính được $CH$:\n$CH^2 = AC^2 - AH^2 = 10^2 - 6^2 = 100 - 36 = 64$\nSuy ra $CH = 8$ (m).\n\nXét $\\triangle AHC$ vuông tại $H$ và $\\triangle ACB$ vuông tại $C$, ta có:\n$\\widehat{A}$ là góc chung.\nDo đó, $\\triangle AHC \\sim \\triangle ACB$ (g.g).\nTừ sự đồng dạng này, ta thiết lập tỉ số đồng dạng:\n$\\frac{AH}{AC} = \\frac{AC}{AB}$\n$\\Rightarrow AB = \\frac{AC^2}{AH} = \\frac{10^2}{6} = \\frac{100}{6} = \\frac{50}{3}$ (m).\n\nVậy khoảng cách $AB$ qua sông là $\\frac{50}{3}$ mét (xấp xỉ $16{,}67$ m).',
    grade: 8, topic: 'tam_giac', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['tam giác đồng dạng', 'toán thực tế', 'định lý pythagore'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T20:15:00Z', updated_at: '2024-12-31T20:15:00Z',
  },
  {
    id: 'kntt-8-hs-01', question_code: 'BT102', content: 'Cho hàm số bậc nhất $y = (m - 1)x + 3$ (với $m \\neq 1$) có đồ thị là đường thẳng $(d)$.\n\na) Tìm giá trị của $m$ để đường thẳng $(d)$ song song với đường thẳng $y = 2x - 1$.\nb) Với $m$ tìm được ở câu a, hãy vẽ đồ thị hàm số và tính góc tạo bởi đường thẳng đó với trục $Ox$.',
    answer: 'a) $m = 3$; b) Góc tạo bởi đồ thị và trục $Ox$ xấp xỉ $63^\\circ 26\'$',
    solution: 'a) Để đường thẳng $(d): y = (m - 1)x + 3$ song song với đường thẳng $y = 2x - 1$, ta phải có:\n$a = a\' \\Leftrightarrow m - 1 = 2$\nvà $b \\neq b\' \\Leftrightarrow 3 \\neq -1$ (luôn đúng).\nVậy $m = 3$ (thỏa mãn điều kiện $m \\neq 1$).\n\nb) Với $m = 3$, hàm số trở thành $y = 2x + 3$.\n- Đồ thị cắt trục $Oy$ tại điểm $A(0; 3)$.\n- Đồ thị cắt trục $Ox$ tại điểm $B\\left(-\\frac{3}{2}; 0\\right)$.\nĐường thẳng đi qua hai điểm $A$ và $B$ chính là đồ thị hàm số $y = 2x + 3$.\nGọi $\\alpha$ là góc tạo bởi đường thẳng $y = 2x + 3$ và trục $Ox$.\nTrong tam giác vuông $OAB$ vuông tại $O$, ta có:\n$\\tan \\alpha = \\frac{OA}{OB} = \\frac{3}{|-1{,}5|} = 2$.\nSuy ra $\\alpha \\approx 63^\\circ 26\'$.',
    grade: 8, topic: 'ham_so', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['hàm số bậc nhất', 'đường thẳng song song', 'hệ số góc'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T20:30:00Z', updated_at: '2024-12-31T20:30:00Z',
  },
  {
    id: 'kntt-8-pt-02', question_code: 'BT103', content: 'Giải bài toán bằng cách lập phương trình:\nMột ô tô đi từ A đến B với vận tốc $40$ km/h. Khi từ B trở về A, ô tô đó đi với vận tốc $50$ km/h nên thời gian về ít hơn thời gian đi là $30$ phút. Tính quãng đường AB.',
    answer: '$100$ km',
    solution: 'Đổi $30$ phút = $0{,}5$ giờ.\nGọi độ dài quãng đường AB là $x$ (km) ($x > 0$).\nThời gian ô tô đi từ A đến B với vận tốc $40$ km/h là: $\\frac{x}{40}$ (giờ).\nThời gian ô tô đi từ B về A với vận tốc $50$ km/h là: $\\frac{x}{50}$ (giờ).\n\nVì thời gian về ít hơn thời gian đi là $0{,}5$ giờ nên ta có phương trình:\n$\\frac{x}{40} - \\frac{x}{50} = 0{,}5$\n$\\Leftrightarrow \\frac{5x}{200} - \\frac{4x}{200} = \\frac{100}{200}$\n$\\Leftrightarrow 5x - 4x = 100$\n$\\Leftrightarrow x = 100$ (thỏa mãn điều kiện $x > 0$).\n\nVậy quãng đường AB dài $100$ km.',
    grade: 8, topic: 'phuong_trinh', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['giải bài toán bằng cách lập phương trình', 'toán chuyển động'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T20:45:00Z', updated_at: '2024-12-31T20:45:00Z',
  },
  {
    id: 'kntt-8-hh-04', question_code: 'BT104', content: 'Kim tự tháp Khufu (Cheops) ở Ai Cập là một trong bảy kỳ quan của thế giới cổ đại. Nó có dạng hình chóp tứ giác đều với đáy là hình vuông. Biết cạnh đáy của kim tự tháp dài khoảng $230$ mét, và chiều cao ban đầu của nó (từ đỉnh hạ vuông góc xuống tâm mặt đáy) là khoảng $146$ mét.\n\na) Hãy tính thể tích không gian bên trong của Kim tự tháp.\nb) Giả sử các nhà khảo cổ muốn phủ một lớp bạt bảo vệ toàn bộ $4$ mặt bên của Kim tự tháp. Hãy tính diện tích lớp bạt tối thiểu cần dùng (bỏ qua các mép gấp).',
    answer: 'a) Thể tích $\\approx 2\\,574\\,466{,}67 \\text{ m}^3$; b) Diện tích xung quanh $\\approx 85\\,744 \\text{ m}^2$',
    solution: 'a) Tính thể tích Kim tự tháp:\nĐáy là hình vuông có cạnh $a = 230$m. Diện tích mặt đáy là:\n$S_d = 230^2 = 52\\,900$ ($\\text{m}^2$).\nThể tích khối chóp tứ giác đều là:\n$V = \\frac{1}{3} S_d \\cdot h = \\frac{1}{3} \\cdot 52\\,900 \\cdot 146 = 2\\,574\\,466{,}67$ ($\\text{m}^3$).\n\nb) Tính diện tích xung quanh (diện tích 4 mặt bên):\nGọi $h_d$ là trung đoạn của hình chóp (chiều cao của một mặt bên).\nKhoảng cách từ tâm đáy đến một cạnh đáy là $\\frac{a}{2} = \\frac{230}{2} = 115$ (m).\nÁp dụng định lý Pythagore trong tam giác vuông tạo bởi đường cao hình chóp, khoảng cách từ tâm đến cạnh đáy và trung đoạn:\n$h_d^2 = h^2 + \\left(\\frac{a}{2}\\right)^2 = 146^2 + 115^2 = 21\\,316 + 13\\,225 = 34\\,541$.\n$\\Rightarrow h_d = \\sqrt{34\\,541} \\approx 185{,}85$ (m).\n\nChu vi đáy là $p = 4 \\cdot 230 = 920$ (m). Nửa chu vi đáy $p\' = 460$ (m).\nDiện tích xung quanh là:\n$S_{xq} = p\' \\cdot h_d = 460 \\cdot 185{,}85 \\approx 85\\,491$ ($\\text{m}^2$).\n*(Nếu dùng nguyên số căn thì $S_{xq} = 460 \\cdot \\sqrt{34541} \\approx 85\\,487{,}6$ $\\text{m}^2$).*\nVậy diện tích bạt tối thiểu cần chuẩn bị là khoảng $85\\,488$ $\\text{m}^2$.',
    grade: 8, topic: 'hinh_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['hình chóp tứ giác đều', 'thể tích', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T21:00:00Z', updated_at: '2024-12-31T21:00:00Z',
  },
  // === BÀI TẬP TOÁN LỚP 9 - SGK KNTT (BIÊN SOẠN CHUYÊN GIA) ===
  {
    id: 'kntt-9-hpt-01', question_code: 'BT105', content: 'Giải hệ phương trình sau bằng phương pháp cộng đại số hoặc phương pháp thế:\n$\\begin{cases} 3x - 2y = 11 \\\\ 4x + 3y = 9 \\end{cases}$',
    answer: '$(x; y) = (3; -1)$',
    solution: 'Giải hệ phương trình bằng phương pháp cộng đại số:\nNhân cả hai vế của phương trình thứ nhất với $3$, phương trình thứ hai với $2$, ta được hệ mới:\n$\\begin{cases} 9x - 6y = 33 \\\\ 8x + 6y = 18 \\end{cases}$\n\nCộng vế theo vế hai phương trình trên, ta có:\n$(9x + 8x) + (-6y + 6y) = 33 + 18$\n$\\Leftrightarrow 17x = 51$\n$\\Leftrightarrow x = 3$\n\nThay $x = 3$ vào phương trình thứ nhất ban đầu ($3x - 2y = 11$):\n$3(3) - 2y = 11$\n$\\Leftrightarrow 9 - 2y = 11$\n$\\Leftrightarrow 2y = -2 \\Leftrightarrow y = -1$\n\nVậy hệ phương trình có nghiệm duy nhất là $(x; y) = (3; -1)$.',
    grade: 9, topic: 'he_phuong_trinh', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['hệ phương trình bậc nhất hai ẩn', 'phương pháp cộng đại số'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9',
    created_at: '2024-12-31T21:15:00Z', updated_at: '2024-12-31T21:15:00Z',
  },
  {
    id: 'kntt-9-lg-01', question_code: 'BT106', content: 'Một chiếc thang dài $3{,}5$m được đặt tựa vào một bức tường. Biết góc tạo bởi chiếc thang và mặt đất là $65^\\circ$.\n\na) Tính khoảng cách từ chân thang đến chân tường.\nb) Chiếc thang có thể chạm tới độ cao bao nhiêu trên bức tường? (Làm tròn kết quả đến chữ số thập phân thứ hai).',
    answer: 'a) $1{,}48$m; b) $3{,}17$m',
    solution: 'Gọi chiều dài chiếc thang là cạnh huyền của tam giác vuông $ABC$ (vuông tại $A$, $A$ là chân tường), với $B$ là điểm thang chạm tường, $C$ là chân thang.\nTa có cạnh huyền $BC = 3{,}5$m, góc tạo bởi thang và mặt đất là $\\widehat{C} = 65^\\circ$.\n\na) Khoảng cách từ chân thang đến chân tường là cạnh kề $AC$:\nÁp dụng tỉ số lượng giác của góc nhọn:\n$\\cos C = \\frac{AC}{BC} \\Rightarrow AC = BC \\cdot \\cos 65^\\circ = 3{,}5 \\cdot \\cos 65^\\circ \\approx 3{,}5 \\cdot 0{,}4226 \\approx 1{,}48$ (m).\nVậy chân thang cách chân tường khoảng $1{,}48$m.\n\nb) Độ cao chiếc thang chạm tới tường là cạnh đối $AB$:\nÁp dụng tỉ số lượng giác:\n$\\sin C = \\frac{AB}{BC} \\Rightarrow AB = BC \\cdot \\sin 65^\\circ = 3{,}5 \\cdot \\sin 65^\\circ \\approx 3{,}5 \\cdot 0{,}9063 \\approx 3{,}17$ (m).\nVậy chiếc thang chạm tới độ cao khoảng $3{,}17$m trên tường.',
    grade: 9, topic: 'luong_giac', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tỉ số lượng giác', 'tam giác vuông', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9',
    created_at: '2024-12-31T21:30:00Z', updated_at: '2024-12-31T21:30:00Z',
  },
  {
    id: 'kntt-9-dt-01', question_code: 'BT107', content: 'Từ một điểm $A$ nằm ngoài đường tròn tâm $O$, bán kính $R = 5$cm, kẻ tiếp tuyến $AB$ với đường tròn ($B$ là tiếp điểm). Biết khoảng cách từ điểm $A$ đến tâm $O$ là $13$cm.\n\na) Tính độ dài đoạn tiếp tuyến $AB$.\nb) Qua $O$ kẻ đường thẳng vuông góc với $OA$, cắt tia $AB$ tại điểm $C$. Tính độ dài đoạn thẳng $AC$.',
    answer: 'a) $AB = 12$cm; b) $AC = \\frac{169}{12}$ cm',
    solution: 'a) Tính độ dài $AB$:\nVì $AB$ là tiếp tuyến của $(O)$ tại điểm $B$, nên $OB \\perp AB$ tại $B$.\nXét tam giác $ABO$ vuông tại $B$, áp dụng định lý Pythagore:\n$OA^2 = OB^2 + AB^2 \\Rightarrow 13^2 = 5^2 + AB^2 \\Rightarrow 169 = 25 + AB^2$\n$\\Rightarrow AB^2 = 144 \\Rightarrow AB = 12$ (cm).\n\nb) Tính độ dài $AC$:\nKẻ $OC \\perp OA$ (giả thiết).\nTrong tam giác vuông $OAC$ (vuông tại $O$), có $OB$ là đường cao hạ từ đỉnh góc vuông $O$ xuống cạnh huyền $AC$ (vì $OB \\perp AC$ tại $B$).\nÁp dụng hệ thức lượng trong tam giác vuông $OAC$:\n$OA^2 = AB \\cdot AC$\n$\\Rightarrow AC = \\frac{OA^2}{AB} = \\frac{13^2}{12} = \\frac{169}{12} \\approx 14{,}08$ (cm).\nVậy độ dài $AC$ là $\\frac{169}{12}$ cm.',
    grade: 9, topic: 'duong_tron', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['tiếp tuyến đường tròn', 'hệ thức lượng', 'định lý pythagore'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9',
    created_at: '2024-12-31T21:45:00Z', updated_at: '2024-12-31T21:45:00Z',
  },
  // === BỔ SUNG CÁC DẠNG BÀI CHUYÊN SÂU LỚP 7, 8, 9 (CHUYÊN GIA BIÊN SOẠN) ===
  {
    id: 'kntt-7-ct-01', question_code: 'BT108', content: 'Tính giá trị của biểu thức sau (vận dụng căn bậc hai số học và giá trị tuyệt đối):\n$A = \\sqrt{64} - \\sqrt{25} + \\left| -\\frac{2}{3} \\right| \\cdot \\sqrt{81}$',
    answer: '$A = 9$',
    solution: 'Thực hiện phép tính theo thứ tự: khai căn và tính giá trị tuyệt đối trước, sau đó nhân chia, cuối cùng là cộng trừ.\nTa có:\n$\\sqrt{64} = 8$\n$\\sqrt{25} = 5$\n$\\sqrt{81} = 9$\n$\\left| -\\frac{2}{3} \\right| = \\frac{2}{3}$\n\nThay các kết quả vào biểu thức $A$, ta được:\n$A = 8 - 5 + \\frac{2}{3} \\cdot 9$\n$A = 3 + 6$\n$A = 9$.\nVậy giá trị của biểu thức là $A = 9$.',
    grade: 7, topic: 'can_thuc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['căn bậc hai số học', 'giá trị tuyệt đối', 'tính toán'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-31T22:00:00Z', updated_at: '2024-12-31T22:00:00Z',
  },
  {
    id: 'kntt-8-dt-03', question_code: 'BT109', content: 'Phân tích đa thức sau thành nhân tử:\n$P = x^2 - 4x + 4 - y^2$',
    answer: '$P = (x - 2 - y)(x - 2 + y)$',
    solution: 'Quan sát đa thức $P = x^2 - 4x + 4 - y^2$, ta thấy ba hạng tử đầu tiên tạo thành hằng đẳng thức bình phương của một hiệu.\nTa nhóm các hạng tử như sau:\n$P = (x^2 - 4x + 4) - y^2$\n$P = (x - 2)^2 - y^2$\n\nTiếp tục sử dụng hằng đẳng thức hiệu hai bình phương $A^2 - B^2 = (A - B)(A + B)$:\n$P = (x - 2 - y)(x - 2 + y)$.\n\nVậy đa thức đã được phân tích thành nhân tử thành công.',
    grade: 8, topic: 'da_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['phân tích đa thức thành nhân tử', 'hằng đẳng thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T22:10:00Z', updated_at: '2024-12-31T22:10:00Z',
  },
  {
    id: 'kntt-8-xs-01', question_code: 'BT110', content: 'Một hộp kín chứa $20$ viên bi được đánh số từ $1$ đến $20$. Rút ngẫu nhiên một viên bi từ trong hộp.\na) Hãy liệt kê các kết quả thuận lợi cho biến cố $A$: "Viên bi rút ra mang số là một số nguyên tố".\nb) Tính xác suất của biến cố $A$.',
    answer: 'a) $2, 3, 5, 7, 11, 13, 17, 19$; b) Xác suất là $\\frac{2}{5}$',
    solution: 'a) Không gian mẫu (các kết quả có thể xảy ra) là tập hợp các số từ $1$ đến $20$. Số lượng kết quả có thể là $n = 20$.\nCác số nguyên tố từ $1$ đến $20$ bao gồm: $2, 3, 5, 7, 11, 13, 17, 19$.\nVậy các kết quả thuận lợi cho biến cố $A$ là tập hợp $\\{2; 3; 5; 7; 11; 13; 17; 19\\}$.\n\nb) Số lượng kết quả thuận lợi cho biến cố $A$ là $m = 8$.\nXác suất của biến cố $A$ được tính theo công thức:\n$P(A) = \\frac{m}{n} = \\frac{8}{20} = \\frac{2}{5}$.\n\nVậy xác suất để rút được viên bi mang số nguyên tố là $\\frac{2}{5}$ (hoặc $0{,}4$).',
    grade: 8, topic: 'xac_suat', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['xác suất biến cố', 'số nguyên tố'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-31T22:20:00Z', updated_at: '2024-12-31T22:20:00Z',
  },
  {
    id: 'kntt-9-bpt-01', question_code: 'BT111', content: 'Giải bất phương trình sau:\n$\\frac{2x - 3}{4} \\le \\frac{x + 1}{3} - 1$',
    answer: '$x \\le \\frac{1}{2}$',
    solution: 'Tìm mẫu thức chung của $4$ và $3$ là $12$. Quy đồng mẫu hai vế của bất phương trình:\n$\\frac{3(2x - 3)}{12} \\le \\frac{4(x + 1)}{12} - \\frac{12}{12}$\n\nKhử mẫu (do $12 > 0$ nên chiều bất phương trình giữ nguyên):\n$3(2x - 3) \\le 4(x + 1) - 12$\n\nThực hiện phép nhân phân phối:\n$6x - 9 \\le 4x + 4 - 12$\n$\\Leftrightarrow 6x - 9 \\le 4x - 8$\n\nChuyển vế, thu gọn:\n$6x - 4x \\le -8 + 9$\n$\\Leftrightarrow 2x \\le 1$\n$\\Leftrightarrow x \\le \\frac{1}{2}$\n\nVậy tập nghiệm của bất phương trình là $S = \\left\\{ x \\in \\mathbb{R} \\mid x \\le \\frac{1}{2} \\right\\}$.',
    grade: 9, topic: 'bat_phuong_trinh', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['bất phương trình bậc nhất một ẩn', 'quy đồng mẫu'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9',
    created_at: '2024-12-31T22:30:00Z', updated_at: '2024-12-31T22:30:00Z',
  },
  {
    id: 'kntt-9-hs-02', question_code: 'BT112', content: 'Trong mặt phẳng tọa độ $Oxy$, cho parabol $(P): y = x^2$ và đường thẳng $(d): y = 2x + 3$.\na) Giải phương trình hoành độ giao điểm của $(P)$ và $(d)$.\nb) Tìm tọa độ các giao điểm của $(P)$ và $(d)$.',
    answer: 'Giao điểm là $A(-1; 1)$ và $B(3; 9)$',
    solution: 'a) Xét phương trình hoành độ giao điểm của $(P)$ và $(d)$:\n$x^2 = 2x + 3$\n$\\Leftrightarrow x^2 - 2x - 3 = 0$\nĐây là phương trình bậc hai một ẩn $x$. \nTa thấy hệ số $a - b + c = 1 - (-2) + (-3) = 1 + 2 - 3 = 0$.\nTheo định lí Viète, phương trình có hai nghiệm phân biệt:\n$x_1 = -1$\n$x_2 = -\\frac{c}{a} = -\\frac{-3}{1} = 3$.\n\nb) Tìm tung độ tương ứng:\n- Với $x_1 = -1$, thay vào phương trình $(P)$ ta được $y_1 = (-1)^2 = 1$. Suy ra giao điểm thứ nhất là $A(-1; 1)$.\n- Với $x_2 = 3$, thay vào phương trình $(P)$ ta được $y_2 = 3^2 = 9$. Suy ra giao điểm thứ hai là $B(3; 9)$.\n\nVậy parabol $(P)$ và đường thẳng $(d)$ cắt nhau tại hai điểm có tọa độ là $A(-1; 1)$ và $B(3; 9)$.',
    grade: 9, topic: 'ham_so', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['parabol', 'sự tương giao', 'định lí viète'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-9',
    created_at: '2024-12-31T22:45:00Z', updated_at: '2024-12-31T22:45:00Z',
  },
  // === TOÁN LỚP 7 - SGK KẾT NỐI TRI THỨC ===
  {
    id: 'kntt-7-bai02-01', question_code: 'BT056', content: 'Thực hiện phép tính (tính hợp lý nếu có thể):\n$A = \\frac{5}{13} + \\left( -\\frac{5}{7} \\right) + \\frac{-20}{41} + \\frac{8}{13} + \\frac{-21}{41}$',
    answer: '$\\frac{-12}{7}$',
    solution: 'Nhóm các số hạng có cùng mẫu số:\n$A = \\left( \\frac{5}{13} + \\frac{8}{13} \\right) + \\left( \\frac{-20}{41} + \\frac{-21}{41} \\right) + \\left( -\\frac{5}{7} \\right)$\n$A = \\frac{13}{13} + \\frac{-41}{41} + \\left( -\\frac{5}{7} \\right)$\n$A = 1 + (-1) - \\frac{5}{7}$\n$A = -\\frac{5}{7}$',
    grade: 7, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['số hữu tỉ', 'cộng trừ số hữu tỉ', 'kết nối tri thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-24T08:00:00Z', updated_at: '2024-12-24T08:00:00Z',
  },
  {
    id: 'kntt-7-bai09-01', question_code: 'BT057', content: 'Cho hình vẽ biết $xx\' \\parallel yy\'$ và đường thẳng $c$ cắt $xx\', yy\'$ lần lượt tại $A$ và $B$. Biết góc $\\widehat{xAB} = 110°$. Tính số đo góc đồng vị và góc so le trong của $\\widehat{xAB}$ tại đỉnh $B$.',
    answer: 'Góc đồng vị = $110°$; Góc so le trong = $110°$',
    solution: 'Vì $xx\' \\parallel yy\'$ nên các góc đồng vị bằng nhau, các góc so le trong bằng nhau.\n- Góc đồng vị với $\\widehat{xAB}$ là $\\widehat{yBC\'} = 110°$ (với $C\'$ thuộc đường thẳng $c$).\n- Góc so le trong với $\\widehat{xAB}$ là $\\widehat{ABy\'} = 110°$.\n(Học sinh tự vẽ hình minh họa và điền tên tia để xác định chính xác góc)',
    grade: 7, topic: 'hinh_hoc', difficulty: 'thong_hieu', question_type: 'tu_luan',
    tags: ['hai đường thẳng song song', 'góc đồng vị', 'góc so le trong'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-25T08:00:00Z', updated_at: '2024-12-25T08:00:00Z',
  },
  {
    id: 'kntt-7-bai25-01', question_code: 'BT058', content: 'Cho hai đa thức một biến:\n$P(x) = 3x^3 - 4x^2 + 5x - 2$\n$Q(x) = -3x^3 + 2x^2 - x + 5$\n\na) Tính $A(x) = P(x) + Q(x)$.\nb) Tìm bậc của đa thức $A(x)$.\nc) Tính giá trị của $A(x)$ tại $x = -1$.',
    answer: 'a) $A(x) = -2x^2 + 4x + 3$; b) Bậc 2; c) $A(-1) = -3$',
    solution: 'a) $A(x) = (3x^3 - 3x^3) + (-4x^2 + 2x^2) + (5x - x) + (-2 + 5)$\n$A(x) = -2x^2 + 4x + 3$\n\nb) Đa thức $A(x)$ có hạng tử bậc cao nhất là $-2x^2$ nên bậc của đa thức là $2$.\n\nc) Thay $x = -1$ vào $A(x)$:\n$A(-1) = -2(-1)^2 + 4(-1) + 3 = -2 - 4 + 3 = -3$.',
    grade: 7, topic: 'da_thuc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['đa thức một biến', 'cộng trừ đa thức'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-7',
    created_at: '2024-12-26T08:00:00Z', updated_at: '2024-12-26T08:00:00Z',
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
  // === TOÁN LỚP 8 - SGK KẾT NỐI TRI THỨC ===
  {
    id: 'kntt-8-bai15-01', question_code: 'BT059', content: 'Lúc 7 giờ sáng, một xe máy đi từ A đến B với vận tốc $40$ km/h. Sau đó 30 phút, một ô tô cũng xuất phát từ A đuổi theo xe máy với vận tốc $60$ km/h. Hỏi ô tô đuổi kịp xe máy lúc mấy giờ?',
    answer: 'Lúc 8 giờ 30 phút',
    solution: 'Đổi 30 phút = $\\frac{1}{2}$ giờ.\nGọi thời gian từ lúc ô tô xuất phát đến khi đuổi kịp xe máy là $x$ (giờ, $x > 0$).\nQuãng đường ô tô đi được là: $60x$ (km).\nThời gian xe máy đi cho đến khi bị đuổi kịp là: $x + \\frac{1}{2}$ (giờ).\nQuãng đường xe máy đi được là: $40\\left(x + \\frac{1}{2}\\right)$ (km).\nVì ô tô đuổi kịp xe máy nên hai xe đi được quãng đường bằng nhau:\n$60x = 40\\left(x + \\frac{1}{2}\\right)$\n$60x = 40x + 20 \\Rightarrow 20x = 20 \\Rightarrow x = 1$ (thỏa mãn).\nVậy ô tô đuổi kịp xe máy sau 1 giờ kể từ lúc ô tô xuất phát (tức là $7h30 + 1h = 8h30$).',
    grade: 8, topic: 'phuong_trinh', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['giải toán bằng cách lập phương trình', 'toán chuyển động'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-27T08:00:00Z', updated_at: '2024-12-27T08:00:00Z',
  },
  {
    id: 'kntt-8-bai20-01', question_code: 'BT060', content: 'Cho tam giác $ABC$ có trung tuyến $AM$. Gọi $I$ là trung điểm của $AM$, $D$ là giao điểm của $BI$ và $AC$. Tính tỉ số $\\frac{AD}{DC}$.',
    answer: '$\\frac{AD}{DC} = \\frac{1}{2}$',
    solution: 'Kẻ $ME \\parallel BD$ ($E \\in AC$).\nTrong $\\triangle BEC$ có $M$ là trung điểm của $BC$ và $ME \\parallel BD \\Rightarrow E$ là trung điểm của $DC$ $\\Rightarrow DE = EC$.\nTrong $\\triangle AME$ có $I$ là trung điểm của $AM$ và $ID \\parallel ME$ (vì $D \\in BI$) $\\Rightarrow D$ là trung điểm của $AE$ $\\Rightarrow AD = DE$.\nDo đó: $AD = DE = EC$.\nVậy $DC = DE + EC = 2AD$, suy ra $\\frac{AD}{DC} = \\frac{1}{2}$.',
    grade: 8, topic: 'tam_giac', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['đường trung bình', 'tam giác', 'định lí thalès'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-28T08:00:00Z', updated_at: '2024-12-28T08:00:00Z',
  },
  {
    id: 'kntt-8-bai33-01', question_code: 'BT061', content: 'Một túi chứa $5$ viên bi đỏ, $3$ viên bi xanh và $2$ viên bi vàng (các viên bi có cùng kích thước và khối lượng). Lấy ngẫu nhiên một viên bi từ túi. Tính xác suất của biến cố: "Viên bi lấy ra KHÔNG phải là màu đỏ".',
    answer: '$\\frac{1}{2}$',
    solution: 'Tổng số viên bi trong túi là: $5 + 3 + 2 = 10$ (viên bi).\nSố viên bi không phải màu đỏ (xanh hoặc vàng) là: $3 + 2 = 5$ (viên bi).\nXác suất lấy được viên bi không phải màu đỏ là: $P = \\frac{5}{10} = \\frac{1}{2}$.',
    grade: 8, topic: 'xac_suat', difficulty: 'nhan_biet', question_type: 'tu_luan',
    tags: ['xác suất', 'biến cố đối'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-8',
    created_at: '2024-12-29T08:00:00Z', updated_at: '2024-12-29T08:00:00Z',
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
    id: 'q7-05', question_code: 'BT042', content: 'Ba người cùng làm một công việc thì hoàn thành trong $4$ giờ. Nếu làm riêng, người thứ nhất hoàn thành trong $12$ giờ, người thứ hai hoàn thành trong $8$ giờ. Hỏi nếu làm riêng thì người thứ ba hoàn thành công việc đó trong bao lâu?',
    answer: '$24$ giờ',
    solution: 'Trong 1 giờ, cả ba người làm được $\\frac{1}{4}$ công việc.\nTrong 1 giờ, người thứ nhất làm được $\\frac{1}{12}$ công việc.\nTrong 1 giờ, người thứ hai làm được $\\frac{1}{8}$ công việc.\nTrong 1 giờ, người thứ ba làm được: $\\frac{1}{4} - \\left( \\frac{1}{12} + \\frac{1}{8} \\right) = \\frac{1}{4} - \\frac{5}{24} = \\frac{1}{24}$ công việc.\nVậy người thứ ba làm riêng sẽ hoàn thành trong $24$ giờ.',
    grade: 7, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['phân số', 'bài toán công việc chung'], user_id: 'demo-user-001', is_public: true, status: 'approved',
    created_at: '2024-12-05T08:00:00Z', updated_at: '2024-12-05T08:00:00Z',
  },
  // === TOÁN THỰC TẾ TẬP HỢP (TRÍCH XUẤT TỪ FILE TÀI LIỆU CỦA GV) ===
  {
    id: 'kntt-6-venn-01', question_code: 'BT062', content: 'Một lớp học có $50$ học sinh, trong đó có $15$ học sinh giỏi Toán; $20$ học sinh giỏi Văn và có $12$ học sinh vừa giỏi Toán vừa giỏi Văn.\n\na) Hỏi có bao nhiêu học sinh giỏi Toán hoặc giỏi Văn?\nb) Có bao nhiêu học sinh của lớp không giỏi Toán và cũng không giỏi Văn?',
    answer: 'a) $23$ học sinh\nb) $27$ học sinh',
    solution: 'Áp dụng biểu đồ Ven hoặc công thức tập hợp:\na) Số học sinh giỏi Toán hoặc giỏi Văn là tổng số học sinh giỏi Toán và giỏi Văn trừ đi số học sinh giỏi cả hai môn (vì đã được tính 2 lần):\n$15 + 20 - 12 = 23$ (học sinh).\n\nb) Số học sinh không giỏi Toán và cũng không giỏi Văn bằng tổng số học sinh cả lớp trừ đi số học sinh giỏi ít nhất 1 trong 2 môn:\n$50 - 23 = 27$ (học sinh).',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung_cao', question_type: 'tu_luan',
    tags: ['tập hợp', 'biểu đồ ven', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-30T08:00:00Z', updated_at: '2024-12-30T08:00:00Z',
  },
  {
    id: 'kntt-6-venn-02', question_code: 'BT063', content: 'Một lớp có $45$ học sinh, trong đó mỗi học sinh đều giỏi ít nhất một trong hai môn Toán hoặc Văn. Biết rằng có $30$ học sinh giỏi Toán, $25$ học sinh giỏi Văn. Hỏi lớp đó có bao nhiêu học sinh giỏi cả Toán lẫn Văn?',
    answer: '$10$ học sinh',
    solution: 'Vì mỗi học sinh đều giỏi ít nhất một trong hai môn nên tổng số học sinh của lớp chính là số học sinh giỏi Toán hoặc Văn.\nNếu cộng số học sinh giỏi Toán và số học sinh giỏi Văn, ta được:\n$30 + 25 = 55$ (học sinh)\nPhần dôi ra so với tổng số học sinh cả lớp chính là số học sinh được tính 2 lần (nghĩa là giỏi cả 2 môn).\nSố học sinh giỏi cả Toán lẫn Văn là:\n$55 - 45 = 10$ (học sinh).\nĐáp số: $10$ học sinh.',
    grade: 6, topic: 'so_hoc', difficulty: 'van_dung', question_type: 'tu_luan',
    tags: ['tập hợp', 'biểu đồ ven', 'toán thực tế'], user_id: 'demo-user-001', is_public: true, status: 'approved', category_id: 'cat-6-1',
    created_at: '2024-12-31T08:00:00Z', updated_at: '2024-12-31T08:00:00Z',
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
