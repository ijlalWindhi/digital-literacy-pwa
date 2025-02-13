"use client";
import React from "react";

import LearnHeader from "./LearnHeader";
import LearnCategories from "./LearnCategories";
import RecentLearn from "./RecentLearn";

export default function Learn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="md:text-xl font-semibold leading-none tracking-tight">
            Pembelajaran
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Pelajari materi interaktif untuk memahami konsep dan praktik terbaik
            dalam dunia teknologi
          </p>
        </div>

        <LearnHeader />
        <LearnCategories />
        <RecentLearn />
      </div>
    </div>
  );
}
