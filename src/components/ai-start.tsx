import React from "react"

export default function AiStart() {
  return (
    <aside className="ai-start" aria-label="Start by asking your AI">
      <strong>Start by asking your AI to “use tscircuit.”</strong>
      <p>
        Tell your AI what you want to build. In environments where your AI can
        install and run tools, it can download and use tscircuit
        automatically—you usually don’t need to install anything yourself.
      </p>
      <p>
        Try: <q>Use tscircuit to design a USB-powered LED board.</q>
      </p>
    </aside>
  )
}
