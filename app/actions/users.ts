"use server";

import { db } from "@/utils/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";

import {
  TUsers,
  TUserProgress,
  IUpdateUserProgressParams,
} from "@/types/modules/users";
import { toast } from "@/hooks/use-toast";
import { calculateLevel } from "@/utils/quiz-calculate";

const usersCollection = collection(db, "users");
const userProgressCollection = collection(db, "users_progress");

export async function addUser(data: TUsers) {
  try {
    await setDoc(doc(usersCollection, data?.uid), data);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getUser(uid: string) {
  try {
    const userRef = doc(usersCollection, uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data() as TUsers;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function listUsers() {
  try {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map((doc) => doc.data()) as TUsers[];
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function updateUser(uid: string, data: Partial<TUsers>) {
  try {
    const userRef = doc(usersCollection, uid);
    await updateDoc(userRef, data);
    return { success: true, uid };
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function deleteUser(uid: string) {
  try {
    await deleteDoc(doc(usersCollection, uid));
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getUserProgress(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const docSnap = await getDoc(doc(userProgressCollection, userId));
    return { id: docSnap.id, ...docSnap.data() } as TUserProgress;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export const updateUserProgress = async ({
  userId,
  quizId,
  score,
}: IUpdateUserProgressParams) => {
  const userProgressRef = doc(userProgressCollection, userId);
  const userProgressDoc = await getDoc(userProgressRef);

  if (!userProgressDoc.exists()) {
    await updateDoc(userProgressRef, {
      total_points: score,
      current_level: calculateLevel(score),
      completed_quizzes: [
        {
          quiz_id: quizId,
          highest_score: score,
          attempts: 1,
          last_attempt_date: new Date().toISOString(),
        },
      ],
      achievements: [],
    });
  } else {
    const existingProgress = userProgressDoc.data() as TUserProgress;
    const existingQuizIndex = existingProgress.completed_quizzes.findIndex(
      (q) => q.quiz_id === quizId,
    );

    if (existingQuizIndex === -1) {
      // First attempt for this quiz - append to existing completed_quizzes
      await updateDoc(userProgressRef, {
        total_points: Number(
          Number(existingProgress.total_points) + Number(score),
        ),
        completed_quizzes: [
          ...existingProgress.completed_quizzes,
          {
            quiz_id: quizId,
            highest_score: score,
            attempts: 1,
            last_attempt_date: new Date().toISOString(),
          },
        ],
        current_level: calculateLevel(existingProgress.total_points + score),
      });
    } else {
      // Update existing quiz progress
      const updatedQuizzes = [...existingProgress.completed_quizzes];
      const existingQuiz = updatedQuizzes[existingQuizIndex];

      updatedQuizzes[existingQuizIndex] = {
        ...existingQuiz,
        highest_score: Math.max(existingQuiz.highest_score, score),
        attempts: existingQuiz.attempts + 1,
        last_attempt_date: new Date().toISOString(),
      };

      await updateDoc(userProgressRef, {
        total_points: existingProgress.total_points + score,
        completed_quizzes: updatedQuizzes,
        current_level: calculateLevel(existingProgress.total_points + score),
      });
    }
  }
};
