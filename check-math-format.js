// Test mammoth default HTML output (no custom convertImage)
const mammoth = require('mammoth');
const fs = require('fs');

const buffer = fs.readFileSync('d:/khode/Đề lần 3 (Thái Hoà).docx');

async function test() {
  // Default mammoth - it embeds images as base64
  const result = await mammoth.convertToHtml({ buffer });
  
  // Extract image content types
  const types = {};
  const imgRegex = /data:(image\/[^;]+);base64/g;
  let m;
  while ((m = imgRegex.exec(result.value)) !== null) {
    types[m[1]] = (types[m[1]] || 0) + 1;
  }
  console.log('Default mammoth image types:', types);
  
  const imgCount = (result.value.match(/<img/g) || []).length;
  console.log('Total images:', imgCount);
  
  // Check first image src type
  const firstImg = result.value.match(/<img\s+src="([^"]{60})/);
  if (firstImg) console.log('First img src prefix:', firstImg[1]);
  
  // Try with explicit PNG conversion
  const result2 = await mammoth.convertToHtml({ buffer }, {
    convertImage: mammoth.images.imgElement(async (element) => {
      const imageBuffer = await element.read();
      const base64 = imageBuffer.toString('base64');
      // Force PNG content type
      return { src: `data:image/png;base64,${base64}` };
    })
  });
  
  const types2 = {};
  const imgRegex2 = /data:(image\/[^;]+);base64/g;
  let m2;
  while ((m2 = imgRegex2.exec(result2.value)) !== null) {
    types2[m2[1]] = (types2[m2[1]] || 0) + 1;
  }
  console.log('\nForced PNG types:', types2);
}

test().catch(console.error);
