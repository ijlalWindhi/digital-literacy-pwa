import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface ThreadListProps {
  categoryId: string;
}

export function ThreadList({ categoryId }: ThreadListProps) {
  // In a real app, fetch threads based on categoryId
  const threads = [
    {
      id: "1",
      title: "Bagaimana cara mengamankan akun media sosial?",
      author: {
        name: "Ahmad S.",
        avatar: "/placeholder.svg",
      },
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
      replies: 8,
      likes: 15,
      timeAgo: "5 jam yang lalu",
    },
    {
      id: "3",
      title: "Pengalaman menggunakan VPN",
      author: {
        name: "Citra D.",
        avatar: "/placeholder.svg",
      },
      replies: 20,
      likes: 32,
      timeAgo: "1 hari yang lalu",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diskusi dalam Kategori Ini</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/thread/${thread.id}`}
              className="block"
            >
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={thread.author.avatar} />
                    <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{thread.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {thread.author.name}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {thread.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{thread.replies}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">{thread.likes}</span>
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
