'use client'
import { useCallback } from 'react'
import { deleteFile } from '@/app/global/services/actions'

export default function useDelete(setFiles) {
  return useCallback(
    (seq) => {
      if (!window.confirm('정말 삭제하겠습니까?')) {
        return
      }

      ;(async () => {
        const deleted = await deleteFile(seq)
        if (deleted) {
          // 삭제 성공
          setFiles((files) => files.filter((file) => file.seq !== seq))
        }
      })()
    },
    [setFiles],
  )
}
