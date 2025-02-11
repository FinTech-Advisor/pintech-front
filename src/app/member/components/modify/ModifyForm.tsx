import React from 'react'
import Messages from '@/app/global/components/Messages'
import styled from 'styled-components'
import { MediumButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'
import { buttonColors } from '@/app/global/styles/colors'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

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

const ModifyForm = ({ form, onChange, errors, onSubmit, onClick }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      {/* Name Input */}
      <Input
        type="text"
        name="name"
        placeholder="이름"
        color="dark"
        value={form?.name ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.name}</Messages>

      {/* Email Input */}
      <Input
        type="email"
        name="email"
        placeholder="이메일"
        color="dark"
        value={form?.email ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.email}</Messages>

      {/* Password Input */}
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        color="dark"
        value={form?.password ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.password}</Messages>

      {/* Confirm Password Input */}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        color="dark"
        value={form?.confirmPassword ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.confirmPassword}</Messages>

      {/* Zip Code Input */}
      <Input
        type="text"
        name="zipCode"
        placeholder="우편번호"
        color="dark"
        value={form?.zipCode ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.zipCode}</Messages>

      {/* Address Input */}
      <Input
        type="text"
        name="address"
        placeholder="주소"
        color="dark"
        value={form?.address ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.address}</Messages>

      {/* Sub Address Input */}
      <Input
        type="text"
        name="addressSub"
        placeholder="나머지 주소"
        color="dark"
        value={form?.addressSub ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.addressSub}</Messages>

      {/* Phone Number Input */}
      <Input
        type="text"
        name="phoneNumber"
        placeholder="휴대폰번호"
        color="dark"
        value={form?.phoneNumber ?? ''}
        onChange={onChange}
      />
      <Messages color="danger">{errors?.phoneNumber}</Messages>

      {/* Optional Terms Checkbox */}
      <div
        className="terms-row"
        onClick={() => {
          onClick('optionalTerms', form?.optionalTerms ? '' : 'advertisement')
        }}
      >
        {form?.optionalTerms ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        광고성 정보 전송에 동의합니다.(선택)
      </div>

      <Messages color="danger">{errors?.optionalTerms}</Messages>

      <MediumButton type="submit">회원정보 수정</MediumButton>
    </StyledForm>
  )
}

export default React.memo(ModifyForm)
