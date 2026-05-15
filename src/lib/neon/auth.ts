import { getDb } from './client';
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'khodetoan-secret-key-change-in-production'
);

const TOKEN_EXPIRY = '7d';
const COOKIE_NAME = 'kdt_session';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  permissions: Record<string, boolean>;
  avatar_url?: string;
}

/** Hash password */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/** Verify password */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/** Create JWT token */
export async function createToken(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

/** Verify JWT token */
export async function verifyToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.sub || null;
  } catch {
    return null;
  }
}

/** Register new user — chờ admin duyệt */
export async function register(email: string, password: string, fullName: string) {
  const sql = getDb();
  const passwordHash = await hashPassword(password);

  const result = await sql`
    INSERT INTO public.users (email, password_hash, full_name, is_approved)
    VALUES (${email}, ${passwordHash}, ${fullName}, ${false})
    RETURNING id, email, full_name, role, is_active, is_approved, permissions, avatar_url
  `;

  if (result.length === 0) {
    throw new Error('Failed to create user');
  }

  const user = result[0] as AuthUser & { is_approved: boolean };

  // Không tạo session — user phải chờ admin duyệt mới đăng nhập được
  return { user, token: null, needsApproval: true };
}

/** Login */
export async function login(email: string, password: string) {
  const sql = getDb();

  const result = await sql`
    SELECT id, email, password_hash, full_name, role, is_active, permissions, avatar_url
    FROM public.users
    WHERE email = ${email}
  `;

  if (result.length === 0) {
    throw new Error('Email không tồn tại');
  }

  const user = result[0];
  if (!user.is_active) {
    throw new Error('Tài khoản đã bị khóa');
  }

  // Kiểm tra duyệt tài khoản
  if (user.is_approved === false) {
    throw new Error('Tài khoản đang chờ admin duyệt. Vui lòng liên hệ lienhe@thaydat.edu.vn');
  }

  const valid = await verifyPassword(password, user.password_hash as string);
  if (!valid) {
    throw new Error('Mật khẩu không đúng');
  }

  const token = await createToken(user.id as string);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await sql`
    INSERT INTO public.sessions (user_id, token, expires_at)
    VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
  `;

  const authUser: AuthUser = {
    id: user.id as string,
    email: user.email as string,
    full_name: user.full_name as string,
    role: user.role as string,
    is_active: user.is_active as boolean,
    permissions: (user.permissions || {}) as Record<string, boolean>,
    avatar_url: user.avatar_url as string | undefined,
  };

  return { user: authUser, token };
}

/** Get current user from cookie */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (!sessionCookie) return null;

    const userId = await verifyToken(sessionCookie.value);
    if (!userId) return null;

    const sql = getDb();

    // Check session is valid
    const sessions = await sql`
      SELECT id FROM public.sessions
      WHERE token = ${sessionCookie.value}
        AND expires_at > NOW()
    `;
    if (sessions.length === 0) return null;

    const result = await sql`
      SELECT id, email, full_name, role, is_active, permissions, avatar_url
      FROM public.users
      WHERE id = ${userId} AND is_active = true
    `;

    if (result.length === 0) return null;

    const user = result[0];
    return {
      id: user.id as string,
      email: user.email as string,
      full_name: user.full_name as string,
      role: user.role as string,
      is_active: user.is_active as boolean,
      permissions: (user.permissions || {}) as Record<string, boolean>,
      avatar_url: user.avatar_url as string | undefined,
    };
  } catch {
    return null;
  }
}

/** Logout */
export async function logout() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    
    if (sessionCookie) {
      const sql = getDb();
      await sql`DELETE FROM public.sessions WHERE token = ${sessionCookie.value}`;
      cookieStore.delete(COOKIE_NAME);
    }
  } catch {
    // Ignore errors during logout
  }
}

/** Set session cookie */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

/** Clean expired sessions (call periodically) */
export async function cleanExpiredSessions() {
  const sql = getDb();
  await sql`DELETE FROM public.sessions WHERE expires_at < NOW()`;
}

/** Create a password reset token (stored in sessions with special prefix) */
export async function createResetToken(email: string): Promise<{ token: string; userId: string } | null> {
  const sql = getDb();
  
  const users = await sql`
    SELECT id FROM public.users WHERE email = ${email} AND is_active = true
  `;
  
  if (users.length === 0) return null;
  
  const userId = users[0].id as string;
  
  // Generate a short reset token
  const resetToken = 'rst_' + crypto.randomUUID().replace(/-/g, '').substring(0, 24);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  
  // Delete any existing reset tokens for this user
  await sql`
    DELETE FROM public.sessions 
    WHERE user_id = ${userId} AND token LIKE 'rst_%'
  `;
  
  // Save new reset token
  await sql`
    INSERT INTO public.sessions (user_id, token, expires_at)
    VALUES (${userId}, ${resetToken}, ${expiresAt.toISOString()})
  `;
  
  return { token: resetToken, userId };
}

/** Reset password using a reset token */
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const sql = getDb();
  
  // Find valid reset token
  const sessions = await sql`
    SELECT user_id FROM public.sessions
    WHERE token = ${token} AND token LIKE 'rst_%' AND expires_at > NOW()
  `;
  
  if (sessions.length === 0) return false;
  
  const userId = sessions[0].user_id as string;
  const passwordHash = await hashPassword(newPassword);
  
  // Update password
  await sql`
    UPDATE public.users SET password_hash = ${passwordHash}, updated_at = NOW()
    WHERE id = ${userId}
  `;
  
  // Delete the reset token
  await sql`
    DELETE FROM public.sessions WHERE token = ${token}
  `;
  
  // Also delete all existing sessions for security
  await sql`
    DELETE FROM public.sessions WHERE user_id = ${userId}
  `;
  
  return true;
}

/** Admin: directly reset a user's password */
export async function adminResetPassword(userId: string, newPassword: string): Promise<boolean> {
  const sql = getDb();
  const passwordHash = await hashPassword(newPassword);
  
  const result = await sql`
    UPDATE public.users SET password_hash = ${passwordHash}, updated_at = NOW()
    WHERE id = ${userId}
    RETURNING id
  `;
  
  if (result.length === 0) return false;
  
  // Clear all sessions
  await sql`DELETE FROM public.sessions WHERE user_id = ${userId}`;
  
  return true;
}

export { COOKIE_NAME };
