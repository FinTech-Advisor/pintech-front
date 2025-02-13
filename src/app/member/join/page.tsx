'use client'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import loadable from '@loadable/component'
import WithGuestContainer from '@/app/global/containers/WithGuestContainer'
const JoinContainer = loadable(() => import('../containers/JoinContainer'))

const JoinPage = () => {
  return WithGuestContainer(
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>회원 가입</MainTitle>
        <JoinContainer />
      </MainContentBox>
    </>,
  )
}

export default JoinPage
