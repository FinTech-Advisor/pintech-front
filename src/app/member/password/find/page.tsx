'use client'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import loadable from '@loadable/component'
import WithGuestContainer from '@/app/global/containers/WithGuestContainer'

const FindContainer = loadable(() => import('../../containers/FindContainer'))

const FindPage = () => {
  return WithGuestContainer(
    <>
      <MainContentBox max={450} min={350}>
        <MainTitle>비밀번호 찾기</MainTitle>
        <FindContainer />
      </MainContentBox>
    </>,
  )
}

export default FindPage
