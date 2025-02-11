import React from "react";
import { Metadata } from "next";

import Feedback from "@/features/feedback";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Feedback ${METADATA.exTitle}`,
  description: `Feedback to help us improve our service`,
  alternates: {
    canonical: `${process.env.DOMAIN}/feedback`,
  },
};

export default function FeedbackPage() {
  return <Feedback />;
}
