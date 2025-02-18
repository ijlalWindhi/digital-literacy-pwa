"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Trophy, Home, RotateCcw } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useQuizAttempts } from "@/hooks/use-quizzes";

export default function QuizResult({ quizId }: { quizId: string }) {
  // variables
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attempt");
  const { data: attempt, isLoading } = useQuizAttempts(attemptId as string);

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
                  {attempt?.score}%
                </div>
                <p className="text-xs md:text-sm lg:text-base text-muted-foreground">
                  {attempt?.total_correct} dari {attempt?.total_questions}{" "}
                  jawaban benar
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="md:text-lg font-semibold">
                    {attempt?.time_spend}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Waktu Pengerjaan
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg text-center">
                  <div className="md:text-lg font-semibold">
                    {attempt?.score}
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
