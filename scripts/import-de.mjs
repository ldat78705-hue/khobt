/**
 * Import bài tập từ thư mục "de" vào database qua API /api/questions
 * Chạy: node scripts/import-de.mjs
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DE_DIR = 'd:/khode/de';
const API_BASE = process.env.API_URL || 'http://localhost:3000';

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

// Parse markdown file into individual exercises
function parseExercises(content, topic) {
  const exercises = [];
  // Split by "**Bài X.**" pattern
  const parts = content.split(/(?=\*\*Bài \d+\.\*\*)/);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith('**Bài')) continue;

    // Extract exercise number and code
    const numMatch = trimmed.match(/\*\*Bài (\d+)\.\*\*/);
    const codeMatch = trimmed.match(/\[([A-Z]+-\d+)\]/);
    const sourceMatch = trimmed.match(/\*\(Nguồn:\s*(.+?)\)\*/);

    if (!numMatch) continue;

    const num = parseInt(numMatch[1]);
    const code = codeMatch ? codeMatch[1] : `${topic.toUpperCase().substring(0,2)}-${String(num).padStart(3,'0')}`;
    const source = sourceMatch ? sourceMatch[1] : '';

    // Clean content: remove the "**Bài X.** [CODE] *(Nguồn: ...)* " header line
    let exerciseContent = trimmed
      .replace(/\*\*Bài \d+\.\*\*\s*\[[^\]]+\]\s*(\*\([^)]+\)\*)?\s*\n?/, '')
      .replace(/^---\s*$/gm, '')
      .trim();

    // If content starts with \r\n or \n, remove leading newlines
    exerciseContent = exerciseContent.replace(/^[\r\n]+/, '').trim();

    if (!exerciseContent || exerciseContent.length < 10) continue;

    // Determine difficulty based on content complexity
    let difficulty = 'thong_hieu'; // default
    if (exerciseContent.includes('Chứng minh') || exerciseContent.includes('Tìm giá trị') ||
        exerciseContent.includes('đạt giá trị') || exerciseContent.includes('So sánh')) {
      difficulty = 'van_dung';
    }
    if (exerciseContent.includes('giá trị lớn nhất') || exerciseContent.includes('giá trị nhỏ nhất') ||
        exerciseContent.includes('nguyên') && exerciseContent.includes('để')) {
      difficulty = 'van_dung_cao';
    }
    if (exerciseContent.includes('Lập bảng tần số') || exerciseContent.includes('Tính tần số') ||
        exerciseContent.includes('Liệt kê')) {
      difficulty = 'nhan_biet';
    }

    exercises.push({
      num,
      code,
      source,
      content: exerciseContent,
      topic,
      difficulty,
      grade: 9,
      question_type: 'tu_luan',
      tags: [TOPIC_LABEL[topic], source].filter(Boolean),
    });
  }

  return exercises;
}

// Generate answer for each exercise based on content analysis
function generateAnswer(exercise) {
  const { content, topic } = exercise;
  
  // For statistics exercises
  if (topic === 'thong_ke') {
    if (content.includes('tần số tương đối')) {
      return 'Tần số tương đối = Tần số / Tổng số phần tử. Lập bảng theo yêu cầu đề bài.';
    }
    if (content.includes('Lập bảng tần số')) {
      return 'Đếm số lần xuất hiện của mỗi giá trị hoặc nhóm → Lập bảng tần số.';
    }
    return 'Xem lời giải chi tiết.';
  }
  
  // For probability exercises  
  if (topic === 'xac_suat') {
    if (content.includes('xúc xắc')) {
      return 'Liệt kê không gian mẫu → Đếm kết quả thuận lợi → $P(A) = \\frac{\\text{số kết quả thuận lợi}}{\\text{tổng số kết quả}}$.';
    }
    if (content.includes('ngẫu nhiên')) {
      return 'Xác định không gian mẫu → Liệt kê/Đếm kết quả thuận lợi → Áp dụng công thức xác suất cổ điển.';
    }
    return 'Áp dụng công thức xác suất cổ điển: $P(A) = \\frac{m}{n}$.';
  }
  
  // For expression simplification
  if (topic === 'bieu_thuc') {
    if (content.includes('Rút gọn') || content.includes('Chứng minh')) {
      return 'Quy đồng mẫu → Rút gọn → Kết luận.';
    }
    if (content.includes('giá trị lớn nhất') || content.includes('giá trị nhỏ nhất')) {
      return 'Rút gọn biểu thức → Biến đổi → Áp dụng BĐT hoặc khảo sát hàm số.';
    }
    return 'Xem lời giải chi tiết.';
  }
  
  return 'Xem lời giải chi tiết.';
}

async function importExercises(exercises, dryRun = false) {
  let success = 0;
  let failed = 0;
  
  for (const ex of exercises) {
    const answer = generateAnswer(ex);
    
    const payload = {
      content: ex.content,
      answer: answer,
      grade: ex.grade,
      topic: ex.topic,
      difficulty: ex.difficulty,
      question_type: ex.question_type,
      tags: ex.tags,
      status: 'approved',
      is_public: true,
    };
    
    if (dryRun) {
      console.log(`  [DRY] ${ex.code}: ${ex.content.substring(0, 60)}...`);
      success++;
      continue;
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/questions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cookie': process.env.AUTH_COOKIE || '',
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        success++;
        if (success % 20 === 0) console.log(`  ✅ Đã import ${success} bài...`);
      } else {
        const err = await res.text();
        console.error(`  ❌ ${ex.code}: ${err}`);
        failed++;
      }
    } catch (err) {
      console.error(`  ❌ ${ex.code}: ${err.message}`);
      failed++;
    }
  }
  
  return { success, failed };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  
  console.log('🚀 Import bài tập từ thư mục "de" vào KhoĐềToán\n');
  if (dryRun) console.log('⚠️  CHẾ ĐỘ DRY-RUN: Không ghi vào DB\n');
  
  const files = readdirSync(DE_DIR).filter(f => f.endsWith('.md'));
  
  let allExercises = [];
  
  for (const file of files) {
    const topic = TOPIC_MAP[file];
    if (!topic) {
      console.log(`⚠️  Bỏ qua file không rõ topic: ${file}`);
      continue;
    }
    
    const content = readFileSync(join(DE_DIR, file), 'utf-8');
    const exercises = parseExercises(content, topic);
    
    console.log(`📄 ${file}: ${exercises.length} bài → topic: ${TOPIC_LABEL[topic]}`);
    allExercises.push(...exercises);
  }
  
  console.log(`\n📊 Tổng cộng: ${allExercises.length} bài tập\n`);
  
  const { success, failed } = await importExercises(allExercises, dryRun);
  
  console.log(`\n✅ Thành công: ${success}`);
  console.log(`❌ Thất bại: ${failed}`);
  console.log(`📊 Tổng: ${success + failed}`);
}

main().catch(console.error);
