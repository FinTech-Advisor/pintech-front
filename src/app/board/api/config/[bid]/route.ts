import { NextRequest, NextResponse } from 'next/server'
import { getBoard } from '@/app/board/services/action'

export async function GET(request: NextRequest) {
  const bid = request.nextUrl.pathname.split('/').pop()

  const board = await getBoard(bid)

  return NextResponse.json(board ?? {})
}
