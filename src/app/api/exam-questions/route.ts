import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

// POST — thêm câu hỏi vào đề (từ kho hoặc tạo mới inline)
export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      const body = await req.json();
      const { exam_id, question_id, sort_order, points, inline_question } = body;
      
      if (!exam_id) return NextResponse.json({ error: 'exam_id required' }, { status: 400 });
      
      let qId = question_id;
      
      // Nếu là câu hỏi thủ công (inline) — tạo question mới rồi gắn vào đề
      if (inline_question && !question_id) {
        const newQ = await neonQueries.createQuestion({
          ...inline_question,
          user_id: user.id,
          status: 'approved',
          is_public: false,
        });
        qId = newQ.id;
      }
      
      if (!qId) return NextResponse.json({ error: 'question_id or inline_question required' }, { status: 400 });
      
      const eq = await neonQueries.addExamQuestion(exam_id, qId, sort_order || 0, points || 1.0);
      return NextResponse.json({ ...eq, question_id: qId });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

// PATCH — cập nhật điểm / thứ tự
export async function PATCH(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      const { id, points, sort_order } = await req.json();
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      
      if (points !== undefined) await neonQueries.updateExamQuestionPoints(id, points);
      if (sort_order !== undefined) await neonQueries.updateExamQuestionOrder(id, sort_order);
      
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

// DELETE — xóa câu hỏi khỏi đề
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
  
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      await neonQueries.removeExamQuestion(id);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
