import { Trophy, Star, Target } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CardPattern from "@/components/common/card-pattern";

import { cn } from "@/utils/utils";

interface AchievementCardProps {
  title: string;
  description: string;
  type: "daily" | "milestone" | "special";
  progress?: number;
  isCompleted?: boolean;
}

export default function AchievementCard({
  title,
  description,
  type,
  progress = 0,
  isCompleted = false,
}: Readonly<AchievementCardProps>) {
  const icons = {
    daily: Star,
    milestone: Target,
    special: Trophy,
  };

  const Icon = icons[type];

  const colors = {
    daily: "from-blue-500 to-blue-700",
    milestone: "from-purple-500 to-purple-700",
    special: "from-yellow-500 to-amber-700",
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <CardPattern className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10" />
      <CardContent className="relative p-6">
        <div className="flex md:flex-col lg:flex-row text-left md:text-center lg:text-left items-center gap-4">
          <div
            className={cn(
              "flex items-center min-h-12 min-w-12 justify-center rounded-lg bg-gradient-to-br",
              colors[type],
            )}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm md:text-base font-semibold w-fit md:w-full lg:w-fit">
                {title}
              </h3>
              {isCompleted && (
                <Badge
                  variant="secondary"
                  className="bg-green-500/10 text-green-500"
                >
                  Selesai
                </Badge>
              )}
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              {description}
            </p>
            {!isCompleted && progress > 0 && (
              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r transition-all",
                      colors[type],
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Progress: {progress}%
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
