'use client'
import loadable from '@loadable/component'
import WithGuestContainer from '@/app/global/containers/WithGuestContainer'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'

const LoginContainer = loadable(() => import('../containers/LoginContainer'))

const LoginPage = () => {
  return WithGuestContainer(
    <MainContentBox max={450} min={350}>
      <MainTitle>로그인</MainTitle>
      <LoginContainer />
    </MainContentBox>,
  )
}

export default LoginPage
