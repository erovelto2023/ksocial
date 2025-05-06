"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface BlogEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const [editorContent, setEditorContent] = useState(content)

  useEffect(() => {
    // This is a simplified editor for demonstration
    // In a real application, you would integrate a rich text editor like TipTap, CKEditor, or TinyMCE
    setEditorContent(content)
  }, [content])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setEditorContent(newContent)
    onChange(newContent)
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center gap-2 rounded-md border bg-muted/50 p-1">
        <button className="rounded-md p-2 hover:bg-muted">Bold</button>
        <button className="rounded-md p-2 hover:bg-muted">Italic</button>
        <button className="rounded-md p-2 hover:bg-muted">Link</button>
        <button className="rounded-md p-2 hover:bg-muted">Image</button>
        <button className="rounded-md p-2 hover:bg-muted">List</button>
        <button className="rounded-md p-2 hover:bg-muted">Quote</button>
        <button className="rounded-md p-2 hover:bg-muted">Code</button>
      </div>
      <textarea
        value={editorContent}
        onChange={handleChange}
        className="min-h-[400px] w-full rounded-md border p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Write your blog post content here..."
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Tip: This is a simplified editor. In a production environment, you would use a full-featured rich text editor.
      </p>
    </div>
  )
}
