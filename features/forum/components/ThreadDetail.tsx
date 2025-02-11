"use client";
import { useEffect } from "react";
import { ThumbsUp, MessageCircle, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useDetailForum,
  useIncrementLikeCount,
  useIncrementViewCount,
} from "@/hooks/use-forum";
import { FORUM_CATEGORIES } from "@/utils/forum-categories";
import useAuth from "@/stores/auth";
import { toast } from "@/hooks/use-toast";

interface ThreadDetailProps {
  threadId: string;
}

export default function ThreadDetail({ threadId }: ThreadDetailProps) {
  // variables
  const { data: thread, isLoading } = useDetailForum(threadId);
  const incrementViewCount = useIncrementViewCount(threadId);
  const incrementLikeCount = useIncrementLikeCount();
  const loadingLike = incrementLikeCount.isPending;
  const { me } = useAuth();

  // functions
  const handleLike = () => {
    try {
      if (me) {
        incrementLikeCount.mutate({
          forumId: threadId,
          userId: me.uid,
        });
      }
    } catch (error) {
      console.error("Error from handleLike: ", error);
      toast({
        title: "Gagal",
        description: "Gagal menyukai diskusi",
        variant: "destructive",
      });
    }
  };

  // lifecycle
  useEffect(() => {
    incrementViewCount.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader className="border-b">
        {isLoading ? (
          <>
            <div className="flex justify-between">
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/4 h-6" />
            </div>
            <Skeleton className="w-1/2 h-8 mt-4" />
          </>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="text-xs">
                {FORUM_CATEGORIES.find((c) => c.id === thread?.category)?.title}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {thread?.created_at
                  ? formatDistanceToNow(new Date(thread?.created_at), {
                      addSuffix: true,
                      locale: id,
                    })
                  : "-"}
              </span>
            </div>
            <h1 className="text-base md:text-lg font-bold">
              {thread?.title ?? "-"}
            </h1>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <>
            <div className="flex items-start gap-4">
              <Skeleton className="rounded-lg w-16 h-16" />
              <div className="flex flex-col w-full gap-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
            <Skeleton className="w-full h-16 mt-4" />
          </>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex md:flex-col items-center md:items-center md:w-32">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {thread?.author?.name[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm font-semibold text-center">
                {thread?.author?.name ?? "-"}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="prose max-w-none">
                <p className="text-xs md:text-sm">
                  {thread?.content ?? "Memuat konten..."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  loading={loadingLike}
                  onClick={handleLike}
                >
                  <ThumbsUp
                    className="h-4 w-4 mr-2 "
                    color={
                      thread?.user_likes?.includes(me?.uid) ? "red" : "gray"
                    }
                  />
                  {thread?.likes ?? 0} Suka
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {thread?.comments ?? 0} Balasan
                </Button>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  {thread?.views ?? 0} Dilihat
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
