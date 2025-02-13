"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Save } from "lucide-react";
import { useState } from "react";

interface LearnModulChapterNotesProps {
  modulId: string;
  chapterId: string;
}

export default function LearnModulChapterNotes({
  modulId,
  chapterId,
}: LearnModulChapterNotesProps) {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content:
        "Cloud computing memungkinkan akses on-demand ke sumber daya komputasi.",
      timestamp: "10:23",
      saved: true,
    },
    {
      id: 2,
      content:
        "Lima karakteristik utama cloud computing yang perlu diingat untuk ujian.",
      timestamp: "15:45",
      saved: true,
    },
  ]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

    setNotes([
      ...notes,
      {
        id: notes.length + 1,
        content: newNote,
        timestamp,
        saved: true,
      },
    ]);
    setNewNote("");
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Catatan Pembelajaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Tulis catatan baru..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Catatan
            </Button>
          </div>

          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-3 border rounded-lg space-y-2 bg-muted/50"
              >
                <p className="text-xs sm:text-sm">{note.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {note.timestamp}
                  </span>
                  {!note.saved && (
                    <Button size="sm" variant="ghost">
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
