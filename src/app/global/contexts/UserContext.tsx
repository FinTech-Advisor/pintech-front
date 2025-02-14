'use client'
import { createContext, useState, Dispatch, SetStateAction } from 'react'

// 상태와 액션을 위한 타입 정의
interface UserContextType {
  state: {
    userInfo: UserInfoType | null // `any` 대신 `UserInfoType | null`로 구체적인 타입 지정
    isLogin: boolean
    isAdmin?: boolean
  }
  actions: {
    setUserInfo: Dispatch<SetStateAction<UserInfoType | null>> // `setUserInfo` 타입을 명시적으로 지정
    setIsLogin: Dispatch<SetStateAction<boolean>>
    setIsAdmin: Dispatch<SetStateAction<boolean>>
  }
}

// `userInfo`에 대한 구체적인 타입 정의 (앱에 맞게 필요한 필드를 추가하세요)
interface UserInfoType {
  id: string
  name: string
  email: string
  // 필요한 다른 필드 추가
}

// 정확한 초기 타입으로 Context 생성
const UserContext = createContext<UserContextType>({
  state: { userInfo: null, isLogin: false, isAdmin: false },
  actions: {
    setUserInfo: () => {},
    setIsLogin: () => {},
    setIsAdmin: () => {},
  },
})

const UserProvider = ({
  children,
  _userInfo,
}: {
  children: React.ReactNode
  _userInfo: UserInfoType | null // `_userInfo`는 `UserInfoType` 또는 `null`로 타입 지정
}) => {
  // 상태 초기화 시 `UserInfoType | null`로 타입을 지정
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(_userInfo)
  const [isLogin, setIsLogin] = useState<boolean>(_userInfo ? true : false)
  const [isAdmin, setIsAdmin] = useState<boolean>(_userInfo ? true : false)

  const value = {
    state: { userInfo, isLogin, isAdmin },
    actions: { setUserInfo, setIsLogin, setIsAdmin },
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const { Consumer: UserConsumer } = UserContext

export { UserProvider, UserConsumer }
export default UserContext
