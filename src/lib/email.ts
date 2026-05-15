/**
 * Email Service — Gửi email qua SMTP (Gmail, Outlook, v.v.)
 * 
 * Cấu hình trong .env.local:
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=587
 *   SMTP_USER=lienhe@thaydat.edu.vn
 *   SMTP_PASS=your-app-password
 *   SMTP_FROM=KhoĐềToán <lienhe@thaydat.edu.vn>
 * 
 * Với Gmail: Bật 2FA → Tạo "App Password" tại https://myaccount.google.com/apppasswords
 */

import nodemailer from 'nodemailer';

// Kiểm tra SMTP có được cấu hình không
export function isSmtpConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

// Tạo transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Gửi email khôi phục mật khẩu
export async function sendResetPasswordEmail(
  toEmail: string,
  resetUrl: string,
  userName?: string
): Promise<boolean> {
  if (!isSmtpConfigured()) {
    console.warn('[EMAIL] SMTP chưa cấu hình, không gửi được email');
    return false;
  }

  const transporter = createTransporter();
  const fromAddress = process.env.SMTP_FROM || `KhoĐềToán <${process.env.SMTP_USER}>`;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: '🔑 Khôi phục mật khẩu - KhoĐềToán',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎓 KhoĐềToán</h1>
            <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Kho đề thi Toán THCS</p>
          </div>
          <div style="background: white; border-radius: 0 0 16px 16px; padding: 30px; border: 1px solid #e2e8f0; border-top: 0;">
            <h2 style="color: #1e293b; margin: 0 0 12px;">Khôi phục mật khẩu</h2>
            <p style="color: #64748b; line-height: 1.6;">
              Xin chào${userName ? ` <strong>${userName}</strong>` : ''},
            </p>
            <p style="color: #64748b; line-height: 1.6;">
              Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. 
              Nhấn nút bên dưới để tạo mật khẩu mới:
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${resetUrl}" 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 15px;">
                Đặt lại mật khẩu
              </a>
            </div>
            <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
              ⏰ Link có hiệu lực trong <strong>30 phút</strong>.<br>
              Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            <p style="color: #cbd5e1; font-size: 11px; text-align: center;">
              Link: <a href="${resetUrl}" style="color: #93c5fd; word-break: break-all;">${resetUrl}</a>
            </p>
          </div>
        </div>
      `,
    });
    console.log(`[EMAIL] Đã gửi reset password email tới ${toEmail}`);
    return true;
  } catch (error) {
    console.error('[EMAIL] Lỗi gửi email:', error);
    return false;
  }
}

// Gửi email thông báo tài khoản được duyệt
export async function sendAccountApprovedEmail(
  toEmail: string,
  userName: string,
  loginUrl: string
): Promise<boolean> {
  if (!isSmtpConfigured()) return false;

  const transporter = createTransporter();
  const fromAddress = process.env.SMTP_FROM || `KhoĐềToán <${process.env.SMTP_USER}>`;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: '✅ Tài khoản đã được duyệt - KhoĐềToán',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎓 KhoĐềToán</h1>
          </div>
          <div style="background: white; border-radius: 0 0 16px 16px; padding: 30px; border: 1px solid #e2e8f0; border-top: 0;">
            <h2 style="color: #1e293b; margin: 0 0 12px;">🎉 Tài khoản đã được duyệt!</h2>
            <p style="color: #64748b; line-height: 1.6;">
              Xin chào <strong>${userName}</strong>,
            </p>
            <p style="color: #64748b; line-height: 1.6;">
              Tài khoản của bạn trên KhoĐềToán đã được admin duyệt thành công. 
              Bạn có thể đăng nhập và bắt đầu sử dụng ngay!
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <a href="${loginUrl}" 
                 style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 15px;">
                Đăng nhập ngay
              </a>
            </div>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('[EMAIL] Lỗi gửi email duyệt:', error);
    return false;
  }
}

// Gửi email thông báo tài khoản bị từ chối
export async function sendAccountRejectedEmail(
  toEmail: string,
  userName: string,
  reason?: string
): Promise<boolean> {
  if (!isSmtpConfigured()) return false;

  const transporter = createTransporter();
  const fromAddress = process.env.SMTP_FROM || `KhoĐềToán <${process.env.SMTP_USER}>`;

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: toEmail,
      subject: '❌ Tài khoản chưa được duyệt - KhoĐềToán',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 16px 16px 0 0; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎓 KhoĐềToán</h1>
          </div>
          <div style="background: white; border-radius: 0 0 16px 16px; padding: 30px; border: 1px solid #e2e8f0; border-top: 0;">
            <h2 style="color: #1e293b; margin: 0 0 12px;">Tài khoản chưa được duyệt</h2>
            <p style="color: #64748b; line-height: 1.6;">
              Xin chào <strong>${userName}</strong>,
            </p>
            <p style="color: #64748b; line-height: 1.6;">
              Rất tiếc, tài khoản của bạn chưa được duyệt.
              ${reason ? `<br>Lý do: <em>${reason}</em>` : ''}
            </p>
            <p style="color: #64748b; line-height: 1.6;">
              Vui lòng liên hệ admin tại <strong>lienhe@thaydat.edu.vn</strong> để biết thêm chi tiết.
            </p>
          </div>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('[EMAIL] Lỗi gửi email từ chối:', error);
    return false;
  }
}
