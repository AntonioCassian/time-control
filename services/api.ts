import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    const isFormDataPayload =
      typeof FormData !== "undefined" && config.data instanceof FormData;

    if (!isFormDataPayload) {
      config.headers.set("Content-Type", "application/json");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response?.status === 401) {
   
      await AsyncStorage.removeItem("access_token");

      // Aqui você precisa ter acesso à navegação para redirecionar
      // Exemplo usando React Navigation:
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'Login' }],
      //   })
      // );

      

      console.log("Token inválido, usuário deslogado e redirecionado para login");
    }

    return Promise.reject(error); // propaga o erro caso queira tratar localmente
  }
);