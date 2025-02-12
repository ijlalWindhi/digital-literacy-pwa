import { Trophy, Target, Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizProgress() {
  const progress = {
    totalQuizzes: 45,
    completedQuizzes: 12,
    totalPoints: 1250,
    level: 5,
    nextLevelPoints: 1500,
    achievements: [
      "Pemula Bersemangat",
      "Penjelajah Digital",
      "Mahir Keamanan",
    ],
  };

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
                  {progress.completedQuizzes}/{progress.totalQuizzes}
                </span>
              </div>
              <Progress
                value={
                  (progress.completedQuizzes / progress.totalQuizzes) * 100
                }
              />
            </div>

            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Total Poin</span>
                </div>
                <span className="font-semibold">{progress.totalPoints}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Level</span>
                </div>
                <span className="font-semibold">{progress.level}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span>Menuju Level {progress.level + 1}</span>
                <span>
                  {progress.totalPoints}/{progress.nextLevelPoints}
                </span>
              </div>
              <Progress
                value={(progress.totalPoints / progress.nextLevelPoints) * 100}
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
            {progress.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center text-xs md:text-sm space-x-3"
              >
                <Award className="h-5 w-5 text-yellow-500" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
