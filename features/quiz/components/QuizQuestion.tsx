import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizQuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  selectedAnswer: number;
  onSelectAnswer: (index: number) => void;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}: Readonly<QuizQuestionProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm md:text-base lg:text-lg">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer.toString()}
          onValueChange={(value) => onSelectAnswer(Number.parseInt(value))}
        >
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-lg border p-2 md:p-4 cursor-pointer transition-colors
                  ${selectedAnswer === index ? "bg-muted/50 border-primary" : "hover:bg-muted/50"}`}
                onClick={() => onSelectAnswer(index)}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  className="sr-only"
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer text-xs md:text-sm"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
