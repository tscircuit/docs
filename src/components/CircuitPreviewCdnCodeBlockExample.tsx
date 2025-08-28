import CodeBlock from "@theme/CodeBlock"
import { useLatestCircuitPreviewCdnUrl } from "../hooks/use-latest-circuit-preview-cdn-url"

export default () => {
  const url = useLatestCircuitPreviewCdnUrl()

  if (!url) return null

  return (
    <CodeBlock language="html">{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>tscircuit + ChatGPT</title>

    <!-- tscircuit preview bundle (global build) -->
    <script src="${url}"></script>

    <!-- Babel for JSX/TSX in the Canvas -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Render the circuit -->
    <script type="text/babel">
        window.tscircuit.render(
            <board width="10mm" height="10mm">
                <resistor
                    resistance="1k"
                    footprint="0402"
                    name="R1"
                    schX={3}
                    pcbX={3}
                />
                <capacitor
                    capacitance="1000pF"
                    footprint="0402"
                    name="C1"
                    schX={-3}
                    pcbX={-3}
                />
                <trace from=".R1 > .pin1" to=".C1 > .pin1" />
            </board>
        )
    </script>
  </head>
  <body>
  </body>
  </html>`}</CodeBlock>
  )
}
