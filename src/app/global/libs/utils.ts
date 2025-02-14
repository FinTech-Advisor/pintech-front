/**
 * 객체 값을 QueryString으로 변환하는 편의 기능
 */
export const toQueryString = (data: object) => {
  const qs = []
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value.forEach((v) => qs.push(`${key}=${v}`))
    } else {
      qs.push(`${key}=${value}`)
    }
  }

  return qs.join('&')
}

// useSWR용
export const fetcher = (url) => fetch(url).then((r) => r.json())
