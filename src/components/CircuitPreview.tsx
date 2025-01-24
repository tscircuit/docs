import { createSvgUrl } from "@tscircuit/create-snippet-url"
import { tw } from "@site/src/tw"
import { useMemo, useState } from "react"
import { useColorMode } from "../hooks/use-color-mode"
import CodeBlock from "@theme/CodeBlock"

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
}: {
  code: string
  showTabs?: boolean
  defaultView?: "code" | "pcb" | "schematic"
}) {
  const { isDarkTheme } = useColorMode()
  const [view, setView] = useState<"pcb" | "schematic" | "code">(defaultView)
  const pcbUrl = useMemo(() => createSvgUrl(code, "pcb"), [code])
  const schUrl = useMemo(() => createSvgUrl(code, "schematic"), [code])

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
            <Tab
              label="Code"
              active={view === "code"}
              onClick={() => setView("code")}
            />
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
      <div className={tw("h-100 overflow-y-auto")}>
        {view === "code" && <CodeBlock language="tsx">{code}</CodeBlock>}
        <img
          src={pcbUrl}
          alt="PCB Circuit Preview"
          className={tw(
            `w-full rounded object-contain bg-black h-96 ${view !== "pcb" ? "hidden" : ""}`,
          )}
        />
        <img
          src={schUrl}
          alt="Schematic Circuit Preview"
          className={tw(
            `w-full rounded object-contain bg-[#F5F1ED] h-96 ${view !== "schematic" ? "hidden" : ""}`,
          )}
        />
      </div>
    </div>
  )
}
