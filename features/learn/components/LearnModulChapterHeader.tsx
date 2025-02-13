import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, StickyNote, BookOpen } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface ChapterHeaderProps {
  modulId: string;
  chapterId: string;
  chapterTitle: string;
  showNotes: boolean;
  onToggleNotes: () => void;
}

export default function LearnModulChapterHeader({
  modulId,
  chapterId,
  chapterTitle,
  showNotes,
  onToggleNotes,
}: Readonly<ChapterHeaderProps>) {
  // In a real app, fetch additional chapter data based on modulId and chapterId
  const chapter = {
    moduleTitle: "Pengenalan Cloud Computing",
    currentChapter: Number.parseInt(chapterId),
    totalChapters: 5,
    duration: "10 menit",
    progress: 60,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link href={`/learn/modul/${modulId}`}>
          <Button variant="ghost" className="min-w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Modul
          </Button>
        </Link>
        <Button
          variant={showNotes ? "default" : "outline"}
          onClick={onToggleNotes}
        >
          <StickyNote className="h-4 w-4 mr-2" />
          {showNotes ? "Sembunyikan Catatan" : "Tampilkan Catatan"}
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-base md:text-lg font-semibold">
                {chapterTitle}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                {chapter.moduleTitle}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Bab {chapter.currentChapter} dari {chapter.totalChapters}
              </div>
              <span>{chapter.duration}</span>
            </div>

            <div>
              <div className="flex justify-between text-xs md:text-sm mb-2">
                <span>Progress Bab</span>
                <span>{chapter.progress}%</span>
              </div>
              <Progress value={chapter.progress} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
