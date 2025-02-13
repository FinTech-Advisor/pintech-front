'use client'
import { createContext, useState } from 'react'

const UserContext = createContext({
  state: { userInfo: undefined, isLogin: false },
  actions: {
    setUserInfo: undefined,
    setIsLogin: undefined,
  },
})

const UserProvider = ({ children, _userInfo }) => {
  const [userInfo, setUserInfo] = useState(_userInfo)
  const [isLogin, setIsLogin] = useState(_userInfo ? true : false)
  

  const value = {
    state: { userInfo, isLogin },
    actions: { setUserInfo, setIsLogin },
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const { Consumer: UserConsumer } = UserContext

export { UserProvider, UserConsumer }

export default UserContext