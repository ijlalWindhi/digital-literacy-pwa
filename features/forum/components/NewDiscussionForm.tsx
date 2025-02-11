"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import { useAddForum } from "@/hooks/use-forum";
import useNetworkStatus from "@/hooks/use-network-status";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/stores/auth";
import useTheme from "@/stores/theme";
import { TForumForm } from "@/types";
import { forumSchema } from "@/utils/schema/forum.schema";
import { useRouter } from "next/navigation";

export default function NewDiscussionForm() {
  // variables
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { me } = useAuth();
  const { setModalSuccess } = useTheme();
  const addForum = useAddForum(me);
  const { isOnline } = useNetworkStatus();

  const form = useForm<TForumForm>({
    resolver: zodResolver(forumSchema),
    defaultValues: {
      title: "",
      content: "",
      category: undefined,
    },
  });

  // functions
  async function onSubmit(data: TForumForm) {
    try {
      if (!isOnline) {
        toast({
          title: "Mode Offline",
          description: "Tidak dapat membuat diskusi dalam mode offline",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      await addForum.mutateAsync(data);

      form.reset();
      setModalSuccess({
        open: true,
        title: "Diskusi Berhasil Dibuat!",
        message: "Selamat🎉 Diskusi Anda berhasil dibuat. Terima kasih!",
        animation: "success",
        action: () => {
          router.push("/forum");
        },
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membuat diskusi. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Diskusi</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Diskusi</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul diskusi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="konsep-dasar">Konsep Dasar</SelectItem>
                      <SelectItem value="pengembangan-mobile">
                        Pengembangan Mobile
                      </SelectItem>
                      <SelectItem value="pengembangan-web">
                        Pengembangan Web
                      </SelectItem>
                      <SelectItem value="dev-sec">DevSecOps</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis konten diskusi Anda di sini..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Link href="/forum">
                <Button variant="outline">Batal</Button>
              </Link>
              <Button type="submit" loading={isSubmitting}>
                {isOnline ? "Buat Diskusi" : "Tidak tersedia (Offline)"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
