'use client'

import LoginContainer from '@/app/member/containers/LoginContainer'
import useUser from '../hooks/useUser'
import { MainContentBox } from '../components/ContentBox'
import { MainTitle } from '../components/StyledTitle'
import { usePathname, useSearchParams } from 'next/navigation'
export default function WithUserContainer(UserContainer) {
  const { isLogin } = useUser()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const redirectUrl = `${pathname}?${searchParams}`
  return isLogin ? (
    <UserContainer />
  ) : (
    <MainContentBox max={450} min={350}>
      <h1>로그인</h1>
      <LoginContainer redirectUrl={redirectUrl} />
    </MainContentBox>
  )
}
