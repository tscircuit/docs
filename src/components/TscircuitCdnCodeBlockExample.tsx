import CodeBlock from "@theme/CodeBlock"
import { useLatestTscircuitCdnUrl } from "../hooks/use-latest-tscircuit-cdn-url"

export default () => {
  const url = useLatestTscircuitCdnUrl()

  if (!url) {
    return (
      <div className="skeleton-container">
        <div style={{ textAlign: "center", padding: "20px" }}>
          Loading CDN URL...
        </div>
      </div>
    )
  }

  return (
    <CodeBlock language="html">{`<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Pull the latest browser bundle from cdnjs -->
    <script type="module" src="${url}"></script>

    <!-- Your tscircuit snippet goes here -->
    <script type="tscircuit-tsx">
      export default () => (
        <board width="10mm" height="10mm">
          <resistor name="R1" resistance={1000} footprint={"0402"} />
        </board>
      )
    </script>
  </head>
  <body></body>
</html>`}</CodeBlock>
  )
}
