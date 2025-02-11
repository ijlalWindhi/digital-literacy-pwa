import React from "react";

import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

export default function Feedback() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FeedbackForm />
        </div>
        <div>
          <FeedbackList />
        </div>
      </div>
    </div>
  );
}
