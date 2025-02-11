"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { TFeedbackForm } from "@/types";
import { useAddFeedback } from "@/hooks/use-feedback";
import useAuth from "@/stores/auth";
import useTheme from "@/stores/theme";
import { toast } from "@/hooks/use-toast";
import useNetworkStatus from "@/hooks/use-network-status";

export const aspectOptions = [
  "Kualitas Konten",
  "Navigasi",
  "Kuis",
  "Masalah Teknis",
  "Antarmuka Pengguna",
  "Pengalaman Belajar",
] as const;

const feedbackSchema = z.object({
  satisfaction: z.enum(["Sangat Puas", "Puas", "Netral", "Tidak Puas"], {
    required_error: "Silakan pilih tingkat kepuasan Anda",
  }),
  aspects: z.array(z.enum(aspectOptions)).min(1, {
    message: "Pilih minimal satu aspek",
  }),
  feedback: z.string().min(10, {
    message: "Feedback harus minimal 10 karakter",
  }),
});

export default function FeedbackForm() {
  // variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addFeedback = useAddFeedback();
  const { me } = useAuth();
  const { setModalSuccess } = useTheme();
  const { isOnline } = useNetworkStatus();

  const form = useForm<TFeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      satisfaction: "Puas",
      aspects: [],
      feedback: "",
    },
  });

  // functions
  async function onSubmit(data: TFeedbackForm) {
    try {
      if (!isOnline) {
        toast({
          title: "Mode Offline",
          description: "Tidak dapat melakukan aksi dalam mode offline",
          variant: "destructive",
        });
        return;
      }
      setIsSubmitting(true);

      await addFeedback.mutateAsync({
        aspects: data.aspects,
        satisfaction: data.satisfaction,
        feedback: data.feedback,
        user: me,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      form.reset();
      setModalSuccess({
        open: true,
        title: "Terima Kasih!",
        message: "Selamat🎉 Feedback Anda telah kami terima.",
        animation: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim feedback. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bagikan Feedback Anda</CardTitle>
        <CardDescription>
          Bantu kami meningkatkan pengalaman belajar Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="satisfaction"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>
                    Bagaimana kepuasan Anda terhadap materi belajar?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap sm:space-x-1 md:space-x-2 lg:space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sangat Puas" id="Sangat Puas" />
                        <Label htmlFor="Sangat Puas">Sangat Puas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Puas" id="Puas" />
                        <Label htmlFor="Puas">Puas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Netral" id="Netral" />
                        <Label htmlFor="Netral">Netral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Tidak Puas" id="Tidak Puas" />
                        <Label htmlFor="Tidak Puas">Tidak Puas</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aspects"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Apa aspek yang perlu ditingkatkan?</FormLabel>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {aspectOptions.map((aspect) => (
                      <FormField
                        key={aspect}
                        control={form.control}
                        name="aspects"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={aspect}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(aspect)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, aspect])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== aspect,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {aspect}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Bagikan pendapat, saran, atau masalah Anda..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" loading={isSubmitting}>
              {isOnline
                ? "Kirim Feedback"
                : "Feedback tidak tersedia (Offline)"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
