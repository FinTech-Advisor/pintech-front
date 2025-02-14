'use server'
import { redirect } from 'next/navigation'
import apiRequest from '@/app/global/libs/apiRequest'

interface BoardFormData {
  [key: string]: string | boolean
}

interface Errors {
  [key: string]: string[]
}

interface BoardParams {
  bid: string
  gid: string
  locationAfterWriting: string
}

/**
 * 게시판 설정 조회
 *
 * @param bid
 */
export const getBoard = async (bid: string) => {
  try {
    const res = await apiRequest(`/board/info/${bid}`)
    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.error('err', err)
  }
}

/**
 * 게시글 작성 또는 수정
 * @param params
 * @param formData
 */
export const updateBoard = async (params: BoardParams, formData: FormData) => {
  const form: BoardFormData = {}
  const errors: Errors = {}
  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    const _value = ['true', 'false'].includes(value.toString())
      ? Boolean(value.toString())
      : value.toString()
    form[key] = _value
  }

  const { locationAfterWriting } = await getBoard(form.bid as string)
  let redirectUrl = `/board/list/${form.bid}`

  // 필수항목 검증 S
  const requiredFields: { [key: string]: string } = {
    poster: '작성자를 입력하세요.',
    subject: '제목을 입력하세요.',
    content: '내용을 입력하세요.',
    bid: '잘못된 접근입니다.',
    gid: '잘못된 접근입니다.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  // 필수항목 검증 E

  // 서버 처리 요청 S
  if (!hasErrors) {
    form.status = 'ALL'

    // 🔥 FormData로 변환
    const formDataToSend = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString())
    })

    const res = await apiRequest('/board/save', 'POST', formDataToSend) // ✅ 수정
    const result = await res.json()

    if (res.status !== 200 || !result.success) {
      return result.message
    } else {
      const { seq } = result.data
      redirectUrl =
        locationAfterWriting === 'view' ? `/board/view/${seq}` : redirectUrl
    }
  }
  // 서버 처리 요청 E

  if (hasErrors) {
    return errors
  }

  redirect(redirectUrl)
}
