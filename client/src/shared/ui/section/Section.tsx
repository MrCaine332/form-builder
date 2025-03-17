import React from "react"
import { cn } from "@/shared/utils/cn"

const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-background rounded-2xl shadow-dark",
      className
    )}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }
