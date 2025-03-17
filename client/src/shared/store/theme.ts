import { createEvent, createStore } from "effector"

type Theme = "dark" | "light" | "system"

/** Stores */
/** =================================== */
let theme = localStorage?.getItem("theme") as Theme
if (!["dark", "light", "system"].includes(theme)) {
  localStorage.setItem("theme", "system")
  theme = "system"
}

export const $theme = createStore<Theme>(theme ?? "system")

/** Events */
/** =================================== */
export const setTheme = createEvent<Theme>()
export const setThemeSystem = createEvent()

/** Effects */
/** =================================== */

/** Subscriptions */
/** =================================== */
$theme.on(setTheme, (state, data) => {
  localStorage.setItem("theme", data)
  return data
})

$theme.on(setThemeSystem, (state, data) => {
  localStorage.removeItem("theme")
  return "system"
})
