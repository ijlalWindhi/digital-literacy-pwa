import Link from "next/link";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { useRecentDiscussions } from "@/hooks/use-forum";
import { FORUM_CATEGORIES } from "@/utils/forum-categories";

export default function RecentDiscussions() {
  // variables
  const { data: discussions, isLoading } = useRecentDiscussions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Diskusi Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
          {discussions?.map((discussion) => (
            <Link
              key={discussion.id}
              href={`/forum/thread/${discussion.id}`}
              className="block"
            >
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:gap-4">
                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {discussion.author.name[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {discussion.title || "-"}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {discussion.author.name || "-"}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(
                            new Date(discussion.created_at),
                            {
                              addSuffix: true,
                              locale: id,
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="text-xs text-center min-w-fit">
                    {
                      FORUM_CATEGORIES.find((c) => c.id === discussion.category)
                        ?.title
                    }
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{discussion.comments}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{discussion.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
