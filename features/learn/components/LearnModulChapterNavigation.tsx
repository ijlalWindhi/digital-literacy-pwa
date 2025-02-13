import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface LearnModulChapterNavigationProps {
  modulId: string;
  currentChapter: number;
  totalChapters: number;
  isComplete: boolean;
  onMarkComplete: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function LearnModulChapterNavigation({
  modulId,
  currentChapter,
  totalChapters,
  isComplete,
  onMarkComplete,
  onNavigate,
}: Readonly<LearnModulChapterNavigationProps>) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onNavigate("prev")}
            disabled={currentChapter === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Sebelumnya</span>
          </Button>

          <Button
            className="flex-1"
            onClick={onMarkComplete}
            disabled={isComplete}
          >
            {isComplete ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Selesai
              </>
            ) : (
              "Tandai Selesai"
            )}
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onNavigate("next")}
            disabled={currentChapter === totalChapters}
          >
            <span>Selanjutnya</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
