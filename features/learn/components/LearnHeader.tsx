import React from "react";
import { Award, Target } from "lucide-react";

import { Progress } from "@/components/ui/progress";

export default function LearnHeader() {
  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl bg-white p-6 shadow-lg">
      <div className="absolute right-0 top-0 h-64 w-64 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#4F46E5"
            d="M45.7,-70.5C58.9,-62.5,69.3,-48.4,75.9,-32.5C82.5,-16.7,85.4,1,82.4,17.2C79.4,33.4,70.6,48.2,57.9,56.9C45.2,65.6,28.7,68.2,12.5,69.7C-3.7,71.2,-19.6,71.5,-33.7,66.2C-47.8,60.9,-60.1,50,-68.3,36.2C-76.5,22.4,-80.7,5.7,-78.7,-10C-76.7,-25.8,-68.5,-40.6,-56.6,-49.4C-44.7,-58.2,-29,-61,-14.3,-64.5C0.4,-68,15.1,-72.2,31.5,-73.8C47.8,-75.4,65.9,-74.4,45.7,-70.5Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex-1">
          <div className="mb-3 md:mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            <h2 className="text-sm md:text-lg font-semibold leading-none tracking-tight">
              Progress Belajar
            </h2>
          </div>
          <div className="mb-4 grid gap-2 md:gap-4">
            <div>
              <div className="mb-2 flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Modul Selesai</span>
                <span className="font-medium">15/45</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">Total Poin</span>
                <span className="font-medium">1500/2000</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-3 md:mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" />
            <h2 className="text-sm md:text-lg font-semibold leading-none tracking-tight">
              Level 6
            </h2>
          </div>
          <div className="rounded-lg bg-indigo-50 p-2 md:p-4 text-xs md:text-sm">
            <div className="mb-2 text-gray-600">Menuju Level 7</div>
            <Progress value={75} className="h-2" />
            <div className="mt-2 text-right font-medium text-indigo-600">
              1500/2000 XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
