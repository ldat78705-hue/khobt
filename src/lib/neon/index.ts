/**
 * Database Provider Detection
 * Hỗ trợ 3 chế độ: Neon (production) / Supabase (legacy) / Demo (localStorage)
 */

export type DatabaseProvider = 'neon' | 'supabase' | 'demo';

export function getDatabaseProvider(): DatabaseProvider {
  // Check Neon first (preferred)
  const databaseUrl = process.env.DATABASE_URL || '';
  if (databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.')) {
    return 'neon';
  }

  // Check Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (supabaseUrl.length > 10 && supabaseUrl.startsWith('http')) {
    return 'supabase';
  }

  // Fallback to demo
  return 'demo';
}

export function isProductionMode(): boolean {
  return getDatabaseProvider() !== 'demo';
}

export function isNeonMode(): boolean {
  return getDatabaseProvider() === 'neon';
}

// Re-export all Neon modules
export { getDb, isNeonConfigured } from './client';
export { getCurrentUser, login, register, logout, setSessionCookie } from './auth';
export type { AuthUser } from './auth';
export * from './queries';
