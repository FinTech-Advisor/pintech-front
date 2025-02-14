'use client'
import React from 'react'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'

import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { Input, Textarea } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import Messages from '@/app/global/components/Messages'
import useUser from '@/app/global/hooks/useUser'
import Editor from '@/app/global/components/Editor'

const StyledForm = styled.form<CommonType>``

const Form = ({
  board,
  data,
  onEditorChange,
  onChange,
  actionState,
  onClick,
}) => {
  const [errors, formAction, isPending] = actionState
  const { useEditor, useEditorImage, useAttachFile } = board
  const { isLogin, isAdmin } = useUser()
  const onFileUpload = (files)=> {}

  return (
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>{board.name}</MainTitle>
        <StyledForm action={formAction} autoComplete="off">
          <input type="hidden" name="mode" value={data?.mode}/>
          {data?.mode === 'edit'} <input type="hidden" name ='seq' value={data?.seq} />
          <input type="hidden" name="bid" value={board?.bid ?? ''} />
          <input type="hidden" name="gid" value={data?.gid ?? ''} />
          <input type="hidden" name="content" value={data?.content ?? ''}/>
          <input type="hidden" name='data'></input>
          <Messages color="danger">{errors?.bid}</Messages>
          <Messages color="danger">{errors?.gid}</Messages>
          <Messages color="danger">{errors?.global}</Messages>

          {board?.categories && (
            <div className="row">
              {board?.categories.map((category) => (
                <span
                  key={'category_' + category}
                  onClick={() => onClick('category', category)}
                >
                  {category === data?.category ? (
                    <MdRadioButtonChecked />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}{' '}
                  {category}
                </span>
              ))}
            </div>
          )}

          <div className="row poster">
            <div>
              <Input
                type="text"
                name="poster"
                value={data?.poster ?? ''}
                onChange={onChange}
                placeholder="작성자"
              />
              {isAdmin && (
                <span onClick={() => onClick('notice', !Boolean(data?.notice))}>
                  {data?.notice ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}{' '}
                  공지글
                </span>
              )}
            </div>
            <Messages color="danger">{errors?.poster}</Messages>
          </div>
          {((!isLogin && data?.mode === 'write') ||
            (data && data.mode === 'edit' && !data.createdBy)) && (
            <div className="row">
              <Input
                type="password"
                name="guestPw"
                value={data?.guestPw ?? ''}
                onChange={onChange}
              />
              <Messages color="danger">{errors?.guestPw}</Messages>
            </div>
          )}

          <div className="row">
            <Input
              type="text"
              name="subject"
              value={data?.subject ?? ''}
              onChange={onChange}
            />
            <Messages color="danger">{errors?.subject}</Messages>
          </div>

          <div className="row content-row">
            {useEditor ? (
              <Editor
                onChange={onEditorChange}
                useImage={useEditorImage}
                gid={data?.gid}
                location="editor"
              />
            ) : (
              <Textarea
                name="content"
                value={data?.content ?? ''}
                onChange={onChange}
                placeholder="내용을 입력하세요"
              />
            )}
            <Messages color="danger">{errors?.content}</Messages>

            {useAttachFile && <div className='row'>
              </div>}
          </div>
          <BigButton type="submit" disabled={isPending} color="primary">
            {data?.mode === 'edit' ? '수정' : '작성'}
          </BigButton>
        </StyledForm>
      </MainContentBox>
    </>
  )
}

export default React.memo(Form)
