import React from "react";
import { Metadata } from "next";

import { LearnModul } from "@/features/learn";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Detail Pembelajaran ${METADATA.exTitle}`,
  description: `Modul Detail Pembelajaran merupakan tempat untuk belajar berbagai materi yang disediakan oleh kami`,
  alternates: {
    canonical: `${process.env.DOMAIN}/learn/modul/[modulId]`,
  },
};

export default async function LearnModulPage({
  params,
}: Readonly<{
  params: Promise<{ modulId: string }>;
}>) {
  const { modulId } = await params;
  return <LearnModul modulId={modulId} />;
}
