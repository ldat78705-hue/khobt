import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import mammoth from 'mammoth';

config({ path: '.env.local' });

// Dynamically import neon
const { neon } = await import('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

function normalize(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getCategories() {
  const cats = await sql`SELECT id, name, slug FROM categories WHERE grade = 7 AND parent_id IS NOT NULL`;
  return cats.map(c => ({
    ...c,
    normName: normalize(c.name.replace(/Bài \d+\.\s*/, ''))
  }));
}

function findBestCategory(filename, categories) {
  const normFile = normalize(filename.replace(/_converted_.*\.docx/i, '').replace(/Phieu B\d+|B\d+|PBT/i, ''));
  
  let bestMatch = null;
  let maxScore = 0;
  
  for (const cat of categories) {
    let score = 0;
    const catWords = cat.normName.split(' ');
    for (const w of catWords) {
      if (w.length > 2 && normFile.includes(w)) {
        score++;
      }
    }
    
    // Exact match for "on tap chuong X"
    if (normFile.includes('on tap chuong') && cat.normName.includes('on tap chuong') || cat.normName.includes('bai tap cuoi chuong')) {
      // Need to extract roman numeral
      const match = normFile.match(/chuong\s+([ivx]+|\d+)/);
      if (match) {
        let ch = match[1];
        if (ch === '1') ch = 'i';
        if (ch === '2') ch = 'ii';
        if (ch === '4') ch = 'iv';
        if (ch === '5') ch = 'v';
        if (ch === '6') ch = 'vi';
        if (ch === '7') ch = 'vii';
        
        if (cat.slug.includes(ch)) {
           score += 10;
        }
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestMatch = cat;
    }
  }
  
  // If still no match, map manually or return a default
  return bestMatch ? bestMatch.id : null;
}

function parseExercises(text) {
  const exercises = [];
  const parts = text.split(/(?=(?:Bài|Câu)\s+\d+[\.\:])/i);
  
  for (let part of parts) {
    part = part.trim();
    if (!part.match(/^(?:Bài|Câu)\s+\d+[\.\:]/i)) continue;
    
    let content = '';
    let solution = '';
    
    const solMatch = part.match(/(?:Lời giải|Hướng dẫn giải|Giải|Đáp án)[\.\:]/i);
    if (solMatch) {
      content = part.substring(0, solMatch.index).trim();
      solution = part.substring(solMatch.index + solMatch[0].length).trim();
    } else {
      content = part;
    }
    
    content = content.replace(/^(?:Bài|Câu)\s+\d+[\.\:]\s*/i, '');
    
    if (content.length > 5) {
      exercises.push({
        content,
        solution,
        answer: 'Xem lời giải',
      });
    }
  }
  return exercises;
}

async function extractDocx(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    return "";
  }
}

async function main() {
  console.log("Deleting old wrong questions...");
  await sql`DELETE FROM public.questions WHERE grade = 7 AND topic = 'tong_hop'`;
  
  const categories = await getCategories();
  
  const users = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  const adminUserId = users[0].id;
  
  const DIRS = [
    'D:/khode/tailieu/phieubaitap/Sovadaiso/So va dai so',
    'D:/khode/tailieu/phieubaitap/Hinhhoc/Hinh hoc'
  ];
  
  let success = 0;
  
  for (const dir of DIRS) {
    const files = readdirSync(dir).filter(f => f.includes('_converted_') && (f.endsWith('.docx') || f.endsWith('.doc')));
    
    for (const file of files) {
      console.log(`Processing ${file}...`);
      const catId = findBestCategory(file, categories);
      if (!catId) {
        console.log(`  -> Warning: Could not find category for ${file}`);
        continue;
      }
      
      const filePath = join(dir, file);
      const text = await extractDocx(filePath);
      
      const exercises = parseExercises(text);
      console.log(`  -> Found ${exercises.length} exercises. Cat: ${categories.find(c => c.id === catId).name}`);
      
      const bMatch = file.match(/B(\d+)/i);
      
      for (let i = 0; i < exercises.length; i++) {
        const ex = exercises[i];
        const qCode = `7-${bMatch ? bMatch[1] : 'XX'}-${String(i+1).padStart(3, '0')}`;
        
        try {
          await sql`
            INSERT INTO public.questions (
              id, content, answer, solution, grade, topic, difficulty, question_type,
              user_id, category_id, is_public, status, question_code, created_at, updated_at
            ) VALUES (
              ${randomUUID()}, ${ex.content}, ${ex.answer}, ${ex.solution}, 7, 'tong_hop',
              'van_dung', 'tu_luan', ${adminUserId}, ${catId},
              true, 'approved', ${qCode}, NOW(), NOW()
            )
          `;
          success++;
        } catch(e) {
           console.error("Insert error:", e.message);
        }
      }
    }
  }
  
  console.log(`Successfully imported ${success} exercises.`);
}

main().catch(console.error);
