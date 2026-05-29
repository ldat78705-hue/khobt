/**
 * Insert vao10 questions - Batch 2: Hình không gian (24 bài)
 * + Batch 3: Vi-ét (29 bài)
 * Includes teacher-solved answers for all questions
 */
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const CATEGORIES = {
  hinh_khong_gian: '0cb8da64-8b0c-4858-abdd-8a388f332f3e',
  viet: '36869657-c24e-4024-97b4-465e95d8f3e5',
};

// ===== HÌNH KHÔNG GIAN: ĐÁP ÁN CHI TIẾT =====
const HKG_ANSWERS = {
  1: `a) Thể tích đất đã đào:
\\(V = \\pi r^2 h = 3,14 \\cdot 0,6^2 \\cdot 8 = 3,14 \\cdot 0,36 \\cdot 8 \\approx 9,04\\) (m³).

b) Diện tích thành giếng:
\\(S_{xq} = 2\\pi r h = 2 \\cdot 3,14 \\cdot 0,6 \\cdot 8 \\approx 30,14\\) (m²).`,

  2: `a) Diện tích xung quanh:
\\(S_{xq} = 2\\pi r h = 2 \\cdot 3,14 \\cdot 3 \\cdot 25 = 471\\) (cm²).

b) Diện tích sơn được:
Mỗi vòng lăn phủ diện tích = \\(S_{xq} = 471\\) cm².
20 vòng: \\(S = 20 \\cdot 471 = 9420\\) (cm²) = 0,942 m².`,

  3: `Đường kính 1 m \\(\\Rightarrow r = 0,5\\) m.

a) Diện tích toàn phần:
\\(S_{tp} = 2\\pi r(r + h) = 2 \\cdot 3,14 \\cdot 0,5 \\cdot (0,5 + 1,5) = 2 \\cdot 3,14 \\cdot 0,5 \\cdot 2 \\approx 6,28\\) (m²).

b) Chiều cao nước: \\(h_n = \\frac{2}{3} \\cdot 1,5 = 1\\) (m).
\\(V = \\pi r^2 h_n = 3,14 \\cdot 0,25 \\cdot 1 \\approx 0,785\\) (m³) = 785 lít.`,

  4: `a) Diện tích xung quanh:
\\(S_{xq} = 2\\pi r h = 2 \\cdot 3,14 \\cdot 4 \\cdot 12 \\approx 301,44\\) (cm²).

b) Thể tích cốc: \\(V = \\pi r^2 h = 3,14 \\cdot 16 \\cdot 12 \\approx 602,88\\) (cm³).
Lượng nước: \\(V_n = 75\\% \\cdot 602,88 \\approx 452,16\\) (cm³).`,

  5: `a) Chu vi đáy: \\(C = 2\\pi r = 94,2\\) cm.
\\(r = \\frac{94,2}{2 \\cdot 3,14} = 15\\) (cm).

b) Đổi \\(h = 3,5\\) m = 350 cm.
\\(V = \\pi r^2 h = 3,14 \\cdot 15^2 \\cdot 350 = 3,14 \\cdot 225 \\cdot 350 \\approx 247275\\) (cm³).`,

  6: `Đường kính 60 cm \\(\\Rightarrow r = 30\\) cm.

a) \\(S = S_{xq} + S_{đáy} = 2\\pi r h + \\pi r^2 = \\pi r(2h + r) = 3,14 \\cdot 30 \\cdot (160 + 30) \\approx 17898\\) (cm²).

b) Chiều cao nước: \\(h_n = 80 - 15 = 65\\) (cm).
\\(V = \\pi r^2 h_n = 3,14 \\cdot 900 \\cdot 65 \\approx 183690\\) (cm³).`,

  7: `a) Diện tích nhãn giấy:
\\(S_{xq} = 2\\pi r h = 2 \\cdot 3,14 \\cdot 3,5 \\cdot 8 \\approx 175,84\\) (cm²).

b) Thể tích lon:
\\(V = \\pi r^2 h = 3,14 \\cdot 3,5^2 \\cdot 8 = 3,14 \\cdot 12,25 \\cdot 8 \\approx 307,72\\) (cm³).`,

  8: `a) Bể không nắp nên: \\(S = S_{xq} + S_{đáy} = 2\\pi r h + \\pi r^2\\).
\\(S = 3,14 \\cdot 15 \\cdot (2 \\cdot 40 + 15) = 3,14 \\cdot 15 \\cdot 95 \\approx 4474,5\\) (cm²).

b) Nước dâng từ 20 cm → 25 cm, tức thêm 5 cm.
\\(V_{đá} = \\pi r^2 \\cdot \\Delta h = 3,14 \\cdot 225 \\cdot 5 \\approx 3532,5\\) (cm³).`,

  9: `a) \\(V = \\pi r^2 h = 3,14 \\cdot 0,5^2 \\cdot 4 = 3,14 \\cdot 0,25 \\cdot 4 \\approx 3,14\\) (m³).

b) \\(S_{xq} = 2\\pi r h = 2 \\cdot 3,14 \\cdot 0,5 \\cdot 4 \\approx 12,56\\) (m²).
Chi phí: \\(12,56 \\cdot 25000 = 314000\\) (đồng).`,

  10: `Đổi \\(r = 40\\) cm = 0,4 m.

a) \\(V = \\pi r^2 h = 3,14 \\cdot 0,4^2 \\cdot 1,2 = 3,14 \\cdot 0,16 \\cdot 1,2 \\approx 0,603\\) (m³).

b) \\(S_{xq} = 2\\pi r h = 2 \\cdot 3,14 \\cdot 0,4 \\cdot 1,2 \\approx 3,014\\) (m²).`,

  11: `Đường kính 40 cm \\(\\Rightarrow r = 20\\) cm, \\(l = 30\\) cm.

a) \\(S_{xq} = \\pi r l = 3,14 \\cdot 20 \\cdot 30 \\approx 1884\\) (cm²).

b) 100 nón: \\(S = 100 \\cdot 1884 = 188400\\) (cm²) = 18,84 m².
Tiền: \\(18,84 \\cdot 50000 = 942000\\) (đồng).`,

  12: `\\(r = 3\\) cm, \\(l = 5\\) cm.

a) Theo Pythagore: \\(h = \\sqrt{l^2 - r^2} = \\sqrt{25 - 9} = 4\\) (cm).

b) \\(V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\cdot 3,14 \\cdot 9 \\cdot 4 \\approx 37,68\\) (cm³).`,

  13: `a) \\(C = 2\\pi r = 12,56\\) m.
\\(r = \\frac{12,56}{2 \\cdot 3,14} = 2\\) (m).

b) \\(V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\cdot 3,14 \\cdot 4 \\cdot 1,5 \\approx 6,28\\) (m³).
Khối lượng: \\(6,28 \\cdot 800 = 5024\\) (kg) = 5,024 tấn.`,

  14: `Đường kính 8 cm \\(\\Rightarrow r = 4\\) cm, \\(h = 9\\) cm.

a) \\(V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\cdot 3,14 \\cdot 16 \\cdot 9 \\approx 150,72\\) (cm³).

b) Đổi 2 lít = 2000 cm³. Thể tích 40 cốc: \\(40 \\cdot 150,72 = 6028,8\\) (cm³).
Vì \\(6028,8 > 2000\\) \\(\\Rightarrow\\) Không đủ.`,

  15: `Đường kính 4 m \\(\\Rightarrow r = 2\\) m, \\(h = 1,5\\) m.

a) \\(l = \\sqrt{h^2 + r^2} = \\sqrt{1,5^2 + 2^2} = \\sqrt{6,25} = 2,5\\) (m).

b) \\(S_{xq} = \\pi r l = 3,14 \\cdot 2 \\cdot 2,5 \\approx 15,7\\) (m²).`,

  16: `\\(V_{hộp} = \\pi \\cdot 10^2 \\cdot 20 = 2000\\pi\\) (cm³).
\\(V_{nón} = \\frac{1}{3}\\pi \\cdot 2^2 \\cdot 6 = 8\\pi\\) (cm³).
Tổng 250 nón: \\(250 \\cdot 8\\pi = 2000\\pi\\) (cm³).
\\(2000\\pi = 2000\\pi\\) \\(\\Rightarrow\\) Vừa đủ.`,

  17: `\\(V_{hộp} = 10 \\cdot 10 \\cdot 20 = 2000\\) (cm³).
\\(V_{bi} = \\frac{4}{3}\\pi \\cdot 1^3 = \\frac{4}{3} \\cdot 3,14 \\approx 4,187\\) (cm³).
Tổng 450 bi: \\(450 \\cdot 4,187 \\approx 1884\\) (cm³).
\\(1884 < 2000\\) \\(\\Rightarrow\\) Có đủ.`,

  18: `\\(V_{bồn} = \\pi \\cdot 2^2 \\cdot 5 = 20\\pi\\) (m³).
Thùng phuy: đk 50 cm \\(\\Rightarrow r = 0,25\\) m.
\\(V_{phuy} = \\pi \\cdot 0,25^2 \\cdot 1 = 0,0625\\pi\\) (m³).
Tổng 350 thùng: \\(350 \\cdot 0,0625\\pi = 21,875\\pi\\) (m³).
\\(21,875\\pi > 20\\pi\\) \\(\\Rightarrow\\) Không đủ.`,

  19: `\\(V_{nồi} = \\pi \\cdot 20^2 \\cdot 30 = 12000\\pi\\) (cm³).
Bát nửa cầu: đk 12 cm \\(\\Rightarrow r = 6\\) cm.
\\(V_{bát} = \\frac{2}{3}\\pi \\cdot 6^3 = 144\\pi\\) (cm³).
Tổng 80 bát: \\(80 \\cdot 144\\pi = 11520\\pi\\) (cm³).
\\(11520\\pi < 12000\\pi\\) \\(\\Rightarrow\\) Có đủ.`,

  20: `\\(V_{cát} = \\frac{1}{3}\\pi \\cdot 2^2 \\cdot 1,5 = 2\\pi\\) (m³).
\\(V_{xô} = \\pi \\cdot 0,2^2 \\cdot 0,4 = 0,016\\pi\\) (m³).
Tổng 120 xô: \\(120 \\cdot 0,016\\pi = 1,92\\pi\\) (m³).
\\(1,92\\pi < 2\\pi\\) \\(\\Rightarrow\\) Không chứa hết.`,

  21: `\\(V_{cầu} = \\frac{4}{3}\\pi \\cdot 15^3 = 4500\\pi\\) (cm³).
\\(V_{nến} = 5^3 = 125\\) (cm³).
Tổng 110 nến: \\(110 \\cdot 125 = 13750\\) (cm³).
\\(4500\\pi \\approx 4500 \\cdot 3,14 = 14130\\) (cm³).
\\(14130 > 13750\\) \\(\\Rightarrow\\) Có đủ.`,

  22: `\\(V_{bình} = \\pi \\cdot 12^2 \\cdot 40 = 5760\\pi\\) (cm³).
Cốc nón: đk 6 cm \\(\\Rightarrow r = 3\\) cm.
\\(V_{cốc} = \\frac{1}{3}\\pi \\cdot 9 \\cdot 8 = 24\\pi\\) (cm³).
Tổng 250 cốc: \\(250 \\cdot 24\\pi = 6000\\pi\\) (cm³).
\\(6000\\pi > 5760\\pi\\) \\(\\Rightarrow\\) Không đủ.`,

  23: `\\(V_{bể} = 2 \\cdot 1,5 \\cdot 1 = 3\\) (m³).
Bình tưới: \\(r = 0,1\\) m.
\\(V_{bình} = \\pi \\cdot 0,1^2 \\cdot 0,3 = 0,003\\pi\\) (m³).
Tổng 300 bình: \\(300 \\cdot 0,003\\pi = 0,9\\pi \\approx 2,826\\) (m³).
\\(2,826 < 3\\) \\(\\Rightarrow\\) Có đủ.`,

  24: `\\(V_{thùng} = \\frac{2}{3}\\pi \\cdot 1^3 = \\frac{2}{3}\\pi\\) (m³).
\\(V_{chai} = \\pi \\cdot 0,05^2 \\cdot 0,2 = 0,0005\\pi\\) (m³).
Tổng 1400 chai: \\(1400 \\cdot 0,0005\\pi = 0,7\\pi\\) (m³).
\\(\\frac{2}{3}\\pi \\approx 0,667\\pi < 0,7\\pi\\) \\(\\Rightarrow\\) Không đủ.`,
};

// ===== VI-ÉT: ĐÁP ÁN CHI TIẾT =====
const VIET_ANSWERS = {
  1: `PT \\(x^2 - 5x + 3 = 0\\). Theo Vi-ét: \\(S = x_1 + x_2 = 5\\), \\(P = x_1 x_2 = 3\\).
Điều kiện: \\(x_2 \\neq 0 \\Leftrightarrow P \\neq 0\\) (đúng).
Nhân chéo: \\(41 - mx_1^2 = x_1 x_2 + mx_2^2\\).
\\(\\Leftrightarrow 41 = mx_1^2 + mx_2^2 + x_1 x_2 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = S^2 - 2P = 25 - 6 = 19\\).
\\(41 = 19m + 3 \\Leftrightarrow 19m = 38 \\Leftrightarrow m = 2\\).`,

  2: `PT \\(x^2 + 4x - 2 = 0\\). Theo Vi-ét: \\(S = -4\\), \\(P = -2\\).
Nhân chéo: \\(18 - mx_2^2 = x_1 x_2 + mx_1^2\\).
\\(18 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 16 + 4 = 20\\).
\\(18 = 20m - 2 \\Leftrightarrow 20m = 20 \\Leftrightarrow m = 1\\).`,

  3: `PT \\(x^2 - 6x + 4 = 0\\). Theo Vi-ét: \\(S = 6\\), \\(P = 4\\).
Nhân chéo: \\(mx_1^2 - 24 = x_1 x_2 - mx_2^2\\).
\\(m(x_1^2 + x_2^2) = 24 + P = 28\\).
\\(x_1^2 + x_2^2 = 36 - 8 = 28\\).
\\(28m = 28 \\Leftrightarrow m = 1\\).`,

  4: `PT \\(x^2 + 7x + 5 = 0\\). Theo Vi-ét: \\(S = -7\\), \\(P = 5\\).
Nhân chéo: \\(83 - mx_1^2 = x_1 x_2 + mx_2^2\\).
\\(83 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 49 - 10 = 39\\).
\\(83 = 39m + 5 \\Leftrightarrow 39m = 78 \\Leftrightarrow m = 2\\).`,

  5: `PT \\(x^2 - 3x - 7 = 0\\). Theo Vi-ét: \\(S = 3\\), \\(P = -7\\).
Nhân chéo: \\(62 - mx_2^2 = x_1 x_2 + mx_1^2\\).
\\(62 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 9 + 14 = 23\\).
\\(62 = 23m - 7 \\Leftrightarrow 23m = 69 \\Leftrightarrow m = 3\\).`,

  6: `PT \\(x^2 + 5x - 4 = 0\\). \\(\\Delta = 25 + 16 = 41 > 0\\): có 2 nghiệm pb.
\\(S = -5\\), \\(P = -4\\).
Nhân chéo: \\(mx_1^2 - 70 = x_1 x_2 - mx_2^2\\).
\\(m(x_1^2 + x_2^2) = 70 + P = 66\\).
\\(x_1^2 + x_2^2 = 25 + 8 = 33\\).
\\(33m = 66 \\Leftrightarrow m = 2\\).`,

  7: `PT \\(x^2 - 8x + 9 = 0\\). \\(S = 8\\), \\(P = 9\\).
\\(32 - mx_1^2 = x_1 x_2 + mx_2^2\\).
\\(32 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 64 - 18 = 46\\).
\\(32 = 46m + 9 \\Leftrightarrow 46m = 23 \\Leftrightarrow m = \\frac{1}{2}\\).`,

  8: `PT \\(x^2 + 6x - 5 = 0\\). \\(S = -6\\), \\(P = -5\\).
\\(41 - mx_2^2 = x_1 x_2 + mx_1^2\\).
\\(41 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 36 + 10 = 46\\).
\\(41 = 46m - 5 \\Leftrightarrow 46m = 46 \\Leftrightarrow m = 1\\).`,

  9: `PT \\(x^2 - 2x - 6 = 0\\). \\(\\Delta' = 1 + 6 = 7 > 0\\).
\\(S = 2\\), \\(P = -6\\).
\\(26 - mx_1^2 = x_1 x_2 + mx_2^2\\).
\\(26 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 4 + 12 = 16\\).
\\(26 = 16m - 6 \\Leftrightarrow 16m = 32 \\Leftrightarrow m = 2\\).`,

  10: `PT \\(x^2 + 3x - 1 = 0\\). \\(S = -3\\), \\(P = -1\\).
\\(mx_1^2 - 34 = x_1 x_2 - mx_2^2\\).
\\(m(x_1^2 + x_2^2) = 34 + P = 33\\).
\\(x_1^2 + x_2^2 = 9 + 2 = 11\\).
\\(11m = 33 \\Leftrightarrow m = 3\\).`,

  11: `PT \\(x^2 + 5x - 6 = 0\\). \\(S = -5\\), \\(P = -6\\).
\\(68 - mx_1^2 = x_1 x_2 + mx_2^2\\).
\\(68 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 25 + 12 = 37\\).
\\(68 = 37m - 6 \\Leftrightarrow 37m = 74 \\Leftrightarrow m = 2\\).`,

  12: `PT \\(x^2 - 4x - 5 = 0\\). \\(S = 4\\), \\(P = -5\\).
\\(21 - mx_2^2 = x_1 x_2 + mx_1^2\\).
\\(21 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 16 + 10 = 26\\).
\\(21 = 26m - 5 \\Leftrightarrow 26m = 26 \\Leftrightarrow m = 1\\).`,

  13: `PT \\(x^2 - 7x - 3 = 0\\). \\(S = 7\\), \\(P = -3\\).
\\(mx_1^2 - 58 = x_1 x_2 - mx_2^2\\).
\\(m(x_1^2 + x_2^2) = 58 + P = 55\\).
\\(x_1^2 + x_2^2 = 49 + 6 = 55\\).
\\(55m = 55 \\Leftrightarrow m = 1\\).`,

  14: `PT \\(x^2 + 8x + 2 = 0\\). \\(S = -8\\), \\(P = 2\\).
\\(32 - mx_1^2 = x_1 x_2 + mx_2^2\\).
\\(32 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 64 - 4 = 60\\).
\\(32 = 60m + 2 \\Leftrightarrow 60m = 30 \\Leftrightarrow m = \\frac{1}{2}\\).`,

  15: `PT \\(x^2 - 2x - 4 = 0\\). \\(S = 2\\), \\(P = -4\\).
\\(32 - mx_2^2 = x_1 x_2 + mx_1^2\\).
\\(32 = m(x_1^2 + x_2^2) + P\\).
\\(x_1^2 + x_2^2 = 4 + 8 = 12\\).
\\(32 = 12m - 4 \\Leftrightarrow 12m = 36 \\Leftrightarrow m = 3\\).`,

  16: `PT \\(x^2 - 7x + 2 = 0\\). \\(S = 7\\), \\(P = 2\\).
\\(m(x_1^2 + x_2^2) + P \\cdot S = 100\\).
\\(x_1^2 + x_2^2 = 49 - 4 = 45\\).
\\(45m + 2 \\cdot 7 = 100 \\Leftrightarrow 45m = 86 \\Leftrightarrow m = \\frac{86}{45}\\).`,

  17: `PT \\(x^2 - 3x - 5 = 0\\). \\(S = 3\\), \\(P = -5\\).
Nhân chéo: \\(mx_1^2 - 12 = x_1 x_2 - mx_2^2\\).
\\(m(x_1^2 + x_2^2) = 12 + P = 7\\).
\\(x_1^2 + x_2^2 = 9 + 10 = 19\\).
\\(19m = 7 \\Leftrightarrow m = \\frac{7}{19}\\).`,

  18: `PT \\(x^2 + 4x - 6 = 0\\). \\(\\Delta' = 4 + 6 = 10 > 0\\).
\\(S = -4\\), \\(P = -6\\).
\\(x_1 + mx_2 = \\frac{30 - mx_1^2}{x_2}\\).
Nhân chéo: \\(x_1 x_2 + mx_2^2 = 30 - mx_1^2\\).
\\(P + m(x_1^2 + x_2^2) = 30\\).
\\(x_1^2 + x_2^2 = 16 + 12 = 28\\).
\\(-6 + 28m = 30 \\Leftrightarrow 28m = 36 \\Leftrightarrow m = \\frac{9}{7}\\).`,

  19: `PT \\(x^2 - (m+5)x - m + 6 = 0\\). \\(S = m + 5\\), \\(P = -m + 6\\).
\\(\\Delta \\geq 0\\): \\((m+5)^2 + 4(m-6) \\geq 0 \\Leftrightarrow m^2 + 14m + 1 \\geq 0\\) (luôn đúng với \\(m \\leq -7 - 4\\sqrt{3}\\) hoặc \\(m \\geq -7 + 4\\sqrt{3}\\)).
\\(x_1^2 x_2 + x_1 x_2^2 = x_1 x_2(x_1 + x_2) = P \\cdot S = (-m+6)(m+5) = 24\\).
\\(-m^2 - 5m + 6m + 30 = 24 \\Leftrightarrow -m^2 + m + 6 = 0 \\Leftrightarrow m^2 - m - 6 = 0\\).
\\(m = 3\\) hoặc \\(m = -2\\). Thử lại: cả hai TMĐK.`,

  20: `PT \\(x^2 - (m+5)x - m + 6 = 0\\). \\(S = m + 5\\), \\(P = -m + 6\\).
Hệ: \\(\\begin{cases} x_1 + x_2 = m + 5 \\\\ 2x_1 + x_2 = 7 \\end{cases}\\).
\\(\\Rightarrow x_1 = 7 - (m+5) = 2 - m\\), \\(x_2 = m + 5 - (2-m) = 2m + 3\\).
Thế vào \\(P\\): \\((2-m)(2m+3) = -m + 6\\).
\\(4m + 6 - 2m^2 - 3m = -m + 6\\).
\\(-2m^2 + 2m = 0 \\Leftrightarrow m = 0\\) hoặc \\(m = 1\\).`,

  21: `PT \\(x^2 - mx + m - 2 = 0\\). \\(S = m\\), \\(P = m - 2\\).
Hệ: \\(\\begin{cases} x_1 + x_2 = m \\\\ x_1 + 2x_2 = 4 \\end{cases}\\).
\\(\\Rightarrow x_2 = 4 - m\\), \\(x_1 = m - (4-m) = 2m - 4\\).
Thế vào \\(P\\): \\((2m-4)(4-m) = m - 2\\).
\\(8m - 2m^2 - 16 + 4m = m - 2\\).
\\(-2m^2 + 11m - 14 = 0 \\Leftrightarrow 2m^2 - 11m + 14 = 0\\).
\\(m = 2\\) hoặc \\(m = \\frac{7}{2}\\).`,

  22: `PT \\(x^2 - 6x + m + 1 = 0\\). \\(S = 6\\), \\(P = m + 1\\).
\\(\\Delta \\geq 0\\): \\(36 - 4(m+1) \\geq 0 \\Leftrightarrow m \\leq 8\\).
\\((x_1 - x_2)^2 = S^2 - 4P = 36 - 4(m+1) = 32 - 4m\\).
\\(x_1 - x_2 = 2 \\Rightarrow (x_1 - x_2)^2 = 4\\).
\\(32 - 4m = 4 \\Leftrightarrow m = 7\\). (TMĐK)`,

  23: `PT \\(x^2 - (2m-1)x + m^2 - 1 = 0\\). \\(S = 2m-1\\), \\(P = m^2-1\\).
\\(\\Delta > 0\\): \\((2m-1)^2 - 4(m^2-1) > 0 \\Leftrightarrow -4m + 5 > 0 \\Leftrightarrow m < \\frac{5}{4}\\).
\\((x_1 - x_2)^2 = S^2 - 4P = (2m-1)^2 - 4(m^2-1) = -4m + 5\\).
\\(x_1 - x_2 = 3 \\Rightarrow 9 = -4m + 5 \\Leftrightarrow m = -1\\). (TM \\(m < \\frac{5}{4}\\))`,

  24: `PT \\(x^2 - 4x + m - 1 = 0\\). \\(S = 4\\), \\(P = m - 1\\).
Vì \\(x_1\\) là nghiệm: \\(x_1^2 = 4x_1 - (m-1)\\).
\\(x_1^2 - 3x_1 + x_2 = 4x_1 - m + 1 - 3x_1 + x_2 = x_1 + x_2 - m + 1 = 6\\).
\\(4 - m + 1 = 6 \\Leftrightarrow m = -1\\).
Kiểm tra \\(\\Delta \\geq 0\\): \\(16 + 4 \\cdot 2 = 24 > 0\\). TMĐK.`,

  25: `PT \\(x^2 - 2x + m - 3 = 0\\). \\(S = 2\\), \\(P = m - 3\\).
Hạ bậc: \\(x_1^2 = 2x_1 - (m-3)\\).
\\(x_1^2 - x_1 + x_2 = 2x_1 - m + 3 - x_1 + x_2 = x_1 + x_2 - m + 3 = 8\\).
\\(2 - m + 3 = 8 \\Leftrightarrow m = -3\\).
Kiểm tra \\(\\Delta \\geq 0\\): \\(4 + 4 \\cdot 6 = 28 > 0\\). TMĐK.`,

  26: `PT \\(x^2 - (m+1)x + m = 0\\). \\(S = m+1\\), \\(P = m\\).
\\(\\Delta > 0\\): \\((m+1)^2 - 4m > 0 \\Leftrightarrow (m-1)^2 > 0 \\Leftrightarrow m \\neq 1\\).
Hạ bậc: \\(x_1^2 = (m+1)x_1 - m\\), tương tự \\(x_2^2 = (m+1)x_2 - m\\).
\\(x_1^2 - (m+1)x_1 + x_2^2 - (m+1)x_2 = -m + (-m) = -2m = 4\\).
\\(m = -2\\). (TM \\(m \\neq 1\\))`,

  27: `PT \\(x^2 - 5x + m - 2 = 0\\). \\(S = 5\\), \\(P = m - 2\\).
ĐK: \\(\\Delta \\geq 0\\) và \\(x_1, x_2 \\geq 0\\): \\(S > 0\\), \\(P \\geq 0 \\Leftrightarrow m \\geq 2\\) và \\(\\Delta = 25 - 4(m-2) \\geq 0 \\Leftrightarrow m \\leq \\frac{33}{4}\\).
Đặt \\(t = \\sqrt{x_1} + \\sqrt{x_2} = 3\\).
\\(t^2 = x_1 + x_2 + 2\\sqrt{x_1 x_2} = S + 2\\sqrt{P}\\).
\\(9 = 5 + 2\\sqrt{m-2} \\Leftrightarrow \\sqrt{m-2} = 2 \\Leftrightarrow m = 6\\). (TMĐK)`,

  28: `PT \\(x^2 - 2(m+1)x + m^2 - 1 = 0\\). \\(S = 2(m+1)\\), \\(P = m^2-1\\).
\\(\\Delta' > 0\\): \\((m+1)^2 - (m^2-1) > 0 \\Leftrightarrow 2m + 2 > 0 \\Leftrightarrow m > -1\\).
\\(|x_1 - x_2|^2 = (x_1 - x_2)^2 = S^2 - 4P = 4(m+1)^2 - 4(m^2-1) = 8m + 8\\).
\\(|x_1 - x_2| = 4 \\Rightarrow 8m + 8 = 16 \\Leftrightarrow m = 1\\). (TMĐK)`,

  29: `PT \\(x^2 - (m+1)x + m - 4 = 0\\). \\(S = m+1\\), \\(P = m-4\\).
\\(\\Delta \\geq 0\\): \\((m+1)^2 - 4(m-4) \\geq 0 \\Leftrightarrow m^2 - 2m + 17 \\geq 0\\) (luôn đúng).
\\(A = x_1^2 + x_2^2 - x_1 x_2 = S^2 - 3P = (m+1)^2 - 3(m-4) = m^2 - m + 13\\).
\\(A = \\left(m - \\frac{1}{2}\\right)^2 + \\frac{51}{4} \\geq \\frac{51}{4}\\).
\\(A_{min} = \\frac{51}{4}\\) khi \\(m = \\frac{1}{2}\\).`,
};

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  const admins = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  const adminId = admins[0].id;
  console.log('Admin:', adminId);

  const data = JSON.parse(fs.readFileSync('tailieu/vao10/parsed_latex_questions.json', 'utf-8'));

  // ========== HÌNH KHÔNG GIAN ==========
  console.log('\n=== Inserting Hình không gian ===');
  const hkg = data.hinh_khong_gian;
  let inserted = 0;
  for (const q of hkg.questions) {
    const num = q.bai_num;
    const code = `V10-HKG-${String(num).padStart(3, '0')}`;
    
    const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${code} LIMIT 1`;
    if (existing.length > 0) { console.log(`  SKIP ${code}`); continue; }

    let fullContent = q.content;
    if (q.parts.length > 0) fullContent += '\n' + q.parts.join('\n');
    
    const answer = HKG_ANSWERS[num] || '';
    const difficulty = num <= 15 ? 'van_dung' : 'van_dung_cao';
    
    try {
      await sql`INSERT INTO public.questions (
        content, answer, solution, grade, topic, difficulty, question_type,
        user_id, category_id, is_public, status, question_code
      ) VALUES (
        ${fullContent}, ${answer}, ${answer},
        9, 'hinh_hoc', ${difficulty}, 'tu_luan',
        ${adminId}, ${CATEGORIES.hinh_khong_gian}, false, 'approved', ${code}
      )`;
      inserted++;
      console.log(`  ✅ Bài ${num} (${code}): ${difficulty}`);
    } catch (err) {
      console.error(`  ❌ Bài ${num}: ${err.message}`);
    }
  }
  console.log(`Hình KG: inserted=${inserted}`);

  // ========== VI-ÉT ==========
  console.log('\n=== Inserting Vi-ét ===');
  const viet = data.viet;
  inserted = 0;
  for (const q of viet.questions) {
    const num = q.bai_num;
    const code = `V10-VIE-${String(num).padStart(3, '0')}`;
    
    const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${code} LIMIT 1`;
    if (existing.length > 0) { console.log(`  SKIP ${code}`); continue; }

    const answer = VIET_ANSWERS[num] || '';
    // Bài 1-15: Phân thức bất đối xứng (VDC), Bài 16-19: đối xứng (VD), 20-29: các dạng nâng cao (VDC)
    const difficulty = (num >= 16 && num <= 19) ? 'van_dung' : 'van_dung_cao';
    
    try {
      await sql`INSERT INTO public.questions (
        content, answer, solution, grade, topic, difficulty, question_type,
        user_id, category_id, is_public, status, question_code
      ) VALUES (
        ${q.content}, ${answer}, ${answer},
        9, 'phuong_trinh', ${difficulty}, 'tu_luan',
        ${adminId}, ${CATEGORIES.viet}, false, 'approved', ${code}
      )`;
      inserted++;
      console.log(`  ✅ Bài ${num} (${code}): ${difficulty}`);
    } catch (err) {
      console.error(`  ❌ Bài ${num}: ${err.message}`);
    }
  }
  console.log(`Vi-ét: inserted=${inserted}`);
  
  console.log('\n=== DONE ===');
}

main().catch(console.error);
