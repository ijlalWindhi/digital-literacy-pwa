import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import QuizDetailInformation from "./QuizDetailInformation";
import { Button } from "@/components/ui/button";

export default function QuizDetail({ quizId }: Readonly<{ quizId: string }>) {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-2">
        <Link href="/quiz">
          <Button variant="ghost">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Daftar Kuis
          </Button>
        </Link>
      </div>
      <QuizDetailInformation quizId={quizId} />
    </div>
  );
}
