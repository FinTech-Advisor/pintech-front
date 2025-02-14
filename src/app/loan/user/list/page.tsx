import { MainTitle } from "@/app/global/components/StyledTitle"
import LoanContainer from "../../containers/LoanContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const UserListPage = () => {
    return (
      <>
        <MainContentBox>
          <LoanContainer/>
          <MainTitle>유저 대출 목록 조회</MainTitle>
        </MainContentBox>
      </>
  )
  }
  
  export default UserListPage
  