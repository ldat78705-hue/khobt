import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();
  
  // Single question by ID
  const id = searchParams.get('id');
  if (id && provider === 'neon') {
    try {
      const question = await neonQueries.getQuestionById(id);
      if (!question) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(question);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  // Count only mode for dashboard
  const countOnly = searchParams.get('count_only') === 'true';
  if (countOnly && provider === 'neon') {
    try {
      const count = await neonQueries.getQuestionCount({
        grade: searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : undefined,
        status: searchParams.get('status') || undefined,
      });
      return NextResponse.json({ count });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  
  const filters = {
    grade: searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : undefined,
    topic: searchParams.get('topic') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') || undefined,
    question_type: searchParams.get('question_type') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 30,
    offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
  };

  if (provider === 'neon') {
    try {
      const [questions, totalResult] = await Promise.all([
        neonQueries.getQuestions(filters),
        neonQueries.getQuestionCount({
          grade: filters.grade,
          topic: filters.topic,
          difficulty: filters.difficulty,
          status: filters.status,
          search: filters.search,
          question_type: filters.question_type,
        }),
      ]);
      return NextResponse.json({ data: questions, total: totalResult, limit: filters.limit, offset: filters.offset });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

// Topic → prefix code mapping
function getTopicPrefix(topic: string): string {
  const map: Record<string, string> = {
    'thong_ke': 'TK', 'xac_suat': 'XS', 'bieu_thuc': 'RG',
    'pt_bpt': 'PT', 'hinh_khong_gian': 'HK', 'hinh_hoc': 'HP',
    'so_hoc': 'SH', 'dai_so': 'DS', 'ham_so': 'HS',
    'luong_giac': 'LG', 'to_hop': 'TH', 'gioi_han': 'GH',
  };
  return map[topic] || 'BT';
}

export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      const data = await req.json();
      
      // Auto-generate question_code if not provided
      if (!data.question_code) {
        const prefix = getTopicPrefix(data.topic || 'bt');
        data.question_code = await neonQueries.generateQuestionCode(prefix);
      } else {
        // Validate uniqueness of provided code
        const existing = await neonQueries.findByQuestionCode(data.question_code);
        if (existing) {
          return NextResponse.json({ error: `Mã "${data.question_code}" đã tồn tại` }, { status: 409 });
        }
      }
      
      const question = await neonQueries.createQuestion({
        ...data,
        user_id: user.id,
      });
      return NextResponse.json(question);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

export async function PATCH(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      const { id, report, report_reason, ...updates } = await req.json();
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

      // Handle report separately
      if (report && report_reason) {
        await neonQueries.createReport(user.id, id, report_reason);
        return NextResponse.json({ success: true, message: 'Report created' });
      }
      
      // If updating status, check permissions
      if (updates.status && updates.status !== 'draft') {
        if (user.role !== 'admin' && user.role !== 'reviewer') {
          return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
        }
        updates.reviewed_by = user.id;
        updates.reviewed_at = new Date().toISOString();
      }

      // Validate unique question_code if changed
      if (updates.question_code) {
        const existing = await neonQueries.findByQuestionCode(updates.question_code);
        if (existing && existing.id !== id) {
          return NextResponse.json({ error: `Mã "${updates.question_code}" đã tồn tại` }, { status: 409 });
        }
      }

      await neonQueries.updateQuestion(id, updates);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      // Check ownership: only owner or admin can delete
      const question = await neonQueries.getQuestionById(id);
      if (!question) return NextResponse.json({ error: 'Không tìm thấy bài tập' }, { status: 404 });
      if (question.user_id !== user.id && user.role !== 'admin') {
        return NextResponse.json({ error: 'Không có quyền xóa bài tập này' }, { status: 403 });
      }
      await neonQueries.deleteQuestion(id);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
