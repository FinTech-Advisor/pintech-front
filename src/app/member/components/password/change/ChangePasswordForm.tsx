'use client'

import React from 'react'
import Messages from '@/app/global/components/Messages'
import styled from 'styled-components'
import { MediumButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'
import { buttonColors } from '@/app/global/styles/colors'

// 스타일링 적용
const StyledForm = styled.form`
  button {
    background-color: ${buttonColors.dark[0]};
    border: none;
    color: ${buttonColors.dark[1]};
    width: 100%;
    height: 40px;
    margin-top: 10px;
  }
`

// ChangePasswordFormProps 인터페이스 수정
interface ChangePasswordFormProps {
  form?: {
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
  }
  onChange: React.ChangeEventHandler<HTMLInputElement>
  errors?: Record<string, string>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  isPending: boolean
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  form = {},
  onChange,
  errors = {},
  onSubmit,
  isPending,
}) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <Input
        type="password"
        name="currentPassword"
        placeholder="현재 비밀번호"
        color="dark"
        value={form.currentPassword ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors.currentPassword}</Messages>

      <Input
        type="password"
        name="newPassword"
        placeholder="새 비밀번호"
        color="dark"
        value={form.newPassword ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors.newPassword}</Messages>

      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        color="dark"
        value={form.confirmPassword ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors.confirmPassword}</Messages>

      <MediumButton type="submit" disabled={isPending}>
        {isPending ? '처리 중...' : '비밀번호 변경'}
      </MediumButton>
    </StyledForm>
  )
}

export default React.memo(ChangePasswordForm)
