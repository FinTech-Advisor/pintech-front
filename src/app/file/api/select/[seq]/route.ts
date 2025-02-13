import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl
    const seq = pathname.split('/').pop() // URL에서 seq 값 추출

    if (!seq) {
      return NextResponse.json(
        { error: 'seq 값이 필요합니다.' },
        { status: 400 },
      )
    }

    // 이미지 선택 로직 (예: DB 조회)
    console.log(`이미지 선택 요청: ${seq}`)

    return NextResponse.json({
      success: true,
      message: `이미지 ${seq} 선택됨`,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
