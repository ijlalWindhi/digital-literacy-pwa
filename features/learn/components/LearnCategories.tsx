import React from "react";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/common/category-icon";

import { LEARN_CATEGORIES } from "@/utils/learn-categories";

export default function LearnCategories() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {LEARN_CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/learn/category/${category.id}`}
          className="group cursor-pointer rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`rounded-full p-3 ${category.color}`}>
                <CategoryIcon
                  category={category.id}
                  className="h-5 w-5 text-white"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold">
                  {category.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{category.modulCount} Modul</span>
              <span className="text-gray-300">•</span>
              <span>{category.total_points} Poin</span>
            </div>
            <Badge className="text-xs" variant="secondary">
              {category.difficulty}
            </Badge>
          </div>
        </Link>
      ))}
    </div>
  );
}
