import React from "react";
import { Metadata } from "next";

import { LearnCategory } from "@/features/learn";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Kategori Pembelajaran ${METADATA.exTitle}`,
  description: `Modul Kategori Pembelajaran merupakan tempat untuk belajar berbagai materi yang disediakan oleh kami`,
  alternates: {
    canonical: `${process.env.DOMAIN}/learn/category/[categoryId]`,
  },
};

export default async function LearnCategoryPage({
  params,
}: Readonly<{
  params: Promise<{ categoryId: string }>;
}>) {
  const { categoryId } = await params;
  return <LearnCategory categoryId={categoryId} />;
}
