import { useQuery } from "@tanstack/react-query";

import { MeSerices } from "@/services/MeServices";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: MeSerices,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};