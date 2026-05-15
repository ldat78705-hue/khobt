const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const users = await sql`SELECT id, email, full_name, role, is_active FROM public.users ORDER BY created_at`;
  console.log('=== DANH SACH TAI KHOAN ===');
  users.forEach(u => {
    console.log(`${u.email} | role: ${u.role} | active: ${u.is_active} | ten: ${u.full_name}`);
  });
  
  const admin = users.find(u => u.email === 'lienhe@thaydat.edu.vn');
  if (admin) {
    console.log('\n=== TAI KHOAN lienhe@thaydat.edu.vn ===');
    console.log(`Role: ${admin.role} | Active: ${admin.is_active}`);
    if (admin.role !== 'admin') {
      console.log('>>> CHUA CO QUYEN ADMIN! Dang cap quyen...');
      await sql`UPDATE public.users SET role = 'admin' WHERE email = 'lienhe@thaydat.edu.vn'`;
      console.log('>>> DA CAP QUYEN ADMIN THANH CONG!');
    } else {
      console.log('>>> DA CO QUYEN ADMIN ROI!');
    }
  } else {
    console.log('\n>>> KHONG TIM THAY TAI KHOAN lienhe@thaydat.edu.vn trong database!');
  }
}

main().catch(e => console.error('Loi:', e.message));
