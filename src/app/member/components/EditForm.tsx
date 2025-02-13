'use client'
import styled from 'styled-components'
import React from 'react'
import { Input } from '@/app/global/components/FormComponents'
import { SmallButton, BigButton } from '@/app/global/components/Buttons'
import Messages from '@/app/global/components/Messages'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const EditForm = ({ form, onClick, onChange, actionState }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <input
          type="hidden"
          name="optionalTerms"
          defaultValue={form?.optionalTerms ?? ''}
        />
        <Input
          type="text"
          name="email"
          placeholder="이메일"
          color="dark"
          value={form?.email ?? ''}
          readOnly
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          color="dark"
          value={form?.password ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{errors?.password}</Messages>

        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          color="dark"
          value={form?.confirmPassword ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{errors?.confirmPassword}</Messages>
        <div className="address-row">
          <Input
            type="text"
            name="zipCode"
            placeholder="우편번호"
            color="dark"
            value={form?.zipCode ?? ''}
            onChange={onChange}
          />
          <SmallButton type="button">주소 검색</SmallButton>
        </div>

        <Input
          type="text"
          name="address"
          placeholder="주소"
          color="dark"
          value={form?.address ?? ''}
          onChange={onChange}
        />

        <Input
          type="text"
          name="addressSub"
          placeholder="나머지 주소"
          color="dark"
          value={form?.addressSub ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{errors?.address}</Messages>

        <Input
          type="text"
          name="phoneNumber"
          placeholder="휴대폰 번호"
          color="dark"
          value={form?.phoneNumber ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{errors?.phoneNumber}</Messages>
        <div
          className="terms-row"
          onClick={() =>
            onClick('optionalTerms', form?.optionalTerms ? '' : 'advertisment')
          }
        >
          {form?.optionalTerms ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          광고성 정보 전송에 동의합니다. (선택)
        </div>
        <BigButton type="submit" className="submit-btn" disabled={isPending}>
          정보 수정
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(EditForm)
