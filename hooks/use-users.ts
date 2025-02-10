import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listUsers,
  addUser,
  updateUser,
  deleteUser,
} from "@/app/actions/users";
import { TUsers } from "@/types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers(),
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
  });
}

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TUsers) => addUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      uid,
      data,
    }: {
      uid: string;
      data: Partial<{ name: string; email: string }>;
    }) => updateUser(uid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uid: string) => deleteUser(uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
