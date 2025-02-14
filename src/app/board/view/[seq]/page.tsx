import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'

const ViewPage = () => {
  return (
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle></MainTitle>
      </MainContentBox>
    </>
  )
}

export default ViewPage
