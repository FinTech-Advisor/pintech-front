'use client'

import React from 'react'
import Messages from '@/app/global/components/Messages'
import styled from 'styled-components'
import { MediumButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'
import { buttonColors } from '@/app/global/styles/colors'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

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

  .delete-type-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
  }
`

interface SignOutFormProps {
  form: {
    email: string
    deleteType: string
  }
  onChange: React.ChangeEventHandler<HTMLInputElement>
  errors?: Record<string, string> // 기본값을 위해 옵셔널 처리
  onClick: (field: string, value: string) => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
  isPending: boolean
}

const SignOutForm: React.FC<SignOutFormProps> = ({
  form = { email: '', deleteType: 'soft' }, // 기본값 추가
  onChange,
  errors = {}, // 기본값 추가
  onClick,
  onSubmit,
  isPending,
}) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      {/* 이메일 입력 */}
      <Input
        type="text"
        name="email"
        placeholder="이메일"
        color="dark"
        value={form.email}
        onChange={onChange}
      />
      <Messages color="danger">{errors.email}</Messages>

      {/* 탈퇴 방식 선택 - 소프트 탈퇴 */}
      <div
        className="delete-type-label"
        onClick={() =>
          onClick('deleteType', form.deleteType === 'soft' ? '' : 'soft')
        }
      >
        {form.deleteType === 'soft' ? (
          <MdCheckBox />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
        <span>소프트 탈퇴 (정보 보존)</span>
      </div>

      {/* 탈퇴 방식 선택 - 하드 탈퇴 */}
      <div
        className="delete-type-label"
        onClick={() =>
          onClick('deleteType', form.deleteType === 'hard' ? '' : 'hard')
        }
      >
        {form.deleteType === 'hard' ? (
          <MdCheckBox />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
        <span>하드 탈퇴 (모든 데이터 삭제)</span>
      </div>

      <Messages color="danger">{errors.deleteType}</Messages>

      {/* 버튼: isPending 상태에 따라 텍스트 변경 */}
      <MediumButton type="submit" disabled={isPending}>
        {isPending ? '탈퇴 처리 중...' : '탈퇴 처리'}
      </MediumButton>
    </StyledForm>
  )
}

export default React.memo(SignOutForm)
