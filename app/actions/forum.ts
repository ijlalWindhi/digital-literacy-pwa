"use server";

import { db } from "@/utils/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  increment,
  limit,
} from "firebase/firestore";
import {
  TForumForm,
  TForumCommentForm,
  TUsers,
  TForumCategory,
  TForum,
} from "@/types";
import { FORUM_CATEGORIES } from "@/utils/forum-categories";

const forumCollection = collection(db, "forums");
const commentCollection = collection(db, "forum_comments");

export async function addForum(data: TForumForm, user: TUsers) {
  try {
    const forumData = {
      ...data,
      author: {
        uid: user.uid,
        name: user.name,
      },
      likes: 0,
      comments: 0,
      views: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await addDoc(forumCollection, forumData);
    return { success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getForums(category?: TForumCategory) {
  try {
    let forumQuery = query(forumCollection, orderBy("created_at", "desc"));

    if (category) {
      forumQuery = query(
        forumCollection,
        where("category", "==", category),
        orderBy("created_at", "desc"),
      );
    }

    const snapshot = await getDocs(forumQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function addComment(
  forumId: string,
  data: TForumCommentForm,
  user: TUsers,
) {
  try {
    const commentData = {
      forum_id: forumId,
      content: data.content,
      author: {
        uid: user.uid,
        name: user.name,
        image: user.image,
      },
      likes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await addDoc(commentCollection, commentData);

    // Update comment count in forum
    const forumRef = doc(db, "forums", forumId);
    await updateDoc(forumRef, {
      comments: increment(1),
    });

    return { success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function getForumStats() {
  const stats: { [key: string]: number } = {};

  for (const category of FORUM_CATEGORIES) {
    const q = query(forumCollection, where("category", "==", category.id));
    const snapshot = await getDocs(q);
    stats[category.id] = snapshot.size;
  }

  return stats;
}

export async function getRecentDiscussions(limitCount = 5) {
  const q = query(
    forumCollection,
    orderBy("created_at", "desc"),
    limit(limitCount),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TForum[];
}

export async function getPopularDiscussions(limitCount = 4) {
  const q = query(forumCollection, orderBy("views", "desc"), limit(limitCount));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TForum[];
}

export async function incrementViewCount(forumId: string) {
  const forumRef = doc(db, "forums", forumId);
  await updateDoc(forumRef, {
    views: increment(1),
  });
}
