import React from "react";
import Link from "next/link";
import { Clock, BookOpen, Trophy, ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useLearn } from "@/hooks/use-learn";
import { formatMinutesToHoursAndMinutes } from "@/utils/format-time";

export default function LearnModulHeader({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  // variables
  const { data: module, isLoading } = useLearn(modulId);

  return (
    <div className="space-y-4">
      <Link href="/learn">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Pembelajaran
        </Button>
      </Link>

      <Card>
        <CardHeader>
          {isLoading ? (
            <>
              <div className="flex flex-wrap gap-2 mb-2">
                <Skeleton className="w-20 h-6" />
                <Skeleton className="w-20 h-6" />
                <Skeleton className="w-20 h-6" />
                <Skeleton className="w-20 h-6" />
              </div>
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-full h-4" />
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{module?.category?.name ?? "-"}</Badge>
                <Badge variant="outline">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatMinutesToHoursAndMinutes(module?.duration ?? 0)}
                </Badge>
                <Badge variant="outline">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {module?.total_modules ?? 0} Bab
                </Badge>
                <Badge variant="outline">
                  <Trophy className="h-4 w-4 mr-1" />
                  {module?.total_points ?? 0} Poin
                </Badge>
              </div>
              <CardTitle className="text-base md:text-lg">
                {module?.title ?? "-"}
              </CardTitle>
              <CardDescription>{module?.description ?? "-"}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-sm md:text-base font-semibold">Prasyarat:</h3>
            {isLoading && <Skeleton className="w-full h-4" />}
            {module?.knowledge?.length === 0 && !isLoading && (
              <p className="text-xs md:text-sm text-muted-foreground">
                Tidak ada prasyarat
              </p>
            )}
            <ul className="text-xs md:text-sm list-disc list-inside space-y-1">
              {module?.knowledge?.map((prereq, index) => (
                <li key={index} className="text-muted-foreground">
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
