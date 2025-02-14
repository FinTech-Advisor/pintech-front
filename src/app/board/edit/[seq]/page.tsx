import React from 'react'
import BoardFormController from '../../controllers/BoardFormController'

type ParamType = {
  bid?: string
  seq?: number
}

// 경로변수 [...props] = 현재 경로와 하위경로 전체

const EditPage = ({ params }) => {
  const { seq } = React.use<ParamType>(params)
  return <BoardFormController seq={seq} />
}

export default React.memo(EditPage)
