import { createSvgUrl, createPngUrl } from "@tscircuit/create-snippet-url"
import { tw } from "@site/src/tw"
import { useMemo, useState } from "react"
import { useColorMode } from "../hooks/use-color-mode"
import CodeBlock from "@theme/CodeBlock"
import { useWindowSize } from "@docusaurus/theme-common"
import TscircuitIframe from "./TscircuitIframe"

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
        `px-3 py-1 text-sm font-mono rounded-md ${
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
  fsMap = {},
  entrypoint = "index.tsx",
  schematicOnly = false,
  leftView,
  rightView,
}: {
  code?: string
  showTabs?: boolean
  defaultView?: "code" | "pcb" | "schematic"
  splitView?: boolean
  showRunFrame?: boolean
  hideSchematicTab?: boolean
  hidePCBTab?: boolean
  hide3DTab?: boolean
  fsMap?: Record<string, string>
  entrypoint?: string
  schematicOnly?: boolean
  leftView?: "code" | "pcb" | "schematic" | "3d" | "runframe"
  rightView?: "code" | "pcb" | "schematic" | "3d" | "runframe"
}) {
  const { isDarkTheme } = useColorMode()
  const windowSize = useWindowSize()
  const [currentFile, setCurrentFile] = useState<string>(entrypoint)

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
    "pcb" | "schematic" | "code" | "3d" | "runframe"
  >(rightView ?? _defaultView)
  const currentCode = code || fsMap[entrypoint] || ""
  const pcbUrl = useMemo(() => createSvgUrl(currentCode, "pcb"), [currentCode])
  const schUrl = useMemo(
    () => createSvgUrl(currentCode, "schematic"),
    [currentCode],
  )
  const threeDUrl = useMemo(
    () => createPngUrl(currentCode, "3d"),
    [currentCode],
  )

  const shouldSplitCode = _splitView && windowSize !== "mobile"

  const tabContentHeightCss =
    _showTabs && windowSize !== "mobile"
      ? "h-[calc(100%-46px)]"
      : "h-full max-h-[300px]"

  const hasMultipleFiles = Object.keys(fsMap).length > 1

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
        {Object.keys(fsMap).map((filename) => (
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

  if (leftView || rightView) {
    const renderView = (
      v: "code" | "pcb" | "schematic" | "3d" | "runframe",
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
              <CodeBlock
                className={tw(
                  "w-full rounded-none shadow-none p-0 m-0 min-w-0",
                )}
                language="tsx"
              >
                {fsMap[currentFile]?.trim() || code?.trim() || ""}
              </CodeBlock>
            </div>
          </div>
        )
      }

      return (
        <div
          className={tw(
            `flex-1 basis-1/2 min-w-0 min-h-[300px] overflow-hidden m-0 p-0`,
          )}
        >
          <img
            src={v === "pcb" ? pcbUrl : v === "schematic" ? schUrl : threeDUrl}
            alt={`${v.toUpperCase()} Circuit Preview`}
            className={tw(
              `w-full ${tabContentHeightCss} m-0 object-contain ${
                v === "pcb"
                  ? "bg-black flex items-center justify-center"
                  : v === "schematic"
                    ? "bg-[#F5F1ED]"
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

  return (
    <div
      className={tw(
        `shadow-lg pt-0 pb-0 pl-0 pr-0 border ${!isDarkTheme ? "border-gray-100" : "border-gray-800"} rounded-lg mb-8 overflow-hidden`,
      )}
    >
      {_showTabs && !shouldSplitCode && tabsElm}
      <div
        className={tw(
          `h-full overflow-hidden flex m-0 p-0 ${!_showTabs && windowSize === "mobile" ? "flex-col" : ""}`,
        )}
      >
        {(view === "code" ||
          shouldSplitCode ||
          (!_showTabs && windowSize === "mobile")) && (
          <div className={tw(`flex flex-col flex-1 basis-1/2 min-w-0`)}>
            {hasMultipleFiles && fileTabsElm}
            <div
              className={tw(
                `flex flex-1 overflow-x-auto overflow-y-auto m-0 p-0 border-r ${!isDarkTheme ? "border-gray-200" : "border-gray-700"}`,
              )}
            >
              <CodeBlock
                className={tw(
                  "w-full rounded-none shadow-none p-0 m-0 min-w-0",
                )}
                language="tsx"
              >
                {fsMap[currentFile]?.trim() || code?.trim() || ""}
              </CodeBlock>
            </div>
          </div>
        )}
        {(view === "pcb" ||
          view === "schematic" ||
          view === "3d" ||
          view === "runframe") && (
          <div
            className={tw(
              "flex-1 basis-1/2 min-w-0 min-h-[300px] overflow-hidden m-0 p-0",
            )}
          >
            {_showTabs && shouldSplitCode && tabsElm}
            <img
              src={pcbUrl}
              alt="PCB Circuit Preview"
              className={tw(
                `w-full ${tabContentHeightCss} m-0 object-contain bg-black flex items-center justify-center ${view !== "pcb" ? "hidden" : ""}`,
              )}
            />
            <img
              src={schUrl}
              alt="Schematic Circuit Preview"
              className={tw(
                `w-full ${tabContentHeightCss} m-0 object-contain bg-[#F5F1ED] ${view !== "schematic" ? "hidden" : ""}`,
              )}
            />
            <img
              src={threeDUrl}
              alt="3D Circuit Preview"
              className={tw(
                `w-full ${tabContentHeightCss} m-0 object-cover bg-white ${view !== "3d" ? "hidden" : ""}`,
              )}
            />
            {showRunFrame && view === "runframe" && (
              <TscircuitIframe fsMap={fsMap} entrypoint={entrypoint} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
