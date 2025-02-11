"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { TContactForm } from "@/types";
import useTheme from "@/stores/theme";
import { contactSchema } from "@/utils/schema/contact.schema";
import { useAddContact } from "@/hooks/use-contact";
import { toast } from "@/hooks/use-toast";
import useNetworkStatus from "@/hooks/use-network-status";

export default function ContactForm() {
  // variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addContact = useAddContact();
  const { setModalSuccess } = useTheme();
  const { isOnline } = useNetworkStatus();

  const form = useForm<TContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: undefined,
      message: "",
    },
  });

  // functions
  async function onSubmit(data: TContactForm) {
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
      await addContact.mutateAsync(data);

      form.reset();
      setModalSuccess({
        open: true,
        title: "Terima Kasih!",
        message: "Feedback Anda telah kami terima.",
        animation: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontak Tim Dukungan</CardTitle>
        <CardDescription>
          Kami biasanya merespons dalam waktu 24 jam pada hari kerja.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama kamu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subjek</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Topik" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pembelajaran">Pembelajaran</SelectItem>
                      <SelectItem value="quiz">Kuis & Latihan</SelectItem>
                      <SelectItem value="forum">Forum Diskusi</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsikan masalah atau pertanyaan Anda secara detail..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" loading={isSubmitting}>
              {isOnline ? "Kirim Pesan" : "Pesan tidak tersedia (Offline)"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
