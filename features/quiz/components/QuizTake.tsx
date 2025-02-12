"use client";

import { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import QuizProgressBar from "./QuizProgressBar";
import QuizNavigation from "./QuizNavigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample quiz data - in a real app, this would come from an API
const quizData = {
  id: "1",
  title: "Dasar-Dasar Keamanan Online",
  duration: 1200, // 20 minutes in seconds
  questions: [
    {
      id: 1,
      question: "Apa yang dimaksud dengan Two-Factor Authentication (2FA)?",
      options: [
        "Menggunakan dua password yang berbeda",
        "Proses verifikasi menggunakan dua langkah yang berbeda",
        "Membuat backup password",
        "Menggunakan dua email yang berbeda",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question:
        "Manakah dari berikut yang merupakan praktik password yang aman?",
      options: [
        "Menggunakan tanggal lahir sebagai password",
        "Menggunakan password yang sama untuk semua akun",
        "Menggunakan kombinasi huruf, angka, dan simbol",
        "Menyimpan password dalam file teks biasa",
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Apa yang harus dilakukan ketika menggunakan WiFi publik?",
      options: [
        "Mengabaikan pengaturan keamanan",
        "Menggunakan VPN untuk enkripsi data",
        "Membagikan informasi pribadi",
        "Mengaktifkan file sharing",
      ],
      correctAnswer: 1,
    },
    // Add more questions as needed
  ],
};

export default function QuizTake({ quizId }: Readonly<{ quizId: string }>) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(quizData.questions.length).fill(-1),
  );
  const [timeRemaining, setTimeRemaining] = useState(quizData.duration);
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitting) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isSubmitting]);

  const handleTimeUp = () => {
    setShowTimeoutDialog(true);
    setIsSubmitting(true);
    // In a real app, you would submit the answers here
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleNavigate = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // In a real app, you would submit the answers here
    router.push(`/quiz/${quizData.id}/result`);
  };

  const isLastQuestion = currentQuestion === quizData.questions.length - 1;
  const hasAnsweredCurrent = answers[currentQuestion] !== -1;
  const allQuestionsAnswered = answers.every((answer) => answer !== -1);
  const answeredQuestions = answers.reduce((acc, answer, index) => {
    if (answer !== -1) acc.push(index);
    return acc;
  }, [] as number[]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="md:text-xl font-semibold leading-none tracking-tight">
            {quizData.title}
          </h1>
          <QuizTimer timeRemaining={timeRemaining} />
        </div>

        <QuizProgressBar
          currentQuestion={currentQuestion + 1}
          totalQuestions={quizData.questions.length}
          answeredQuestions={answeredQuestions.length}
        />

        <QuizNavigation
          totalQuestions={quizData.questions.length}
          answeredQuestions={answeredQuestions}
          currentQuestion={currentQuestion}
          onNavigate={handleNavigate}
        />

        <QuizQuestion
          question={quizData.questions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onSelectAnswer={(answerIndex) =>
            handleAnswerSelect(currentQuestion, answerIndex)
          }
        />

        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Sebelumnya
          </Button>

          <div className="flex gap-2">
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered || isSubmitting}
              >
                Selesai
              </Button>
            ) : (
              <Button onClick={handleNext}>Selanjutnya</Button>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showTimeoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Waktu Habis!</AlertDialogTitle>
            <AlertDialogDescription>
              Waktu pengerjaan kuis telah habis. Jawaban Anda akan dikumpulkan
              secara otomatis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => router.push(`/quiz/${quizData.id}/result`)}
            >
              Lihat Hasil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
