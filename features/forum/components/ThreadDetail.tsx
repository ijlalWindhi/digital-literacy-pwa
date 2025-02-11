import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface ThreadDetailProps {
  threadId: string;
}

export default function ThreadDetail({ threadId }: ThreadDetailProps) {
  // In a real app, fetch thread data based on threadId
  const thread = {
    title: "Bagaimana cara mengamankan akun media sosial?",
    content: `
      Halo teman-teman,
      
      Saya ingin berbagi pengalaman dan meminta saran tentang cara mengamankan akun media sosial. Akhir-akhir ini banyak sekali kasus pembobolan akun dan saya ingin memastikan akun saya aman.

      Beberapa hal yang sudah saya lakukan:
      1. Menggunakan password yang kuat
      2. Mengaktifkan two-factor authentication
      
      Apakah ada saran lain yang bisa diterapkan?
    `,
    author: {
      name: "Ahmad S.",
      avatar: "/placeholder.svg",
      role: "Member",
    },
    category: "Keamanan Internet",
    createdAt: "2 jam yang lalu",
    likes: 24,
    replies: 12,
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <Badge className="text-xs">{thread.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {thread.createdAt}
            </span>
          </div>
          <h1 className="text-base md:text-lg font-bold">{thread.title}</h1>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex md:flex-col items-center md:items-center md:w-32">
            <Avatar className="h-10 w-10">
              <AvatarImage src={thread.author.avatar} />
              <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-semibold text-center">
              {thread.author.name}
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="prose max-w-none">
              {thread.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-2 text-xs md:text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                {thread.likes} Suka
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {thread.replies} Balasan
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
