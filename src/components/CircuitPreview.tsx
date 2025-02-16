import { createSvgUrl, createPngUrl } from "@tscircuit/create-snippet-url"
import { tw } from "@site/src/tw"
import { useMemo, useState } from "react"
import { useColorMode } from "../hooks/use-color-mode"
import CodeBlock from "@theme/CodeBlock"
import { useWindowSize } from "@docusaurus/theme-common"

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

export default function CircuitPreview({
  code,
  showTabs = true,
  defaultView = "pcb",
  splitView = true,
}: {
  code: string
  showTabs?: boolean
  defaultView?: "code" | "pcb" | "schematic"
  splitView?: boolean
}) {
  const { isDarkTheme } = useColorMode()
  const windowSize = useWindowSize()

  const [view, setView] = useState<"pcb" | "schematic" | "code" | "3d">(
    defaultView,
  )
  const pcbUrl = useMemo(() => createSvgUrl(code, "pcb"), [code])
  const schUrl = useMemo(() => createSvgUrl(code, "schematic"), [code])
  const threeDUrl = useMemo(() => createPngUrl(code, "3d"), [code])

  const shouldSplitCode = splitView && windowSize !== "mobile"

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
        <Tab
          label="PCB"
          active={view === "pcb"}
          onClick={() => setView("pcb")}
        />
        <Tab
          label="Schematic"
          active={view === "schematic"}
          onClick={() => setView("schematic")}
        />
        <Tab label="3D" active={view === "3d"} onClick={() => setView("3d")} />
      </div>
    </div>
  )

  return (
    <div
      className={tw(
        `shadow-lg pt-0 pb-0 pl-0 pr-0 border ${!isDarkTheme ? "border-gray-100" : "border-gray-800"} rounded-lg mb-8 overflow-hidden`,
      )}
    >
      {showTabs && !shouldSplitCode && tabsElm}
      <div className={tw("h-full overflow-hidden flex m-0 p-0")}>
        {(view === "code" || shouldSplitCode) && (
          <div
            className={tw(
              `flex flex-1 overflow-x-auto overflow-y-auto m-0 p-0 border-r ${!isDarkTheme ? "border-gray-200" : "border-gray-700"}`,
            )}
          >
            <CodeBlock
              className={tw("w-full rounded-none shadow-none p-0 m-0")}
              language="tsx"
            >
              {code.trim()}
            </CodeBlock>
          </div>
        )}
        {(view === "pcb" || view === "schematic" || view === "3d") && (
          <div className={tw("flex-1 min-h-[300px] flex-shrink-0 overflow-hidden m-0 p-0")}>
            {showTabs && shouldSplitCode && tabsElm}
            <img
              src={pcbUrl}
              alt="PCB Circuit Preview"
              className={tw(
                `w-full h-[calc(100%-46px)] m-0 object-contain bg-black flex items-center justify-center ${view !== "pcb" ? "hidden" : ""}`,
              )}
            />
            <img
              src={schUrl}
              alt="Schematic Circuit Preview"
              className={tw(
                `w-full h-[calc(100%-46px)] m-0 object-contain bg-[#F5F1ED] ${view !== "schematic" ? "hidden" : ""}`,
              )}
            />
            <img
              src={threeDUrl}
              alt="3D Circuit Preview"
              className={tw(
                `w-full h-[calc(100%-46px)] m-0 object-cover bg-white ${view !== "3d" ? "hidden" : ""}`,
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
