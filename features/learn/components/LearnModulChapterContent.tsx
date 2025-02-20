import React from "react";
import Link from "next/link";
import { PlayCircle, FileText, Download } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import { TModule } from "@/types";
import { formatDurationVideo } from "@/utils/format-time";

export default function LearnModulChapterContent({
  module,
  isLoading,
}: Readonly<{
  module: TModule;
  isLoading: boolean;
}>) {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="video" className="space-y-6">
          <TabsList>
            <TabsTrigger value="video">
              <PlayCircle className="h-4 w-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="reading">
              <FileText className="h-4 w-4 mr-2" />
              Materi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              {isLoading ? (
                <Skeleton className="absolute inset-0" />
              ) : (
                <iframe
                  src={module?.video?.url}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-6 w-1/4" />
            ) : (
              <p className="text-xs md:text-sm text-muted-foreground">
                Durasi: {formatDurationVideo(module?.video?.duration ?? 0)}
              </p>
            )}
          </TabsContent>

          <TabsContent value="reading" className="space-y-8">
            {isLoading && (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <Skeleton key={idx} className="rounded-lg h-24" />
                ))}
              </div>
            )}

            {!isLoading && module?.reading.sections.length === 0 && (
              <div className="text-xs md:text-sm text-muted-foreground">
                Belum ada materi yang tersedia
              </div>
            )}

            {module?.reading.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold">
                  {section.title}
                </h3>
                <div className="prose max-w-none dark:prose-invert">
                  {section.content.split("\n\n").map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-xs md:text-sm leading-relaxed"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t pt-6">
              <h4 className="text-sm md:text-base font-semibold mb-4">
                Materi Pendukung
              </h4>
              <div className="space-y-2">
                {module?.reading.resources.map((resource, index) => (
                  <Link key={index} href={resource.link} target="_blank">
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      <span className="flex-1 text-left">{resource.name}</span>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {resource.size}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
