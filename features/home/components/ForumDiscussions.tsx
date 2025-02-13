import { MessageCircle, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ForumPost } from "@/types";

interface ForumDiscussionsProps {
  posts: ForumPost[];
}

export default function ForumDiscussions({
  posts,
}: Readonly<ForumDiscussionsProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diskusi Forum Terbaru</CardTitle>
        <CardDescription>Diskusi yang sedang aktif</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <h3 className="text-sm md:text-base font-medium">
                  {post.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Dibuat oleh {post.author}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.replies}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.lastActivity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
