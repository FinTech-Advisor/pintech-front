import LoginContainer from '../containers/LoginContainer'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'

const LoginPage = () => {
  return (
    <MainContentBox max={450} min={350}>
      <MainTitle>로그인</MainTitle>
      <LoginContainer />
    </MainContentBox>
  )
}

export default LoginPage
