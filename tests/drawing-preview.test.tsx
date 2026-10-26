import { test } from "node:test"
import { strict as assert } from "node:assert"
import { Window } from "happy-dom"
import { createRoot } from "react-dom/client"
import { act } from "react"
import DrawingPreview from "../src/components/CircuitPreview/DrawingPreview"
import {
  createDrawingManifestUrl,
  createDrawingUrl,
  hasDrawingPages,
} from "../src/components/CircuitPreview/drawing-urls"

test("Drawing preview paginates and resets when its circuit changes", async () => {
  const browser = new Window({
    url: "https://docs.test",
    settings: { enableImageFileLoading: false },
  })
  const old = { window: globalThis.window, document: globalThis.document }
  Object.assign(globalThis, {
    window: browser,
    document: browser.document,
    IS_REACT_ACT_ENVIRONMENT: true,
  })
  const host = browser.document.createElement("div")
  browser.document.body.append(host)
  const root = createRoot(host as unknown as HTMLElement)
  const pages = [1, 2, 3].map((n) => ({
    name: `Sheet ${n}`,
    url: `/sheet-${n}.svg`,
  }))
  const counter = () => host.querySelector('[aria-live="polite"]')?.textContent
  const previous = () =>
    host.querySelector(
      '[aria-label="Previous drawing page"]',
    ) as unknown as HTMLButtonElement
  const next = () =>
    host.querySelector(
      '[aria-label="Next drawing page"]',
    ) as unknown as HTMLButtonElement
  try {
    await act(async () =>
      root.render(
        <DrawingPreview
          sourceUrl="https://svg.tscircuit.com/?code=first"
          pages={pages}
        />,
      ),
    )
    assert.equal(counter(), "1/3")
    assert.equal(previous().disabled, true)
    await act(async () => next().click())
    assert.equal(counter(), "2/3")
    assert.equal(host.querySelector("img")?.getAttribute("src"), "/sheet-2.svg")
    await act(async () => next().click())
    assert.equal(counter(), "3/3")
    assert.equal(next().disabled, true)
    await act(async () => previous().click())
    assert.equal(counter(), "2/3")
    await act(async () =>
      root.render(
        <DrawingPreview
          sourceUrl="https://svg.tscircuit.com/?code=second"
          pages={pages}
        />,
      ),
    )
    assert.equal(counter(), "1/3")
    await act(async () =>
      root.render(
        <DrawingPreview
          sourceUrl="https://svg.tscircuit.com/?code=second"
          pages={pages.slice(0, 1)}
        />,
      ),
    )
    assert.equal(host.querySelector("nav"), null)
    const source =
      "https://svg.tscircuit.com/?code=encoded&main_component_path=board.tsx"
    assert.equal(
      new URL(createDrawingUrl(source, 3)).searchParams.get("drawing_page"),
      "3",
    )
    assert.equal(
      new URL(createDrawingManifestUrl(source)).searchParams.get(
        "main_component_path",
      ),
      "board.tsx",
    )
    assert.equal(
      new URL(createDrawingManifestUrl(source)).searchParams.get(
        "drawing_page",
      ),
      null,
    )
    assert.equal(
      hasDrawingPages({ circuitJson: [{ type: "drawing_page" }] }),
      true,
    )
    assert.equal(hasDrawingPages({ code: "<assembly.drawing.page />" }), true)
    assert.equal(
      hasDrawingPages({ circuitJson: [], code: "<assembly.drawing.page />" }),
      false,
    )
  } finally {
    await act(async () => root.unmount())
    Object.assign(globalThis, { ...old, IS_REACT_ACT_ENVIRONMENT: false })
    await browser.happyDOM.close()
  }
})

test("Drawing preview loads hosted page metadata and handles an empty document", async () => {
  const browser = new Window({
    url: "https://docs.test",
    settings: { enableImageFileLoading: false },
  })
  const old = {
    window: globalThis.window,
    document: globalThis.document,
    fetch: globalThis.fetch,
  }
  const requests: string[] = []
  Object.assign(globalThis, {
    window: browser,
    document: browser.document,
    IS_REACT_ACT_ENVIRONMENT: true,
    fetch: async (input: string) => {
      requests.push(String(input))
      return Response.json({
        pages: String(input).includes("code=empty")
          ? []
          : [{ name: "Plan" }, { name: "Section" }],
      })
    },
  })
  const host = browser.document.createElement("div")
  const root = createRoot(host as unknown as HTMLElement)
  try {
    await act(async () =>
      root.render(
        <DrawingPreview sourceUrl="https://svg.tscircuit.com/?code=hosted" />,
      ),
    )
    assert.equal(host.querySelector('[aria-live="polite"]')?.textContent, "1/2")
    assert.equal(
      new URL(requests[0]!).searchParams.get("drawing_manifest"),
      "true",
    )
    assert.equal(
      new URL(host.querySelector("img")!.getAttribute("src")!).searchParams.get(
        "drawing_page",
      ),
      "1",
    )
    await act(async () =>
      root.render(
        <DrawingPreview sourceUrl="https://svg.tscircuit.com/?code=empty" />,
      ),
    )
    assert.equal(
      host.querySelector('[role="status"]')?.textContent,
      "No drawing pages",
    )
    assert.equal(host.querySelector("nav"), null)
  } finally {
    await act(async () => root.unmount())
    Object.assign(globalThis, { ...old, IS_REACT_ACT_ENVIRONMENT: false })
    await browser.happyDOM.close()
  }
})
