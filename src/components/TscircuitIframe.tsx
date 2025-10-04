import { useEffect, useRef, useState } from "react"

export interface TscircuitIframeProps {
  fsMap?: Record<string, string>
  entrypoint?: string
  code?: string
}

export const TscircuitIframe = (runFrameProps: TscircuitIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

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

    // Set a timeout fallback to hide loading after 10 seconds if message never comes
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 10000)

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div>
      {isLoading && !hasError && (
        <div className="skeleton-container">
          <div>
            <div className="skeleton-header" />
            <div className="skeleton-body" />
          </div>
        </div>
      )}
      {hasError && (
        <div className="skeleton-container">
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Unable to load the interactive circuit preview.</p>
            <p style={{ fontSize: "14px", opacity: 0.7 }}>
              The circuit can still be viewed in the code editor above.
            </p>
          </div>
        </div>
      )}
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
          display: isLoading || hasError ? "none" : "block",
        }}
        onLoad={() => {
          // The iframe is loaded, but we'll only hide the skeleton
          // when we receive the "runframe_ready_to_receive" message
          // Set a fallback timeout in case the message never comes
          setTimeout(() => {
            if (isLoading) {
              setIsLoading(false)
            }
          }, 5000)
        }}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

export default TscircuitIframe
