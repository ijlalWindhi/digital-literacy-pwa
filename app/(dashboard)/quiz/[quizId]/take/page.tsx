import React from "react";
import { Metadata } from "next";

import { QuizTake } from "@/features/quiz";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Pengerjaan ${METADATA.exTitle}`,
  description: `Modul Pengerjaan merupakan tempat untuk mengerjakan kuis yang telah dibuat`,
  alternates: {
    canonical: `${process.env.DOMAIN}/quiz/[quizId]/take`,
  },
};

export default async function QuizDetailTakePage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <QuizTake quizId={quizId} />;
}
