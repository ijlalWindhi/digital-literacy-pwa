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
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useAddComment } from "@/hooks/use-forum";
import useNetworkStatus from "@/hooks/use-network-status";
import { toast } from "@/hooks/use-toast";
import useAuth from "@/stores/auth";
import { TForumCommentForm } from "@/types";
import { commentSchema } from "@/utils/schema/forum.schema";

interface ReplyFormProps {
  readonly threadId: string;
}

export default function ReplyForm({ threadId }: ReplyFormProps) {
  // variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { me } = useAuth();
  const addComment = useAddComment(threadId, me);
  const { isOnline } = useNetworkStatus();

  const form = useForm<TForumCommentForm>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  // functions
  async function onSubmit(data: TForumCommentForm) {
    try {
      if (!isOnline) {
        toast({
          title: "Mode Offline",
          description: "Tidak dapat membuat balasan dalam mode offline",
          variant: "destructive",
        });
        return;
      }

      setIsSubmitting(true);
      await addComment.mutateAsync(data);

      form.reset();
      toast({
        title: "Sukses🎉",
        description: "Balasan berhasil dibuat.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membuat balasan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm md:text-base font-bold">
          Tulis Balasan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis balasan Anda di sini..."
                      className="min-h-[150px]"
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
                {isOnline ? "Kirim Balasan" : "Tidak tersedia (Offline)"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
