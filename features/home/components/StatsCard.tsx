import type React from "react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/utils/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: Readonly<StatsCardProps>) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-10 md:h-12 w-10 md:w-12 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                {value}
              </h2>
              {trend && (
                <span
                  className={cn(
                    "flex items-center text-sm",
                    trend.isPositive ? "text-green-500" : "text-red-500",
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
