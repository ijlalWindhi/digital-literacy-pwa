"use server";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { getUserProgress } from "./users";
import { db } from "@/utils/firebase";
import { TCourse, TLearnCategory, TModule, TModuleAttempt } from "@/types";

const learnsCollection = collection(db, "learns");
const modulesCollection = collection(db, "learns_module");
const moduleAttemptsCollection = collection(db, "learns_module_attempts");

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

export async function getLearn(learnId: string) {
  try {
    const docSnap = await getDoc(doc(db, "learns", learnId));
    return { id: docSnap.id, ...docSnap.data() } as TCourse;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getModuleByLearn(learnId: string) {
  try {
    const moduleQuery = query(
      modulesCollection,
      where("course_id", "==", learnId),
      orderBy("order", "asc"),
    );
    const snapshot = await getDocs(moduleQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TModule[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getModule(moduleId: string) {
  try {
    const docSnap = await getDoc(doc(modulesCollection, moduleId));
    return { id: docSnap.id, ...docSnap.data() } as TModule;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getModuleProgress(userId: string, course_id: string) {
  if (!userId || !course_id) {
    throw new Error("User ID and Module ID are required");
  }

  try {
    const progressQuery = query(
      moduleAttemptsCollection,
      where("user_id", "==", userId),
      where("course_id", "==", course_id),
    );

    const snapshot = await getDocs(progressQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TModuleAttempt[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getModuleProgressByModuleId(
  userId: string,
  module_id: string,
) {
  if (!userId || !module_id) {
    throw new Error("User ID and Module ID are required");
  }

  try {
    const progressQuery = query(
      moduleAttemptsCollection,
      where("user_id", "==", userId),
      where("module_id", "==", module_id),
    );

    const snapshot = await getDocs(progressQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TModuleAttempt[];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function addModuleProgress(data: TModuleAttempt) {
  try {
    const { user_id, course_id, module_id } = data;
    const progressQuery = query(
      moduleAttemptsCollection,
      where("user_id", "==", user_id),
      where("course_id", "==", course_id),
      where("module_id", "==", module_id),
    );

    const snapshot = await getDocs(progressQuery);

    if (!snapshot.empty) {
      throw new Error(
        "Progress already exists for this user, course, and module",
      );
    }

    const docRef = await addDoc(moduleAttemptsCollection, data);
    await updateDoc(docRef, {
      id: docRef.id,
    });

    return docRef.id;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function updateModuleProgress(
  attemptId: string,
  data: Partial<TModuleAttempt>,
) {
  try {
    const docRef = doc(moduleAttemptsCollection, attemptId);
    await updateDoc(docRef, {
      ...data,
      last_accessed: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}
