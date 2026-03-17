import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { loginRequest } from "@/services/authServices";

type MutationResult = {
  mutate: (data: { email: string; password: string }) => Promise<any>;
  error: unknown;
  data: any;
};

export const useLoginMutation = (): MutationResult => {
  const mutation: UseMutationResult<any, Error, { email: string; password: string }, unknown> = useMutation({
    mutationFn: (data: { email: string; password: string }) => loginRequest(data),
  });

  return {
    mutate: mutation.mutateAsync, 
    error: mutation.error,
    data: mutation.data,
  };
};