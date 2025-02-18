import Link from "next/link";
import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/common/category-icon";

import { useQuizzes } from "@/hooks/use-quizzes";
import { QUIZ_CATEGORIES } from "@/utils/quiz-categories";

export default function QuizCategories() {
  // variables
  const { data: quizzes, isLoading } = useQuizzes();

  return (
    <div className="space-y-2">
      <h2 className="text-base md:text-lg font-semibold leading-none tracking-tight">
        Kategori Kuis
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {QUIZ_CATEGORIES.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <Link href={`/quiz/category/${category.id}`}>
              <div className="relative">
                <div
                  className={`absolute inset-0 ${category.color} min-h-screen opacity-10`}
                />
                <CardHeader>
                  <div className="flex flex-col text-center sm:text-left sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <CategoryIcon
                        category={category.id}
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-sm md:text-base">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-xs md:text-sm text-muted-foreground">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge className="text-xs" variant="secondary">
                      {isLoading
                        ? "..."
                        : `${
                            quizzes?.filter(
                              (quiz) => quiz.category.id === category.id,
                            ).length ?? 0
                          } Kuis`}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs md:text-sm">
                        {category.difficulty}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
