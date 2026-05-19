import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import mammoth from 'mammoth';

config({ path: '.env.local' });
const { neon } = await import('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Exact substring matching to category slug or name
const FILE_MAP = {
  // GEOMETRY
  'B1 Goc o vi tri dac biet': 'toan-7-bai-8-goc-o-vi-tri-dac-biet-tia-phan-giac-cua-mot-goc',
  'B2 Hai duong thang song song': 'toan-7-bai-9-hai-duong-thang-song-song-va-dau-hieu-nhan-biet',
  'B3 Dinh li va chung minh': 'toan-7-bai-11-dinh-li-va-chung-minh-dinh-li',
  'B4 Tong 3 goc trong mot tam giac': 'toan-7-bai-12-tong-cac-goc-trong-mot-tam-giac',
  'B5 Truong hop bang nhau thu hai va thu ba': 'toan-7-bai-14-truong-hop-bang-nhau-thu-hai-va-thu-ba-cua-tam-giac',
  'B6 Truong hop bang nhau cua tam giac vuông': 'toan-7-bai-15-cac-truong-hop-bang-nhau-cua-tam-giac-vuong',
  'B7 Tam giac can': 'toan-7-bai-16-tam-giac-can-duong-trung-truc-cua-doan-thang',
  'B8 On tap chuong IV': 'toan-7-bai-tap-cuoi-chuong-iv',
  'B9 Quan he giua goc va canh doi dien': 'toan-7-bai-31-quan-he-giua-goc-va-canh-doi-dien-trong-mot-tam-giac',
  'B10 Quan he giua ba canh cua mot tam giac': 'toan-7-bai-33-quan-he-giua-ba-canh-cua-mot-tam-giac',
  'B11 Su dong quy': 'toan-7-bai-34-su-dong-quy-cua-ba-trung-tuyen-ba-duong-phan-giac-trong-mot-tam-giac',
  'B12 On tap chong IX': 'toan-7-bai-tap-cuoi-chuong-ix',
  'B13 Hinh hop chu nhat': 'toan-7-bai-36-hinh-hop-chu-nhat-va-hinh-lap-phuong',
  'B14 Lang tru dung tam giac': 'toan-7-bai-37-hinh-lang-tru-dung-tam-giac-va-hinh-lang-tru-dung-tu-giac',
  'B15 On tap chuong X': 'toan-7-bai-tap-cuoi-chuong-x',
  'B16 On tap HK1': 'toan-7-chuong-v-thu-thap-va-bieu-dien-du-lieu', // fallback to something valid
  'B17 On tap cuoi nam Hinh hoc': 'toan-7-chuong-x-mot-so-hinh-khoi-trong-thuc-tien',

  // ALGEBRA
  'B1 tap hop so huu ti': 'toan-7-bai-1-tap-hop-cac-so-huu-ti',
  'B2 Cong tru so huu ti': 'toan-7-bai-2-cong-tru-nhan-chia-so-huu-ti',
  'B3 Nhan chia so huu ti': 'toan-7-bai-2-cong-tru-nhan-chia-so-huu-ti',
  'B4 Luy thua cua mot so huu ti': 'toan-7-bai-3-luy-thua-voi-so-mu-tu-nhien-cua-mot-so-huu-ti',
  'B5 Thu tu thuc hien phep tinh': 'toan-7-bai-4-thu-tu-thuc-hien-cac-phep-tinh-quy-tac-chuyen-ve',
  'B6 on tap chuong 1': 'toan-7-bai-tap-cuoi-chuong-i',
  'B7 So thap phan': 'toan-7-bai-5-lam-quen-voi-so-thap-phan-vo-han-tuan-hoan',
  'B8 So vo ti': 'toan-7-bai-6-so-vo-ti-can-bac-hai-so-hoc',
  'B9 Cac phep toan ve so thuc': 'toan-7-bai-7-tap-hop-cac-so-thuc',
  'B10 Phan loai va thu thap du lieu': 'toan-7-bai-17-thu-thap-va-phan-loai-du-lieu',
  'B11 Bieu do hinh quat tron': 'toan-7-bai-18-bieu-do-hinh-quat-tron',
  'B12 Bieu do doan thang': 'toan-7-bai-19-bieu-do-doan-thang',
  'B13 Ti le thuc': 'toan-7-bai-20-ti-le-thuc',
  'B14 Dai luong ti le thuan': 'toan-7-bai-22-dai-luong-ti-le-thuan',
  'B15 Dai luong ti le nghich': 'toan-7-bai-23-dai-luong-ti-le-nghich',
  'B16 On tap chuong VI': 'toan-7-bai-tap-cuoi-chuong-vi',
  'B17 Bieu  thuc dai so': 'toan-7-bai-24-bieu-thuc-dai-so',
  'B18 Đa thức một biến': 'toan-7-bai-25-da-thuc-mot-bien',
  'B19 Phep nhan, chia da thuc': 'toan-7-bai-27-phep-nhan-da-thuc-mot-bien',
  'B20 on tap chuong 7': 'toan-7-bai-tap-cuoi-chuong-vii',
  'B21 Lam quen voi bien co': 'toan-7-bai-29-lam-quen-voi-bien-co',
  'B22 On tap HK1 (so hoc)': 'toan-7-chuong-ii-so-thuc',
  'B23 On tap chung cuoi nam': 'toan-7-chuong-viii-lam-quen-voi-bien-co-va-xac-suat-cua-bien-co',
  'PBT chuong 1 toan 7': 'toan-7-bai-tap-cuoi-chuong-i'
};

async function extractDocx(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (err) {
    return "";
  }
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
      exercises.push({ content, solution, answer: 'Xem lời giải' });
    }
  }
  return exercises;
}

async function main() {
  console.log("Deleting old wrong questions...");
  await sql`DELETE FROM public.questions WHERE grade = 7 AND topic = 'tong_hop'`;
  
  const cats = await sql`SELECT id, slug FROM categories WHERE grade = 7`;
  const slugToId = {};
  for (const c of cats) slugToId[c.slug] = c.id;

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
      let mappedSlug = null;
      for (const [key, slug] of Object.entries(FILE_MAP)) {
        if (file.includes(key)) {
          mappedSlug = slug;
          break;
        }
      }
      
      let catId = mappedSlug ? slugToId[mappedSlug] : null;
      
      if (!catId) {
        console.log(`  -> Warning: No matching category for ${file}`);
        // Fallback to Chương 1
        catId = slugToId['toan-7-chuong-i-so-huu-ti'];
      }
      
      const filePath = join(dir, file);
      const text = await extractDocx(filePath);
      const exercises = parseExercises(text);
      console.log(`  -> Found ${exercises.length} exercises. Cat slug: ${mappedSlug || 'FALLBACK'}`);
      
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
        } catch(e) {}
      }
    }
  }
  
  console.log(`Successfully imported ${success} exercises.`);
}

main().catch(console.error);
