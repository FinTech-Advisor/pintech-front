import { MainTitle } from "@/app/global/components/StyledTitle"
import CardContainer from "../../containers/CardContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const UserListPage = () => {
    return (
      <>
        <MainContentBox>
          <CardContainer/>
          <MainTitle>사용자 카드 목록</MainTitle>
        </MainContentBox>
      </>
    ) 
  }
  
  export default UserListPage
  