"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useAuth from "@/stores/auth";
import useTheme from "@/stores/theme";
import { useUpdateUser } from "@/hooks/use-users";
import useNetworkStatus from "@/hooks/use-network-status";
import { toast } from "@/hooks/use-toast";

const UpdateProfileSchema = z.object({
  username: z.string().min(3, { message: "Username is too short" }),
  name: z.string().min(3, { message: "Name is too short" }),
});

function ModalUpdate() {
  // variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { me } = useAuth();
  const { setModalSuccess, setModalEditProfile, modalEditProfile } = useTheme();
  const updateProfile = useUpdateUser();
  const { isOnline } = useNetworkStatus();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
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
      const payload = {
        ...me,
        username: values.username,
        name: values.name,
      };
      await updateProfile.mutateAsync({
        uid: me?.uid as string,
        data: payload,
      });

      setModalEditProfile(false);
      setModalSuccess({
        title: "Berhasil Perbarui Profile!",
        message: "Selamat🎉 Profile kamu berhasil diperbarui!",
        open: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal merubah profile. Silakan coba lagi.",
        variant: "destructive",
      });
      console.error("Error from onSubmit: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // lifecycle
  useEffect(() => {
    if (me) {
      form.reset({
        name: me.name,
        username: me.username,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalEditProfile, me]);

  return (
    <Dialog
      open={modalEditProfile}
      onOpenChange={() => setModalEditProfile(!modalEditProfile)}
    >
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="modal-update-profile"
      >
        <DialogHeader>
          <DialogTitle>Ubah Profile</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Pengguna</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalEditProfile(false)}
                  loading={isSubmitting}
                >
                  Batal
                </Button>
                <Button type="submit" variant="default" loading={isSubmitting}>
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalUpdate;
