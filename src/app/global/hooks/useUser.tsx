'use client'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

export default function useUser() {
  const {
    state: { userInfo, isLogin, isAdmin },
  } = useContext(UserContext)

  return { userInfo, isLogin, isAdmin }
}
