'use client'
import { useContext, useEffect } from 'react'
import CommonContext from '../contexts/CommonContext'

export default function useMenuCode(code, sub) {
  const {
    state: { menuCode, subMenuCode },
    actions: { setMenuCode, setSubMenuCode },
  } = useContext(CommonContext)

  useEffect(() => {
    setMenuCode(code)
    setSubMenuCode(sub)
  }, [code, setMenuCode, sub, setSubMenuCode])

  return { menuCode, subMenuCode, setMenuCode, setSubMenuCode }
}
