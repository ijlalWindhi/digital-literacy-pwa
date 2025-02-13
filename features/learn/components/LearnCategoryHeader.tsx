import React from "react";
import { Clock, FileText, Trophy } from "lucide-react";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryIcon } from "@/components/common/category-icon";
import { Badge } from "@/components/ui/badge";

import { TLearnCategoryMetadata } from "@/types";

export default function LearnCategoryHeader({
  category,
}: Readonly<{ category: TLearnCategoryMetadata }>) {
  return (
    <CardHeader>
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
          <span>{category.total_duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>{category.modulCount} Modul</span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="h-4 w-4" />
          <span>{category.total_points} Poin</span>
        </div>
      </div>
    </CardHeader>
  );
}
