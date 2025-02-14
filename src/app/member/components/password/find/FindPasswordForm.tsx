'use client'

import React from 'react'
import Messages from '@/app/global/components/Messages'
import styled from 'styled-components'
import { MediumButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'
import { buttonColors } from '@/app/global/styles/colors'

const StyledForm = styled.form`
  button {
    background-color: ${buttonColors.dark[0]};
    border: none;
    margin-top: 10px;
    color: ${buttonColors.dark[1]};
    width: 100%;
    height: 40px;
  }
`

interface FindPasswordFormProps {
  form?: {
    email: string
  }
  onChange: React.ChangeEventHandler<HTMLInputElement>
  actionState: [
    Record<string, string>, // errors
    string | ((formData: FormData) => void | Promise<void>), // formAction
    boolean, // isPending
  ]
}

const FindPasswordForm: React.FC<FindPasswordFormProps> = ({
  form = { email: '' },
  onChange = () => {},
  actionState = [{}, () => {}, false],
}) => {
  const [errors, formAction, isPending] = actionState

  // errors가 undefined일 경우 빈 객체로 초기화
  const safeErrors = errors || {}

  return (
    <StyledForm action={formAction} autoComplete="off">
      <Input
        type="text"
        name="email"
        placeholder="이메일"
        color="dark"
        value={form.email ?? ''}
        onChange={onChange}
      />
      {/* errors.email이 undefined일 경우 안전하게 처리 */}
      <Messages color="danger">{safeErrors?.email}</Messages>{' '}
      {/* optional chaining 사용 */}
      <MediumButton type="submit" disabled={isPending}>
        비밀번호 찾기
      </MediumButton>
    </StyledForm>
  )
}

export default React.memo(FindPasswordForm)
