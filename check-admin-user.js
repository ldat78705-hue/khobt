const { getDb } = require('./src/lib/neon/client');

async function checkAdmin() {
  const sql = getDb();
  try {
    const users = await sql`
      SELECT email, role, full_name 
      FROM public.users 
      WHERE role = 'admin'
    `;
    console.log('Admin Users:', JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkAdmin();
