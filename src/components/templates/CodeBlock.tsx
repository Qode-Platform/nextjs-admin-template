"use client"

import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function CodeBlock({ code, filePath }: { code: string; filePath: string }) {
  const [copied, setCopied] = useState(false)
  const highlighted = hljs.highlight(code, { language: "tsx" }).value
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative">
      <div className="mb-2 font-mono text-xs text-muted-foreground">{filePath}</div>
      <Button
        variant="secondary"
        size="xs"
        onClick={copy}
        className="absolute top-8 right-2 z-10"
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
      <pre className="overflow-auto rounded-lg text-sm">
        <code
          className="hljs block rounded-lg p-4"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}
