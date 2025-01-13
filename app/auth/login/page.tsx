import { Metadata } from "next";

import FormLogin from "@/features/login";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: `Login ${METADATA.exTitle}`,
  description: `Login to your account account and start managing your data`,
  alternates: {
    canonical: `${process.env.DOMAIN}/auth/login`,
  },
};

export default function Login() {
  return (
    <div className="space-y-4 md:space-y-8 w-full p-4">
      <div className="text-center">
        <p className="text-primary text-xs sm:text-sm md:text-base">
          LET&apos;S GET STARTED
        </p>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Welcome Back🎉
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
          Ready to Assist You
        </h2>
        <p className="text-xs sm:text-sm md:text-base">
          Enter your username and password to get started
        </p>
      </div>

      <FormLogin />
    </div>
  );
}
