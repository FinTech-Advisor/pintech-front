'use client'
import { MainTitle } from "@/app/global/components/StyledTitle"
import BankContainer from "../../containers/BankContainer"
import { MainContentBox } from "@/app/global/components/ContentBox"

const LoanAdvicePage = () => {
  return (
    <>
      <MainContentBox>
        <BankContainer />
        <MainTitle>대출 추천</MainTitle>
      </MainContentBox>
    </>
  )
}

export default LoanAdvicePage
