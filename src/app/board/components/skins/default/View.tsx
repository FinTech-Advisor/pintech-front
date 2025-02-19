import React, { useEffect, useState } from 'react'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
// import colors from '@/app/global/styles/colors'
// import sizes from '@/app/global/styles/sizes'

const StyledView = styled.div<CommonType>``

const View = ({ data }) => {
  const [contentData, setContentData] = useState(null)

  useEffect(() => {
    if (data) {
      // 데이터가 있으면 상태에 저장
      setContentData(data)
    } else {
      // 데이터가 없으면 null로 설정
      setContentData(null)
    }
  }, [data]) // data가 변경될 때마다 useEffect가 실행됨

  if (!contentData) {
    return (
      <MainContentBox min={1200}>
        <MainTitle>Not Found</MainTitle>
        <StyledView>
          <div className="content">데이터를 찾을 수 없습니다.</div>
        </StyledView>
      </MainContentBox>
    )
  }

  const { subject, content } = contentData

  return (
    <MainContentBox min={1200}>
      <MainTitle>{subject}</MainTitle>
      <StyledView>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </StyledView>
    </MainContentBox>
  )
}

export default React.memo(View)
