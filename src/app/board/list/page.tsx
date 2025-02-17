import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import BoardListController from '../controllers/BoardListController'

const ListPage = async () => {
  return (
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>게시판 목록</MainTitle>
      </MainContentBox>
      <BoardListController />
    </>
  )
}

export default ListPage
