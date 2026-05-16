/**
 * Script chạy migrations mới trên Neon Production
 * Chạy: node scripts/run-migrations.mjs
 */

import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read DATABASE_URL from .env.local
let DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
    const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
    if (match) DATABASE_URL = match[1];
  } catch {}
}
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not set!');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });

const migrations = [
  '008_likes_table.sql',
  '009_reports_table.sql',
  '010_exams_status.sql',
];

async function run() {
  console.log('🚀 Running pending migrations on Neon...');
  
  for (const file of migrations) {
    const filePath = path.join(__dirname, '..', 'supabase', 'migrations', file);
    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${file} — file not found`);
      continue;
    }
    
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    console.log(`📦 Running ${file}...`);
    
    try {
      await sql.unsafe(sqlContent);
      console.log(`✅ ${file} — done`);
    } catch (err) {
      if (err.message?.includes('already exists')) {
        console.log(`⚠️  ${file} — already applied (skipped)`);
      } else {
        console.error(`❌ ${file} — ERROR:`, err.message);
      }
    }
  }
  
  console.log('\n✅ All migrations complete!');
  await sql.end();
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
