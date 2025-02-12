"use client";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";

const Book = dynamic(() => import("lucide-react").then((mod) => mod.Book));
const Smartphone = dynamic(() =>
  import("lucide-react").then((mod) => mod.Smartphone),
);
const Code = dynamic(() => import("lucide-react").then((mod) => mod.Code));
const Shield = dynamic(() => import("lucide-react").then((mod) => mod.Shield));

interface CategoryIconProps extends LucideProps {
  category: string;
  className?: string;
}

export function CategoryIcon({
  category,
  className,
  ...props
}: Readonly<CategoryIconProps>) {
  const iconProps = {
    ...props,
    className,
  };

  switch (category) {
    case "konsep-dasar":
      return <Book {...iconProps} />;
    case "pengembangan-mobile":
      return <Smartphone {...iconProps} />;
    case "pengembangan-web":
      return <Code {...iconProps} />;
    case "dev-sec":
      return <Shield {...iconProps} />;
    default:
      return null;
  }
}
