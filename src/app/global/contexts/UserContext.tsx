'use client'
import { createContext, useState, Dispatch, SetStateAction } from 'react'

type UserState = {
  userInfo: any | undefined
  isLogin: boolean
  isAdmin: boolean
}

type UserActions = {
  setUserInfo: Dispatch<SetStateAction<any | undefined>>
  setIsLogin: Dispatch<SetStateAction<boolean>>
  setIsAdmin: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<{
  state: UserState
  actions: UserActions
}>({
  state: { userInfo: undefined, isLogin: false, isAdmin: false },
  actions: {
    setUserInfo: () => {},
    setIsLogin: () => {},
    setIsAdmin: () => {},
  },
})

const UserProvider = ({ children, _userInfo }: { children: React.ReactNode; _userInfo?: any }) => {
  const [userInfo, setUserInfo] = useState<any | undefined>(_userInfo)
  const [isLogin, setIsLogin] = useState(!!_userInfo)
  const [isAdmin, setIsAdmin] = useState(
    !!(_userInfo?._authorities?.includes('ADMIN'))
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