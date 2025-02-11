import {
  BookOpen,
  LifeBuoy,
  Send,
  Home,
  Award,
  MessageSquare,
  User,
  type LucideIcon,
} from "lucide-react";

interface IMenuItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface IMenu {
  navSecondary: Array<IMenuItem>;
  menu: Array<IMenuItem>;
  other: Array<IMenuItem>;
}

const MENU: IMenu = {
  navSecondary: [
    {
      name: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      name: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  menu: [
    {
      name: "Halaman Utama",
      url: "/",
      icon: Home,
    },
    {
      name: "Pembelajaran",
      url: "/learn",
      icon: BookOpen,
    },
    {
      name: "Kuis & Latihan",
      url: "/quiz",
      icon: Award,
    },
    {
      name: "Forum Diskusi",
      url: "/forum",
      icon: MessageSquare,
    },
  ],
  other: [
    {
      name: "Profil",
      url: "/account",
      icon: User,
    },
  ],
};

export default MENU;
