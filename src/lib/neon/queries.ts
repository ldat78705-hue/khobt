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
  question_type?: string;
  limit?: number;
  offset?: number;
}) {
  const sql = getRawDb();
  const { grade, topic, difficulty, status, userId, search, question_type, limit = 30, offset = 0 } = filters || {};

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
      AND (${question_type ?? null}::text IS NULL OR q.question_type = ${question_type ?? null})
      AND (${userId ?? null}::uuid IS NULL OR q.user_id = ${userId ?? null}::uuid)
      AND (
        ${search ?? null}::text IS NULL
        OR q.question_code ILIKE ${'%' + (search || '') + '%'}
        OR q.content ILIKE ${'%' + (search || '') + '%'}
      )
    ORDER BY q.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  return result as unknown as Question[];
}

export async function getQuestionCount(filters?: {
  grade?: number;
  topic?: string;
  difficulty?: string;
  status?: string;
  search?: string;
  question_type?: string;
}) {
  const sql = getRawDb();
  const { grade, topic, difficulty, status, search, question_type } = filters || {};
  const result = await sql`
    SELECT COUNT(*)::int as count FROM public.questions q
    WHERE
      (${grade ?? null}::int IS NULL OR q.grade = ${grade ?? null})
      AND (${topic ?? null}::text IS NULL OR q.topic = ${topic ?? null})
      AND (${difficulty ?? null}::text IS NULL OR q.difficulty = ${difficulty ?? null})
      AND (${status ?? null}::text IS NULL OR q.status = ${status ?? null})
      AND (${question_type ?? null}::text IS NULL OR q.question_type = ${question_type ?? null})
      AND (
        ${search ?? null}::text IS NULL
        OR q.question_code ILIKE ${'%' + (search || '') + '%'}
        OR q.content ILIKE ${'%' + (search || '') + '%'}
      )
  `;
  return result[0]?.count || 0;
}

export async function generateQuestionCode(prefix: string): Promise<string> {
  const sql = getRawDb();
  const result = await sql`
    SELECT question_code FROM public.questions
    WHERE question_code LIKE ${prefix + '-%'}
    ORDER BY question_code DESC
    LIMIT 1
  `;
  if (result.length === 0) return `${prefix}-001`;
  const lastCode = result[0].question_code as string;
  const numPart = parseInt(lastCode.split('-').pop() || '0');
  return `${prefix}-${String(numPart + 1).padStart(3, '0')}`;
}

export async function findByQuestionCode(code: string) {
  const sql = getRawDb();
  const result = await sql`
    SELECT id, question_code FROM public.questions WHERE question_code = ${code} LIMIT 1
  `;
  return result[0] as { id: string; question_code: string } | undefined;
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
      options = COALESCE(${data.options ? JSON.stringify(data.options) : null}::jsonb, options),
      correct_answer = COALESCE(${data.correct_answer ?? null}, correct_answer),
      tags = COALESCE(${data.tags ?? null}, tags),
      images = COALESCE(${data.images ?? null}, images),
      is_public = COALESCE(${data.is_public ?? null}, is_public),
      status = COALESCE(${data.status ?? null}, status),
      question_code = COALESCE(${data.question_code ?? null}, question_code),
      category_id = COALESCE(${data.category_id ?? null}, category_id),
      reviewed_by = COALESCE(${(data as any).reviewed_by ?? null}, reviewed_by),
      reviewed_at = COALESCE(${(data as any).reviewed_at ?? null}::timestamptz, reviewed_at),
      review_note = COALESCE(${(data as any).review_note ?? null}, review_note),
      updated_at = NOW()
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

export async function addExamQuestion(examId: string, questionId: string, sortOrder: number = 0, points: number = 1.0) {
  const sql = getDb();
  const result = await sql`
    INSERT INTO public.exam_questions (exam_id, question_id, sort_order, points)
    VALUES (${examId}, ${questionId}, ${sortOrder}, ${points})
    RETURNING *
  `;
  return result[0];
}

export async function removeExamQuestion(id: string) {
  const sql = getDb();
  await sql`DELETE FROM public.exam_questions WHERE id = ${id}`;
}

export async function updateExamQuestionPoints(id: string, points: number) {
  const sql = getDb();
  await sql`UPDATE public.exam_questions SET points = ${points} WHERE id = ${id}`;
}

export async function updateExamQuestionOrder(id: string, sortOrder: number) {
  const sql = getDb();
  await sql`UPDATE public.exam_questions SET sort_order = ${sortOrder} WHERE id = ${id}`;
}


export async function getPersonalExams(userId: string, filters?: {
  grade?: number;
  status?: string;
  search?: string;
  limit?: number;
}) {
  const sql = getRawDb();
  const { grade, status, search, limit = 200 } = filters || {};
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
  const { grade, status, search, limit = 200 } = filters || {};
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

export async function getFavoriteIds(userId: string): Promise<string[]> {
  const sql = getDb();
  const result = await sql`
    SELECT question_id FROM public.favorites WHERE user_id = ${userId}
  `;
  return result.map((r: any) => r.question_id);
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

export async function getFavoriteQuestions(userId: string) {
  const sql = getDb();
  return await sql`
    SELECT q.*, u.full_name as author_name
    FROM public.favorites f
    JOIN public.questions q ON f.question_id = q.id
    LEFT JOIN public.users u ON q.user_id = u.id
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

// ==========================================
// SAVED EXAMS
// ==========================================

export async function getSavedExamIds(userId: string): Promise<string[]> {
  const sql = getDb();
  const result = await sql`
    SELECT exam_id FROM public.saved_exams WHERE user_id = ${userId}
  `;
  return result.map((r: any) => r.exam_id);
}

export async function getSavedExams(userId: string) {
  const sql = getDb();
  return await sql`
    SELECT e.*, u.full_name as author_name
    FROM public.saved_exams se
    JOIN public.exams e ON se.exam_id = e.id
    LEFT JOIN public.users u ON e.user_id = u.id
    WHERE se.user_id = ${userId}
    ORDER BY se.created_at DESC
  `;
}

export async function toggleSavedExam(userId: string, examId: string): Promise<boolean> {
  const sql = getDb();
  const existing = await sql`
    SELECT id FROM public.saved_exams WHERE user_id = ${userId} AND exam_id = ${examId}
  `;
  if (existing.length > 0) {
    await sql`DELETE FROM public.saved_exams WHERE user_id = ${userId} AND exam_id = ${examId}`;
    return false; // removed
  } else {
    await sql`INSERT INTO public.saved_exams (user_id, exam_id) VALUES (${userId}, ${examId})`;
    return true; // added
  }
}

// ==========================================
// ACTIVITY / HISTORY
// ==========================================

export async function getUserActivity(userId: string, limit: number = 30) {
  const sql = getDb();
  // Union of recent questions created, exams created, and favorites added
  return await sql`
    (
      SELECT 'create' as type, id, content as title, '/questions/' || id as link, created_at as time
      FROM public.questions
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${Math.ceil(limit / 3)}
    )
    UNION ALL
    (
      SELECT 'exam_create' as type, id, title, '/exams/' || id as link, created_at as time
      FROM public.exams
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${Math.ceil(limit / 3)}
    )
    UNION ALL
    (
      SELECT 'favorite' as type, f.id, q.content as title, '/questions/' || q.id as link, f.created_at as time
      FROM public.favorites f
      JOIN public.questions q ON f.question_id = q.id
      WHERE f.user_id = ${userId}
      ORDER BY f.created_at DESC
      LIMIT ${Math.ceil(limit / 3)}
    )
    ORDER BY time DESC
    LIMIT ${limit}
  `;
}
