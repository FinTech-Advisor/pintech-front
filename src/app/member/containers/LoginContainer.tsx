'use client'

import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from '../components/LoginForm'
import { processLogin } from '../services/actions'

// 타입 수정
type Props = {
  redirectUrl?: string
}

const LoginContainer = ({ redirectUrl }: Props) => {
  const searchParams = useSearchParams()

  // redirectUrl이 null일 경우, 빈 문자열로 처리하도록 수정
  const params: Record<string, string[]> = {
    redirectUrl: [redirectUrl ?? searchParams.get('redirectUrl') ?? ''],
  }

  // useActionState 호출 시 params 타입 수정
  const actionState = useActionState(processLogin, params)

  const [form, setForm] = useState<{ email?: string; password?: string }>({})

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return <LoginForm actionState={actionState} onChange={onChange} form={form} />
}

export default React.memo(LoginContainer)
