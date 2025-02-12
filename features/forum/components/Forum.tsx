"use client";
import ForumHeader from "./ForumHeader";
import ForumCategories from "./ForumCategories";
import RecentDiscussions from "./RecentDiscussions";
import PopularTopics from "./PopularTopics";

export default function Forum() {
  return (
    <div className="container mx-auto py-6 px-4">
      <ForumHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <ForumCategories />
          <RecentDiscussions />
        </div>
        <div className="space-y-6">
          <PopularTopics />
        </div>
      </div>
      <div className="bg-blue-500 hidden"></div>
      <div className="bg-green-500 hidden"></div>
      <div className="bg-purple-500 hidden"></div>
      <div className="bg-orange-500 hidden"></div>
    </div>
  );
}
