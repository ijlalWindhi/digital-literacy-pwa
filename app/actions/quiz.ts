"use server";

import { db } from "@/utils/firebase";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  limit,
} from "firebase/firestore";
import { TQuiz, TQuizCategory } from "@/types";

const quizzesCollection = collection(db, "quizs");

export async function getQuizzes(category?: TQuizCategory) {
  try {
    let quizQuery = query(quizzesCollection, orderBy("created_at", "desc"));

    if (category) {
      quizQuery = query(
        quizzesCollection,
        where("category.id", "==", category),
        orderBy("created_at", "desc"),
      );
    }

    const snapshot = await getDocs(quizQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TQuiz[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getRecentQuizzes(limitCount = 3) {
  const q = query(
    quizzesCollection,
    orderBy("created_at", "desc"),
    limit(limitCount),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TQuiz[];
}

export async function getQuiz(quizId: string) {
  try {
    const docSnap = await getDoc(doc(db, "quizs", quizId));
    return { id: docSnap.id, ...docSnap.data() } as TQuiz;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}
