import React, { ChangeEvent } from 'react'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input, Textarea } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import Messages from '@/app/global/components/Messages'
import useUser from '@/app/global/hooks/useUser'
import Editor from '@/app/global/components/Editor'

const StyledForm = styled.form<CommonType>``

interface FormProps {
  board: {
    name: string
    bid: string
    useEditor: boolean
    useEditorImage: boolean
    useAttachFile: boolean
  }
  data: {
    gid: string
    poster: string
    notice: boolean
    guestPw: string
    subject: string
    content: string
    mode: 'write' | 'edit'
    createdBy?: string
  }
  onEditorChange: (value: string) => void
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  actionState: [
    errors: Record<string, string | undefined>,
    formAction: string,
    isPending: boolean,
  ]
  onClick: (key: string, value: boolean) => void
}

const Form = ({
  board,
  data,
  onEditorChange,
  onChange,
  actionState,
  onClick,
}: FormProps) => {
  const [errors, formAction, isPending] = actionState
  const { useEditor, useEditorImage } = board

  const { isLogin, isAdmin } = useUser()

  return (
    <MainContentBox max={750} min={650}>
      <MainTitle>{board.name}</MainTitle>
      <StyledForm action={formAction} autoComplete="off">
        <input type="hidden" name="bid" value={board.bid ?? ''} />
        <input type="hidden" name="gid" value={data.gid ?? ''} />
        <input type="hidden" name="content" value={data.content ?? ''} />

        <Messages color="danger">{errors?.bid}</Messages>
        <Messages color="danger">{errors?.gid}</Messages>
        <Messages color="danger">{errors?.global}</Messages>

        <div className="row poster">
          <div>
            <Input
              type="text"
              name="poster"
              value={data.poster ?? ''}
              onChange={onChange}
              placeholder="작성자"
            />
            {isAdmin && (
              <span onClick={() => onClick('notice', !Boolean(data.notice))}>
                {data.notice ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}{' '}
                공지글
              </span>
            )}
          </div>
          <Messages color="danger">{errors?.poster}</Messages>
        </div>

        {((!isLogin && data.mode === 'write') ||
          (data && data.mode === 'edit' && !data.createdBy)) && (
          <div className="row">
            <Input
              type="password"
              name="guestPw"
              value={data.guestPw ?? ''}
              onChange={onChange}
            />
            <Messages color="danger">{errors?.guestPw}</Messages>
          </div>
        )}

        <div className="row">
          <Input
            type="text"
            name="subject"
            value={data.subject ?? ''}
            onChange={onChange}
          />
          <Messages color="danger">{errors?.subject}</Messages>
        </div>

        <div className="row content-row">
          {useEditor ? (
            <Editor
              onChange={onEditorChange} // Corrected the prop name here
              useImage={useEditorImage}
              gid={data.gid}
              location="editor"
            />
          ) : (
            <Textarea
              name="content"
              value={data.content ?? ''}
              onChange={onChange}
              placeholder="내용을 입력하세요"
            />
          )}
          <Messages color="danger">{errors?.content}</Messages>
        </div>

        <BigButton type="submit" disabled={isPending} color="primary">
          {data.mode === 'edit' ? '수정' : '작성'}
        </BigButton>
      </StyledForm>
    </MainContentBox>
  )
}

export default Form
