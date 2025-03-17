import React, {useLayoutEffect} from "react"
import {useUnit} from "effector-react";
import {$theme} from "@/shared/store/theme";

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const theme = useUnit($theme)

  useLayoutEffect(() => {
    let mode = theme
    if (theme === "system") {
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    document.documentElement.className = mode
  }, [theme]);

  return children
}
