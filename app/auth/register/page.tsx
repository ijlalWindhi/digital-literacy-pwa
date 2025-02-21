import { Metadata } from "next";

import FormRegister from "@/features/register";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Register ${METADATA.exTitle}`,
  description: `Register to get started with our platform`,
  alternates: {
    canonical: `${process.env.DOMAIN}/auth/register`,
  },
};

export default function Register() {
  return (
    <div className="space-y-4 md:space-y-8 w-full p-4 mt-32 sm:mt-0">
      <div className="text-center space-y-2">
        <p className="text-primary text-xs sm:text-sm md:text-base">
          HAI KAWAN, SELAMAT DATANG👋
        </p>
        <h1 className="sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Selamat Datang di{" "}
          <span className="text-primary">Digital Literacy</span>
          <br />
          Kami Senang Anda Bergabung Bersama Kami
        </h1>
        <p className="text-xs sm:text-sm md:text-base">
          Masukkan email dan password untuk mendaftar
        </p>
      </div>

      <FormRegister />
    </div>
  );
}
