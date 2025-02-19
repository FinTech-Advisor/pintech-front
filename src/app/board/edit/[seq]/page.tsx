import React from 'react'
import BoardFormController from '../../controllers/BoardFormController'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
type ParamType = {
  bid?: string
  seq?: number
}

// 경로변수 [...props] = 현재 경로와 하위경로 전체

const EditPage = ({ params }) => {
  const { seq } = React.use<ParamType>(params)
  return (
    <MainContentBox>
      <BoardFormController seq={seq} />
    </MainContentBox>
  )
}

export default React.memo(EditPage)
