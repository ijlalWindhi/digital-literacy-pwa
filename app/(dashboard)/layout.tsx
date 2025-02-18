"use client";
import { Loader2 } from "lucide-react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ModalSuccess from "@/components/common/modal-success";

import { useActiveTab } from "@/utils/active-tab";
import useTheme from "@/stores/theme";

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // variables
  const { isLoading } = useTheme();

  return (
    <SidebarProvider>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-500/60 z-50 absolute">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
      <ModalSuccess />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-semibold text-primary text-lg">
              {useActiveTab()?.name ?? "Halaman Utama"}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
