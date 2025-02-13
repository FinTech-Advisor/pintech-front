import React from "react"
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"

const DealListPage = () => {
  return (
    <>
      <BankContainer />
      <MainTitle>거래내역 목록 조회</MainTitle>
    </>
  )
}

export default DealListPage
