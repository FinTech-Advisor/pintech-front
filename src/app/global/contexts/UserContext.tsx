'use client'
import { createContext, useState } from 'react'

const UserContext = createContext({
  state: { userInfo: undefined, isLogin: false, isAdmin: false },
  actions: {
    setUserInfo: undefined,
    setIsLogin: undefined,
    setIsAdmin: undefined,
  },
})

const UserProvider = ({ children, _userInfo }) => {
  const [userInfo, setUserInfo] = useState(_userInfo)
  const [isLogin, setIsLogin] = useState(_userInfo ? true : false)
  const [isAdmin, setIsAdmin] = useState(
    _userInfo && _userInfo._authorities.includes('ADMIN'),
  )

  const value = {
    state: { userInfo, isLogin, isAdmin },
    actions: { setUserInfo, setIsLogin, setIsAdmin },
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const { Consumer: UserConsumer } = UserContext

export { UserProvider, UserConsumer }

export default UserContext