import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  totalQuestions: number;
  answeredQuestions: number[];
  currentQuestion: number;
  onNavigate: (questionIndex: number) => void;
}

export default function QuizNavigation({
  totalQuestions,
  answeredQuestions,
  currentQuestion,
  onNavigate,
}: Readonly<QuizNavigationProps>) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Total Pertanyaan: {totalQuestions}</span>
        <span>
          Terjawab: {answeredQuestions.length} / Belum:{" "}
          {totalQuestions - answeredQuestions.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <Button
            key={i}
            variant={
              currentQuestion === i
                ? "default"
                : answeredQuestions.includes(i)
                  ? "success"
                  : "outline"
            }
            className="w-8 h-8"
            size="sm"
            onClick={() => onNavigate(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
