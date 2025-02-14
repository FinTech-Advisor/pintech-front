'use client'

import React, { useState, useMemo, useRef, useCallback } from 'react'
import ReactQuill from 'react-quill-new'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import FileItems from './FileItems'
import useDelete from '@/app/board/hooks/useDelete'
import useFileUpload from '../hooks/useFileUpload'

const Wrapper = styled.div<CommonType>`
  padding-bottom: 50px;

  .file-items {
    position: absolute;
    z-index: 10;
    margin-top: 50px;
  }

  button[type='submit'] {
    margin-top: 50px;
  }
`

type Props = {
  content?: string
  onChange: (content: string) => void
  width?: number | string
  height?: number
  useImage?: boolean
  gid?: string
  location?: string
  files?: any[]
}

const Editor = ({
  content,
  onChange,
  width,
  height,
  useImage,
  gid,
  location,
  files,
}: Props) => {
  width = width ?? '100%'
  height = height ?? 350

  gid = gid ?? '' + Date.now()
  location = location ?? 'editor'

  const editor = useRef<any>(undefined)

  const [_files, setFiles] = useState<any>(files ?? [])

  const [_content, setContent] = useState<string>(content)

  const onDeleteFile = useDelete(setFiles)
  const processUpload = useFileUpload(setFiles, null, editor)

  const styles = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  )

  const modules = useMemo(() => {
    const imageUploader = () => {
      const fileEl = document.createElement('input')
      fileEl.type = 'file'
      fileEl.accept = 'image/*' // 이미지만 가능하도록
      fileEl.multiple = true
      fileEl.click()

      fileEl.addEventListener('change', (e: any) => {
        const files = e.target.files
        const formData = new FormData()
        formData.append('gid', gid)
        formData.append('location', location)
        formData.append('imageOnly', 'true')

        for (const file of files) {
          formData.append('file', file)
        }

        // 업로드 처리
        processUpload(formData)
      })
    }

    if (useImage) {
      return {
        toolbar: {
          container: [
            ['image'],
            [{ header: [1, 2, 3, 4, 5, true] }],
            ['bold', 'underline'],
          ],
          handlers: {
            // image 누르면 imageUploader 호출
            image: imageUploader,
          },
        },
      }
    } else {
      return {}
    }
  }, [useImage, gid, location, processUpload])

  const onInsertImage = useCallback(
    (url) => {
      // Quill 객체 밖의 getEditor라는 Custom 함수
      const _editor = editor.current.getEditor()
      const cursor = _editor.getSelection()
      // cursor.index = 현재 있는 커서의 라인수
      _editor.insertEmbed(cursor?.index ?? 0, 'image', url)
    },
    [editor],
  )

  const onEditorChange = useCallback(
    (content) => {
      setContent(content)
      onChange(content)
    },
    [onChange],
  )

  return (
    <Wrapper>
      {_files && (
        <FileItems
          files={_files}
          isEditor={true}
          onDeleteFile={onDeleteFile}
          onInsertImage={onInsertImage}
          className="file=items"
        />
      )}
      <ReactQuill
        ref={editor} // Dom 선택용
        theme="snow"
        value={_content ?? ''}
        onChange={onEditorChange}
        style={styles}
        modules={modules}
        placeholder="내용을 입력하세요"
      />
    </Wrapper>
  )
}

export default React.memo(Editor)
