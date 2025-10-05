import type { ReactNode } from "react"
import type { Root } from "react-dom/client"
import { createRoot } from "react-dom/client"
import * as ReactDOM from "react-dom"

declare global {
  interface HTMLElement {
    __reactCompatRoot?: Root
  }
}

const dom = ReactDOM as typeof ReactDOM & {
  render?: (element: ReactNode, container: HTMLElement) => Root
  unmountComponentAtNode?: (container: HTMLElement) => boolean
}

if (typeof window !== "undefined") {
  if (typeof dom.render !== "function") {
    dom.render = (element, container) => {
      let root = container.__reactCompatRoot
      if (!root) {
        root = createRoot(container)
        container.__reactCompatRoot = root
      }
      root.render(element)
      return root
    }
  }

  if (typeof dom.unmountComponentAtNode !== "function") {
    dom.unmountComponentAtNode = (container) => {
      const root = container.__reactCompatRoot
      if (root) {
        root.unmount()
        delete container.__reactCompatRoot
      }
      return true
    }
  }
}
