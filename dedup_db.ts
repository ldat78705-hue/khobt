import { getDb } from "./src/lib/neon/client";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkDuplicates() {
  const sql = getDb();
  // Find duplicates by comparing exact content text
  const allQuestions = await sql`SELECT id, content FROM public.questions`;
  
  const contentMap = new Map<string, string[]>();
  
  for (const q of allQuestions) {
    if (!q.content) continue;
    // Normalize content for comparison: remove all whitespaces and to lowercase
    const normalized = q.content.replace(/\s+/g, '').toLowerCase();
    
    if (!contentMap.has(normalized)) {
      contentMap.set(normalized, []);
    }
    contentMap.get(normalized)!.push(q.id);
  }
  
  let duplicateGroups = 0;
  let totalDuplicates = 0;
  const duplicateIdsToDelete: string[] = [];
  
  for (const [normContent, ids] of contentMap.entries()) {
    if (ids.length > 1) {
      duplicateGroups++;
      totalDuplicates += (ids.length - 1);
      // keep the first one, delete the rest
      duplicateIdsToDelete.push(...ids.slice(1));
    }
  }
  
  console.log(`Found ${duplicateGroups} groups of duplicate questions.`);
  console.log(`Total duplicate questions to delete: ${totalDuplicates}`);
  
  if (duplicateIdsToDelete.length > 0) {
    console.log(`Deleting ${duplicateIdsToDelete.length} duplicate questions...`);
    // Delete in batches of 100
    for (let i = 0; i < duplicateIdsToDelete.length; i += 100) {
      const batch = duplicateIdsToDelete.slice(i, i + 100);
      await sql`DELETE FROM public.questions WHERE id = ANY(${batch})`;
      console.log(`Deleted ${i + batch.length}/${duplicateIdsToDelete.length}`);
    }
    console.log('Finished deleting duplicates.');
  }
  
  // also delete the one with empty content
  const emptyRes = await sql`DELETE FROM public.questions WHERE content IS NULL OR TRIM(content) = '' RETURNING id`;
  if (emptyRes.length > 0) {
    console.log(`Deleted ${emptyRes.length} empty questions.`);
  }

  process.exit(0);
}

checkDuplicates().catch(console.error);
