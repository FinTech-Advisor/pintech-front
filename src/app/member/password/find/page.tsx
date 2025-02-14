import FindPasswordContainer from '../../containers/password/find/FindPasswordContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'

const FindPasswordPage = () => {
  return (
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>비밀번호 찾기</MainTitle>
        <FindPasswordContainer />
      </MainContentBox>
    </>
  )
}

export default FindPasswordPage
