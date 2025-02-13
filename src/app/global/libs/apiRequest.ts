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

  let headers = null

  const options: RequestInit = {
    method,
  }

  if (token && token.value && token.value?.trim()) {
    headers = {
      Authorization: `Bearer ${token.value}`,
    }
  }

  let _body: string | null = null

  if (['POST', 'PATCH', 'PUT'].includes(method.toUpperCase()) && body) {
    if (!(body instanceof FormData)) {
      headers = headers ?? {}

      headers['Content-Type'] = 'application/json'

      _body = JSON.stringify(body)
    }

    options.body = _body
  }

  if (headers) options.headers = headers

  return fetch(apiUrl, options)
}

/**
 * 로그인회원토큰갈취
 * @returns 
 */
export async function getToken(){
  'use server'
  const cookie = await cookies()
  return cookie.get('token')?.value;
}
