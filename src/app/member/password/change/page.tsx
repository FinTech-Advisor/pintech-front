'use client'

import React, { useState, useCallback, useActionState } from 'react'
import ChangePasswordForm from '../../components/password/password/change/ChangePasswordForm'
import { processChangePassword } from '../../services/actions'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'

const ChangePasswordPage = () => {
  const actionState = useActionState(processChangePassword)
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return (
    <div>
      <MainContentBox max={750} min={650}>
        <MainTitle>비밀번호 변경</MainTitle>
        <ChangePasswordForm
          actionState={actionState}
          form={form}
          onChange={onChange}
        />
      </MainContentBox>
    </div>
  )
}

export default ChangePasswordPage
