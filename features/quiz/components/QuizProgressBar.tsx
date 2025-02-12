import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
}

export default function QuizProgressBar({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
}: Readonly<QuizProgressProps>) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Pertanyaan {currentQuestion} dari {totalQuestions}
        </span>
        <span>{answeredQuestions} Terjawab</span>
      </div>
      <Progress
        value={(answeredQuestions / totalQuestions) * 100}
        className="h-2"
      />
    </div>
  );
}
