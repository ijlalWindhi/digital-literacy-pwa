import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  timeRemaining: number;
}

export default function QuizTimer({ timeRemaining }: Readonly<QuizTimerProps>) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <Card className={`${timeRemaining < 120 ? "border-red-500" : ""}`}>
      <CardContent className="flex items-center space-x-2 py-3">
        <Clock
          className={`h-4 w-4 ${timeRemaining < 120 ? "text-red-500" : ""}`}
        />
        <span
          className={`font-mono md:text-lg ${timeRemaining < 120 ? "text-red-500" : ""}`}
        >
          {formatTime(minutes)}:{formatTime(seconds)}
        </span>
      </CardContent>
    </Card>
  );
}
