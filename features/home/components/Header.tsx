"use client";
import React from "react";

import CardPattern from "@/components/common/card-pattern";

import useAuth from "@/stores/auth";

export default function Header() {
  // variables
  const { me } = useAuth();

  return (
    <div className="relative rounded-xl border bg-card p-6 text-card-foreground">
      <CardPattern className="absolute inset-0 opacity-5" />
      <div className="relative space-y-2">
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight">
          Selamat Pagi,{" "}
          <span className="text-primary">{me?.name || me.email || "-"}</span> 👋
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Lanjutkan perjalanan belajar Anda. Anda telah menyelesaikan 60% target
          minggu ini!
        </p>
      </div>
    </div>
  );
}
