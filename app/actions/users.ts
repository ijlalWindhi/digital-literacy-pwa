"use server";

import { db } from "@/utils/firebase";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

export async function addUser(uid: string, name: string, email: string) {
  try {
    await setDoc(doc(usersCollection, uid), { uid, name, email });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function listUsers() {
  try {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function updateUser(
  uid: string,
  data: Partial<{ name: string; email: string }>,
) {
  try {
    const userRef = doc(usersCollection, uid);
    await updateDoc(userRef, data);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
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
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
