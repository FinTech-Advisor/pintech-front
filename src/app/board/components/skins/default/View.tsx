import React from 'react'
import { MainContentBox } from '@/app/global/components/ContentBox'
import MainTitle from '@/app/global/components/StyledTitle'
import styled from 'styled-components'
import type { CommonType } from '@/app/global/types/StyledType'

const StyledView = styled.div<CommonType>``

const View = ({data}) => {
  const {subject, content} = data
  return<>
  <MainContentBox>
    <MainTitle>{subject}</MainTitle>
    <StyledView>
      <div className="content" dangerouslySetInnerHTML={{__html:content}}></div>
    </StyledView>
  </MainContentBox>
  </>
}

export default React.memo(View)
