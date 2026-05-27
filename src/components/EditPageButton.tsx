import React from "react"
import { useDoc } from "@docusaurus/plugin-content-docs/client"

export default function EditPageButton() {
  const { metadata } = useDoc()
  const editUrl = metadata.editUrl

  if (!editUrl) return null

  return (
    <a
      className="edit-page-button"
      href={editUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Edit this page on GitHub"
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
        aria-hidden="true"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <span>Edit page</span>
    </a>
  )
}
