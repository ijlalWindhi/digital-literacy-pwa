import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import Link from "next/link";

const popularTopics = [
  {
    id: "1",
    title: "Pentingnya Two-Factor Authentication",
    views: 1240,
    category: "Keamanan Internet",
  },
  {
    id: "2",
    title: "Belajar CSS Grid dari Awal",
    views: 890,
    category: "Pengembangan Web",
  },
  {
    id: "3",
    title: "Mengenal Cloud Computing",
    views: 756,
    category: "Konsep Dasar",
  },
  {
    id: "4",
    title: "Tips Menghindari Scam Online",
    views: 654,
    category: "Keamanan Internet",
  },
];

export default function PopularTopics() {
  return (
    <Card className="mt-9">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-base md:text-lg">Topik Populer</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {popularTopics.map((topic) => (
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
                    {topic.category}
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
