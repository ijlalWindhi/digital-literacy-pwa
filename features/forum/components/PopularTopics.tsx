import { Flame } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { usePopularDiscussions } from "@/hooks/use-forum";
import { FORUM_CATEGORIES } from "@/utils/forum-categories";

export default function PopularTopics() {
  // variables
  const { data: topics, isLoading } = usePopularDiscussions();

  return (
    <Card className="lg:mt-9">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-base md:text-lg">Topik Populer</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {isLoading && (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <Skeleton className="rounded-lg w-16 h-16" />
                  <div className="flex flex-col w-full gap-1">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {topics?.map((topic) => (
            <Link
              key={topic.id}
              href={`/forum/thread/${topic.id}`}
              className="block"
            >
              <div className="group hover:bg-muted/50 rounded-lg p-3 transition-colors">
                <h3 className="text-sm font-medium group-hover:text-primary">
                  {topic.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {
                      FORUM_CATEGORIES.find((c) => c.id === topic.category)
                        ?.title
                    }
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {topic.views} views
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
