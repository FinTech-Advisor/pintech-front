'use client'
import React, { useMemo } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { CommonType } from '../types/StyledType'
import { FaRegWindowClose } from 'react-icons/fa'
import colors from '../styles/colors'
import sizes from '../styles/sizes'

const { white, dark } = colors
const { big, normal } = sizes

const Wrapper = styled.div<CommonType>`
  position: relative;
  font-size: ${normal};

  .close {
    top: -20px;
    right: -20px;
    font-size: 40px;
    position: absolute;
    cursor: pointer;
  }

  h1 {
    color: ${dark};
    font-size: ${big};
    padding: 0 10px 15px;
    border-bottom: 2px solid ${dark};
    margin-bottom: 20px;
  }
`

Modal.setAppElement('#root')

type Props = {
  width?: number
  height?: number
  isOpen: boolean
  children: React.ReactNode
  onClose: () => void
  title?: string
}
const LayerPopup = ({
  width,
  height,
  isOpen,
  children,
  onClose,
  title,
}: Props) => {
  width = width ?? 350
  height = height ?? 350
  const customStyles = useMemo(
    () => ({
      content: {
        width,
        height,
        top: `calc((100% - ${height}px) / 2)`,
        left: `calc((100% - ${width}px) / 2)`,
        background: white,
        padding: 40,
        borderRadius: 25,
      },
    }),
    [width, height],
  )

  return (
    isOpen && (
      <Modal isOpen={isOpen} style={customStyles}>
        <Wrapper>
          <FaRegWindowClose onClick={onClose} className="close" />
          {title && <h1>{title}</h1>}

          {children}
        </Wrapper>
      </Modal>
    )
  )
}

export default React.memo(LayerPopup)
