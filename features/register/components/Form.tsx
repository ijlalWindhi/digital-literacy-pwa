"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/common/input-password";
import { InputField } from "@/components/common/input-field";
import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import { useRegister } from "../hooks/useRegister";
import { RegisterSchema } from "../schemas/register.schema";
import { toast } from "@/hooks/use-toast";
import useNetworkStatus from "@/hooks/use-network-status";

export default function FormRegister() {
  // variables
  const router = useRouter();
  const login = useRegister();
  const { isOnline, checkConnection, lastChecked } = useNetworkStatus();
  const loading = login.isPending;
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
          description: "Tidak dapat melakukan login dalam mode offline",
          variant: "destructive",
        });
        return;
      }

      const res = await login.mutateAsync(values);
      if (res) {
        setModalSuccess({
          open: true,
          title: "Selamat Datang Kembali!",
          message: "Anda berhasil login ke dalam aplikasi.",
          actionVariant: "default",
          actionMessage: "Kembali ke Beranda",
          action: () => {
            router.push("/");
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
        alert("Koneksi terputus. Mohon periksa koneksi internet Anda.");
      }
      console.error("Error from onSubmit: ", error);
    }
  };

  const handleRetry = async () => {
    const isConnected = await checkConnection();
    if (!isConnected) {
      // Tetap tampilkan UI yang sudah di cache
      return;
    }
    // Jika online, refresh halaman
    window.location.reload();
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
        <Button type="submit" className="w-full" loading={loading}>
          {isOnline ? "Login" : "Login tidak tersedia (Offline)"}
        </Button>
      </form>
    </Form>
  );
}
