"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import ModalSuccess from "@/components/common/modal-success";

import useTheme from "@/stores/theme";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // variables
  const { isLoading } = useTheme();

  return (
    <main className="min-h-screen h-full w-full bg-auth bg-cover bg-no-repeat relative">
      <div className="w-full h-full min-h-screen backdrop-blur-sm absolute top-0 left-0"></div>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-500/60 z-50 absolute">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      <ModalSuccess />
      <Link href="/auth/login">
        <Image
          src={"/images/logo.webp"}
          alt="Logo"
          width={200}
          height={200}
          className="absolute w-16 top-4 left-1/2 transform -translate-x-1/2 sm:left-10 sm:translate-x-0 lg:top-4 lg:left-10 lg:w-20 xl:w-32"
        />
      </Link>
      <div className="w-full h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </main>
  );
}

export default AuthLayout;
