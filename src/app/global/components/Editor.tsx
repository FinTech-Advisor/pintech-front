'use client'
import React, { useState, useMemo, useRef, useCallback } from 'react'
import ReactQuill from 'react-quill-new'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import { getToken } from '../libs/apiRequest'
import FileItems from './FileItems'
import useDelete from '@/app/board/hooks/useDelete'
import useFileupload from '../hooks/useFileUpload'

const Wrapper = styled.div<CommonType>`
  padding-bottom: 50px;

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
}

const Editor = ({
  content,
  onChange,
  width,
  height,
  useImage,
  gid,
  location,
}: Props) => {
  width = width ?? '100%'
  height = height ?? 350

  gid = gid ?? '' + Date.now()
  location = location ?? 'editor'

  const editor = useRef<any>(undefined)
  const [files, setFiles] = useState<any>([])
  const [_content, setContent] = useState<string>(content)

  const styles = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  )

  const onDeleteFile = useDelete(setFiles)
  const processUpload = useFileupload(setFiles, editor) 

  const modules = useMemo(() => {
    const imageUploader = () => {
      const fileEl = document.createElement('input')
      fileEl.type = 'file'
      fileEl.accept = 'image/*'
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

        processUpload(formDatag)
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
            image: imageUploader,
          },
        },
      }
    } else {
      return {}
    }
  }, [useImage, gid, location, editor])

  const onInsertImage = useCallback(
    (url) => {
      const _editor = editor.current.getEditor()
      const cursor = _editor.getSelection()
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
      {files && (
        <FileItems
          files={files}
          isEditor={true}
          onDeleteFile={onDeleteFile}
          onInsertImage={onInsertImage}
          className="file-items"
        />
      )}
      <ReactQuill
        ref={editor}
        theme="snow"
        value={_content ?? ''}
        onChange={onEditorChange}
        style={styles}
        modules={modules}
      />
    </Wrapper>
  )
}

export default React.memo(Editor)
