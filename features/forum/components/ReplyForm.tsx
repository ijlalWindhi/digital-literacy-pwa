import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReplyFormProps {
  threadId: string;
}

export default function ReplyForm({ threadId }: ReplyFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tulis Balasan</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Textarea
            placeholder="Tulis balasan Anda di sini..."
            className="min-h-[150px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Batal</Button>
            <Button>Kirim Balasan</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
