import { AuthResponse, LoginDTO } from "@/types/auth";

import { api } from "./api";

export const loginRequest = async (data: LoginDTO) => {
  const { data: response } = await api.post("/login", data);
  return response; 
};