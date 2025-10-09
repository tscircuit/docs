import React, { useState, useRef, useEffect } from "react";
import { useDoc } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";

const CopyPageButton: React.FC = () => {
  const {
    metadata: { permalink, title, source },
  } = useDoc();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopy = async (type: "markdown" | "url") => {
    let contentToCopy = "";
    if (type === "markdown") {
      if (source) {
        const markdownPath = source.replace(/^@site\//, "/"); // Convert @site/docs/x to /docs/x
        try {
          const response = await fetch(markdownPath);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          contentToCopy = await response.text();
          setCopyStatus("Copied Markdown");
        } catch (err) {
          console.error("Failed to fetch markdown: ", err);
          contentToCopy = `[${title}](${window.location.href})`; // Fallback to URL
          setCopyStatus("Failed to copy Markdown (copied URL instead)");
        }
      } else {
        contentToCopy = `[${title}](${window.location.href})`; // Fallback to URL
        setCopyStatus("Markdown source not found (copied URL instead)");
      }
    } else if (type === "url") {
      contentToCopy = window.location.href;
      setCopyStatus("Copied URL");
    }

    try {
      await navigator.clipboard.writeText(contentToCopy);
      setTimeout(() => setCopyStatus(""), 2000); // Clear status after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopyStatus("Failed to copy!");
      setTimeout(() => setCopyStatus(""), 2000);
    }
    setDropdownOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={dropdownRef}
    >
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        style={{
          padding: "8px 12px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
          cursor: "pointer",
        }}
      >
        Copy Page
      </button>
      {dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: 1,
            minWidth: "200px",
          }}
        >
          <button
            onClick={() => handleCopy("markdown")}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              backgroundColor: "transparent",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Copy page as Markdown for LLMs
          </button>
          <button
            onClick={() => handleCopy("url")}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              backgroundColor: "transparent",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Copy page URL
          </button>
        </div>
      )}
      {copyStatus && (
        <span style={{ marginLeft: "10px", color: "green" }}>{copyStatus}</span>
      )}
    </div>
  );
};

export default CopyPageButton;
