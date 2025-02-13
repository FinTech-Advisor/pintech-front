import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'

type ChildProps = {
  file?: any
  isEditor?: boolean
  onInsertImage?: (url: string) => void
  className?: string
}

type Props = ChildProps & {
  files: any[]
}

const _FileItem = ({ file, isEditor, onInsertImage, className }: ChildProps) => {
  const { fileName, downloadUrl, fileUrl } = file
  return <span className={className}>
      <a href={downloadUrl}>{fileName}</a>
  </span>
}

const FileItem = ``

const FileItems = ({ files, isEditor, onInsertImage }: Props) => {}

export default React.memo(FileItems)
