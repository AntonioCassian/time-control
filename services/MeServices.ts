import { api } from "./api";

export const MeSerices = async () => {
  const { data: response } = await api.get("/auth/me");
  return response;
};
