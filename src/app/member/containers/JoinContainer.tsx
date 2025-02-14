'use client'

import JoinForm from '../components/JoinForm'
import { useSearchParams } from 'next/navigation'
import React, { useState, useCallback, useActionState } from 'react'
import { processJoin } from '../services/actions'

const JoinContainer = () => {
  const searchParams = useSearchParams()

  // searchParams를 Record<string, string[]> 타입으로 변환
  const params = Array.from(searchParams.entries()).reduce(
    (acc, [key, value]) => {
      // 같은 키에 여러 값이 있을 경우 배열로 처리
      if (acc[key]) {
        acc[key].push(value)
      } else {
        acc[key] = [value]
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  const actionState = useActionState(processJoin, params)

  const [form, setForm] = useState({ gender: 'FEMALE' })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  const onSelectDate = useCallback((date) => {
    setForm((form) => ({
      ...form,
      birthDt: date,
    }))
  }, [])

  return (
    <JoinForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      onClick={onClick}
      onSelectDate={onSelectDate}
    />
  )
}

export default React.memo(JoinContainer)
