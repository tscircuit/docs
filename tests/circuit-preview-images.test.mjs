import { expect, mock, test } from "bun:test"
import { getUncompressedSnippetString } from "@tscircuit/create-snippet-url"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { discoverImages } from "../scripts/warm-docs-images.mjs"

mock.module("@theme/CodeBlock", () => ({
  default: ({ children }) => createElement("pre", null, children),
}))
mock.module("@docusaurus/theme-common", () => ({
  useWindowSize: () => "desktop",
}))
mock.module("../src/hooks/use-color-mode", () => ({
  useColorMode: () => ({ isDarkTheme: false }),
}))
mock.module("@site/src/tw", () => ({ tw: (value) => value }))
mock.module("../src/components/TscircuitIframe", () => ({
  default: () => null,
}))

const { default: CircuitPreview } = await import(
  "../src/components/CircuitPreview/CircuitPreview"
)

function imagesFor(props = {}) {
  return discoverImages(
    renderToStaticMarkup(
      createElement(CircuitPreview, {
        code: 'export default () => <board width="10mm" height="10mm" />',
        ...props,
      }),
    ),
    "https://docs.tscircuit.com/",
  ).map((url) => new URL(url))
}

test("enabled inactive views remain warmable; disabled views do not download", () => {
  expect(imagesFor().map((url) => url.searchParams.get("svg_type"))).toEqual([
    "pcb",
    "schematic",
    "3d",
  ])
  expect(
    imagesFor({ hideSchematicTab: true, hide3DTab: true }).map((url) =>
      url.searchParams.get("svg_type"),
    ),
  ).toEqual(["pcb"])
  expect(
    imagesFor({ schematicOnly: true }).map((url) =>
      url.searchParams.get("svg_type"),
    ),
  ).toEqual(["schematic"])
})

test("a selected view still renders when its tab selector is hidden", () => {
  const images = imagesFor({
    defaultView: "3d",
    hidePCBTab: true,
    hideSchematicTab: true,
    hide3DTab: true,
  })
  expect(images.map((url) => url.searchParams.get("svg_type"))).toEqual(["3d"])
  expect(images[0].searchParams.get("realistic")).toBe("true")
  expect(
    imagesFor({ defaultView: "pinout" }).some(
      (url) => url.searchParams.get("svg_type") === "pinout",
    ),
  ).toBe(true)
})

test("3D file maps are gzip encoded without losing Unicode or the entrypoint", () => {
  const fsMap = {
    "entry.tsx": 'export default () => <board name="日本語" />',
    "data.json": '{"label":"抵抗器"}',
  }
  const url = imagesFor({ fsMap, mainComponentPath: "entry.tsx" }).find(
    (url) => url.searchParams.get("svg_type") === "3d",
  )
  const encoded = url.searchParams.get("fs_map")
  expect(encoded.startsWith("H4sI")).toBe(true)
  expect(JSON.parse(getUncompressedSnippetString(encoded))).toEqual(fsMap)
  expect(url.searchParams.get("main_component_path")).toBe("entry.tsx")
  expect(url.searchParams.get("project_base_url")).toBe(
    "https://docs.tscircuit.com/",
  )
})
