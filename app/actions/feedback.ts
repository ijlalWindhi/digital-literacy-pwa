"use server";

import { db } from "@/utils/firebase";
import {
  addDoc,
  getDocs,
  collection,
  onSnapshot,
  Query,
  query,
  orderBy,
} from "firebase/firestore";

import { TFeedback, TFeedbackPayload } from "@/types/modules/feedback";
import { toast } from "@/hooks/use-toast";

const feedbackCollection = collection(db, "feedbacks");
const feedbackQuery = query(feedbackCollection, orderBy("createdAt", "desc"));

export async function addFeedback(data: TFeedbackPayload) {
  try {
    const feedbackWithTimestamp = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    await addDoc(feedbackCollection, feedbackWithTimestamp);
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

export async function listFeedback() {
  try {
    const querySnapshot = await getDocs(feedbackQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TFeedback[];
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
