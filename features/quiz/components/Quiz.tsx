import React from "react";

import QuizHeader from "./QuizHeader";
import QuizCategories from "./QuizCategories";
import RecentQuizzes from "./RecentQuizzes";
import QuizProgress from "./QuizProgress";

export default function Quiz() {
  return (
    <div className="container mx-auto py-6 px-4">
      <QuizHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <QuizCategories />
          <RecentQuizzes />
        </div>
        <div>
          <QuizProgress />
        </div>
      </div>
    </div>
  );
}
