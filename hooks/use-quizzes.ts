import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuizzes,
  getRecentQuizzes,
  getQuiz,
  getQuizQuestions,
  getQuizAttempts,
  submitQuiz,
  getUserProgress,
} from "@/app/actions/quiz";
import { ISubmitQuizParams, TQuizCategory } from "@/types";

export function useQuizzes(category?: TQuizCategory) {
  return useQuery({
    queryKey: ["quizzes", category],
    queryFn: () => getQuizzes(category),
  });
}

export function useRecentQuizzes(limitCount = 3) {
  return useQuery({
    queryKey: ["recent-quizzes", limitCount],
    queryFn: () => getRecentQuizzes(limitCount),
  });
}

export function useQuiz(id: string) {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getQuiz(id),
  });
}

export function useQuizQuestions(quizId: string) {
  return useQuery({
    queryKey: ["quiz-questions", quizId],
    queryFn: () => getQuizQuestions(quizId),
  });
}

export function useQuizAttempts(quizId: string) {
  return useQuery({
    queryKey: ["quiz-attempts", quizId],
    queryFn: () => getQuizAttempts(quizId),
  });
}

export function useUserProgress(userId: string) {
  return useQuery({
    queryKey: ["user-progress", userId],
    queryFn: () => getUserProgress(userId),
  });
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ISubmitQuizParams) => submitQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-progress"] });
    },
  });
}
