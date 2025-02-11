import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addForum,
  getForums,
  addComment,
  getForumStats,
  getRecentDiscussions,
  getPopularDiscussions,
  incrementViewCount,
} from "@/app/actions/forum";
import { TForumForm, TForumCommentForm, TForumCategory, TUsers } from "@/types";

export function useAddForum(user: TUsers) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TForumForm) => addForum(data, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forums"] });
    },
  });
}

export function useForums(category?: TForumCategory) {
  return useQuery({
    queryKey: ["forums", category],
    queryFn: () => getForums(category),
  });
}

export function useAddComment(forumId: string, user: TUsers) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TForumCommentForm) => addComment(forumId, data, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-comments", forumId] });
    },
  });
}

export function useForumStats() {
  return useQuery({
    queryKey: ["forum-stats"],
    queryFn: getForumStats,
  });
}

export function useRecentDiscussions() {
  return useQuery({
    queryKey: ["recent-discussions"],
    queryFn: () => getRecentDiscussions(5),
  });
}

export function usePopularDiscussions() {
  return useQuery({
    queryKey: ["popular-discussions"],
    queryFn: () => getPopularDiscussions(4),
  });
}

export function useIncrementViewCount(forumId: string) {
  return useMutation({
    mutationFn: () => incrementViewCount(forumId),
  });
}
