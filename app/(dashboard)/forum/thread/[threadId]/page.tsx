import React from "react";
import { Metadata } from "next";

import { ForumThread } from "@/features/forum";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Thread Forum ${METADATA.exTitle}`,
  description: `Modul Thread Forum Diskusi merupakan tempat untuk membuat thread diskusi dengan pengguna lainnya`,
  alternates: {
    canonical: `${process.env.DOMAIN}/forum/thread/[threadId]`,
  },
};

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  return <ForumThread threadId={threadId} />;
}
