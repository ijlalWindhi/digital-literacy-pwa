"use client";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useActiveTab } from "@/utils/active-tab";

export function NavMenu({
  menu,
}: {
  readonly menu: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  // variables
  const activeTab = useActiveTab();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
      <SidebarMenu>
        {menu.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={activeTab?.url === item.url}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
