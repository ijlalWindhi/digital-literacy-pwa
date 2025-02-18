import Link from "next/link";
import { Clock, Trophy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useRecentQuizzes } from "@/hooks/use-quizzes";

export default function RecentQuizzes() {
  // variables
  const { data: quizzes, isLoading } = useRecentQuizzes();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Kuis Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading && (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, idx) => (
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
          {quizzes?.map((quiz) => (
            <div
              key={quiz.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold">{quiz.title}</h3>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                    <Badge variant="secondary">{quiz.category.name}</Badge>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {quiz.duration}
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                      {quiz.total_points} poin
                    </div>
                  </div>
                </div>
                <Link href={`/quiz/${quiz.id}`}>
                  <Button className="text-xs md:text-sm">Detail Kuis</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
