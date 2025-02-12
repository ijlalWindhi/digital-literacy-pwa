import React from "react";
import { Metadata } from "next";

import { QuizDetail } from "@/features/quiz";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Detail Quiz ${METADATA.exTitle}`,
  description: `Modul Detail Quiz merupakan tempat untuk melihat detail quiz yang telah dibuat`,
  alternates: {
    canonical: `${process.env.DOMAIN}/quiz/thread/[quizId]`,
  },
};

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <QuizDetail quizId={quizId} />;
}
