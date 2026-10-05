import { useEffect, useRef, useState } from "react"

export interface TscircuitIframeProps {
  fsMap?: Record<string, string>
  entrypoint?: string
  code?: string
}

export const TscircuitIframe = (runFrameProps: TscircuitIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  let additionalProps: Record<string, any> = { isWebEmbedded: true }

  if (runFrameProps.code) {
    additionalProps = {
      ...additionalProps,
      fsMap: {
        "index.tsx": runFrameProps.code,
      },
    }
  }

  if (runFrameProps.fsMap) {
    additionalProps = {
      ...additionalProps,
      fsMap: runFrameProps.fsMap,
      entrypoint: runFrameProps.entrypoint,
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
        setIsLoading(false)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div>
      {isLoading && (
        <div className="skeleton-container">
          <div>
            <div className="skeleton-header" />
            <div className="skeleton-body" />
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src="https://runframe.tscircuit.com/iframe.html"
        title="tscircuit code runner and preview"
        frameBorder="0"
        scrolling="no"
        className="tscircuit-iframe"
        style={{
          opacity: isLoading ? 0 : 1,
        }}
        onLoad={() => {
          // The iframe is loaded, but we'll only hide the skeleton
          // when we receive the "runframe_ready_to_receive" message
        }}
      />
    </div>
  )
}

export default TscircuitIframe
