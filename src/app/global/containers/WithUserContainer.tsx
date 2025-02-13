// 고차 함수 = with+이름 관례

'use client'

import useUser from '../hooks/useUser'
import LoginContainer from '@/app/member/containers/LoginContainer'
import { MainContentBox } from '../components/ContentBox'
import { MainTitle } from '../components/StyledTitle'
import { usePathname, useSearchParams } from 'next/navigation'

export default function WithUserContainer(UserContainer) {
  // 로그인 상태일때만 가능한 컨테이너 = UserContainer

  const { isLogin } = useUser()

  const pathname = usePathname()

  const searchParams = useSearchParams()

  const redirectUrl = `${pathname}?${searchParams}`

  // 로그인 상태일 경우 현재 컨테이너
  // 로그인 상태가 아닐 경우 로그인 컨테이너쪽 페이지로, 이후 로그인시 원래 접근하려던 주소로 이동
  return isLogin ? (
    UserContainer
  ) : (
    <MainContentBox max={450} min={350}>
      <MainTitle>로그인</MainTitle>
      <LoginContainer redirectUrl={redirectUrl} />
    </MainContentBox>
  )
}
