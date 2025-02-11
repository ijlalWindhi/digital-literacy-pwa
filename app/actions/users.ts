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

import { TUsers } from "@/types/modules/users";
import { toast } from "@/hooks/use-toast";

const usersCollection = collection(db, "users");

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
