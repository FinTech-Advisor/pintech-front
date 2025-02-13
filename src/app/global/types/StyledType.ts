import colors from "../styles/colors"
const {dark} = colors

export type CommonType = {
  children?: React.ReactNode | string[] | string
  width?: number | string
  height?: number | string
  color?: string
  min?: number
  max?: number
  type?: string | undefined
  disabled?: boolean | undefined
  placeholder?: string
  name?: string
  value?: string
  className?: string
}

export type SelectType = CommonType & {
  options?: { value: string; label: string }[]
}
