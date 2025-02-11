import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { addFeedback } from "@/app/actions/feedback";
import { db } from "@/utils/firebase";
import { TFeedback } from "@/types";

export function useFeedback() {
  const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const feedbackQuery = query(
      collection(db, "feedbacks"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(feedbackQuery, (snapshot) => {
      const updatedFeedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TFeedback[];
      setFeedbacks(updatedFeedbacks);
      queryClient.setQueryData(["feedbacks"], updatedFeedbacks);
    });

    return () => unsubscribe();
  }, [queryClient]);

  return {
    data: feedbacks,
    isLoading: false,
    refetch: () => {},
  };
}

export function useAddFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFeedback) => addFeedback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
}
