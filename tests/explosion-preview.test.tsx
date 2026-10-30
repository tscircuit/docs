import { test } from "node:test"
import { strict as assert } from "node:assert"
import { Window } from "happy-dom"
import { createRoot } from "react-dom/client"
import { act } from "react"
import ThreeDPreview from "../src/components/CircuitPreview/three-d-preview"
import { useRenderedAsset } from "../src/components/CircuitPreview/use-rendered-asset"

const stages = [
  { name: "Assembled" },
  {
    name: "Cover and bolts",
    explosion: { throughStageRef: "case.lift-cover" },
  },
  {
    name: "Bolts halfway out",
    explosion: { throughStageRef: "case.remove-bolts", stageProgress: 0.5 },
  },
]

test("stage selector shows each pose, supports backwards playback, and resets for new input", async () => {
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
  const root = createRoot(host as unknown as HTMLElement)
  const button = (label: string) =>
    host.querySelector(
      `[aria-label="${label}"]`,
    ) as unknown as HTMLButtonElement
  const image = () => new URL(host.querySelector("img")!.getAttribute("src")!)
  try {
    await act(async () =>
      root.render(
        <ThreeDPreview
          sourceUrl="https://svg.tscircuit.com/?code=one"
          stages={stages}
        />,
      ),
    )
    assert.equal(image().searchParams.get("show_infinite_grid"), "false")
    assert.equal(button("Previous explosion stage").disabled, true)
    assert.equal(image().searchParams.has("explosion_stage"), false)
    await act(async () => button("Next explosion stage").click())
    assert.equal(image().searchParams.get("explosion_stage"), "case.lift-cover")
    await act(async () => button("Next explosion stage").click())
    assert.equal(image().searchParams.get("explosion_progress"), "0.5")
    assert.equal(button("Next explosion stage").disabled, true)
    assert.equal(
      host.querySelector("img")?.getAttribute("alt"),
      "Assembly: Bolts halfway out",
    )
    await act(async () => button("Previous explosion stage").click())
    assert.equal(image().searchParams.has("explosion_progress"), false)
    await act(async () =>
      root.render(
        <ThreeDPreview
          sourceUrl="https://svg.tscircuit.com/?code=two"
          stages={stages}
        />,
      ),
    )
    assert.equal(image().searchParams.has("explosion_stage"), false)
  } finally {
    await act(async () => root.unmount())
    Object.assign(globalThis, { ...old, IS_REACT_ACT_ENVIRONMENT: false })
    await browser.happyDOM.close()
  }
})

test("POST previews abort old poses, ignore late responses, and release object URLs", async () => {
  const browser = new Window({
    url: "https://docs.test",
    settings: { enableImageFileLoading: false },
  })
  const old = {
    window: globalThis.window,
    document: globalThis.document,
    fetch: globalThis.fetch,
  }
  const oldCreate = URL.createObjectURL
  const oldRevoke = URL.revokeObjectURL
  const pending: {
    url: string
    options: RequestInit
    resolve: (r: Response) => void
  }[] = []
  const revoked: string[] = []
  let serial = 0
  Object.assign(globalThis, {
    window: browser,
    document: browser.document,
    IS_REACT_ACT_ENVIRONMENT: true,
    fetch: (url: string, options: RequestInit) =>
      new Promise<Response>((resolve) =>
        pending.push({ url, options, resolve }),
      ),
  })
  URL.createObjectURL = () => `blob:pose-${++serial}`
  URL.revokeObjectURL = (url) => revoked.push(url)
  const host = browser.document.createElement("div")
  const root = createRoot(host as unknown as HTMLElement)
  function Preview({ url }: { url: string }) {
    const result = useRenderedAsset(url, '{"circuit_json":"gzipped"}')
    return <output>{result.error ? "error" : (result.src ?? "loading")}</output>
  }
  const png = () =>
    new Response("png", { headers: { "Content-Type": "image/png" } })
  try {
    await act(async () => root.render(<Preview url="https://svg.test/first" />))
    await act(async () =>
      root.render(<Preview url="https://svg.test/second" />),
    )
    assert.equal(pending[0].options.signal?.aborted, true)
    assert.equal(pending[1].options.method, "POST")
    assert.equal(pending[1].options.body, '{"circuit_json":"gzipped"}')
    await act(async () => {
      pending[1].resolve(png())
    })
    assert.equal(host.textContent, "blob:pose-1")
    await act(async () => {
      pending[0].resolve(png())
    })
    assert.equal(host.textContent, "blob:pose-1")
    await act(async () => root.render(<Preview url="https://svg.test/third" />))
    assert.deepEqual(revoked, ["blob:pose-1"])
    assert.equal(host.textContent, "loading")
    await act(async () => {
      pending[2].resolve(new Response("bad", { status: 400 }))
    })
    assert.equal(host.textContent, "error")
  } finally {
    await act(async () => root.unmount())
    Object.assign(globalThis, { ...old, IS_REACT_ACT_ENVIRONMENT: false })
    URL.createObjectURL = oldCreate
    URL.revokeObjectURL = oldRevoke
    await browser.happyDOM.close()
  }
})
