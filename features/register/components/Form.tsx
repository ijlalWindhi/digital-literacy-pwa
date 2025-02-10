"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/common/input-password";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import { useRegister } from "@/hooks/use-auth";
import { RegisterSchema } from "../schemas/register.schema";
import { toast } from "@/hooks/use-toast";
import useNetworkStatus from "@/hooks/use-network-status";

export default function FormRegister() {
  // variables
  const router = useRouter();
  const register = useRegister();
  const { isOnline } = useNetworkStatus();
  const loading = register.isPending;
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      if (!isOnline) {
        toast({
          title: "Mode Offline",
          description: "Tidak dapat melakukan register dalam mode offline",
          variant: "destructive",
        });
        return;
      }

      const res = await register.mutateAsync(values);
      if (res) {
        setModalSuccess({
          open: true,
          title: "Pendaftaran Berhasil",
          message:
            "Anda berhasil mendaftar akun. Silahkan login untuk melanjutkan.",
          actionVariant: "default",
          actionMessage: "Kembali ke halaman login",
          action: () => {
            router.push("/auth/login");
          },
          animation: "success",
        });
      }
    } catch (error) {
      if (!navigator.onLine) {
        toast({
          title: "Koneksi Terputus",
          description: "Koneksi terputus. Mohon periksa koneksi internet Anda.",
          variant: "destructive",
        });
      }
      console.error("Error from onSubmit: ", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white rounded-lg p-4 w-full mx-auto sm:w-3/4 md:w-1/2 lg:w-1/3 shadow"
      >
        <InputField
          name="email"
          label="Email"
          primary
          control={form.control}
          render={({ field }) => (
            <Input type="text" placeholder="Masukkan email" {...field} />
          )}
        />
        <InputField
          name="password"
          label="Password"
          primary
          control={form.control}
          render={({ field }) => (
            <InputPassword
              showStrengthIndicator
              placeholder="Masukkan password"
              {...field}
            />
          )}
        />
        <InputField
          name="repeat_password"
          label="Konfirmasi Password"
          primary
          control={form.control}
          render={({ field }) => (
            <InputPassword
              placeholder="Masukkan konfirmasi password"
              {...field}
            />
          )}
        />
        <div className="text-right text-sm">
          <p>
            Sudah punya akun?{" "}
            <Link href="/auth/login">
              <span className="text-primary">Masuk</span>
            </Link>
          </p>
        </div>
        <Button type="submit" className="w-full" loading={loading}>
          {isOnline ? "Daftar" : "Daftar tidak tersedia (Offline)"}
        </Button>
      </form>
    </Form>
  );
}
