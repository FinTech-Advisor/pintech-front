// Editor.tsx
import React from 'react'

interface EditorProps {
  onChange: (value: string) => void
  useImage: boolean
  gid: string
  location: string
}

const Editor = ({ onChange }: EditorProps) => {
  return (
    <div>
      <textarea onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default Editor
