"use server";

import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { TContactForm } from "@/types/modules/contact";
import { toast } from "@/hooks/use-toast";

const contactCollection = collection(db, "contacts");

export async function addContact(data: TContactForm) {
  try {
    const contactData = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "pending",
    };

    await addDoc(contactCollection, contactData);
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
