import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: '.env.local' });

async function test() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'khodetoan_unsigned';
  
  // Read a real image from the disk to get a realistic size
  const imageBuf = fs.readFileSync("src/app/icon.png"); // ~1MB
  const base64 = "data:image/png;base64," + imageBuf.toString("base64");
  console.log("Payload size:", base64.length / 1024, "KB");

  console.log("Testing JSON payload...");
  const res1 = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file: base64,
      upload_preset: uploadPreset
    })
  });

  if (!res1.ok) {
    console.error('JSON Failed:', await res1.text());
  } else {
    console.log('JSON Success!');
  }

  console.log("Testing FormData payload...");
  const formData = new FormData();
  formData.append('file', base64);
  formData.append('upload_preset', uploadPreset);

  const res2 = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res2.ok) {
    console.error('FormData Failed:', await res2.text());
  } else {
    console.log('FormData Success!');
  }
}

test();
