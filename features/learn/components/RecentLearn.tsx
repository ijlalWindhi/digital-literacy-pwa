import React from "react";
import { Target } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { useRecentLearns } from "@/hooks/use-learn";
import { useUserProgress } from "@/hooks/use-users";
import useAuth from "@/stores/auth";

export default function RecentLearn() {
  // variables
  const { me } = useAuth();
  const { data: recentLearn, isLoading } = useRecentLearns({ userId: me?.uid });
  const { data: userProgress } = useUserProgress(me?.uid);
  const selectedProgress = userProgress?.courses_progress.find(
    (progress) => progress.course_id === recentLearn?.[0]?.id,
  );

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Target className="h-5 w-5 text-indigo-600" />
        <h2 className="text-sm md:text-lg font-semibold leading-none tracking-tight">
          Pembelajaran Terakhir Diakses
        </h2>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="rounded-lg h-24" />
            ))}
          </div>
        )}

        {recentLearn?.length === 0 && !isLoading && (
          <div className="text-xs md:text-sm text-center text-muted-foreground">
            Belum ada pembelajaran yang diakses
          </div>
        )}

        {recentLearn?.map((learn) => (
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
                  {learn.category?.name ?? "-"} • {learn.total_modules ?? 0} Bab
                  • {learn.total_points} poin
                </p>
              </div>
              <Link href={`/learn/modul/${learn.id}`}>
                <Button>Lanjutkan</Button>
              </Link>
            </div>
            <Progress
              value={selectedProgress?.progress_percentage}
              className="h-2"
            />
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Terakhir diakses:
              {selectedProgress?.last_accessed
                ? formatDistanceToNow(
                    new Date(selectedProgress?.last_accessed),
                    {
                      addSuffix: true,
                      locale: id,
                    },
                  )
                : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
