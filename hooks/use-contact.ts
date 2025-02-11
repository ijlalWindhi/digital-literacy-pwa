import { useMutation } from "@tanstack/react-query";
import { addContact } from "@/app/actions/contact";
import { TContactForm } from "@/types";

export function useAddContact() {
  return useMutation({
    mutationFn: (data: TContactForm) => addContact(data),
  });
}
