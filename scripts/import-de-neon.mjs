/**
 * Import bài tập từ thư mục "de" trực tiếp vào Neon DB
 * Chạy: node scripts/import-de-neon.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';

// Load .env.local
config({ path: '.env.local' });

const DE_DIR = 'd:/khode/de';

// Dynamically import neon
const { neon } = await import('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Map filename to topic
const TOPIC_MAP = {
  '1_Thong_ke_LaTeX.md': 'thong_ke',
  '2_Xac_suat_LaTeX.md': 'xac_suat',
  '3_Rut_gon_LaTeX.md': 'bieu_thuc',
  '4A_Viet_LaTeX.md': 'pt_bpt',
  '4B_Lap_PT_LaTeX.md': 'pt_bpt',
  '5_Hinh_khong_gian_LaTeX.md': 'hinh_khong_gian',
  '6_Hinh_phang_LaTeX.md': 'hinh_hoc',
};

const TOPIC_LABEL = {
  'thong_ke': 'Thống kê',
  'xac_suat': 'Xác suất',
  'bieu_thuc': 'Rút gọn biểu thức',
  'pt_bpt': 'Phương trình',
  'hinh_khong_gian': 'Hình không gian',
  'hinh_hoc': 'Hình phẳng',
};

function parseExercises(content, topic) {
  const exercises = [];
  const parts = content.split(/(?=\*\*Bài \d+\.\*\*)/);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith('**Bài')) continue;

    const numMatch = trimmed.match(/\*\*Bài (\d+)\.\*\*/);
    const codeMatch = trimmed.match(/\[([A-Z]+-\d+)\]/);
    const sourceMatch = trimmed.match(/\*\(Nguồn:\s*(.+?)\)\*/);

    if (!numMatch) continue;

    const num = parseInt(numMatch[1]);
    const code = codeMatch ? codeMatch[1] : null;
    const source = sourceMatch ? sourceMatch[1] : '';

    // Remove header line
    let exerciseContent = trimmed
      .replace(/\*\*Bài \d+\.\*\*\s*(\[[^\]]+\])?\s*(\*\([^)]+\)\*)?\s*\r?\n?/, '')
      .replace(/^---\s*$/gm, '')
      .trim()
      .replace(/^[\r\n]+/, '')
      .trim();

    if (!exerciseContent || exerciseContent.length < 10) continue;

    // Determine difficulty
    let difficulty = 'thong_hieu';
    if (exerciseContent.includes('Chứng minh') || exerciseContent.includes('Tìm giá trị') ||
        exerciseContent.includes('đạt giá trị') || exerciseContent.includes('So sánh')) {
      difficulty = 'van_dung';
    }
    if (exerciseContent.includes('giá trị lớn nhất') || exerciseContent.includes('giá trị nhỏ nhất') ||
        (exerciseContent.includes('nguyên') && exerciseContent.includes('để'))) {
      difficulty = 'van_dung_cao';
    }
    if (exerciseContent.includes('Lập bảng tần số') || exerciseContent.includes('Tính tần số') ||
        exerciseContent.includes('Liệt kê') || exerciseContent.includes('Tính giá trị')) {
      difficulty = 'nhan_biet';
    }

    exercises.push({
      num, code, source, content: exerciseContent, topic, difficulty,
      grade: 9, question_type: 'tu_luan',
      tags: [TOPIC_LABEL[topic], source].filter(Boolean),
    });
  }
  return exercises;
}

function generateAnswer(ex) {
  const { content, topic } = ex;
  if (topic === 'thong_ke') {
    if (content.includes('tần số tương đối')) return 'Tần số tương đối = Tần số / Tổng. Lập bảng theo yêu cầu.';
    if (content.includes('Lập bảng tần số')) return 'Đếm tần số từng giá trị/nhóm → Lập bảng.';
    return 'Xem đáp án chi tiết.';
  }
  if (topic === 'xac_suat') {
    return 'Áp dụng công thức xác suất cổ điển: $P(A) = \\frac{m}{n}$ với $m$ là số kết quả thuận lợi, $n$ là tổng số kết quả.';
  }
  if (topic === 'bieu_thuc') {
    if (content.includes('Tính giá trị')) return 'Thay giá trị vào biểu thức → Tính toán → Kết luận.';
    if (content.includes('Rút gọn') || content.includes('Chứng minh')) return 'Phân tích → Quy đồng mẫu → Rút gọn → Kết luận.';
    return 'Rút gọn biểu thức → Giải theo yêu cầu.';
  }
  if (topic === 'pt_bpt') {
    if (content.includes('hệ phương trình') || content.includes('lập phương trình'))
      return 'Gọi ẩn → Lập phương trình (hệ) → Giải → Kết luận.';
    return 'Viết phương trình đường thẳng/parabol theo yêu cầu.';
  }
  if (topic === 'hinh_khong_gian') {
    if (content.includes('thể tích')) return 'Áp dụng công thức tính thể tích hình khối tương ứng.';
    if (content.includes('diện tích')) return 'Áp dụng công thức tính diện tích bề mặt.';
    return 'Áp dụng công thức hình không gian tương ứng.';
  }
  if (topic === 'hinh_hoc') {
    if (content.includes('Chứng minh')) return 'Sử dụng tính chất hình học → Chứng minh theo yêu cầu.';
    if (content.includes('Tính')) return 'Áp dụng các định lý hình học → Tính toán.';
    return 'Xem lời giải chi tiết.';
  }
  return 'Xem đáp án chi tiết.';
}

async function main() {
  console.log('🚀 Import bài tập từ thư mục "de" trực tiếp vào Neon DB\n');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ Thiếu DATABASE_URL trong .env.local');
    process.exit(1);
  }

  // Get admin user ID
  const users = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  if (!users.length) {
    console.error('❌ Không tìm thấy admin user');
    process.exit(1);
  }
  const adminUserId = users[0].id;
  console.log(`👤 Admin user: ${adminUserId}\n`);

  const files = readdirSync(DE_DIR).filter(f => f.endsWith('.md'));
  let allExercises = [];

  for (const file of files) {
    const topic = TOPIC_MAP[file];
    if (!topic) continue;
    const content = readFileSync(join(DE_DIR, file), 'utf-8');
    const exercises = parseExercises(content, topic);
    console.log(`📄 ${file}: ${exercises.length} bài → ${TOPIC_LABEL[topic]}`);
    allExercises.push(...exercises);
  }

  console.log(`\n📊 Tổng: ${allExercises.length} bài tập. Bắt đầu import...\n`);

  let success = 0, failed = 0;

  for (const ex of allExercises) {
    const answer = generateAnswer(ex);
    try {
      await sql`
        INSERT INTO public.questions (
          id, content, answer, grade, topic, difficulty, question_type,
          tags, user_id, is_public, status, question_code, created_at, updated_at
        ) VALUES (
          ${randomUUID()}, ${ex.content}, ${answer}, ${ex.grade}, ${ex.topic},
          ${ex.difficulty}, ${ex.question_type}, ${ex.tags}, ${adminUserId},
          true, 'approved', ${ex.code}, NOW(), NOW()
        )
      `;
      success++;
      if (success % 50 === 0) console.log(`  ✅ ${success}/${allExercises.length}...`);
    } catch (err) {
      console.error(`  ❌ ${ex.code || ex.num}: ${err.message?.substring(0, 80)}`);
      failed++;
    }
  }

  console.log(`\n🏁 HOÀN TẤT!`);
  console.log(`  ✅ Thành công: ${success}`);
  console.log(`  ❌ Thất bại: ${failed}`);
  console.log(`  📊 Tổng: ${success + failed}`);
}

main().catch(console.error);
