'use client'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'
import loadable from '@loadable/component'
import WithUserContainer from '@/app/global/containers/WithUserContainer'
const EditContainer = loadable(() => import('../containers/EditContainer'))

const LoginPage = () => {
  return WithUserContainer(
    <MainContentBox max={750} min={650}>
      <MainTitle>회원정보 수정</MainTitle>
      <EditContainer />
    </MainContentBox>,
  )
}

export default LoginPage
