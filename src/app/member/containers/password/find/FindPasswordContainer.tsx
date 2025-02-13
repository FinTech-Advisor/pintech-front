'use client'

import React, { useState, useCallback } from 'react'
import FindPasswordForm from '@/app/member/components/password/find/FindPasswordForm'
import { processFindPassword } from '@/app/member/services/actions'

// 액션 상태를 관리하기 위한 초기 상태
const FindPasswordContainer = () => {
  const [form, setForm] = useState({ email: '' })

  const [errors, setErrors] = useState<Record<string, string>>({ email: '' })
  const [isPending, setIsPending] = useState(false)

  const dispatch = async (formData: FormData) => {
    setIsPending(true)
    try {
      // 비밀번호 찾기 액션 호출 (실제 API 호출을 진행하세요)
      const result = await processFindPassword(null, formData)

      // 성공적인 응답 처리
      if (result.success) {
        setErrors({ email: '' }) // 오류 초기화
      } else {
        setErrors({ email: '비밀번호 찾기 실패' })
      }
    } catch (error) {
      console.log(error)
      setErrors({ email: '이메일을 확인해주세요.' }) // 실패 시 오류 메시지 설정
    } finally {
      setIsPending(false)
    }
  }

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  return (
    <FindPasswordForm
      actionState={[errors, dispatch, isPending]} // actionState에 [errors, dispatch, isPending] 전달
      form={form}
      onChange={onChange}
    />
  )
}

export default React.memo(FindPasswordContainer)
