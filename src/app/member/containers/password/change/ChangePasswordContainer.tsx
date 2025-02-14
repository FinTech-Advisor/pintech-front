'use client'

import React, { useState, useCallback } from 'react'
import ChangePasswordForm from '@/app/member/components/password/change/ChangePasswordForm'
import { useSearchParams } from 'next/navigation'
import { processChangePassword } from '@/app/member/services/actions'

const ChangePasswordContainer = () => {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [isPending, setIsPending] = useState(false)
  const [actionResult, setActionResult] = useState({
    success: false,
    message: '',
    errors: {}, // 기본값으로 빈 객체를 설정
  })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onSubmit = useCallback(async () => {
    setIsPending(true) // 폼 제출 중 로딩 상태 활성화

    try {
      // URLSearchParams를 FormData로 변환
      const formData = new FormData()
      for (const [key, value] of searchParams.entries()) {
        formData.append(key, value)
      }

      // processChangePassword 호출
      const result = await processChangePassword(form, formData)

      // result가 errors 속성을 가지는지 확인한 후 처리
      const errors = 'errors' in result ? result.errors : {} // errors가 있으면 사용, 없으면 빈 객체

      setActionResult({
        success: typeof result.success === 'boolean' ? result.success : false,
        message: Array.isArray(result.message)
          ? result.message.join(', ')
          : result.message || 'Unknown error',
        errors: errors, // 오류 처리
      })
    } catch (error) {
      console.log(error)
      setActionResult({
        success: false,
        message: 'Failed to change password',
        errors: {}, // 오류가 있을 경우에도 빈 객체로 처리
      })
    } finally {
      setIsPending(false) // 로딩 상태 종료
    }
  }, [form, searchParams])

  return (
    <ChangePasswordForm
      form={form}
      onChange={onChange}
      errors={actionResult.errors || {}} // errors 처리
      onSubmit={onSubmit} // onSubmit 처리
      isPending={isPending} // 로딩 상태 전달
    />
  )
}

export default React.memo(ChangePasswordContainer)
