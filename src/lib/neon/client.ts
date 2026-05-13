import { neon } from '@neondatabase/serverless';

/**
 * Neon Serverless Postgres Client
 * Scale-to-zero: chỉ 350ms cold start, không bao giờ bị pause
 * Free tier: 0.5 GB/project × 100 projects = 50 GB tổng
 */

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured. Get it from console.neon.tech');
  }
  return neon(databaseUrl);
}

/** Check if Neon is configured */
export function isNeonConfigured(): boolean {
  const url = process.env.DATABASE_URL || '';
  return url.includes('neon.tech') || url.includes('neon.');
}
