import { useMutation } from "@tanstack/react-query";

import { registerUser, loginUser, logoutUser } from "@/app/actions/auth";
import { addUser, getUser } from "@/app/actions/users";
import { deleteCookie, setCookies } from "@/utils/cookie";
import useAuth from "@/stores/auth";
import { TUsers } from "@/types";

export function useRegister() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      registerUser(email, password),
    onSuccess: (response) => {
      if (response) {
        addUser({
          uid: response.uid,
          email: response.email ?? "",
          username: "",
          name: "",
          is_active: true,
          image: "",
          role: {
            id: 2,
            nama: "User",
          },
        });
      }
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: async (response) => {
      if (response) {
        const user = await getUser(response?.user?.uid);

        useAuth.getState().setMe(user);
        setCookies("token", response.accessToken);
      }
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: async () => {
      await useAuth.getState().setMe({} as TUsers);
      await deleteCookie("token");
      window.location.href = "/auth/login";
    },
  });
}
