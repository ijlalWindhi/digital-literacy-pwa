import React from "react";
import { Metadata } from "next";

import Support from "@/features/support";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Support ${METADATA.exTitle}`,
  description: `Support center for help with your account`,
  alternates: {
    canonical: `${process.env.DOMAIN}/support`,
  },
};

export default function SupportPage() {
  return <Support />;
}
