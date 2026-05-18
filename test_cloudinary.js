import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'khodetoan_unsigned';
  
  const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file: base64,
      upload_preset: uploadPreset
    })
  });

  if (!res.ok) {
    console.error('Failed to upload', await res.text());
  } else {
    const data = await res.json();
    console.log("Success:", data.secure_url);
  }
}

test();
