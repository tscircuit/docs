import { test } from "node:test"
import { strict as assert } from "node:assert"
import { Window } from "happy-dom"
import { createRoot } from "react-dom/client"
import { act } from "react"
import SchematicPreview from "../src/components/CircuitPreview/SchematicPreview"
import {
  createSchematicManifestUrl,
  createSchematicSheetUrl,
  hasSchematicSheets,
} from "../src/components/CircuitPreview/schematic-sheets"

test("Schematic preview pages through hosted schematic sheets", async () => {
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
      if (String(input).includes("code=old-server"))
        return new Response("<svg />", {
          headers: { "Content-Type": "image/svg+xml" },
        })
      return Response.json({
        pages: String(input).includes("code=single")
          ? []
          : [{ name: "Power" }, { name: "Logic" }],
      })
    },
  })
  const host = browser.document.createElement("div")
  const root = createRoot(host as unknown as HTMLElement)
  const counter = () => host.querySelector('[aria-live="polite"]')?.textContent
  const imageSrc = () => host.querySelector("img")?.getAttribute("src")
  const next = () =>
    host.querySelector(
      '[aria-label="Next schematic page"]',
    ) as unknown as HTMLButtonElement
  try {
    const src = "https://svg.tscircuit.com/?svg_type=schematic&code=stacked"
    await act(async () =>
      root.render(<SchematicPreview src={src} alt="Schematic" />),
    )
    assert.equal(
      new URL(requests[0]!).searchParams.get("schematic_manifest"),
      "true",
    )
    assert.equal(counter(), "1/2")
    assert.match(host.querySelector("nav")!.textContent!, /Power/)
    assert.equal(new URL(imageSrc()!).searchParams.get("schematic_sheet"), "1")
    await act(async () => next().click())
    assert.equal(counter(), "2/2")
    assert.match(host.querySelector("nav")!.textContent!, /Logic/)
    assert.equal(next().disabled, true)
    assert.equal(new URL(imageSrc()!).searchParams.get("schematic_sheet"), "2")

    // One sheet, or a server without sheet support, shows the stacked image.
    for (const code of ["single", "old-server"]) {
      const fallbackSrc = `https://svg.tscircuit.com/?svg_type=schematic&code=${code}`
      await act(async () =>
        root.render(<SchematicPreview src={fallbackSrc} alt="Schematic" />),
      )
      assert.equal(host.querySelector("nav"), null)
      assert.equal(imageSrc(), fallbackSrc)
    }

    assert.equal(
      new URL(
        createSchematicManifestUrl(createSchematicSheetUrl(src, 2)),
      ).searchParams.get("schematic_sheet"),
      null,
    )
    assert.equal(
      hasSchematicSheets({ code: '<schematicsheet name="A" />' }),
      true,
    )
    assert.equal(hasSchematicSheets({ code: "<resistor />" }), false)
    assert.equal(
      hasSchematicSheets({
        circuitJson: [{ type: "schematic_sheet" }],
        code: "<schematicsheet />",
      }),
      false,
    )
  } finally {
    await act(async () => root.unmount())
    Object.assign(globalThis, { ...old, IS_REACT_ACT_ENVIRONMENT: false })
    await browser.happyDOM.close()
  }
})
