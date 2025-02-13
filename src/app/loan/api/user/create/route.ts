// src/app/loan/api/user/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { UserController } from '@/app/loan/controllers/UserController'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 유효성 검사
    if (typeof body.userId !== 'number') {
      return NextResponse.json(
        { success: false, message: 'userId는 정수여야 합니다.' },
        { status: 400 },
      )
    }

    if (!Array.isArray(body.loanDetails)) {
      return NextResponse.json(
        { success: false, message: 'loanDetails는 배열이어야 합니다.' },
        { status: 400 },
      )
    }

    // 유저 대출 정보 등록
    const result = await UserController.createLoans(body)

    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: '서버 오류' },
      { status: 500 },
    )
  }
}
