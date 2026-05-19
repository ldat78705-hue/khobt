import { readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import mammoth from 'mammoth';

config({ path: '.env.local' });
const { neon } = await import('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

// Exact matching to `name` from the DB
const FILE_MAP = {
  // GEOMETRY
  'B1 Goc o vi tri dac biet': 'Bài 8. Góc ở vị trí đặc biệt. Tia phân giác của một góc.',
  'B2 Hai duong thang song song': 'Bài 9. Hai đường thẳng song song và dấu hiệu nhận biết.',
  'B3 Dinh li va chung minh': 'Bài 11. Định lí và chứng minh định lí.',
  'B4 Tong 3 goc trong mot tam giac': 'Bài 12. Tổng các góc trong một tam giác.',
  'B5 Truong hop bang nhau thu hai va thu ba': 'Bài 14. Trường hợp bằng nhau thứ hai và thứ ba của tam giác.',
  'B6 Truong hop bang nhau cua tam giac vuông': 'Bài 15. Các trường hợp bằng nhau của tam giác vuông.',
  'B7 Tam giac can': 'Bài 16. Tam giác cân. Đường trung trực của đoạn thẳng.',
  'B8 On tap chuong IV': 'Bài tập cuối chương IV.',
  'B9 Quan he giua goc va canh doi dien': 'Bài 31. Quan hệ giữa góc và cạnh đối diện trong một tam giác.',
  'B10 Quan he giua ba canh cua mot tam giac': 'Bài 33. Quan hệ giữa ba cạnh của một tam giác.',
  'B11 Su dong quy': 'Bài 34. Sự đồng quy của ba trung tuyến, ba đường phân giác trong một tam giác.',
  'B12 On tap chong IX': 'Bài tập cuối chương IX.',
  'B13 Hinh hop chu nhat': 'Bài 36. Hình hộp chữ nhật và hình lập phương.',
  'B14 Lang tru dung tam giac': 'Bài 37. Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác.',
  'B15 On tap chuong X': 'Bài tập cuối chương X.',
  'B16 On tap HK1': 'Bài tập cuối chương IV.', 
  'B17 On tap cuoi nam Hinh hoc': 'Bài tập cuối chương X.', 

  // ALGEBRA
  'B1 tap hop so huu ti': 'Bài 1. Tập hợp các số hữu tỉ.',
  'B2 Cong tru so huu ti': 'Bài 2. Cộng, trừ, nhân, chia số hữu tỉ.',
  'B3 Nhan chia so huu ti': 'Bài 2. Cộng, trừ, nhân, chia số hữu tỉ.',
  'B4 Luy thua cua mot so huu ti': 'Bài 3. Luỹ thừa với số mũ tự nhiên của một số hữu tỉ.',
  'B5 Thu tu thuc hien phep tinh': 'Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế.',
  'B6 on tap chuong 1': 'Bài tập cuối chương I.',
  'B7 So thap phan': 'Bài 5. Làm quen với số thập phân vô hạn tuần hoàn.',
  'B8 So vo ti': 'Bài 6. Số vô tỉ. Căn bậc hai số học.',
  'B9 Cac phep toan ve so thuc': 'Bài 7. Tập hợp các số thực.',
  'B10 Phan loai va thu thap du lieu': 'Bài 17. Thu thập và phân loại dữ liệu.',
  'B11 Bieu do hinh quat tron': 'Bài 18. Biểu đồ hình quạt tròn.',
  'B12 Bieu do doan thang': 'Bài 19. Biểu đồ đoạn thẳng.',
  'B13 Ti le thuc': 'Bài 20. Tỉ lệ thức.',
  'B14 Dai luong ti le thuan': 'Bài 22. Đại lượng tỉ lệ thuận.',
  'B15 Dai luong ti le nghich': 'Bài 23. Đại lượng tỉ lệ nghịch.',
  'B16 On tap chuong VI': 'Bài tập cuối chương VI.',
  'B17 Bieu  thuc dai so': 'Bài 24. Biểu thức đại số.',
  'B18 Đa thức một biến': 'Bài 25. Đa thức một biến.',
  'B19 Phep nhan, chia da thuc': 'Bài 27. Phép nhân đa thức một biến.',
  'B20 on tap chuong 7': 'Bài tập cuối chương VII.',
  'B21 Lam quen voi bien co': 'Bài 29. Làm quen với biến cố.',
  'B22 On tap HK1 (so hoc)': 'Bài tập cuối chương I.',
  'B23 On tap chung cuoi nam ( So)': 'Bài tập cuối chương VII.',
  'PBT chuong 1 toan 7': 'Bài tập cuối chương I.'
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
  
  const cats = await sql`SELECT id, name FROM categories WHERE grade = 7`;
  const nameToId = {};
  for (const c of cats) {
    nameToId[c.name] = c.id;
  }

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
      let mappedName = null;
      for (const [key, name] of Object.entries(FILE_MAP)) {
        if (file.includes(key)) {
          mappedName = name;
          break;
        }
      }
      
      let catId = mappedName ? nameToId[mappedName] : null;
      
      if (!catId) {
        console.log(`  -> Warning: No matching category for ${file}, mappedName was ${mappedName}`);
        // Fallback to Chương 1
        catId = nameToId['Bài tập cuối chương I.'];
      }
      
      const filePath = join(dir, file);
      const text = await extractDocx(filePath);
      const exercises = parseExercises(text);
      console.log(`  -> Found ${exercises.length} exercises. Cat: ${mappedName || 'FALLBACK'}`);
      
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
