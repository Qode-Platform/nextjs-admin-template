import fs from "fs"
import path from "path"

import { CodeBlock } from "./CodeBlock"

export function SourceViewer({ filePath }: { filePath: string }) {
  let code: string
  try {
    code = fs.readFileSync(path.join(process.cwd(), filePath), "utf-8")
  } catch {
    return (
      <p className="font-mono text-sm text-muted-foreground">
        Source not available: {filePath}
      </p>
    )
  }
  return <CodeBlock code={code} filePath={filePath} />
}
