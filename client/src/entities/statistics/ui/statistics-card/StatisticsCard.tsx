import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { cn } from "@/shared/utils/cn"

type StatisticsCardProps = {
  title: string
  description: string
  value: string | number | null
  icon: React.ReactNode
  isLoading?: boolean
  textColor?: string
  className?: string
}

export const StatisticsCard = ({
  title,
  description,
  value,
  icon,
  isLoading,
  textColor,
  className,
}: StatisticsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className={cn("text-lg text-muted-foreground", textColor)}>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <Skeleton>
              <span>0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  )
}
