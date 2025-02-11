import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Book, Code, Globe, Shield } from "lucide-react";

const categories = [
  {
    id: "basic-concepts",
    icon: Book,
    title: "Konsep Dasar",
    description: "Diskusi tentang konsep dasar literasi digital",
    threads: 24,
    color: "bg-blue-500",
  },
  {
    id: "internet-safety",
    icon: Shield,
    title: "Keamanan Internet",
    description: "Tips dan diskusi tentang keamanan online",
    threads: 18,
    color: "bg-green-500",
  },
  {
    id: "web-development",
    icon: Code,
    title: "Pengembangan Web",
    description: "Diskusi seputar pembuatan website",
    threads: 32,
    color: "bg-purple-500",
  },
  {
    id: "digital-society",
    icon: Globe,
    title: "Masyarakat Digital",
    description: "Dampak teknologi pada masyarakat",
    threads: 15,
    color: "bg-orange-500",
  },
];

export default function ForumCategories() {
  return (
    <div className="space-y-2">
      <h2 className="text-base md:text-lg font-semibold leading-none tracking-tight">
        Kategori
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.id}>
            <Link href={`/forum/${category.id}`}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm md:text-base">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge className="text-xs" variant="secondary">
                    {category.threads} diskusi
                  </Badge>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Lihat Diskusi →
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
