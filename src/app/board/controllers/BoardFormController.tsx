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
import useUser from '@/app/global/hooks/useUser'

type Props = {
  bid?: string
  seq?: number
}

type Board = {
  name: string
  skin: 'default' | 'gallery'
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

  const [actionState] = useActionState(updateBoard, null)

  const onClick = useCallback((field: string, value: string | boolean) => {
    setData((prevData) => ({ ...prevData, [field]: value }))
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      if (bid) {
        try {
          const _board = await getBoard(bid)
          console.log('Fetched board data:', _board) // ✅ 데이터 확인용 로그

          if (_board) {
            setBoard(_board)
            if (typeof setTitle === 'function') {
              setTitle(
                seq ? `${_board.name} - 글 수정` : `${_board.name} - 글 작성`,
              )
            }
          } else {
            console.warn('Board data is null or undefined') // ✅ 오류 방지용 로그
            setBoard({ name: '게시판 없음', skin: 'default' }) // 🔥 기본값 설정
            if (typeof setTitle === 'function') {
              setTitle(seq ? '게시글 수정' : '새 글 작성')
            }
          }
        } catch (err) {
          console.error('Error fetching board:', err)
          setBoard({ name: '게시판 없음', skin: 'default' }) // 🔥 기본값 설정
          if (typeof setTitle === 'function') {
            setTitle(seq ? '게시글 수정' : '새 글 작성')
          }
        }
      } else {
        setBoard({ name: '새 게시판', skin: 'default' }) // 🔥 bid가 없을 때 기본값
        if (typeof setTitle === 'function') {
          setTitle(seq ? '게시글 수정' : '새 글 작성')
        }
      }
    })()
  }, [bid, seq, setTitle])

  useLayoutEffect(() => {
    if (!seq && isLogin) {
      setData((prevData) => ({
        ...prevData,
        poster: userInfo.name,
      }))
    }
  }, [isLogin, seq, userInfo])

  const skinType: 'default' | 'gallery' =
    board?.skin === 'gallery' ? 'gallery' : 'default'

  const Form = useSkin(skinType, 'form')
  console.log('Loaded Form component:', Form) // ✅ Form 확인

  return (
    <>
      {Form ? (
        <Form
          board={board}
          data={data}
          onEditorChange={onEditorChange}
          onChange={onChange}
          onClick={onClick}
          actionState={actionState}
        />
      ) : (
        <div>폼을 불러오는 중입니다...</div>
      )}
    </>
  )
}

export default React.memo(BoardFormController)
