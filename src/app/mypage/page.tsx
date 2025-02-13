'use client'
import React from 'react'
import { MainTitle } from '../global/components/StyledTitle'
import { MainContentBox } from '../global/components/ContentBox'
import MypageContainer from './containers/MypageContainer'

import { Suspense } from 'react'
const Mypage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContentBox max={650} min={550}>
          <MainTitle>마이페이지</MainTitle>
          <MypageContainer />
        </MainContentBox>
      </Suspense>
    </>
  )
}
export default React.memo(Mypage)
