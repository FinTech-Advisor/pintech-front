'use client'

import React from 'react'
import { CommonType } from '@/app/global/types/StyledType'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'
import useUser from '@/app/global/hooks/useUser'
import styled from 'styled-components'

const StyledForm = styled.form<CommonType>`

`
const Form =() =>{
  return <>
  <MainContentBox max={750} min={650}>
    <MainTitle>{'글 제목'}</MainTitle>
  </MainContentBox>
</>
}
  
  


export default React.memo(Form)