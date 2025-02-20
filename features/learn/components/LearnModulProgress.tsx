import React from "react";
import { Trophy, Clock, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useModuleByLearn,
  useModuleProgress,
  useLearn,
} from "@/hooks/use-learn";
import useAuth from "@/stores/auth";

export default function LearnModulProgress({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  // variables
  const { me } = useAuth();
  const { data: modules, isLoading } = useModuleByLearn(modulId);
  const { data: module } = useLearn(modulId);
  const { data: progress } = useModuleProgress(me?.uid, modulId);

  return (
    <div className="space-y-6 lg:mt-[3.5rem]">
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Progress Modul</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex text-sm items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Waktu Belajar</span>
                </div>
                <span className="font-semibold">
                  {isLoading ? (
                    <Skeleton className="h-4 w-16" />
                  ) : (
                    (progress?.reduce(
                      (acc, curr) => acc + Number(curr.time_spent),
                      0,
                    ) ?? 0)
                  )}
                </span>
              </div>

              <div className="flex text-sm items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Bab Selesai</span>
                </div>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span className="font-semibold">
                    {progress?.length ?? 0} / {modules?.length ?? 0}
                  </span>
                )}
              </div>

              <div className="flex text-sm items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Poin Diperoleh</span>
                </div>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span className="font-semibold">
                    {progress?.reduce(
                      (acc, curr) => acc + Number(curr.points_earned),
                      0,
                    )}{" "}
                    / {module?.total_points}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress Poin</span>
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  <span>
                    {progress?.reduce(
                      (total, learn) => total + Number(learn.time_spent),
                      0,
                    ) ?? 0}{" "}
                    / {module?.total_points ?? 0}
                  </span>
                )}
              </div>
              {isLoading ? (
                <Skeleton className="h-4 w-full" />
              ) : (
                <Progress
                  value={
                    (progress?.reduce(
                      (total, learn) => total + Number(learn.time_spent),
                      0,
                    ) ?? 0) * 100
                  }
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Aktivitas Terakhir
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading && (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="rounded-lg h-24" />
                ))}
              </div>
            )}

            {progress?.length === 0 && !isLoading && (
              <div className="text-xs md:text-sm text-center text-muted-foreground">
                Belum ada aktivitas
              </div>
            )}

            {progress?.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm">
                    {modules?.find((e) => e.id === activity.module_id)?.title}{" "}
                    <span className="font-medium">
                      {activity.points_earned}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity?.completion_time
                      ? formatDistanceToNow(
                          new Date(activity.completion_time),
                          {
                            addSuffix: true,
                            locale: id,
                          },
                        )
                      : "-"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
