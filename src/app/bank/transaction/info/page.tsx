import React from "react"
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"

const DealViewPage = () => {
  return ( 
    <>
      <BankContainer />
      <MainTitle>거래내역 단일 조회</MainTitle>
    </>
  )
}
  
export default React.memo(DealViewPage)
