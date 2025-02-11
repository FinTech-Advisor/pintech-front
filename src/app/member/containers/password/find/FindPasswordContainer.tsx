'use client'

import React, { useState, useCallback, useActionState } from 'react'
import FindPasswordForm from '@/app/member/components/password/password/find/FindPasswordForm'
import { useSearchParams } from 'next/navigation'
import { processFindPassword } from '@/app/member/services/actions'

const FindPasswordContainer = () => {
  const searchParams = useSearchParams()
  const actionState = useActionState(processFindPassword, searchParams)
  const [form, setForm] = useState({ email: '' })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return (
    <FindPasswordForm
      actionState={actionState}
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(FindPasswordContainer)
