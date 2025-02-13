// src/app/member/api/count/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { MessageService } from '@/app/message/services/MessageService' // 예시로 MessageService 사용

export async function GET(req: NextRequest) {
  try {
    // 쪽지 미열람 개수 조회 로직 (DB 조회 필요)
    const unreadCount = await MessageService.getUnreadMessagesCount()

    return NextResponse.json({ success: true, unreadCount }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: '서버 오류' },
      { status: 500 },
    )
  }
}
