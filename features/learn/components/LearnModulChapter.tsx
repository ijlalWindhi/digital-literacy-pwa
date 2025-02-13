"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ChapterHeader from "./LearnModulChapterHeader";
import ChapterContent from "./LearnModulChapterContent";
import ChapterNotes from "./LearnModulChapterNotes";
import ChapterNavigation from "./LearnModulChapterNavigation";

interface IChapterData {
  [key: string]: { title: string; isComplete: boolean };
}

const mockChapterData: IChapterData = {
  "1": { title: "Pengenalan Cloud Computing", isComplete: false },
  "2": { title: "Jenis-jenis Layanan Cloud", isComplete: false },
  "3": { title: "Manfaat Cloud Computing", isComplete: false },
  "4": { title: "Implementasi Cloud", isComplete: false },
  "5": { title: "Studi Kasus Cloud Computing", isComplete: false },
};

export default function LearnModulChapter({
  modulId,
  chapterId,
}: Readonly<{
  modulId: string;
  chapterId: string;
}>) {
  const router = useRouter();
  const [showNotes, setShowNotes] = useState(false);
  const [chapterData, setChapterData] = useState<IChapterData>(mockChapterData);
  const currentChapterId = Number.parseInt(chapterId);

  useEffect(() => {
    // In a real app, fetch chapter data here
    // For now, we'll use the mock data
  }, [chapterId]); // Removed unnecessary dependency: modulId

  const handleMarkComplete = () => {
    setChapterData((prev) => ({
      ...prev,
      [currentChapterId]: { ...prev[currentChapterId], isComplete: true },
    }));
  };

  const handleNavigation = (direction: "prev" | "next") => {
    const newChapterId =
      direction === "prev" ? currentChapterId - 1 : currentChapterId + 1;
    if (newChapterId >= 1 && newChapterId <= Object.keys(chapterData).length) {
      router.push(`/learn/modul/${modulId}/chapter/${newChapterId}`);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className={`${showNotes ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}
        >
          <ChapterHeader
            modulId={modulId}
            chapterId={chapterId}
            chapterTitle={chapterData[currentChapterId]?.title}
            showNotes={showNotes}
            onToggleNotes={() => setShowNotes(!showNotes)}
          />
          <ChapterContent modulId={modulId} chapterId={chapterId} />
          <ChapterNavigation
            modulId={modulId}
            currentChapter={currentChapterId}
            totalChapters={Object.keys(chapterData).length}
            isComplete={chapterData[currentChapterId]?.isComplete}
            onMarkComplete={handleMarkComplete}
            onNavigate={handleNavigation}
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
