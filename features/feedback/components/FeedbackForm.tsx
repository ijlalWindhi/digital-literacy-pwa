import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function FeedbackForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bagikan Feedback Anda</CardTitle>
        <CardDescription>
          Bantu kami meningkatkan pengalaman belajar Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-sm md:text-base">
              Bagaimana kepuasan Anda terhadap materi belajar?
            </h3>
            <RadioGroup
              defaultValue="satisfied"
              className="flex flex-wrap sm:space-x-1 md:space-x-2 lg:space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                <Label htmlFor="very-satisfied">Sangat Puas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <Label htmlFor="satisfied">Puas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Netral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unsatisfied" id="unsatisfied" />
                <Label htmlFor="unsatisfied">Tidak Puas</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Apa aspek yang perlu ditingkatkan?</Label>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Kualitas Konten",
                "Navigasi",
                "Kuis",
                "Masalah Teknis",
                "Antarmuka Pengguna",
                "Pengalaman Belajar",
              ].map((aspect) => (
                <Label key={aspect} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>{aspect}</span>
                </Label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="font-medium">
              Detail Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Bagikan pendapat, saran, atau masalah Anda..."
              className="min-h-[150px]"
            />
          </div>

          <Button className="w-full">Kirim Feedback</Button>
        </form>
      </CardContent>
    </Card>
  );
}
