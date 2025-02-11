import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Flag } from "lucide-react";

interface ThreadRepliesProps {
  threadId: string;
}

export default function ThreadReplies({ threadId }: ThreadRepliesProps) {
  // In a real app, fetch replies based on threadId
  const replies = [
    {
      id: 1,
      content:
        "Saran tambahan: Selalu logout dari perangkat yang bukan milik pribadi dan periksa aktivitas login secara berkala.",
      author: {
        name: "Budi R.",
        avatar: "/placeholder.svg",
        role: "Expert",
      },
      createdAt: "1 jam yang lalu",
      likes: 8,
    },
    {
      id: 2,
      content:
        "Jangan lupa untuk tidak menggunakan password yang sama untuk semua akun media sosial. Gunakan password manager untuk membantu mengelola password yang berbeda-beda.",
      author: {
        name: "Citra D.",
        avatar: "/placeholder.svg",
        role: "Member",
      },
      createdAt: "30 menit yang lalu",
      likes: 5,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Balasan ({replies.length})</h2>
      {replies.map((reply) => (
        <Card key={reply.id}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex md:flex-col items-center md:items-center gap-4 md:w-32">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={reply.author.avatar} />
                  <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <div className="font-semibold">{reply.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {reply.author.role}
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="prose max-w-none">
                  <p>{reply.content}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {reply.likes} Suka
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4 mr-2" />
                      Laporkan
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reply.createdAt}
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
