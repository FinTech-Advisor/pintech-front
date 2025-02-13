'use client'
import React, {
  useState,
  useCallback,
  useActionState,
  useLayoutEffect,
} from 'react'
import { useSearchParams } from 'next/navigation'
import PasswordForm from '../components/PasswordForm'
import { processChange } from '../services/actions'
import Messages from '@/app/global/components/Messages'
import { validateToken } from '../services/actions'

// type Props = {
//   redirectUrl?: string
// }

const initialValue = {
  password: '',
  confirmPassword: '',
}

const FindContainer = (/* { redirectUrl }: Props */) => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const params = {
    token,
  }

  const actionState = useActionState(processChange, params)
  const [form, setForm] = useState(initialValue)
  const [messages, setMessage] = useState('')

  useLayoutEffect(() => {
    ;(async () => {
      const _messages = await validateToken(token)
      setMessage(_messages)
    })()
  }, [token])

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])
  return messages ? (
    <Messages color="danger">{messages}</Messages>
  ) : (
    <PasswordForm
      actionState={actionState}
      onChange={onChange}
      form={form}
      mode={false}
    />
  )
}

export default React.memo(FindContainer)
