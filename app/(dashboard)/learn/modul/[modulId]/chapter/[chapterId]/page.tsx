import React from "react";
import { Metadata } from "next";

import { LearnModulChapter } from "@/features/learn";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Chapter Pembelajaran ${METADATA.exTitle}`,
  description: `Modul Chapter Pembelajaran merupakan tempat untuk belajar berbagai materi yang disediakan oleh kami`,
  alternates: {
    canonical: `${process.env.DOMAIN}/learn/modul/[modulId]/chapter/[chapterId]`,
  },
};

export default async function LearnModulChapterPage({
  params,
}: Readonly<{
  params: Promise<{ modulId: string; chapterId: string }>;
}>) {
  const { modulId, chapterId } = await params;
  return <LearnModulChapter modulId={modulId} chapterId={chapterId} />;
}
