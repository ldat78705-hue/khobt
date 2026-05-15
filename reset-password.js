const { Pool } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

async function run() {
  const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" });
  try {
    const password = 'admin'; // User might be using 'admin'
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    
    await pool.query("UPDATE users SET password_hash = $1 WHERE email = 'lienhe@thaydat.edu.vn'", [hash]);
    console.log("Password for lienhe@thaydat.edu.vn has been reset to 'admin'");
    
    // Also try 123456 just in case
    const hash2 = await bcrypt.hash('123456', salt);
    // await pool.query("UPDATE users SET password_hash = $1 WHERE email = 'another@email.com'", [hash2]);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
