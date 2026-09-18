import Anser from "anser"
import React, { type CSSProperties } from "react"
import styles from "./styles.module.css"

export interface TerminalSession {
  command: string
  output?: string
}

export interface TerminalProps {
  title?: string
  sessions: TerminalSession[]
}

// Logs are text, never HTML. Remove OSC metadata (including hyperlink targets).
export function terminalText(value: string): string {
  return value
    .replace(/\x1b\][\s\S]*?(?:\x07|\x1b\\)/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\x1b\[(?![\d;]*m)[\d;?]*[ -/]*[@-~]/g, "")
    .replace(/[\x00-\x08\x0b-\x1a\x1c-\x1f\x7f]/g, "")
}

export function AnsiText({ children }: { children: string }) {
  return Anser.ansiToJson(terminalText(children), { remove_empty: true }).map(
    (part, index) => {
      const decorations = part.decorations ?? []
      const foreground = part.fg ? `rgb(${part.fg})` : undefined
      const background = part.bg ? `rgb(${part.bg})` : undefined
      const reverse = decorations.includes("reverse")
      const style: CSSProperties = {
        color: reverse ? (background ?? "#10141c") : foreground,
        backgroundColor: reverse ? (foreground ?? "#e6edf3") : background,
        fontWeight: decorations.includes("bold") ? 700 : undefined,
        fontStyle: decorations.includes("italic") ? "italic" : undefined,
        opacity: decorations.includes("dim") ? 0.75 : undefined,
        textDecoration:
          [
            decorations.includes("underline") ? "underline" : "",
            decorations.includes("strikethrough") ? "line-through" : "",
          ]
            .filter(Boolean)
            .join(" ") || undefined,
      }
      return (
        <span key={index} style={style}>
          {part.content}
        </span>
      )
    },
  )
}

export default function Terminal({
  title = "Terminal",
  sessions,
}: TerminalProps) {
  return (
    <div className={styles.terminal}>
      <pre
        className={styles.screen}
        tabIndex={0}
        aria-label={`${title}: commands and output`}
      >
        <code>
          {sessions.map(({ command, output }, index) => (
            <React.Fragment key={index}>
              {index > 0 ? "\n\n" : ""}
              <span className={styles.prompt} aria-hidden="true">
                ${" "}
              </span>
              <span className={styles.command}>
                <AnsiText>{command}</AnsiText>
              </span>
              {output ? (
                <>
                  {"\n"}
                  <AnsiText>{output.replace(/\n$/, "")}</AnsiText>
                </>
              ) : null}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}
