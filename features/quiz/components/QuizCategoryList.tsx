"use client";
import Link from "next/link";
import { Clock, Trophy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { useForums } from "@/hooks/use-forum";
import { TForumCategory } from "@/types";

interface QuizCategoryListProps {
  readonly categoryId: string;
}

const recentQuizzes = [
  {
    id: "1",
    title: "Dasar-Dasar Keamanan Online",
    category: "Keamanan Internet",
    duration: "20 menit",
    questions: 15,
    points: 100,
    status: "completed",
  },
  {
    id: "2",
    title: "HTML & CSS Fundamental",
    category: "Pengembangan Web",
    duration: "30 menit",
    questions: 20,
    points: 150,
    status: "not-started",
  },
  {
    id: "3",
    title: "Pengenalan Cloud Computing",
    category: "Konsep Dasar",
    duration: "25 menit",
    questions: 18,
    points: 120,
    status: "not-started",
  },
];

export default function QuizCategoryList({
  categoryId,
}: QuizCategoryListProps) {
  // variables
  const { data: threads, isLoading } = useForums(categoryId as TForumCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kuis dalam Kategori Ini</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading && (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Skeleton className="rounded-lg w-16 h-16" />
                  <div className="flex flex-col w-full gap-1">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {threads?.length === 0 && !isLoading && (
            <div className="text-sm md:text-base text-center text-muted-foreground">
              Belum ada kuis
            </div>
          )}
          {recentQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{quiz.title}</h3>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
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
                    {quiz.status === "not-started"
                      ? "Mulai Kuis"
                      : "Lihat Hasil"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
