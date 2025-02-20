import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLearns,
  getRecentLearns,
  getLearn,
  getModuleByLearn,
  getModuleProgress,
  updateModuleProgress,
} from "@/app/actions/learn";
import { TLearnCategory, TModuleAttempt } from "@/types";

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

export function useModuleByLearn(learnId: string) {
  return useQuery({
    queryKey: ["module-by-learn", learnId],
    queryFn: () => getModuleByLearn(learnId),
  });
}

export function useModuleProgress(userId: string, modulId: string) {
  return useQuery({
    queryKey: ["module-progress", userId, modulId],
    queryFn: () => getModuleProgress(userId, modulId),
  });
}

export function useUpdateModuleProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      attemptId,
      data,
    }: {
      attemptId: string;
      data: Partial<TModuleAttempt>;
    }) => updateModuleProgress(attemptId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["module-progress"],
      });
    },
  });
}
