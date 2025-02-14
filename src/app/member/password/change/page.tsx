import React from 'react'
import ChangePasswordContainer from '../../containers/password/change/ChangePasswordContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { Suspense } from 'react'
const ChangePasswordPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContentBox max={750} min={650}>
          <MainTitle>비밀번호 변경</MainTitle>

          <ChangePasswordContainer />
        </MainContentBox>
      </Suspense>
    </>
  )
}

export default ChangePasswordPage
