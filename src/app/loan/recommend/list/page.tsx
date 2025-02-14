import { MainTitle } from "@/app/global/components/StyledTitle"
import LoanContainer from "../../containers/LoanContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const RecommendListPage = () => {
    return (
      <>
        <MainContentBox>
          <LoanContainer/>
          <MainTitle>대출 추천</MainTitle>
        </MainContentBox>
      </>
    )
  }
  
  export default RecommendListPage
  