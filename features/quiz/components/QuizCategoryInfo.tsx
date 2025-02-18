"use client";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryIcon } from "@/components/common/category-icon";

import { QUIZ_CATEGORIES } from "@/utils/quiz-categories";
import { useQuizzes } from "@/hooks/use-quizzes";
import { TQuizCategory } from "@/types";

interface QuizCategoryInfoProps {
  readonly categoryId: string;
}

export default function QuizCategoryInfo({
  categoryId,
}: QuizCategoryInfoProps) {
  // variables
  const category = QUIZ_CATEGORIES.find((c) => c.id === categoryId);
  const { data: quizzes, isLoading } = useQuizzes(categoryId as TQuizCategory);

  if (!category) {
    return <div>Kategori tidak ditemukan</div>;
  }

  return (
    <Card>
      <CardHeader>
        {isLoading ? (
          <div className="flex">
            <Skeleton className="h-14 w-14 rounded-lg" />
            <div className="flex flex-col flex-1 ml-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/2 mt-1" />
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${category.color}`}>
              <CategoryIcon
                category={category.id}
                className="h-6 w-6 text-white"
              />
            </div>
            <div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <Badge variant="secondary" className="text-xs md:text-sm">
              {quizzes?.length ?? 0} kuis
            </Badge>
            <span className="text-xs md:text-sm text-muted-foreground">
              Terakhir diperbarui:{" "}
              {quizzes?.[0]?.updated_at
                ? formatDistanceToNow(new Date(quizzes[0].updated_at), {
                    addSuffix: true,
                    locale: id,
                  })
                : "-"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
