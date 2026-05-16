/**
 * Script chạy migrations mới trên Neon Production
 * Chạy: node scripts/run-migrations.js
 */

const fs = require('fs');
const path = require('path');

// Read DATABASE_URL from .env.local
let DATABASE_URL;
try {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
  if (match) DATABASE_URL = match[1];
} catch {}

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

console.log('🔗 Connecting to:', DATABASE_URL.substring(0, 35) + '...');

const { neon } = require('@neondatabase/serverless');
const sql = neon(DATABASE_URL);

const migrations = [
  '008_likes_table.sql',
  '009_reports_table.sql',
  '010_exams_status.sql',
];

async function run() {
  console.log('🚀 Running pending migrations on Neon...\n');
  
  for (const file of migrations) {
    const filePath = path.join(__dirname, '..', 'supabase', 'migrations', file);
    if (!fs.existsSync(filePath)) {
      console.log(`⏭️  Skipping ${file} — file not found`);
      continue;
    }
    
    const sqlContent = fs.readFileSync(filePath, 'utf8');
    console.log(`📦 Running ${file}...`);
    
    try {
      // Split by semicolons and run each statement
      const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0);
      for (const stmt of statements) {
        await sql.query(stmt);
      }
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
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
