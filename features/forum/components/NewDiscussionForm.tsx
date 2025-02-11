import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewDiscussionForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Diskusi</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Judul Diskusi
            </label>
            <Input id="title" placeholder="Masukkan judul diskusi" />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Kategori
            </label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic-concepts">Konsep Dasar</SelectItem>
                <SelectItem value="internet-safety">
                  Keamanan Internet
                </SelectItem>
                <SelectItem value="web-development">
                  Pengembangan Web
                </SelectItem>
                <SelectItem value="digital-society">
                  Masyarakat Digital
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Isi Diskusi
            </label>
            <Textarea
              id="content"
              placeholder="Tulis isi diskusi Anda di sini..."
              className="min-h-[200px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Link href="/forum">
              <Button variant="outline">Batal</Button>
            </Link>
            <Button>Buat Diskusi</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
