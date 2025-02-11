import React from "react";
import { Metadata } from "next";

import Learn from "@/features/learn";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Pembelajaran ${METADATA.exTitle}`,
  description: `Modul Pembelajaran merupakan tempat untuk belajar berbagai materi yang disediakan oleh kami`,
  alternates: {
    canonical: `${process.env.DOMAIN}/learn`,
  },
};

export default function LearnPage() {
  return <Learn />;
}
