import { useEffect, useRef, useState } from "react"

export interface TscircuitIframeProps {
  fsMap?: Record<string, string>
  entrypoint?: string
  code?: string
}

export const TscircuitIframe = (runFrameProps: TscircuitIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false)

  let additionalProps = {}

  if (runFrameProps.code) {
    additionalProps = {
      fsMap: {
        "index.tsx": runFrameProps.code,
      },
    }
  }

  if (runFrameProps.fsMap) {
    additionalProps = {
      fsMap: runFrameProps.fsMap,
      entrypoint: runFrameProps.entrypoint,
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const enableIframe = () => {
      setShouldLoadIframe(true)
    }

    if (document.readyState === "complete") {
      enableIframe()
      return
    }

    window.addEventListener("load", enableIframe, { once: true })

    return () => {
      window.removeEventListener("load", enableIframe)
    }
  }, [])

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
      {shouldLoadIframe && (
        <iframe
          ref={iframeRef}
          src="https://runframe.tscircuit.com/iframe.html"
          title="tscircuit code runner and preview"
          frameBorder="0"
          scrolling="no"
          loading="lazy"
          style={{
            overflow: "hidden",
            width: "100%",
            height: 600,
            border: "none",
            padding: 0,
            margin: 0,
            boxSizing: "border-box",
            display: isLoading ? "none" : "block",
          }}
          onLoad={() => {
            // The iframe is loaded, but we'll only hide the skeleton
            // when we receive the "runframe_ready_to_receive" message
          }}
        />
      )}
    </div>
  )
}

export default TscircuitIframe
