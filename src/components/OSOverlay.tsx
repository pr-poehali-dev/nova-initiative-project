import { useEffect } from "react"
import { useUIStore } from "@/lib/ui-store"
import { OrbSlot } from "./OrbSlot"
import { MiniAppAbout } from "./MiniAppAbout"
import { MiniAppTest } from "./MiniAppTest"
import { MiniAppExercises } from "./MiniAppExercises"
import { MiniAppGuide } from "./MiniAppGuide"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { X } from "lucide-react"

type AppType = "about" | "test" | "exercises" | "guide"

const APP_COMPONENTS: Record<AppType, React.ComponentType> = {
  about: MiniAppAbout,
  test: MiniAppTest,
  exercises: MiniAppExercises,
  guide: MiniAppGuide,
}

const APP_ICONS: Record<AppType, string> = {
  about: "Info",
  test: "ClipboardList",
  exercises: "Brain",
  guide: "BookOpen",
}

const APP_LABELS: Record<AppType, string> = {
  about: "О проекте",
  test: "Тест",
  exercises: "Упражнения",
  guide: "Родителям",
}

export function OSOverlay() {
  const { osOpen, activeApp, closeOS, setActiveApp } = useUIStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && osOpen) {
        closeOS()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [osOpen, closeOS])

  if (!osOpen) return null

  const ActiveComponent = activeApp ? APP_COMPONENTS[activeApp as AppType] : null

  return (
    <div className="fixed inset-0 z-50 bg-[#FAFAFA] overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b-[3px] border-black bg-white">
        <div className="flex items-center gap-4">
          <OrbSlot size="sm" />
          <h1 className="text-2xl font-black">Синдром Самозванца</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={closeOS}
            className="w-10 h-10 p-0 bg-[#FF2E63] text-white border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all focus:ring-4 focus:ring-[#FF2E63]"
            aria-label="Закрыть"
          >
            <X size={16} />
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        <nav className="w-64 bg-white border-r-[3px] border-black p-4">
          <div className="space-y-2">
            {(Object.keys(APP_COMPONENTS) as AppType[]).map((key) => {
              const isActive = activeApp === key

              return (
                <Button
                  key={key}
                  onClick={() => setActiveApp(key)}
                  className={`w-full justify-start gap-3 h-12 border-[3px] border-black font-bold text-left transition-all focus:ring-4 focus:ring-[#FF2E63] ${
                    isActive
                      ? "bg-[#FF2E63] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  }`}
                >
                  <Icon name={APP_ICONS[key]} size={20} />
                  {APP_LABELS[key]}
                </Button>
              )
            })}
          </div>
        </nav>

        <main className="flex-1 p-8 overflow-auto">
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-4xl font-black mb-4">Добро пожаловать</h2>
                <p className="text-xl text-gray-600 mb-2">Выберите раздел в боковом меню</p>
                <p className="text-gray-400">Тест · Упражнения · Руководство для родителей</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
