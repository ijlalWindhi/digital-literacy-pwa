import Link from "next/link";
import { Clock, Trophy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const recentQuizzes = [
  {
    id: "1",
    title: "Dasar-Dasar Keamanan Online",
    category: "Keamanan Internet",
    duration: "20 menit",
    questions: 15,
    points: 100,
    progress: 0,
  },
  {
    id: "2",
    title: "HTML & CSS Fundamental",
    category: "Pengembangan Web",
    duration: "30 menit",
    questions: 20,
    points: 150,
    progress: 60,
  },
  {
    id: "3",
    title: "Pengenalan Cloud Computing",
    category: "Konsep Dasar",
    duration: "25 menit",
    questions: 18,
    points: 120,
    progress: 100,
  },
];

export default function RecentQuizzes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Kuis Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{quiz.title}</h3>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                    <Badge variant="secondary">{quiz.category}</Badge>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {quiz.duration}
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                      {quiz.points} poin
                    </div>
                  </div>
                </div>
                <Link href={`/quiz/${quiz.id}`}>
                  <Button className="text-xs md:text-sm">
                    {quiz.progress === 0
                      ? "Mulai Kuis"
                      : quiz.progress === 100
                        ? "Lihat Hasil"
                        : "Lanjutkan"}
                  </Button>
                </Link>
              </div>
              {quiz.progress > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs md:text-sm mb-1">
                    <span>Progress</span>
                    <span>{quiz.progress}%</span>
                  </div>
                  <Progress value={quiz.progress} />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
