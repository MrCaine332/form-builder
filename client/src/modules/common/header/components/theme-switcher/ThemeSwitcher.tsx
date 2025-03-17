import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react"
import { useUnit } from "effector-react"
import { $theme, setTheme, setThemeSystem } from "@/shared/store/theme"

export const ThemeSwitcher = () => {
  const theme = useUnit($theme)

  return (
    <Tabs defaultValue={theme ?? "system"}>
      <TabsList>
        <TabsTrigger value={"light"} onClick={() => setTheme("light")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger value={"dark"} onClick={() => setTheme("dark")}>
          <MoonStarIcon className="h-[1.2rem] w-[1.2rem] -rotate-90" />
        </TabsTrigger>
        <TabsTrigger value={"system"} onClick={() => setThemeSystem()}>
          <MonitorIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
