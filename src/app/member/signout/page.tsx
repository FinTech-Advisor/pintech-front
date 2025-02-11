'use client' // Make sure to add 'use client' if this is in a client-side component

import React from 'react'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'
import SignOutContainer from '@/app/member/containers/signout/SignOutContainer'

const SignOutPage = () => {
  return (
    <MainContentBox max={650} min={550}>
      <MainTitle>회원 탈퇴</MainTitle>
      <SignOutContainer />
    </MainContentBox>
  )
}

export default SignOutPage
