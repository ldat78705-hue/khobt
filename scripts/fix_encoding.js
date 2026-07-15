const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  const codes = ['V10-LPT-048','7-19-001','T5-B73-010','7-3-017'];
  
  for(const code of codes){
    const rows = await sql`SELECT id, content, answer, solution FROM public.questions WHERE question_code=${code}`;
    if(!rows.length) continue;
    const q = rows[0];
    
    let changed = false;
    for(const field of ['content','answer','solution']){
      let text = q[field] || '';
      if(!text.includes('Â') && !text.includes('Ã') && !text.includes('â€')) continue;
      
      // Common mojibake fixes (UTF-8 read as CP1252)
      text = text.replace(/Â /g, ' ');  // Â + space → space
      text = text.replace(/Â·/g, '·');  // Â· → ·
      text = text.replace(/Â\$/g, '$'); // Â$ → $
      text = text.replace(/Â°/g, '°'); // Â° → °
      text = text.replace(/â€"/g, '–'); // â€" → –
      text = text.replace(/â€™/g, "'"); // â€™ → '
      text = text.replace(/â€œ/g, '"'); // â€œ → "
      text = text.replace(/â€\u009D/g, '"'); 
      text = text.replace(/Ã—/g, '×'); // Ã— → ×
      text = text.replace(/Ã©/g, 'é');
      text = text.replace(/Ã /g, 'à');
      text = text.replace(/Ãª/g, 'ê');
      text = text.replace(/Ã´/g, 'ô');
      text = text.replace(/Ã¬/g, 'ì');
      text = text.replace(/Ã¹/g, 'ù');
      text = text.replace(/Â/g, '');  // Remove remaining Â
      
      if(text !== q[field]){
        if(field==='content') await sql`UPDATE public.questions SET content=${text} WHERE id=${q.id}`;
        if(field==='answer') await sql`UPDATE public.questions SET answer=${text} WHERE id=${q.id}`;
        if(field==='solution') await sql`UPDATE public.questions SET solution=${text} WHERE id=${q.id}`;
        changed = true;
        console.log(`✅ ${code}: Sửa encoding trong ${field}`);
      }
    }
    if(!changed) console.log(`ℹ️ ${code}: Không cần sửa`);
  }
}
main().catch(console.error);
