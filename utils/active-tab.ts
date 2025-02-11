import { usePathname } from "next/navigation";

import MENU from "@/constants/menu";

export const useActiveTab = () => {
  const pathname = usePathname();
  const allItems = [...MENU.navSecondary, ...MENU.menu, ...MENU.other];
  return allItems.find((item) => item.url === pathname);
};
