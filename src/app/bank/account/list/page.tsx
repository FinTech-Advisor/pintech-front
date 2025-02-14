'use client'
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const AccountListPage = () => {
  return (
    <>
      <MainContentBox>
        <BankContainer />
        <MainTitle>계좌 목록 조회</MainTitle>
      </MainContentBox>
      
    </>
  )
}

export default AccountListPage
