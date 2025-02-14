'use client'

import React, { useState, useCallback } from 'react'
import ModifyContainer from '@/app/member/containers/modify/ModifyContainer'

import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'

const ModifyPage = () => {
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    email: '',
    optionalTerms: '', // State to handle the optionalTerms checkbox
    zipCode: '',
    addressSub: '', // 추가된 필드
  })

  // Handling form input changes
  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  // onClick function to toggle 'optionalTerms'
  const onClick = useCallback((field, value) => {
    setForm((form) => ({
      ...form,
      [field]: form[field] === value ? '' : value, // Toggle logic
    }))
  }, [])

  return (
    <>
      <MainContentBox max={650} min={550}>
        <MainTitle>회원정보 수정</MainTitle>
        <ModifyContainer
          form={form}
          onChange={onChange}
          onClick={onClick} // Passing onClick for optional terms toggle
        />
      </MainContentBox>
    </>
  )
}
export default ModifyPage
