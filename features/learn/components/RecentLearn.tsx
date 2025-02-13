import React from "react";
import { Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const recentLearn = [
  {
    id: "1",
    title: "Pengenalan Cloud Computing",
    category: "Konsep Dasar",
    chapters: 5,
    points: 100,
    lastAccessed: "2 jam yang lalu",
    progress: 60,
  },
  {
    id: "2",
    title: "Dasar-Dasar HTML & CSS",
    category: "Pengembangan Web",
    chapters: 8,
    points: 150,
    lastAccessed: "1 hari yang lalu",
    progress: 25,
  },
];

export default function RecentLearn() {
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Target className="h-5 w-5 text-indigo-600" />
        <h2 className="text-sm md:text-lg font-semibold leading-none tracking-tight">
          Pembelajaran Terakhir
        </h2>
      </div>

      <div className="space-y-4">
        {recentLearn.map((learn) => (
          <div
            key={learn.id}
            className="rounded-lg border p-4 transition-all hover:border-indigo-500 hover:shadow-md"
          >
            <div className="mb-2 gap-2 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm md:text-base font-medium">
                  {learn.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {learn.category} • {learn.chapters} Bab • {learn.points} poin
                </p>
              </div>
              <Button>Lanjutkan</Button>
            </div>
            <Progress value={learn.progress} className="h-2" />
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Terakhir diakses: {learn.lastAccessed}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
