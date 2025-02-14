'use client'
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const DealViewPage = () => {
  return ( 
    <>
      <MainContentBox>
        <BankContainer />
        <MainTitle>거래내역 단일 조회</MainTitle>
      </MainContentBox>  
    </>
  )
}
  
export default DealViewPage
