import { Trophy, Target, Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { useUserProgress, useQuizzes } from "@/hooks/use-quizzes";
import useAuth from "@/stores/auth";
import { levelMapping } from "@/utils/quiz-calculate";

export default function QuizProgress() {
  // variables
  const { me } = useAuth();
  const { data: quizzes, isLoading: isLoadingQuiz } = useQuizzes();
  const { data: progress, isLoading } = useUserProgress(me?.uid);
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
    <div className="space-y-6 lg:mt-9">
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Progress Belajar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span>Kuis Diselesaikan</span>
                <span>
                  {isLoading
                    ? "..."
                    : (progress?.completed_quizzes?.length ?? 0)}{" "}
                  / {isLoadingQuiz ? "..." : (quizzes?.length ?? 0)}
                </span>
              </div>
              {isLoading ? (
                <Skeleton className="h-2" />
              ) : (
                <Progress
                  value={
                    ((progress?.completed_quizzes?.length ?? 0) /
                      (quizzes?.length ?? 0)) *
                    100
                  }
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Level</span>
                </div>
                <span className="font-semibold">
                  {progress?.current_level ?? "-"}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <p>
                  Menuju Level{" "}
                  <span className="font-semibold text-primary">
                    {nextLevelInfo.nextLevel}
                  </span>
                </p>
                <span>
                  {progress?.total_points ?? 0} / {nextLevelInfo.nextThreshold}
                </span>
              </div>
              <Progress
                value={nextLevelInfo.progress}
                className="bg-blue-100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Pencapaian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-2" />
            ) : (
              progress?.achievements?.length === 0 && (
                <div className="text-center text-xs md:text-sm">
                  Belum ada pencapaian
                </div>
              )
            )}
            {progress?.achievements?.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center text-xs md:text-sm space-x-3"
              >
                <Award className="h-5 w-5 text-yellow-500" />
                <span>{achievement?.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
