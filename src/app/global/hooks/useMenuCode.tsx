'use client'
import { useContext, useEffect } from 'react'
import CommonContext from '../contexts/CommonContext'

export default function useMenuCode(code: string, sub: string) {
  // CommonContext에서 값을 가져오고 기본값 설정
  const {
    state: { menuCode = '', subMenuCode = '' } = {}, // 기본값을 설정해줘야 null/undefined 접근 방지
    actions: { setMenuCode = () => {}, setSubMenuCode = () => {} } = {}, // 액션도 기본값 설정
  } = useContext(CommonContext) || {} // 만약 CommonContext가 undefined라면 빈 객체를 fallback

  useEffect(() => {
    if (setMenuCode && setSubMenuCode) {
      setMenuCode(code) // 메뉴 코드 설정
      setSubMenuCode(sub) // 서브 메뉴 코드 설정
    }
  }, [code, sub, setMenuCode, setSubMenuCode])

  // menuCode, subMenuCode, setMenuCode, setSubMenuCode를 반환
  return { menuCode, subMenuCode, setMenuCode, setSubMenuCode }
}
