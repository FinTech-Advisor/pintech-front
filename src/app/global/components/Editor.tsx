'use client'
import React, { useMemo } from 'react'
import ReactQuill from 'react-quill-new'

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

        const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/file/upload'

        ;(async () => {
          const res = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })
          const result = await res.json()
          console.log('result', result)
        })()
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
  }, [useImage, gid, location])

  return (
    <ReactQuill
      theme="snow"
      value={content ?? ''}
      onChange={onChange}
      style={styles}
      modules={modules}
    />
  )
}

export default React.memo(Editor)
