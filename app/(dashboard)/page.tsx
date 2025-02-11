import React from "react";
import { Metadata } from "next";

import Home from "@/features/home";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Dashboard ${METADATA.exTitle}`,
  description: `Modul Dashboard merupakan tempat untuk melihat informasi terkini mengenai akun Anda`,
  alternates: {
    canonical: `${process.env.DOMAIN}`,
  },
};

export default function HomePage() {
  return <Home />;
}
