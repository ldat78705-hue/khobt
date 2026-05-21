const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Lấy tất cả bài hình học thiếu đơn vị
  const rows = await sql`
    SELECT id, question_code, content, answer, solution
    FROM public.questions 
    WHERE topic = 'hinh_hoc' 
      AND content NOT LIKE '%cm%' 
      AND content NOT LIKE '%m²%'
      AND content NOT LIKE '%dm%'
      AND content NOT LIKE '%°%'
      AND content NOT LIKE '%trục%'
      AND content NOT LIKE '%đối xứng%'
      AND content NOT LIKE '%thẳng hàng%'
      AND content NOT LIKE '%song song%'
      AND content NOT LIKE '%vuông góc%'
      AND content NOT LIKE '%Đúng%'
      AND content NOT LIKE '%Sai%'
      AND content NOT LIKE '%phát biểu%'
      AND content NOT LIKE '%định nghĩa%'
      AND content NOT LIKE '%tính chất%'
      AND content NOT LIKE '%là gì%'
      AND content NOT LIKE '%khi nào%'
      AND content NOT LIKE '%mấy%'
      AND content NOT LIKE '%bao nhiêu%'
      AND content NOT LIKE '%Kể tên%'
      AND content NOT LIKE '%Nêu%'
      AND content NOT LIKE '%Vẽ%'
      AND content NOT LIKE '%CMR%'
      AND content NOT LIKE '%Chứng minh%'
      AND (
        content LIKE '%=%' 
        OR content LIKE '%Tính%'
        OR content LIKE '%AB =%'
      )
    ORDER BY question_code
    LIMIT 50`;
  
  console.log(`Found ${rows.length} geometry questions potentially missing units:`);
  let fixCount = 0;
  
  for (const r of rows) {
    const code = r.question_code;
    let c = r.content;
    let a = r.answer;
    let s = r.solution;
    let changed = false;
    
    // Pattern: numbers without units in geometry context
    // Add "cm" to bare numbers in geometry problems
    // Only fix content that has bare numbers like "AB = 5" without units
    const needsUnit = /=\s*\d+[,.]?\d*\s*[,.\)]/.test(c) || /=\s*\d+[,.]?\d*\s*$/.test(c) || /=\s*\d+[,.]?\d*\s*[;]/.test(c);
    
    if (needsUnit) {
      // Add " cm" after numbers that look like measurements
      const newC = c
        .replace(/(\b(?:AB|BC|CA|AC|AD|BD|CD|AH|BH|CH|MN|AM|BM|CM|OA|OB|OC|OH|AB|a|b|c|d_1|d_2)\s*=\s*\d+(?:[,.]\d+)?)\s*([,;.)$\s])/g, '$1 cm$2')
        .replace(/(\b(?:AB|BC|CA|AC|AD|BD|CD|AH|BH|CH|MN|AM|BM|CM|OA|OB|OC|OH)\s*=\s*\d+(?:[,.]\d+)?)\s*$/g, '$1 cm');
      
      if (newC !== c) {
        c = newC;
        changed = true;
      }
    }
    
    if (changed) {
      await sql`UPDATE public.questions SET content=${c}, updated_at=NOW() WHERE id=${r.id}`;
      console.log(`FIXED: ${code}`);
      fixCount++;
    } else {
      console.log(`SKIP: ${code} - ${c.substring(0, 60)}`);
    }
  }
  
  console.log(`\nFixed ${fixCount} questions.`);
}
main().catch(console.error);
