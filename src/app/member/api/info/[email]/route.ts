// src/app/member/api/info/[email]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/app/member/services/UserService'

export async function GET(req: NextRequest) {
  try {
    // URL에서 동적으로 email을 추출
    const { pathname } = req.nextUrl
    const email = pathname.split('/')[4] // /info/[email]에서 [email]을 추출

    if (!email) {
      return NextResponse.json(
        { success: false, message: '이메일을 입력해주세요.' },
        { status: 400 },
      )
    }

    // 회원 정보 조회 (DB 조회 로직 필요)
    const userInfo = await UserService.getUserInfo(email)

    if (!userInfo) {
      return NextResponse.json(
        { success: false, message: '해당 이메일의 회원이 존재하지 않습니다.' },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, data: userInfo }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: '서버 오류' },
      { status: 500 },
    )
  }
}
