import Link from "next/link";
import { Trophy, Home, RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuizResult({ quizId }: { quizId: string }) {
  // In a real app, fetch results from API or state management
  const results = {
    score: 80,
    totalQuestions: 3,
    correctAnswers: 2,
    timeSpent: "15:30",
    earnedPoints: 80,
  };

  return (
    <div className="container m-auto py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-base md:text-lg">
              Hasil Kuis Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">
                  {results.score}%
                </div>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                  {results.correctAnswers} dari {results.totalQuestions} jawaban
                  benar
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="md:text-lg font-semibold">
                    {results.timeSpent}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Waktu Pengerjaan
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="md:text-lg font-semibold">
                    {results.earnedPoints}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Poin Diperoleh
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-2 pt-4">
                <Link href="/quiz">
                  <Button variant="outline" className="flex-1 w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Kembali ke Daftar Kuis
                  </Button>
                </Link>
                <Link href={`/quiz/1/take`}>
                  <Button className="flex-1 w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Coba Lagi
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
