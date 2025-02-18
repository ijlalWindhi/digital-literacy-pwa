import { useQuery } from "@tanstack/react-query";
import { getQuizzes, getRecentQuizzes } from "@/app/actions/quiz";

export function useQuizzes(category?: string) {
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
