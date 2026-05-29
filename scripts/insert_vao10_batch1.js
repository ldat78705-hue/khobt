/**
 * Insert vao10 questions into database
 * Batch 1: Lập PT/HPT (50 questions with answers)
 */
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const ADMIN_USER_ID = null; // Will be fetched

// Category mapping
const CATEGORIES = {
  lappt: 'e2674d33-41c2-4db4-91e9-0c304e293cbc',  // Chuyên đề 4. Giải bài toán bằng cách lập phương trình
  viet: '36869657-c24e-4024-97b4-465e95d8f3e5',     // Chuyên đề 2. PT bậc hai và hệ thức Vi-ét
  hinh_khong_gian: '0cb8da64-8b0c-4858-abdd-8a388f332f3e', // Chuyên đề 10. Nón – trụ – cầu và hình khối
};

// Difficulty mapping by question type
const DIFFICULTY_MAP = {
  lappt: {
    // Dạng 1-3: Vận dụng (kinh tế, chuyển động, năng suất)
    // Dạng 4: Vận dụng (hình học)
    // Dạng 5: Vận dụng cao (tối ưu hóa)
    default: 'van_dung',
    van_dung_cao: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], // Bài 40-50: tối ưu hóa
  },
};

function cleanContent(text) {
  let cleaned = text;
  // The parsed data has \\( which is correct for JS string → renders as \( in output
  // No need to change LaTeX delimiters
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n\n+/g, '\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}


function splitContentAndHint(content) {
  // Separate the main question from "Đáp số" hint
  const parts = content.split(/\n?•\s*Đáp số:/);
  if (parts.length > 1) {
    return {
      content: parts[0].trim(),
      hint: 'Đáp số: ' + parts[1].trim(),
    };
  }
  return { content: content.trim(), hint: '' };
}

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  
  // Get admin user
  const admins = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  if (admins.length === 0) {
    console.error('No admin user found');
    return;
  }
  const adminId = admins[0].id;
  console.log('Admin user:', adminId);
  
  // Load parsed data
  const data = JSON.parse(fs.readFileSync('tailieu/vao10/parsed_latex_questions.json', 'utf-8'));
  
  // ========== BATCH 1: Lập PT/HPT ==========
  const lappt = data.lappt;
  console.log(`\n=== Inserting Lập PT/HPT: ${lappt.total_questions} questions ===`);
  
  let inserted = 0;
  let skipped = 0;
  
  for (const q of lappt.questions) {
    const baiNum = q.bai_num;
    
    // Determine difficulty
    const isVDC = DIFFICULTY_MAP.lappt.van_dung_cao.includes(baiNum);
    const difficulty = isVDC ? 'van_dung_cao' : 'van_dung';
    
    // Determine topic based on content keywords
    let topic = 'phuong_trinh';
    const lowerContent = q.content.toLowerCase();
    if (lowerContent.includes('hệ phương trình') || lowerContent.includes('hpt') || 
        lowerContent.includes('x + y') || lowerContent.includes('mua') && lowerContent.includes('và')) {
      topic = 'he_phuong_trinh';
    }
    if (lowerContent.includes('hình chữ nhật') || lowerContent.includes('tam giác') || 
        lowerContent.includes('diện tích') || lowerContent.includes('chu vi')) {
      topic = 'hinh_hoc';
    }
    
    // Split content from hint
    const { content: mainContent, hint } = splitContentAndHint(q.content);
    
    // Merge parts into content
    let fullContent = mainContent;
    if (q.parts && q.parts.length > 0) {
      fullContent += '\n' + q.parts.join('\n');
    }
    if (hint) {
      fullContent += '\n\n' + hint;
    }
    
    // Build answer/solution
    let answer = q.answer || '';
    let solution = answer; // Full detailed solution
    
    // Generate question code
    const codePrefix = `V10-LPT`;
    const code = `${codePrefix}-${String(baiNum).padStart(3, '0')}`;
    
    // Check for duplicates
    const existing = await sql`SELECT id FROM public.questions WHERE question_code = ${code} LIMIT 1`;
    if (existing.length > 0) {
      console.log(`  SKIP Bài ${baiNum}: code ${code} already exists`);
      skipped++;
      continue;
    }
    
    // Clean content
    fullContent = cleanContent(fullContent);
    answer = cleanContent(answer);
    solution = cleanContent(solution);
    
    // Insert
    try {
      await sql`
        INSERT INTO public.questions (
          content, answer, solution, grade, topic, difficulty, question_type,
          user_id, category_id, is_public, status, question_code
        ) VALUES (
          ${fullContent}, ${answer || null}, ${solution || null},
          9, ${topic}, ${difficulty}, 'tu_luan',
          ${adminId}, ${CATEGORIES.lappt}, false, 'approved', ${code}
        )
      `;
      inserted++;
      console.log(`  ✅ Bài ${baiNum} (${code}): ${difficulty}, ${topic}`);
    } catch (err) {
      console.error(`  ❌ Bài ${baiNum}: ${err.message}`);
    }
  }
  
  console.log(`\nLập PT/HPT: inserted=${inserted}, skipped=${skipped}`);
}

main().catch(console.error);
