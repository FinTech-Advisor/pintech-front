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
import useUser from '@/app/global/hooks/useUser'

type Props = {
  bid?: string
  seq?: number
}

type Board = {
  name: string
  skin: 'default' | 'gallery' // 🔥 'string' → 정확한 타입 지정
}

type FormData = {
  mode: 'edit' | 'write'
  gid: string
  poster: string
  subject?: string
  content?: string
  notice?: boolean
  guestPw?: string
}

const BoardFormController = ({ bid, seq }: Props) => {
  const { isLogin, userInfo } = useUser()
  const [board, setBoard] = useState<Board | null>(null)
  const [data, setData] = useState<FormData>({
    mode: seq ? 'edit' : 'write',
    gid: `${Date.now()}`,
    poster: !seq && isLogin ? userInfo.name : '',
  })

  const [, setTitle] = useMainTitle()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
    },
    [],
  )

  const onEditorChange = useCallback(
    (content: string) => setData((prevData) => ({ ...prevData, content })),
    [],
  )

  const [actionState] = useActionState(updateBoard, null) // ✅ undefined → null로 변경

  const onClick = useCallback((field: string, value: string | boolean) => {
    setData((prevData) => ({ ...prevData, [field]: value }))
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      if (bid) {
        try {
          const _board = await getBoard(bid)
          if (!_board) notFound()

          if (typeof setTitle === 'function') {
            setTitle(_board.name)
          }
          setBoard(_board)
        } catch (err) {
          console.error(err)
          notFound()
        }
      }
    })()
  }, [bid, setTitle])

  // 🔥 board?.skin이 'default' | 'gallery'가 아닐 경우 기본값 'default' 적용
  const skinType: 'default' | 'gallery' =
    board?.skin === 'gallery' ? 'gallery' : 'default'

  const Form = useSkin(skinType, 'form')

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
