import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentFeedback = [
  {
    user: "John D.",
    date: "2 days ago",
    comment:
      "The interactive quizzes are very helpful for learning. Would love to see more of them!",
    rating: "Very Satisfied",
  },
  {
    user: "Sarah M.",
    date: "1 week ago",
    comment:
      "Navigation could be improved, but overall content quality is excellent.",
    rating: "Satisfied",
  },
  {
    user: "Alex R.",
    date: "2 weeks ago",
    comment:
      "Great platform for learning digital skills. The pace is perfect for beginners.",
    rating: "Very Satisfied",
  },
];

export default function FeedbackList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFeedback.map((feedback, index) => (
            <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-6 w-6 md:h-8 md:w-8">
                  <AvatarFallback>{feedback.user[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm md:text-base">
                    {feedback.user}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500">
                    {feedback.date}
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                {feedback.comment}
              </p>
              <div className="mt-2 text-xs md:text-sm text-gray-500">
                Penilaian: {feedback.rating}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
