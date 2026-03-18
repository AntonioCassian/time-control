import { LoginDTO } from "@/types/auth";

import { api } from "./api";

export const loginRequest = async (data: LoginDTO) => {
  const { data: response } = await api.post("/auth/login", data);
  return response; 
};