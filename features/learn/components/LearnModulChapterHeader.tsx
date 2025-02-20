"use client";
import Link from "next/link";
import { ArrowLeft, StickyNote, BookOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { TModule, TModuleAttempt } from "@/types";
import { useModuleByLearn } from "@/hooks/use-learn";
import { formatMinutesToHoursAndMinutes } from "@/utils/format-time";

interface ChapterHeaderProps {
  moduleId: string;
  module: TModule;
  moduleProgress: TModuleAttempt[];
  isLoading: boolean;
  showNotes: boolean;
  onToggleNotes: () => void;
}

export default function LearnModulChapterHeader({
  moduleId,
  moduleProgress,
  module,
  isLoading,
  showNotes,
  onToggleNotes,
}: Readonly<ChapterHeaderProps>) {
  // variables
  const { data: modules } = useModuleByLearn(moduleId);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link href={`/learn/modul/${moduleId}`}>
          <Button variant="ghost" className="min-w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Modul
          </Button>
        </Link>
        {/* <Button
          variant={showNotes ? "default" : "outline"}
          onClick={onToggleNotes}
        >
          <StickyNote className="h-4 w-4 mr-2" />
          {showNotes ? "Sembunyikan Catatan" : "Tampilkan Catatan"}
        </Button> */}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </>
            ) : (
              <div>
                <h2 className="text-base md:text-lg font-semibold">
                  {module?.title}
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {module?.description}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-xs md:text-sm">
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Bab {module?.order ?? 0} dari {modules?.length ?? 0}
                  </div>
                  <span>
                    {formatMinutesToHoursAndMinutes(module?.duration ?? 0)}
                  </span>
                </>
              )}
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span>Progress Bab</span>
                {isLoading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <span>
                    {(moduleProgress.filter((p) => p.module_id === module?.id)
                      .length /
                      (modules?.length ?? 0)) *
                      100}
                    %
                  </span>
                )}
              </div>
              {isLoading ? (
                <Skeleton className="w-full h-4" />
              ) : (
                <Progress
                  value={
                    (moduleProgress.filter((p) => p.module_id === module?.id)
                      .length /
                      (modules?.length ?? 0)) *
                    100
                  }
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
