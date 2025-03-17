import React from "react"
import { cn } from "@/shared/utils/cn"

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container relative z-[1] px-2", className)}
    {...props}
  />
))
Container.displayName = "Container"

export { Container }
