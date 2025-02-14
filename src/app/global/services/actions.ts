'use server'
import apiRequest from '../libs/apiRequest'

export const deleteFile = async (seq) => {
  const apiUrl = process.env.API_URL + `/file/delete/${seq}`
  const res = await apiRequest(apiUrl, 'DELETE')
  const result = await res.json()
  if (res.status === 200 && result.success) {
    return result.data // 삭제된 파일 정보 목록
  }

  console.error(result.message)
}
