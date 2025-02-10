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
import { useLogin } from "../hooks/useLogin";
import { LoginSchema } from "../schemas/login.schema";

export default function FormLogin() {
  // variables
  const router = useRouter();
  const login = useLogin();
  const loading = login.isPending;
  const { setModalSuccess } = useTheme();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // functions
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const res = await login.mutateAsync(values);
      if (res) {
        setModalSuccess({
          open: true,
          title: "Login Success",
          message: "Welcome back! You're successfully logged in",
          actionVariant: "default",
          actionMessage: "Go to Dashboard",
          action: () => {
            router.push("/");
          },
          animation: "success",
        });
      }
    } catch (error) {
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
            <InputPassword placeholder="Masukkan password" {...field} />
          )}
        />
        <Button type="submit" className="w-full" loading={loading}>
          Masuk
        </Button>
      </form>
    </Form>
  );
}
