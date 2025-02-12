import styled, { css } from 'styled-components'
import { CommonType } from '../types/StyledType'
const commonStyle = css``
export const TinyButton = styled.button<CommonType>`
  ${commonStyle}
`
export const SmallButton = styled.button<CommonType>`
  ${commonStyle}
`
export const NormalButton = styled.button<CommonType>`
  ${commonStyle}
`
export const MediumButton = styled.button<CommonType>`
  ${commonStyle}
`
export const BigButton = styled.button<CommonType>`
  ${commonStyle}
`
export const ExtraButton = styled.button<CommonType>`
  ${commonStyle}
`
export const ButtonGroup = styled.div<CommonType>`
  display: flex;
  width: 100%;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
  button {
    width: 0;
    flex-grow: 1;
    & + & {
      margin-left: 3px;
    }
  }
`
