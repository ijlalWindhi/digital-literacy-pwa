import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Globe, Shield } from "lucide-react";

interface CategoryInfoProps {
  readonly categoryId: string;
}

export default function CategoryInfo({ categoryId }: CategoryInfoProps) {
  // In a real app, fetch category data based on categoryId
  const categories = {
    "basic-concepts": {
      icon: Book,
      title: "Konsep Dasar",
      description: "Diskusi tentang konsep dasar literasi digital",
      threads: 24,
      color: "bg-blue-500",
    },
    "internet-safety": {
      icon: Shield,
      title: "Keamanan Internet",
      description: "Tips dan diskusi tentang keamanan online",
      threads: 18,
      color: "bg-green-500",
    },
    "web-development": {
      icon: Code,
      title: "Pengembangan Web",
      description: "Diskusi seputar pembuatan website",
      threads: 32,
      color: "bg-purple-500",
    },
    "digital-society": {
      icon: Globe,
      title: "Masyarakat Digital",
      description: "Dampak teknologi pada masyarakat",
      threads: 15,
      color: "bg-orange-500",
    },
  };

  const category = categories[categoryId as keyof typeof categories];

  if (!category) {
    return <div>Kategori tidak ditemukan</div>;
  }

  const CategoryIcon = category.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className={`p-2 rounded-lg ${category.color}`}>
            <CategoryIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{category.threads} diskusi</Badge>
          <span className="text-sm text-muted-foreground">
            Terakhir diperbarui: 2 jam yang lalu
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
