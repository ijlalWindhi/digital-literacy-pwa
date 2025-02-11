import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addForum,
  getForums,
  getDetailForum,
  addComment,
  getForumComments,
  getForumStats,
  getRecentDiscussions,
  getPopularDiscussions,
  incrementViewCount,
  incrementLikeCount,
  incrementCommentLikeCount,
} from "@/app/actions/forum";
import {
  TForumForm,
  TForumCommentForm,
  TForumCategory,
  TUsers,
  TForum,
} from "@/types";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => incrementViewCount(forumId),
    onSuccess: () => {
      queryClient.setQueryData(["forum", forumId], (oldData: TForum) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          views: (oldData.views || 0) + 1,
        };
      });
    },
  });
}

export function useDetailForum(forumId: string) {
  return useQuery({
    queryKey: ["forum", forumId],
    queryFn: () => getDetailForum(forumId),
  });
}

export function useForumComments(forumId: string) {
  return useQuery({
    queryKey: ["forum-comments", forumId],
    queryFn: () => getForumComments(forumId),
  });
}

export function useIncrementLikeCount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ forumId, userId }: { forumId: string; userId: string }) =>
      incrementLikeCount(forumId, userId),
    onSuccess: (_, { forumId, userId }) => {
      queryClient.setQueryData(["forum", forumId], (oldData: TForum) => {
        if (!oldData) return oldData;
        const userLikes = oldData.user_likes || [];
        const hasLiked = userLikes.includes(userId);
        return {
          ...oldData,
          likes: hasLiked ? oldData.likes - 1 : oldData.likes + 1,
          user_likes: hasLiked
            ? userLikes.filter((id) => id !== userId)
            : [...userLikes, userId],
        };
      });
    },
  });
}

export function useIncrementCommentLikeCount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      userId,
    }: {
      commentId: string;
      userId: string;
    }) => incrementCommentLikeCount(commentId, userId),
    onMutate: async ({ commentId, userId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["forum-comments"] });

      // Get the current comment data
      const comments = queryClient.getQueriesData({
        queryKey: ["forum-comments"],
      });

      // For each matching query, update the comment
      comments.forEach(([queryKey, oldData]) => {
        if (!Array.isArray(oldData)) return;

        queryClient.setQueryData(
          queryKey,
          oldData.map((comment) => {
            if (comment.id !== commentId) return comment;

            const userLikes: string[] = comment.user_likes || [];
            const hasLiked = userLikes.includes(userId);

            return {
              ...comment,
              likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
              user_likes: hasLiked
                ? userLikes.filter((id) => id !== userId)
                : [...userLikes, userId],
            };
          }),
        );
      });

      // Return context with the old data
      return { comments };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context we saved to roll back
      if (context?.comments) {
        context.comments.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ["forum-comments"] });
    },
  });
}
