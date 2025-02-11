import React from "react";
import { Metadata } from "next";

import Profile from "@/features/profile";

import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Profile ${METADATA.exTitle}`,
  description: `Profile for the current user`,
  alternates: {
    canonical: `${process.env.DOMAIN}/profile`,
  },
};

export default function AccountPage() {
  return <Profile />;
}
