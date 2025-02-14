import { MainTitle } from "@/app/global/components/StyledTitle"
import CardContainer from "../containers/CardContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"


const CardListPage = () => {
  return (
    <>
      <MainContentBox>
        <CardContainer />
        <MainTitle>카드 목록 조회</MainTitle>
      </MainContentBox>
    </>  
  )
}
  
  export default CardListPage
  