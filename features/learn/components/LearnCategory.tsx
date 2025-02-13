"use client";
import {
  CheckCircle,
  Lock,
  PlayCircle,
  FileText,
  Award,
  Trophy,
  Star,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { LEARN_CATEGORIES } from "@/utils/learn-categories";
import LearnCategoryHeader from "./LearnCategoryHeader";
import LearnCategorySidebar from "./LearnCategorySidebar";

const modules = [
  {
    id: 1,
    title: "Pengenalan Dunia Digital",
    duration: "2 jam",
    chapters: 5,
    completed: true,
    points: 100,
  },
  {
    id: 2,
    title: "Dasar-Dasar Komputasi",
    duration: "2.5 jam",
    chapters: 6,
    completed: true,
    points: 120,
  },
  {
    id: 3,
    title: "Jaringan dan Internet",
    duration: "2 jam",
    chapters: 5,
    completed: false,
    points: 100,
  },
  {
    id: 4,
    title: "Keamanan Digital Dasar",
    duration: "1.5 jam",
    chapters: 4,
    completed: false,
    locked: true,
    points: 80,
  },
  {
    id: 5,
    title: "Tren Teknologi Terkini",
    duration: "2 jam",
    chapters: 5,
    completed: false,
    locked: true,
    points: 100,
  },
];

export default function LearnCategory({
  categoryId,
}: Readonly<{
  categoryId: string;
}>) {
  // variables
  const category = LEARN_CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    return <div>Kategori tidak ditemukan</div>;
  }

  return (
    <Card>
      <LearnCategoryHeader category={category} />
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((module) => (
              <div
                key={module.id}
                className="group cursor-pointer rounded-xl border bg-white p-6 transition-all hover:border-indigo-500 hover:shadow-md"
              >
                <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                  <div className="flex items-center gap-4">
                    {module.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : module.locked ? (
                      <Lock className="h-6 w-6 text-gray-400" />
                    ) : (
                      <PlayCircle className="h-6 w-6 text-indigo-500" />
                    )}
                    <div>
                      <h3 className="text-sm md:text-base font-medium text-gray-900">
                        {module.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {module.duration} • {module.chapters} bab •{" "}
                        {module.points} poin
                      </p>
                    </div>
                  </div>
                  {!module.locked && (
                    <Button
                      variant={module.completed ? "outline" : "default"}
                      className="w-full md:w-fit"
                    >
                      {module.completed ? "Ulangi" : "Mulai"}
                    </Button>
                  )}
                </div>
                {!module.locked && (
                  <Progress
                    value={module.completed ? 100 : 0}
                    className="h-1"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <LearnCategorySidebar />
        </div>
      </CardContent>
    </Card>
  );
}
