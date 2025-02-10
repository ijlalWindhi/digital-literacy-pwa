import { auth } from "@/utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "@/hooks/use-toast";

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
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

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const accessToken = await userCredential.user.getIdToken();
    return { accessToken };
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

export async function logoutUser() {
  try {
    await signOut(auth);
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
