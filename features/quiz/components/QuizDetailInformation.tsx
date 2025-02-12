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

interface QuizDetailProps {
  quizId: string;
}

export default function QuizDetailInformation({ quizId }: QuizDetailProps) {
  // In a real app, fetch quiz data based on quizId
  const quiz = {
    title: "Dasar-Dasar Keamanan Online",
    description:
      "Pelajari dan uji pengetahuan Anda tentang prinsip-prinsip dasar keamanan online",
    category: "Keamanan Internet",
    duration: "20 menit",
    questions: 15,
    points: 100,
    requirements: [
      "Telah menyelesaikan modul Pengenalan Keamanan Internet",
      "Memahami konsep dasar penggunaan internet",
    ],
    topics: [
      "Password dan Autentikasi",
      "Ancaman Online",
      "Praktik Keamanan Terbaik",
      "Privasi Data",
    ],
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge>{quiz.category}</Badge>
              <Badge variant="outline">
                <Clock className="h-4 w-4 mr-1" />
                {quiz.duration}
              </Badge>
              <Badge variant="outline">
                <HelpCircle className="h-4 w-4 mr-1" />
                {quiz.questions} Pertanyaan
              </Badge>
              <Badge variant="outline">
                <Trophy className="h-4 w-4 mr-1" />
                {quiz.points} Poin
              </Badge>
            </div>
            <CardTitle className="text-base md:text-lg">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm md:text-base font-semibold mb-2">
                  Topik yang Dibahas:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {quiz.topics.map((topic, index) => (
                    <li
                      key={index}
                      className="text-xs md:text-sm text-muted-foreground"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
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
              {quiz.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  • <span className="text-xs md:text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Link href={`/quiz/${quizId}/take`}>
          <Button className="w-full mt-6" size="lg">
            Mulai Kuis
          </Button>
        </Link>
      </div>
    </div>
  );
}
