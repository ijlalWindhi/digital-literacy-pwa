"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  LifeBuoy,
  Send,
  Home,
  Award,
  MessageSquare,
} from "lucide-react";

import { NavMenu } from "@/components/layout/nav-menu";
import { NavUser } from "@/components/layout/nav-user";
import { NavSecondary } from "@/components/layout/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import useAuth from "@/stores/auth";

const data = {
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // variables
  const { me } = useAuth();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-secondary text-sidebar-primary-foreground">
                  <Image
                    src={"/images/logo.webp"}
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Digital Literacy
                  </span>
                  <span className="truncate text-xs">Dhisa Production</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavMenu menu={data.menu} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={me} />
      </SidebarFooter>
    </Sidebar>
  );
}
