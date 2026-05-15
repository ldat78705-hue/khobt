import { getDb } from './client';
import { neon } from '@neondatabase/serverless';
import type { Question, Category, Exam, ExamQuestion, Folder } from '@/types';

/**
 * Neon Data Access Layer
 * Thay thế Supabase client queries
 */

// Helper: get raw SQL connection for dynamic queries
function getRawDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured');
  return neon(databaseUrl);
}

// ==========================================
// QUESTIONS
// ==========================================

export async function getQuestions(filters?: {
  grade?: number;
  topic?: string;
  difficulty?: string;
  status?: string;
  userId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const sql = getRawDb();
  const { grade, topic, difficulty, status, userId, search, limit = 50, offset = 0 } = filters || {};

  // Use simple approach: fetch with all possible filters using COALESCE/CASE
  const result = await sql`
    SELECT q.*, u.full_name as author_name, c.name as category_name
    FROM public.questions q
    LEFT JOIN public.users u ON q.user_id = u.id
    LEFT JOIN public.categories c ON q.category_id = c.id
    WHERE
      (${grade ?? null}::int IS NULL OR q.grade = ${grade ?? null})
      AND (${topic ?? null}::text IS NULL OR q.topic = ${topic ?? null})
      AND (${difficulty ?? null}::text IS NULL OR q.difficulty = ${difficulty ?? null})
      AND (${status ?? null}::text IS NULL OR q.status = ${status ?? null})
      AND (${userId ?? null}::uuid IS NULL OR q.user_id = ${userId ?? null}::uuid)
      AND (${search ?? null}::text IS NULL OR q.search_vector @@ to_tsquery('simple', ${search ? search.split(' ').join(' & ') : ''}))
    ORDER BY q.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  return result as unknown as Question[];
}

export async function getQuestionById(id: string) {
  const sql = getDb();
  const result = await sql`
    SELECT q.*, u.full_name as author_name, c.name as category_name
    FROM public.questions q
    LEFT JOIN public.users u ON q.user_id = u.id
    LEFT JOIN public.categories c ON q.category_id = c.id
    WHERE q.id = ${id}
  `;
  return result[0] as Question | undefined;
}

export async function createQuestion(data: Partial<Question>) {
  const sql = getDb();
  const result = await sql`
    INSERT INTO public.questions (
      content, answer, solution, grade, topic, difficulty, question_type,
      options, correct_answer, images, tags, user_id, category_id,
      is_public, status, question_code
    ) VALUES (
      ${data.content || ''}, ${data.answer || null}, ${data.solution || null},
      ${data.grade || 9}, ${data.topic || ''}, ${data.difficulty || 'thong_hieu'},
      ${data.question_type || 'tu_luan'}, ${JSON.stringify(data.options || null)},
      ${data.correct_answer || null}, ${data.images || []}, ${data.tags || []},
      ${data.user_id || ''}, ${data.category_id || null},
      ${data.is_public ?? false}, ${data.status || 'approved'},
      ${data.question_code || null}
    )
    RETURNING *
  `;
  return result[0] as Question;
}

export async function updateQuestion(id: string, data: Partial<Question>) {
  const sql = getDb();
  const result = await sql`
    UPDATE public.questions SET
      content = COALESCE(${data.content ?? null}, content),
      answer = COALESCE(${data.answer ?? null}, answer),
      solution = COALESCE(${data.solution ?? null}, solution),
      grade = COALESCE(${data.grade ?? null}, grade),
      topic = COALESCE(${data.topic ?? null}, topic),
      difficulty = COALESCE(${data.difficulty ?? null}, difficulty),
      question_type = COALESCE(${data.question_type ?? null}, question_type),
      tags = COALESCE(${data.tags ?? null}, tags),
      is_public = COALESCE(${data.is_public ?? null}, is_public),
      status = COALESCE(${data.status ?? null}, status),
      category_id = ${data.category_id ?? null}
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as Question;
}

export async function deleteQuestion(id: string) {
  const sql = getDb();
  await sql`DELETE FROM public.questions WHERE id = ${id}`;
}

// ==========================================
// CATEGORIES
// ==========================================

export async function getCategories(grade?: number) {
  const sql = getDb();
  if (grade) {
    return await sql`
      SELECT * FROM public.categories
      WHERE is_active = true AND grade = ${grade}
      ORDER BY grade, sort_order
    ` as Category[];
  }
  return await sql`
    SELECT * FROM public.categories
    WHERE is_active = true
    ORDER BY grade, sort_order
  ` as Category[];
}

export async function createCategory(data: Partial<Category>) {
  const sql = getDb();
  const result = await sql`
    INSERT INTO public.categories (name, slug, description, grade, parent_id, icon, color, sort_order, created_by)
    VALUES (
      ${data.name || ''}, ${data.slug || ''}, ${data.description || null},
      ${data.grade || null}, ${data.parent_id || null},
      ${data.icon || 'folder'}, ${data.color || '#3B82F6'},
      ${data.sort_order || 0}, ${data.created_by || null}
    )
    RETURNING *
  `;
  return result[0] as Category;
}

export async function updateCategory(id: string, data: Partial<Category>) {
  const sql = getDb();
  const result = await sql`
    UPDATE public.categories SET
      name = COALESCE(${data.name ?? null}, name),
      description = COALESCE(${data.description ?? null}, description),
      color = COALESCE(${data.color ?? null}, color),
      icon = COALESCE(${data.icon ?? null}, icon),
      is_active = COALESCE(${data.is_active ?? null}, is_active),
      sort_order = COALESCE(${data.sort_order ?? null}, sort_order)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as Category;
}

export async function deleteCategory(id: string) {
  const sql = getDb();
  await sql`DELETE FROM public.categories WHERE id = ${id}`;
}

// ==========================================
// EXAMS
// ==========================================

export async function getExams(userId?: string) {
  const sql = getDb();
  if (userId) {
    return await sql`
      SELECT e.*, u.full_name as author_name,
        (SELECT COUNT(*) FROM public.exam_questions eq WHERE eq.exam_id = e.id) as question_count
      FROM public.exams e
      LEFT JOIN public.users u ON e.user_id = u.id
      WHERE e.user_id = ${userId}
      ORDER BY e.created_at DESC
    ` as Exam[];
  }
  return await sql`
    SELECT e.*, u.full_name as author_name,
      (SELECT COUNT(*) FROM public.exam_questions eq WHERE eq.exam_id = e.id) as question_count
    FROM public.exams e
    LEFT JOIN public.users u ON e.user_id = u.id
    ORDER BY e.created_at DESC
  ` as Exam[];
}

export async function getExamById(id: string) {
  const sql = getDb();
  const result = await sql`
    SELECT e.*, u.full_name as author_name
    FROM public.exams e
    LEFT JOIN public.users u ON e.user_id = u.id
    WHERE e.id = ${id}
  `;
  return result[0] as Exam | undefined;
}

export async function getExamQuestions(examId: string) {
  const sql = getDb();
  return await sql`
    SELECT eq.*, q.content, q.answer, q.solution, q.grade, q.topic,
      q.difficulty, q.question_type, q.options, q.correct_answer, q.images, q.tags
    FROM public.exam_questions eq
    JOIN public.questions q ON eq.question_id = q.id
    WHERE eq.exam_id = ${examId}
    ORDER BY eq.sort_order
  ` as (ExamQuestion & Question)[];
}

export async function createExam(data: Partial<Exam>) {
  const sql = getDb();
  const result = await sql`
    INSERT INTO public.exams (title, description, grade, duration, folder_id, user_id, tags, settings)
    VALUES (
      ${data.title || ''}, ${data.description || null}, ${data.grade || 9},
      ${data.duration || null}, ${data.folder_id || null}, ${data.user_id || ''},
      ${data.tags || []}, ${JSON.stringify(data.settings || {})}
    )
    RETURNING *
  `;
  return result[0] as Exam;
}

export async function updateExam(id: string, data: Partial<Exam> & Record<string, any>) {
  const sql = getDb();
  const result = await sql`
    UPDATE public.exams SET
      title = COALESCE(${data.title ?? null}, title),
      description = COALESCE(${data.description ?? null}, description),
      grade = COALESCE(${data.grade ?? null}, grade),
      duration = COALESCE(${data.duration ?? null}, duration),
      tags = COALESCE(${data.tags ?? null}, tags),
      settings = COALESCE(${data.settings ? JSON.stringify(data.settings) : null}::jsonb, settings),
      exam_status = COALESCE(${data.exam_status ?? null}, exam_status),
      reviewed_by = COALESCE(${data.reviewed_by ?? null}, reviewed_by),
      reviewed_at = COALESCE(${data.reviewed_at ?? null}::timestamptz, reviewed_at),
      review_note = COALESCE(${data.review_note ?? null}, review_note)
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0] as Exam;
}

export async function deleteExam(id: string) {
  const sql = getDb();
  await sql`DELETE FROM public.exams WHERE id = ${id}`;
}

export async function getPersonalExams(userId: string, filters?: {
  grade?: number;
  status?: string;
  search?: string;
  limit?: number;
}) {
  const sql = getRawDb();
  const { grade, status, search, limit = 50 } = filters || {};
  const result = await sql`
    SELECT e.*, u.full_name as author_name,
      (SELECT COUNT(*) FROM public.exam_questions eq WHERE eq.exam_id = e.id) as question_count
    FROM public.exams e
    LEFT JOIN public.users u ON e.user_id = u.id
    WHERE e.user_id = ${userId}
      AND (${grade ?? null}::int IS NULL OR e.grade = ${grade ?? null})
      AND (${status ?? null}::text IS NULL OR e.exam_status = ${status ?? null})
      AND (${search ?? null}::text IS NULL OR e.title ILIKE ${'%' + (search || '') + '%'})
    ORDER BY e.created_at DESC
    LIMIT ${limit}
  `;
  return result as unknown as Exam[];
}

export async function getSharedExams(filters?: {
  grade?: number;
  status?: string;
  search?: string;
  limit?: number;
}) {
  const sql = getRawDb();
  const { grade, status, search, limit = 50 } = filters || {};
  const result = await sql`
    SELECT e.*, u.full_name as author_name,
      (SELECT COUNT(*) FROM public.exam_questions eq WHERE eq.exam_id = e.id) as question_count
    FROM public.exams e
    LEFT JOIN public.users u ON e.user_id = u.id
    WHERE (${grade ?? null}::int IS NULL OR e.grade = ${grade ?? null})
      AND (${status ?? null}::text IS NULL OR e.exam_status = ${status ?? null})
      AND (${search ?? null}::text IS NULL OR e.title ILIKE ${'%' + (search || '') + '%'})
    ORDER BY e.created_at DESC
    LIMIT ${limit}
  `;
  return result as unknown as Exam[];
}

// ==========================================
// FOLDERS
// ==========================================

export async function getFolders(userId: string) {
  const sql = getDb();
  return await sql`
    SELECT * FROM public.folders
    WHERE user_id = ${userId}
    ORDER BY sort_order, name
  ` as Folder[];
}

export async function createFolder(data: Partial<Folder>) {
  const sql = getDb();
  const result = await sql`
    INSERT INTO public.folders (name, parent_id, user_id, color, icon)
    VALUES (${data.name || ''}, ${data.parent_id || null}, ${data.user_id || ''}, ${data.color || '#3B82F6'}, ${data.icon || 'folder'})
    RETURNING *
  `;
  return result[0] as Folder;
}

// ==========================================
// FAVORITES
// ==========================================

export async function toggleFavorite(userId: string, questionId: string) {
  const sql = getDb();
  const existing = await sql`
    SELECT id FROM public.favorites WHERE user_id = ${userId} AND question_id = ${questionId}
  `;
  if (existing.length > 0) {
    await sql`DELETE FROM public.favorites WHERE user_id = ${userId} AND question_id = ${questionId}`;
    return false;
  }
  await sql`INSERT INTO public.favorites (user_id, question_id) VALUES (${userId}, ${questionId})`;
  return true;
}

export async function getFavorites(userId: string) {
  const sql = getDb();
  return await sql`
    SELECT q.*, f.created_at as favorited_at
    FROM public.favorites f
    JOIN public.questions q ON f.question_id = q.id
    WHERE f.user_id = ${userId}
    ORDER BY f.created_at DESC
  ` as Question[];
}

// ==========================================
// USERS (Admin)
// ==========================================

export async function getUsers(search?: string) {
  const sql = getRawDb();
  if (search) {
    return await sql`
      SELECT id, email, full_name, role, is_active, is_approved, permissions, avatar_url, created_at
      FROM public.users
      WHERE full_name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'}
      ORDER BY created_at DESC
    `;
  }
  return await sql`
    SELECT id, email, full_name, role, is_active, is_approved, permissions, avatar_url, created_at
    FROM public.users
    ORDER BY created_at DESC
  `;
}

export async function updateUserRole(userId: string, role: string) {
  const sql = getDb();
  await sql`UPDATE public.users SET role = ${role} WHERE id = ${userId}`;
}

export async function toggleUserActive(userId: string) {
  const sql = getDb();
  await sql`UPDATE public.users SET is_active = NOT is_active WHERE id = ${userId}`;
}

export async function updateUser(userId: string, data: { role?: string; is_active?: boolean }) {
  const sql = getDb();
  if (data.role !== undefined) {
    await sql`UPDATE public.users SET role = ${data.role} WHERE id = ${userId}`;
  }
  if (data.is_active !== undefined) {
    await sql`UPDATE public.users SET is_active = ${data.is_active} WHERE id = ${userId}`;
  }
}

// ==========================================
// STATS
// ==========================================

export async function getDashboardStats(userId?: string) {
  const sql = getDb();
  
  const questionCount = userId
    ? await sql`SELECT COUNT(*) as count FROM public.questions WHERE user_id = ${userId}`
    : await sql`SELECT COUNT(*) as count FROM public.questions`;
  
  const examCount = userId
    ? await sql`SELECT COUNT(*) as count FROM public.exams WHERE user_id = ${userId}`
    : await sql`SELECT COUNT(*) as count FROM public.exams`;

  const categoryCount = await sql`SELECT COUNT(*) as count FROM public.categories WHERE is_active = true`;
  const userCount = await sql`SELECT COUNT(*) as count FROM public.users WHERE is_active = true`;

  return {
    questions: Number(questionCount[0]?.count || 0),
    exams: Number(examCount[0]?.count || 0),
    categories: Number(categoryCount[0]?.count || 0),
    users: Number(userCount[0]?.count || 0),
  };
}

export async function getQuestionStatsByGrade() {
  const sql = getDb();
  return await sql`
    SELECT grade, COUNT(*) as count
    FROM public.questions
    GROUP BY grade
    ORDER BY grade
  `;
}
