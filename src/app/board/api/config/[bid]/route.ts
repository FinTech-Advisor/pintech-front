import { NextRequest, NextResponse } from 'next/server'
import { getBoard } from '../../../services/actions'

export async function GET(request: NextRequest, {params}) {
  //const bid = request.nextUrl.pathname.split('/').pop()
  const bid = await params

  const board = await getBoard(bid)

  return NextResponse.json(board ?? {})
}
