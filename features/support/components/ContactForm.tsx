import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function ContactForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontak Tim Dukungan</CardTitle>
        <CardDescription>
          Kami biasanya merespons dalam waktu 24 jam pada hari kerja.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nama
              </label>
              <Input id="name" placeholder="Nama kamu" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subjek
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Topik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pembelajaran">Pembelajaran</SelectItem>
                <SelectItem value="quiz">Kuis & Latihan</SelectItem>
                <SelectItem value="forum">Forum Diskusi</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Pesan
            </label>
            <Textarea
              id="message"
              placeholder="Deskripsikan masalah atau pertanyaan Anda secara detail..."
              className="min-h-[150px]"
            />
          </div>
          <Button className="w-full">Kirim Pesan</Button>
        </form>
      </CardContent>
    </Card>
  );
}
