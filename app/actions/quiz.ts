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
  addDoc,
} from "firebase/firestore";
import {
  TQuiz,
  TQuizCategory,
  TQuestion,
  TQuizAttempt,
  ISubmitQuizParams,
} from "@/types";
import { calculateQuizResults } from "@/utils/quiz-calculate";
import { updateUserProgress } from "./users";

const quizzesCollection = collection(db, "quizs");
const quizzesQuestionCollection = collection(db, "quizzes_question");
const quizzesAttempts = collection(db, "quizzes_attempts");

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

export async function getQuizQuestions(quizId: string) {
  try {
    const quizQuestionQuery = query(
      quizzesQuestionCollection,
      where("quiz_id", "==", quizId),
    );
    const snapshot = await getDocs(quizQuestionQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TQuestion[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export const submitQuiz = async ({
  userId,
  quizId,
  answers,
  questions,
  startTime,
  time_spend,
  quizData,
}: ISubmitQuizParams) => {
  try {
    const results = calculateQuizResults(answers, questions);
    const attemptData: Omit<TQuizAttempt, "id"> = {
      user_id: userId,
      quiz_id: quizId,
      start_time: startTime,
      end_time: new Date().toISOString(),
      time_spend,
      status: "completed",
      score: results.totalScore,
      total_correct: results.totalCorrect,
      total_questions: questions.length,
      answers: results.detailedAnswers,
    };

    const attemptRef = await addDoc(
      collection(db, "quizzes_attempts"),
      attemptData,
    );

    await updateUserProgress({
      userId,
      quizId,
      score: results.totalScore,
      quizData,
    });

    return {
      attemptId: attemptRef.id,
      ...results,
    };
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw new Error("Failed to submit quiz");
  }
};

export async function getQuizAttempts(attemptId: string) {
  try {
    const docSnap = await getDoc(doc(quizzesAttempts, attemptId));
    return { id: docSnap.id, ...docSnap.data() } as TQuizAttempt;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}
