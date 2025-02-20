import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, FileText, Trophy } from "lucide-react";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryIcon } from "@/components/common/category-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { TLearnCategoryMetadata } from "@/types";
import { useLearns } from "@/hooks/use-learn";

export default function LearnCategoryHeader({
  category,
}: Readonly<{ category: TLearnCategoryMetadata }>) {
  // variables
  const { data: learns, isLoading } = useLearns(category?.id);

  return (
    <CardHeader>
      <div className="mb-2">
        <Link href="/learn">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Pembelajaran
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className={`rounded-full p-3 ${category.color}`}>
          <CategoryIcon category={category.id} className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-1">
          <Badge className="text-xs" variant="secondary">
            {category.difficulty}
          </Badge>
          <CardTitle>{category.title}</CardTitle>
        </div>
      </div>

      <CardDescription>{category.description}</CardDescription>

      <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {isLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <span>
              {learns?.reduce((total, learn) => total + learn.duration, 0) ?? 0}{" "}
              Menit
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          {isLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <span>{learns?.length ?? 0} Modul</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="h-4 w-4" />
          {isLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <span>
              {learns?.reduce(
                (total, learn) => total + learn.total_points,
                0,
              ) ?? 0}{" "}
              Poin
            </span>
          )}
        </div>
      </div>
    </CardHeader>
  );
}
