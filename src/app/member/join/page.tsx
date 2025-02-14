import JoinContainer from '../containers/JoinContainer'
import { Suspense } from 'react'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
const JoinPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContentBox max={750} min={650}>
          <MainTitle>회원가입</MainTitle>
          <JoinContainer />
        </MainContentBox>
      </Suspense>
    </>
  )
}
export default JoinPage
