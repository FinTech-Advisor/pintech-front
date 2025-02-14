import { MainTitle } from "@/app/global/components/StyledTitle"
import CardContainer from "../../containers/CardContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const RecommendListPage = () => {
    return (
      <>
        <MainContentBox>
          <CardContainer/>
          <MainTitle>추천카드</MainTitle>
        </MainContentBox>
      </>
    )
  }
  
  export default RecommendListPage
  