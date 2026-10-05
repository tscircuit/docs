import {
  CodeBlockContextProvider,
  useCodeBlockContext,
} from "@docusaurus/theme-common/internal"
import { PreviewCodeSourceContext } from "@site/src/components/CircuitPreview/preview-code-source-context"
import OriginalCopyButton from "@theme-original/CodeBlock/Buttons/CopyButton"
import type { Props } from "@theme/CodeBlock/Buttons/CopyButton"
import { useContext } from "react"

export default function CopyButton(props: Props) {
  const source = useContext(PreviewCodeSourceContext)
  const { metadata, wordWrap } = useCodeBlockContext()
  if (source === undefined) return <OriginalCopyButton {...props} />

  // Override only the copy button's metadata; highlighting uses the display code.
  return (
    <CodeBlockContextProvider
      metadata={{ ...metadata, code: source }}
      wordWrap={wordWrap}
    >
      <OriginalCopyButton {...props} />
    </CodeBlockContextProvider>
  )
}
