'use client' // Make sure to add 'use client' if this is in a client-side component

import React from 'react'
import { MediumButton } from '@/app/global/components/Buttons'
import Messages from '@/app/global/components/Messages'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

const SignOutForm = ({ form, onChange, onClick, onSubmit, actionState }) => {
  console.log('Current form state:', form) // Debugging: form state 확인

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      style={{ maxWidth: '500px', margin: '0 auto' }}
    >
      {/* 사용자 ID 입력 */}
      <div className="input-group" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="userId"
          placeholder="사용자 ID"
          value={form.userId}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <Messages color="danger">{actionState?.errors?.userId}</Messages>

      {/* 탈퇴 방식 선택 */}
      <div className="delete-type" style={{ marginBottom: '20px' }}>
        <div
          className="delete-option"
          onClick={() => {
            // 상태 변경 여부 확인
            onClick('deleteType', form.deleteType === 'soft' ? '' : 'soft')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '10px',
          }}
        >
          {form.deleteType === 'soft' ? (
            <MdCheckBox size={24} style={{ marginRight: '8px' }} />
          ) : (
            <MdCheckBoxOutlineBlank size={24} style={{ marginRight: '8px' }} />
          )}
          소프트 탈퇴 (정보 보존)
        </div>
      </div>

      <Messages color="danger">{actionState?.errors?.deleteType}</Messages>

      {/* 탈퇴 처리 버튼 */}
      <div className="submit-button">
        <MediumButton
          type="submit"
          disabled={actionState?.isLoading}
          style={{
            padding: '10px 20px',
            backgroundColor: actionState?.isLoading ? '#ccc' : '#007bff',
            color: '#fff',
            fontSize: '16px',
            cursor: actionState?.isLoading ? 'not-allowed' : 'pointer',
            borderRadius: '5px',
            width: '100%',
            marginTop: '10px',
          }}
        >
          {actionState?.isLoading ? '탈퇴 처리 중...' : '탈퇴 처리'}
        </MediumButton>
      </div>
    </form>
  )
}

export default React.memo(SignOutForm)
