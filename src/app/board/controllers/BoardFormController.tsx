'use client'
import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useActionState,
} from 'react'
import { updateBoard } from '../services/actions'
import useSkin from '../hooks/useSkin'
import useMainTitle from '@/app/global/hooks/useMainTitle'
import { getBoard } from '../services/actions'
import { notFound } from 'next/navigation'
type Props = {
  bid?: string
  seq?: number
}

const BoardFormController = ({ bid, seq }: Props) => {
  const [board, setBoard] = useState<any>()
  const [data, setData] = useState<any>({
    mode: seq ? 'edit' : 'write',
    gid: '' + Date.now(),
  })
  const setTitle = useMainTitle(undefined)
  const actionState = useActionState(updateBoard, undefined)

  const onChange = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }, [])

  const onEditorChange = useCallback((content) => {
    setData((data) => ({ ...data, content }))
  }, [])

  const onClick = useCallback((field, value) => {
    setData((data) => ({ ...data, [field]: value }))
  }, [])

  useLayoutEffect(() => {
    if (bid) {
      ;(async () => {
        const _board = await getBoard(bid)
        if (!_board) {
          notFound()
        }
        const title = _board.name
        setTitle(title)
        setBoard(_board)
      })()
    }
  }, [bid, setTitle])

  const Form = useSkin(board?.skin, 'form')

  return (
    Form && (
      <Form
        board={board}
        data={data}
        onEditorChange={onEditorChange}
        onChange={onChange}
        onClick={onClick}
        actionState={actionState}
      />
    )
  )
}

export default React.memo(BoardFormController)