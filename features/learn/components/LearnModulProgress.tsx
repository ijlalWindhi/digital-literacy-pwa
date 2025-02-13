import React from "react";
import { Trophy, Clock, CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function LearnModulProgress({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  const progress = {
    timeSpent: "25 menit",
    completedChapters: 2,
    totalChapters: 5,
    earnedPoints: 40,
    totalPoints: 100,
    nextMilestone: "Selesaikan video pembelajaran berikutnya",
    recentActivities: [
      {
        action: "Menyelesaikan",
        item: "Apa itu Cloud Computing?",
        time: "10 menit yang lalu",
      },
      {
        action: "Menyelesaikan",
        item: "Jenis-jenis Layanan Cloud",
        time: "15 menit yang lalu",
      },
    ],
  };

  return (
    <div className="space-y-6 lg:mt-[3.5rem]">
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Progress Modul</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex text-sm items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Waktu Belajar</span>
                </div>
                <span className="font-semibold">{progress.timeSpent}</span>
              </div>

              <div className="flex text-sm items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Bab Selesai</span>
                </div>
                <span className="font-semibold">
                  {progress.completedChapters}/{progress.totalChapters}
                </span>
              </div>

              <div className="flex text-sm items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Poin Diperoleh</span>
                </div>
                <span className="font-semibold">
                  {progress.earnedPoints}/{progress.totalPoints}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress Poin</span>
                <span>
                  {progress.earnedPoints}/{progress.totalPoints}
                </span>
              </div>
              <Progress
                value={(progress.earnedPoints / progress.totalPoints) * 100}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Milestone Berikutnya
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {progress.nextMilestone}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Aktivitas Terakhir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progress.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">
                    {activity.action}{" "}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
