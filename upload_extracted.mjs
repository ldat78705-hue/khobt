import { readFileSync } from 'fs';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';

config({ path: '.env.local' });

// Dynamically import neon
const { neon } = await import('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);

async function main() {
  console.log('🚀 Uploading extracted questions to pending state');
  
  // Get admin user ID
  const users = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  if (!users.length) {
    console.error('❌ Không tìm thấy admin user');
    process.exit(1);
  }
  const adminUserId = users[0].id;
  console.log(`👤 Admin user: ${adminUserId}\n`);

  const data = JSON.parse(readFileSync('D:\\khode\\extracted_questions.json', 'utf8'));
  let success = 0, failed = 0;

  for (let i = 0; i < data.length; i++) {
    const ex = data[i];
    try {
      await sql`
        INSERT INTO public.questions (
          id, content, answer, grade, topic, difficulty, question_type,
          tags, user_id, is_public, status, question_code, created_at, updated_at
        ) VALUES (
          ${randomUUID()}, ${ex.content}, ${'Giáo viên sẽ cập nhật đáp án.'}, ${8}, ${'dai_so'},
          ${'thong_hieu'}, ${'tu_luan'}, ${['Đề thi lớp 8', ex.source_file]}, ${adminUserId},
          false, 'pending', ${'L8-' + Date.now().toString(36) + '-' + i}, NOW(), NOW()
        )
      `;
      success++;
      if (success % 20 === 0) console.log(`  ✅ ${success}/${data.length}...`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message?.substring(0, 80)}`);
      failed++;
    }
  }

  console.log(`\n🏁 HOÀN TẤT!`);
  console.log(`  ✅ Thành công: ${success}`);
  console.log(`  ❌ Thất bại: ${failed}`);
}

main().catch(console.error);
