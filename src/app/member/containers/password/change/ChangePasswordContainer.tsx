'use client'

import React, { useState, useCallback } from 'react'
import ChangePasswordForm from '@/app/member/components/password/password/change/ChangePasswordForm'
import { useSearchParams } from 'next/navigation'
import { processChangePassword } from '@/app/member/services/actions'

const ChangePasswordContainer = () => {
  const searchParams = useSearchParams()
  const actionState = useActionState(processChangePassword, searchParams)

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return (
    <ChangePasswordForm
      actionState={actionState}
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(ChangePasswordContainer)
