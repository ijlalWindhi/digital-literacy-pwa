import React from "react";
import Link from "next/link";
import { CheckCircle, Circle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import useAuth from "@/stores/auth";
import { useModuleByLearn, useModuleProgress } from "@/hooks/use-learn";
import { formatMinutesToHoursAndMinutes } from "@/utils/format-time";

export default function LearnModulContent({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  // variables
  const { me } = useAuth();
  const { data: modules, isLoading } = useModuleByLearn(modulId);
  const { data: progress } = useModuleProgress(me?.uid, modulId);

  const getChapterIcon = (
    status: "not_started" | "in_progress" | "completed",
  ) => {
    if (status === "completed")
      return <CheckCircle className="h-5 w-5 text-green-500" />;

    if (status === "in_progress")
      return <Circle className="h-5 w-5 text-yellow-500" />;

    return <Circle className="h-5 w-5 text-red-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle className="text-base md:text-lg">
            Konten Pembelajaran
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span>Progress Modul</span>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <span>
                  {progress?.length ?? 0} / {modules?.length ?? 0} Selesai
                </span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <Progress
                value={
                  ((progress?.filter((p) => p.status === "completed").length ??
                    0) /
                    (modules?.length ?? 1)) *
                  100
                }
              />
            )}
          </div>

          <div className="space-y-2">
            {isLoading && (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="rounded-lg h-24" />
                ))}
              </div>
            )}

            {!modules?.length && !isLoading && (
              <div className="text-xs md:text-sm text-center text-muted-foreground">
                Belum ada modul yang tersedia
              </div>
            )}

            {modules?.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/learn/modul/${modulId}/chapter/${chapter.id}`}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto py-4 px-4"
                >
                  <div className="flex items-start gap-4">
                    {getChapterIcon(
                      progress?.find((p) => p.module_id === chapter.id)
                        ?.status ?? "not_started",
                    )}
                    <div className="flex-1 text-left">
                      <div className="font-medium">{chapter.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatMinutesToHoursAndMinutes(chapter.duration)}{" "}
                      </div>
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
