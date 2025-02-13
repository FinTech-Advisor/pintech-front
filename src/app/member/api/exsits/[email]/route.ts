// src/app/member/api/exists/[email]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/app/member/services/UserService'

export async function GET(req: NextRequest) {
  try {
    // URL에서 동적으로 email을 추출
    const { pathname } = req.nextUrl
    const email = pathname.split('/')[4] // /exists/[email]에서 [email]을 추출

    if (!email) {
      return NextResponse.json(
        { success: false, message: '이메일을 입력해주세요.' },
        { status: 400 },
      )
    }

    // 회원 존재 여부 확인 (DB 조회 로직 필요)
    const exists = await UserService.checkUserExists(email)

    return NextResponse.json({ success: true, exists }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: '서버 오류' },
      { status: 500 },
    )
  }
}
