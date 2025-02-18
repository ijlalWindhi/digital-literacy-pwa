import Link from "next/link";
import { Clock, HelpCircle, Trophy, AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuiz } from "@/hooks/use-quizzes";

interface QuizDetailProps {
  quizId: string;
}

export default function QuizDetailInformation({
  quizId,
}: Readonly<QuizDetailProps>) {
  // variables
  const { data: quiz, isLoading } = useQuiz(quizId);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            {isLoading ? (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Skeleton className="w-28 h-6 mb-2" />
                  <Skeleton className="w-20 h-6 mb-2" />
                  <Skeleton className="w-20 h-6 mb-2" />
                  <Skeleton className="w-20 h-6 mb-2" />
                </div>
                <Skeleton className="w-1/2 h-6 mb-2" />
                <Skeleton className="w-3/4 h-6 mb-2" />
              </>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge>{quiz?.category.name}</Badge>
                  <Badge variant="outline">
                    <Clock className="h-4 w-4 mr-1" />
                    {quiz?.duration}
                  </Badge>
                  <Badge variant="outline">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    {quiz?.total_questions} Pertanyaan
                  </Badge>
                  <Badge variant="outline">
                    <Trophy className="h-4 w-4 mr-1" />
                    {quiz?.total_points} Poin
                  </Badge>
                </div>
                <CardTitle className="text-base md:text-lg">
                  {quiz?.title}
                </CardTitle>
                <CardDescription>{quiz?.description}</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="w-1/2 h-6" />
                  <Skeleton className="w-3/4 h-8" />
                  <Skeleton className="w-3/4 h-8" />
                </div>
              ) : (
                <div>
                  <h3 className="text-sm md:text-base font-semibold mb-2">
                    Topik yang Dibahas:
                  </h3>
                  <p></p>
                  <ul className="list-disc list-inside space-y-1">
                    {quiz?.topics.map((topic, index) => (
                      <li
                        key={index}
                        className="text-xs md:text-sm text-muted-foreground"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Alert>
          <AlertCircle className="h-4 w-4 mt-0.5" />
          <AlertTitle>Sebelum Memulai</AlertTitle>
          <AlertDescription>
            Pastikan Anda memiliki koneksi internet yang stabil dan waktu yang
            cukup untuk menyelesaikan kuis. Anda tidak dapat menjeda kuis
            setelah dimulai.
          </AlertDescription>
        </Alert>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Persyaratan</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {isLoading && (
                <li>
                  <Skeleton className="w-full h-6" />
                </li>
              )}
              {quiz?.prerequisites?.length === 0 && !isLoading && (
                <li className="text-xs md:text-sm text-muted-foreground">
                  Tidak ada persyaratan untuk kuis ini.
                </li>
              )}
              {quiz?.prerequisites?.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  • <span className="text-xs md:text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Link href={`/quiz/${quizId}/take`}>
          <Button className="w-full mt-6" size="lg" loading={isLoading}>
            Mulai Kuis
          </Button>
        </Link>
      </div>
    </div>
  );
}
