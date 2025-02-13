"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Crown } from "lucide-react";

import type { User } from "@/types";

interface LeaderboardPodiumProps {
  users: User[];
}

export default function LeaderboardPodium({
  users,
}: Readonly<LeaderboardPodiumProps>) {
  const [second, first, third] = [users[1], users[0], users[2]].map(
    (user, index) => ({
      ...user,
      position: index === 1 ? 1 : index === 0 ? 2 : 3,
    }),
  );

  return (
    <div className="relative flex items-end justify-center gap-4 py-8 px-4">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      {/* Second Place */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <Trophy className="h-6 w-6 text-[#C0C0C0]" />
          </div>
          <Image
            src={second.avatar || "/images/unavailable-profile.png"}
            alt={second.name}
            width={60}
            height={60}
            className="rounded-full border-4 border-[#C0C0C0] bg-white transition-transform hover:scale-105"
          />
        </div>
        <div className="mt-2 h-32 w-24 overflow-hidden rounded-t-lg bg-gradient-to-br from-[#C0C0C0] to-[#A0A0A0]">
          <div className="flex h-full flex-col items-center justify-end p-2 text-center">
            <span className="text-sm font-bold text-white">{second.name}</span>
            <span className="text-xs text-white/90">{second.points} pts</span>
          </div>
        </div>
      </motion.div>

      {/* First Place */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
            <Crown className="h-8 w-8 text-yellow-500" />
          </div>
          <Image
            src={first.avatar || "/images/unavailable-profile.png"}
            alt={first.name}
            width={80}
            height={80}
            className="rounded-full border-4 border-yellow-500 bg-white shadow-lg transition-transform hover:scale-105"
          />
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-white">
            1
          </div>
        </div>
        <div className="mt-2 h-40 w-28 overflow-hidden rounded-t-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
          <div className="flex h-full flex-col items-center justify-end p-2 text-center">
            <span className="text-sm font-bold text-white">{first.name}</span>
            <span className="text-xs text-white/90">{first.points} pts</span>
          </div>
        </div>
      </motion.div>

      {/* Third Place */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <Trophy className="h-6 w-6 text-[#CD7F32]" />
          </div>
          <Image
            src={third.avatar || "/images/unavailable-profile.png"}
            alt={third.name}
            width={60}
            height={60}
            className="rounded-full border-4 border-[#CD7F32] bg-white transition-transform hover:scale-105"
          />
        </div>
        <div className="mt-2 h-24 w-24 overflow-hidden rounded-t-lg bg-gradient-to-br from-[#CD7F32] to-[#A05720]">
          <div className="flex h-full flex-col items-center justify-end p-2 text-center">
            <span className="text-sm font-bold text-white">{third.name}</span>
            <span className="text-xs text-white/90">{third.points} pts</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
