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
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
