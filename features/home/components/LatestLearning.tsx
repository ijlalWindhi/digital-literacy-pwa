import { PlayCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import type { LearningModule } from "@/types";

interface LatestLearningProps {
  modules: LearningModule[];
}

export default function LatestLearning({
  modules,
}: Readonly<LatestLearningProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pembelajaran Terakhir</CardTitle>
        <CardDescription>Lanjutkan pembelajaran Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-2">
                <h3 className="text-sm md:text-base font-medium">
                  {module.title}
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <span>{module.category}</span>
                  <span>•</span>
                  <span>
                    {module.completedLessons} dari {module.totalLessons}{" "}
                    pelajaran
                  </span>
                </div>
                <div className="w-full sm:w-48">
                  <Progress value={module.progress} className="h-2" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs md:text-sm text-muted-foreground">
                  {module.lastAccessed}
                </span>
                <Button size="sm">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Lanjutkan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
