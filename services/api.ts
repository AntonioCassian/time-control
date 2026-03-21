import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
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
