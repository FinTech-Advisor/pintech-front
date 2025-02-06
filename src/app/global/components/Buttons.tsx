import styled, { css } from 'styled-components'

const commonStyle = css``

export const TinyButton = styled.button`
  ${commonStyle}
`

export const SmallButton = styled.button`
  ${commonStyle}
`

export const Button = styled.button`
  ${commonStyle}
`

export const MediumButton = styled.button`
  ${commonStyle}
`

export const BigButton = styled.button`
  ${commonStyle}
`

export const ExtraButton = styled.button`
  ${commonStyle}
`

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  button {
    width: 0;
    flex-grow: 1;

    & + & {
      margin-left: 3px;
    }
  }
`
