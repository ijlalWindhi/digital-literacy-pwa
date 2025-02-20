import React from "react";
import { Award, Target, Trophy } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { useUserProgress } from "@/hooks/use-users";
import { useLearns } from "@/hooks/use-learn";
import useAuth from "@/stores/auth";
import { levelMapping } from "@/utils/quiz-calculate";

export default function LearnHeader() {
  // variables
  const { me } = useAuth();
  const { data: progress, isLoading: isLoadingUser } = useUserProgress(me?.uid);
  const { data: course, isLoading } = useLearns();
  const nextLevelInfo = getNextLevelProgress(progress?.total_points ?? 0);

  // functions
  function getNextLevelProgress(currentPoints: number) {
    const levels = Object.entries(levelMapping);

    // Find current level index
    const currentLevelIndex = levels.findIndex(
      ([_, threshold]) => currentPoints < threshold,
    );

    // If at max level
    if (currentLevelIndex === -1) {
      return {
        nextLevel: levels[levels.length - 1][0],
        nextThreshold: levels[levels.length - 1][1],
        progress: 100,
      };
    }

    // Get current and next level info
    const prevThreshold =
      currentLevelIndex > 0 ? levels[currentLevelIndex - 1][1] : 0;
    const nextLevel = levels[currentLevelIndex][0];
    const nextThreshold = levels[currentLevelIndex][1];

    // Calculate progress percentage
    const progressPoints = currentPoints - prevThreshold;
    const totalNeeded = nextThreshold - prevThreshold;
    const progress = (progressPoints / totalNeeded) * 100;

    return {
      nextLevel,
      nextThreshold,
      progress,
    };
  }

  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
      <div className="absolute right-0 top-0 h-64 w-64 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4F46E5"
            d="M45.7,-70.5C58.9,-62.5,69.3,-48.4,75.9,-32.5C82.5,-16.7,85.4,1,82.4,17.2C79.4,33.4,70.6,48.2,57.9,56.9C45.2,65.6,28.7,68.2,12.5,69.7C-3.7,71.2,-19.6,71.5,-33.7,66.2C-47.8,60.9,-60.1,50,-68.3,36.2C-76.5,22.4,-80.7,5.7,-78.7,-10C-76.7,-25.8,-68.5,-40.6,-56.6,-49.4C-44.7,-58.2,-29,-61,-14.3,-64.5C0.4,-68,15.1,-72.2,31.5,-73.8C47.8,-75.4,65.9,-74.4,45.7,-70.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex-1">
          <div className="mb-3 md:mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            <h2 className="text-sm md:text-lg font-semibold leading-none tracking-tight">
              Progress Belajar
            </h2>
          </div>
          <div className="mb-4 grid gap-2 md:gap-4">
            <div>
              <div className="mb-2 flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Modul Selesai</span>
                <span className="font-medium">
                  {isLoadingUser
                    ? "..."
                    : (progress?.courses_progress?.length ?? 0)}{" "}
                  / {isLoading ? "..." : course?.length}
                </span>
              </div>
              {isLoading ? (
                <Skeleton className="h-2" />
              ) : (
                <Progress
                  value={
                    ((progress?.courses_progress?.length ?? 0) /
                      (course?.length ?? 0)) *
                    100
                  }
                  className="h-2"
                />
              )}
            </div>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Total Poin</span>
                </div>
                <span className="font-semibold">
                  {progress?.total_points ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-3 md:mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-500" />
            <h2 className="text-sm md:text-lg font-semibold leading-none tracking-tight">
              Level {progress?.current_level ?? "-"}
            </h2>
          </div>
          <div className="rounded-lg bg-indigo-50 p-2 md:p-4 text-xs md:text-sm">
            <div className="mb-2 text-gray-600">
              Menuju Level{" "}
              <span className="font-semibold text-primary">
                {nextLevelInfo.nextLevel}
              </span>
            </div>
            <Progress value={nextLevelInfo.progress} className="h-2" />
            <div className="mt-2 text-right font-medium text-blue-500">
              {progress?.total_points ?? 0} / {nextLevelInfo.nextThreshold}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
