import { useMutation } from "@tanstack/react-query";

import { registerUser, loginUser, logoutUser } from "@/app/actions/auth";
import { setCookies } from "@/utils/cookie";

export function useRegister() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (response) => {
      if (response?.accessToken) {
        setCookies("token", response.accessToken);
      }
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logoutUser(),
  });
}
