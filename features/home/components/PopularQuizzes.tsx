"use client";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Quiz } from "@/types";

interface PopularQuizzesProps {
  quizzes: Quiz[];
}

export default function PopularQuizzes({
  quizzes,
}: Readonly<PopularQuizzesProps>) {
  const getDifficultyColor = (difficulty: Quiz["difficulty"]) => {
    switch (difficulty) {
      case "Pemula":
        return "bg-gradient-to-r from-green-500 to-green-600";
      case "Menengah":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600";
      case "Lanjutan":
        return "bg-gradient-to-r from-red-500 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Kuis Populer</span>
          <Badge variant="secondary" className="rounded-full">
            Minggu Ini
          </Badge>
        </CardTitle>
        <CardDescription>Kuis yang paling banyak diikuti</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm md:text-base font-medium transition-colors group-hover:text-primary">
                  {quiz.title}
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-muted-foreground">{quiz.category}</span>
                  <Badge
                    variant="secondary"
                    className={`${getDifficultyColor(quiz.difficulty)} text-white`}
                  >
                    {quiz.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-xs md:text-sm">
                    {quiz.participants}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100 rounded-full"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
