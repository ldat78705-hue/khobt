import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import mammoth from 'mammoth';

config({ path: '.env.local' });

// Dynamically import neon
const { neon } = await import('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// --- 1. SETUP CATEGORIES ---
async function setupCategories() {
  const content = readFileSync('d:/khode/grade7.txt', 'utf-8');
  const lines = content.split('\n').map(l => l.trim()).filter(l => l);
  
  let currentParentId = null;
  let order = 0;
  
  const categoryMap = {}; // mapping from "Bài 1" to category UUID
  
  for (const line of lines) {
    order++;
    if (line.startsWith('Chương')) {
      const match = line.match(/(Chương\s+[IVX]+)\.\s*(.+)/i);
      if (match) {
        const title = match[0];
        const slug = 'toan-7-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        
        // Insert parent category
        const res = await sql`
          INSERT INTO categories (name, slug, description, grade, parent_id, sort_order)
          VALUES (${title}, ${slug}, ${title}, 7, null, ${order})
          ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        `;
        currentParentId = res[0].id;
      }
    } else if (line.startsWith('Bài') || line.startsWith('Luyện tập')) {
      const slug = 'toan-7-' + line.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      
      const res = await sql`
        INSERT INTO categories (name, slug, description, grade, parent_id, sort_order)
        VALUES (${line}, ${slug}, ${line}, 7, ${currentParentId}, ${order})
        ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
        RETURNING id
      `;
      const catId = res[0].id;
      
      // Attempt to map "Bài 1" to catId
      const baiMatch = line.match(/Bài\s+(\d+)/i);
      if (baiMatch) {
        categoryMap[`B${baiMatch[1]}`] = catId;
      }
    }
  }
  
  console.log("Category setup done.");
  return categoryMap;
}

// --- 2. IMPORT QUESTIONS ---
function parseExercises(text, filename) {
  const exercises = [];
  // Basic parsing logic: Looking for "Bài 1", "Câu 1", "Bài 1.", "Câu 1."
  // Wait, the documents might just have "Bài 1:", "Lời giải:"
  
  // Split the text by "Bài " or "Câu "
  const parts = text.split(/(?=(?:Bài|Câu)\s+\d+[\.\:])/i);
  
  for (let part of parts) {
    part = part.trim();
    if (!part.match(/^(?:Bài|Câu)\s+\d+[\.\:]/i)) continue;
    
    // find Lời giải or HDG or Đáp án
    let content = '';
    let solution = '';
    let answer = '';
    
    const solMatch = part.match(/(?:Lời giải|Hướng dẫn giải|Giải|Đáp án)[\.\:]/i);
    if (solMatch) {
      content = part.substring(0, solMatch.index).trim();
      solution = part.substring(solMatch.index + solMatch[0].length).trim();
    } else {
      content = part;
    }
    
    // clean up content prefix
    content = content.replace(/^(?:Bài|Câu)\s+\d+[\.\:]\s*/i, '');
    
    if (content.length > 5) {
      exercises.push({
        content,
        solution,
        answer: answer || 'Xem lời giải',
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
    console.error(`Failed to extract ${filePath}:`, err.message);
    return "";
  }
}

async function main() {
  const categoryMap = await setupCategories();
  
  const users = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  const adminUserId = users[0].id;
  
  const DIRS = [
    'D:/khode/tailieu/phieubaitap/Sovadaiso/So va dai so',
    'D:/khode/tailieu/phieubaitap/Hinhhoc/Hinh hoc'
  ];
  
  let success = 0;
  
  for (const dir of DIRS) {
    const files = readdirSync(dir).filter(f => f.includes('_converted_') && f.endsWith('.docx'));
    
    for (const file of files) {
      console.log(`Processing ${file}...`);
      
      // Match B1, B2, etc. from filename
      let catId = null;
      const bMatch = file.match(/B(\d+)/i);
      if (bMatch) {
        catId = categoryMap[`B${bMatch[1]}`];
      }
      
      const filePath = join(dir, file);
      const text = await extractDocx(filePath);
      
      const exercises = parseExercises(text, file);
      console.log(`Found ${exercises.length} exercises in ${file}.`);
      
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
