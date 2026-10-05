import { createContext } from "react"

/** The complete runnable file, separate from its abbreviated display. */
export const PreviewCodeSourceContext = createContext<string | undefined>(
  undefined,
)
