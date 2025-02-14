'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { processSignOut } from '@/app/member/services/actions'
import SignOutForm from '../../../components/signout/[seq]/SignOutForm'
import { useActionState } from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'

interface ActionState {
  success: boolean
  message: string
}

const SignOutContainer = () => {
  const searchParams = useSearchParams()

  const seq = searchParams.get('seq')
  const parsedSeq = seq ? parseInt(seq, 10) : null

  // 기본 state 값 설정
  const [form, setForm] = useState({
    email: '', // 이메일
    deleteType: '', // 탈퇴 방식
  })

  const [isLoading, setIsLoading] = useState(false)

  // useActionState 훅을 사용할 때 반환값에 타입을 지정
  const [actionState, dispatch] = useActionState<ActionState | null>(
    () => {
      if (parsedSeq !== null) {
        return processSignOut({ seq: parsedSeq })
      } else {
        return Promise.resolve({ success: false, message: 'Invalid seq' })
      }
    },
    { success: false, message: '' },
  )

  useEffect(() => {
    if (parsedSeq === null) return // parsedSeq가 null일 때는 그 다음 로직을 처리하지 않음

    // 여기에 로딩 상태와 메시지를 업데이트하는 로직
    if (actionState && actionState.message === '') {
      setIsLoading(true) // 로딩 시작
    } else {
      setIsLoading(false) // 로딩 종료
    }
  }, [parsedSeq, actionState])

  // 폼 변경 처리 함수
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }, [])

  // 삭제 방식 클릭 처리 함수 (체크박스)
  const onClick = useCallback((field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }))
  }, [])

  // 폼 제출 처리
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // deleteAt 업데이트 처리 로직 추가
      if (form.email) {
        const updatedForm = { ...form, deleteAt: new Date().toISOString() }
        console.log('탈퇴 처리:', updatedForm)
        dispatch() // 액션 실행
      } else {
        console.log('이메일을 입력하세요.')
      }
    },
    [dispatch, form],
  )

  // 삭제 방식 (체크박스를 이용한 선택)
  const handleDeleteTypeChange = useCallback((type: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      deleteType: type, // 선택된 삭제 방식
    }))
  }, [])

  if (parsedSeq === null) {
    return <div>잘못된 요청입니다. seq 값을 확인하세요.</div>
  }

  return (
    <div>
      {/* 회원 탈퇴 처리 UI */}
      {actionState && actionState.success ? (
        <div>회원 탈퇴가 완료되었습니다.</div>
      ) : (
        <SignOutForm
          form={form}
          onChange={onChange}
          errors={{}} // 필요에 따라 오류 처리
          onClick={onClick}
          onSubmit={onSubmit}
          isPending={isLoading} // 로딩 상태 전달
        />
      )}

      {/* 이메일 입력 */}
      <div>
        <label>
          이메일:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>
      </div>

      {/* 탈퇴 방식 선택 */}
      <div>
        <label>
          <span>소프트 탈퇴 (정보 보존)</span>
          <span onClick={() => handleDeleteTypeChange('soft')}>
            {form.deleteType === 'soft' ? (
              <MdCheckBox />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </span>
        </label>
        <label>
          <span>하드 탈퇴 (모든 데이터 삭제)</span>
          <span onClick={() => handleDeleteTypeChange('hard')}>
            {form.deleteType === 'hard' ? (
              <MdCheckBox />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </span>
        </label>
      </div>

      {/* 폼 제출 */}
      <div>
        <button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? '탈퇴 처리 중...' : '탈퇴 처리'}
        </button>
      </div>
    </div>
  )
}

export default React.memo(SignOutContainer)
