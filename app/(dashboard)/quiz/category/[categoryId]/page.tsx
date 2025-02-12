import React from "react";
import { Metadata } from "next";

import { QuizCategory } from "@/features/quiz";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Kategori Kuis ${METADATA.exTitle}`,
  description: `Modul Kategori Kuis merupakan tempat untuk melihat kategori kuis yang tersedia`,
  alternates: {
    canonical: `${process.env.DOMAIN}/quiz/category/[categoryId]`,
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  return <QuizCategory categoryId={categoryId} />;
}
