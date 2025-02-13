import React from "react";
import Link from "next/link";
import { Clock, BookOpen, Trophy, ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const moduleSample = {
  title: "Pengenalan Cloud Computing",
  description:
    "Pelajari konsep dasar cloud computing dan implementasinya dalam dunia digital modern",
  category: "Konsep Dasar",
  duration: "45 menit",
  chapters: 5,
  points: 100,
  prerequisites: ["Pengenalan Komputer", "Dasar Internet"],
};

export default function LearnModulHeader({
  modulId,
}: Readonly<{
  modulId: string;
}>) {
  return (
    <div className="space-y-4">
      <Link href="/learn">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Pembelajaran
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge>{moduleSample.category}</Badge>
            <Badge variant="outline">
              <Clock className="h-4 w-4 mr-1" />
              {moduleSample.duration}
            </Badge>
            <Badge variant="outline">
              <BookOpen className="h-4 w-4 mr-1" />
              {moduleSample.chapters} Bab
            </Badge>
            <Badge variant="outline">
              <Trophy className="h-4 w-4 mr-1" />
              {moduleSample.points} Poin
            </Badge>
          </div>
          <CardTitle className="text-base md:text-lg">
            {moduleSample.title}
          </CardTitle>
          <CardDescription>{moduleSample.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-sm md:text-base font-semibold">Prasyarat:</h3>
            <ul className="text-xs md:text-sm list-disc list-inside space-y-1">
              {moduleSample.prerequisites.map((prereq, index) => (
                <li key={index} className="text-muted-foreground">
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
