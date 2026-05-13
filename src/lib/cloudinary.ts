import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

/**
 * Cloudinary multi-account configuration
 * Hỗ trợ nhiều tài khoản Cloudinary để tăng dung lượng miễn phí
 */

interface CloudinaryAccount {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

function getAccounts(): CloudinaryAccount[] {
  const accounts: CloudinaryAccount[] = [];

  // Tài khoản chính
  if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    accounts.push({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET || '',
    });
  }

  // Tài khoản phụ 2
  if (process.env.CLOUDINARY_CLOUD_NAME_2 && process.env.CLOUDINARY_API_KEY_2) {
    accounts.push({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME_2,
      api_key: process.env.CLOUDINARY_API_KEY_2,
      api_secret: process.env.CLOUDINARY_API_SECRET_2 || '',
    });
  }

  // Tài khoản phụ 3
  if (process.env.CLOUDINARY_CLOUD_NAME_3 && process.env.CLOUDINARY_API_KEY_3) {
    accounts.push({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME_3,
      api_key: process.env.CLOUDINARY_API_KEY_3,
      api_secret: process.env.CLOUDINARY_API_SECRET_3 || '',
    });
  }

  return accounts;
}

/** Lấy tài khoản hiện tại (round-robin theo tháng để phân tải) */
function getCurrentAccount(): CloudinaryAccount {
  const accounts = getAccounts();
  if (accounts.length === 0) {
    throw new Error('No Cloudinary accounts configured');
  }
  // Round-robin theo tháng hiện tại
  const monthIndex = new Date().getMonth();
  return accounts[monthIndex % accounts.length];
}

/** Configure Cloudinary với tài khoản hiện tại */
export function configureCloudinary() {
  const account = getCurrentAccount();
  cloudinary.config({
    cloud_name: account.cloud_name,
    api_key: account.api_key,
    api_secret: account.api_secret,
  });
  return cloudinary;
}

/** Upload ảnh lên Cloudinary (server-side) */
export async function uploadImage(base64Data: string, folder: string = 'khodetoan'): Promise<UploadApiResponse> {
  const cld = configureCloudinary();
  return cld.uploader.upload(base64Data, {
    folder,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
}

/** Xóa ảnh khỏi Cloudinary */
export async function deleteImage(publicId: string): Promise<void> {
  const cld = configureCloudinary();
  await cld.uploader.destroy(publicId);
}

/** Tạo URL ảnh tối ưu từ public_id */
export function getImageUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
}) {
  const { width, height, crop = 'limit', quality = 'auto' } = options || {};
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkpwpfqzi';

  const transforms: string[] = [];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);
  transforms.push(`q_${quality}`);
  transforms.push('f_auto');

  const transformStr = transforms.join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${publicId}`;
}

/** Tạo URL ảnh trực tiếp (không transform) */
export function getDirectImageUrl(url: string): string {
  // Nếu đã là URL Cloudinary đầy đủ, trả về nguyên
  if (url.startsWith('https://res.cloudinary.com')) return url;
  // Nếu là public_id, tạo URL
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkpwpfqzi';
  return `https://res.cloudinary.com/${cloudName}/image/upload/${url}`;
}

export default cloudinary;
