'use server'

import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { cookies } from 'next/headers'
import apiRequest from '@/app/global/libs/apiRequest'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

/**
 * 회원 가입 처리
 *
 * @param params : QueryString 값
 * @param formData
 */
export const processJoin = async (params, formData: FormData) => {
  // 검증 실패시의 메세지 등

  const redirectUrl = params?.redirectUrl ?? '/member/login'
  const form: any = {
    optionalTerms: [],
  }
  let errors: any = {}

  let hasErrors = false

  for (const [key, value] of formData.entries()) {
    if (key.includes('$ACTION')) continue
    let _value: string | boolean = value.toString()

    if (key === 'birthDt' && _value && _value.trim()) {
      _value = format(new Date(_value), 'yyyy-MM-dd')
    }

    if (['false', 'true'].includes(_value)) {
      _value = value === 'true'
    }

    if (key === 'optionalTerms') {
      form.optionalTerms.push(value)
      continue
    }

    form[key] = _value
  }

  /* 필수 항목 검증 S */
  const requiredFields = {
    email: '이메일을 입력하세요.',
    name: '이름을 입력하세요.',
    password: '비밀번호를 입력하세요',
    confirmPassword: '비밀번호를 확인하세요',
    // zipCode는 없을 경우 address로 대체하도록 따로 처리 예정
    phoneNumber: '휴대폰 번호를 입력하세요.',
    gender: '성별을 선택하세요.',
    birthDt: '생년월일을 선택하세요.',
    requiredTerms1: '이용 약관에 동의 하셔야 합니다.',
    requiredTerms2: '개인 정보 처리 방침에 동의 하셔야 합니다.',
    requiredTerms3: '개인 정보 수집 이용에 동의 하셔야 합니다.',
  }

  for (const [field, msg] of Object.entries(requiredFields)) {
    if (
      !form[field] ||
      (typeof form[field] === 'string' && !form[field].trim())
    ) {
      // 필수 항목 누락
      errors[field] = errors[field] ?? []
      errors[field].push(msg)
      hasErrors = true
    }
  }
  // 주소 항목 검증
  if (
    !form.zipCode ||
    !form.zipCode?.trim() ||
    !form.address ||
    !form.address?.trim()
  ) {
    // 주소 항목 누락

    errors.address = errors.address ?? []
    errors.address.push('주소를 입력하세요.')

    hasErrors = true
  }

  /* 필수 항목 검증 E */

  // 비밀번호와 비밀번호 확인 일치 여부
  if (form?.password && form?.password !== form?.confirmPassword) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }
  /* Server 요청 처리 S */
  if (!hasErrors) {
    // const apiUrl = process.env.API_URL + '/member/join'

    try {
      // const res = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(form),
      // })
      const res = await apiRequest('/member/join', 'POST', form)
      if (res.status !== 201) {
        // 검증 실패시
        const result = await res.json()
        errors = result.message
      }
    } catch (err) {
      console.error(err)
    }
  }
  /* Server 요청 처리 E */

  if (hasErrors) return errors

  // 회원 가입 완료후 이동
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

  const form: any = {}
  let errors: any = {}

  let hasErrors = false

  /* 필수 항목 검증 S */

  const email = formData.get('email').toString()
  const password = formData.get('password').toString()

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

  /* 필수 항목 검증 E */

  /* Server 요청 처리 S */
  if (!hasErrors) {
    try {
      // const res = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // })
      form.email = email
      form.password = password
      const res = await apiRequest('/member/login', 'POST', form)
      const result = await res.json()

      if (res.status === 200 && result.success) {
        // 회원 인증 성공
        const cookie = await cookies()

        cookie.set('token', result.data, {
          // httpOnly true 하지 않으면 JavaScript로 토큰 탈취 가능
          // Server쪽에서만 조회할 수 있도록 httpOnly true 처리
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          // 전역 path 유지
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
  /* Server 요청 처리 E */
  if (hasErrors) return errors

  // 캐시 비우기
  revalidatePath('/', 'layout')

  // 로그인 성공시 이동
  redirect(redirectUrl)
}

/**
 * 로그인한 회원 정보 조회
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
    console.error(err)
    // cookie.delete('token')
  }
}

/**
 * 회원한 비밀번호 이메일로 URL 보내기
 * @param params
 * @param formData
 * @returns
 */
export const processFind = async (params, formData: FormData) => {
  const redirectUrl = '/member/password/find?done=true'
  const _headers = await headers()

  const errors: any = {}
  let hasErrors = false
  const form: any = {}
  const name = formData.get('name').toString()
  const phoneNumber = formData.get('phoneNumber').toString()
  const origin = _headers.get('x-current-origin') + '/member/password/change'
  formData.set('origin', origin)

  for (const [k, v] of formData.entries()) {
    if (k.includes('$ACTION')) continue
    form[k] = v
  }

  /* 필수 항목 검증 S */

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
  /* 필수 항목 검증 E */

  if (!hasErrors) {
    try {
      // const res = await fetch(apiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, phoneNumber, origin }),
      // })
      const res = await apiRequest('/member/password/find', 'POST', form)
      const result = await res.status
      if (result !== 204) {
        errors.global = errors.global ?? []
        errors.global.push('이름 또는 휴대포번호가 잘못되었습니다.')
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (hasErrors) return errors

  redirect(redirectUrl)
}

/**
 * 비밀번호 변경
 * @param params
 * @param formData
 * @returns
 */
export const processChange = async (params, formData: FormData) => {
  const errors: any = {}

  let hasErrors = false
  const form: any = {}

  /* 필수 항목 검증 S */
  formData.set('token', params.token)

  for (const [k, v] of formData.entries()) {
    if (k.includes('$ACTION')) continue
    form[k] = v
  }

  const password = formData.get('password').toString()
  const confirmPassword = formData.get('confirmPassword').toString()
  if (!password || !password.trim()) {
    errors.password = errors.password ?? []
    errors.password.push('비밀번호를 입력하세요.')
    hasErrors = true
  }
  if (!confirmPassword || !confirmPassword.trim()) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호를 확인하세요.')
    hasErrors = true
  }

  if (password !== confirmPassword) {
    errors.misMatch = errors.misMatch ?? []
    errors.misMatch.push('비밀번호가 다릅니다.')
    hasErrors = true
  }

  /* 필수 항목 검증 E */

  if (!hasErrors) {
    try {
      const res = await apiRequest('/member/password/change', 'PATCH', form)
      const result = await res.status
      if (result === 204) {
      } else {
        // errors = result.message
        hasErrors = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (hasErrors) return errors

  redirect('/member/login')
}

/**
 * 토큰 확인인
 * @param token
 * @returns
 */
export const validateToken = async (token) => {
  const res = await apiRequest(`/member/password/validate/token/${token}`)

  if (res.status !== 200) {
    const result = await res.json()
    return result.message
  }
}

/**
 * 회원정보 수정
 * @param params
 * @param formData
 * @returns
 */
export const editProcess = async (params, formData: FormData) => {
  let errors: any = {}
  let hasErrors = false
  const form: any = {
    optionalTerms: [],
  }
  for (const [k, v] of formData.entries()) {
    if (k.includes('$ACTION')) continue
    if (k === 'optionalTerms') {
      form.optionalTerms.push(v)
      continue
    }
    form[k] = v
  }

  /* 필수 항목 검증 S*/

  // 주소 항목 검증
  if (
    !form.zipCode ||
    !form.zipCode?.trim() ||
    !form.address ||
    !form.address?.trim()
  ) {
    // 주소 항목 누락

    errors.address = errors.address ?? []
    errors.address.push('주소를 입력하세요.')

    hasErrors = true
  }

  /* 필수 항목 검증 E*/

  if (form?.password && form?.password !== form?.confirmPassword) {
    errors.confirmPassword = errors.confirmPassword ?? []
    errors.confirmPassword.push('비밀번호가 일치하지 않습니다.')
    hasErrors = true
  }
  if (!hasErrors) {
    try {
      const res = await apiRequest(`/member/edit`, 'PATCH', form)
      const result = await res.status
      if (result !== 200) {
        const result = await res.json()
        errors = result.message
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (hasErrors) return errors

  redirect('/')
}
