import React from 'react'
import BoardFormController from '../../controllers/BoardFormController'

type ParamType = {
  bid?: string
  seq?: number
}

const WritePage = ({ params }) => {
  const { bid } = React.use<ParamType>(params)
  return <BoardFormController bid={bid} />
}

export default React.memo(WritePage)
