'use client'
import React from "react"
import useMenuCode from "@/app/global/hooks/useMenuCode"
import Link from "next/link"
import styled from "styled-components"
import colors from "@/app/global/styles/colors"
import sizes from "@/app/global/styles/sizes"
import { menus } from "@/app/global/datas/menus"


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
    margin: 0 auto;

    &.on {
      color: ${white};
      background: ${dark};
    }
  }
`

const CardContainer = () => {
    useMenuCode('card', 'cardForm')

    return (
        <>
            <StyledMenu>
                {menus.card.map((item) => (
                    <Link key={item.code} href={item.url}>
                        {item.name}
                    </Link>
                ))}
            </StyledMenu>
        </>
    ) 
}

export default React.memo(CardContainer)