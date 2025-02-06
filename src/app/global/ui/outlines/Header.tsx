'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from 'styled-components'
import { SlLogin } from 'react-icons/sl'
import { FaUserPlus, FaHome, FaSearch } from 'react-icons/fa'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'
import logo from '../../assets/images/logo.png'

const { white, primary, light, dark } = colors
const { medium, big } = sizes

const StyledHeader = styled.header`
  .site-top {
    background: ${light};
    height: 45px;

    .layout-width {
      display: flex;
      justify-content: space-between;

      & > div {
        display: flex;
        align-items: center;
        height: 45px;

        a + a {
          margin-left: 10px;
        }
      }

      svg {
        font-size: ${big};
      }
    }
  }

  .logo-search {
    .layout-width {
      display: flex;
      justify-content: space-between;
      height: 150px;
      align-items: center;
    }
  }
`
const StyledForm = styled.form`
  width: 350px;
  display: flex;
  border: 5px solid ${dark};

  button {
    width: 45px;
    background: ${dark};
    color: ${white};
    border: 0;
    cursor: pointer;

    svg {
      font-size: ${big};
    }
  }

  input {
    flex-grow: 1;
    border: 0;
    padding: 10px;
    font-size: ${medium};
  }
`

const StyledMenu = styled.nav`
  background: ${primary};

  .layout-width {
    display: flex;
    height: 50px;

    a {
      color: ${light};
      font-size: ${medium};
      padding: 0 40px;
      line-height: 50px;

      &:hover,
      &.on {
        background: ${dark};
      }
    }
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <div className="site-top">
        <div className="layout-width">
          <div className="left">
            <Link href="/">
              <FaHome />
            </Link>
          </div>
          <div className="right">
            <a href="/member/join">
              <FaUserPlus /> 회원가입
            </a>
            <a href="/member/login">
              <SlLogin /> 로그인
            </a>
          </div>
        </div>
      </div>
      {/* site-top */}
      <div className="logo-search">
        <div className="layout-width">
          <Link href="/" className="logo">
            <Image src={logo} alt="로고" priority={true} />
          </Link>

          <StyledForm method="GET" action="/board/search" autoComplete="off">
            <input type="text" name="skey" placeholder="검색어를 입력하세요" />
            <button type="submit">
              <FaSearch />
            </button>
          </StyledForm>
        </div>
      </div>
      {/* logo-search */}
      <StyledMenu>
        <div className="layout-width">
          <a href="#">메뉴1</a>
          <a href="#">메뉴2</a>
          <a href="#">메뉴3</a>
        </div>
      </StyledMenu>
    </StyledHeader>
  )
}

export default React.memo(Header)
