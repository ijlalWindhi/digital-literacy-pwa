import React from "react";
import { Metadata } from "next";

import { QuizResult } from "@/features/quiz";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Hasil Pengerjaan ${METADATA.exTitle}`,
  description: `Modul Hasil Pengerjaan merupakan tempat untuk mengerjakan kuis yang telah dibuat`,
  alternates: {
    canonical: `${process.env.DOMAIN}/quiz/[quizId]/result`,
  },
};

export default async function QuizDetailResultPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = await params;
  return <QuizResult quizId={quizId} />;
}
