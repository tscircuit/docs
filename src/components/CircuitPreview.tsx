import { createSvgUrl } from "@tscircuit/create-snippet-url"
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
  splitView = false,
}: {
  code: string
  showTabs?: boolean
  defaultView?: "code" | "pcb" | "schematic"
  splitView?: boolean
}) {
  const { isDarkTheme } = useColorMode()
  const windowSize = useWindowSize()

  const [view, setView] = useState<"pcb" | "schematic" | "code">(defaultView)
  const pcbUrl = useMemo(() => createSvgUrl(code, "pcb"), [code])
  const schUrl = useMemo(() => createSvgUrl(code, "schematic"), [code])

  const shouldSplitCode = splitView // && windowSize !== "mobile"

  return (
    <div
      className={tw(
        `shadow-lg p-2 pb-1 border ${!isDarkTheme ? "border-gray-100" : "border-gray-800"} rounded-lg mb-8`,
      )}
    >
      {showTabs && (
        <div className={tw("flex justify-end")}>
          <div
            className={tw(
              `flex-inline justify-end gap-2 mb-2 rounded-lg ${!isDarkTheme ? "bg-slate-100" : "bg-slate-800"} p-1 gap-2`,
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
          </div>
        </div>
      )}
      <div className={tw("max-h-100 overflow-y-auto flex m-0 p-0")}>
        {(view === "code" || shouldSplitCode) && (
          <div className={tw("flex-1 m-0 p-0")}>
            <CodeBlock language="tsx">{code.trim()}</CodeBlock>
          </div>
        )}
        {(view === "pcb" || view === "schematic") && (
          <div className={tw("flex-1 m-0 p-0")}>
            <img
              src={pcbUrl}
              alt="PCB Circuit Preview"
              className={tw(
                `w-full h-[calc(100%-10px)] m-0 rounded object-contain bg-black ${view !== "pcb" ? "hidden" : ""}`,
              )}
            />
            <img
              src={schUrl}
              alt="Schematic Circuit Preview"
              className={tw(
                `w-full h-[calc(100%-10px)] m-0 rounded object-contain bg-[#F5F1ED] ${view !== "schematic" ? "hidden" : ""}`,
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
