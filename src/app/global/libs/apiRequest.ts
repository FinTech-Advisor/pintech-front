'use server'
import { cookies } from 'next/headers'
import type { RequestInit } from 'next/dist/server/web/spec-extension/request'

export default async function apiRequest(
  url: string,
  method: string = 'GET',
  body?: FormData | string,
) {
  const apiUrl = /^http[s]?/.test(url) ? url : process.env.API_URL + url

  const cookie = await cookies()
  const token = cookie.get('token')

  // headers를 빈 객체로 초기화
  let headers: Record<string, string> = {}

  const options: RequestInit = {
    method,
  }

  if (token?.value && token?.value?.trim()) {
    headers = {
      Authorization: `Bearer ${token.value}`,
    }
  }

  let _body: string | null = null
  if (['POST', 'PATCH', 'PUT'].includes(method.toUpperCase()) && body) {
    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
      _body = JSON.stringify(body)
    }

    options.body = _body
  }

  // headers를 options에 추가
  options.headers = headers

  return fetch(apiUrl, options)
}
