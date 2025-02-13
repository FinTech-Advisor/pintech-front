import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import Messages from '@/app/global/components/Messages'

const StyledForm = styled.form`
  Input + Input {
    margin-bottom: 5px;
  }
`

const PasswordForm = ({ actionState, onChange, form, mode }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      {mode === true ? ( // 비밀번호 찾기 후 이메일로 넘기기 mode true
        <StyledForm action={formAction} autoComplete="off">
          <Input
            type="text"
            name="name"
            onChange={onChange}
            placeholder="이름"
            color="dark"
            value={form?.name ?? ''}
          />
          <Messages color="danger">{errors?.name}</Messages>
          <Input
            type="text"
            name="phoneNumber"
            onChange={onChange}
            placeholder="휴대폰번호"
            color="dark"
            value={form?.phoneNumber ?? ''}
          />
          <Messages color="danger">{errors?.phoneNumber}</Messages>
          <BigButton type="submit" disabled={isPending} color="primary">
            이메일로 받기
          </BigButton>
          <Messages color="danger">{errors?.global}</Messages>
        </StyledForm>
      ) : (
        // 비밀번호 변경 mode false
        <StyledForm action={formAction} autoComplete="off">
          <Input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="비밀번호"
            color="dark"
            value={form?.password ?? ''}
          ></Input>
          <Messages color="danger">{errors?.password}</Messages>
          <Input
            type="password"
            name="confirmPassword"
            onChange={onChange}
            placeholder="비밀번호 확인"
            color="dark"
            value={form?.confirmPassword ?? ''}
          ></Input>
          <Messages color="danger">{errors?.confirmPassword}</Messages>
          <BigButton type="submit" disabled={isPending} color="primary">
            비밀번호 변경
          </BigButton>
          <Messages color="danger">{errors?.misMatch}</Messages>
        </StyledForm>
      )}
    </>
  )
}

export default React.memo(PasswordForm)
