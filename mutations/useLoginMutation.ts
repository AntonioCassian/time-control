import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { loginRequest } from "@/services/authServices";

type MutationResult = {
  mutate: (data: { email: string; password: string }) => Promise<any>;
  error: unknown;
  data: any;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginRequest(data),
  });
};