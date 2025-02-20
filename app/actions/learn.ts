"use server";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

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

export async function getRecentLearns(limitCount = 3) {
  const q = query(
    learnsCollection,
    orderBy("created_at", "desc"),
    limit(limitCount),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TCourse[];
}
