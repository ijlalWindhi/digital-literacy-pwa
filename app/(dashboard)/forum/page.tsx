import React from "react";
import { Metadata } from "next";

import Forum from "@/features/forum";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Forum ${METADATA.exTitle}`,
  description: `Modul Forum Diskusi merupakan tempat untuk berdiskusi dengan pengguna lainnya`,
  alternates: {
    canonical: `${process.env.DOMAIN}/forum`,
  },
};

export default function ForumPage() {
  return <Forum />;
}
