'use client'
import { useCallback } from 'react'
import apiRequest, { getToken } from '../libs/apiRequest'

export default function useFileUpload(
  setFiles,
  callback?: (files: any[]) => void,
  editor?: any,
) {
  return useCallback(
    (formData: FormData) => {
      ;(async () => {
        //const apiUrl = process.env.NEXT_PUBLIC_API_URL + `/file/upload`
        const apiUrl = 'https://cis-file-service.onedu.blue/upload' // 임시

        const token = await getToken()

        const options: RequestInit = {
          method: 'POST',
          body: formData,
        }

        if (token && token.trim()) {
          options.headers = {
            Authorization: `Bearer ${token}`,
          }
        }

        const res = await fetch(apiUrl, options)
        const result = await res.json()
        if (result.success && result.data && result.data.length > 0) {
          setFiles((files) => files.concat(result.data))

          if (typeof callback === 'function') {
            callback(result.data)
          }

          if (editor) {
            // Quill 객체 밖의 getEditor라는 Custom 함수
            const _editor = editor.current.getEditor()
            const cursor = _editor.getSelection()
            for (let { fileUrl } of result.data) {
              fileUrl = fileUrl.replace('http:', 'https:').replace(':80', '')
              // cursor.index = 현재 있는 커서의 라인수
              _editor.insertEmbed(cursor?.index ?? 0, 'image', fileUrl)
            }
          }
        }
      })()
    },
    [setFiles, editor],
  )
}
