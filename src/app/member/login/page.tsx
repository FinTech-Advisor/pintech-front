'use client'
import React from 'react'
import loadable from '@loadable/component'
import { MainContentBox } from "@/app/global/components/ContentBox"
import { MainTitle } from "@/app/global/components/StyledTitle"
const LoginContainer = loadable(() => {
  return import('../containers/LoginContainer');
});

const LoginPage = () => {

  return (
    <MainContentBox>
      <h1>로그인</h1>
      <LoginContainer/>
    </MainContentBox>
  )
}

export default React.memo(LoginPage)