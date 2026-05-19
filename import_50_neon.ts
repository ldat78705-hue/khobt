import { createQuestion, createCategory, getCategories } from "./src/lib/neon/queries";
import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";

async function main() {
  const sql = getDb();
  // 1. Get an admin user ID
  const users = await sql`SELECT id FROM public.users WHERE role = 'admin' LIMIT 1`;
  const adminId = users.length > 0 ? users[0].id : null;
  
  // 2. Find or create category "Bài tập ôn thi vào 10" for grade 9
  const cats = await getCategories(9);
  let targetCat = cats.find(c => c.name.toLowerCase().includes("ôn thi vào 10"));
  if (!targetCat) {
    console.log("Creating category 'Bài tập ôn thi vào 10'...");
    targetCat = await createCategory({
      name: "Bài tập ôn thi vào 10",
      slug: "bai-tap-on-thi-vao-10",
      grade: 9,
      created_by: adminId,
      sort_order: 100,
    });
  }
  
  const categoryId = targetCat.id;
  console.log("Using Category ID:", categoryId, "and Admin ID:", adminId);

  // 3. Read questions
  const dataPath = path.join(process.cwd(), "import_50.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  
  let successCount = 0;
  
  for (const q of data) {
    try {
      await createQuestion({
        content: q.content,
        grade: 9, // "Bài tập ôn thi vào 10" implies Grade 9
        topic: q.topic,
        difficulty: "van_dung",
        question_type: "tu_luan",
        category_id: categoryId,
        user_id: adminId || "demo-user-001",
        is_public: true,
        status: "approved"
      });
      successCount++;
      if (successCount % 20 === 0) {
        console.log(`Imported ${successCount} questions...`);
      }
    } catch (e: any) {
      console.error("Failed to insert question:", e.message);
    }
  }
  
  console.log(`Finished! Successfully imported ${successCount} questions.`);
  process.exit(0);
}

main().catch(console.error);
