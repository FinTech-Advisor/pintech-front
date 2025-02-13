'use client'

import React, { useState, useCallback } from 'react'
import ModifyForm from '../../components/modify/ModifyForm'
import { processModify } from '@/app/member/services/actions'

interface ActionState {
  errors?: Record<string, string>
  isPending: boolean
}

const ModifyContainer = ({ form, onChange, onClick }) => {
  const [state, setState] = useState<ActionState>({
    errors: {},
    isPending: false,
  })

  // form submit handler
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault()

      // 여기에 비동기 작업을 추가합니다.
      setState((prevState) => ({ ...prevState, isPending: true }))

      const formData = new FormData()

      // value 타입을 string 또는 Blob으로 명시적으로 처리
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === 'string' || value instanceof Blob) {
          formData.append(key, value)
        }
      })

      processModify(null, formData)
        .then(() => {
          setState({ errors: {}, isPending: false })
        })
        .catch((error) => {
          setState({ errors: { general: error.message }, isPending: false })
        })
    },
    [form],
  )

  return (
    <ModifyForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      onSubmit={onSubmitHandler}
      errors={state.errors ?? {}}
      isPending={state.isPending} // 로딩 상태
    />
  )
}

export default React.memo(ModifyContainer)
