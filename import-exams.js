/**
 * Script nhập 50 đề thi tự luận Hà Nội vào database Neon
 * V2: Không upload ảnh (WMF không support), lưu toàn bộ đề dưới dạng HTML
 * Tách đúng phần đề bài vs đáp án bằng cách dùng 2 lần xuất hiện "Câu I"
 */

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { neon } = require('@neondatabase/serverless');

// CONFIG
const ENV_LINES = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8').split(/\r?\n/);
function getEnv(key) {
  for (const line of ENV_LINES) {
    if (line.startsWith(key + '=')) {
      let val = line.substring(key.length + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      return val;
    }
  }
  return '';
}

const sql = neon(getEnv('DATABASE_URL'));
const EXAM_DIR = path.join(__dirname, '50 De TL HN');
const ADMIN_EMAIL = 'lienhe@thaydat.edu.vn';

// ==========================================
// PARSE DOCX → HTML (keep images inline as base64)
// ==========================================
async function parseDocx(filePath) {
  const result = await mammoth.convertToHtml(
    { path: filePath },
    {
      convertImage: mammoth.images.imgElement(async function(image) {
        const data = await image.read('base64');
        const ct = image.contentType || 'image/png';
        if (data.length < 100) return { src: '' };
        return { src: `data:${ct};base64,${data}` };
      })
    }
  );
  return result.value;
}

// ==========================================
// SPLIT into exam questions (Câu I-V) + answers
// ==========================================
function splitIntoQuestions(html) {
  // Find all "Câu X" positions
  const cauRegex = /(?:<[^>]*>)*\s*(?:<strong>)?\s*Câu\s+([IVX]+)\s*[:.)]?\s*(?:\([^)]*\))?\s*(?:<\/strong>)?/gi;
  const allMatches = [];
  let m;
  while ((m = cauRegex.exec(html)) !== null) {
    allMatches.push({ index: m.index, end: m.index + m[0].length, label: m[1], fullMatch: m[0] });
  }
  
  if (allMatches.length === 0) {
    return { questions: [], answers: [] };
  }
  
  // Find where "Câu I" appears the second time → that's the answer section start
  const cauIPositions = allMatches.filter(m => m.label.toUpperCase() === 'I');
  
  let examMatches, answerMatches;
  if (cauIPositions.length >= 2) {
    const splitPoint = cauIPositions[1].index;
    examMatches = allMatches.filter(m => m.index < splitPoint);
    answerMatches = allMatches.filter(m => m.index >= splitPoint);
  } else {
    // No answer section found — all are exam questions
    examMatches = allMatches;
    answerMatches = [];
  }
  
  // Extract content between each Câu marker
  function extractContent(matches, fullHtml) {
    const items = [];
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].end;
      const end = i < matches.length - 1 ? matches[i + 1].index : 
                  (matches === examMatches && answerMatches.length > 0 ? answerMatches[0].index : fullHtml.length);
      const content = fullHtml.substring(start, end).trim();
      items.push({
        label: `Câu ${matches[i].label}`,
        html: content,
        text: htmlToText(content),
      });
    }
    return items;
  }
  
  return {
    questions: extractContent(examMatches, html),
    answers: extractContent(answerMatches, html),
  };
}

// ==========================================
// HTML → plain text
// ==========================================
function htmlToText(html) {
  return html
    .replace(/<img[^>]*>/g, '[hình]')
    .replace(/<table>[\s\S]*?<\/table>/g, (match) => {
      return match
        .replace(/<tr>/g, '\n')
        .replace(/<\/tr>/g, '')
        .replace(/<t[dh][^>]*>/g, '| ')
        .replace(/<\/t[dh]>/g, ' ')
        .replace(/<[^>]+>/g, '');
    })
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/?(h[1-6]|div|span|section|article)[^>]*>/g, '\n')
    .replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')
    .replace(/<em>/g, '*').replace(/<\/em>/g, '*')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

// ==========================================
// Topic detection
// ==========================================
function detectTopic(text) {
  const t = text.toLowerCase();
  if (t.includes('thống kê') || t.includes('tần số') || t.includes('mẫu số liệu') || t.includes('trung bình'))
    return 'thong_ke';
  if (t.includes('xác suất') || t.includes('ngẫu nhiên') || t.includes('biến cố'))
    return 'xac_suat';
  if (t.includes('căn') || t.includes('biểu thức') || t.includes('rút gọn'))
    return 'can_thuc';
  if (t.includes('phương trình') || t.includes('hệ phương') || t.includes('nghiệm'))
    return 'phuong_trinh';
  if (t.includes('hàm số') || t.includes('parabol') || t.includes('đồ thị'))
    return 'ham_so';
  if (t.includes('tam giác') || t.includes('đường tròn') || t.includes('tiếp tuyến') || 
      t.includes('vuông') || t.includes('đường cao') || t.includes('trung tuyến'))
    return 'hinh_hoc';
  return 'tong_hop';
}

function detectDifficulty(label) {
  const roman = label.replace('Câu ', '').toUpperCase();
  if (roman === 'I') return 'thong_hieu';
  if (roman === 'II') return 'van_dung';
  if (roman === 'III') return 'van_dung';
  if (roman === 'IV') return 'van_dung';
  if (roman === 'V') return 'van_dung_cao';
  return 'van_dung';
}

// ==========================================
// Fingerprint for dedup
// ==========================================
function fingerprint(text) {
  return text.replace(/[^a-zA-ZÀ-ỹ0-9]/g, '').toLowerCase().substring(0, 400);
}

// ==========================================
// MAIN
// ==========================================
async function main() {
  console.log('🚀 Nhập 50 đề thi tự luận Hà Nội vào database...\n');
  
  const users = await sql`SELECT id FROM public.users WHERE email = ${ADMIN_EMAIL}`;
  if (users.length === 0) { console.error('❌ Không tìm thấy admin user'); return; }
  const userId = users[0].id;
  console.log('✅ Admin:', userId);
  
  const existing = await sql`SELECT title FROM public.exams WHERE user_id = ${userId}`;
  const existingTitles = new Set(existing.map(e => e.title.toLowerCase()));
  console.log('📋 Đề hiện có:', existing.length);
  
  // List files
  const files = fs.readdirSync(EXAM_DIR)
    .filter(f => f.endsWith('.docx') && f.startsWith('Đề số') && !f.includes('Copy') && !f.includes('(1)') && !f.startsWith('~'))
    .sort((a, b) => parseInt(a.match(/\d+/)?.[0] || '0') - parseInt(b.match(/\d+/)?.[0] || '0'));
  
  console.log('📁 Files:', files.length, '\n');
  
  const fps = new Set();
  let imported = 0, skipped = 0, errors = 0;
  
  for (const file of files) {
    const num = file.match(/\d+/)?.[0] || '0';
    const title = `Đề tuyển sinh lớp 10 Hà Nội - Đề số ${num}`;
    
    process.stdout.write(`[${num}] ${file} → `);
    
    if (existingTitles.has(title.toLowerCase())) {
      console.log('⏭️ đã tồn tại');
      skipped++;
      continue;
    }
    
    try {
      const html = await parseDocx(path.join(EXAM_DIR, file));
      const { questions, answers } = splitIntoQuestions(html);
      
      if (questions.length === 0) {
        console.log('⚠️ không tìm thấy câu hỏi');
        errors++;
        continue;
      }
      
      // Dedup check
      const fp = fingerprint(questions.map(q => q.text).join(''));
      if (fps.has(fp)) {
        console.log('⏭️ trùng nội dung');
        skipped++;
        continue;
      }
      fps.add(fp);
      
      // Create exam
      const examResult = await sql`
        INSERT INTO public.exams (title, description, grade, duration, user_id, tags, settings)
        VALUES (
          ${title},
          ${'Đề thi tuyển sinh lớp 10 THPT Hà Nội - Môn Toán - Tự luận - GDPT 2018'},
          ${9}, ${120}, ${userId},
          ${'{\"tuyển sinh\",\"lớp 10\",\"Hà Nội\",\"tự luận\",\"GDPT 2018\"}'},
          ${JSON.stringify({ exam_type: 'tu_luan', source: 'Sở GD&ĐT Hà Nội', number: num })}
        ) RETURNING id
      `;
      const examId = examResult[0].id;
      
      // Insert questions
      let qCount = 0;
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const ans = answers[i]?.text || '';
        const topic = detectTopic(q.text);
        const difficulty = detectDifficulty(q.label);
        
        // Points allocation: Câu I=1.5, Câu II=1.5, Câu III=2.5, Câu IV=2.5, Câu V=2.0
        const points = i === 0 ? 1.5 : i === 1 ? 1.5 : i === 2 ? 2.5 : i === 3 ? 2.5 : 2.0;
        
        const qResult = await sql`
          INSERT INTO public.questions (
            question_code, content, answer, solution, grade, topic, difficulty, question_type,
            user_id, status, is_public, tags
          ) VALUES (
            ${`HN-D${num}-${q.label.replace('Câu ', 'C')}`},
            ${q.text},
            ${ans || null},
            ${ans || null},
            ${9},
            ${topic},
            ${difficulty},
            ${'tu_luan'},
            ${userId},
            ${'approved'},
            ${true},
            ${'{"tuyển sinh lớp 10","Hà Nội","đề ' + num + '"}'}
          ) RETURNING id
        `;
        
        await sql`
          INSERT INTO public.exam_questions (exam_id, question_id, sort_order, points, section)
          VALUES (${examId}, ${qResult[0].id}, ${i + 1}, ${points}, ${q.label})
        `;
        qCount++;
      }
      
      console.log(`✅ ${qCount} câu, ${answers.length} đáp án`);
      imported++;
      existingTitles.add(title.toLowerCase());
      
    } catch (err) {
      console.log(`❌ ${err.message.substring(0, 100)}`);
      errors++;
    }
  }
  
  console.log(`\n${'═'.repeat(40)}`);
  console.log(`✅ Nhập: ${imported} | ⏭️ Bỏ: ${skipped} | ❌ Lỗi: ${errors}`);
  console.log(`${'═'.repeat(40)}`);
}

main().catch(console.error);
