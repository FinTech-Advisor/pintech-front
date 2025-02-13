'use client'
import { useContext, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import { getUserInfo } from '../../member/services/actions'

export default function useUser() {
  const {
    state: { userInfo, isLogin },
    actions: { setUserInfo, setIsLogin },
  } = useContext(UserContext)

  useEffect(() => {
    if (!userInfo) {
      ;(async () => {
        const _userInfo = await getUserInfo()
        if (_userInfo) {
          setUserInfo(_userInfo)
          setIsLogin(_userInfo ? true : false)
        }
      })()
    }
  }, [userInfo, setUserInfo, setIsLogin ])

  return { userInfo, isLogin }
}