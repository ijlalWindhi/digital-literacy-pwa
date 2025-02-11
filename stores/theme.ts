import { create } from "zustand";

import { IThemeStore } from "@/types";

const useTheme = create<IThemeStore>((set) => ({
  // state
  isLoading: false,
  modalEditProfile: false,
  modalSuccess: {
    open: false,
    title: "",
    message: "",
    actionMessage: "Ok, Back",
    actionVariant: "outline",
    animation: "success",
  },

  // actions
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
  setModalEditProfile: (open) => {
    set({ modalEditProfile: open });
  },
  setModalSuccess: (modal) => {
    set({ modalSuccess: modal });
  },
}));

export default useTheme;
