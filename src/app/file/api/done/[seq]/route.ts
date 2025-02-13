import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl
    const seq = pathname.split('/').pop() // URL에서 seq 추출

    if (!seq) {
      return NextResponse.json(
        { error: 'Sequence ID is required' },
        { status: 400 },
      )
    }

    // 업로드 완료 상태 조회 로직 (예: 데이터베이스 조회 등)
    console.log(`Checking upload status for seq: ${seq}`)

    return NextResponse.json({
      message: `Upload status checked for seq: ${seq}`,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
