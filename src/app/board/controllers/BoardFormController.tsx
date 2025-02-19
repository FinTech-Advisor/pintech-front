'use client'

import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useActionState,
} from 'react'
import { updateBoard, getBoard } from '../services/actions'
import useSkin from '../hooks/useSkin'
import useMainTitle from '@/app/global/hooks/useMainTitle'
import useUser from '@/app/global/hooks/useUser'
import { menus } from '@/app/global/datas/menus'
import Link from 'next/link'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import sizes from '@/app/global/styles/sizes'

const { dark, white } = colors
const { medium } = sizes

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

const StyledMenu = styled.nav`
  box-shadow: 2px 2px 5px ${dark};
  display: flex;
  border-radius: 3px;
  height: 45px;
  margin-bottom: 40px;

  a {
    color: ${dark};
    line-height: 45px;
    font-size: ${medium};
    padding: 0 35px;
    margin: 0 auto;

    &.on {
      color: ${white};
      background: ${dark};
    }
  }
`

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
    console.log('Received bid:', bid) // bid 값 확인

    if (!bid || bid === '{bid}') {
      setBoard({ name: '새 게시판', skin: 'default' })
      if (typeof setTitle === 'function') {
        setTitle(seq ? '게시글 수정' : '새 글 작성')
      }
      return
    }

    ;(async () => {
      try {
        const _board = await getBoard(bid)

        if (_board) {
          console.log('Fetched board data:', _board)
          setBoard(_board)
          if (typeof setTitle === 'function') {
            setTitle(
              seq ? `${_board.name} - 글 수정` : `${_board.name} - 글 작성`,
            )
          }
        } else {
          console.warn('Board data is null or undefined')
          setBoard({ name: '게시판 없음', skin: 'default' })
          if (typeof setTitle === 'function') {
            setTitle(seq ? '게시글 수정' : '새 글 작성')
          }
        }
      } catch (err) {
        console.error('Error fetching board:', err)
        setBoard({ name: '게시판 없음', skin: 'default' })
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
  console.log('Loaded Form component:', Form)

  return (
    <>
      <StyledMenu>
        {menus.board.map((item) => (
          <Link key={item.code} href={item.url}>
            {item.name}
          </Link>
        ))}
      </StyledMenu>

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
