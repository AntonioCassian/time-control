import { api } from "./api";

export const TimeRecordsMe = async () => {
  try {
    const response = await api.get("/time-records/me");

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Erro HTTP:", error.response.status, error.response.data);
      throw new Error(`Erro ao enviar ponto: ${error.response.data}`);
    } else {
      console.log("Erro de rede ou outro:", error.message);
      throw new Error(error.message);
    }
  }
};