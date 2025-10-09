import { useState, useRef, useEffect } from "react"
import TurndownService from "turndown"
import "./CopyPageButton.css"
import {
  CopyIcon,
  ChevronIcon,
  ExternalLinkIcon,
  ChatGPTIcon,
  ClaudeIcon,
} from "./icons"

interface MenuItem {
  id: number
  label: string
  description: string
  icon: React.ElementType
  action: () => void
  isExternal?: boolean
}

export const CopyPageButton: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState("Copy page")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCopyPage = async () => {
    const articleElement = document.querySelector("article")

    if (!articleElement) {
      console.error("Couldn't find the main <article> element to copy.")
      setCopyButtonText("Error!")
      setTimeout(() => setCopyButtonText("Copy page"), 2000)
      return
    }

    try {
      // Initialize the HTML-to-Markdown converter
      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
      })

      // Convert the article's HTML to Markdown
      const markdown = turndownService.turndown(articleElement)

      // Copy the Markdown to the clipboard
      await navigator.clipboard.writeText(markdown)

      setCopyButtonText("Copied!")
      setTimeout(() => setCopyButtonText("Copy page"), 2000)
    } catch (err) {
      console.error("Failed to copy page as Markdown: ", err)
      setCopyButtonText("Copy failed")
      setTimeout(() => setCopyButtonText("Copy page"), 2000)
    }
    setIsMenuOpen(false) // Close menu after action
  }

  const handleOpenInAI = (platform: "chatgpt" | "claude") => () => {
    if (typeof window === "undefined") return
    const currentPageUrl = window.location.href
    const promptText = `Read from ${currentPageUrl} so I can ask questions about it.`
    const encodedPrompt = encodeURIComponent(promptText)

    let finalUrl = ""
    if (platform === "chatgpt") {
      finalUrl = `https://chat.openai.com/?hints=search&q=${encodedPrompt}`
    } else if (platform === "claude") {
      finalUrl = `https://claude.ai/new?q=${encodedPrompt}`
    }

    if (finalUrl) {
      window.open(finalUrl, "_blank", "noopener,noreferrer")
    }
    setIsMenuOpen(false)
  }

  const openLink = (url: string) => () => {
    window.open(url, "_blank", "noopener,noreferrer")
    setIsMenuOpen(false)
  }

  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: "Copy page",
      description: "Copy page as Markdown for LLMs",
      icon: CopyIcon,
      action: handleCopyPage,
    },
    {
      id: 2,
      label: "Open in ChatGPT",
      description: "Ask questions about this page",
      icon: ChatGPTIcon,
      action: handleOpenInAI("chatgpt"),
      isExternal: true,
    },
    {
      id: 3,
      label: "Open in Claude",
      description: "Ask questions about this page",
      icon: ClaudeIcon,
      action: handleOpenInAI("claude"),
      isExternal: true,
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="copy-page-container" ref={containerRef}>
      <div className="button-group">
        <button
          type="button"
          className="copy-page-base-button copy-button"
          onClick={handleCopyPage}
        >
          <CopyIcon className="icon" />
          <span>{copyButtonText}</span>
        </button>
        <button
          type="button"
          className={`copy-page-base-button menu-trigger-button ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          <ChevronIcon className="icon" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu" role="menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="menu-item"
              role="menuitem"
              type="button"
            >
              <div className="menu-item-wrapper">
                <div className="menu-item-icon-container">
                  <item.icon className="icon" />
                </div>

                <div className="menu-item-text-container">
                  <div className="menu-item-label">
                    <span className="menu-item-text">{item.label}</span>
                    {item.isExternal && <ExternalLinkIcon />}
                  </div>
                  <span className="menu-item-description">
                    {item.description}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CopyPageButton
