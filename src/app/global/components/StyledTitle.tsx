'use client'
import { useContext, useLayoutEffect } from 'react'
import { styled } from 'styled-components'
import CommonContext from '../contexts/CommonContext'
import sizes from '../styles/sizes'
import colors from '../styles/colors'
import type { CommonType } from '../types/StyledType'

const { big } = sizes
const { dark } = colors

// Rename _MainTitle to MainTitleComponent
const MainTitleComponent = ({
  children,
  className,
}: {
  children: string
  className?: string
}) => {
  const { actions: { setTitle } = {} } = useContext(CommonContext)

  useLayoutEffect(() => {
    // setTitle이 정의되어 있을 때만 호출
    if (setTitle) {
      setTitle(children)
    }
  }, [children, setTitle])

  return <h1 className={className}>{children}</h1>
}

// Use the renamed component
export const MainTitle = styled(MainTitleComponent)<CommonType>`
  padding: 0 10px 15px;
  margin: 0 0 25px;
  font-size: ${big};
  border-bottom: 2px solid ${dark};
  color: ${dark};
`
