"use client";
import Link from "next/link";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { useForums } from "@/hooks/use-forum";
import { TForumCategory } from "@/types";

interface ThreadListProps {
  readonly categoryId: string;
}

export default function ThreadList({ categoryId }: ThreadListProps) {
  // variables
  const { data: threads, isLoading } = useForums(categoryId as TForumCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diskusi dalam Kategori Ini</CardTitle>
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
          {threads?.length === 0 && !isLoading && (
            <div className="text-sm md:text-base text-center text-muted-foreground">
              Belum ada diskusi
            </div>
          )}
          {threads?.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/thread/${thread.id}`}
              className="block"
            >
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:gap-4">
                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {thread.author.name[0] ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {thread.title || "-"}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {thread.author.name || "-"}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(thread.created_at), {
                            addSuffix: true,
                            locale: id,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{thread?.comments || 0}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{thread.likes || 0}</span>
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
