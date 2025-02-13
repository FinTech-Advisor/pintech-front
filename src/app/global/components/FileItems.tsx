import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import { FaFileUpload } from 'react-icons/fa'
import { CgFileRemove } from 'react-icons/cg'

type ChildProps = {
  file?: any
  isEditor?: boolean
  onInsertImage?: (url: string) => void
  onDeleteFile: (seq: number) => void
  className?: string
}

type Props = ChildProps & {
  files: any[]
}

const _FileItem = ({
  file,
  isEditor,
  onInsertImage,
  onDeleteFile,
  className,
}: ChildProps) => {
  const { seq, fileName, downloadUrl, fileUrl } = file

  return (
    <span className={className}>
      <a href={toHttps(downloadUrl)}>{fileName}</a>
      {isEditor && (
        <FaFileUpload onClick={() => onInsertImage(toHttps(fileUrl))} />
      )}
      <CgFileRemove onClick={() => onDeleteFile(seq)} />
    </span>
  )
}

const FileItem = styled(_FileItem)<CommonType>``
const Wrapper = styled.div<CommonType>``

const FileItems = ({ files, isEditor, onInsertImage, onDeleteFile }: Props) => {
  return (
    files &&
    files.length > 0 && (
      <Wrapper>
        {files.map((file) => (
          <FileItem
            key={'file-item-' + file.seq}
            file={file}
            isEditor={isEditor}
            onInsertImage={onInsertImage}
            onDeleteFile={onDeleteFile}
          />
        ))}
      </Wrapper>
    )
  )
}

export default React.memo(FileItems)

function toHttps(url) {
  return url.replace('http:', 'https:').replace(':80', '')
}
