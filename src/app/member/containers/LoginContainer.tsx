'use client'
import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from '../components/LoginForm'
import { processLogin } from '../services/actions'

type Props = {
  redirectUrl?: string
}

const LoginContainer = ({ redirectUrl }: Props) => {
  const searchParams = useSearchParams()
  const params = { redirectUrl: redirectUrl ?? searchParams.get('redirectUrl') }
  const actionState = useActionState(processLogin, params)
  const [form, setForm] = useState<{ email?: string; password?: string }>({})

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return <LoginForm actionState={actionState} onChange={onChange} form={form} />
}

export default React.memo(LoginContainer)
