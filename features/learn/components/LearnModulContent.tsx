import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Circle,
  PlayCircle,
  FileText,
  Download,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const chapters = [
  {
    id: 1,
    title: "Apa itu Cloud Computing?",
    type: "video",
    duration: "10 menit",
    completed: true,
  },
  {
    id: 2,
    title: "Jenis-jenis Layanan Cloud",
    type: "reading",
    duration: "15 menit",
    completed: true,
  },
  {
    id: 3,
    title: "Manfaat Cloud Computing",
    type: "video",
    duration: "8 menit",
    completed: false,
  },
  {
    id: 4,
    title: "Latihan: Implementasi Cloud",
    type: "exercise",
    duration: "20 menit",
    completed: false,
  },
  {
    id: 5,
    title: "Studi Kasus Cloud Computing",
    type: "reading",
    duration: "12 menit",
    completed: false,
  },
];

export default function LearnModulContent({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  const getChapterIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle className="h-5 w-5 text-green-500" />;

    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      case "reading":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "exercise":
        return <Circle className="h-5 w-5 text-orange-500" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <CardTitle className="text-base md:text-lg">
            Konten Pembelajaran
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Unduh Materi
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span>Progress Modul</span>
              <span>
                {chapters.filter((c) => c.completed).length} / {chapters.length}{" "}
                Selesai
              </span>
            </div>
            <Progress
              value={
                (chapters.filter((c) => c.completed).length / chapters.length) *
                100
              }
            />
          </div>

          <div className="space-y-2">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/learn/modul/${modulId}/chapter/${chapter.id}`}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto py-4 px-4"
                >
                  <div className="flex items-start gap-4">
                    {getChapterIcon(chapter.type, chapter.completed)}
                    <div className="flex-1 text-left">
                      <div className="font-medium">{chapter.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {chapter.duration}
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
