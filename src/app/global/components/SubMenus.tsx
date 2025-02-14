'use client'
import React, { useContext, useState, useEffect } from 'react'
import CommonContext from '../contexts/CommonContext'
import styled from 'styled-components'
import classNames from 'classnames'
import colors from '../styles/colors'
import sizes from '../styles/sizes'
import getMenus from '../datas/menus'

const { dark, white } = colors
const { medium } = sizes

const StyledMenu = styled.nav`
  box-shadow: 2px 2px 5px ${dark};
  display: flex;
  border-radius: 3px;
  height: 45px;
  margin-bottom: 40px;

  a {
    color: ${dark};
    line-height: 45px;
    font-size: ${medium};
    padding: 0 35px;

    &.on {
      color: ${white};
      background: ${dark};
    }
  }
`

const SubMenus = () => {
  const [menus, setMenus] = useState([])

  // Default to empty strings if state or properties are undefined
  const {
    state: { menuCode = '', subMenuCode = '' } = {}, // Default state to empty object if undefined
  } = useContext(CommonContext) || {} // Ensure CommonContext is not undefined

  useEffect(() => {
    setMenus(() => getMenus(menuCode))
  }, [menuCode])

  return (
    menus &&
    menus.length > 0 && (
      <StyledMenu>
        {menus.map(({ code, name, url }) => (
          <a
            key={'submenu_' + url}
            href={url}
            className={classNames('menu', { on: code === subMenuCode })}
          >
            {name}
          </a>
        ))}
      </StyledMenu>
    )
  )
}

export default React.memo(SubMenus)
