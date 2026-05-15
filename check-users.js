const { Pool } = require('@neondatabase/serverless');

async function run() {
  const pool = new Pool({ connectionString: "postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" });
  try {
    const res = await pool.query("SELECT id, email, full_name, role FROM users");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
