import React from "react";
import { Metadata } from "next";

import { ForumCategory } from "@/features/forum";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Kategori Forum ${METADATA.exTitle}`,
  description: `Modul Kategori Forum Diskusi merupakan tempat untuk membuat kategori diskusi dengan pengguna lainnya`,
  alternates: {
    canonical: `${process.env.DOMAIN}/forum/new`,
  },
};

export default function CategoryPage({
  params,
}: {
  readonly params: { readonly categoryId: string };
}) {
  return <ForumCategory categoryId={params.categoryId} />;
}
