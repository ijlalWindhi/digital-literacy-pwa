import React from "react";
import { Metadata } from "next";

import { ForumNew } from "@/features/forum";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Buat Forum ${METADATA.exTitle}`,
  description: `Modul Buat Forum Diskusi merupakan tempat untuk membuat diskusi dengan pengguna lainnya`,
  alternates: {
    canonical: `${process.env.DOMAIN}/forum/new`,
  },
};

export default function ForumPage() {
  return <ForumNew />;
}
