import Link from "next/link";
import { Book, Code, Globe, Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useForumStats } from "@/hooks/use-forum";
import { FORUM_CATEGORIES } from "@/utils/forum-categories";

export default function ForumCategories() {
  // variables
  const { data: stats, isLoading } = useForumStats();

  return (
    <div className="space-y-2">
      <h2 className="text-base md:text-lg font-semibold leading-none tracking-tight">
        Kategori
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {FORUM_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id}>
              <Link href={`/forum/${category.id}`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm md:text-base">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-xs md:text-sm">
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
                        : `${stats?.[category.id] || 0} diskusi`}
                    </Badge>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Lihat Diskusi →
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
