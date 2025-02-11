'use client' // Make sure to add 'use client' if this is in a client-side component

import React, { useState, useActionState, useCallback } from 'react'
import SignOutForm from '../../components/signout/SignOutForm'
import { useSearchParams } from 'next/navigation'
import { processSignOut, updateUserStatus } from '@/app/member/services/actions' // 회원 탈퇴 처리 API

const SignOutContainer = () => {
  const searchParams = useSearchParams()
  const actionState = useActionState(processSignOut, searchParams)

  const [form, setForm] = useState({
    userId: '', // 사용자 ID
    deleteType: '', // 탈퇴 방식 (soft)
  })

  // 폼 입력값 변경 처리
  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  // 탈퇴 방식 선택 처리 (soft delete로만 동작)
  const onClick = useCallback((field, value) => {
    setForm((form) => ({
      ...form,
      [field]: form[field] === value ? '' : value, // 값을 toggle
    }))
  }, [])

  // 폼 제출 처리 (soft delete 요청)
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      // 사용자가 선택한 탈퇴 방식에 따라 soft delete 처리
      if (form.deleteType) {
        try {
          if (form.deleteType === 'soft') {
            // Soft delete: SetDeletedAt 필드만 업데이트
            await updateUserStatus({
              userId: form.userId,
              deletedAt: new Date(),
            })
            console.log('사용자가 soft delete되었습니다.')
          } else {
            console.log('탈퇴 방식을 선택해 주세요.')
          }
        } catch (error) {
          console.error('탈퇴 처리 중 오류가 발생했습니다:', error)
        }
      }
    },
    [form],
  )

  return (
    <SignOutForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      onClick={onClick}
      onSubmit={onSubmit} // 폼 제출 시 탈퇴 처리
    />
  )
}

export default React.memo(SignOutContainer)
