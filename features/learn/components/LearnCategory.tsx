"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import LearnCategoryHeader from "./LearnCategoryHeader";
import LearnCategorySidebar from "./LearnCategorySidebar";

import { LEARN_CATEGORIES } from "@/utils/learn-categories";
import { useLearns } from "@/hooks/use-learn";
import { useUserProgress } from "@/hooks/use-users";
import useAuth from "@/stores/auth";
import { TCourse, TUserProgress } from "@/types";
import { formatMinutesToHoursAndMinutes } from "@/utils/format-time";

const LearnCategory = ({
  categoryId,
}: Readonly<{
  categoryId: string;
}>) => {
  const { me } = useAuth();
  const category = LEARN_CATEGORIES.find((c) => c.id === categoryId);
  const { data: courses, isLoading } = useLearns();
  const { data: userProgress } = useUserProgress(me?.uid);

  if (!category) {
    return <div>Kategori tidak ditemukan</div>;
  }

  // functions
  const isCourseLocked = (course: TCourse, userProgress?: TUserProgress) => {
    if (!course.prerequisites?.length) return false;
    if (!userProgress) return true;

    // Check if all prerequisites are completed
    return !course.prerequisites.every((prereqId) => {
      const prereqProgress = userProgress.courses_progress.find(
        (progress) => progress.course_id === prereqId,
      );
      return prereqProgress?.progress_percentage === 100;
    });
  };

  const isCourseCompleted = (course: TCourse, userProgress?: TUserProgress) => {
    if (!userProgress) return false;

    const courseProgress = userProgress.courses_progress.find(
      (progress) => progress.course_id === course.id,
    );
    return courseProgress?.progress_percentage === 100;
  };

  const getCourseProgress = (course: TCourse, userProgress?: TUserProgress) => {
    if (!userProgress) return 0;

    const courseProgress = userProgress.courses_progress.find(
      (progress) => progress.course_id === course.id,
    );
    return courseProgress?.progress_percentage ?? 0;
  };

  return (
    <Card>
      <LearnCategoryHeader category={category} />
      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          {/* Modules List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="rounded-lg h-24" />
                ))}
              </div>
            )}

            {courses?.length === 0 && !isLoading && (
              <div className="text-xs md:text-sm text-center text-muted-foreground">
                Belum ada pembelajaran yang tersedia
              </div>
            )}

            {courses?.map((course) => {
              const locked = isCourseLocked(course, userProgress);
              const completed = isCourseCompleted(course, userProgress);
              const progress = getCourseProgress(course, userProgress);

              return (
                <div
                  key={course.id}
                  className="group cursor-pointer rounded-xl border bg-white p-6 transition-all hover:border-indigo-500 hover:shadow-md"
                >
                  <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                    <div className="flex items-center gap-4">
                      {completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : locked ? (
                        <Lock className="h-6 w-6 text-gray-400" />
                      ) : (
                        <PlayCircle className="h-6 w-6 text-indigo-500" />
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {course.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {formatMinutesToHoursAndMinutes(course.duration)} •{" "}
                          {course.total_modules} bab • {course.total_points}{" "}
                          poin
                        </p>
                      </div>
                    </div>
                    {!locked && (
                      <Link href={`/learn/modul/${course.id}`}>
                        <Button
                          variant={completed ? "outline" : "default"}
                          className="w-full md:w-fit"
                        >
                          {completed ? "Ulangi" : "Mulai"}
                        </Button>
                      </Link>
                    )}
                  </div>
                  {!locked && <Progress value={progress} className="h-1" />}
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <LearnCategorySidebar />
        </div>
      </CardContent>
    </Card>
  );
};

export default LearnCategory;
