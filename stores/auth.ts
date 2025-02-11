import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IAuthStore } from "@/types/modules/auth";
import { TUsers } from "@/types";

const useAuth = create<IAuthStore>()(
  persist(
    (setState) => ({
      // state
      me: {} as TUsers,

      // actions
      setMe: async (user) => {
        try {
          setState((state) => ({
            ...state,
            me: user || {},
          }));
          return user;
        } catch (error) {
          console.error("Error store getMe:", error);
          throw error;
        }
      },
    }),
    {
      name: `${process.env.NEXT_PUBLIC_STORAGE_NAME}:auth`,
    },
  ),
);

export default useAuth;
