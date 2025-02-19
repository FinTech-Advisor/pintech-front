import React from 'react'
import BoardFormController from '../../controllers/BoardFormController'
import { MainContentBox } from '@/app/global/components/ContentBox'

type ParamType = {
  bid?: string
}

const WritePage = (props: any) => {
  const { params } = props as { params: ParamType }
  const bid = params?.bid && params.bid !== '{bid}' ? params.bid : undefined

  console.log('WritePage params:', params) // 디버깅

  return (
    <MainContentBox>
      <BoardFormController bid={bid} />
    </MainContentBox>
  )
}

export default React.memo(WritePage)
