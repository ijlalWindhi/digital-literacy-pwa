"use server";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { getUserProgress } from "./users";
import { db } from "@/utils/firebase";
import { TCourse, TLearnCategory } from "@/types";

const learnsCollection = collection(db, "learns");

export async function getLearns(category?: TLearnCategory) {
  try {
    let quizQuery = query(learnsCollection, orderBy("created_at", "desc"));

    if (category) {
      quizQuery = query(
        learnsCollection,
        where("category.id", "==", category),
        orderBy("created_at", "desc"),
      );
    }

    const snapshot = await getDocs(quizQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TCourse[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getRecentLearns({
  limitCount = 3,
  userId,
}: {
  limitCount?: number;
  userId: string;
}) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const userProgress = await getUserProgress(userId);

  // Cek apakah courses_progress ada dan tidak kosong
  if (!userProgress?.courses_progress?.length) {
    return [];
  }

  const recentLearnIds = userProgress.courses_progress
    .toSorted((a, b) => {
      const dateA = new Date(a.last_accessed).getTime();
      const dateB = new Date(b.last_accessed).getTime();
      return dateB - dateA;
    })
    .slice(0, limitCount)
    .map((progress) => progress.course_id);

  // Cek apakah ada IDs untuk di-query
  if (!recentLearnIds.length) {
    return [];
  }

  const recentLearnQuery = query(
    learnsCollection,
    where("id", "in", recentLearnIds),
  );

  const snapshot = await getDocs(recentLearnQuery);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TCourse[];
}
