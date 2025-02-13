export type CommonType = {
  children?: React.ReactNode | string[] | string
  width?: number | string
  height?: number | string
  color?: string | undefined
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
