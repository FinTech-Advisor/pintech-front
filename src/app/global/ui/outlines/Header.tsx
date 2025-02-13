'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { styled } from 'styled-components'
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri'
import { MdContactPage } from 'react-icons/md'
import { FaUserPlus, FaHome, FaSearch } from 'react-icons/fa'
import { GrUserAdmin } from 'react-icons/gr'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'
import logo from '../../assets/images/logo2.png'
import useUser from '../../hooks/useUser'

const { white, primary, secondary, light, dark } = colors
const { medium, big } = sizes

// scss 문법
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

        .icon-cls {
          color: ${dark};
        }

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
  width: 500px;
  display: flex;
  border: 3px solid ${secondary};

  margin-right: 400px;
  button {
    width: 45px;
    background: ${secondary};
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
      transition: all 0.4s;

      &:hover,
      &.on {
        color: ${primary};
        background: ${light};
      }
    }
  }
`

const Header = () => {
  const { userInfo, isLogin, isAdmin } = useUser()

  const email = userInfo?.email
  const name = userInfo?.name

  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL

  return (
    <StyledHeader>
      <div className="site-top">
        <div className="layout-width">
          {/* 컨텐츠 영역 */}
          <div className="left">
            <Link href="/">
              <FaHome className="icon-cls" />
            </Link>
          </div>
          <div className="right">
            {isLogin ? (
              <>
                {name}({email})님 /
                <a href="/mypage">
                  <MdContactPage className="icon-cls" />
                  마이페이지
                </a>
                {isAdmin && (
                  <a href={adminUrl} target="_blank">
                    <GrUserAdmin className="icon-cls" /> 사이트관리
                  </a>
                )}
                <a href="/member/api/logout">
                  <RiLogoutBoxLine className="icon-cls" />
                  로그아웃
                </a>
              </>
            ) : (
              <>
                <a href="/member/join">
                  <FaUserPlus className="icon-cls" /> 회원가입
                </a>
                <a href="/member/login">
                  <RiLoginBoxLine className="icon-cls" /> 로그인
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {/* site-top */}
      <div className="logo-search">
        <div className="layout-width">
          {/* 컨텐츠 영역 */}
          <Link href="/" className="logo">
            <Image src={logo} alt="로고" priority={true} height={220} />
          </Link>

          <StyledForm method="GET" action="/board/search" autoComplete="off">
            <input
              type="text"
              name="skey"
              placeholder="검색어를 입력하세요"
            ></input>
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
