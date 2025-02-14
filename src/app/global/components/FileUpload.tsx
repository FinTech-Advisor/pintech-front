'use client'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import FileItems from './FileItems'
import useDelete from '@/app/board/hooks/useDelete'
import useFileUpload from '../hooks/useFileUpload'
import { SmallButton } from './Buttons'

type Props = {
  gid: string
  location?: string
  single?: boolean
  imageOnly?: boolean
  title?: string
  callback?: (files: any[]) => void
  files?: any[]
}

const Wrapper = styled.div<CommonType>``

const FileUpload = ({
  gid,
  location,
  single,
  imageOnly,
  title,
  callback,
  files,
}: Props) => {
  const [_files, setFiles] = useState<any>(files ?? [])
  const onDeleteFile = useDelete(setFiles)
  const processUpload = useFileUpload(setFiles, callback)
  title = title ?? '파일업로드'

  const onClick = useCallback(() => {
    const fileEl = document.createElement('input')
    fileEl.type = 'file'
    if (imageOnly) {
      // 이미지만 업로드
      fileEl.accept = 'image/*'
    }

    if (!single) {
      fileEl.multiple = true
    }

    fileEl.click()

    fileEl.removeEventListener('change', fileUpload)
    fileEl.addEventListener('change', fileUpload)

    function fileUpload(e) {
      const files = e.target.files

      const formData = new FormData()
      formData.append('gid', gid)
      if (location && location.trim()) {
        formData.append('location', location)
      }

      if (single) {
        formData.append('single', '' + single)
        setFiles([])
      }

      if (imageOnly) formData.append('imageOnly', '' + imageOnly)

      for (const file of files) {
        formData.append('file', file)
      }

      // 업로드 처리
      processUpload(formData)
    }
  }, [imageOnly, single, gid, location, processUpload])

  return (
    <Wrapper>
      <SmallButton type="button" onClick={onClick}>
        {title}
      </SmallButton>

      {!callback && _files && _files.length > 0 && (
        <FileItems files={_files} onDeleteFile={onDeleteFile} />
      )}
    </Wrapper>
  )
}

export default React.memo(FileUpload)
