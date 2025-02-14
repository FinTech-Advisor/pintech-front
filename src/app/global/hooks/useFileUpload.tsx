'use client'
import { useCallback } from "react"
import apiRequest, { getToken } from "../libs/apiRequest"

export default function useFileupload(setFiles) {
  return useCallback((formData)=>{
    ;(async () => {
      // const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/file/upload'
      const apiUrl = 'https://cis-file-service.onedu.blue/upload'
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
      setFiles((files) => files.concat(result.data))
      if (
        editor &&
        result.success &&
        result.data &&
        result.data.length > 0
      ) {
        const _editor = editor.current.getEditor()
        const cursor = _editor.getSelection()
        for (let { fileUrl } of result.data) {
          fileUrl = fileUrl.replace('http:', 'https:').replace(':80', '')

          _editor.insertEmbed(cursor.index, 'image', fileUrl)
        }

    
      }
    })()
  },[setFiles])
}