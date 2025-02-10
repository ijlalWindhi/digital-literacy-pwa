import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getProfile, getPermissions, getMenu } from "@/services/auth";
import {
  IAuthStore,
  TResponseProfile,
  TResponsePermission,
  TResponseMenu,
} from "@/types/modules/auth";

export const useAuth = create<IAuthStore>()(
  persist(
    (setState) => ({
      // state
      profile: {} as TResponseProfile,
      permission: [],
      menu: [],

      // actions
      getProfile: async () => {
        try {
          const profile = await getProfile();
          if (profile) {
            setState((state) => ({
              ...state,
              profile: profile,
            }));
          }
          return profile || {};
        } catch (error) {
          console.error("Error store getProfile:", error);
          throw error;
        }
      },
      getPermission: async () => {
        try {
          const permissions = await getPermissions();
          let flattenedPermissions: TResponsePermission[] = [];
          if (permissions.results) {
            permissions.results = permissions.results || [];
            flattenedPermissions = permissions.results.flat();
            setState((state) => ({
              ...state,
              permission: flattenedPermissions || [],
            }));
          }
          return flattenedPermissions || [];
        } catch (error) {
          console.error("Error store getPermission:", error);
          throw error;
        }
      },
      getMenu: async () => {
        try {
          const menus = await getMenu();
          let flattenedMenus: TResponseMenu[] = [];
          if (menus.results) {
            menus.results = menus.results || [];
            flattenedMenus = menus.results.flat();
            setState((state) => ({
              ...state,
              menu: flattenedMenus || [],
            }));
          }
          return flattenedMenus || [];
        } catch (error) {
          console.error("Error store getMenu:", error);
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
