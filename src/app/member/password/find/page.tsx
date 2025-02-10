'use client'

import React, { useState, useCallback, useActionState } from 'react'
import FindPasswordForm from '../../components/password/password/find/FindPasswordForm'
import { processFindPassword } from '../../services/actions'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
const FindPasswordPage = () => {
  const actionState = useActionState(processFindPassword)
  const [form, setForm] = useState({ email: '' })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return (
    <div>
      <MainContentBox max={750} min={650}>
        <MainTitle>비밀번호 찾기</MainTitle>
        <FindPasswordForm
          actionState={actionState}
          form={form}
          onChange={onChange}
        />
      </MainContentBox>
    </div>
  )
}

export default FindPasswordPage
