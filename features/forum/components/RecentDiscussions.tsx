import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

const discussions = [
  {
    id: "1",
    title: "Bagaimana cara mengamankan akun media sosial?",
    author: {
      name: "Ahmad S.",
      avatar: "/placeholder.svg",
    },
    category: "Keamanan Internet",
    replies: 12,
    likes: 24,
    timeAgo: "2 jam yang lalu",
  },
  {
    id: "2",
    title: "Tips membuat password yang kuat",
    author: {
      name: "Budi R.",
      avatar: "/placeholder.svg",
    },
    category: "Keamanan Internet",
    replies: 8,
    likes: 15,
    timeAgo: "5 jam yang lalu",
  },
  {
    id: "3",
    title: "Pengalaman belajar HTML dan CSS",
    author: {
      name: "Citra D.",
      avatar: "/placeholder.svg",
    },
    category: "Pengembangan Web",
    replies: 20,
    likes: 32,
    timeAgo: "1 hari yang lalu",
  },
];

export default function RecentDiscussions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Diskusi Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Link
              key={discussion.id}
              href={`/forum/thread/${discussion.id}`}
              className="block"
            >
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:gap-4">
                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
                    <Avatar>
                      <AvatarImage src={discussion.author.avatar} />
                      <AvatarFallback>
                        {discussion.author.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {discussion.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {discussion.timeAgo}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className="text-xs text-center min-w-fit">
                    {discussion.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{discussion.replies}</span>
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
