'use client'
import React, { useState, useActionState, useCallback } from 'react'
import ModifyContainer from '@/app/member/containers/modify/ModifyContainer'
import { useSearchParams } from 'next/navigation'
import { processModify } from '@/app/member/services/actions'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'

const ModifyPage = () => {
  const searchParams = useSearchParams()
  const actionState = useActionState(processModify, searchParams)

  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    email: '',
    optionalTerms: '', // State to handle the optionalTerms checkbox
    zipCode: '',
  })

  // Handling form input changes
  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  // Handling form submit
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      // Here you can process the form submission
      console.log('Form submitted:', form)
    },
    [form],
  )

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
          actionState={actionState}
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          onClick={onClick} // Passing onClick for optional terms toggle
        />
      </MainContentBox>
    </>
  )
}

export default ModifyPage
