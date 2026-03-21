import { api } from "./api";

export const postClock = async (formData: FormData) => {
  try {
    const response = await api.post("/time-records/clock", formData);

    // Axios já retorna o body em response.data
    return response.data;
  } catch (error: any) {
    // Axios coloca detalhes do erro em error.response
    if (error.response) {
      console.log("Erro HTTP:", error.response.status, error.response.data);
      throw new Error(`Erro ao enviar ponto: ${error.response.data}`);
    } else {
      console.log("Erro de rede ou outro:", error.message);
      throw new Error(error.message);
    }
  }
};