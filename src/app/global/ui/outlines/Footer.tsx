'use client'

import React from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'

const { dark, light } = colors
const { medium, big } = sizes

const StyledFooter = styled.footer`
  background: ${dark};
  min-height: 200px;
  color: ${light};
`

const Footer = () => {
  return (
    <StyledFooter>
      <div className="layout-width">사이트 하단 영역</div>
    </StyledFooter>
  )
}

export default React.memo(Footer)
