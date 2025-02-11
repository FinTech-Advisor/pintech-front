'use client'

import React from 'react'
import Messages from '@/app/global/components/Messages'
import styled from 'styled-components'
import { MediumButton, ButtonGroup } from '@/app/global/components/Buttons'
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

const FindPasswordForm = ({ form, onChange, actionState }) => {
  const [errors, formAction, isPending] = actionState

  return (
    <StyledForm action={formAction} autoComplete="off">
      <Input
        type="text"
        name="email"
        placeholder="이메일"
        color="dark"
        value={form?.email ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.email}</Messages>
      <MediumButton type="submit" disabled={isPending}>
        비밀번호 찾기
      </MediumButton>
    </StyledForm>
  )
}

export default React.memo(FindPasswordForm)
