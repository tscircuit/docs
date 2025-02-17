import { useEffect, useRef } from "react"

export interface TscircuitIframeProps {
  fsMap: Record<string, string>
  entrypoint: string
  code?: string
}

export const TscircuitIframe = (runFrameProps: TscircuitIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  let additionalProps = {}

  if (runFrameProps.code) {
    additionalProps = {
      entrypoint: "entrypoint.tsx",
      fsMap: {
        "entrypoint.tsx": `import Component from "./component.tsx"\ncircuit.add(<Component />)`,
        "component.tsx": runFrameProps.code,
      },
    }
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.runframe_type === "runframe_ready_to_receive") {
        iframeRef.current?.contentWindow?.postMessage(
          {
            runframe_type: "runframe_props_changed",
            runframe_props: { ...runFrameProps, ...additionalProps },
          },
          "*",
        )
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div>
      <iframe
        ref={iframeRef}
        src="https://runframe.tscircuit.com/iframe.html"
        title="tscircuit code runner and preview"
        frameBorder="0"
        scrolling="no"
        style={{
          overflow: "hidden",
          width: "100%",
          height: 600,
          border: "none",
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        }}
      />
    </div>
  )
}

export default TscircuitIframe
