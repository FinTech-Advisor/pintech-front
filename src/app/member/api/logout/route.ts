import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function GET() {
  const cookie = await cookies()
  cookie.delete('token')

  redirect('/member/login')
}
