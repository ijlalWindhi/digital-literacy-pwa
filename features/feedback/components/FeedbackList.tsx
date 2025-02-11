"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useFeedback } from "@/hooks/use-feedback";
import useNetworkStatus from "@/hooks/use-network-status";

export default function FeedbackList() {
  const { data: feedbacks, isLoading } = useFeedback();
  const isOnline = useNetworkStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbacks?.length === 0 && (
            <div className="text-xs md:text-sm text-center text-gray-500">
              Belum ada feedback
            </div>
          )}
          {feedbacks?.map((feedback) => (
            <div
              key={feedback.id}
              className="border-b last:border-0 pb-4 last:pb-0"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-6 w-6 md:h-8 md:w-8">
                  <AvatarFallback>
                    {feedback.user?.email?.charAt(0) || "-"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-xs md:text-sm">
                    {feedback.user?.email || "-"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                {feedback.feedback}
              </p>
              <div className="mt-2 text-xs md:text-sm text-gray-500">
                Penilaian: {feedback.satisfaction}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
