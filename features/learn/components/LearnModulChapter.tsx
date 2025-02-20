"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ChapterHeader from "./LearnModulChapterHeader";
import ChapterContent from "./LearnModulChapterContent";
import ChapterNotes from "./LearnModulChapterNotes";
import ChapterNavigation from "./LearnModulChapterNavigation";

import {
  useModuleByLearn,
  useModuleProgress,
  useModuleProgressByModuleId,
  useModule,
  useAddModuleProgress,
  useUpdateModuleProgress,
} from "@/hooks/use-learn";
import useAuth from "@/stores/auth";
import { TModule, TModuleAttempt } from "@/types";

export default function LearnModulChapter({
  modulId,
  chapterId,
}: Readonly<{
  modulId: string;
  chapterId: string;
}>) {
  // variables
  const { me } = useAuth();
  const { data: module, isLoading } = useModule(chapterId);
  const { data: moduleData } = useModuleByLearn(modulId);
  const { data: moduleProgress } = useModuleProgress(me?.uid, modulId);
  const { data: chapterProgress } = useModuleProgressByModuleId(
    me?.uid,
    chapterId,
  );
  const updateProgress = useUpdateModuleProgress();
  const addProgress = useAddModuleProgress();
  const router = useRouter();
  const [showNotes, setShowNotes] = useState(false);
  const currentProgress = moduleProgress?.find(
    (attempt) => attempt.module_id === chapterId,
  );

  // functions
  const handleMarkComplete = async () => {
    if (!currentProgress || !me?.uid) return;

    try {
      await updateProgress.mutateAsync({
        attemptId: currentProgress.id as string,
        data: {
          status: "completed",
          completion_time: new Date().toISOString(),
          points_earned: module?.points ?? 0,
          time_spent: module?.duration.toString() ?? "0",
        } as Partial<TModuleAttempt>,
      });
    } catch (error) {
      console.error("Failed to mark chapter as complete:", error);
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (!moduleData) return;

    const currentIndex = moduleData.findIndex((mod) => mod.id === chapterId);
    if (currentIndex === -1) return;

    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < moduleData.length) {
      router.push(`/learn/modul/${modulId}/chapter/${moduleData[newIndex].id}`);
    }
  };

  async function initializeProgress() {
    try {
      if (!chapterProgress && me?.uid) {
        addProgress.mutate({
          user_id: me.uid,
          module_id: chapterId,
          course_id: modulId,
          status: "in_progress",
          start_time: new Date().toISOString(),
          last_accessed: new Date().toISOString(),
          time_spent: "0",
          points_earned: 0,
        });
      }
    } catch (error) {
      console.error("Failed to initialize progress:", error);
    }
  }

  // lifecycle
  useEffect(() => {
    initializeProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, chapterProgress]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={`${showNotes ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}
        >
          <ChapterHeader
            moduleId={modulId}
            module={module as TModule}
            moduleProgress={moduleProgress ?? []}
            isLoading={isLoading}
            showNotes={showNotes}
            onToggleNotes={() => setShowNotes(!showNotes)}
          />
          <ChapterContent module={module as TModule} isLoading={isLoading} />
          <ChapterNavigation
            modulId={modulId}
            currentModule={module as TModule}
            modules={moduleData ?? []}
            isComplete={currentProgress?.status === "completed"}
            onMarkComplete={handleMarkComplete}
            onNavigate={handleNavigation}
            isUpdating={updateProgress.isPending}
          />
        </div>
        {showNotes && (
          <div className="lg:col-span-1">
            <ChapterNotes modulId={modulId} chapterId={chapterId} />
          </div>
        )}
      </div>
    </div>
  );
}
