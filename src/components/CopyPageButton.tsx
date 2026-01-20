import React, { useState, useRef, useEffect } from "react"
import TurndownService from "turndown"
import { tw } from "@site/src/tw"

export default function CopyPageButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isOpen])

  const getPageContentAsMarkdown = () => {
    // Get the main content area
    const article = document.querySelector("article")
    if (!article) return ""

    // Find the markdown container
    const markdownContainer = article.querySelector(".markdown")
    if (!markdownContainer) return ""

    // Remove unwanted elements before conversion
    const tempContainer = document.createElement("div")
    tempContainer.innerHTML = markdownContainer.innerHTML

    // Remove copy buttons, navigation, and other UI elements
    const elementsToRemove = tempContainer.querySelectorAll(
      ".copy-page-button-container, nav, button, .theme-admonition, [role='button']",
    )
    elementsToRemove.forEach((el) => el.remove())

    // Initialize Turndown
    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    })

    // Convert HTML to Markdown
    const markdown = turndownService.turndown(tempContainer.innerHTML)

    return markdown.trim()
  }

  const constructUrl = () => {
    const url = new URL(window.location.href)
    let path = url.pathname

    // If it's root path, return just origin with trailing slash
    if (path === "/" || path === "") {
      return url.origin + "/"
    }

    // Remove trailing slash if present
    if (path.endsWith("/")) {
      path = path.slice(0, -1)
    }

    // Add .md extension if not already present
    if (!path.endsWith(".md")) {
      path = path + ".md"
    }

    return `${url.origin}${path}`
  }

  const handleCopyPage = async () => {
    const markdown = getPageContentAsMarkdown()
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setIsOpen(false)
      }, 1500)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleOpenInChatGPT = () => {
    const formattedUrl = constructUrl()
    const prompt = `Read from ${formattedUrl} so I can ask questions about it.`
    const encodedPrompt = encodeURIComponent(prompt)
    window.open(
      `https://chat.openai.com/?q=${encodedPrompt}`,
      "_blank",
      "noopener,noreferrer",
    )
    setIsOpen(false)
  }

  const handleOpenInClaude = () => {
    const formattedUrl = constructUrl()
    const prompt = `Read from ${formattedUrl} so I can ask questions about it.`
    const encodedPrompt = encodeURIComponent(prompt)
    window.open(
      `https://claude.ai/new?q=${encodedPrompt}`,
      "_blank",
      "noopener,noreferrer",
    )
    setIsOpen(false)
  }

  return (
    <div className="copy-page-button-container" ref={dropdownRef}>
      <div className="copy-page-button-wrapper">
        <button
          type="button"
          className="copy-page-button-main"
          onClick={handleCopyPage}
          aria-label="Copy page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span className="copy-page-button-text">
            {copied ? "Copied!" : "Copy page"}
          </span>
        </button>
        <div className="copy-page-button-divider"></div>
        <button
          type="button"
          className="copy-page-button-dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
        >
          <svg
            className={tw(`copy-page-button-chevron ${isOpen ? "open" : ""}`)}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="copy-page-dropdown">
          <button
            type="button"
            className="copy-page-dropdown-item"
            onClick={handleCopyPage}
          >
            <div className="copy-page-icon-wrapper">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </div>
            <div className="copy-page-dropdown-item-content">
              <span className="copy-page-dropdown-item-title">
                {copied ? "Copied!" : "Copy page"}
              </span>
              {!copied && (
                <span className="copy-page-dropdown-subtitle">
                  Copy page as Markdown for LLMs
                </span>
              )}
            </div>
          </button>

          <button
            type="button"
            className="copy-page-dropdown-item"
            onClick={handleOpenInChatGPT}
          >
            <div className="copy-page-icon-wrapper">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
              </svg>
            </div>
            <div className="copy-page-dropdown-item-content">
              <span className="copy-page-dropdown-item-title">
                Open in ChatGPT
              </span>
              <span className="copy-page-dropdown-subtitle">
                Ask questions about this page
              </span>
            </div>
            <svg
              className="copy-page-external-icon"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>

          <button
            type="button"
            className="copy-page-dropdown-item"
            onClick={handleOpenInClaude}
          >
            <div className="copy-page-icon-wrapper">
              <svg
                width="14"
                height="14"
                viewBox="0 0 92.2 65"
                fill="currentColor"
              >
                <path d="M66.5,0H52.4l25.7,65h14.1L66.5,0z M25.7,0L0,65h14.4l5.3-13.6h26.9L51.8,65h14.4L40.5,0C40.5,0,25.7,0,25.7,0z M24.3,39.3l8.8-22.8l8.8,22.8H24.3z" />
              </svg>
            </div>
            <div className="copy-page-dropdown-item-content">
              <span className="copy-page-dropdown-item-title">
                Open in Claude
              </span>
              <span className="copy-page-dropdown-subtitle">
                Ask questions about this page
              </span>
            </div>
            <svg
              className="copy-page-external-icon"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
