"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import QuizProgressBar from "./QuizProgressBar";
import QuizNavigation from "./QuizNavigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuiz, useQuizQuestions, useSubmitQuiz } from "@/hooks/use-quizzes";
import useAuth from "@/stores/auth";
import { TQuestion } from "@/types";

export default function QuizTake({ quizId }: Readonly<{ quizId: string }>) {
  // variables
  const { data: quizData, isLoading } = useQuiz(quizId);
  const { data: questionsData, isLoading: questionsLoading } =
    useQuizQuestions(quizId);
  const submitQuizzes = useSubmitQuiz();
  const { me } = useAuth();
  const questionsTotal = questionsData?.length ?? 0;
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questionsTotal).fill(-1),
  );
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showTimeoutDialog, setShowTimeoutDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLastQuestion = currentQuestion === questionsTotal - 1;
  const allQuestionsAnswered = answers.every((answer) => answer !== -1);
  const answeredQuestions = answers.reduce((acc, answer, index) => {
    if (answer !== -1) acc.push(index);
    return acc;
  }, [] as number[]);

  // functions
  const submitQuiz = async () => {
    if (!quizData || !questionsData) return;

    try {
      const result = await submitQuizzes.mutateAsync({
        userId: me?.uid,
        quizId: quizData.id,
        answers,
        questions: questionsData,
        startTime: new Date(
          Date.now() - (quizData.duration * 60 - timeRemaining) * 1000,
        ).toISOString(),
        quizData,
      });

      router.push(`/quiz/${quizData.id}/result?attempt=${result.attemptId}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleTimeUp = () => {
    setShowTimeoutDialog(true);
    setIsSubmitting(true);
    submitQuiz();
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
    if (currentQuestion < (questionsTotal || 0) - 1) {
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
    submitQuiz();
    router.push(`/quiz/${quizData?.id}/result`);
  };

  // lifecycle
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

  useEffect(() => {
    if (quizData?.duration) {
      setTimeRemaining(quizData.duration * 60);
    }
  }, [quizData]);

  if (isLoading || questionsLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Skeleton className="w-1/2 h-10" />
            <Skeleton className="w-1/4 h-10" />
          </div>

          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-10 w-1/2" />

          <Skeleton className="h-56" />

          <div className="flex justify-between items-center pt-4">
            <Skeleton className="w-1/4 h-10" />
            <Skeleton className="w-1/4 h-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="md:text-xl font-semibold leading-none tracking-tight">
            {quizData?.title}
          </h1>
          <QuizTimer timeRemaining={timeRemaining} />
        </div>

        <QuizProgressBar
          currentQuestion={currentQuestion + 1}
          totalQuestions={questionsTotal}
          answeredQuestions={answeredQuestions.length}
        />

        <QuizNavigation
          totalQuestions={questionsTotal}
          answeredQuestions={answeredQuestions}
          currentQuestion={currentQuestion}
          onNavigate={handleNavigate}
        />

        <QuizQuestion
          question={
            questionsData
              ? (questionsData[currentQuestion] as TQuestion)
              : ({} as TQuestion)
          }
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
              onClick={() => router.push(`/quiz/${quizData?.id}/result`)}
            >
              Lihat Hasil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
