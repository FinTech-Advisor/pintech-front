import React from 'react'
import styled from 'styled-components'
import { FaFileUpload } from 'react-icons/fa'
import { CgFileRemove } from 'react-icons/cg'
import Editor from './Editor' // Make sure the path to Editor is correct
import { CommonType } from '../types/StyledType'
type FileType = {
  seq: number
  fileName: string
  downloadUrl: string
  fileUrl: string
}

type ChildProps = {
  file?: FileType
  isEditor?: boolean
  onInsertImage?: (url: string) => void
  onDeleteFile: (seq: number) => void
  className?: string
}

type Props = {
  files: FileType[]
  isEditor?: boolean
  onInsertImage?: (url: string) => void
  onDeleteFile: (seq: number) => void
  onEditorChange?: (value: string) => void // Optional prop for Editor
}

const _FileItem = ({
  file,
  isEditor = false,
  onInsertImage,
  onDeleteFile,
  className,
}: ChildProps) => {
  if (!file) return null

  const { seq, fileName, downloadUrl, fileUrl } = file

  return (
    <span className={className}>
      <a href={toHttps(downloadUrl)}>{fileName}</a>
      {isEditor && onInsertImage && (
        <FaFileUpload onClick={() => onInsertImage(toHttps(fileUrl))} />
      )}
      <CgFileRemove onClick={() => onDeleteFile(seq)} />
    </span>
  )
}

const FileItem = styled(_FileItem)<CommonType>``

const Wrapper = styled.div<CommonType>``

const FileItems = ({
  files = [],
  isEditor = false,
  onInsertImage,
  onDeleteFile,
  onEditorChange, // Optional prop for passing to Editor
}: Props) => {
  if (files.length === 0) return null

  return (
    <Wrapper>
      {files.map((file) => (
        <FileItem
          key={`file-item-${file.seq}`}
          file={file}
          isEditor={isEditor}
          onInsertImage={onInsertImage}
          onDeleteFile={onDeleteFile}
        />
      ))}
      {/* Conditionally render Editor */}
      {isEditor && onEditorChange && (
        <Editor
          onChange={onEditorChange} // Pass the onEditorChange function to Editor
          useImage={true} // Example prop, update as necessary
          gid="sample-gid" // Replace with your actual gid
          location="file-items-editor" // Update as needed
        />
      )}
    </Wrapper>
  )
}

export default React.memo(FileItems)

// toHttps function
function toHttps(url: string): string {
  if (!/^https?:\/\//.test(url)) {
    return 'https://' + url.replace(':80', '')
  }
  return url.replace('http:', 'https:').replace(':80', '')
}
