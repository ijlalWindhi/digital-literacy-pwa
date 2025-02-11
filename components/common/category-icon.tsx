import { Book, Smartphone, Code, Shield } from "lucide-react";

interface CategoryIconProps {
  category: string;
  className?: string;
}

export function CategoryIcon({
  category,
  className,
}: Readonly<CategoryIconProps>) {
  switch (category) {
    case "konsep-dasar":
      return <Book className={className} />;
    case "pengembangan-mobile":
      return <Smartphone className={className} />;
    case "pengembangan-web":
      return <Code className={className} />;
    case "dev-sec":
      return <Shield className={className} />;
    default:
      return null;
  }
}
