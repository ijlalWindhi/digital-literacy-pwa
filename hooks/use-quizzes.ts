import { useQuery } from "@tanstack/react-query";
import { getQuizzes, getRecentQuizzes, getQuiz } from "@/app/actions/quiz";
import { TQuizCategory } from "@/types";

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
