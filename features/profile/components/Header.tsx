"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useAuth from "@/stores/auth";
import useTheme from "@/stores/theme";
import { useLogout } from "@/hooks/use-auth";

export default function Header() {
  // variables
  const router = useRouter();
  const { me } = useAuth();
  const { setModalEditProfile } = useTheme();
  const logout = useLogout();

  // functions
  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error from handleLogout:", error);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col gap-3 sm:gap-8 sm:flex-row bg-gray-50 rounded-2xl p-4">
      <div className="flex gap-4 flex-col justify-center items-center sm:justify-start sm:flex-row">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={me.image}
            alt="avatar"
            className="object-cover w-full h-full rounded-full"
          />
          <AvatarFallback>
            {me?.name?.charAt(0)?.toUpperCase() || "-"}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold">
            {me?.name || "-"}
          </h1>
          <h2 className="text-sm sm:text-base">{me?.email || "-"}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Button onClick={() => setModalEditProfile(true)}>
          <Pencil size={20} />
          <span className="text-sm md:text-base">Ubah Profile</span>
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut size={20} />
          <span className="text-sm md:text-base">Keluar</span>
        </Button>
      </div>
    </div>
  );
}
