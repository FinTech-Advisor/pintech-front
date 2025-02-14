import { MainTitle } from "@/app/global/components/StyledTitle"
import LoanContainer from "../containers/LoanContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const LoanListPage = () => {
    return (
      <>
        <MainContentBox>
          <LoanContainer/>
          <MainTitle>대출 목록 조회</MainTitle>    
        </MainContentBox>
      </>
    )
  }
  
  export default LoanListPage
  