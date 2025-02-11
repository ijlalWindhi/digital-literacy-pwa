import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addForum, getForums, addComment } from "@/app/actions/forum";
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
