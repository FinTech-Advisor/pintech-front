'use client'

import useUser from '../hooks/useUser'
import { notFound } from 'next/navigation'

export default function WithGuestContainer(container: React.ReactNode) {
  const { isLogin } = useUser()

  // 추후 notFound() 교체 예정, 임시
  return isLogin ? notFound() : container
}
