import { useLatestTscircuitCdnUrl } from "../hooks/use-latest-tscircuit-cdn-url"

export default () => {
  const url = useLatestTscircuitCdnUrl()

  if (!url) return null

  return (
    <iframe
      title="Tscircuit Iframe Example"
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
      srcDoc={`<!DOCTYPE html>
<html lang="en">
  <head>
    <script>
      window.process = { env: { NODE_ENV: "production" } }
    </script>
    <script type="module" src="${url}"></script>
    <script type="tscircuit-tsx">
      export default () => (
        <board width="10mm" height="10mm">
          <resistor name="R1" resistance={1000} footprint={"0402"} />
        </board>
      )
    </script>
  </head>
  <body>
  </body>
</html>`}
    />
  )
}
