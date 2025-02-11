'use client' // Make sure to add 'use client' if this is in a client-side component

import React, { useState, useActionState, useCallback } from 'react'
import ModifyForm from '../../components/modify/ModifyForm'
import { useSearchParams } from 'next/navigation'
import { processModify } from '@/app/member/services/actions'

const ModifyContainer = () => {
  const searchParams = useSearchParams()
  const actionState = useActionState(processModify, searchParams)

  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    optionalTerms: '', // Added this to manage optionalTerms
  })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({
      ...form,
      [field]: form[field] === value ? '' : value,
    }))
  }, [])

  return (
    <ModifyForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      onClick={onClick}
    />
  )
}

export default React.memo(ModifyContainer)
