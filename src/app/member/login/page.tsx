import { MainContentBox } from '@/app/global/components/ContentBox'
import LoginContainer from '../containers/LoginContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { Suspense } from 'react'
const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContentBox max={450} min={350}>
        <MainTitle>로그인</MainTitle>
        <LoginContainer />
      </MainContentBox>
    </Suspense>
  )
}
export default LoginPage
