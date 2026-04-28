import {
  createSvgUrl,
  createPngUrl,
  getCompressedBase64SnippetString,
} from "@tscircuit/create-snippet-url"
import { tw } from "@site/src/tw"
import { useEffect, useMemo, useState } from "react"
import { useColorMode } from "../hooks/use-color-mode"
import { usePrismTheme, useWindowSize } from "@docusaurus/theme-common"
import useIsBrowser from "@docusaurus/useIsBrowser"
import { Editor as LiveCodeEditor } from "react-live"
import TscircuitIframe from "./TscircuitIframe"

const trimCodeString = (value?: string) => value?.trim() ?? ""

const trimFsMap = (value?: Record<string, string>) =>
  value
    ? Object.fromEntries(
        Object.entries(value).map(([filename, fileCode]) => [
          filename,
          trimCodeString(fileCode),
        ]),
      )
    : value

const Tab = ({
  label,
  active,
  onClick,
}: { label: string; active: boolean; onClick: () => void }) => {
  const { isDarkTheme } = useColorMode()

  return (
    <button
      type="button"
      className={tw(
        `px-3 py-1 text-sm font-semibold rounded-md ${
          !isDarkTheme
            ? active
              ? "bg-white text-slate-950 shadow-sm"
              : "bg-none text-slate-500"
            : active
              ? "bg-slate-700"
              : "bg-slate-800"
        }`,
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

const FileTab = ({
  filename,
  active,
  onClick,
}: {
  filename: string
  active: boolean
  onClick: () => void
}) => {
  const { isDarkTheme } = useColorMode()

  return (
    <button
      type="button"
      className={tw(
        `px-3 py-1 text-xs font-mono rounded-md ${
          !isDarkTheme
            ? active
              ? "bg-slate-100 text-slate-950"
              : "text-slate-500 hover:text-slate-700"
            : active
              ? "text-white"
              : "text-slate-400 hover:text-slate-200"
        }`,
      )}
      onClick={onClick}
    >
      {filename}
    </button>
  )
}

export default function CircuitPreview({
  code,
  showTabs = true,
  defaultView = "pcb",
  splitView = true,
  showRunFrame = false,
  hideSchematicTab = false,
  hidePCBTab = false,
  hide3DTab = false,
  showPinoutTab = false,
  browser3dView = false,
  fsMap,
  entrypoint = undefined,
  mainComponentPath = undefined,
  schematicOnly = false,
  projectBaseUrl = "https://docs.tscircuit.com/",
  leftView,
  rightView,
  showSimulationGraph = false,
  verticalStack = false,
  showCourtyards = false,
}: {
  code?: string
  showTabs?: boolean
  defaultView?: "code" | "pcb" | "schematic" | "pinout"
  splitView?: boolean
  showRunFrame?: boolean
  hideSchematicTab?: boolean
  hidePCBTab?: boolean
  hide3DTab?: boolean
  showPinoutTab?: boolean
  fsMap?: Record<string, string>
  entrypoint?: string
  mainComponentPath?: string
  schematicOnly?: boolean
  browser3dView?: boolean
  leftView?: "code" | "pcb" | "schematic" | "3d" | "runframe" | "pinout"
  rightView?: "code" | "pcb" | "schematic" | "3d" | "runframe" | "pinout"
  projectBaseUrl?: string
  showSimulationGraph?: boolean
  verticalStack?: boolean
  showCourtyards?: boolean
}) {
  const { isDarkTheme } = useColorMode()
  const windowSize = useWindowSize()
  const prismTheme = usePrismTheme()
  const isBrowser = useIsBrowser()
  const [editableCode, setEditableCode] = useState(trimCodeString(code))
  const [editableFsMap, setEditableFsMap] = useState(trimFsMap(fsMap))
  const [currentFile, setCurrentFile] = useState<string>(
    entrypoint ?? mainComponentPath ?? Object.keys(fsMap ?? {})[0],
  )

  useEffect(() => {
    setEditableCode(trimCodeString(code))
  }, [code])

  useEffect(() => {
    setEditableFsMap(trimFsMap(fsMap))
  }, [fsMap])

  useEffect(() => {
    setCurrentFile(
      entrypoint ?? mainComponentPath ?? Object.keys(fsMap ?? {})[0],
    )
  }, [entrypoint, fsMap, mainComponentPath])

  let _showTabs = showTabs
  let _splitView = splitView
  let _defaultView = defaultView
  let _hidePCBTab = hidePCBTab
  let _hide3DTab = hide3DTab

  if (schematicOnly) {
    _showTabs = false
    _splitView = false
    _defaultView = "schematic"
    _hidePCBTab = true
    _hide3DTab = true
  }

  if (leftView || rightView) {
    _showTabs = false
    _splitView = true
    _hidePCBTab = ![leftView, rightView].includes("pcb")
    _hide3DTab = ![leftView, rightView].includes("3d")
  }

  const [view, setView] = useState<
    "pcb" | "schematic" | "code" | "3d" | "runframe" | "pinout"
  >(rightView ?? _defaultView)
  const hasMultipleFiles = Object.keys(editableFsMap ?? {}).length > 1
  const activeCode =
    editableFsMap?.[currentFile] ??
    editableCode ??
    Object.values(editableFsMap ?? {})[0] ??
    ""
  const fsMapOrCode = hasMultipleFiles
    ? editableFsMap || editableCode
    : activeCode || Object.values(editableFsMap ?? {})[0]

  const updateCurrentCode = (nextCode: string) => {
    if (hasMultipleFiles && currentFile) {
      setEditableFsMap((prev) => ({
        ...(prev ?? {}),
        [currentFile]: nextCode,
      }))
      return
    }

    setEditableCode(nextCode)
  }

  const pcbUrl = useMemo(() => {
    const basePcbUrl = createSvgUrl(fsMapOrCode, "pcb")

    if (!showCourtyards) return basePcbUrl

    const separator = basePcbUrl.includes("?") ? "&" : "?"
    return `${basePcbUrl}${separator}show_courtyards=true`
  }, [fsMapOrCode, showCourtyards])
  const schUrl = useMemo(
    () =>
      createSvgUrl(fsMapOrCode, showSimulationGraph ? "schsim" : "schematic", {
        simulationExperimentId: "simulation_experiment_0",
      }),
    [fsMapOrCode, showSimulationGraph],
  )
  const pinoutUrl = useMemo(
    () => createSvgUrl(fsMapOrCode, "pinout"),
    [fsMapOrCode],
  )
  const threeDUrl = useMemo(() => {
    if (browser3dView && typeof fsMapOrCode === "string") {
      return `${createPngUrl(fsMapOrCode, "3d")}&background_color=%23ffffff`
    }

    // If fsMap is provided, use fs_map parameter instead of code
    if (editableFsMap) {
      const fsMapJson = JSON.stringify(editableFsMap)
      // Use browser-compatible base64 encoding
      const encodedFsMap = btoa(
        encodeURIComponent(fsMapJson).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
          String.fromCharCode(Number.parseInt(p1, 16)),
        ),
      )

      // Construct the URL step by step for clarity
      const baseUrl = "https://svg.tscircuit.com/"
      const params: Record<string, string> = {
        svg_type: "3d",
        format: "png",
        png_width: "800",
        png_height: "600",
        show_infinite_grid: "true",
        background_color: "%23ffffff",
        fs_map: encodeURIComponent(encodedFsMap),
        main_component_path: mainComponentPath
          ? encodeURIComponent(mainComponentPath)
          : undefined,
        project_base_url: encodeURIComponent(projectBaseUrl),
      }
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
      return `${baseUrl}?${queryString}`
    }

    const encodedCode = encodeURIComponent(
      getCompressedBase64SnippetString(activeCode),
    )
    return `https://svg.tscircuit.com/?svg_type=3d&format=png&png_width=800&png_height=600&show_infinite_grid=true&background_color=%23ffffff&code=${encodedCode}`
  }, [
    activeCode,
    browser3dView,
    editableFsMap,
    mainComponentPath,
    projectBaseUrl,
  ])

  const shouldSplitCode = _splitView && windowSize !== "mobile"

  const tabContentHeightCss =
    _showTabs && windowSize !== "mobile" ? "h-[calc(100%-46px)]" : "h-full"

  const tabsElm = (
    <div className={tw("flex justify-end px-2")}>
      <div
        className={tw(
          `flex-inline justify-end gap-2 mt-2 mb-2 rounded-lg ${!isDarkTheme ? "bg-slate-100" : "bg-slate-800"} p-1 gap-2`,
        )}
      >
        {!shouldSplitCode && (
          <Tab
            label="Code"
            active={view === "code"}
            onClick={() => setView("code")}
          />
        )}
        {!_hidePCBTab && (
          <Tab
            label="PCB"
            active={view === "pcb"}
            onClick={() => setView("pcb")}
          />
        )}
        {!hideSchematicTab && (
          <Tab
            label="Schematic"
            active={view === "schematic"}
            onClick={() => setView("schematic")}
          />
        )}
        {showPinoutTab && (
          <Tab
            label="Pinout"
            active={view === "pinout"}
            onClick={() => setView("pinout")}
          />
        )}
        {!_hide3DTab && (
          <Tab
            label="3D"
            active={view === "3d"}
            onClick={() => setView("3d")}
          />
        )}
        {showRunFrame && (
          <Tab
            label="Run"
            active={view === "runframe"}
            onClick={() => setView("runframe")}
          />
        )}
      </div>
    </div>
  )

  const fileTabsElm = (
    <div className={tw("flex justify-start px-2")}>
      <div
        className={tw(
          `flex-inline justify-start gap-2 mt-2 mb-2 rounded-lg ${!isDarkTheme ? "bg-white" : "bg-slate-800"} p-1 gap-2`,
        )}
      >
        {Object.keys(editableFsMap ?? {}).map((filename) => (
          <FileTab
            key={filename}
            filename={filename}
            active={currentFile === filename}
            onClick={() => setCurrentFile(filename)}
          />
        ))}
      </div>
    </div>
  )

  const codeEditorElm = (
    <LiveCodeEditor
      key={String(isBrowser)}
      code={activeCode}
      language="tsx"
      theme={prismTheme}
      onChange={updateCurrentCode}
      className={tw("w-full min-w-0 theme-code-block")}
      style={{
        font: "var(--ifm-code-font-size) / var(--ifm-pre-line-height) var(--ifm-font-family-monospace)",
        background: "var(--prism-background-color)",
        color: "var(--prism-color)",
        minHeight: "100%",
      }}
    />
  )

  if (leftView || rightView) {
    const renderView = (
      v: "code" | "pcb" | "schematic" | "3d" | "runframe" | "pinout",
      side: "left" | "right",
    ) => {
      const borderCss = side === "left" ? "border-r" : "border-l"
      if (v === "code") {
        return (
          <div className={tw(`flex flex-col flex-1 basis-1/2 min-w-0`)}>
            {hasMultipleFiles && side === "left" && fileTabsElm}
            <div
              className={tw(
                `flex flex-1 overflow-x-auto overflow-y-auto m-0 p-0 ${borderCss} ${!isDarkTheme ? "border-gray-200" : "border-gray-700"}`,
              )}
            >
              {codeEditorElm}
            </div>
          </div>
        )
      }

      return (
        <div
          className={tw(
            `flex-1 basis-1/2 min-w-0 overflow-hidden m-0 p-0 ${
              v === "pcb"
                ? "bg-black"
                : v === "schematic"
                  ? "bg-[#F5F1ED]"
                  : "bg-white"
            }`,
          )}
        >
          <img
            src={
              v === "pcb"
                ? pcbUrl
                : v === "schematic"
                  ? schUrl
                  : v === "pinout"
                    ? pinoutUrl
                    : threeDUrl
            }
            alt={`${v.toUpperCase()} Circuit Preview`}
            className={tw(
              `w-full ${tabContentHeightCss} m-0 object-contain ${
                v === "pcb"
                  ? "bg-black flex items-center justify-center"
                  : v === "schematic"
                    ? "bg-[#F5F1ED]"
                    : v === "pinout"
                      ? "bg-white"
                      : "bg-white object-cover"
              }`,
            )}
          />
        </div>
      )
    }

    return (
      <div
        className={tw(
          `shadow-lg pt-0 pb-0 pl-0 pr-0 border ${!isDarkTheme ? "border-gray-100" : "border-gray-800"} rounded-lg mb-8 overflow-hidden`,
        )}
      >
        <div className={tw(`h-full overflow-hidden flex m-0 p-0`)}>
          {renderView(leftView || "code", "left")}
          {renderView(rightView || "schematic", "right")}
        </div>
      </div>
    )
  }

  const CodeView = (view === "code" ||
    shouldSplitCode ||
    (!_showTabs && windowSize === "mobile")) && (
    <div className={tw(`flex flex-col flex-1 basis-1/2 min-w-0`)}>
      {hasMultipleFiles && fileTabsElm}
      <div
        className={tw(
          `flex flex-1 overflow-x-auto overflow-y-auto m-0 p-0 border-r ${
            !isDarkTheme ? "border-gray-200" : "border-gray-700"
          }`,
        )}
      >
        {codeEditorElm}
      </div>
    </div>
  )

  const ImageView = (view === "pcb" ||
    view === "schematic" ||
    view === "3d" ||
    view === "runframe" ||
    view === "pinout") && (
    <div
      className={tw(
        `flex-1 basis-1/2 min-w-0 overflow-hidden m-0 p-0 ${
          view === "pcb"
            ? "bg-black"
            : view === "schematic"
              ? "bg-[#F5F1ED]"
              : "bg-white"
        }`,
      )}
    >
      {_showTabs && shouldSplitCode && tabsElm}
      <img
        src={pcbUrl}
        alt="PCB Circuit Preview"
        className={tw(
          `w-full ${tabContentHeightCss} m-0 object-contain bg-black flex items-center justify-center ${
            view !== "pcb" ? "hidden" : ""
          }`,
        )}
      />
      <img
        src={schUrl}
        alt="Schematic Circuit Preview"
        className={tw(
          `w-full ${tabContentHeightCss} m-0 object-contain bg-[#F5F1ED] ${
            view !== "schematic" ? "hidden" : ""
          }`,
        )}
      />
      <img
        src={pinoutUrl}
        alt="Pinout Circuit Preview"
        className={tw(
          `w-full ${tabContentHeightCss} m-0 object-contain bg-white ${
            view !== "pinout" ? "hidden" : ""
          }`,
        )}
      />
      <img
        src={threeDUrl}
        alt="3D Circuit Preview"
        className={tw(
          `w-full ${tabContentHeightCss} m-0 object-cover bg-white ${
            view !== "3d" ? "hidden" : ""
          }`,
        )}
      />
      {showRunFrame && view === "runframe" && (
        <TscircuitIframe fsMap={editableFsMap} entrypoint={entrypoint} />
      )}
    </div>
  )

  return (
    <div
      className={tw(
        `shadow-lg pt-0 pb-0 pl-0 pr-0 border ${
          !isDarkTheme ? "border-gray-100" : "border-gray-800"
        } rounded-lg mb-8 overflow-hidden`,
      )}
    >
      {_showTabs && !shouldSplitCode && tabsElm}
      <div
        className={tw(
          `h-full overflow-hidden flex m-0 p-0 ${
            (!_showTabs && windowSize === "mobile") || verticalStack
              ? "flex-col"
              : ""
          }`,
        )}
      >
        {verticalStack ? (
          <>
            {ImageView}
            {CodeView}
          </>
        ) : (
          <>
            {CodeView}
            {ImageView}
          </>
        )}
      </div>
    </div>
  )
}
