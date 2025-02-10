import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "@/services/auth";
import { TPayloadLogin } from "@/types";
import { setCookies } from "@/utils/cookie";
import useAuth from "@/stores/auth";

export const AUTH_QUERY_KEYS = {
  profile: ["profile"],
  menu: ["menu"],
  permissions: ["permissions"],
} as const;

export function useRegister() {
  const queryClient = useQueryClient();
  const { getProfile, getMenu, getPermission } = useAuth();

  return useMutation({
    mutationFn: (data: TPayloadLogin) => login(data),
    onSuccess: async (response) => {
      if (response?.token) {
        setCookies("token", response.token);

        // await Promise.all([
        //   queryClient.prefetchQuery({
        //     queryKey: AUTH_QUERY_KEYS.profile,
        //     queryFn: getProfile,
        //   }),
        //   queryClient.prefetchQuery({
        //     queryKey: AUTH_QUERY_KEYS.menu,
        //     queryFn: getMenu,
        //   }),
        //   queryClient.prefetchQuery({
        //     queryKey: AUTH_QUERY_KEYS.permissions,
        //     queryFn: getPermission,
        //   }),
        // ]);
      }
    },
  });
}
