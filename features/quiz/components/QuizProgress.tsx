import { useEffect } from "react";
import { Trophy, Target, Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { useUserProgress, useQuizzes } from "@/hooks/use-quizzes";
import useAuth from "@/stores/auth";

export default function QuizProgress() {
  // variables
  const { me } = useAuth();
  const { data: quizzes, isLoading: isLoadingQuiz } = useQuizzes();
  const { data: progress, isLoading } = useUserProgress(me?.uid);

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
                  {progress?.current_level ?? 0}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span>
                  Menuju Level {Number(progress?.current_level ?? 0) + 1}
                </span>
                <span>{progress?.total_points ?? 0} / 100</span>
              </div>
              <Progress
                value={((progress?.total_points ?? 0) / 100) * 100}
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
