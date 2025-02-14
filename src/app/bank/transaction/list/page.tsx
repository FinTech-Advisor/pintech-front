'use client'
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const DealListPage = () => {
  return (
    <>
      <MainContentBox>
        <BankContainer />
        <MainTitle>거래내역 목록 조회</MainTitle>
      </MainContentBox>  
    </>
  )
}

export default DealListPage
