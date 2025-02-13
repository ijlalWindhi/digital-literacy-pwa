import React from "react";
import { Trophy, Zap, Target, Calendar } from "lucide-react";

import {
  topUsers,
  popularQuizzes,
  recentForumPosts,
  latestLearning,
} from "@/constants/dashboard";

import LeaderboardPodium from "./LeaderboardPodium";
import PopularQuizzes from "./PopularQuizzes";
import LatestLearning from "./LatestLearning";
import ForumDiscussions from "./ForumDiscussions";
import StatsCard from "./StatsCard";
import AchievementCard from "./AchievementCard";
import Header from "./Header";

export default function Home() {
  return (
    <div className="container mx-auto space-y-4 md:space-y-8">
      {/* Header */}
      <Header />

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Poin"
          value="1,234"
          icon={<Zap className="h-5 md:h-6 w-5 md:w-6 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Kuis Diselesaikan"
          value="24"
          icon={<Target className="h-5 md:h-6 w-5 md:w-6 text-primary" />}
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard
          title="Streak Harian"
          value="7 Hari"
          icon={<Calendar className="h-5 md:h-6 w-5 md:w-6 text-primary" />}
        />
        <StatsCard
          title="Peringkat"
          value="#12"
          icon={<Trophy className="h-5 md:h-6 w-5 md:w-6 text-primary" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Achievements */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AchievementCard
          title="Pembelajar Konsisten"
          description="Belajar 7 hari berturut-turut"
          type="daily"
          progress={70}
        />
        <AchievementCard
          title="Master Web Development"
          description="Selesaikan semua modul Web Development"
          type="milestone"
          progress={40}
        />
      </div>

      {/* Leaderboard Section */}
      <div className="rounded-xl border bg-card text-card-foreground">
        <div className="space-y-1.5 p-6">
          <h2 className="text-xl lg:text-2xl font-semibold">Papan Peringkat</h2>
          <p className="text-sm text-muted-foreground">
            Top 3 pembelajar dengan performa terbaik minggu ini
          </p>
        </div>
        <LeaderboardPodium users={topUsers} />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <LatestLearning modules={latestLearning} />
        <PopularQuizzes quizzes={popularQuizzes} />
      </div>

      {/* Forum Discussions */}
      <ForumDiscussions posts={recentForumPosts} />
    </div>
  );
}
