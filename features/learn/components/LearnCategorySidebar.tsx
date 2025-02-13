import React from "react";
import Link from "next/link";
import { Award, FileText, Star, Trophy, FolderClosed } from "lucide-react";

export default function LearnCategorySidebar() {
  return (
    <div className="space-y-6">
      {/* Achievements */}
      <div className="rounded-xl bg-white p-6 shadow-sm border">
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold">Pencapaian</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 text-center">
            <div className="mx-auto mb-2 flex h-9 md:h-12 w-9 md:w-12 items-center justify-center rounded-full bg-yellow-100">
              <Star className="h-4 md:h-6 w-4 md:w-6 text-yellow-600" />
            </div>
            <div className="text-xs md:text-sm font-medium">Pemula</div>
            <div className="text-xs text-gray-600">Selesaikan 2 modul</div>
          </div>
          <div className="rounded-lg border p-4 text-center opacity-50">
            <div className="mx-auto mb-2 flex h-9 md:h-12 w-9 md:w-12 items-center justify-center rounded-full bg-gray-100">
              <Trophy className="h-4 md:h-6 w-4 md:w-6 text-gray-400" />
            </div>
            <div className="text-xs md:text-sm font-medium">Expert</div>
            <div className="text-xs text-gray-600">Selesaikan semua modul</div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="rounded-xl bg-white p-6 shadow-sm border">
        <div className="mb-4 flex items-center gap-2">
          <FolderClosed className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold">Materi Pendukung</h2>
        </div>
        <div className="space-y-3">
          <Link
            href="#"
            target="_blank"
            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50"
          >
            <FileText className="h-5 w-5 text-indigo-600" />
            <div>
              <div className="text-xs md:text-sm font-medium">
                Panduan Belajar.pdf
              </div>
              <div className="text-xs text-gray-600">1.2 MB • PDF</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
