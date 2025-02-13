// useSWR 용

'use client'

import { fetcher } from '../libs/utils'
import useSWR from 'swr'

export default function useRequest(url) {
  return useSWR(url, fetcher)
}
