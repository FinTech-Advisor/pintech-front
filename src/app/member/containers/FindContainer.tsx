'use client'
import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import PasswordForm from '../components/PasswordForm'
import { processFind } from '../services/actions'
import Messages from '@/app/global/components/Messages'

const initialValue = {
  name: '',
  phoneNumber: '',
}

const FindContainer = () => {
  const searchParams = useSearchParams()
  const actionState = useActionState(processFind, undefined)
  const [form, setForm] = useState(initialValue)
  const done = searchParams.get('done') === 'true'

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])
  return (
    <>
      <PasswordForm
        actionState={actionState}
        onChange={onChange}
        form={form}
        mode={true}
      />
      {done && <Messages color="info">이메일을 확인하세요.</Messages>}
    </>
  )
}

export default React.memo(FindContainer)
