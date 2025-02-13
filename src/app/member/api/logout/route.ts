// Cookie 삭제가 httpOnly라서 CSR에서 삭제가 안되므로 여기서 처리

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET() {
  const cookie = await cookies()

  cookie.delete('token')

  redirect('/member/login')
}
