'use client'
import React from 'react'
import Messages from '@/app/global/components/Messages'
import styled from 'styled-components'
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from 'react-icons/md'
import { SmallButton, BigButton } from '@/app/global/components/Buttons'
import { Input } from '@/app/global/components/FormComponents'
import DatePicker from 'react-datepicker'

const StyledForm = styled.form``

const JoinForm = ({ form, onClick, onChange, onSelectDate, actionState }) => {
  const [errors, formAction, isPending] = actionState

  // 기본값 할당 (변수 재선언 없이)
  const currentForm = form ?? {} // form의 기본값
  const currentErrors = errors ?? {} // errors의 기본값

  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        {/* Hidden Inputs */}
        {[
          'gender',
          'birthDt',
          'requiredTerms1',
          'requiredTerms2',
          'requiredTerms3',
          'optionalTerms',
        ].map((field) => (
          <input
            key={field}
            type="hidden"
            name={field}
            defaultValue={currentForm[field] ?? ''}
          />
        ))}

        {/* 이메일 입력 */}
        <Input
          type="text"
          name="email"
          placeholder="이메일"
          color="dark"
          value={currentForm.email ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{currentErrors.email}</Messages>

        {/* 비밀번호 입력 */}
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          color="dark"
          value={currentForm.password ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{currentErrors.password}</Messages>

        <Input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          color="dark"
          value={currentForm.confirmPassword ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{currentErrors.confirmPassword}</Messages>

        <Input
          type="text"
          name="name"
          placeholder="이름"
          color="dark"
          value={currentForm.name ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{currentErrors.name}</Messages>

        {/* 주소 입력 */}
        <div className="address-row">
          <Input
            type="text"
            name="zipCode"
            placeholder="우편번호"
            color="dark"
            value={currentForm.zipCode ?? ''}
            onChange={onChange}
          />
          <SmallButton type="button">주소찾기</SmallButton>
        </div>
        <Input
          type="text"
          name="address"
          placeholder="집주소"
          color="dark"
          value={currentForm.address ?? ''}
          onChange={onChange}
        />
        <Input
          type="text"
          name="addressSub"
          placeholder="나머지 주소"
          color="dark"
          value={currentForm.addressSub ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{currentErrors.address}</Messages>

        {/* 휴대폰 번호 입력 */}
        <Input
          type="text"
          name="phoneNumber"
          placeholder="휴대폰번호"
          color="dark"
          value={currentForm.phoneNumber ?? ''}
          onChange={onChange}
        />
        <Messages color="danger">{currentErrors.phoneNumber}</Messages>

        {/* 성별 선택 */}
        <div className="row">
          <div className="tit">성별</div>
          <div className="radio-buttons">
            {['FEMALE', 'MALE'].map((gender) => (
              <span key={gender} onClick={() => onClick('gender', gender)}>
                {currentForm.gender === gender ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}{' '}
                {gender === 'FEMALE' ? '여성' : '남성'}
              </span>
            ))}
          </div>
        </div>
        <Messages color="danger">{currentErrors.gender}</Messages>

        {/* 생년월일 선택 */}
        <div className="row">
          <div className="tit">생년월일</div>
          <DatePicker
            selected={
              currentForm.birthDt ? new Date(currentForm.birthDt) : null
            }
            onChange={onSelectDate}
          />
        </div>
        <Messages color="danger">{currentErrors.birthDt}</Messages>

        {/* 약관 동의 */}
        <div className="terms">
          {[
            { field: 'requiredTerms1', label: '이용약관에 동의합니다.' },
            {
              field: 'requiredTerms2',
              label: '개인정보 처리방침에 동의합니다.',
            },
            {
              field: 'requiredTerms3',
              label: '개인정보 수집 및 이용에 동의합니다.',
            },
            {
              field: 'optionalTerms',
              label: '광고성 정보 전송에 동의합니다.(선택)',
            },
          ].map(({ field, label }) => (
            <div
              key={field}
              className="terms-row"
              onClick={() => onClick(field, !currentForm[field])}
            >
              {currentForm[field] ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}{' '}
              {label}
            </div>
          ))}
        </div>

        {/* 가입하기 버튼 */}
        <BigButton type="submit" disabled={isPending} className="submit-btn">
          가입하기
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(JoinForm)
