import React from "react";
import { Metadata } from "next";

import Quiz from "@/features/quiz";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Kuis ${METADATA.exTitle}`,
  description: `Modul Kuis & Latihan merupakan tempat untuk menguji pengetahuan yang telah dipelajari`,
  alternates: {
    canonical: `${process.env.DOMAIN}/quiz`,
  },
};

export default function QuizPage() {
  return <Quiz />;
}
