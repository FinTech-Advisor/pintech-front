'use client'
import React, { useState, useCallback, useActionState } from 'react'
import EditForm from '../components/EditForm'
import { editProcess } from '../services/actions'
import useUser from '@/app/global/hooks/useUser'

const JoinContainer = () => {
  const { userInfo } = useUser()
  const actionState = useActionState(editProcess, undefined)
  const [form, setForm] = useState({
    email: userInfo?.email,
    zipCode: userInfo?.zipCode,
    address: userInfo?.address,
    addressSub: userInfo?.addressSub,
    phoneNumber: userInfo?.phoneNumber,
    optionalTerms: userInfo?.optionalTerms,
  })
  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])
  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])
  return (
    <EditForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      onClick={onClick}
    />
  )
}

export default React.memo(JoinContainer)
