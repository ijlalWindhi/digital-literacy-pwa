import { useQuery } from "@tanstack/react-query";
import { getLearns, getRecentLearns, getLearn } from "@/app/actions/learn";
import { TLearnCategory } from "@/types";

export function useLearns(category?: TLearnCategory) {
  return useQuery({
    queryKey: ["learns", category],
    queryFn: () => getLearns(category),
  });
}

export function useRecentLearns({
  limitCount = 3,
  userId,
}: {
  limitCount?: number;
  userId: string;
}) {
  return useQuery({
    queryKey: ["recent-learns", limitCount],
    queryFn: () => getRecentLearns({ limitCount, userId }),
  });
}

export function useLearn(learnId: string) {
  return useQuery({
    queryKey: ["learn", learnId],
    queryFn: () => getLearn(learnId),
  });
}
