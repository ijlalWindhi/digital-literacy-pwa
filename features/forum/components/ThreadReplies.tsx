"use client";
import { ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useIncrementCommentLikeCount,
  useForumComments,
} from "@/hooks/use-forum";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/stores/auth";

interface ThreadRepliesProps {
  threadId: string;
}

export default function ThreadReplies({ threadId }: ThreadRepliesProps) {
  // variables
  const { data: replies, isLoading } = useForumComments(threadId);
  const incrementCommentLikeCount = useIncrementCommentLikeCount();
  const loadingLike = incrementCommentLikeCount.isPending;
  const { me } = useAuth();

  // functions
  const handleLike = (commentId: string) => {
    try {
      if (me) {
        incrementCommentLikeCount.mutate({
          commentId,
          userId: me.uid,
        });
      }
    } catch (error) {
      console.error("Error from handleLike: ", error);
      toast({
        title: "Gagal",
        description: "Gagal menyukai balasan",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm md:text-base font-bold">
        Balasan ({replies?.length ?? 0})
      </h2>
      {replies?.map((reply) => (
        <Card key={reply.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex md:flex-col items-center md:items-center gap-4 md:w-32">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {reply?.author?.name[0] || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm font-semibold text-center">
                  {reply.author.name || "-"}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="prose max-w-none">
                  <p className="text-xs md:text-sm">{reply.content}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      loading={loadingLike}
                      onClick={() => handleLike}
                    >
                      <ThumbsUp
                        className="h-4 w-4 mr-2 "
                        color={
                          reply?.user_likes?.includes(me?.uid) ? "red" : "gray"
                        }
                      />
                      {reply?.likes ?? 0} Suka
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {reply?.created_at
                      ? formatDistanceToNow(new Date(reply?.created_at), {
                          addSuffix: true,
                          locale: id,
                        })
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
