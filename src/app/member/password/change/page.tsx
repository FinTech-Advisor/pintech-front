'use client'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import loadable from '@loadable/component'
import WithGuestContainer from '@/app/global/containers/WithGuestContainer'

const ChangeContainer = loadable(
  () => import('../../containers/ChangeContainer'),
)

const ChangePage = () => {
  return WithGuestContainer(
    <>
      <MainContentBox max={450} min={350}>
        <MainTitle>비밀번호 변경</MainTitle>
        <ChangeContainer />
      </MainContentBox>
    </>,
  )
}

export default ChangePage
