'use server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
import { revalidatePath } from 'next/cache'

interface FormDataEntries {
  [key: string]: string | boolean
}

export const processJoin = async (
  params: { redirectUrl?: string },
  formData: FormData,
) => {
  const redirectUrl = params?.redirectUrl ?? '/member/login'

  const form: FormDataEntries = {}
  let errors: Record<string, string[]> = {}
  let hasErrors = false

  for (const [key, rawValue] of formData.entries()) {
    if (key.includes('$ACTION')) continue

    let value: string | boolean = rawValue as string

    if (key === 'birthDt' && value.trim()) {
      value = format(new Date(value), 'yyyy-MM-dd')
    }

    if (['false', 'true'].includes(value)) {
      value = value === 'true'
    }

    form[key] = value
  }

  const requiredFields: Record<string, string> = {
    email: '이메일을 입력하세요.',
    name: '이름을 입력하세요.',
    password: '비밀번호를 입력하세요.',
    confirmPassword: '비밀번호를 확인하세요.',
    phoneNumber: '휴대폰번호를 입력하세요.',
    gender: '성별을 선택하세요.',
    birthDt: '생년월일을 선택하세요.',
    requiredTerms1: '이용약관에 동의 하셔야 합니다.',
    requiredTerms2: '개인정보 처리방침에 동의 하셔야 합니다.',
    requiredTerms3: '개인정보 수집 및 이용에 동의 하셔야 합니다.',
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

  if (!form.zipCode?.toString().trim() || !form.address?.toString().trim()) {
    errors.address = errors.address ?? []
    errors.address.push('주소를 입력하세요.')
    hasErrors = true
  }

  if (form.password && form.password !== form.confirmPassword) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }

  if (!hasErrors) {
    const apiUrl = `${process.env.API_URL}/member/join`
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.status !== 201) {
        const result = await res.json()
        errors = result.message
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (hasErrors) {
    return errors
  }

  redirect(redirectUrl)
}
/**
 * 로그인 처리
 *
 * @param params
 * @param formData
 */
export const processLogin = async (params, formData: FormData) => {
  const redirectUrl = params?.redirectUrl ?? '/'

  let errors = {}
  let hasErrors = false

  // 필수 항목 검증 S
  const email = formData.get('email')
  const password = formData.get('password')
  if (!email || !email.trim()) {
    errors.email = errors.email ?? []
    errors.email.push('이메일을 입력하세요.')
    hasErrors = true
  }

  if (!password || !password.trim()) {
    errors.password = errors.password ?? []
    errors.password.push('비밀번호를 입력하세요.')
    hasErrors = true
  }

  // 필수 항목 검증 E

  // 서버 요청 처리 S
  if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/member/login'
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await res.json()
      if (res.status === 200 && result.success) {
        // 회원 인증 성공
        const cookie = await cookies()
        cookie.set('token', result.data, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          path: '/',
        })
      } else {
        // 회원 인증 실패
        errors = result.message
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
    }
  }
  // 서버 요청 처리 E

  if (hasErrors) {
    return errors
  }

  // 캐시 비우기
  revalidatePath('/', 'layout')

  // 로그인 성공시 이동
  redirect(redirectUrl)
}

/**
 * 로그인한 회원 정보를 조회
 *
 */
export const getUserInfo = async () => {
  const cookie = await cookies()
  if (!cookie.has('token')) return

  try {
    const res = await apiRequest('/member')
    if (res.status === 200) {
      const result = await res.json()
      return result.success && result.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const processFindPassword = async (params, formData: FormData) => {
  const email = formData.get('email')
  let errors = {}
  let hasErrors = false

  if (!email || !email.trim()) {
    errors.email = errors.email ?? []
    errors.email.push('이메일을 입력하세요.')
    hasErrors = true
  }

  if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/member/find/password'
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (res.status !== 200) {
        const result = await res.json()
        errors = result.message
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
      errors.email = ['서버 오류가 발생했습니다.']
      hasErrors = true
    }
  }

  if (hasErrors) {
    return errors
  }

  return {
    success: true,
    message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
  }
}

export const processChangePassword = async (params, formData: FormData) => {
  const currentPassword = formData.get('currentPassword')
  const newPassword = formData.get('newPassword')
  const confirmPassword = formData.get('confirmPassword')
  let errors = {}
  let hasErrors = false

  // 필수 항목 검증
  if (!currentPassword || !currentPassword.trim()) {
    errors.currentPassword = errors.currentPassword ?? []
    errors.currentPassword.push('현재 비밀번호를 입력하세요.')
    hasErrors = true
  }

  if (!newPassword || !newPassword.trim()) {
    errors.newPassword = errors.newPassword ?? []
    errors.newPassword.push('새 비밀번호를 입력하세요.')
    hasErrors = true
  }

  if (!confirmPassword || !confirmPassword.trim()) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호 확인을 입력하세요.')
    hasErrors = true
  }

  if (newPassword !== confirmPassword) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push(
      '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
    )
    hasErrors = true
  }

  // 서버 요청 처리
  if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/member/change/password'
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (res.status !== 200) {
        const result = await res.json()
        errors = result.message || '서버 오류가 발생했습니다.'
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
      errors = '서버와의 연결에 실패했습니다.'
      hasErrors = true
    }
  }

  // 에러가 있을 경우 반환
  if (hasErrors) {
    return errors
  }

  return {
    success: true,
    message: '비밀번호가 성공적으로 변경되었습니다.',
  }
}

// 회원 상태 업데이트 (소프트 탈퇴: SetDeletedAt 업데이트)
export const updateUserStatus = async ({
  userId,
  deletedAt,
}: {
  userId: string
  deletedAt: Date
}) => {
  try {
    const response = await fetch('/api/user/status', {
      method: 'PATCH', // HTTP 메서드는 PATCH (부분 업데이트)
      headers: {
        'Content-Type': 'application/json', // JSON 데이터로 전송
      },
      body: JSON.stringify({ userId, deletedAt }), // 요청 본문에 사용자 ID와 삭제 날짜를 JSON 형식으로 전송
    })

    if (!response.ok) {
      throw new Error('회원 상태 업데이트 실패')
    }

    return await response.json() // 성공적으로 처리된 응답을 JSON으로 반환
  } catch (error) {
    console.error('회원 상태 업데이트 실패:', error)
    throw new Error('회원 상태 업데이트 실패') // 실패 시 오류를 던짐
  }
}

// 회원 탈퇴 처리 (소프트 탈퇴)
export const processSignOut = async ({ userId }: { userId: string }) => {
  try {
    const response = await fetch('/api/user/signout', {
      method: 'POST', // HTTP 메서드는 POST (회원 탈퇴 요청)
      headers: {
        'Content-Type': 'application/json', // JSON 데이터로 전송
      },
      body: JSON.stringify({ userId }), // 요청 본문에 사용자 ID를 JSON 형식으로 전송
    })

    if (!response.ok) {
      throw new Error('회원 탈퇴 처리 실패')
    }

    return await response.json() // 성공적으로 처리된 응답을 JSON으로 반환
  } catch (error) {
    console.error('회원 탈퇴 처리 실패:', error)
    throw new Error('회원 탈퇴 처리 실패') // 실패 시 오류를 던짐
  }
}

export const processModify = async (params, formData: FormData) => {
  const name = formData.get('name')
  const phoneNumber = formData.get('phoneNumber')
  const address = formData.get('address')
  const addressSub = formData.get('addressSub')
  const optionalTerms = formData.get('optionalTerms')
  const authorities = formData.get('authorities')

  let errors = {}
  let hasErrors = false

  // 필수 항목 검증
  if (!name || !name.trim()) {
    errors.name = errors.name ?? []
    errors.name.push('이름을 입력하세요.')
    hasErrors = true
  }

  if (!phoneNumber || !phoneNumber.trim()) {
    errors.phoneNumber = errors.phoneNumber ?? []
    errors.phoneNumber.push('휴대폰번호를 입력하세요.')
    hasErrors = true
  }

  if (!address || !address.trim()) {
    errors.address = errors.address ?? []
    errors.address.push('주소를 입력하세요.')
    hasErrors = true
  }

  if (!optionalTerms || !optionalTerms.trim()) {
    errors.optionalTerms = errors.optionalTerms ?? []
    errors.optionalTerms.push('광고성 정보 전송 동의 여부를 확인하세요.')
    hasErrors = true
  }

  // 서버 요청 처리
  if (!hasErrors) {
    const apiUrl = process.env.API_URL + '/member/modify'
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          address,
          addressSub,
          optionalTerms,
          authorities,
        }),
      })

      if (res.status !== 200) {
        const result = await res.json()
        errors = result.message || '서버 오류가 발생했습니다.'
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
      errors = '서버와의 연결에 실패했습니다.'
      hasErrors = true
    }
  }

  // 에러가 있을 경우 반환
  if (hasErrors) {
    return errors
  }

  return {
    success: true,
    message: '회원정보가 성공적으로 수정되었습니다.',
  }
}
