import React from "react"
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"

const AccountListPage = () => {
  return (
    <>
      <BankContainer />
      <MainTitle>계좌 목록 조회</MainTitle>
    </>
  )
}

export default React.memo(AccountListPage)
