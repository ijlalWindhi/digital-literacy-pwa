import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { TModule } from "@/types";

interface LearnModulChapterNavigationProps {
  modulId: string;
  currentModule: TModule;
  modules: TModule[];
  isComplete: boolean;
  isUpdating: boolean;
  onMarkComplete: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function LearnModulChapterNavigation({
  modulId,
  currentModule,
  modules,
  isComplete,
  isUpdating,
  onMarkComplete,
  onNavigate,
}: Readonly<LearnModulChapterNavigationProps>) {
  const currentIndex = modules.findIndex((mod) => mod.id === currentModule?.id);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onNavigate("prev")}
            disabled={currentIndex <= 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Sebelumnya</span>
          </Button>

          <Button
            className="flex-1"
            onClick={onMarkComplete}
            disabled={isComplete || isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Memproses...
              </>
            ) : isComplete ? (
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
            disabled={currentIndex >= modules.length - 1}
          >
            <span>Selanjutnya</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
