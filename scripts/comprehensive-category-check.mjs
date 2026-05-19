import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  const categories = await sql`
    SELECT id, name, parent_id, grade, sort_order 
    FROM categories 
    ORDER BY grade, sort_order, name
  `;

  let issues = 0;
  console.log("=== BÁO CÁO KIỂM TRA TÍNH TOÀN VẸN CỦA DANH MỤC ===");

  const grades = [...new Set(categories.map(c => c.grade))];
  
  for (const grade of grades) {
    console.log(`\n--- LỚP ${grade} ---`);
    const gradeCats = categories.filter(c => c.grade === grade);
    const parents = gradeCats.filter(c => !c.parent_id);
    const children = gradeCats.filter(c => c.parent_id);

    // 1. Kiểm tra trùng lặp Parent (Chương/Chủ đề)
    const parentNameMap = new Map();
    for (const p of parents) {
      const normName = p.name.toLowerCase().trim();
      if (parentNameMap.has(normName)) {
        console.log(`[LỖI] Trùng lặp chương: "${p.name}" (ID: ${p.id})`);
        issues++;
      }
      parentNameMap.set(normName, p);
    }

    // 2. Kiểm tra trùng lặp Child (Bài học) trong cùng một Parent
    const childNameMapByParent = new Map();
    for (const c of children) {
      if (!childNameMapByParent.has(c.parent_id)) {
        childNameMapByParent.set(c.parent_id, new Map());
      }
      const map = childNameMapByParent.get(c.parent_id);
      const normName = c.name.toLowerCase().trim();
      if (map.has(normName)) {
        console.log(`[LỖI] Trùng lặp bài học trong cùng chương: "${c.name}" (ID: ${c.id}, Parent: ${c.parent_id})`);
        issues++;
      }
      map.set(normName, c);
    }

    // 3. Kiểm tra Orphan (Mồ côi - có parent_id nhưng parent không tồn tại)
    for (const c of children) {
      if (!parents.find(p => p.id === c.parent_id)) {
        console.log(`[LỖI] Bài học mồ côi (không có chương chứa nó): "${c.name}" (ID: ${c.id})`);
        issues++;
      }
    }

    console.log(`Kiểm tra lớp ${grade} hoàn tất. Tổng số chương: ${parents.length}, Bài học: ${children.length}.`);
  }

  console.log("\n===============================================");
  if (issues === 0) {
    console.log("Tuyệt vời! Dữ liệu danh mục ĐÃ HOÀN TOÀN SẠCH VÀ ỔN ĐỊNH 100%.");
  } else {
    console.log(`Phát hiện ${issues} vấn đề cần xử lý!`);
  }
}

run();
